* Reference programs for syllabus week 10. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_09.do"
capture log close
log using "week_10_completion.txt", text replace
display "ECO603_WEEK_10_COMPLETE"
log close
