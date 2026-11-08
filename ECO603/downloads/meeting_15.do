* Reference programs for syllabus week 15. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_15.do"
do "overleaf_technical.do"
capture log close
log using "week_15_completion.txt", text replace
display "ECO603_WEEK_15_COMPLETE"
log close
