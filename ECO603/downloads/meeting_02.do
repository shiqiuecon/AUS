* ECO603 Meeting 02: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_02.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_02_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "schools.csv", clear varnames(1) asdouble
* BEGIN short
regress score str, vce(robust)
* END short
record short str
* BEGIN long
regress score str el, vce(robust)
* END long
record long str
record language el
* BEGIN auxiliary
regress el str
* END auxiliary
record auxiliary str
* BEGIN income
regress score str el income, vce(robust)
* END income
record income str
export delimited score str el income using "meeting_02_data.csv", replace

postclose results
use "meeting_02_estimates.dta", clear
export delimited using "meeting_02_estimates.csv", replace
display "ECO603_MEETING_02_COMPLETE"
log close
