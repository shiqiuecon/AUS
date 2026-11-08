* Reference programs for syllabus week 07. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_05.do"
do "lab_07.do"
do "lab_15.do"
do "overleaf_technical.do"
do "prediction.do"
capture log close
log using "week_07_completion.txt", text replace
display "ECO603_WEEK_07_COMPLETE"
log close
