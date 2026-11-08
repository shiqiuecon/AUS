* Reference programs for syllabus week 12. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_11.do"
do "overleaf_technical.do"
capture log close
log using "week_12_completion.txt", text replace
display "ECO603_WEEK_12_COMPLETE"
log close
