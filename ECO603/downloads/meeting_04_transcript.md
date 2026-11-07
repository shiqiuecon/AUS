# 04. Uncertainty, tests and robust inference

## 01. Is the staffing relationship large enough to matter?

A decision needs magnitude and uncertainty.

Suppose a ministry can afford a small staffing change but wants evidence that its learning benefit would justify the cost. A coefficient gives a fitted magnitude; its standard error describes uncertainty under the model and sampling assumptions. Neither number alone answers the decision.

We will use the school regression with language composition fixed. The lesson develops a confidence interval, a test of a stated value and a policy-sized contrast. It then asks how unequal error spread changes the uncertainty calculation. Throughout, distinguish the observed fitted relationship from a causal staffing effect that needs its own research-design justification.

## 02. Recall which coefficient the model estimates

Keep its units and adjustment fixed.

The adjusted staffing slope is -1.101 points per additional student per teacher. It describes a linear comparison at fixed English-learner share. A reduction of two in the ratio changes the fitted score by minus two times this coefficient.

Before calculating a test, state the exact target. Testing whether the population slope is zero differs from testing whether it equals minus one point per student per teacher. A policy decision might also concern a two-student change rather than a one-unit slope. Inference becomes easier to interpret when the comparison is specified before the output is examined.

The adjusted staffing slope is -1.101 points per additional student per teacher.

Before calculating a test, state the exact target.

## 03. An outcome distribution is not a sampling distribution

The random object changes.

A distribution describes the possible values of a random quantity and how often they occur. The distribution of district scores concerns variation among districts. The sampling distribution of an estimator concerns the slopes we would obtain from repeated comparable samples.

These are different objects. A large spread of scores does not itself tell us the SE of a slope. Sample size, error variation and usable regressor variation all matter for the estimator's spread. We use repeated samples as a way to understand uncertainty even though the empirical study usually provides one observed dataset.

A distribution describes the possible values of a random quantity and how often they occur.

These are different objects.

## 04. A standard error estimates the estimator’s spread

It is not the standard deviation of the outcome.

The SE estimates the standard deviation of the coefficient across comparable samples. A coefficient two SEs from a hypothesised value is more unusual under that hypothesis than a coefficient half an SE away, subject to the reference distribution and model assumptions.

Do not use the residual spread or the score standard deviation in place of the coefficient SE. They measure different kinds of variation. Also remember that the SE is itself estimated. Especially in small or strongly dependent samples, a familiar formula may give an unreliable uncertainty statement if its conditions do not fit the data.

In the displayed statistic, beta-j-zero is the value proposed by the null hypothesis for coefficient j. The t statistic is the signed gap between the estimate and that proposed value, measured in estimated standard-error units.

\(t=\dfrac{\widehat\beta_j-\beta_{j,0}}{\operatorname{SE}(\widehat\beta_j)}\)

\(\beta_{j,0}\): proposed null value; \(t\): gap measured in SE units

## 05. Build a confidence interval step by step

Combine the estimate with a stated reference rule.

A confidence interval is produced by a procedure designed to cover the target coefficient at a stated rate across repeated comparable samples. With a suitable large-sample normal approximation, a 95% interval is the estimate plus or minus 1.96 SEs. The procedure, not the fixed unknown coefficient, is what has the repeated-sample coverage property.

For an illustrative estimate of 0.30 with SE 0.12, the margin is 0.2352 and the interval is [0.0648, 0.5352]. These are teaching numbers. The interval describes uncertainty under its assumptions; it does not account for every possible source of bias in the empirical design.

\(\widehat\beta\pm1.96\operatorname{SE}(\widehat\beta)\)

## 06. Confidence interval

Apply the idea before reading the solution.

An estimate is 0.30 with robust SE 0.12. Use the large-sample 1.96 rule to form a 95% interval and test a zero effect.

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** An estimate is 0.30 with robust SE 0.12. Use the large-sample 1.96 rule to form a 95% interval and test a zero effect.

## 07. Confidence interval: explanation

Connect the calculation to the empirical claim.

\(0.30\pm1.96\times0.12\) gives [0.0648,0.5352]. The t ratio is 2.5, so reject zero at approximately 5% under the relevant large-sample assumptions. This says nothing by itself about the economic importance or causal validity of the estimate.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

\(0.30\pm1.96\times0.12\) gives [0.0648,0.5352]. The t ratio is 2.5, so reject zero at approximately 5% under the relevant large-sample assumptions. This says nothing by itself about the economic importance or causal validity of the estimate.

## 08. State a null before calculating a p-value

The evidence is evaluated under a specific claim.

A null hypothesis is a specified population statement, such as a zero staffing slope. A two-sided alternative allows either a positive or negative departure. The t statistic scales the estimate's distance from the null by its SE.

A p-value is the probability, under the null and test assumptions, of a statistic at least as extreme as the observed statistic. It is not the probability that the null is true, nor the probability that the policy works. Choose the comparison, sidedness and significance threshold for substantive reasons, rather than after inspecting which formulation gives a smaller p-value.

A null hypothesis is a specified population statement, such as a zero staffing slope.

A p-value is the probability, under the null and test assumptions, of a statistic at least as extreme as the observed statistic.

## 09. A rejection is not an effect-size statement

Statistical significance and practical value answer different questions.

A statistically significant result passes a chosen testing threshold. A practically important result is large enough, in its application, to matter for a decision. A tiny effect can be estimated very precisely in a large sample; a meaningful effect can remain uncertain in a noisy sample.

For a staffing decision, translate the slope into a feasible ratio change and compare the implied learning difference with costs and relevant alternatives. Report an interval as well as the point estimate. The policy reader should be able to see both the range of values consistent with the model and the scale of the decision being considered.

A statistically significant result passes a chosen testing threshold.

For a staffing decision, translate the slope into a feasible ratio change and compare the implied learning difference with costs and relevant alternatives.

## 10. Normal-error exact inference and robust approximations differ

Know which argument supports the reference distribution.

Under the classical linear model with normally distributed errors and the other required conditions, certain t and F procedures have exact finite-sample reference distributions. Finite sample means a fixed number of observations rather than an argument about increasing sample size.

Robust inference generally relies on a large-sample approximation instead. Using a t label in software does not turn that approximation into an exact result under arbitrary error behaviour. The applied task is to state why the chosen covariance estimate and reference rule are suitable, rather than assume every printed p-value has the same justification.

Under the classical linear model with normally distributed errors and the other required conditions, certain t and F procedures have exact finite-sample reference distributions.

Robust inference generally relies on a large-sample approximation instead.

## 11. Unequal error spread is heteroskedasticity

It concerns the error variance at different regressor values.

Heteroskedasticity means that the conditional error variance differs across observations. For example, districts with similar observed staffing can still have different degrees of score variation depending on their size or background. The constant-variance alternative is homoskedasticity.

Unequal variance does not by itself invalidate the OLS coefficient under exogeneity. It changes the conventional variance calculation and the classical efficiency comparison. This is why we need to separate an assumption about the average error from an assumption about its spread. An inference correction cannot repair an incorrect conditional mean or an endogenous policy variable.

\(E(u_i\mid X_i)=0\) concerns the mean

\(\operatorname{Var}(u_i\mid X_i)\) concerns spread

## 12. A DAG does not encode the size of the noise

Use a mean-zero innovation with a regressor-dependent scale.

An innovation is a new unpredictable disturbance. Let epsilon be independent of X, with mean zero and variance one. In this model, the outcome equals an intercept plus a staffing slope times X, plus sigma of X times epsilon. Sigma of X is a positive scale factor that can change with staffing.

The regression error u is the scaled innovation, so its conditional mean is zero while its conditional variance is sigma of X squared. Unequal spread can therefore coexist with a valid conditional-mean comparison. The DAG shows X and the independent innovation entering the outcome. The equation, rather than the arrow pattern alone, specifies how the noise scale changes.

Compare this with a diagram containing an unmeasured common cause of X and the outcome. That second story threatens identification. Robust SEs address an uncertainty calculation in the first story; they do not make the second story disappear. This distinction is why a causal graph and an error-variance assumption have different jobs.

\(Y=a+bX+\sigma(X)\varepsilon\)

\(E(u\mid X)=0,\quad\operatorname{Var}(u\mid X)=\sigma(X)^2\)

## 13. Compare conventional and robust output

Same coefficients, different estimated uncertainty.

The conventional staffing SE is 0.380; the heteroskedasticity-robust SE is 0.433. The coefficient is identical because both commands solve the same OLS problem on the same 420 districts.

The robust option changes the estimated covariance matrix, which records the estimated variances of coefficients and how their estimates vary together. We focus on the staffing variance and its square root, the SE. The new calculation allows unequal error spread under suitable conditions. It does not automatically allow observations to share arbitrary dependence, a distinction that will matter in the time-series and panel lessons.

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

## 14. Do not choose an SE by the resulting significance

Match it to the sampling and dependence structure.

A robust SE can be larger or smaller than its conventional counterpart. Choosing the smaller one to obtain a preferred conclusion would reverse the reasoning needed for credible inference. First ask how observations were obtained and how their errors might be related.

District-level independent sampling suggests one set of methods; repeated observations on districts or common state-level shocks suggest others. Record the chosen method and its justification in the analysis plan. Then interpret the resulting uncertainty, including an inconvenient or inconclusive result. Statistical uncertainty is part of the evidence, not a nuisance to eliminate by selecting a formula.

Here X is training, Y is earnings, C is prior education and U is unmeasured motivation. Changing the covariance formula leaves the common-cause arrows unchanged. Conditioning on prior education can close its route, but unmeasured motivation still connects training and earnings. Use the DAG to discuss identification and the SE calculation to discuss uncertainty under the stated comparison. A preferred p-value cannot substitute for either argument.

## 15. Robust does what?

Apply the idea before reading the solution.

After changing regress y x to regress y x, vce(robust), which point estimate changes? Does this solve omitted-variable bias?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** After changing regress y x to regress y x, vce(robust), which point estimate changes? Does this solve omitted-variable bias?

## 16. Robust does what?: explanation

Connect the calculation to the empirical claim.

On the same sample the OLS coefficient does not change. The estimated covariance matrix changes, so SEs, intervals and tests can change. Heteroskedasticity-robust inference does not remove omitted-variable bias or automatically allow serial dependence.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

On the same sample the OLS coefficient does not change. The estimated covariance matrix changes, so SEs, intervals and tests can change. Heteroskedasticity-robust inference does not remove omitted-variable bias or automatically allow serial dependence.

## 17. Test a substantively meaningful value

A zero null is not the only relevant question.

Suppose one score point per additional student per teacher is an important benchmark. The null is now that the staffing slope equals minus one, not zero. The estimate's distance from minus one is much smaller than its distance from zero.

Use Stata's test command to evaluate that stated restriction. A coefficient can differ detectably from zero while remaining quite compatible with another meaningful benchmark. Explaining this comparison helps a decision-maker understand the range of plausible magnitudes rather than interpret a rejection as proof of one exact effect.

```text
. test str=-1

 ( 1)  str = -1

       F(  1,   417) =    0.05
            Prob > F =    0.8151
```

## 18. Compute uncertainty for the policy contrast

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

## 19. A confidence interval can contain an important effect

Failing to reject is not proof of no effect.

If an interval includes zero and also includes effects large enough to matter, the evidence may be too imprecise for the decision. It is inaccurate to report that the study established no relationship. It is also inaccurate to select a large value from the interval and present it as the estimated effect.

Report the point estimate and interval, explain which practical values remain compatible with the model and discuss what data would improve precision. This distinguishes an uninformative result from evidence that any meaningful effect is small. Both conclusions can be useful, but they require different evidence.

If an interval includes zero and also includes effects large enough to matter, the evidence may be too imprecise for the decision.

Report the point estimate and interval, explain which practical values remain compatible with the model and discuss what data would improve precision.

## 20. More observations help only under the relevant conditions

The information gain depends on what the observations add.

With independent, suitably informative observations and stable variance, sampling uncertainty often decreases at a square-root rate as sample size grows. Roughly quadrupling the sample can halve an SE in that setting. This is an approximation, not a promise for any enlarged database.

Repeating highly dependent information may add less precision. Increasing observations while leaving a regressor endogenous can make an estimate concentrate around the wrong value. The next large-sample lesson will separate these ideas explicitly. For today, tie any proposed sample expansion to the sampling structure and the comparison it improves.

Illustrative rate: \(\operatorname{SE}\propto n^{-1/2}\)

## 21. Avoid repeated specification searches for a preferred p-value

The search changes what an isolated test can mean.

If an analyst tries many outcomes, control sets and sample restrictions and reports only the most significant result, the reported p-value does not describe the whole search. Even under no relationship, enough attempts can produce apparently unusual results.

Keep a clear account of the main question and intended specification. Treat additional analyses as exploration and explain their role. This is especially useful in an applied master's project, where learning from data is legitimate but a final report should distinguish a planned test from a pattern noticed after many trials. Transparent reasoning is more informative than a table selected solely for stars.

If an analyst tries many outcomes, control sets and sample restrictions and reports only the most significant result, the reported p-value does not describe the whole search.

Keep a clear account of the main question and intended specification.

## 22. Write an uncertainty statement for a policy reader

Include the comparison, units and conditions.

A concise result sentence names the adjusted comparison, gives a feasible policy contrast and reports its uncertainty method. A second sentence explains the design limitation most relevant to causal interpretation. Neither should require the reader to decode a software table.

For example, describe a fitted two-student ratio difference at fixed language composition and give its robust interval in score points. Then explain that staffing may still respond to unmeasured learning needs. This keeps inference and identification connected to the same application while showing clearly which argument supports each claim.

A concise result sentence names the adjusted comparison, gives a feasible policy contrast and reports its uncertainty method.

For example, describe a fitted two-student ratio difference at fixed language composition and give its robust interval in score points.

## 23. Economic versus statistical size

Apply the idea before reading the solution.

A precisely estimated policy effect is 0.001 outcome units. Is a small p-value enough to recommend the policy?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** A precisely estimated policy effect is 0.001 outcome units. Is a small p-value enough to recommend the policy?

## 24. Economic versus statistical size: explanation

Connect the calculation to the empirical claim.

No. Report the units, realistic policy contrast, interval, policy cost and relevant outcome scale. Statistical detectability alone neither establishes causal validity nor a worthwhile benefit.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

No. Report the units, realistic policy contrast, interval, policy cost and relevant outcome scale. Statistical detectability alone neither establishes causal validity nor a worthwhile benefit.

## 25. Check the reference distribution and scale

An interval is meaningful only for a defined quantity.

Before interpreting an interval, identify whether it concerns a coefficient, a fitted contrast, an average outcome or an individual prediction. These quantities have different uncertainty calculations. A confidence interval for an average fitted score is not an interval for every district's score.

Also check whether the displayed interval uses a normal approximation or a t reference and whether the covariance option matches the observations. Small rounding differences in endpoints can arise from the reference rule. The important interpretation still depends on the coefficient target, units, sampling conditions and design.

Before interpreting an interval, identify whether it concerns a coefficient, a fitted contrast, an average outcome or an individual prediction.

Also check whether the displayed interval uses a normal approximation or a t reference and whether the covariance option matches the observations.

## 26. Use the evidence to identify the next useful step

Precision, fit and design can require different improvements.

An imprecise but credible comparison may benefit from more informative observations. A precise but confounded comparison may require better measurement or a different design. A poor functional form may require a model that represents nonlinear relationships more adequately.

These are different diagnoses. Explain why a proposed next step addresses the concern you have actually observed. This habit helps an empirical report remain useful even when the first regression does not settle the policy question. A statistically significant coefficient is not the only possible contribution of an applied analysis.

An imprecise but credible comparison may benefit from more informative observations.

These are different diagnoses.

## 27. DAG practice: uncertainty is not adjustment

Trace the routes before choosing a control.

Select prior education as a control in the training diagram. Which alternative route remains? If the analyst changes conventional SEs to heteroskedasticity-robust SEs, does that close the route or change the training coefficient on an identical specification and sample?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Select prior education as a control in the training diagram. Which alternative route remains? If the analyst changes conventional SEs to heteroskedasticity-robust SEs, does that close the route or change the training coefficient on an identical specification and sample?

## 28. DAG practice: uncertainty is not adjustment: explanation

Explain what conditioning changes in this stated graph.

The route through unmeasured motivation remains open after conditioning on education. The common-cause arrows are properties of the proposed causal story, not of the covariance formula. Switching the SE option does not block them.

On an unchanged model and sample, the OLS coefficient remains the same while the estimated covariance, intervals and tests can change. Robust inference addresses uncertainty under appropriate conditions. A credible causal comparison needs an additional argument about motivation or a design that addresses its role.

The route through unmeasured motivation remains open after conditioning on education. The common-cause arrows are properties of the proposed causal story, not of the covariance formula. Switching the SE option does not block them. On an unchanged model and sample, the OLS coefficient remains the same while the estimated covariance, intervals and tests can change. Robust inference addresses uncertainty under appropriate conditions. A credible causal comparison needs an additional argument about motivation or a design that addresses its role.

## 29. Report magnitude and uncertainty together

Reproduce the evidence, then explain its economic meaning.

Run meeting_04.do. Use the robust staffing coefficient and SE to construct the approximate 95% interval with the 1.96 rule. Then calculate the estimate and SE for a two-student reduction. Explain how a decision about practical benefits differs from a test of a zero coefficient.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_04.do. Use the robust staffing coefficient and SE to construct the approximate 95% interval with the 1.96 rule. Then calculate the estimate and SE for a two-student reduction. Explain how a decision about practical benefits differs from a test of a zero coefficient.

## 30. Report magnitude and uncertainty together: explanation

A reproducible result needs both a calculation and an interpretation.

The robust staffing estimate is -1.101296, with SE 0.432847. The approximate interval is [-1.9497, -0.2529] score points per additional student per teacher. Multiplying the slope by minus two gives 2.2026 points; its SE is 0.8657, because scaling by a constant scales the SE by its absolute value.

These calculations quantify uncertainty under the model and inference assumptions. Stata's finite-degree-of-freedom interval can differ slightly from the 1.96 approximation. A recommendation also needs a credible causal comparison, the outcome's educational importance, staffing costs and the relevant population. Rejecting a zero slope does not supply those additional pieces of the decision.

The robust staffing estimate is -1.101296, with SE 0.432847. The approximate interval is [-1.9497, -0.2529] score points per additional student per teacher. Multiplying the slope by minus two gives 2.2026 points; its SE is 0.8657, because scaling by a constant scales the SE by its absolute value. These calculations quantify uncertainty under the model and inference assumptions. Stata's finite-degree-of-freedom interval can differ slightly from the 1.96 approximation. A recommendation also needs a credible causal comparison, the outcome's educational importance, staffing costs and the relevant population. Rejecting a zero slope does not supply those additional pieces of the decision.

## 31. Next, let the model represent percentages and curvature

The interpretation depends on how variables enter.

We have connected a coefficient with its uncertainty and separated detectability from practical size. We also saw why robust SEs change inference while leaving the OLS fit fixed on the same model and sample.

The next lesson changes the equation itself. Income, prices and outcomes may relate through percentages or changing slopes rather than constant level differences. We will define logarithms and polynomial terms before interpreting them, then compare fitted predictions over the observed data range. The uncertainty tools from today will remain useful for those more meaningful contrasts.

We have connected a coefficient with its uncertainty and separated detectability from practical size.

The next lesson changes the equation itself.

