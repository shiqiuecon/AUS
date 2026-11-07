* ECO603 Meeting 11. Save traffic.csv beside this file; run from that folder.
version 19.0
clear all
set more off
import delimited "traffic.csv", clear varnames(1) asdouble
format month_id %tm
isid month_id
tsset month_id
assert _N==108
assert !missing(logacc,unem,spdlaw,beltlaw,wkends,month,trend)
regress logacc trend i.month unem spdlaw beltlaw wkends
estimates store conventional
regress logacc trend i.month unem spdlaw beltlaw wkends, vce(robust)
newey logacc trend i.month unem spdlaw beltlaw wkends, lag(4)
nlcom 100*(exp(_b[beltlaw])-1)
estimates restore conventional
estat bgodfrey, lags(1 4)
display "ECO603_PUBLIC_11_COMPLETE"
