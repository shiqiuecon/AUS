* ECO603 Meeting 05: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_05.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_05_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "retail.csv", clear varnames(1) asdouble
* BEGIN levels
regress sprice inc10, vce(robust)
* END levels
record levels inc10
* BEGIN logs
regress lp li, vce(robust)
* END logs
record logs li
* BEGIN quadratic
regress sprice c.inc10##c.inc10, vce(robust)
* END quadratic
record linear inc10
record squared c.inc10#c.inc10
* BEGIN slope
margins, dydx(inc10) at(inc10=(2 4 6))
* END slope
export delimited sprice income inc10 lp li using "meeting_05_data.csv", replace

postclose results
use "meeting_05_estimates.dta", clear
export delimited using "meeting_05_estimates.csv", replace
display "ECO603_MEETING_05_COMPLETE"
log close
