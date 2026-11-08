* ECO603 Meeting 06: reproducible application.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "meeting_06.txt", text replace
postfile results str40 model str40 term double b se df n using "meeting_06_estimates.dta", replace
capture program drop record
program define record
    args model term
    post results ("`model'") ("`term'") (_b[`term']) (_se[`term']) (e(df_r)) (e(N))
end

clear
set seed 6030607
set obs 4000
generate double ability=rnormal()
generate double x=ability+rnormal()
generate double y=1+x+ability+rnormal()
* BEGIN short
regress y x, vce(robust)
* END short
record biased x
* BEGIN controlled
regress y x ability, vce(robust)
* END controlled
record controlled x
generate double clean_y=1+x+rnormal()
generate double noisy_x=x+sqrt(2)*rnormal()
* BEGIN measurement
regress clean_y noisy_x, vce(robust)
* END measurement
record measurement noisy_x
preserve
capture program drop mcdraw
program define mcdraw, rclass
    syntax, N(integer)
    clear
    set obs `n'
    generate double a=rnormal()
    generate double x=a+rnormal()
    generate double y=1+x+a+rnormal()
    quietly regress y x
    return scalar short=_b[x]
    quietly regress y x a
    return scalar adjusted=_b[x]
end
simulate b_short=r(short) b_adjusted=r(adjusted), reps(300) seed(6030610) nodots: mcdraw, n(100)
generate n=100
tempfile small
save `small'
simulate b_short=r(short) b_adjusted=r(adjusted), reps(300) seed(6030611) nodots: mcdraw, n(1000)
generate n=1000
append using `small'
export delimited using "meeting_06_simulation.csv", replace
restore

postclose results
use "meeting_06_estimates.dta", clear
export delimited using "meeting_06_estimates.csv", replace
display "ECO603_MEETING_06_COMPLETE"
log close
