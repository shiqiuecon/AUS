* ECO603: Qiu's Overleaf DiD sequence, slide9_5.tex.
* A zero-effect income-targeting simulation and the same DRDID data example.
* Head Start motivates the question; neither dataset estimates Head Start's effect.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "did_overleaf.txt", text replace

* Keep the original 300-person, lowest-income-quarter simulation idea.
* Define income BEFORE intervention; using realised post-policy income would
* introduce a further selection problem. The treatment effect is exactly zero.
set seed 6032027
set obs 300
generate int person=_n
generate double baseline_income=20+5*rnormal()
generate double baseline_outcome=30+baseline_income+rnormal()
generate double change_without=2+.4*(baseline_income-20)+.3*rnormal()
sort baseline_income person
generate byte group=(_n<=75)
generate double outcome0=baseline_outcome
generate double outcome1=baseline_outcome+change_without
generate double dy=outcome1-outcome0
export delimited person baseline_income group outcome0 outcome1 dy ///
    using "did_simulation.csv", replace
* BEGIN naive
regress dy group, vce(robust)
* END naive
scalar naive_b=_b[group]
scalar naive_se=_se[group]
* In a balanced panel, adding this time-invariant W in LEVELS cannot model
* different untreated changes. Verify it against the change regression.
preserve
keep person baseline_income group outcome0 outcome1
reshape long outcome, i(person) j(post)
* BEGIN levels
regress outcome i.group##i.post baseline_income, vce(cluster person)
* END levels
assert abs(_b[1.group#1.post]-naive_b)<1e-8
restore
* The following form is correct for this deliberately linear DGP. Because
* assignment is deterministic at an income threshold, it relies on functional
* form extrapolation rather than nonparametric overlap. State that explicitly.
* BEGIN trend_adjusted
regress dy group baseline_income, vce(robust)
* END trend_adjusted
scalar adjusted_b=_b[group]
scalar adjusted_se=_se[group]
clear
set obs 1
generate double true_effect=0
generate double naive=naive_b
generate double naive_robust_se=naive_se
generate double linear_adjusted=adjusted_b
generate double adjusted_robust_se=adjusted_se
export delimited using "did_simulation_results.csv", replace

* The real-data example is exactly the sample choice used in slide9_5.tex.
* Drop actual NSW trainees: compare experimental CONTROLS with CPS controls.
* experimental identifies the data-source group here, not training receipt.
import delimited "nsw_cps.csv", clear varnames(1) asdouble
assert _N==32834
isid person year
bysort person: assert _N==2
generate byte post=(year==1978)
* BEGIN placebo_simple
regress re i.experimental##i.post, vce(cluster person)
* END placebo_simple
scalar simple_b=_b[1.experimental#1.post]
scalar simple_se=_se[1.experimental#1.post]
* drdid is already installed locally; do not install or update it here.
which drdid
* BEGIN dr
drdid re age educ black married nodegree hisp re74, ///
    ivar(person) time(year) tr(experimental)
* END dr
matrix dr_coefficients=e(b)
matrix dr_covariance=e(V)
scalar dr_b=dr_coefficients[1,1]
scalar dr_se=sqrt(dr_covariance[1,1])
* Independent extension: omit the pre-1975 earnings control on the SAME people.
* BEGIN dr_without_history
drdid re age educ black married nodegree hisp, ///
    ivar(person) time(year) tr(experimental)
* END dr_without_history
matrix alt_coefficients=e(b)
matrix alt_covariance=e(V)
scalar alt_b=alt_coefficients[1,1]
scalar alt_se=sqrt(alt_covariance[1,1])
* Work with ONE row per person to display the four observed means.
preserve
collapse (mean) re (count) observations=re, by(experimental year)
export delimited using "did_real_means.csv", replace
restore
clear
set obs 1
generate double simple_placebo=simple_b
generate double simple_cluster_se=simple_se
generate double dr_placebo=dr_b
generate double dr_se=dr_se
generate double dr_without_re74=alt_b
generate double dr_without_re74_se=alt_se
generate long people=16417
generate long records=32834
export delimited using "did_real_results.csv", replace
display "ECO603_DID_OVERLEAF_COMPLETE"
log close
