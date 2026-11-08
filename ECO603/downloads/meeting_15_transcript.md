# 15. Binary response: logit, probit and interpretation

## 01. How should we model a mortgage decision probability?

How should we model a mortgage decision probability?

Our outcome is mortgage denial, coded one for denial and zero otherwise. The earlier linear probability model treated its conditional mean as a linear function of payment burden and the chosen controls. We now use the same application to introduce logit and probit probability models.

Their fitted indexes pass through smooth curves that keep probabilities between zero and one. We will define the curves and the scales of their coefficients, explain maximum likelihood, and translate estimates into probability comparisons. Keeping the data and the prediction task fixed makes those differences easier to see.

Same mortgage application and zero-or-one outcome.

Compare probability models and interpretable contrasts on the same observations.

## 02. Build a probability from an unrestricted index

First compute the index; then convert it to a bounded prediction.

A linear index is the intercept plus the coefficient-weighted predictors. With one predictor, call it z equal to a plus b times X. The index can be any real number. To obtain a probability, pass it through an increasing S-shaped function that returns a value between zero and one.

For the logistic function, an index of zero gives probability one half, an index of minus two gives about 0.119 and an index of two gives about 0.881. The same index change does not produce a constant probability change along the curve. This is the key difference from the LPM. The next slide introduces the logistic and normal cumulative functions explicitly, so that their coefficients and probability contrasts have a defined meaning.

Index: \(z=a+bX\)

Logistic examples: \(z=-2,0,2\Rightarrow p\approx0.119,0.500,0.881\)

## 03. Logit and probit keep fitted probabilities in range

Increasing S-shaped functions convert the index into a probability.

A cumulative distribution function gives the probability that a reference random variable is at or below a stated value. The logistic cumulative function is written capital Lambda and has the displayed exponential formula. Applying it to the index defines logit. The standard-normal cumulative function is written capital Phi; it is the area under the normal bell curve to the left of the index. Applying it defines probit.

Both functions give one half at an index of zero and approach zero or one toward the tails. Their shapes and coefficient scales differ. At an index of one, the logistic probability is about 0.731 and the normal cumulative probability about 0.841. A fitted coefficient is therefore an index coefficient. To compare models in an economically meaningful way, translate them to predicted probabilities or probability changes at the same covariate values.

Logit: \(p(X)=\Lambda(z)=1/(1+e^{-z})\)

Probit: \(p(X)=\Phi(z)\), area under a standard-normal curve left of \(z\)

\(z=a+bX\); both return probabilities in \((0,1)\).

## 04. A logit coefficient changes log odds

Translate it before discussing probabilities.

Odds compare the probability of an event with the probability of its nonoccurrence: p divided by one minus p. A probability of 0.20 has odds 0.25, or one denial for four non-denials. Doubling those odds gives 0.50, which corresponds to probability one third, not 0.40. Probability and odds are different scales.

In logit, the log of the odds equals the linear index. A one-unit X increase adds b to log odds and multiplies the odds by exp of b. For b equal to 0.5, a starting probability of 0.20 becomes about 0.292; a starting probability of 0.50 becomes about 0.622. The same coefficient therefore produces different probability changes. Report the starting values and a prediction contrast when discussing a finite change.

Odds: \(p/(1-p)\); log odds: \(\log\{p/(1-p)\}=a+bX\)

\(p=0.20\Rightarrow odds=0.25\)

For \(b=0.5,\Delta X=1\): \(0.20\rightarrow0.292\), \(0.50\rightarrow0.622\)

## 05. Logit coefficient

Try the comparison before opening the explanation.

Why is a logit coefficient of 0.5 not a 50-percentage-point increase in probability?

Name the coefficient’s index scale. Use the two starting-probability examples to explain why no single probability increase follows from the coefficient alone.

**Practice:** Why is a logit coefficient of 0.5 not a 50-percentage-point increase in probability?

## 06. Logit coefficient: explanation

Follow the calculation and interpret its units.

It is a change in the log odds per unit of the regressor, conditional on the specification. The probability change depends on the starting index and other covariates. Report an explicit prediction contrast or marginal effect, meaning a local probability slope, to discuss probabilities.

It is a change in the log odds per unit of the regressor, conditional on the specification. The probability change depends on the starting index and other covariates. Report an explicit prediction contrast or marginal effect, meaning a local probability slope, to discuss probabilities.

## 07. Probit also uses an index coefficient

Its probability effect depends on the reference density.

In probit, a plus b times X determines a location on the standard-normal curve. Capital Phi is the cumulative area to that location. Lowercase phi is the density, the height of the bell curve there. A small index movement adds approximately its width times that local height to the cumulative probability.

The probability slope is therefore b times phi evaluated at the index. The partial-derivative symbol means a local change in probability per small X change, holding other predictors fixed. At an index of zero the density is about 0.399; farther in either tail it is smaller. A coefficient times an X change moves the index, while the probability change also depends on the starting location. For a finite policy-sized contrast, compute both probabilities directly.

Probit: \(p=\Phi(a+bX)\)

Local slope: \(\partial p/\partial X=b\phi(a+bX)\)

\(\Phi\): cumulative area; \(\phi\): density height.

## 08. A latent-variable representation fixes an otherwise arbitrary scale

Only the sign of the unobserved index is observed.

A latent variable is an unobserved continuous quantity used to describe the binary decision. Write Y star as x prime beta plus e, and record Y equal to one when Y star is positive. Multiplying the entire latent equation by a positive constant leaves that observed decision unchanged, so its absolute scale cannot be recovered from the binary outcome alone.

Probit fixes the latent error to a standard normal distribution with variance one. Standard logit fixes a logistic distribution, with variance pi squared divided by three. Here pi is the mathematical constant, about 3.14159, rather than the inflation variable used in the earlier application. Their coefficients therefore use different index scales. A mechanical coefficient conversion is only a rough comparison, not an identity or a test that the models agree. Compare fitted probabilities and stated probability contrasts on the same observed sample.

\(Y^\star=x\prime\beta+e\), \(Y=1\{Y^\star>0\}\).

Probit: \(e\sim N(0,1)\); standard logit: logistic error variance \(\pi^2/3\).

Positive rescaling of the whole latent equation leaves the binary decision unchanged.

## 09. Compare two candidate models on observed events

Likelihood evaluates coefficient choices with the observed outcomes held fixed.

Suppose two independent applications have outcomes one and zero. A candidate model assigns denial probabilities 0.8 and 0.2. The probability of the two observed events is 0.8 times one minus 0.2, or 0.64. Another candidate assigns probabilities 0.4 and 0.6, giving 0.4 times one minus 0.6, or 0.16.

With the outcomes held fixed, this product is the likelihood as a function of the model's coefficient choices. The first candidate gives more support to the observed event pattern. Maximum likelihood chooses coefficients that maximize this support within the specified model. The product argument uses conditional independence of applications; clustered or dependent data require corresponding modeling and inference care. We now write the same calculation for all applications.

Observed \((Y_1,Y_2)=(1,0)\)

Candidate A: \(0.8(1-0.2)=0.64\)

Candidate B: \(0.4(1-0.6)=0.16\)

## 10. Maximum likelihood chooses probabilities that support the observed events

Define the objective before interpreting the estimator.

Let theta denote the full list of coefficients and p subscript i of theta the predicted denial probability for application i. An observed denial contributes p to the likelihood; an observed non-denial contributes one minus p. The expression with powers Y and one minus Y selects the appropriate contribution for each zero-or-one observation. The capital product symbol multiplies those contributions across the conditionally independent observations.

The log likelihood, written lowercase ell, takes the logarithm of that product and turns it into a sum. Because the logarithm is increasing, maximizing it selects the same coefficients. This numerical optimization fits the probability model; it does not establish the causal meaning of burden changes. After estimating coefficients, return to the probability scale to report quantities a lending reader can interpret.

\(L(\theta)=\prod_i p_i(\theta)^{Y_i}[1-p_i(\theta)]^{1-Y_i}\)

\(\ell(\theta)=\sum_i\{Y_i\log p_i+(1-Y_i)\log(1-p_i)\}\)

\(\theta\): coefficient list; \(\prod\): multiply; \(\sum\): add.

## 11. The Bernoulli log-likelihood makes the fitting criterion explicit

The observed outcome selects which probability enters each contribution.

Let p i of beta be the model probability of denial for applicant i. A Bernoulli distribution describes one zero-or-one outcome with probability p i of one. Its probability contribution is p i raised to Y i times one minus p i raised to one minus Y i. An observed denial contributes p i; an approval contributes one minus p i. Under conditional independence, multiply these contributions across applicants.

Taking logs turns the product into the displayed sum. Maximum likelihood chooses beta to maximise it. A gradient is the vector of derivatives of this objective with respect to the coefficients; numerical optimisation uses such local information. Existence, identification, suitable sampling, correct probability specification and enough smoothness and information near the true coefficients are needed for the familiar consistency and large-sample normal approximation. The fitting criterion itself does not establish a causal effect.

\(p_i(\beta)=G(x_i\prime\beta)\), \(Y_i\in\{0,1\}\).

\(L(\beta)=\prod_i p_i(\beta)^{Y_i}[1-p_i(\beta)]^{1-Y_i}\).

\(\ell(\beta)=\sum_i\{Y_i\log p_i(\beta)+(1-Y_i)\log[1-p_i(\beta)]\}\).

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

## 14. A marginal effect is a local probability slope

For an indicator, use a discrete comparison instead.

For a continuous regressor, a marginal effect is the derivative of the fitted probability with respect to that regressor at stated covariates. In logit it is b times p times one minus p; in probit it is b times the reference density at the index.

For a zero-or-one regressor, the meaningful change is usually the probability at one minus the probability at zero, with a specified treatment of other covariates. A derivative treating the indicator as continuous would answer a different mathematical question. Define the change before asking software for an effect.

Logit: \(\partial p/\partial X=b\,p(1-p)\)

Binary \(D\): \(p(D=1,X)-p(D=0,X)\)

## 15. An average marginal effect averages individual slopes

The effect at the average covariates is another calculation.

A marginal effect for a continuous predictor is the local probability slope at specified covariates. Because logit and probit are nonlinear, this slope can differ across applicants. An average marginal effect, abbreviated AME, evaluates the slope at each observed applicant's covariates and averages the results. It is not generally the slope at the average covariate values.

For a constructed logit with index equal to X, take two applicants at X equal to minus two and plus two. Both have probability slope p times one minus p, about 0.105, so their average slope is about 0.105. Their average X is zero, where the slope is 0.25. The difference comes from the curved probability function. In the formula, j selects the continuous predictor and the evaluation bar means use applicant i's actual covariates before averaging.

\(AME=\dfrac1n\sum_i\left.\dfrac{\partial p(X)}{\partial X_j}\right|_{X=X_i}\)

Constructed logit: \(X=(-2,2)\Rightarrow AME\approx0.105\)

At mean \(X=0\), slope \(=0.25\).

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

## 16. A partial effect at average inputs is a different object

A nonlinear transformation does not commute with averaging.

Let G be the response function mapping the index to a probability, and g its derivative, and x i the observed input vector. For a continuous input entering the index linearly without an interaction, applicant i's local probability slope is g of x i prime b times coefficient b j. The average partial effect, APE, averages these slopes over observed applicants. It is also called an average marginal effect, AME.

The partial effect at the average, PEA, instead evaluates the derivative at the vector of sample mean inputs. This vector can describe a hypothetical applicant, and its result generally differs from the average of applicant-specific slopes. For an indicator, use a finite zero-to-one probability difference, holding the other inputs at their stated values, then average if that is the target. Interactions and squares require the full derivative or fitted contrast.

\(APE_j=AME_j=n^{-1}\sum_i g(x_i\prime b)b_j\).

\(PEA_j=g(\overline x\prime b)b_j\), generally different from \(APE_j\).

An indicator effect is a fitted zero-to-one difference, not a derivative of the indicator.

## 17. Distinguish an average slope from a slope at average inputs

Try the comparison before opening the explanation.

For the mortgage probit model, explain what margins, dydx(pir) averages and what adding atmeans changes. Which reported quantity uses the observed covariate distribution? How should an indicator regressor be handled?

State the assumptions and units alongside the calculation.

**Practice:** For the mortgage probit model, explain what margins, dydx(pir) averages and what adding atmeans changes. Which reported quantity uses the observed covariate distribution? How should an indicator regressor be handled?

## 18. Distinguish an average slope from a slope at average inputs: explanation

Follow the calculation and interpret its units.

The average marginal effect averages the model’s input-specific local slopes over the observed applications. An atmeans calculation evaluates the slope at a single mean-input vector. Nonlinearity makes them generally different. Use a finite zero-to-one contrast for an indicator, with a clear reference population. Neither fitted probability comparison is automatically causal.

The average marginal effect averages the model’s input-specific local slopes over the observed applications. An atmeans calculation evaluates the slope at a single mean-input vector. Nonlinearity makes them generally different. Use a finite zero-to-one contrast for an indicator, with a clear reference population. Neither fitted probability comparison is automatically causal.

## 19. Average marginal effect

Try the comparison before opening the explanation.

Distinguish an average marginal effect from the marginal effect evaluated at the mean covariate vector.

Evaluate each applicant’s local slope before averaging. Compare this order with evaluating one slope at averaged covariates.

**Practice:** Distinguish an average marginal effect from the marginal effect evaluated at the mean covariate vector.

## 20. Average marginal effect: explanation

Follow the calculation and interpret its units.

The AME computes an effect at each observation's covariates and averages those effects. The effect at means computes one effect at the vector of average covariates. In nonlinear models the two generally differ, and the average vector can describe no actual person.

The AME computes an effect at each observation's covariates and averages those effects. The effect at means computes one effect at the vector of average covariates. In nonlinear models the two generally differ, and the average vector can describe no actual person.

## 21. A finite probability change can differ from a local approximation

Evaluate both endpoints when the proposed change is substantial.

For a continuous ratio increase of 0.10, multiplying a derivative by 0.10 is a local approximation. In an S-shaped model the slope changes along that movement. Calculating fitted probabilities at both endpoints gives the exact contrast within the fitted model.

This is the same distinction used for logs and quadratic regressions earlier in the course. A policy-sized contrast should follow the change decision-makers actually contemplate. The exactness concerns the fitted function, not a guarantee that the contrast is causal or that all its parameters are known without uncertainty.

## 22. Prediction performance needs more than a significance test

Check the probability model against its task.

Prediction asks how well the fitted probabilities describe new outcomes. Calibration means that events occur at roughly the predicted frequency among comparable cases assigned similar probabilities. For example, among 100 applications assigned a probability near 0.20, we would expect roughly 20 denials over repeated comparable sets, allowing sampling variation.

Classification instead converts probabilities into yes-or-no predictions using a threshold. If only five percent of applications are denied, predicting no denial for everyone gives 95-percent accuracy while finding no denials at all. Evaluate probability quality and decision costs, preferably on data not used to fit the model, rather than relying only on coefficient significance or raw accuracy. None of these prediction checks supplies the assumptions needed for a causal intervention claim.

Calibration: observed event frequencies agree with predicted probabilities.

Classification: threshold probabilities to make event/non-event decisions.

Assess new-data performance and the costs of different errors.

## 23. A fitted denial gap is not automatically a treatment effect

Selection and omitted applicant characteristics can remain.

An adjusted probability difference can still reflect unmeasured characteristics, selection into applications or aspects of the decision process outside the model. Choosing logit instead of OLS addresses the mean function's shape, not the exogeneity of a regressor.

If the research question is causal, specify the intervention and identify a credible comparison. If the aim is descriptive or predictive, state that purpose and assess the model accordingly. This lets the same data support useful work without presenting one statistical functional form as a general solution to identification.

The selection node S means applying for a mortgage; every observed application has S equal to one. In this possible graph, payment burden and unmeasured financial readiness both affect applying, while readiness also affects denial. Selecting applicants can open the shared-consequence route. Predicting denial within the observed applicant population is still a meaningful task; a causal burden effect or a claim about all potential borrowers needs additional selection and identification arguments.

## 24. Write a compact applied research memo

Connect the question, data, model, assumptions and result.

A useful memo identifies the decision or economic question, defines the observation and variables, explains the comparison and reports a meaningful magnitude with uncertainty. It then states the key assumptions and one limitation that could materially change the conclusion.

For the mortgage example, use a payment-burden contrast in percentage points and explain how it was obtained from the fitted model. For a demand, traffic or panel application, use the corresponding economic units. The course's methods differ, but the quality standard is consistent: readers should understand what the number measures and why the comparison could answer the question.

A useful memo identifies the decision or economic question, defines the observation and variables, explains the comparison and reports a meaningful magnitude with uncertainty.

For the mortgage example, use a payment-burden contrast in percentage points and explain how it was obtained from the fitted model.

## 25. DAG practice: selected applicants and prediction

Trace the routes before choosing a control.

All observed records are mortgage applicants. In the diagram, payment burden and unmeasured readiness affect applying, while readiness also affects denial. Trace the route opened by selecting applicants. Does this make within-applicant prediction meaningless, or does it change the causal claim that needs defending?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** All observed records are mortgage applicants. In the diagram, payment burden and unmeasured readiness affect applying, while readiness also affects denial. Trace the route opened by selecting applicants. Does this make within-applicant prediction meaningless, or does it change the causal claim that needs defending?

## 26. DAG practice: selected applicants and prediction: explanation

Explain what conditioning changes in this stated graph.

Selecting on application opens \(X\rightarrow S\leftarrow U\rightarrow Y\), because application is a common consequence of burden and readiness. A causal comparison of burden can then mix its relationship with the outcome and selection through readiness.

Predicting denial conditional on burden within the observed applicant population remains a legitimate descriptive task. A causal change in burden, or a conclusion about all potential borrowers, requires a clear target and additional identification and selection assumptions. A bounded logit or probit function does not itself close the path.

Selecting on application opens \(X\rightarrow S\leftarrow U\rightarrow Y\), because application is a common consequence of burden and readiness. A causal comparison of burden can then mix its relationship with the outcome and selection through readiness. Predicting denial conditional on burden within the observed applicant population remains a legitimate descriptive task. A causal change in burden, or a conclusion about all potential borrowers, requires a clear target and additional identification and selection assumptions. A bounded logit or probit function does not itself close the path.

## 27. Compare probabilities on one common scale

Reproduce the evidence, then explain its economic meaning.

Run lab_15.do using mortgages.csv. Read the fitted probit denial probabilities at payment-to-income ratios 0.30 and 0.40, and calculate their difference in percentage points. Explain why multiplying the probit coefficient by 0.10 does not generally give this change. State whether the result measures a causal lending response.

Add squared payment burden to the probit index. Recalculate the 0.30-to-0.40 fitted probability difference on the same observations and compare it with the original fit. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Add squared payment burden to the probit index. Recalculate the 0.30-to-0.40 fitted probability difference on the same observations and compare it with the original fit. Keep your commands, log, output and interpretation.

## 28. Compare probabilities on one common scale: explanation

A reproducible result needs both a calculation and an interpretation.

The fitted probit probabilities are 0.096153 at 0.30 and 0.156968 at 0.40. Their difference is 6.0815 percentage points. Both inputs are fractions, so the proposed change is ten percentage points of payment burden.

The probit coefficient multiplies the linear index. The probability change also depends on the nonlinear cumulative-normal function and the starting index, so a coefficient-times-change shortcut does not give the finite probability contrast. These predictions use the stated one-regressor historical sample model. Without a credible account of borrower selection and other omitted lending determinants, report a descriptive prediction contrast rather than a causal response to changing an applicant's burden.

The quadratic-index probit gives a 5.978643-percentage-point difference on 2,380 applications, compared with 6.0815 points in the original linear-index probit. The new fitted contrast is descriptive; curvature does not remove borrower-selection or omitted-variable problems.

Original linear-index probit contrast: 6.0815 percentage points.

Quadratic-index probit contrast: 5.9786 percentage points.

Same 2,380 applications; model flexibility does not establish a causal lending response.

## 29. Choose the method that addresses the empirical problem

A technical tool is useful when its role is explicit.

Multiple regression accounts for stated observed differences. Fixed effects remove stable unit components. IV uses instrument-induced variation under additional assumptions. Dynamic models represent dated adjustment, and robust, HAC or clustered covariance methods address specified uncertainty structures. Logit and probit provide bounded probability functions.

These roles can be combined, but none is a universal stamp of credibility. Begin each new application with the comparison and the threat it faces. Then choose and justify the smallest set of methods that makes the result meaningful, reproducible and honest about what remains unresolved.

Multiple regression accounts for stated observed differences.

These roles can be combined, but none is a universal stamp of credibility.

