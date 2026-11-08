* ECO603 Meeting 10: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_10.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_10_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "traffic.csv", clear varnames(1) asdouble
keep month_id month year totacc logacc trend unem spdlaw beltlaw wkends
format month_id %tm
tsset month_id
* BEGIN distributed
newey logacc unem L(1/2).unem trend i.month, lag(4)
* END distributed
record impact unem
record lag1 L.unem
record lag2 L2.unem
* BEGIN cumulative
lincom unem+L.unem+L2.unem
* END cumulative
* BEGIN persistence
newey logacc L.logacc trend i.month, lag(4)
* END persistence
record persistence L.logacc

postclose results
use "meeting_10_estimates.dta", clear
export delimited using "meeting_10_estimates.csv", replace
display "ECO603_MEETING_10_COMPLETE"
log close
