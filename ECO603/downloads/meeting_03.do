* ECO603 Meeting 03: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_03.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_03_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "schools.csv", clear varnames(1) asdouble
* BEGIN full
regress score str el income, vce(robust)
* END full
record full str
scalar full_b=_b[str]
quietly regress score el income
predict double ry, residuals
quietly regress str el income
predict double rx, residuals
* BEGIN fwl
regress ry rx, noconstant
* END fwl
record partial rx
assert abs(_b[rx]-full_b)<1e-8
* BEGIN vif
quietly regress score str el income
estat vif
* END vif
export delimited score str el income rx ry using "meeting_03_data.csv", replace

postclose results
use "meeting_03_estimates.dta", clear
export delimited using "meeting_03_estimates.csv", replace
display "ECO603_MEETING_03_COMPLETE"
log close
