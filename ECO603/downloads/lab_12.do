* ECO603 Meeting 12: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_12.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_12_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "traffic.csv", clear varnames(1) asdouble
keep month_id month year totacc logacc trend unem spdlaw beltlaw wkends
format month_id %tm
tsset month_id
* BEGIN dynamic
newey logacc L.logacc trend i.month unem spdlaw beltlaw wkends, lag(4)
* END dynamic
record dynamic L.logacc
record law beltlaw
* BEGIN prais
prais logacc trend i.month unem spdlaw beltlaw wkends
* END prais
record prais beltlaw
* A controlled quarterly simulation, not estimated inflation data.
clear
set seed 6031212
set obs 440
generate quarter=tq(1960q1)+_n-1
format quarter %tq
tsset quarter
generate double shock=rnormal()
generate double inflation=0
forvalues i=2/440 {
    quietly replace inflation=.6*inflation[_n-1]+.8*shock+rnormal() in `i'
}
keep in 201/440
tsset quarter
tempname lp
postfile `lp' horizon coefficient se using "meeting_12_lp.dta", replace
forvalues h=0/8 {
    quietly newey F`h'.inflation shock L.inflation, lag(8)
    post `lp' (`h') (_b[shock]) (_se[shock])
}
postclose `lp'
* BEGIN projection
newey F4.inflation shock L.inflation, lag(8)
* END projection
record horizon4 shock
use "meeting_12_lp.dta", clear
export delimited using "meeting_12_lp.csv", replace

postclose results
use "meeting_12_estimates.dta", clear
export delimited using "meeting_12_estimates.csv", replace
display "ECO603_MEETING_12_COMPLETE"
log close
