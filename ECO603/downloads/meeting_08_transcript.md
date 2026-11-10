# 08. Heteroskedasticity and imperfect data

Match a variance correction, a different estimator or a data audit to the problem.

## Core lesson

### 01. Which regression problem needs which response?

The school application lets us distinguish unequal error variance from a misleading conditional-mean comparison. Heteroskedasticity means that error spread changes with observed inputs. It changes the conventional uncertainty calculation without, by itself, creating correlation between a regressor and the population error.

We first derive robust covariance, then use variance diagnostics and an explicit weighting model. We next consider measurement error, missing observations and influential cases. Those problems can change the coefficient or the population represented. Naming the source of the problem is what makes the choice of method useful.

Variance problem: covariance correction or a justified weighting model.

Measurement and selection problems: revisit the information and assumptions supporting the comparison.

### 02. Unequal error spread is heteroskedasticity

It concerns the error variance at different regressor values.

Heteroskedasticity means that the conditional error variance differs across observations. For example, districts with similar observed staffing can still have different degrees of score variation depending on their size or background. The constant-variance alternative is homoskedasticity.

Unequal variance does not by itself invalidate the OLS coefficient under exogeneity. It changes the conventional variance calculation and the classical efficiency comparison. This is why we need to separate an assumption about the average error from an assumption about its spread. An inference correction cannot repair an incorrect conditional mean or an endogenous policy variable.

\(E(u_i\mid X_i)=0\) concerns the mean

\(\operatorname{Var}(u_i\mid X_i)\) concerns spread

### 03. Robust covariance replaces a constant-variance calculation

The same OLS weights can propagate different observation variances.

Recall the weighted sum that gives the staffing slope error. The weights are fixed when we condition on the regressors. If errors across districts are uncorrelated, its variance is a sum. Square each weight, multiply it by that district's error variance, then add. A district with both a large weight and a large error variance can contribute a lot.

The basic heteroskedasticity robust estimator replaces each unknown variance by the squared fitted residual. H C means heteroskedasticity consistent. This first version is H C zero.

Stata’s usual robust option uses H C one. Multiply H C zero by n divided by n minus p, counting the intercept in p. The fitted line stays the same, so the two calculations use the same residuals. The approximation needs independent sampling and suitable finite moments. We will use a different covariance method when observations share shocks.

With slope weights \(w_i\), \(\operatorname{Var}(\widehat\beta_1\mid\mathcal X)=\sum_i w_i^2\sigma_i^2\).

HC0 estimates this by \(\sum_i w_i^2\widehat u_i^2\).

HC1 multiplies HC0 by \(n/(n-p)\). The same OLS fit supplies the residuals.

### 04. Look for a variance pattern before choosing a remedy

A squared residual is an observable clue about error spread.

The population error is not observed. After fitting the staffing equation, we can examine residuals, the observed scores minus their fitted predictions. Squaring a residual records its size without cancelling positive and negative errors. The plot shows these squared residuals against language composition in the actual district data.

The gold points average squared residuals within five ranges of language share. A changing pattern motivates a variance question, but it does not prove the proposed mean equation is correct. An omitted nonlinear mean can also create a residual pattern. Check the economic specification, then use a formal diagnostic to state precisely which variance restriction is being examined.

Residual: observed outcome minus fitted outcome.

Squared residual: \(\widehat u_i^2\).

Gold: average squared residual within each of five language-share ranges.

### 05. Breusch–Pagan turns the variance question into a test

The null is constant conditional error variance, given the chosen mean model.

Start with the question about spread. The null of constant variance says that the population errors have the same conditional variance at different staffing ratios and language shares.

Use the fitted residuals as information about the errors. Square them, then regress those squares on staffing and language share with an intercept. This is an auxiliary, or supporting, regression. Its R squared tells us how much of the variation in squared residuals those inputs explain.

With the I I D option, Stata multiplies that R squared by the sample size. Under the constant-variance null, a correct mean model and suitable independent sampling and moment conditions, compare the result with a chi-squared distribution with two degrees of freedom. The actual statistic is 29.50 and the p-value is below 0.001. That is evidence of unequal spread in this model. The test addresses variance, so it cannot tell us whether staffing is a credible causal comparison.

\(H_0:\operatorname{Var}(u_i\mid X_i)=\sigma^2\): constant variance; \(X_i\) denotes the included regressors.

Regress \(\widehat u_i^2\) on a constant, staffing and language share.

Test statistic: \(nR^2_{\mathrm{aux}}\), compared with \(\chi^2_2\).

```text
. estat hettest str el, iid

Breusch–Pagan/Cook–Weisberg test for heteroskedasticity 
Assumption: i.i.d. error terms
Variables: str el

H0: Constant variance

    chi2(2) =  29.50
Prob > chi2 = 0.0000
```

### 06. White allows a broader variance pattern

Squares and products expand the auxiliary variance regression.

The White test uses the original regressors, their squares and their pairwise products to look for a broader pattern in squared residuals. With staffing and language share, this adds staffing squared, language share squared and their product. There are five auxiliary slopes to test jointly. Their units differ, but the joint null is that every slope is zero.

The actual White statistic is 42.46, again with a p-value below 0.001. The first White-test block is our target; Stata also prints a separate decomposition involving other error properties. More flexible diagnostics use more degrees of freedom and can have difficulty detecting a real variance pattern in small samples. A failure to reject would not establish equal variance, and a rejection need not reveal the correct variance formula. An appropriate uncertainty procedure can be specified in advance rather than switched on only after a significant diagnostic.

Auxiliary columns: staffing, language share, their squares and their product.

White statistic: \(nR^2_{\mathrm{aux}}\), compared with \(\chi^2_5\).

Distinguish a variance diagnostic from a test of the causal comparison.

**Practice:** Why do BP and White have different degrees of freedom here?

**Explanation:** BP uses two auxiliary slopes; White adds two squares and one product, giving five.

```text
. estat imtest, white

White's test
H0: Homoskedasticity
Ha: Unrestricted heteroskedasticity

    chi2(5) =  42.46
Prob > chi2 = 0.0000
```

### 07. Weighted least squares changes how the line is fitted

Give less weight to observations with greater conditional error variance.

With robust OLS we keep the fitted line and revise its uncertainty. Weighted least squares, or WLS, changes the line itself. Give each district a positive weight. Multiply its squared residual by that weight before adding the loss. Districts with larger weights contribute more to the fitting objective.

If error variances are known up to a common scale, inverse-variance weights can improve precision under a correct mean model and independent errors. A district average might have a variance proportional to one over enrolment if pupil errors are independent with the same variance. That suggests weighting by enrolment. Pupils in a district can also share shocks, so explain why the model is plausible before using those weights.

To see the weighted calculation as ordinary least squares, multiply each row by the square root of its weight. Transform the outcome, every regressor and the column of ones. Keeping a new, unweighted intercept would change the model you fit.

WLS minimises \(\sum_i w_i(y_i-a-b_1STR_i-b_2EL_i)^2\).

Candidate model: \(\operatorname{Var}(u_i\mid X_i,n_i)=\sigma^2/n_i\Rightarrow w_i=n_i\).

Multiply \(y_i\), every regressor and the constant by \(\sqrt{n_i}\).

### 08. Read a weighted fit without assuming it must be better

A variance model and an economic target both matter.

In the actual school data, enrolment weighting changes the staffing slope from -1.101 to -1.326. The corresponding heteroskedasticity-robust standard errors are 0.433 and 0.661. The weighted estimate is not automatically more precise. The proposed inverse-enrolment variance model can be a poor description of district-level errors.

The enrolment-weighted fit gives larger districts more influence. If the conditional mean is misspecified, it can also change the approximation target. The same weighted coefficient is reproduced by the transformed regression in the do-file. That verifies the calculation, not the variance model or a causal staffing effect. Explain why the weights suit the question, use a justified uncertainty calculation, and report sensitivity to weighting.

OLS and WLS use the same 420 districts.

The transformed regression reproduces the weighted coefficient.

Weighting does not remove an omitted common cause.

**Practice:** Which column is easy to forget when transforming the weighted model?

**Explanation:** Multiply the constant column by the square root of enrolment as well.

```text
. regress score str el [aw=enrol], vce(robust)

------------------------------------------------------------------------------
             |               Robust
       score | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         str |   -1.32611   .6605944    -2.01   0.045     -2.62462   -.0276004
          el |  -.6390283   .0408085   -15.66   0.000    -.7192442   -.5588124
       _cons |   693.1913   13.26319    52.26   0.000     667.1203    719.2624
------------------------------------------------------------------------------
```

### 09. Compare conventional and robust output

Same coefficients, different estimated uncertainty.

The conventional staffing standard error is 0.380. The heteroskedasticity robust standard error is 0.433. Both commands fit the same line to the same 420 districts, which is why their coefficients agree.

To ask whether staffing and language share both have zero slopes, run test str el after the robust fit. This is a joint Wald test: it measures how far the estimated slopes are from their proposed values, accounting for their estimated variances and how they move together. Stata uses the covariance from the fit when computing its test. The earlier loss-of-fit F formula uses a common error variance, so it does not give this robust test. This slope question is also different from the variance question in Breusch–Pagan.

After the robust fit, use test str el for the joint null of two zero slopes.

Use the covariance from the fitted model for joint inference.

```text
. regress score str el, vce(robust)

------------------------------------------------------------------------------
             |               Robust
       score | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         str |  -1.101296   .4328472    -2.54   0.011     -1.95213   -.2504616
          el |  -.6497768   .0310318   -20.94   0.000     -.710775   -.5887786
       _cons |   686.0322   8.728224    78.60   0.000     668.8754     703.189
------------------------------------------------------------------------------
```

### 10. Measurement error creates a different source of inconsistency

A noisy regressor is not just a noisier outcome.

Let X be the true input and W the measured input. The measurement adds a noise term M, so W equals X plus M. Suppose the outcome error u has mean zero at each true X, and M has mean zero and is independent of both X and u.

In the outcome equation, replace true X by measured W minus M. The new error contains minus beta times M. The measured input W also contains M. They now share a term, so the zero conditional-mean argument for the true input does not carry over to the measured one.

In this simple one-regressor model, the limiting slope is beta multiplied by the reliability ratio. The numerator is the variance of true X. The denominator adds the variance of the noise. If those two variances are equal, the slope moves halfway toward zero. This is attenuation. When errors in measurement are related to X or to the outcome error, the bias can go in a different direction.

\(W=X+M,\quad Y=a+\beta W+(u-\beta M)\)

\(\operatorname{plim}\widehat b_W=\beta\dfrac{\operatorname{Var}(X)}{\operatorname{Var}(X)+\operatorname{Var}(M)}\)

### 11. Check attenuation in a separate generated comparison

Use a clean outcome equation and known noise variance.

The measurement-error example generates an outcome whose direct X slope is one, with no omitted ability effect in that outcome equation. The observed noisy regressor adds independent variance-two noise to a true regressor with variance two. The predicted reliability ratio is one half.

The actual Stata estimate is 0.518, close to the predicted limit of 0.5 in this generated sample. We keep this example separate from the omitted-ability equation so the explanation is not mixing two problems. More observations reduce sampling variation but do not remove the measurement-noise contribution in the denominator.

```text
. regress clean_y noisy_x, vce(robust)

------------------------------------------------------------------------------
             |               Robust
     clean_y | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
     noisy_x |   .5177554   .0112879    45.87   0.000     .4956249    .5398859
       _cons |   1.045476   .0221565    47.19   0.000     1.002037    1.088915
------------------------------------------------------------------------------
```

### 12. Missing observations can change the population represented

Complete-case analysis needs a selection argument.

Suppose a study observes staffing and scores only for districts that submit complete records. S marks whether the record is observed. In this first diagram, the selection arrow starts at an included input X. It could be that larger districts report more consistently. The unobserved error U is independent of X in this proposed model.

Trace a path from X to U after selecting observed records. The selection rule uses X alone, so conditioning on S does not open a route between them in this graph. With a correct conditional mean and enough variation in the observed inputs, the conditional slope can still be valid.

The sample can still contain a different mix of districts. Record who was lost and how the range of inputs changed. If the question concerns all districts, explain how your observed comparisons represent the ones that are missing. On the next slide, selection depends on the outcome and the causal argument changes.

### 13. A missing-data assumption should be stated in context

Explain what makes the analysed cases informative.

In this diagram, recording depends on the outcome. Look at the path from input X to error U. Both arrows point into Y, so Y is a collider on that path. S, the indicator that a record is observed, is a consequence of Y.

Select observed cases. Conditioning on S can open the path through Y, even though you did not put Y itself on the right-hand side of the regression. Among the recorded cases, the input may now predict part of the error. That threatens the zero conditional-mean condition.

Compare this with the previous slide, where selection depended only on X. In your own work, report which records are absent and what could explain it. A claim about the observed sample and a claim about all eligible units need different evidence.

### 14. Selection on observed inputs needs a conditional-mean argument

A nonrandom sample can preserve a coefficient while changing its target population.

Let S equal one when an observation is included in the analysed file. For the stated linear conditional-mean model, a useful condition is that the error still has mean zero given X and S equal to one. Selection depending only on observed X can preserve that condition when the original conditional mean is correct and selection carries no further error information.

This does not guarantee representativeness or support for every population prediction. Selecting districts by observed enrolment can remove part of the input range. Selection related to an outcome or an unobserved cause can instead alter the conditional error mean. The reason for missingness, the functional form and the target population all matter; a label such as complete cases alone does not establish validity.

\(S=1\): included observation; key mean condition: \(E[u\mid X,S=1]=0\).

One sufficient restriction: \(P(S=1\mid X,u)=P(S=1\mid X)\), with \(E[u\mid X]=0\).

Preserved conditional coefficients do not imply population representativeness.

### 15. Leverage and influence are different

An unusual regressor value need not be a bad observation.

An observation has high leverage when its regressor values are unusual relative to the rest of the sample. Think of a district with a staffing ratio far beyond the others. If it lies close to the line implied by the main group, it may have high leverage without greatly changing the fitted slope. A large residual instead means that its outcome lies far from the fitted prediction.

Influence asks how much the fitted result changes when that observation is omitted or perturbed. A distant-X observation that also lies far above the main pattern can rotate the fitted line substantially. Check its coding, measurement and relevance to the target population, then conduct a sensitivity analysis: compare the estimates after a specified change, such as refitting with and without the case. An influential observation is a reason to investigate the evidence, not an automatic reason to delete a valid case.

Leverage: unusual regressor values.

Large residual: unusual outcome given the fitted predictors.

Influence: material change in the fitted result when the case changes.

### 16. Choose the covariance and estimator for the stated problem

Try the comparison before opening the explanation.

For each case, name what changes and justify it: unequal district error variances under zero conditional mean; measurement error in staffing; selection related to an unobserved cause of scores. Does a small robust p-value establish a valid causal comparison?

State the assumptions and units alongside the calculation.

**Practice:** For each case, name what changes and justify it: unequal district error variances under zero conditional mean; measurement error in staffing; selection related to an unobserved cause of scores. Does a small robust p-value establish a valid causal comparison?

### 17. Choose the covariance and estimator for the stated problem: explanation

Follow the calculation and interpret its units.

Independent-data robust covariance addresses unequal variance without changing OLS coefficients. Measurement error and endogenous selection may alter identification and require additional information or design assumptions. A robust p-value does not establish those assumptions.

Independent-data robust covariance addresses unequal variance without changing OLS coefficients. Measurement error and endogenous selection may alter identification and require additional information or design assumptions. A robust p-value does not establish those assumptions.

### 18. Choose a remedy for the named problem

More observations, better measurement and better design do different jobs.

If uncertainty is large under a credible comparison, more informative observations may help. If classical regressor error is the issue, better measurement or a justified measurement-error strategy may be needed. If an omitted factor drives treatment selection, collecting more of the same comparison may only make the bias more precise.

State the problem before proposing a remedy. This makes the analysis useful to a reader deciding whether to fund new data, redesign a study or use a different estimator. A small p-value from a large sample is not the final objective; a well-supported answer to the empirical question is.

If uncertainty is large under a credible comparison, more informative observations may help.

State the problem before proposing a remedy.

### 19. From data problems to ordered observations

A variance correction changes how uncertainty is calculated; weighting changes how the line is fitted; a measurement or selection problem may change the relationship that the data can identify. We should name the problem before selecting a command.

The next block follows observations through time. Time ordering creates new possibilities for lagged responses and feedback, and changes the assumptions needed for both coefficients and uncertainty.

From data problems to ordered observations

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 20. A robust Wald test uses the covariance of the restrictions

Account for co-movement when testing several equalities.

The matrix version of the robust formula collects all coefficients at once. Let X have one row for each observation, with the intercept and regressors in its columns. Let x i be the corresponding column of regressor values. The middle term in the displayed H C zero covariance adds a contribution from each observation, weighted by its squared fitted residual. The factors on either side translate those contributions into coefficient uncertainty.

To test several restrictions together, let R have one row of coefficient weights for each of q restrictions. Let r collect their proposed values. Then g is R times the coefficient estimates minus r. If V hat estimates coefficient covariance, R V hat R prime estimates the covariance of g.

The Wald statistic is the squared distance of g from zero, using this covariance to account for different scales and co-movement. With independent restrictions, a nonsingular restriction covariance and the appropriate large-sample conditions, its null reference is chi squared with q degrees of freedom. For a single restriction this distance is the squared t statistic. Use a covariance estimator suited to the sampling and dependence structure.

Matrix HC0: \((X\prime X)^{-1}[\sum_i x_ix_i\prime\widehat u_i^2](X\prime X)^{-1}\).

\(H_0:R\beta=r\); \(g=R\widehat\beta-r\); \(R:q\times p\).

\(W=g\prime(R\widehat V R\prime)^{-1}g\xrightarrow{d}\chi_q^2\).

For one restriction, \(W=t^2\).

### 21. Generalised least squares includes variance and dependence

WLS is one special case of a broader transformation idea.

Variance describes each error's spread. Covariance describes how two errors move together. Generalised least squares, or GLS, uses an assumed structure for both to transform the regression into an equation with equal-variance errors and zero covariance between different errors. Weighted least squares is the special case with unequal variances but no cross-observation error covariance.

Feasible GLS first estimates the variance or dependence structure and then performs the transformation. Its precision advantage depends on a credible mean equation, exogeneity and a sufficiently accurate error model; estimating that structure adds uncertainty. For independent districts with uncertain variance patterns, robust OLS is a defensible starting point. For dated errors that move together, a model of that dependence may motivate another transformation. We return to that time-series case later. None of these transformations supplies a missing causal identification argument.

GLS: transform using the assumed error variances and covariances.

Feasible GLS: estimate that error structure before transforming.

Choose separately: mean specification, estimator and uncertainty calculation.

**Practice:** Would weighting remove an omitted cause related to staffing and scores?

**Explanation:** No. Justify the causal comparison separately from the error-variance model.

### 22. A DAG does not encode the size of the noise

Use a mean-zero innovation with a regressor-dependent scale.

An innovation is a new unpredictable disturbance. Let epsilon be independent of X, with mean zero and variance one. In this model, the outcome equals an intercept plus a staffing slope times X, plus sigma of X times epsilon. Sigma of X is a positive scale factor that can change with staffing.

The regression error u is the scaled innovation, so its conditional mean is zero while its conditional variance is sigma of X squared. Unequal spread can therefore coexist with a valid conditional-mean comparison. The DAG shows X and the independent innovation entering the outcome. The equation, rather than the arrow pattern alone, specifies how the noise scale changes.

Compare this with a diagram containing an unmeasured common cause of X and the outcome. That second story threatens identification. Robust SEs address an uncertainty calculation in the first story; they do not make the second story disappear. This distinction is why a causal graph and an error-variance assumption have different jobs.

\(Y=a+bX+\sigma(X)\varepsilon\)

\(E(u\mid X)=0,\quad\operatorname{Var}(u\mid X)=\sigma(X)^2\)

### 23. Do not choose an SE by the resulting significance

Match it to the sampling and dependence structure.

A robust SE can be larger or smaller than its conventional counterpart. Choosing the smaller one to obtain a preferred conclusion would reverse the reasoning needed for credible inference. First ask how observations were obtained and how their errors might be related.

District-level independent sampling suggests one set of methods; repeated observations on districts or common state-level shocks suggest others. Record the chosen method and its justification in the analysis plan. Then interpret the resulting uncertainty, including an inconvenient or inconclusive result. Statistical uncertainty is part of the evidence, not a nuisance to eliminate by selecting a formula.

Here X is training, Y is earnings, C is prior education and U is unmeasured motivation. Changing the covariance formula leaves the common-cause arrows unchanged. Conditioning on prior education can close its route, but unmeasured motivation still connects training and earnings. Use the DAG to discuss identification and the SE calculation to discuss uncertainty under the stated comparison. A preferred p-value cannot substitute for either argument.

### 24. Robust does what?

Try the comparison before opening the explanation.

After changing regress y x to regress y x, vce(robust), which point estimate changes? Does this solve omitted-variable bias?

Keep the regression equation and sample fixed. Separate the fitted coefficient from the covariance calculation used for its uncertainty.

**Practice:** After changing regress y x to regress y x, vce(robust), which point estimate changes? Does this solve omitted-variable bias?

### 25. Robust does what?: explanation

Follow the calculation and interpret its units.

On the same sample the OLS coefficient does not change. The estimated covariance matrix changes, so SEs, intervals and tests can change. Heteroskedasticity-robust inference does not remove omitted-variable bias or automatically allow serial dependence.

On the same sample the OLS coefficient does not change. The estimated covariance matrix changes, so SEs, intervals and tests can change. Heteroskedasticity-robust inference does not remove omitted-variable bias or automatically allow serial dependence.

### 26. Measurement error

Try the comparison before opening the explanation.

Observed x equals true \(X^*\) plus mean-zero noise independent of \(X^*\) and the outcome error. In a simple regression, what happens to the slope toward a positive true effect?

Use the separate measurement-error experiment and its independence assumptions. Do not carry the omitted-factor experiment into this calculation.

**Practice:** Observed x equals true \(X^*\) plus mean-zero noise independent of \(X^*\) and the outcome error. In a simple regression, what happens to the slope toward a positive true effect?

### 27. Measurement error: explanation

Follow the calculation and interpret its units.

Under classical measurement-error assumptions, the probability limit is \(\beta\dfrac{\operatorname{Var}(X^*)}{\operatorname{Var}(X^*)+\operatorname{Var}(noise)}\), which is between zero and \(\beta\). More observations do not remove this attenuation. The result does not automatically extend to nonclassical error or every multiple-regression setting.

Under classical measurement-error assumptions, the probability limit is \(\beta\dfrac{\operatorname{Var}(X^*)}{\operatorname{Var}(X^*)+\operatorname{Var}(noise)}\), which is between zero and \(\beta\). More observations do not remove this attenuation. The result does not automatically extend to nonclassical error or every multiple-regression setting.

### 28. Outcome noise has another role

Mean-zero independent outcome error need not attenuate the slope.

If the outcome is measured with an additional error unrelated to the regressors, that error enters the regression disturbance. Under the required mean assumptions, the coefficient can remain unbiased or consistent, while uncertainty increases. This differs from adding classical noise to a regressor.

The direction of measurement matters. Ask which variable is affected, whether the error is related to true values or other variables, and whether recording depends on the outcome. A generic statement that 'measurement error biases everything downward' would lose these distinctions. The data-collection process determines which model is plausible.

If the outcome is measured with an additional error unrelated to the regressors, that error enters the regression disturbance.

The direction of measurement matters.

### 29. Residual scaling and Cook’s distance answer different diagnostic questions

A diagnostic threshold prompts investigation rather than automatic deletion.

The OLS hat matrix maps the observed outcome vector to its fitted values. Its diagonal entry h i is the leverage of observation i. The average leverage is p divided by n, where p includes the intercept. Under the conventional variance model, residual i has variance sigma squared times one minus h i. Dividing a residual by its estimated scale gives an internally studentised residual.

Cook's distance combines residual size with leverage to describe how omitting a case can change the fitted coefficient vector. Its displayed formula uses p equal to the total number of fitted coefficients. A value above a rule-of-thumb threshold is an investigation signal, not a formal proof that a valid observation should be removed. Check coding and units, then report a clearly specified sensitivity comparison.

\(h_i=[X(X\prime X)^{-1}X\prime]_{ii}\), \(\sum_i h_i=p\).

Internally studentised residual: \(r_i=\widehat u_i/[s\sqrt{1-h_i}]\).

Cook distance: \(D_i=\dfrac{\widehat u_i^2}{p s^2}\dfrac{h_i}{(1-h_i)^2}\).

### 30. Influence

Try the comparison before opening the explanation.

A high-income district sits far from the remaining x values. Must it be deleted?

Distinguish an unusual X value from a case that materially changes the fitted line. Describe an investigation before deciding whether to exclude it.

**Practice:** A high-income district sits far from the remaining x values. Must it be deleted?

### 31. Influence: explanation

Follow the calculation and interpret its units.

No. A distant x value can have high leverage; influence also depends on its residual and its effect on the fit. Verify the observation, explain substantive relevance and show defensible sensitivity analysis. Delete a confirmed error for a documented reason, not because it changes significance.

No. A distant x value can have high leverage; influence also depends on its residual and its effect on the fit. Verify the observation, explain substantive relevance and show defensible sensitivity analysis. Delete a confirmed error for a documented reason, not because it changes significance.

### 32. Sensitivity analysis answers a stated question

Change one defensible feature and explain the comparison.

Sensitivity analysis examines how conclusions change under plausible alternative choices, such as a sample restriction, transformation or influential observation. It is most informative when the choice is linked to a substantive concern, rather than selected after seeing which result is convenient.

For example, compare a fitted income relationship with and without one verified extreme-income record and show the range supported by each sample. Report why the record is unusual and whether excluding it changes the target population. The exercise can reveal fragility without declaring either model automatically correct.

Sensitivity analysis examines how conclusions change under plausible alternative choices, such as a sample restriction, transformation or influential observation.

For example, compare a fitted income relationship with and without one verified extreme-income record and show the range supported by each sample.

### 33. The data audit belongs before the policy sentence

Units, ranges and recording rules affect interpretation.

Check how variables were measured, whether their ranges are possible and whether units changed over time or across sources. A thousand-dollar income variable interpreted as dollars creates a thousand-fold coefficient mistake even if the regression runs successfully.

Record sample restrictions and verify identifiers before merging data. A repeated identifier may represent genuine repeated observations or accidental duplicates; the appropriate response depends on the unit of observation. These checks are practical parts of applied econometrics because they determine which statistical and economic comparisons the software is actually computing.

Check how variables were measured, whether their ranges are possible and whether units changed over time or across sources.

Record sample restrictions and verify identifiers before merging data.

### 34. DAG practice: selection on an outcome descendant

Trace the routes before choosing a control.

Suppose X and the outcome disturbance U are independent before selection, both affect Y, and a record is observed depending on Y. Why can restricting attention to observed records create an X–U association? Compare this with selection depending only on included X.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Suppose X and the outcome disturbance U are independent before selection, both affect Y, and a record is observed depending on Y. Why can restricting attention to observed records create an X–U association? Compare this with selection depending only on included X.

### 35. DAG practice: selection on an outcome descendant: explanation

Explain what conditioning changes in this stated graph.

Y is a collider on \(X\rightarrow Y\leftarrow U\). The observation indicator S is its descendant. Conditioning on \(S=1\) can open the collider path, so the selected sample can violate the disturbance mean assumption even when the original sample satisfied it.

If selection instead depends only on included X and carries no extra information about U conditional on X, this particular path is not opened. The conditional slope may remain valid under a correct model and adequate support, although precision and the represented population can change. The selection mechanism, rather than missingness alone, determines the concern.

Y is a collider on \(X\rightarrow Y\leftarrow U\). The observation indicator S is its descendant. Conditioning on \(S=1\) can open the collider path, so the selected sample can violate the disturbance mean assumption even when the original sample satisfied it. If selection instead depends only on included X and carries no extra information about U conditional on X, this particular path is not opened. The conditional slope may remain valid under a correct model and adequate support, although precision and the represented population can change. The selection mechanism, rather than missingness alone, determines the concern.

### 36. Separate simulation truth from estimated evidence

Reproduce the evidence, then explain its economic meaning.

Run lab_06.do. Identify the known true coefficient in the first experiment, the short-regression probability limit, and the two estimated coefficients from the 4,000-observation data. Then explain the separate measurement-error result. Use the repeated-sample file to check whether a larger sample narrows the distribution around the correct or incorrect target.

Then use the actual schools.csv data. Fit score on staffing, language share and income; identify the largest Cook distance and compare the staffing slope with and without that district. Cook distance summarises how much omitting a case changes the fitted regression. Report this as sensitivity, not an instruction to delete it. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Then use the actual schools.csv data. Fit score on staffing, language share and income; identify the largest Cook distance and compare the staffing slope with and without that district. Cook distance summarises how much omitting a case changes the fitted regression. Report this as sensitivity, not an instruction to delete it. Keep your commands, log, output and interpretation.

### 37. Separate simulation truth from estimated evidence: explanation

A reproducible result needs both a calculation and an interpretation.

The first experiment sets the true direct X coefficient to one. Omitting A produces a probability limit of 1.5. In the generated 4,000-observation dataset, the short estimate is 1.516317 and the controlled estimate is 0.997692. They are estimates, so neither must equal its theoretical target exactly.

The measurement-error experiment is generated separately. Its noisy-regressor estimate is 0.517755, compared with an attenuation limit of one half under its stated variances and independence assumptions. In the repeated-sample graphs, larger samples concentrate the short regression near 1.5 and the controlled regression near one. Precision improves around each model's limit; sample size does not change a biased design into a valid one.

In the real-data follow-up, the full-sample staffing slope is -0.068776 and the slope excluding the most influential case is -0.093391, using 420 and 419 districts. The corresponding robust SEs are 0.290160 and 0.288784. Check coding and population relevance before deciding whether a valid case belongs in the analysis.

Simulation: direct coefficient 1; omitted-factor probability limit 1.5.

Real-data sensitivity: staffing slope \(-0.068776\rightarrow-0.093391\).

420 versus 419 districts; investigate an influential case before deciding whether to exclude it.

