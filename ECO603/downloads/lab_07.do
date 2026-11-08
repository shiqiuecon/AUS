* ECO603 Meeting 07: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_07.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_07_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "schools.csv", clear varnames(1) asdouble
generate byte high=(el>=10) if !missing(el)
* BEGIN interaction
regress score c.str##i.high income, vce(robust)
* END interaction
record low str
record base _cons
record income income
record difference 1.high#c.str
record intercept_difference 1.high
* BEGIN high_slope
lincom str+1.high#c.str
* END high_slope
* BEGIN joint
test 1.high 1.high#c.str
* END joint
* BEGIN policy
lincom -2*str-2*1.high#c.str
* END policy
export delimited score str el income high using "meeting_07_data.csv", replace

postclose results
use "meeting_07_estimates.dta", clear
export delimited using "meeting_07_estimates.csv", replace
display "ECO603_MEETING_07_COMPLETE"
log close
