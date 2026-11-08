* ECO603: compatible controlled IV stages and weak-instrument-robust inference.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "iv_extension.txt", text replace
import delimited "cigarettes.csv", clear varnames(1) asdouble
assert _N==48 & !missing(logq,logp,salestax,logincome)
* BEGIN first
regress logp salestax logincome, vce(robust)
* END first
scalar first_b=_b[salestax]
* BEGIN reduced
regress logq salestax logincome, vce(robust)
* END reduced
scalar reduced_b=_b[salestax]
* BEGIN controlled
ivregress 2sls logq logincome (logp=salestax), vce(robust)
* END controlled
scalar iv_b=_b[logp]
scalar iv_se=_se[logp]
assert abs(iv_b-reduced_b/first_b)<1e-8
* BEGIN strength
estat firststage
* END strength
* BEGIN weak_test
estat weakrobust, betanull(-1)
* END weak_test
* No overidentification test can be computed with one excluded instrument for
* one endogenous regressor. A weak-robust test does not establish exclusion.
clear
set obs 1
generate double first=first_b
generate double reduced=reduced_b
generate double iv=iv_b
generate double iv_robust_se=iv_se
export delimited using "iv_extension_results.csv", replace
display "ECO603_IV_EXTENSION_COMPLETE"
log close
