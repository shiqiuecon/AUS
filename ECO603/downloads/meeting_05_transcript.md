# 05. Multiple regression: statistical inference

## 01. School staffing: reproduce and explain

Reproduce the evidence, then explain its economic meaning.

Open schools.csv and run lab_01.do from the Stata bundle. Check the number of districts and the units of score and str. Compare the fitted score change when the ratio falls from 22 to 20 before and after including English-learner share. Write two sentences for a ministry reader: one reporting the magnitudes, and one explaining what comparison would still be needed for a causal claim.

Add district income to the model already controlling for language share. Recalculate the fitted gain for a two-student reduction, with its robust SE. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Add district income to the model already controlling for language share. Recalculate the fitted gain for a two-student reduction, with its robust SE. Keep your commands, log, output and interpretation.

## 02. School staffing: reproduce and explain: explanation

A reproducible result needs both a calculation and an interpretation.

The file has 420 districts. Score is measured in points and str in students per teacher. A reduction of two students per teacher has a fitted contrast of about +4.56 points in the short regression and +2.20 after adjustment for language composition. Both fits use the same districts, so the movement is a model change.

A suitable ministry statement reports these as adjusted or unadjusted associations. It explains that districts may differ in resources or learning needs that also affect teacher recruitment. A credible intervention comparison would need to address that source of staffing selection. The smaller adjusted estimate does not establish that all remaining selection has been removed.

The income-adjusted gain is 0.137551 points with robust SE 0.580319 on 420 districts. It remains an adjusted association.

Original two-student fitted gains: +4.56 and +2.20 points.

With income: gain \(0.137551\), robust SE \(0.580319\).

The smaller adjusted association does not establish a causal intervention effect.

## 03. Is the staffing relationship large enough to matter?

A decision needs magnitude and uncertainty.

Suppose a ministry would consider a staffing change worthwhile only if it improved learning by a meaningful amount relative to its cost. A fitted coefficient alone cannot say how accurately the sample measures that amount. Another comparable sample could give a different estimate. Statistical inference uses the sample and stated assumptions to quantify that uncertainty and assess claims about a population quantity.

We continue with the same staffing contrast and outcome units, then build a standard error, an interval and a test in that order of reasoning. An interval helps describe which magnitudes remain compatible with the estimated uncertainty. A test evaluates a specific proposed coefficient under a reference model. The decision also needs a credible causal comparison and a practical benefit threshold; neither is supplied by the software's uncertainty columns.

Question: how accurately does the sample measure the relevant magnitude?

Inference adds an uncertainty argument to the fitted estimate.

## 04. Recall which coefficient the model estimates

Keep its units and adjustment fixed.

The adjusted staffing slope is -1.101 points per additional student per teacher. It describes a linear comparison at fixed English-learner share. A reduction of two in the ratio changes the fitted score by minus two times this coefficient.

Before calculating a test, state the exact target. Testing whether the population slope is zero differs from testing whether it equals minus one point per student per teacher. A policy decision might also concern a two-student change rather than a one-unit slope. Inference becomes easier to interpret when the comparison is specified before the output is examined.

The adjusted staffing slope is -1.101 points per additional student per teacher.

Before calculating a test, state the exact target.

## 05. State a null before calculating a p-value

The evidence is evaluated under a specific claim.

A null hypothesis is a specific claim to evaluate, such as a staffing slope of zero. The alternative here is that the slope differs from zero in either direction. Write the null before examining whether the estimate looks surprising. Subtract the proposed value from the estimate, then divide by its standard error. This t statistic measures the gap in estimated standard-error units.

Under the null and the maintained inference assumptions, compare that statistic with its reference distribution. The two-sided p-value is the probability of a statistic at least as far from zero in either direction as the one observed. It is not the probability that the null is true. With the robust slope near minus 1.101 and SE near 0.433, the statistic for zero is about minus 2.54. Its interpretation depends on the reference approximation and sampling assumptions.

\(H_0:\beta_1=0\), \(H_1:\beta_1\ne0\)

\(t=(\widehat\beta_1-\beta_{1,0})/SE(\widehat\beta_1)\)

p-value: a tail probability under the null and reference assumptions.

## 06. Normal-error exact inference and robust approximations differ

Know which argument supports the reference distribution.

Under a correctly specified linear conditional mean, independent normal errors with constant conditional variance, and nonredundant regressors, conventional regression t and F reference distributions are exact conditional on the regressor values. The t distribution has heavier tails than the standard normal and uses the residual degrees of freedom. Normality here describes the errors, not a requirement that staffing itself be normally distributed.

 Heteroskedasticity-robust inference permits error spread to vary with the regressors. Its usual justification is a large-sample approximation, with suitable sampling and finite variances for the quantities being averaged and no small set of observations dominating the fit. It does not automatically allow errors to be related across districts, states or dates. The reference distribution and the covariance formula are distinct choices, and neither fixes a failure of the model's zero conditional-mean requirement.

Exact conventional t/F: normal, independent, equal-variance errors under the linear model.

Robust: large-sample approximation allowing unequal variance; dependence needs separate treatment.

## 07. State the reference distribution before choosing a critical value

An exact classical t test uses its residual degrees of freedom.

Suppose the conditional error vector is normal with mean zero and covariance sigma squared I, and the design has full column rank. Under these classical conditions, the standardised coefficient using its estimated conventional standard error follows a Student t distribution with n minus p degrees of freedom when the null is true. A critical value is a quantile: a cutoff that leaves a specified probability in a tail of that reference distribution.

For a two-sided five-percent test, choose c so that the chance of a t statistic exceeding c in magnitude is five percent. The corresponding interval is the estimate plus or minus c times its standard error. The familiar 1.96 is a large-sample normal critical value, not an exact value for every t distribution. A robust standard error uses a different, generally approximate, justification developed with large-sample theory and variance corrections.

Under the classical normal-error model and \(H_0:\beta_j=b_j^0\), \(T=(\widehat\beta_j-b_j^0)/SE_j\sim t_{n-p}\).

Choose \(c\) from \(P(|t_{n-p}|>c)=0.05\).

Interval: \(\widehat\beta_j\pm cSE_j\).

## 08. Build a confidence interval step by step

Combine the estimate with a stated reference rule.

A confidence interval is produced by a procedure designed to cover the target coefficient at a stated rate across repeated comparable samples. With a suitable large-sample normal approximation, a 95% interval is the estimate plus or minus 1.96 SEs. The procedure, not the fixed unknown coefficient, is what has the repeated-sample coverage property.

For an illustrative estimate of 0.30 with SE 0.12, the margin is 0.2352 and the interval is [0.0648, 0.5352]. These are teaching numbers. The interval describes uncertainty under its assumptions; it does not account for every possible source of bias in the empirical design.

\(\widehat\beta\pm1.96\operatorname{SE}(\widehat\beta)\)

## 09. Confidence interval

Try the comparison before opening the explanation.

An estimate is 0.30 with robust SE 0.12. Use the large-sample 1.96 rule to form a 95% interval and test a zero effect.

First calculate the estimate plus and minus 1.96 standard errors. For a zero null and a two-sided five-percent normal-reference test, check whether zero lies inside that same interval.

**Practice:** An estimate is 0.30 with robust SE 0.12. Use the large-sample 1.96 rule to form a 95% interval and test a zero effect.

## 10. Confidence interval: explanation

Follow the calculation and interpret its units.

\(0.30\pm1.96\times0.12\) gives [0.0648,0.5352]. The t ratio is 2.5, so reject zero at approximately 5% under the relevant large-sample assumptions. This says nothing by itself about the economic importance or causal validity of the estimate.

\(0.30\pm1.96\times0.12\) gives [0.0648,0.5352]. The t ratio is 2.5, so reject zero at approximately 5% under the relevant large-sample assumptions. This says nothing by itself about the economic importance or causal validity of the estimate.

## 11. A rejection is not an effect-size statement

Statistical significance and practical value answer different questions.

A statistically significant result passes a chosen testing threshold. A practically important result is large enough, in its application, to matter for a decision. A tiny effect can be estimated very precisely in a large sample; a meaningful effect can remain uncertain in a noisy sample.

For a staffing decision, translate the slope into a feasible ratio change and compare the implied learning difference with costs and relevant alternatives. Report an interval as well as the point estimate. The policy reader should be able to see both the range of values consistent with the model and the scale of the decision being considered.

A statistically significant result passes a chosen testing threshold.

For a staffing decision, translate the slope into a feasible ratio change and compare the implied learning difference with costs and relevant alternatives.

## 12. One-sided alternatives must express a prior scientific question

The direction of the alternative changes the tail probability.

A two-sided alternative asks whether a coefficient differs from a stated value in either direction. A one-sided alternative asks whether it is greater, or whether it is smaller. For a greater-than alternative, a large positive test statistic is evidence against the null; a large negative statistic is not evidence in the proposed direction.

Specify that direction before observing the estimated sign. The p-value is the appropriate reference-distribution tail probability under the null, not the probability that the null is true. Under a symmetric continuous reference, a correctly directed one-sided p-value is half the two-sided value; a statistic in the opposite direction has a large one-sided p-value. The economic meaning of the tested value and the model's assumptions remain part of the result.

Two-sided: \(H_1:\beta_j\ne b_j^0\); upper-sided: \(H_1:\beta_j>b_j^0\).

Upper-sided p-value: \(P(T\ge t_{obs}\mid H_0)\).

Choose the direction before inspecting the estimate.

## 13. Test a substantively meaningful value

A zero null is not the only relevant question.

Suppose one score point per additional student per teacher is an important benchmark. The null is now that the staffing slope equals minus one, not zero. The estimate's distance from minus one is much smaller than its distance from zero.

Use Stata's test command to evaluate that stated restriction. A coefficient can differ detectably from zero while remaining quite compatible with another meaningful benchmark. Explaining this comparison helps a decision-maker understand the range of plausible magnitudes rather than interpret a rejection as proof of one exact effect.

```text
. test str=-1

 ( 1)  str = -1

       F(  1,   417) =    0.05
            Prob > F =    0.8151
```

## 14. Compute uncertainty for the policy contrast

Scale the SE along with the estimate.

For a two-student reduction, the fitted change is minus two times the staffing slope. Its SE is twice the slope SE, because multiplying a random estimate by a constant multiplies its standard deviation by the constant's absolute value.

The lincom output supplies the contrast, SE and interval together. State that the result is in score points, with the included language composition held fixed. In interaction models, a contrast can combine several coefficients and its variance will also depend on their covariance. Using the model's covariance information avoids shortcuts such as adding standard errors.

\(\operatorname{SE}(-2\widehat\beta_1)=2\operatorname{SE}(\widehat\beta_1)\)

```text
. lincom -2*str

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |   2.202592   .8656943     2.54   0.011     .5009232     3.90426
------------------------------------------------------------------------------
```

## 15. A linear contrast uses cross-coefficient covariance

Combine coefficients in the units of the intended fitted comparison.

Let b be the vector of estimated coefficients and let a be a fixed vector specifying a comparison. A linear contrast is a prime b: a weighted sum of those coefficients. Call its population value theta and its estimated value theta hat. In the district model, reducing staffing by two and increasing language share by five percentage points gives the fitted score contrast minus two times the staffing slope plus five times the language-share slope, with other inputs fixed.

If V hat estimates the coefficient covariance, the contrast's estimated variance is a prime V hat a. Its cross terms matter because coefficients estimated from the same observations move together. To test that the contrast equals a stated value c, divide its difference from c by the square root of that variance and use a reference justified by the model. Stata's lincom carries out this calculation. This describes a fitted comparison; changing both inputs causally needs its own intervention argument.

\(\widehat\theta=a\prime b\); example: \(\widehat\theta=-2b_{str}+5b_{el}\).

\(\widehat{\operatorname{Var}}(\widehat\theta)=a\prime\widehat Va\), including cross-coefficient covariance.

Test \(H_0:\theta=c\) with \(t=(\widehat\theta-c)/\sqrt{a\prime\widehat Va}\), under the appropriate reference.

## 16. A confidence interval can contain an important effect

Failing to reject is not proof of no effect.

If an interval includes zero and also includes effects large enough to matter, the evidence may be too imprecise for the decision. It is inaccurate to report that the study established no relationship. It is also inaccurate to select a large value from the interval and present it as the estimated effect.

Report the point estimate and interval, explain which practical values remain compatible with the model and discuss what data would improve precision. This distinguishes an uninformative result from evidence that any meaningful effect is small. Both conclusions can be useful, but they require different evidence.

If an interval includes zero and also includes effects large enough to matter, the evidence may be too imprecise for the decision.

Report the point estimate and interval, explain which practical values remain compatible with the model and discuss what data would improve precision.

## 17. Economic versus statistical size

Try the comparison before opening the explanation.

A precisely estimated policy effect is 0.001 outcome units. Is a small p-value enough to recommend the policy?

Use the outcome units and the decision threshold. A small p-value and a worthwhile policy benefit are different claims.

**Practice:** A precisely estimated policy effect is 0.001 outcome units. Is a small p-value enough to recommend the policy?

## 18. Economic versus statistical size: explanation

Follow the calculation and interpret its units.

No. Report the units, realistic policy contrast, interval, policy cost and relevant outcome scale. Statistical detectability alone neither establishes causal validity nor a worthwhile benefit.

No. Report the units, realistic policy contrast, interval, policy cost and relevant outcome scale. Statistical detectability alone neither establishes causal validity nor a worthwhile benefit.

## 19. More observations help only under the relevant conditions

The information gain depends on what the observations add.

With independent, suitably informative observations and stable variance, sampling uncertainty often decreases at a square-root rate as sample size grows. Roughly quadrupling the sample can halve an SE in that setting. This is an approximation, not a promise for any enlarged database.

Repeating highly dependent information may add less precision. Increasing observations while leaving a regressor endogenous can make an estimate concentrate around the wrong value. The next large-sample lesson will separate these ideas explicitly. For today, tie any proposed sample expansion to the sampling structure and the comparison it improves.

Illustrative rate: \(\operatorname{SE}\propto n^{-1/2}\)

## 20. Avoid repeated specification searches for a preferred p-value

The search changes what an isolated test can mean.

If an analyst tries many outcomes, control sets and sample restrictions and reports only the most significant result, the reported p-value does not describe the whole search. Even under no relationship, enough attempts can produce apparently unusual results.

Keep a clear account of the main question and intended specification. Treat additional analyses as exploration and explain their role. This is especially useful in an applied master's project, where learning from data is legitimate but a final report should distinguish a planned test from a pattern noticed after many trials. Transparent reasoning is more informative than a table selected solely for stars.

If an analyst tries many outcomes, control sets and sample restrictions and reports only the most significant result, the reported p-value does not describe the whole search.

Keep a clear account of the main question and intended specification.

## 21. Write an uncertainty statement for a policy reader

Include the comparison, units and conditions.

A concise result sentence names the adjusted comparison, gives a feasible policy contrast and reports its uncertainty method. A second sentence explains the design limitation most relevant to causal interpretation. Neither should require the reader to decode a software table.

For example, describe a fitted two-student ratio difference at fixed language composition and give its robust interval in score points. Then explain that staffing may still respond to unmeasured learning needs. This keeps inference and identification connected to the same application while showing clearly which argument supports each claim.

A concise result sentence names the adjusted comparison, gives a feasible policy contrast and reports its uncertainty method.

For example, describe a fitted two-student ratio difference at fixed language composition and give its robust interval in score points.

## 22. Check the reference distribution and scale

An interval is meaningful only for a defined quantity.

Before interpreting an interval, identify whether it concerns a coefficient, a fitted contrast, an average outcome or an individual prediction. These quantities have different uncertainty calculations. A confidence interval for an average fitted score is not an interval for every district's score.

Also check whether the displayed interval uses a normal approximation or a t reference and whether the covariance option matches the observations. Small rounding differences in endpoints can arise from the reference rule. The important interpretation still depends on the coefficient target, units, sampling conditions and design.

Before interpreting an interval, identify whether it concerns a coefficient, a fitted contrast, an average outcome or an individual prediction.

Also check whether the displayed interval uses a normal approximation or a t reference and whether the covariance option matches the observations.

## 23. Use the evidence to identify the next useful step

Precision, fit and design can require different improvements.

An imprecise but credible comparison may benefit from more informative observations. A precise but confounded comparison may require better measurement or a different design. A poor functional form may require a model that represents nonlinear relationships more adequately.

These are different diagnoses. Explain why a proposed next step addresses the concern you have actually observed. This habit helps an empirical report remain useful even when the first regression does not settle the policy question. A statistically significant coefficient is not the only possible contribution of an applied analysis.

An imprecise but credible comparison may benefit from more informative observations.

These are different diagnoses.

## 24. DAG practice: uncertainty is not adjustment

Trace the routes before choosing a control.

Select prior education as a control in the training diagram. Which alternative route remains? If the analyst changes conventional SEs to heteroskedasticity-robust SEs, does that close the route or change the training coefficient on an identical specification and sample?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Select prior education as a control in the training diagram. Which alternative route remains? If the analyst changes conventional SEs to heteroskedasticity-robust SEs, does that close the route or change the training coefficient on an identical specification and sample?

## 25. DAG practice: uncertainty is not adjustment: explanation

Explain what conditioning changes in this stated graph.

The route through unmeasured motivation remains open after conditioning on education. The common-cause arrows are properties of the proposed causal story, not of the covariance formula. Switching the SE option does not block them.

On an unchanged model and sample, the OLS coefficient remains the same while the estimated covariance, intervals and tests can change. Robust inference addresses uncertainty under appropriate conditions. A credible causal comparison needs an additional argument about motivation or a design that addresses its role.

The route through unmeasured motivation remains open after conditioning on education. The common-cause arrows are properties of the proposed causal story, not of the covariance formula. Switching the SE option does not block them. On an unchanged model and sample, the OLS coefficient remains the same while the estimated covariance, intervals and tests can change. Robust inference addresses uncertainty under appropriate conditions. A credible causal comparison needs an additional argument about motivation or a design that addresses its role.

## 26. Report magnitude and uncertainty together

Reproduce the evidence, then explain its economic meaning.

Run lab_04.do. Use the robust staffing coefficient and SE to construct the approximate 95% interval with the 1.96 rule. Then calculate the estimate and SE for a two-student reduction. Explain how a decision about practical benefits differs from a test of a zero coefficient.

Use the fitted two-student gain to assess a null gain of one score point, rather than zero. Calculate the corresponding test ratio and explain its economic meaning. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Use the fitted two-student gain to assess a null gain of one score point, rather than zero. Calculate the corresponding test ratio and explain its economic meaning. Keep your commands, log, output and interpretation.

## 27. Report magnitude and uncertainty together: explanation

A reproducible result needs both a calculation and an interpretation.

The robust staffing estimate is -1.101296, with SE 0.432847. The approximate interval is [-1.9497, -0.2529] score points per additional student per teacher. Multiplying the slope by minus two gives 2.2026 points; its SE is 0.8657, because scaling by a constant scales the SE by its absolute value.

These calculations quantify uncertainty under the model and inference assumptions. Stata's finite-degree-of-freedom interval can differ slightly from the 1.96 approximation. A recommendation also needs a credible causal comparison, the outcome's educational importance, staffing costs and the relevant population. Rejecting a zero slope does not supply those additional pieces of the decision.

The ratio is (2.202592-1)/0.865694=1.389164. The result does not reject a one-point fitted gain using the approximate two-sided 1.96 rule. This is distinct from the zero-slope question and still needs credible identification for a causal claim.

Two-student gain: \(2.202592\), robust SE \(0.865694\).

Null gain of one: \((2.202592-1)/0.865694=1.389164\).

Separate a policy-relevant magnitude from a test against zero.

## 28. From finite-sample inference to large-sample reasoning

From finite-sample inference to large-sample reasoning

A test begins with a stated population restriction and an uncertainty estimate that matches the sampling model. A confidence interval expresses the precision of the coefficient, while its units and a decision-sized contrast express economic magnitude.

Exact classical reference distributions required strong error assumptions. Next we study what larger samples can justify when those assumptions are relaxed, and why a larger dataset does not repair a systematically misleading comparison.

From finite-sample inference to large-sample reasoning

## 29. A joint hypothesis asks whether several restrictions hold together

One coefficient test cannot replace the combined question.

A joint hypothesis places several restrictions on the population coefficients at once. In the district model, we could ask whether language share and district income both have zero conditional-mean coefficients, holding staffing in the equation. Checking two separate p-values does not create a single test with the intended overall rejection probability.

The restricted model imposes both zero coefficients; the unrestricted model includes both variables. Under the classical normal-error assumptions, an F test compares their loss of fit relative to the unrestricted error-variance estimate. Both fits must use the same observations and outcome. Unequal-variance robust joint testing requires an appropriate covariance construction, developed in the variance block.

Example joint null: \(H_0:\beta_{el}=0,\ \beta_{income}=0\).

Estimate the restricted and unrestricted models on the same observations.

Use the reference distribution justified by the covariance assumptions.

```text
. test 1.high 1.high#c.str

 ( 1)  1.high = 0
 ( 2)  1.high#c.str = 0

       F(  2,   415) =   98.88
            Prob > F =    0.0000
```

## 30. Classical fit-loss F tests require matched models

Restricted and unrestricted fits must answer one nested comparison.

The restricted model imposes the null equalities; the unrestricted model allows the corresponding coefficients to vary. Both must use the same outcome and observations. SSR is the sum of squared residuals. For a constructed example, let restricted SSR be 110, unrestricted SSR be 100, and let two restrictions remove two parameters. With 100 observations and five unrestricted coefficients, divide the SSR increase per restriction, five, by unrestricted SSR per residual degree of freedom, 100 divided by 95. The F statistic is 4.75.

The general formula uses q for the number of restrictions and k subscript U for all unrestricted coefficients, including the intercept. The classical F reference needs the conventional model assumptions. With unequal variance or dependence, use an appropriately estimated covariance and a justified joint test rather than treating a mechanical SSR calculation as universally valid.

\(F=\dfrac{(SSR_R-SSR_U)/q}{SSR_U/(n-k_U)}\)

Example: \(F=\dfrac{(110-100)/2}{100/(100-5)}=4.75\)

