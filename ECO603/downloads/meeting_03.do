* Reference programs for syllabus week 03. Extract the complete Stata ZIP first.
* Shared lab programs may contain blocks used in other weeks.
version 19.0
set more off
do "lab_01.do"
do "lab_02.do"
do "lab_03.do"
do "overleaf_technical.do"
capture log close
log using "week_03_completion.txt", text replace
display "ECO603_WEEK_03_COMPLETE"
log close
