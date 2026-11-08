* ECO603 Meeting 11. Run from the folder containing the matching CSV.
version 19.0
clear all
set more off
import delimited "traffic.csv", clear varnames(1) asdouble
keep month_id month year totacc logacc trend unem spdlaw beltlaw wkends
format month_id %tm
tsset month_id
regress logacc trend i.month unem spdlaw beltlaw wkends
estimates store ordinary
regress logacc trend i.month unem spdlaw beltlaw wkends, vce(robust)
newey logacc trend i.month unem spdlaw beltlaw wkends, lag(4)
nlcom 100*(exp(_b[beltlaw])-1)
estimates restore ordinary
estat bgodfrey, lags(1 4)
display "ECO603_MEETING_11_COMPLETE"
