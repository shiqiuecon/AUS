* Reference programs for syllabus week 14. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_07.do"
do "lab_13.do"
do "lab_14.do"
do "overleaf_technical.do"
do "did_overleaf.do"
do "iv_extension.do"
capture log close
log using "week_14_completion.txt", text replace
display "ECO603_WEEK_14_COMPLETE"
log close
