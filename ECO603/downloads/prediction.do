* ECO603: a short real-data prediction exercise.
* Run from 03_Stata using StataMP 19.
* Input is the course's existing 420-district California school dataset.
* No packages, online data or student records are required.
version 19.0
clear all
set more off
set linesize 100
capture log close
log using "prediction.txt", text replace
import delimited "prediction.csv", clear varnames(1) asdouble
keep observat score str el income
isid observat
assert _N==420
assert !missing(score,str,el,income)

* Fix the split before fitting: 280 training districts, 140 held-out districts.
* The prediction target is other districts from this historical population.
* A future-year or new-county prediction task would need a different split.
sort observat
set seed 6032027
generate double split_draw=runiform()
sort split_draw observat
generate byte training=(_n<=280)
sort observat
assert training==0 | training==1
quietly count if training
assert r(N)==280
quietly count if !training
assert r(N)==140

* These nine candidate columns are specified before inspecting held-out errors.
* Fixed products use no estimated means, scales or outcome information.
generate double staffing_sq=str^2
generate double el2=el^2
generate double income2=income^2
generate double str_el=str*el
generate double str_income=str*income
generate double el_income=el*income
local base "str el income"
local expanded "`base' staffing_sq el2 income2 str_el str_income el_income"

* Freeze all four fits before computing any held-out prediction errors.
regress score `base' if training
assert e(N)==280
predict double pred_ols3, xb
estimates store ols3

regress score `expanded' if training
assert e(N)==280
predict double pred_ols9, xb
estimates store ols9

* Stata's built-in penalty scaling/standardisation uses the estimation sample.
* alpha(0) is ridge. The intercept is not penalised.
* CV means validation folds inside the training data, not the held-out test set.
* The initial default ridge grid selected its smallest value. Widen the grid
* because of that TRAINING-CV boundary, not because of held-out performance.
elasticnet linear score `expanded' if training, alpha(0) ///
    selection(cv, folds(5)) rseed(6032027) grid(200, ratio(1e-8))
assert e(N)==280
predict double pred_ridge, xb
lassocoef
estimates store ridge
scalar ridge_lambda=e(lambda_sel)

lasso linear score `expanded' if training, ///
    selection(cv, folds(5)) rseed(6032027)
assert e(N)==280
predict double pred_lasso, xb
lassocoef
estimates store lasso
scalar lasso_lambda=e(lambda_sel)

* Score each frozen model on the identical training and test districts.
* RMSE is sqrt(mean squared prediction error), in score points.
tempname results
postfile `results' str12 model double train_rmse test_rmse ///
    int train_n test_n double lambda using "prediction_results.dta", replace
foreach model in ols3 ols9 ridge lasso {
    assert !missing(pred_`model')
    generate double squared_error=(score-pred_`model')^2
    quietly summarize squared_error if training, meanonly
    scalar train_error=sqrt(r(mean))
    quietly summarize squared_error if !training, meanonly
    scalar test_error=sqrt(r(mean))
    scalar penalty=.
    if "`model'"=="ridge" scalar penalty=ridge_lambda
    if "`model'"=="lasso" scalar penalty=lasso_lambda
    post `results' ("`model'") (train_error) (test_error) (280) (140) (penalty)
    drop squared_error
}
postclose `results'
export delimited observat training score pred_* ///
    using "prediction_predictions.csv", replace
use "prediction_results.dta", clear
format train_rmse test_rmse %9.5f
list, noobs abbreviate(16)
export delimited using "prediction_results.csv", replace
display "Compare held-out errors; do not assume a penalty must outperform OLS."
display "This prediction comparison does not identify the causal staffing effect."
display "ECO603_PREDICTION_COMPLETE"
log close
