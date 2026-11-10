* Reference programs for syllabus week 08. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_04.do"
do "lab_06.do"
do "variance.do"
capture log close
log using "week_08_completion.txt", text replace
display "ECO603_WEEK_08_COMPLETE"
log close
