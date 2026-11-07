* ECO603 Meeting 01. Save schools.csv beside this file; run from that folder.
version 19.0
clear all
set more off
import delimited "schools.csv", clear varnames(1) asdouble
assert _N==420
assert !missing(score,str,el)
summarize score str el
regress score str, vce(robust)
lincom -2*str
regress score str el, vce(robust)
lincom -2*str
display "ECO603_PUBLIC_01_COMPLETE"
