* Instructor-source technical calculations using the retained course data.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "overleaf_technical.txt", text replace
import delimited "schools.csv", clear varnames(1) asdouble
generate int observat=_n
* BEGIN audit
count
summarize score str el income
count if el>20
* END audit
* BEGIN normal_equations
regress score str
predict double fitted, xb
predict double residual, residuals
generate double xu=str*residual
summarize residual xu
quietly summarize score
scalar ybar=r(mean)
generate double total_sq=(score-ybar)^2
generate double resid_sq=residual^2
quietly summarize total_sq, meanonly
scalar sst=r(sum)
quietly summarize resid_sq, meanonly
scalar ssr=r(sum)
display "R2 reconstructed = " %12.9f 1-ssr/sst
assert abs(1-ssr/sst-e(r2))<1e-9
* END normal_equations
* BEGIN precision
regress score str el income
scalar full_b=_b[str]
scalar df=e(df_r)
scalar s2=e(rss)/df
display "Observations = " e(N) "  parameters including intercept = " e(rank)
display "Residual degrees of freedom = " df "  s-squared = " s2
estat vif
* END precision
* BEGIN linear_contrast
lincom -2*str+5*el
* END linear_contrast
quietly regress score el income
predict double ry, residuals
quietly regress str el income
predict double rx, residuals
quietly regress ry rx, noconstant
assert abs(_b[rx]-full_b)<1e-9
* BEGIN sample_size
set seed 6032711
generate double subset_draw=runiform()
sort subset_draw observat
regress score str el if _n<=105, vce(robust)
scalar small_b=_b[str]
scalar small_se=_se[str]
regress score str el, vce(robust)
scalar full_se=_se[str]
display "Observed SE ratio (105 / 420) = " small_se/full_se
* END sample_size
clear
set obs 1
generate double smaller_b=scalar(small_b)
generate double smaller_se=scalar(small_se)
generate double full_se=scalar(full_se)
export delimited using "overleaf_samples.csv", replace

import delimited "traffic.csv", clear varnames(1) asdouble
keep month_id month year totacc logacc trend unem spdlaw beltlaw wkends
format month_id %tm
tsset month_id
* BEGIN dynamic
regress logacc L.logacc trend i.month unem spdlaw beltlaw wkends, vce(robust)
* END dynamic
* BEGIN diagnostics
regress logacc trend i.month unem spdlaw beltlaw wkends
estat dwatson
estat bgodfrey, lags(1 4)
* END diagnostics
* BEGIN arch
estat archlm, lags(1)
* END arch
display "ECO603_OVERLEAF_TECHNICAL_COMPLETE"
log close
