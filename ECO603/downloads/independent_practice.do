* ECO603: worked reference for independently adapting each lesson's analysis.
* Try the questions with your own commands before consulting this reference.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "independent_practice.txt", text replace
postfile task str2 meeting str24 statistic double value se int n ///
    using "independent_practice.dta", replace

* 01: add district income and recalculate a two-student contrast.
import delimited "schools.csv", clear varnames(1) asdouble
generate int observat=_n
regress score str el income, vce(robust)
lincom -2*str
post task ("01") ("income_adjusted_gain") (r(estimate)) (r(se)) (420)

* 02: an omitted-income identity, holding language composition fixed.
regress score str el
scalar short_b=_b[str]
regress score str el income
scalar movement=short_b-_b[str]
scalar income_b=_b[income]
regress income str el
scalar contribution=income_b*_b[str]
assert abs(movement-contribution)<1e-8
post task ("02") ("income_contribution") (contribution) (.) (420)

* 03: change the income control to a log in BOTH residualising equations.
generate double log_income=ln(income)
regress score str el log_income, vce(robust)
scalar full_b=_b[str]
scalar full_se=_se[str]
regress str el log_income
predict double rx_new, residuals
regress score el log_income
predict double ry_new, residuals
regress ry_new rx_new, noconstant
assert abs(full_b-_b[rx_new])<1e-8
post task ("03") ("log_income_staffing") (full_b) (full_se) (420)

* 04: assess a one-point gain, rather than testing only a zero slope.
regress score str el, vce(robust)
lincom -2*str
scalar gain=r(estimate)
scalar gain_se=r(se)
post task ("04") ("one_point_t_ratio") ((gain-1)/gain_se) (.) (420)

* 05: compare a 30,000-to-50,000 income contrast on the two fitted scales.
import delimited "retail.csv", clear varnames(1) asdouble
regress sprice inc10, vce(robust)
post task ("05") ("level_dollar_contrast") (2*_b[inc10]) (2*_se[inc10]) (e(N))
regress lp li, vce(robust)
post task ("05") ("exact_log_percent") (100*(exp(_b[li]*ln(5/3))-1)) (.) (e(N))

* 06: a REAL-data influence check, alongside the separate simulations.
import delimited "schools.csv", clear varnames(1) asdouble
generate int observat=_n
regress score str el income
predict double cooks, cooksd
gsort -cooks observat
scalar omitted_case=observat[1]
regress score str el income, vce(robust)
post task ("06") ("all_district_slope") (_b[str]) (_se[str]) (e(N))
regress score str el income if observat!=omitted_case, vce(robust)
post task ("06") ("leave_influential_out") (_b[str]) (_se[str]) (e(N))
post task ("06") ("sensitivity_case") (omitted_case) (.) (419)

* 07: centring at a ratio of 20 changes the meaning of the group intercept.
import delimited "schools.csv", clear varnames(1) asdouble
generate int observat=_n
generate byte high=(el>=10)
generate double centered_str=str-20
regress score c.centered_str##i.high income, vce(robust)
lincom 1.high
post task ("07") ("group_gap_at_ratio20") (r(estimate)) (r(se)) (420)

* 09: compare two counterfactual time specifications on the same 108 months.
import delimited "traffic.csv", clear varnames(1) asdouble
keep month_id month year totacc logacc trend unem spdlaw beltlaw wkends
format month_id %tm
tsset month_id
regress logacc trend i.month unem spdlaw beltlaw wkends, vce(robust)
post task ("09") ("with_linear_trend") (_b[beltlaw]) (_se[beltlaw]) (e(N))
regress logacc i.month unem spdlaw beltlaw wkends, vce(robust)
post task ("09") ("without_linear_trend") (_b[beltlaw]) (_se[beltlaw]) (e(N))

* 10: extending the lag length also changes the available sample; fix it first.
regress logacc L(0/2).unem trend i.month spdlaw beltlaw wkends ///
    if !missing(L3.unem), vce(robust)
assert e(N)==105
lincom unem+L.unem+L2.unem
post task ("10") ("two_lag_sum_common") (r(estimate)) (r(se)) (105)
regress logacc L(0/3).unem trend i.month spdlaw beltlaw wkends, vce(robust)
assert e(N)==105
lincom unem+L.unem+L2.unem+L3.unem
post task ("10") ("three_lag_sum_common") (r(estimate)) (r(se)) (105)

* 11: change the HAC bandwidth, not the conditional-mean regressors.
newey logacc trend i.month unem spdlaw beltlaw wkends, lag(4)
scalar common_b=_b[beltlaw]
post task ("11") ("HAC_four_months") (_b[beltlaw]) (_se[beltlaw]) (e(N))
newey logacc trend i.month unem spdlaw beltlaw wkends, lag(8)
assert abs(common_b-_b[beltlaw])<1e-10
post task ("11") ("HAC_eight_months") (_b[beltlaw]) (_se[beltlaw]) (e(N))

* 12: apply a dynamic mean model to ACTUAL traffic data, beyond simulation.
newey logacc L.logacc trend i.month unem spdlaw beltlaw wkends, lag(4)
post task ("12") ("monthly_AR_coefficient") (_b[L.logacc]) (_se[L.logacc]) (e(N))
post task ("12") ("monthly_law_impact") (_b[beltlaw]) (_se[beltlaw]) (e(N))
assert abs(_b[L.logacc])<1
nlcom (longrun: _b[beltlaw]/(1-_b[L.logacc]))
matrix response=r(b)
matrix uncertainty=r(V)
post task ("12") ("conditional_long_run") (response[1,1]) (sqrt(uncertainty[1,1])) (e(N))

* 13: change the endpoint window explicitly; it is a different comparison.
import delimited "panel.csv", clear varnames(1) asdouble
encode state, gen(state_id)
drop state
rename state_id state
xtset state year
keep if inlist(year,1983,1988)
keep state year fatality beertax
reshape wide fatality beertax, i(state) j(year)
generate double dy=fatality1988-fatality1983
generate double dx=beertax1988-beertax1983
regress dy dx, vce(robust)
post task ("13") ("1983_to_1988_difference") (_b[dx]) (_se[dx]) (e(N))

* 14: include the same exogenous income control in both supporting stages.
import delimited "cigarettes.csv", clear varnames(1) asdouble
regress logp salestax logincome, vce(robust)
scalar stage_one=_b[salestax]
regress logq salestax logincome, vce(robust)
scalar reduced=_b[salestax]
ivregress 2sls logq logincome (logp=salestax), vce(robust)
assert abs(_b[logp]-reduced/stage_one)<1e-8
post task ("14") ("income_controlled_IV") (_b[logp]) (_se[logp]) (e(N))

* 15: add curvature to the probit index and compare the same probability inputs.
import delimited "mortgages.csv", clear varnames(1) asdouble
probit deny c.pir##c.pir, vce(robust)
scalar p30=normal(_b[_cons]+_b[pir]*.30+_b[c.pir#c.pir]*.30^2)
scalar p40=normal(_b[_cons]+_b[pir]*.40+_b[c.pir#c.pir]*.40^2)
post task ("15") ("quadratic_probit_gap_pp") (100*(p40-p30)) (.) (e(N))
postclose task
use "independent_practice.dta", clear
format value se %12.6f
list, noobs separator(0)
export delimited using "independent_practice.csv", replace
display "ECO603_INDEPENDENT_PRACTICE_COMPLETE"
log close
