* ECO603 Meeting 09: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_09.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_09_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "traffic.csv", clear varnames(1) asdouble
keep month_id month year totacc logacc trend unem spdlaw beltlaw wkends
format month_id %tm
tsset month_id
* BEGIN calendar
regress logacc trend i.month
* END calendar
record calendar trend
* BEGIN adjusted
regress logacc trend i.month unem spdlaw beltlaw wkends, vce(robust)
* END adjusted
record law beltlaw
record unemployment unem
* BEGIN season
testparm i.month
* END season
format month_id %9.0g
export delimited month_id year month totacc logacc trend unem spdlaw beltlaw wkends using "meeting_09_data.csv", replace

postclose results
use "meeting_09_estimates.dta", clear
export delimited using "meeting_09_estimates.csv", replace
display "ECO603_MEETING_09_COMPLETE"
log close
