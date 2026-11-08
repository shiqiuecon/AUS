* Reference programs for syllabus week 13. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_11.do"
do "lab_12.do"
do "overleaf_technical.do"
capture log close
log using "week_13_completion.txt", text replace
display "ECO603_WEEK_13_COMPLETE"
log close
