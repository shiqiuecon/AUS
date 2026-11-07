* ECO603 Meeting 04: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_04.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_04_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "schools.csv", clear varnames(1) asdouble
* BEGIN conventional
regress score str el
* END conventional
record conventional str
* BEGIN robust
regress score str el, vce(robust)
* END robust
record robust str
* BEGIN policy
lincom -2*str
* END policy
* BEGIN practical_null
test str=-1
* END practical_null

postclose results
use "meeting_04_estimates.dta", clear
export delimited using "meeting_04_estimates.csv", replace
display "ECO603_MEETING_04_COMPLETE"
log close
