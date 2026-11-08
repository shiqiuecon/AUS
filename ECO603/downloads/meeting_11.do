* Reference programs for syllabus week 11. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_10.do"
do "lab_12.do"
do "overleaf_technical.do"
capture log close
log using "week_11_completion.txt", text replace
display "ECO603_WEEK_11_COMPLETE"
log close
