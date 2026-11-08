* Reference programs for syllabus week 05. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_01.do"
do "lab_04.do"
do "lab_07.do"
do "overleaf_technical.do"
capture log close
log using "week_05_completion.txt", text replace
display "ECO603_WEEK_05_COMPLETE"
log close
