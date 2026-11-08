* Actual coefficient-only displays for the introductory lessons.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "coefficient_workshop.txt", text replace
import delimited "schools.csv", clear varnames(1) asdouble
* BEGIN simple
quietly regress score str
matrix list e(b), format(%10.6f)
* END simple
* BEGIN contrast
display %10.6f -2*_b[str]
* END contrast
* BEGIN adjusted
quietly regress score str el
matrix list e(b), format(%10.6f)
* END adjusted
* BEGIN adjusted_contrast
display %10.6f -2*_b[str]
* END adjusted_contrast
* BEGIN auxiliary
quietly regress el str
matrix list e(b), format(%10.6f)
* END auxiliary
* BEGIN income
quietly regress score str el income
matrix list e(b), format(%10.6f)
* END income
quietly regress score el income
predict double ry, residuals
quietly regress str el income
predict double rx, residuals
* BEGIN partial
quietly regress ry rx, noconstant
matrix list e(b), format(%10.6f)
* END partial
display "ECO603_COEFFICIENT_WORKSHOP_COMPLETE"
log close
