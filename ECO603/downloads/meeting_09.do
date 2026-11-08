* Reference programs for syllabus week 09. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_09.do"
do "lab_10.do"
do "overleaf_technical.do"
capture log close
log using "week_09_completion.txt", text replace
display "ECO603_WEEK_09_COMPLETE"
log close
