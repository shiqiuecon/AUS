# 06. Large samples and imperfect data

## 01. Can a larger dataset rescue a biased design?

Use a known population to separate bias from sampling noise.

Large administrative datasets often produce small SEs. That is useful when the comparison estimates the intended effect, but it can make a flawed comparison look very convincing. Today we will construct data where the true coefficient is known and observe what increases in sample size actually do.

The simulation distinguishes a short regression omitting ability from a longer regression that includes it. The true direct X coefficient is one. The short slope approaches one and a half in this constructed population. Watching the distributions narrow around different values makes consistency and bias visible before we return to imperfect real-world records.

## 02. Define the simulation as an economic thought experiment

The generated truth is known by construction.

Let ability and a second noise term be independent standard-normal variables. Define X as ability plus that noise. Define Y as one plus X plus ability plus an independent outcome error. A standard-normal variable has mean zero and variance one; the normal shape is a convenient teaching choice, not a claim about real ability.

Ability affects Y directly and is related to X. The constructed model therefore gives a clear omitted-variable problem. Because we choose the population, we can compare estimates with its known coefficients. In real research we do not have that advantage, which is why simulations support understanding rather than prove a real design valid.

\(X=A+V\)

\(Y=1+X+A+U\)

\(A,V,U\) independent, with mean zero and variance one

## 03. Unbiasedness and consistency ask different questions

One concerns an average at a sample size; the other concerns a limit.

Unbiasedness means an estimator's expected value across repeated samples equals its target. Consistency means the estimator approaches its target as sample size increases. An estimator can have a small finite-sample bias and still be consistent; a biased design can remain inconsistent even with many observations.

A probability limit, written plim, names the value an estimator approaches in probability. Approaching in probability means the chance of being more than any fixed small distance from that value tends to zero. The important applied question is whether this limit equals the economic coefficient we want, not merely whether estimates become stable.

\(\operatorname{plim}\widehat\beta=\beta\) for consistency

## 04. The law of large numbers stabilises averages

More data can reveal a stable but unwanted relationship.

The law of large numbers, LLN, states under suitable conditions that sample averages approach their population counterparts. OLS is built from averages of regressor products and outcome products, so this helps explain where its coefficient goes as observations accumulate.

If an omitted factor remains related to X, the limiting sample products still contain that relationship. The LLN does not remove it. In our constructed model, the omitted ability contribution remains even though the random sampling fluctuations shrink. Larger samples can therefore make the population confounding pattern clearer rather than make it disappear.

The law of large numbers, LLN, states under suitable conditions that sample averages approach their population counterparts.

If an omitted factor remains related to X, the limiting sample products still contain that relationship.

## 05. Calculate the wrong limit before simulating it

The short slope tends to one and a half.

The variance of X is two because it adds two independent variance-one components. Its covariance with ability is one. The auxiliary slope of ability on X is therefore one half. Since the direct ability coefficient in Y is one, omitted-variable bias contributes one half to the direct X coefficient of one.

The resulting short slope has probability limit 1.5. This prediction follows from the model before we inspect any simulated histogram. The controlled regression targets one under its stated assumptions. The exercise demonstrates why a known data-generating rule is valuable: we can distinguish a method's target from the random deviations around it.

\(\delta_1=\dfrac{\operatorname{Cov}(X,A)}{\operatorname{Var}(X)}=\dfrac12\)

\(\operatorname{plim}\widehat b_{\mathrm{short}}=1+\dfrac12=1.5\)

## 06. More data, same bias

Apply the idea before reading the solution.

An estimator converges to 1.4 while the causal target is 1.0. What happens to the bias problem as n grows?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** An estimator converges to 1.4 while the causal target is 1.0. What happens to the bias problem as n grows?

## 07. More data, same bias: explanation

Connect the calculation to the empirical claim.

It remains: the estimator is inconsistent for the causal target. Sampling variation may shrink around the wrong limit. Narrow intervals around 1.4 do not repair the design.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

It remains: the estimator is inconsistent for the causal target. Sampling variation may shrink around the wrong limit. Narrow intervals around 1.4 do not repair the design.

## 08. Compare repeated samples at two sizes

Concentration alone is not evidence of a correct target.

The graph uses 300 Stata-generated replications at each sample size, 100 and 1,000. Each replication draws a new sample from the same constructed population and estimates the short and controlled slopes. A replication is one repetition of the entire sampling-and-estimation process.

Select the larger sample size. Both collections should become less spread out, but they need not move toward the same centre. The short estimates concentrate near 1.5, while the controlled estimates concentrate near one. These are simulation results, not observed labour-market effects. They illustrate the specific assumptions we built into the experiment.

## 09. Read one large generated sample

A small SE can accompany substantial omitted-variable bias.

In the 4,000-observation generated sample, the short slope is 1.516, with SE 0.014. The controlled slope is 0.998. The short estimate is very precise around a value far from the direct coefficient of one.

Do not interpret the small SE as evidence against the omitted-variable explanation. The SE concerns sampling variation under the fitted comparison. The known population model tells us the comparison targets a different value when ability is omitted. A real application needs a substantive design argument because its true coefficient is not available for this check.

```text
. regress y x, vce(robust)

------------------------------------------------------------------------------
             |               Robust
           y | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
           x |   1.516317   .0139733   108.51   0.000     1.488921    1.543712
       _cons |   .9947365   .0194616    51.11   0.000     .9565808    1.032892
------------------------------------------------------------------------------
```

## 10. The central limit theorem describes scaled fluctuations

The square-root rate concerns sampling variation around a limit.

The central limit theorem, CLT, gives a limiting distribution for a suitably standardised average under conditions such as finite variance and adequate independence or weak dependence. Related results justify normal approximations for many estimators.

For a consistent coefficient estimator, multiplying its deviation from the target by the square root of n can produce a stable limiting distribution. This is the source of the familiar inverse-square-root uncertainty rate. If the estimator approaches the wrong target, the approximation describes fluctuations around that wrong limit. The theorem does not substitute for an exogeneity assumption.

The arrow marked d means convergence in distribution: the shape approaches the stated reference distribution as the sample grows. N with mean zero denotes a normal, bell-shaped distribution. Omega is its limiting variance and describes the spread after the square-root-of-n scaling.

\(\sqrt n(\widehat\beta-\beta)\overset{d}{\longrightarrow}N(0,\Omega)\) under suitable conditions

\(\overset d\longrightarrow\): convergence in distribution; \(\Omega\): limiting variance

## 11. Measurement error creates a different source of inconsistency

A noisy regressor is not just a noisier outcome.

Suppose the observed regressor W equals a true X plus measurement noise M. Classical measurement error assumes that noise has mean zero and is unrelated to the true regressor and the outcome error. Even in an otherwise valid simple regression, regressing Y on W generally attenuates the slope toward zero.

The probability limit multiplies the true coefficient by a reliability ratio: true-regressor variance divided by true variance plus noise variance. This ratio lies between zero and one when both variances are positive. These assumptions are specific. Nonclassical error and multiple-regressor settings can produce other patterns, so the simple attenuation result should not be treated as universal.

This is a separate experiment from the earlier omitted-factor example. We write the new measurement noise as M to keep it distinct from the V that helped generate the earlier X. The outcome model and independence assumptions are reset for this experiment.

\(W=X+M\)

\(\operatorname{plim}\widehat b_W=\beta\dfrac{\operatorname{Var}(X)}{\operatorname{Var}(X)+\operatorname{Var}(M)}\)

\(M\): new measurement noise, independent of true \(X\) and the outcome error

## 12. Check attenuation in a separate generated comparison

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

## 13. Outcome noise has another role

Mean-zero independent outcome error need not attenuate the slope.

If the outcome is measured with an additional error unrelated to the regressors, that error enters the regression disturbance. Under the required mean assumptions, the coefficient can remain unbiased or consistent, while uncertainty increases. This differs from adding classical noise to a regressor.

The direction of measurement matters. Ask which variable is affected, whether the error is related to true values or other variables, and whether recording depends on the outcome. A generic statement that 'measurement error biases everything downward' would lose these distinctions. The data-collection process determines which model is plausible.

If the outcome is measured with an additional error unrelated to the regressors, that error enters the regression disturbance.

The direction of measurement matters.

## 14. Measurement error

Apply the idea before reading the solution.

Observed x equals true \(X^*\) plus mean-zero noise independent of \(X^*\) and the outcome error. In a simple regression, what happens to the slope toward a positive true effect?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Observed x equals true \(X^*\) plus mean-zero noise independent of \(X^*\) and the outcome error. In a simple regression, what happens to the slope toward a positive true effect?

## 15. Measurement error: explanation

Connect the calculation to the empirical claim.

Under classical measurement-error assumptions, the probability limit is \(\beta\dfrac{\operatorname{Var}(X^*)}{\operatorname{Var}(X^*)+\operatorname{Var}(noise)}\), which is between zero and \(\beta\). More observations do not remove this attenuation. The result does not automatically extend to nonclassical error or every multiple-regression setting.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Under classical measurement-error assumptions, the probability limit is \(\beta\dfrac{\operatorname{Var}(X^*)}{\operatorname{Var}(X^*)+\operatorname{Var}(noise)}\), which is between zero and \(\beta\). More observations do not remove this attenuation. The result does not automatically extend to nonclassical error or every multiple-regression setting.

## 16. Missing observations can change the population represented

Complete-case analysis needs a selection argument.

A complete-case regression uses only records with all required variables observed. This is a rule for forming a sample, not a guarantee that the remaining observations represent the intended population. If income is more often missing in certain districts, the complete-data comparison may differ systematically from the original one.

Describe who is missing and why. Refit comparisons on a common sample when evaluating model changes, and separately investigate selection. Merely increasing the size of the observed group does not recover the missing group. The useful response follows the recording mechanism and target question, rather than treating missingness as a nuisance to suppress.

Here S indicates whether the record is observed. Selection depends only on included X, while the disturbance U is independent of X under the proposed graph. Conditioning on S does not open a path from X to U. With an appropriate conditional-mean model and adequate support, this kind of selection need not bias the conditional slope, although it can change the represented population and precision.

## 17. A missing-data assumption should be stated in context

Explain what makes the analysed cases informative.

One relatively favourable situation is that, conditional on variables used in the analysis, being observed is unrelated to the remaining outcome error. Even that claim needs a reason based on the data process. A database can be large and still exclude precisely the records whose outcomes differ in ways the model does not capture.

For a policy study, report counts before and after restrictions and compare observable characteristics where possible. Consider whether the conclusion concerns all eligible units or only those with complete records. A transparent narrower claim can be more useful than an unjustified claim about an entire population.

Now selection depends on the outcome. X and disturbance U both enter Y, making Y a collider on their connecting path. Conditioning on its descendant S can open that path. The target highlighted here is the X–disturbance association, because it matters for the selected-sample mean assumption. Outcome-based selection can therefore invalidate a regression that would have been valid before selection.

## 18. Leverage and influence are different

An unusual regressor value need not be a bad observation.

Leverage describes how unusual an observation's regressor values are relative to the rest of the sample. Influence concerns how much an observation changes the fitted model. A high-leverage observation close to the fitted relationship may have little effect, while a distant point with a large residual can be influential.

Before deleting a record, check its accuracy and substantive relevance. If it is a confirmed coding error, correct or remove it with a documented reason. If it is valid, show how conclusions depend on it and explain why that population region matters. Removing observations solely because they change significance is not a defensible diagnostic strategy.

Leverage describes how unusual an observation's regressor values are relative to the rest of the sample.

Before deleting a record, check its accuracy and substantive relevance.

## 19. Sensitivity analysis answers a stated question

Change one defensible feature and explain the comparison.

Sensitivity analysis examines how conclusions change under plausible alternative choices, such as a sample restriction, transformation or influential observation. It is most informative when the choice is linked to a substantive concern, rather than selected after seeing which result is convenient.

For example, compare a fitted income relationship with and without one verified extreme-income record and show the range supported by each sample. Report why the record is unusual and whether excluding it changes the target population. The exercise can reveal fragility without declaring either model automatically correct.

Sensitivity analysis examines how conclusions change under plausible alternative choices, such as a sample restriction, transformation or influential observation.

For example, compare a fitted income relationship with and without one verified extreme-income record and show the range supported by each sample.

## 20. The data audit belongs before the policy sentence

Units, ranges and recording rules affect interpretation.

Check how variables were measured, whether their ranges are possible and whether units changed over time or across sources. A thousand-dollar income variable interpreted as dollars creates a thousand-fold coefficient mistake even if the regression runs successfully.

Record sample restrictions and verify identifiers before merging data. A repeated identifier may represent genuine repeated observations or accidental duplicates; the appropriate response depends on the unit of observation. These checks are practical parts of applied econometrics because they determine which statistical and economic comparisons the software is actually computing.

Check how variables were measured, whether their ranges are possible and whether units changed over time or across sources.

Record sample restrictions and verify identifiers before merging data.

## 21. Choose a remedy for the named problem

More observations, better measurement and better design do different jobs.

If uncertainty is large under a credible comparison, more informative observations may help. If classical regressor error is the issue, better measurement or a justified measurement-error strategy may be needed. If an omitted factor drives treatment selection, collecting more of the same comparison may only make the bias more precise.

State the problem before proposing a remedy. This makes the analysis useful to a reader deciding whether to fund new data, redesign a study or use a different estimator. A small p-value from a large sample is not the final objective; a well-supported answer to the empirical question is.

If uncertainty is large under a credible comparison, more informative observations may help.

State the problem before proposing a remedy.

## 22. Influence

Apply the idea before reading the solution.

A high-income district sits far from the remaining x values. Must it be deleted?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** A high-income district sits far from the remaining x values. Must it be deleted?

## 23. Influence: explanation

Connect the calculation to the empirical claim.

No. A distant x value can have high leverage; influence also depends on its residual and its effect on the fit. Verify the observation, explain substantive relevance and show defensible sensitivity analysis. Delete a confirmed error for a documented reason, not because it changes significance.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

No. A distant x value can have high leverage; influence also depends on its residual and its effect on the fit. Verify the observation, explain substantive relevance and show defensible sensitivity analysis. Delete a confirmed error for a documented reason, not because it changes significance.

## 24. DAG practice: selection on an outcome descendant

Trace the routes before choosing a control.

Suppose X and the outcome disturbance U are independent before selection, both affect Y, and a record is observed depending on Y. Why can restricting attention to observed records create an X–U association? Compare this with selection depending only on included X.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Suppose X and the outcome disturbance U are independent before selection, both affect Y, and a record is observed depending on Y. Why can restricting attention to observed records create an X–U association? Compare this with selection depending only on included X.

## 25. DAG practice: selection on an outcome descendant: explanation

Explain what conditioning changes in this stated graph.

Y is a collider on \(X\rightarrow Y\leftarrow U\). The observation indicator S is its descendant. Conditioning on \(S=1\) can open the collider path, so the selected sample can violate the disturbance mean assumption even when the original sample satisfied it.

If selection instead depends only on included X and carries no extra information about U conditional on X, this particular path is not opened. The conditional slope may remain valid under a correct model and adequate support, although precision and the represented population can change. The selection mechanism, rather than missingness alone, determines the concern.

Y is a collider on \(X\rightarrow Y\leftarrow U\). The observation indicator S is its descendant. Conditioning on \(S=1\) can open the collider path, so the selected sample can violate the disturbance mean assumption even when the original sample satisfied it. If selection instead depends only on included X and carries no extra information about U conditional on X, this particular path is not opened. The conditional slope may remain valid under a correct model and adequate support, although precision and the represented population can change. The selection mechanism, rather than missingness alone, determines the concern.

## 26. Separate simulation truth from estimated evidence

Reproduce the evidence, then explain its economic meaning.

Run meeting_06.do. Identify the known true coefficient in the first experiment, the short-regression probability limit, and the two estimated coefficients from the 4,000-observation data. Then explain the separate measurement-error result. Use the repeated-sample file to check whether a larger sample narrows the distribution around the correct or incorrect target.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_06.do. Identify the known true coefficient in the first experiment, the short-regression probability limit, and the two estimated coefficients from the 4,000-observation data. Then explain the separate measurement-error result. Use the repeated-sample file to check whether a larger sample narrows the distribution around the correct or incorrect target.

## 27. Separate simulation truth from estimated evidence: explanation

A reproducible result needs both a calculation and an interpretation.

The first experiment sets the true direct X coefficient to one. Omitting A produces a probability limit of 1.5. In the generated 4,000-observation dataset, the short estimate is 1.516317 and the controlled estimate is 0.997692. They are estimates, so neither must equal its theoretical target exactly.

The measurement-error experiment is generated separately. Its noisy-regressor estimate is 0.517755, compared with an attenuation limit of one half under its stated variances and independence assumptions. In the repeated-sample graphs, larger samples concentrate the short regression near 1.5 and the controlled regression near one. Precision improves around each model's limit; sample size does not change a biased design into a valid one.

The first experiment sets the true direct X coefficient to one. Omitting A produces a probability limit of 1.5. In the generated 4,000-observation dataset, the short estimate is 1.516317 and the controlled estimate is 0.997692. They are estimates, so neither must equal its theoretical target exactly. The measurement-error experiment is generated separately. Its noisy-regressor estimate is 0.517755, compared with an attenuation limit of one half under its stated variances and independence assumptions. In the repeated-sample graphs, larger samples concentrate the short regression near 1.5 and the controlled regression near one. Precision improves around each model's limit; sample size does not change a biased design into a valid one.

## 28. Next, compare groups without misreading interactions

A group difference changes which coefficient combination matters.

The simulation separated stable sampling behaviour from a valid target, while the data examples showed why measurement and selection need their own arguments. These distinctions remain relevant when we allow different fitted relationships for different groups.

The next lesson introduces indicators and interactions. We will define the reference group, derive each group's fitted slope and test the combinations needed for a meaningful comparison. The uncertainty calculation must use the covariance between coefficients, and the causal interpretation still depends on how the groups and policy variation were formed.

The simulation separated stable sampling behaviour from a valid target, while the data examples showed why measurement and selection need their own arguments.

The next lesson introduces indicators and interactions.

