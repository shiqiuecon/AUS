* Reference programs for syllabus week 04. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_03.do"
do "lab_04.do"
do "overleaf_technical.do"
capture log close
log using "week_04_completion.txt", text replace
display "ECO603_WEEK_04_COMPLETE"
log close
