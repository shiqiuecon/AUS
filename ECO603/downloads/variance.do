* ECO603: diagnose variance patterns and distinguish robust OLS from WLS.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "variance.txt", text replace
import delimited "variance.csv", clear varnames(1) asdouble
assert _N==420
assert !missing(score,str,el,enrol) & enrol>0
* BEGIN ols
regress score str el
* END ols
predict double residual, residuals
predict double fitted, xb
generate double residual_sq=residual^2
* BEGIN bp
estat hettest str el, iid
* END bp
scalar bp_stat=r(chi2)
scalar bp_p=r(p)
* BEGIN white
estat imtest, white
* END white
* Installed StataMP returns White's result in r(chi2), r(df), r(p).
scalar white_stat=r(chi2)
scalar white_p=r(p)
generate double staffing_sq=str^2
generate double language_sq=el^2
generate double staffing_language=str*el
quietly regress residual_sq str el
assert abs(e(N)*e(r2)-bp_stat)<1e-7
quietly regress residual_sq str el staffing_sq language_sq staffing_language
assert abs(e(N)*e(r2)-white_stat)<1e-5
* BEGIN robust
regress score str el, vce(robust)
* END robust
scalar ols_b=_b[str]
scalar ols_se=_se[str]
* Candidate variance model: Var(u|X,enrol)=sigma^2/enrol.
* This is a substantive hypothesis for district averages, not a fact established
* by enrolment or by rejection of a homoskedasticity test. Use robust inference.
* BEGIN wls
regress score str el [aw=enrol], vce(robust)
* END wls
scalar wls_b=_b[str]
scalar wls_se=_se[str]
generate double root_n=sqrt(enrol)
generate double score_star=root_n*score
generate double staffing_star=root_n*str
generate double language_star=root_n*el
* BEGIN transformed
regress score_star staffing_star language_star root_n, noconstant vce(robust)
* END transformed
assert abs(_b[staffing_star]-wls_b)<1e-8
export delimited score str el enrol residual residual_sq fitted ///
    using "variance_plot.csv", replace
clear
set obs 1
generate double bp=bp_stat
generate double bp_pvalue=bp_p
generate double white=white_stat
generate double white_pvalue=white_p
generate double ols=ols_b
generate double ols_robust_se=ols_se
generate double wls=wls_b
generate double wls_robust_se=wls_se
export delimited using "variance_results.csv", replace
display "ECO603_VARIANCE_COMPLETE"
log close
