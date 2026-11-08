* ECO603 Meeting 01. Run from the folder containing the matching CSV.
version 19.0
clear all
set more off
import delimited "schools.csv", clear varnames(1) asdouble
regress score str, vce(robust)
lincom -2*str
regress score str el, vce(robust)
lincom -2*str
display "ECO603_MEETING_01_COMPLETE"
