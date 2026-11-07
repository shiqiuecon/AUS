# 15. Binary outcomes and empirical judgment

## 01. How does payment burden predict mortgage denial?

A zero-or-one outcome is an event indicator.

A lender may want to understand how an applicant's payment-to-income ratio relates to the probability of denial. Our historical mortgage data contain 2,380 applications. The outcome equals one for denial and zero otherwise; the payment-to-income ratio is a proportion, so 0.30 means thirty percent.

We will compare a linear probability model, probit and logit on this common sample. The purpose is to understand probabilities, slopes and meaningful changes, not to infer that changing one recorded ratio alone would cause the fitted denial difference. Applicant characteristics, decision rules and selection can still matter for that causal claim.

A linear probability model fits a straight-line prediction to a zero-or-one outcome using OLS. Logit and probit are probability models with S-shaped prediction functions that stay between zero and one. We will define their functions and interpret their slopes before comparing the results.

Linear probability model: straight-line probability fit; logit and probit: bounded probability fits

## 02. The conditional mean of an indicator is a probability

This gives the linear model a useful starting interpretation.

For an outcome taking zero and one, its mean at specified covariates is the probability of one. The zero outcome contributes nothing to the mean, while the one outcome contributes its probability. We can therefore model the conditional mean as a denial probability.

The linear probability model, LPM, uses an ordinary linear regression for that probability. Its coefficient gives a constant probability change per unit of a regressor, conditional on the included variables. This makes it easy to interpret, but the fitted line need not stay between zero and one. That range issue is visible in the graph and motivates nonlinear alternatives.

\(E(Y\mid X)=P(Y=1\mid X)\) for \(Y\in\{0,1\}\)

LPM: \(P(Y=1\mid X)\approx a+bX\)

## 03. A probability change is not a relative percent change

Keep percentage points and percent distinct.

A probability increase from 0.18 to 0.23 is a rise of 0.05, or five percentage points. Relative to the initial 0.18, it is about a 27.8-percent increase. Both statements describe the same two probabilities on different scales.

For a regression coefficient, first identify the regressor change and calculate the probability difference. Only then express it in percentage points or relative percent if useful. Saying a probability rises by five percent when the intended meaning is five percentage points can materially change a policy interpretation.

\(0.23-0.18=0.05=5\) percentage points

Relative percent: \(100(0.05/0.18)\approx27.8\%\)

## 04. Read the actual LPM coefficient

Use a feasible ratio change, not an entire unit by default.

The fitted LPM slope on payment-to-income ratio is 0.604, with robust SE 0.098. A 0.10 increase in the ratio, such as from 0.30 to 0.40, therefore corresponds to about a 0.0604 probability difference, or 6.04 percentage points.

The coefficient applies to a whole one-unit ratio increase, which would be one hundred percentage points of payment burden. Translating it into a realistic change makes the comparison easier to assess. The fitted relationship is conditional on the simple model used here, not a complete account of how lenders make decisions.

```text
. regress deny pir, vce(robust)

------------------------------------------------------------------------------
             |               Robust
        deny | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         pir |   .6035349   .0984826     6.13   0.000     .4104144    .7966555
       _cons |  -.0799096   .0319666    -2.50   0.012    -.1425949   -.0172243
------------------------------------------------------------------------------
```

## 05. The LPM error variance is generally unequal

Robust SEs address uncertainty, not invalid fitted probabilities.

For a binary outcome with probability p, the conditional variance is p times one minus p. If the probability changes with X, the error variance usually changes too. This is why heteroskedasticity-robust inference is natural for an LPM under suitable observation assumptions.

The covariance option does not constrain predictions to the probability range. A negative fitted probability remains a functional-form problem even if its coefficient SE is computed robustly. Use the model's simplicity where appropriate, inspect the prediction range and distinguish an uncertainty adjustment from a change in the mean function.

\(\operatorname{Var}(Y\mid X)=p(X)\{1-p(X)\}\)

## 06. Probability scale

Apply the idea before reading the solution.

An LPM predicts 0.18 at one covariate vector and 0.23 at another. State the change in percentage points and relative percent.

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** An LPM predicts 0.18 at one covariate vector and 0.23 at another. State the change in percentage points and relative percent.

## 07. Probability scale: explanation

Connect the calculation to the empirical claim.

The change is 0.05, or 5 percentage points. Relative to 0.18 it is \(100\times0.05/0.18=27.78\%\). These are different scales. The contrast is predictive unless identification assumptions support a causal claim.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

The change is 0.05, or 5 percentage points. Relative to 0.18 it is \(100\times0.05/0.18=27.78\%\). These are different scales. The contrast is predictive unless identification assumptions support a causal claim.

## 08. Logit and probit keep fitted probabilities in range

A link function maps an unrestricted index into zero to one.

A linear index adds the intercept and coefficient-weighted regressors. Logit and probit pass that index through an increasing function that stays between zero and one. The logistic function produces logit probabilities; the standard-normal cumulative distribution function produces probit probabilities.

A cumulative distribution function gives the probability that a reference random variable is below a stated value. The two functions have similar S-shaped patterns but different scales. Their coefficients therefore cannot be compared numerically as if they were probability changes in the same units.

Capital Lambda labels the logistic cumulative function; capital Phi labels the standard-normal cumulative function. In both equations, p of X is the conditional probability and a plus b X is the linear index, with a as the intercept and b as the regressor coefficient.

Logit: \(p(X)=\Lambda(a+bX)=\dfrac{1}{1+e^{-(a+bX)}}\)

Probit: \(p(X)=\Phi(a+bX)\)

\(\Lambda\): logistic CDF; \(\Phi\): standard-normal CDF

## 09. A logit coefficient changes log odds

Translate it before discussing probabilities.

Odds are a probability divided by one minus that probability. Log odds are the natural logarithm of that ratio. In logit, a one-unit regressor change adds its coefficient to log odds. Exponentiating that coefficient gives an odds ratio, not a probability ratio.

For example, doubling the odds does not double every starting probability. The probability change depends on the initial index and other covariates. For an applied report, a stated prediction contrast is often easier to interpret than log odds. Keep the coefficient scale clear before choosing how to present the result.

\(\log\{p/(1-p)\}=a+bX\)

Odds ratio for \(\Delta X\): \(\exp(b\Delta X)\)

## 10. Probit also uses an index coefficient

Its probability effect depends on the reference density.

In probit, the fitted probability is the standard-normal cumulative probability evaluated at the index. Its local derivative is the coefficient multiplied by the standard-normal density at that index. A density describes how probability is distributed locally; it is not the probability at one exact continuous value.

The same positive coefficient can therefore produce different probability changes for applicants at different indices. Effects tend to be smaller near probabilities close to zero or one than near the middle. The graph makes this varying-slope feature visible and helps explain why a probit coefficient is not itself a percentage-point effect.

Lowercase phi is the standard-normal density, while uppercase Phi on the previous slide was its cumulative probability. The partial-derivative symbol means a local change in the fitted probability for a small change in X, with other included variables fixed.

\(\dfrac{\partial p}{\partial X}=b\phi(a+bX)\) for probit

\(\phi\): normal density; \(\partial p/\partial X\): local probability slope

## 11. Maximum likelihood chooses probabilities that support the observed events

Define the objective before interpreting the estimator.

A denied application contributes its fitted probability p to the likelihood, while a non-denied application contributes one minus p. Under the model's conditional-independence setup, multiply those contributions across applications. Maximum likelihood chooses coefficients that maximise that product, or equivalently its logarithm.

The likelihood is a function of coefficients given observed data; it is not a probability distribution over the coefficients. The procedure supplies an estimator under its model assumptions. Successful numerical convergence means the optimiser found a solution, not that the model has identified a causal effect or described every relevant decision process.

Theta denotes the full coefficient vector. L is the likelihood product; the capital product symbol multiplies the contribution from each application. Lowercase ell is its logarithm, called the log likelihood, and the summation adds the corresponding log contributions.

\(L(\theta)=\prod_i p_i(\theta)^{Y_i}\{1-p_i(\theta)\}^{1-Y_i}\)

\(\ell(\theta)=\sum_i[Y_i\log p_i+(1-Y_i)\log(1-p_i)]\)

\(\theta\): coefficients; \(L\): likelihood; \(\ell\): log likelihood

## 12. Compare the actual fitted probit and logit scales

Their coefficients are not directly comparable magnitudes.

The probit payment-burden coefficient is 2.968; the logit coefficient is 5.884. These numbers describe different index scales. It would be incorrect to conclude that the logit probability effect is about twice the probit effect simply because its coefficient is larger.

Compare fitted probabilities for the same ratio values or calculate marginal effects on the probability scale. The observed curves can be quite similar over a relevant range even when index coefficients differ substantially. Use a common sample and stated prediction scenario so the comparison concerns the models rather than different applicants.

```text
. probit deny pir, vce(robust)

------------------------------------------------------------------------------
             |               Robust
        deny | Coefficient  std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
         pir |   2.967907   .4653217     6.38   0.000     2.055893    3.879921
       _cons |  -2.194159   .1649761   -13.30   0.000    -2.517506   -1.870812
------------------------------------------------------------------------------
```

## 13. Predict probabilities at meaningful ratio values

State which covariates are changed or held fixed.

The margins output evaluates the probit model at payment-to-income ratios of 0.30, 0.40 and 0.50. With only this regressor and an intercept, these are direct fitted probabilities at the specified values. In richer models, margins can average predictions over the observed values of other covariates.

Read the probability difference between two rows as a finite contrast, not the derivative at either endpoint. The SE of that difference requires the covariance between the predicted quantities. A dedicated contrast or margins comparison should use the fitted covariance rather than subtract two SEs or assume predictions are independent.

```text
. margins, at(pir=(.3 .4 .5))

Adjusted predictions                                     Number of obs = 2,380
Model VCE: Robust

Expression: Pr(deny), predict()
1._at: pir = .3
2._at: pir = .4
3._at: pir = .5

------------------------------------------------------------------------------
             |            Delta-method
             |     Margin   std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
         _at |
          1  |   .0961532   .0069017    13.93   0.000      .082626    .1096803
          2  |   .1569683   .0101166    15.52   0.000     .1371402    .1767965
          3  |   .2387884    .024485     9.75   0.000     .1907987    .2867781
------------------------------------------------------------------------------
```

## 14. Logit coefficient

Apply the idea before reading the solution.

Why is a logit coefficient of 0.5 not a 50-percentage-point increase in probability?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Why is a logit coefficient of 0.5 not a 50-percentage-point increase in probability?

## 15. Logit coefficient: explanation

Connect the calculation to the empirical claim.

It is a change in the log odds per unit of the regressor, conditional on the specification. The probability change depends on the starting index and other covariates. Report an explicit prediction contrast or marginal effect to discuss probabilities.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

It is a change in the log odds per unit of the regressor, conditional on the specification. The probability change depends on the starting index and other covariates. Report an explicit prediction contrast or marginal effect to discuss probabilities.

## 16. A marginal effect is a local probability slope

For an indicator, use a discrete comparison instead.

For a continuous regressor, a marginal effect is the derivative of the fitted probability with respect to that regressor at stated covariates. In logit it is b times p times one minus p; in probit it is b times the reference density at the index.

For a zero-or-one regressor, the meaningful change is usually the probability at one minus the probability at zero, with a specified treatment of other covariates. A derivative treating the indicator as continuous would answer a different mathematical question. Define the change before asking software for an effect.

Logit: \(\partial p/\partial X=b\,p(1-p)\)

Binary \(D\): \(p(D=1,X)-p(D=0,X)\)

## 17. An average marginal effect averages individual slopes

The effect at the average covariates is another calculation.

An average marginal effect, AME, calculates the fitted derivative for each observed applicant's covariates and then averages those derivatives. A marginal effect at means calculates one derivative at the vector of sample-average covariates. Nonlinear functions generally make the two differ.

The average covariate vector can describe no actual applicant, especially when it contains fractions of category indicators. State which summary is reported and whose covariate distribution is being averaged over. This makes the effect interpretable for the sample and clarifies what would change if it were applied to another applicant population.

The subscript j selects the explanatory variable whose effect we report. The vertical evaluation bar means calculate its derivative at applicant i’s actual covariate values, then average over the n applicants. This is how the formula turns different individual slopes into a sample summary.

\(\mathrm{AME}=\dfrac1n\sum_i\left.\dfrac{\partial p(X)}{\partial X_j}\right|_{X=X_i}\)

\(X_j\): selected regressor; \(X_i\): applicant \(i\)’s covariates

```text
. margins, dydx(pir)

Average marginal effects                                 Number of obs = 2,380
Model VCE: Robust

Expression: Pr(deny), predict()
dy/dx wrt:  pir

------------------------------------------------------------------------------
             |            Delta-method
             |      dy/dx   std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
         pir |   .5664828   .0866687     6.54   0.000     .3966153    .7363504
------------------------------------------------------------------------------
```

## 18. A finite probability change can differ from a local approximation

Evaluate both endpoints when the proposed change is substantial.

For a continuous ratio increase of 0.10, multiplying a derivative by 0.10 is a local approximation. In an S-shaped model the slope changes along that movement. Calculating fitted probabilities at both endpoints gives the exact contrast within the fitted model.

This is the same distinction used for logs and quadratic regressions earlier in the course. A policy-sized contrast should follow the change decision-makers actually contemplate. The exactness concerns the fitted function, not a guarantee that the contrast is causal or that all its parameters are known without uncertainty.

## 19. Prediction performance needs more than a significance test

Check the probability model against its task.

A coefficient test asks about a parameter under the model; it does not fully assess prediction quality. Calibration asks whether groups assigned similar predicted probabilities experience event rates near those probabilities. Out-of-sample evaluation checks performance on observations not used to fit the coefficients.

For a rare event, predicting zero for everyone can produce high classification accuracy while providing little useful probability information. Select evaluation measures relevant to the decision and consider the costs of different errors. The modelling exercise should clarify what the predictions will be used for rather than equate a small p-value with a useful forecasting system.

A coefficient test asks about a parameter under the model; it does not fully assess prediction quality.

For a rare event, predicting zero for everyone can produce high classification accuracy while providing little useful probability information.

## 20. A fitted denial gap is not automatically a treatment effect

Selection and omitted applicant characteristics can remain.

An adjusted probability difference can still reflect unmeasured characteristics, selection into applications or aspects of the decision process outside the model. Choosing logit instead of OLS addresses the mean function's shape, not the exogeneity of a regressor.

If the research question is causal, specify the intervention and identify a credible comparison. If the aim is descriptive or predictive, state that purpose and assess the model accordingly. This lets the same data support useful work without presenting one statistical functional form as a general solution to identification.

The selection node S means applying for a mortgage; every observed application has S equal to one. In this possible graph, payment burden and unmeasured financial readiness both affect applying, while readiness also affects denial. Selecting applicants can open the shared-consequence route. Predicting denial within the observed applicant population is still a meaningful task; a causal burden effect or a claim about all potential borrowers needs additional selection and identification arguments.

## 21. Write a compact applied research memo

Connect the question, data, model, assumptions and result.

A useful memo identifies the decision or economic question, defines the observation and variables, explains the comparison and reports a meaningful magnitude with uncertainty. It then states the key assumptions and one limitation that could materially change the conclusion.

For the mortgage example, use a payment-burden contrast in percentage points and explain how it was obtained from the fitted model. For a demand, traffic or panel application, use the corresponding economic units. The course's methods differ, but the quality standard is consistent: readers should understand what the number measures and why the comparison could answer the question.

A useful memo identifies the decision or economic question, defines the observation and variables, explains the comparison and reports a meaningful magnitude with uncertainty.

For the mortgage example, use a payment-burden contrast in percentage points and explain how it was obtained from the fitted model.

## 22. Average marginal effect

Apply the idea before reading the solution.

Distinguish an average marginal effect from the marginal effect evaluated at the mean covariate vector.

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Distinguish an average marginal effect from the marginal effect evaluated at the mean covariate vector.

## 23. Average marginal effect: explanation

Connect the calculation to the empirical claim.

The AME computes an effect at each observation's covariates and averages those effects. The effect at means computes one effect at the vector of average covariates. In nonlinear models the two generally differ, and the average vector can describe no actual person.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

The AME computes an effect at each observation's covariates and averages those effects. The effect at means computes one effect at the vector of average covariates. In nonlinear models the two generally differ, and the average vector can describe no actual person.

## 24. DAG practice: selected applicants and prediction

Trace the routes before choosing a control.

All observed records are mortgage applicants. In the diagram, payment burden and unmeasured readiness affect applying, while readiness also affects denial. Trace the route opened by selecting applicants. Does this make within-applicant prediction meaningless, or does it change the causal claim that needs defending?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** All observed records are mortgage applicants. In the diagram, payment burden and unmeasured readiness affect applying, while readiness also affects denial. Trace the route opened by selecting applicants. Does this make within-applicant prediction meaningless, or does it change the causal claim that needs defending?

## 25. DAG practice: selected applicants and prediction: explanation

Explain what conditioning changes in this stated graph.

Selecting on application opens \(X\rightarrow S\leftarrow U\rightarrow Y\), because application is a common consequence of burden and readiness. A causal comparison of burden can then mix its relationship with the outcome and selection through readiness.

Predicting denial conditional on burden within the observed applicant population remains a legitimate descriptive task. A causal change in burden, or a conclusion about all potential borrowers, requires a clear target and additional identification and selection assumptions. A bounded logit or probit function does not itself close the path.

Selecting on application opens \(X\rightarrow S\leftarrow U\rightarrow Y\), because application is a common consequence of burden and readiness. A causal comparison of burden can then mix its relationship with the outcome and selection through readiness. Predicting denial conditional on burden within the observed applicant population remains a legitimate descriptive task. A causal change in burden, or a conclusion about all potential borrowers, requires a clear target and additional identification and selection assumptions. A bounded logit or probit function does not itself close the path.

## 26. Compare probabilities on one common scale

Reproduce the evidence, then explain its economic meaning.

Run meeting_15.do using mortgages.csv. Read the fitted probit denial probabilities at payment-to-income ratios 0.30 and 0.40, and calculate their difference in percentage points. Explain why multiplying the probit coefficient by 0.10 does not generally give this change. State whether the result measures a causal lending response.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_15.do using mortgages.csv. Read the fitted probit denial probabilities at payment-to-income ratios 0.30 and 0.40, and calculate their difference in percentage points. Explain why multiplying the probit coefficient by 0.10 does not generally give this change. State whether the result measures a causal lending response.

## 27. Compare probabilities on one common scale: explanation

A reproducible result needs both a calculation and an interpretation.

The fitted probit probabilities are 0.096153 at 0.30 and 0.156968 at 0.40. Their difference is 6.0815 percentage points. Both inputs are fractions, so the proposed change is ten percentage points of payment burden.

The probit coefficient multiplies the linear index. The probability change also depends on the nonlinear cumulative-normal function and the starting index, so a coefficient-times-change shortcut does not give the finite probability contrast. These predictions use the stated one-regressor historical sample model. Without a credible account of borrower selection and other omitted lending determinants, report a descriptive prediction contrast rather than a causal response to changing an applicant's burden.

The fitted probit probabilities are 0.096153 at 0.30 and 0.156968 at 0.40. Their difference is 6.0815 percentage points. Both inputs are fractions, so the proposed change is ten percentage points of payment burden. The probit coefficient multiplies the linear index. The probability change also depends on the nonlinear cumulative-normal function and the starting index, so a coefficient-times-change shortcut does not give the finite probability contrast. These predictions use the stated one-regressor historical sample model. Without a credible account of borrower selection and other omitted lending determinants, report a descriptive prediction contrast rather than a causal response to changing an applicant's burden.

## 28. Choose the method that addresses the empirical problem

A technical tool is useful when its role is explicit.

Multiple regression accounts for stated observed differences. Fixed effects remove stable unit components. IV uses instrument-induced variation under additional assumptions. Dynamic models represent dated adjustment, and robust, HAC or clustered covariance methods address specified uncertainty structures. Logit and probit provide bounded probability functions.

These roles can be combined, but none is a universal stamp of credibility. Begin each new application with the comparison and the threat it faces. Then choose and justify the smallest set of methods that makes the result meaningful, reproducible and honest about what remains unresolved.

Multiple regression accounts for stated observed differences.

These roles can be combined, but none is a universal stamp of credibility.

