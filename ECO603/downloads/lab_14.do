* ECO603 Meeting 14: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_14.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_14_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

import delimited "cigarettes.csv", clear varnames(1) asdouble
* BEGIN ols
regress logq logp, vce(robust)
* END ols
record ols logp
* BEGIN first
regress logp salestax, vce(robust)
* END first
record first salestax
scalar first_b=_b[salestax]
* BEGIN reduced
regress logq salestax, vce(robust)
* END reduced
record reduced salestax
scalar reduced_b=_b[salestax]
* BEGIN iv
ivregress 2sls logq (logp=salestax), vce(robust)
* END iv
record iv logp
assert abs(_b[logp]-reduced_b/first_b)<1e-9
* BEGIN controls
ivregress 2sls logq logincome (logp=salestax), vce(robust)
* END controls
record controlled logp
* BEGIN relevance
estat firststage
* END relevance
export delimited logq logp salestax logincome using "meeting_14_data.csv", replace

postclose results
use "meeting_14_estimates.dta", clear
export delimited using "meeting_14_estimates.csv", replace
display "ECO603_MEETING_14_COMPLETE"
log close
