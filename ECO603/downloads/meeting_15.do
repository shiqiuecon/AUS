* ECO603 Meeting 15: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_15.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_15_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "mortgages.csv", clear varnames(1) asdouble
* BEGIN lpm
regress deny pir, vce(robust)
* END lpm
record lpm pir
scalar a_lpm=_b[_cons]
scalar b_lpm=_b[pir]
* BEGIN probit
probit deny pir, vce(robust)
* END probit
record probit pir
scalar a_probit=_b[_cons]
scalar b_probit=_b[pir]
* BEGIN probabilities
margins, at(pir=(.3 .4 .5))
* END probabilities
* BEGIN ame
margins, dydx(pir)
* END ame
* BEGIN logit
logit deny pir, vce(robust)
* END logit
record logit pir
scalar a_logit=_b[_cons]
scalar b_logit=_b[pir]
preserve
clear
set obs 151
generate double pir=(_n-1)/100
generate double lpm=a_lpm+b_lpm*pir
generate double probit=normal(a_probit+b_probit*pir)
generate double logit=invlogit(a_logit+b_logit*pir)
export delimited using "meeting_15_curves.csv", replace
restore

postclose results
use "meeting_15_estimates.dta", clear
export delimited using "meeting_15_estimates.csv", replace
display "ECO603_MEETING_15_COMPLETE"
log close
