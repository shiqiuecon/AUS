* ECO603 Meeting 13: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_13.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_13_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "panel.csv", clear varnames(1) asdouble
encode state, gen(state_id)
drop state
rename state_id state
xtset state year
* BEGIN pooled
regress fatality beertax i.year, vce(cluster state)
* END pooled
record pooled beertax
* BEGIN fixed
xtreg fatality beertax i.year, fe vce(cluster state)
* END fixed
record fixed beertax
* BEGIN policy
lincom .10*beertax
* END policy
preserve
keep if inlist(year,1982,1988)
keep state year fatality beertax
reshape wide fatality beertax, i(state) j(year)
generate double dy=fatality1988-fatality1982
generate double dx=beertax1988-beertax1982
* BEGIN differences
regress dy dx, vce(robust)
* END differences
record difference dx
restore
export delimited state year fatality beertax using "meeting_13_data.csv", replace

postclose results
use "meeting_13_estimates.dta", clear
export delimited using "meeting_13_estimates.csv", replace
display "ECO603_MEETING_13_COMPLETE"
log close
