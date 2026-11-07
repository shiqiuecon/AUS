# Meeting 01: Economic questions and data

Draft for review. No narration.

## Teaching plan

- 0–10 minutes: Recall and prediction
- 10–55 minutes: Question and comparison
- 55–65 minutes: Break
- 65–110 minutes: Model and evidence
- 110–120 minutes: Break
- 120–165 minutes: Stata and practice
- 165–180 minutes: Transfer and exit check

## 01. Do smaller classes improve learning?

Compare districts. Then ask what else differs.

Imagine advising an education ministry with enough funding to recruit more teachers. Before recommending smaller classes, you need to know how much learning would improve and whether the gain justifies the cost. This is a causal question: what would happen to the same target population under a different class-size policy?

We will begin with something we can actually observe: school districts with different student–teacher ratios and different average test scores. A student–teacher ratio counts students per teacher across a district; it is not a direct record of every classroom's size. In this dataset one dot represents one district. Before revealing the fitted line, predict its direction and give one reason why the comparison might be misleading.

The graph can document an association. It cannot, by itself, show how a particular district would perform if we changed only its staffing. That gap between an observed comparison and the policy question is the reason for learning econometrics.

**Attempt:** Predict the slope. Then name one other district characteristic that could affect both staffing and scores.

**Solution:** A negative slope is plausible, but it is a prediction to check. Family resources, language composition or district funding may differ with both staffing and outcomes. Naming a confounder requires a reason it relates to both variables.

**Teaching note:** 0–10: individual prediction, pair discussion, reveal points before line. No prior econometrics knowledge required.

## 02. Which question are we answering?

Description, prediction and causation require different claims.

We can ask three useful questions about the same data. Description asks whether districts with lower student–teacher ratios tend to have higher scores. Prediction asks how accurately we can forecast a district's score using information available when the forecast is made. Causation asks how scores would change if a policy altered the ratio.

The words in a research question tell us which task we face. A ministry choosing a staffing policy needs a causal effect, even though descriptive evidence may help motivate the study. A forecasting office may care chiefly about prediction accuracy. A variable can be useful for prediction without being a cause that a policymaker can manipulate.

Write one sentence beginning 'The evidence here shows…' and another beginning 'The policy decision requires…'. Keeping those sentences distinct prevents a fitted line from silently becoming a policy recommendation.

**Teaching note:** 10–55, first block: require students to rewrite one question in all three forms.

## 03. Define the observation before the equation

One row is one district; units determine interpretation.

Let i label a school district. Define Y_i as its average test score in score points and X_i as its student–teacher ratio, measured in students per teacher. We observe 420 districts. We do not observe 420 individual students, and we do not yet have repeated years for each district.

A dataset with different units observed at a point or period is a cross section. A series of observations on one unit over time is a time series. Repeated observations on the same identifiable units make a panel. These structures affect both the comparison we can make and how we assess uncertainty.

An average district score suppresses differences among students within that district. Be careful with the level of the conclusion: an aggregate association does not tell us which individual children would benefit, nor does it establish a causal effect at the district level. Later, panel data will let us compare changes within units, but that will bring its own assumptions.

**Attempt:** Would ten years of the same 420 districts form a panel? Would ten different districts observed each year necessarily do so?

**Solution:** The first is a panel if district identities are tracked. The second may be repeated cross sections; the calendar alone does not create within-unit observations.

## 04. The comparison we want is partly missing

A policy effect compares two potential outcomes for the same unit.

For a simple thought experiment, let Y_i(20) denote district i's score under a ratio of 20 students per teacher, and Y_i(22) its score under a ratio of 22. The district's policy contrast is Y_i(20)−Y_i(22). This notation names two hypothetical policy states. It does not assume the effect is the same in every district.

In the observed period, a district is at one staffing ratio. We cannot simultaneously observe its score under the alternative ratio with everything else held in the relevant causal sense. Comparing it with another district substitutes a different unit for the missing potential outcome.

That substitute is credible only if the comparison districts tell us what would have happened without the staffing change. Random assignment can support such a claim in a well-designed experiment. In observational data we need an argument about selection, confounding and the controls or research design. A larger dataset reduces some uncertainty; it does not make a bad comparison automatically credible.

## 05. Read the data before fitting a line

Start with axes, units, range and unusual observations.

Read the horizontal axis first: moving to the right means more students per teacher, not more teachers per student. The vertical axis measures average scores in points, not percentages of correct answers. The negative association we see means that higher student–teacher ratios tend to appear with lower scores.

Do not let the line replace the scatter. At similar ratios, scores still differ substantially. This remaining variation may reflect other district characteristics, individual differences, measurement and chance. It is evidence that one explanatory variable does not account for everything.

Look for the region where the data actually lie before imagining a policy change. A fitted relation within the observed range does not justify extrapolating to a ratio of two or fifty students per teacher. Nor can an unusual point be dismissed merely because it complicates the story. We first ask whether the value is valid and what population it represents.

**Attempt:** At roughly the same ratio, do all districts have the same score? What claim would identical scores be required for?

**Solution:** No. A regression line describes a fitted average relation, not a deterministic outcome for every district. Variation around the line is compatible with a useful average model.

## 06. Why the observed groups might differ

A confounder supplies another path between staffing and scores.

Let Z denote a district's language composition, measured here by the percentage of English learners. Suppose composition is related to staffing choices and to measured scores. In that case, districts with different ratios also differ along a second dimension that matters for the outcome.

The diagram uses arrows to express a proposed causal structure, not a pattern discovered merely by looking at correlations. The path X←Z→Y is a back-door path from staffing to scores. It offers an alternative explanation for part of the observed association. Closing that path with an appropriate control may help, if the proposed structure and measurement are adequate.

We must still decide what the target effect is and whether a variable is measured before the policy. A post-policy variable can be a mediator rather than a confounder. Automatically controlling for everything can therefore change the question or create bias. For today, use this diagram to motivate comparing districts at a common observed language composition; do not claim that this one control solves every identification problem.

## 07. Make the first regression model explicit

A population relationship and a sample fit are different objects.

Write the population equation as Y_i=β_0+β_1X_i+u_i. The coefficient β_0 is the intercept, β_1 is the slope, and u_i collects determinants of the outcome outside the included linear part. The equation defines a model; the condition E(u_i|X_i)=0 is an additional assumption that gives the linear part a conditional-mean interpretation.

In a sample, we estimate an intercept b_0 and slope b_1. The fitted score is Ŷ_i=b_0+b_1X_i, and the residual is e_i=Y_i−Ŷ_i. The population error u_i is unobserved; the fitted residual e_i is calculated from the data and estimated line.

Do not use those two terms interchangeably. Least squares imposes useful identities on sample residuals. It does not force the unobserved error to be unrelated to X in the population. If family background or another omitted determinant is related to staffing, the causal interpretation can fail even when the fitted line is computed perfectly.

## 08. A slope is a change with units

The direction of the policy change matters.

For a fitted line, a change ΔX in students per teacher corresponds to a fitted score change b_1ΔX. Here the simple-regression slope is -2.279808 score points per additional student per teacher. A decrease from 22 to 20 has ΔX=−2, so the fitted score difference is approximately +4.56 points.

There are two negative signs in this calculation: the slope is negative and the regressor decreases. The positive result is not a percentage change, and it does not mean scores rise by 4.56 points for every individual child. It compares the line's fitted district scores.

The phrase 'fitted difference' is doing essential work. We have not shown that hiring teachers would cause this gain. A complete answer gives the number, units, comparison and qualification. Pause before the next block and ask a partner to find one way an apparently correct calculation could still produce a misleading policy sentence.

**Attempt:** Compute the fitted contrast for an increase from 20 to 23 students per teacher.

**Solution:** ΔX=3, so the fitted score change is 3×(-2.279808)=-6.84 points. The association is negative; a causal staffing effect requires additional assumptions.

**Teaching note:** End first 45-minute block. Take the 55–65 minute break after this page.

## 09. Choose a line by its errors

Least squares minimizes the sum of squared vertical residuals.

There are many lines we could draw through this scatter. Ordinary least squares chooses the intercept and slope that minimize the sum of squared vertical deviations between observed and fitted scores. 'Vertical' matters: the loss is in score points, not distances along the staffing axis.

Use the slope control to rotate a candidate line around the sample mean point. For each candidate slope, the intercept is chosen so that the line passes through the mean ratio and mean score. The displayed sum of squared residuals is calculated from all 420 actual observations. It is not a decorative animation.

Try a nearly flat line and a steeply negative line, then move toward the minimum. The best-fitting slope balances errors across all districts; it need not pass through any particular observation. Squaring makes positive and negative residuals contribute positively and gives relatively large misses extra weight. The optimization explains how the estimate is obtained. It does not explain why the underlying comparison should be causal.

**Teaching note:** 65–110: begin model block. Have students locate the SSE minimum before revealing the OLS slope.

## 10. Follow one residual

Observed score minus fitted score gives a signed vertical distance.

Select a district in the plot. Its observed score is the dot; its fitted score lies on the regression line at exactly the same horizontal coordinate. The residual is the observed score minus that fitted value. A dot above the line has a positive residual, while a dot below the line has a negative residual.

The residual is not a causal effect and not an estimate of the effect of hiring one teacher. It tells us how much this particular outcome differs from the fitted average relation. If we square the residual, the contribution to the least-squares loss is measured in squared score points.

Move to another district and check the sign before revealing the vertical segment. This gives a concrete meaning to the algebra e_i=Y_i−Ŷ_i. In later classes we will study patterns in residuals. A systematic pattern can suggest that the linear model or uncertainty assumptions need attention, but an apparently unstructured residual plot does not prove that all causal assumptions hold.

## 11. The OLS slope has a transparent formula

Covariation relative to regressor variation determines the slope.

Let X̄ and Ȳ be the sample averages of the ratio and score. The simple-OLS slope is the sum of (X_i−X̄)(Y_i−Ȳ), divided by the sum of (X_i−X̄)². The numerator measures how the two variables move together around their averages. The denominator measures how much the regressor varies.

If all districts had the same ratio, the denominator would be zero and the separate slope could not be estimated. With real variation, the denominator scales the covariation into score points per student per teacher. The intercept is Ȳ−b_1X̄, which makes the fitted line pass through the sample mean point.

You do not need matrix algebra to understand this step. The graduate-level habit is to connect the algebra to the available comparison: no variation in X means no information about its slope in this model. Later, multiple regression will require variation remaining after the other regressors are accounted for, not simply variation in the raw X values.

## 12. A small calculation you can finish

Use three constructed districts to see the formula work.

Now use a deliberately small constructed example: ratios 18, 20 and 22 with scores 680, 670 and 650. These are invented teaching observations, not a subset of the actual school data. The mean ratio is 20 and the mean score is 666⅔.

Center each variable. The regressor deviations are −2, 0 and 2. The cross-products sum to −60 and the squared regressor deviations sum to 8. The estimated slope is therefore −7.5 points per additional student per teacher. The intercept is 816⅔, which is primarily an algebraic device here: a ratio of zero lies far outside these observations.

Calculate the fitted values and residuals before opening the solution. Check both the residual sum and the sum of residual times X. They should be zero up to rounding. Those checks verify the least-squares computation. They do not verify that staffing was randomly chosen or that the population error is exogenous.

**Attempt:** For X=(18,20,22), Y=(680,670,650), find the slope, fitted scores and residuals.

**Solution:** b₁=−60/8=−7.5; b₀=816⅔. Fitted scores: 681⅔, 666⅔, 651⅔. Residuals: −1⅔, +3⅓, −1⅔. Their sum is zero; ΣXᵢeᵢ=0. Allow small rounding differences.

## 13. Holding an observed factor fixed

Add a measured characteristic; keep the estimation sample unchanged.

Return to the actual school data and add Z_i, the English-learner share measured in percentage points. The fitted equation becomes Ŷ_i=b_0+b_1X_i+b_2Z_i. The staffing slope now describes differences along the fitted surface at a common Z value.

This is the statistical meaning of holding the included observed variable fixed in a linear additive model. We are no longer comparing districts that differ in both X and Z without adjustment. We still need substantive assumptions about the omitted determinants. In particular, the act of including Z does not guarantee that conditional exogeneity holds.

Toggle between the simple line and the adjusted line evaluated at the sample mean Z. Both lines pass through the common mean point, but their slopes differ. This graph shows a change in the fitted comparison, not a set of experimentally observed staffing effects. Both estimates use the same 420 districts, so this particular change is not caused by dropping observations with missing Z.

## 14. Explain a changed estimate

A coefficient movement is evidence to interpret, not a verdict on causality.

The simple staffing slope is -2.280; the adjusted slope is -1.101. The magnitude is smaller after including the English-learner share. A two-student reduction corresponds to about +4.56 fitted score points in the first model and +2.20 in the adjusted model.

This is consistent with part of the original association reflecting differences in an observed district characteristic. We should explain which comparison changes when Z is held fixed, rather than simply saying that the second model is 'better' because it has an extra variable or a larger R-squared.

Neither estimate must equal the causal effect of a staffing intervention. Unobserved family resources, staffing responses to educational difficulty, measurement and functional form can still matter. Equally, the coefficient change alone does not prove that Z was a confounder in the true causal structure. The interpretation requires the design argument as well as the table. Write a qualified two-sentence comparison of the models before taking the break.

**Attempt:** Write a result sentence with both fitted contrasts and one explicit identification caveat.

**Solution:** A fitted reduction of two students per teacher corresponds to about 4.56 score points without adjustment and 2.20 points after controlling for English-learner share. These observational contrasts need not equal the causal gain from recruiting teachers.

**Teaching note:** End model block. Break at 110–120 minutes.

## 15. Inspect variables before running the model

A reproducible result starts with a reproducible sample.

Open the paired Stata do-file and run it from the course's Stata folder. It loads a local copy of the course school dataset, gives the variables readable labels, confirms the observation count and checks missing values for the variables used here. These checks explain which sample is being compared.

Use describe to inspect names and labels, then summarize to inspect counts and scales. In particular, the English-learner variable is a percentage measured from zero to one hundred, so an increase from 10 to 11 is one percentage point. Confusing a percentage with a proportion multiplies a coefficient's interpretation by one hundred.

We use vce(robust) to obtain heteroskedasticity-robust inference under appropriate independent-observation, large-sample conditions. You do not yet need the covariance formula, but you should know the option changes uncertainty estimates, not the OLS line or the causal validity of the comparison. The complete raw command output is available for checking every numerical claim.

**Teaching note:** 120–165: Stata and practice. Students run commands, rather than only watch a demonstration.

## 16. Read a genuine Stata result

Find the sample, slope, standard error and outcome units.

This is the actual Stata output from the simple regression, not a reconstructed table with invented estimates. Locate str in the coefficient column. Its coefficient is about -2.280; the robust standard error is about 0.519. The sample size is 420.

The coefficient describes the fitted direction and magnitude. The standard error estimates sampling uncertainty under the inference assumptions. A small reported p-value concerns a null hypothesis within that framework; it is not the probability that the causal story is true. Stata's display of 0.000 is a rounded p-value, not an exactly zero probability.

Read the output in that order: what was regressed on what, which observations were used, what change the coefficient represents, and how uncertain it is. Only then ask which causal claim the research design can support. Software can compute a coefficient even when the researcher has asked an unidentifiable or poorly motivated question.

```text
. regress score str, vce(robust)

Linear regression                               Number of obs     =        420
                                                F(1, 418)         =      19.26
                                                Prob > F          =     0.0000
                                                R-squared         =     0.0512
                                                Root MSE          =     18.581

------------------------------------------------------------------------------
             |               Robust
       score | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         str |  -2.279808   .5194892    -4.39   0.000    -3.300945   -1.258671
       _cons |    698.933   10.36436    67.44   0.000     678.5602    719.3057
------------------------------------------------------------------------------
```

## 17. Use a contrast rather than mental shortcuts

lincom translates the estimated slope into the requested change.

The command lincom -2*str asks Stata for the fitted score contrast associated with two fewer students per teacher. It multiplies the slope by −2 and also propagates its uncertainty. The estimated contrast is about +4.56 points, with an interval reported in score points.

This is a good habit even when the arithmetic is easy. In a later interaction model, the relevant comparison may be a sum of several coefficients and its standard error depends on their covariance. A proper contrast command handles the estimated covariance matrix rather than adding standard errors by hand.

For now, verify that the sign and scale match the question before discussing the interval. If the policy reduces the ratio, inserting +2 would answer the reverse comparison. The command does not convert an association into a causal effect: it expresses the implication of the fitted model for a clearly stated change.

```text
. lincom -2*str

 ( 1)  - 2*str = 0

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |   4.559617   1.038978     4.39   0.000     2.517343     6.60189
------------------------------------------------------------------------------
```

## 18. Read the adjusted regression

The same sample, one additional observed characteristic.

The next output includes the English-learner share. Locate the new staffing coefficient, about -1.101, and compare its magnitude with the simple-regression estimate. Both models use 420 observations, which makes this a clean comparison of the two fitted specifications on the observed sample.

The English-learner coefficient is measured in score points per percentage-point difference in that share, holding the staffing ratio fixed in the additive model. It should not be described as the causal effect of being an English learner. The outcome and covariate are district aggregates, and the design has not established such a causal claim.

Use the output to support an explanation rather than to accumulate significance stars. The useful result is that a plausible observed difference between districts changes the fitted staffing association. The remaining research task is to justify the comparison well enough to answer the ministry's policy question.

```text
. regress score str el, vce(robust)

Linear regression                               Number of obs     =        420
                                                F(2, 417)         =     223.82
                                                Prob > F          =     0.0000
                                                R-squared         =     0.4264
                                                Root MSE          =     14.464

------------------------------------------------------------------------------
             |               Robust
       score | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         str |  -1.101296   .4328472    -2.54   0.011     -1.95213   -.2504616
          el |  -.6497768   .0310318   -20.94   0.000     -.710775   -.5887786
       _cons |   686.0322   8.728224    78.60   0.000     668.8754     703.189
------------------------------------------------------------------------------
```

## 19. Attempt the adjusted policy contrast

Keep the arithmetic and the interpretation together.

Work independently before revealing the output. Use the adjusted staffing slope to predict the fitted score difference between ratios of 22 and 20 while the English-learner share stays fixed. State the units and one reason the fitted contrast might differ from a causal policy effect.

The numerical result is about +2.20 score points. The reported standard error is about 0.866 points. Notice that uncertainty is attached to the contrast itself; it should not be described in units of students per teacher. An approximately positive interval does not remove the need for a credible identification argument.

When comparing answers, separate three issues. A sign mistake is an arithmetic error. Calling score points percentages is a units error. Calling an observational contrast a guaranteed gain from hiring teachers is a conceptual identification error. Correct arithmetic deserves partial credit, but a false causal interpretation should not receive full credit.

**Attempt:** Use the adjusted slope to evaluate 22 → 20 students per teacher. What stays fixed, and what remains unproven?

**Solution:** The fitted contrast is (−2)×(−1.101296)=+2.202592 score points, holding the included English-learner share fixed. Unobserved confounding and reverse causality may remain; adjustment alone does not prove a policy effect.

```text
. lincom -2*str

 ( 1)  - 2*str = 0

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |   2.202592   .8656943     2.54   0.011     .5009232     3.90426
------------------------------------------------------------------------------
```

## 20. Can the result travel to a new setting?

A real application requires a new design argument.

Suppose an education ministry asks whether the California fitted contrast should guide staffing at a new set of schools. The observed association is useful background, but a new population may have different baseline ratios, curricula, language environments, teacher quality and staffing rules. These differences can change both the effect of a policy and the credibility of the comparison.

External validity asks whether a result is relevant to the target population and policy. Internal validity asks whether the original research design identified the claimed effect in its own setting. Neither follows simply from a large number of observations or a precise estimate.

Draft a short empirical plan rather than inventing a local effect size. Specify the unit of observation, the outcome, the staffing intervention, a comparison strategy and one major threat. A well-designed plan is more useful than attaching a confident causal label to an estimate from another setting. We will return to this decision sequence throughout the course.

**Attempt:** Propose a local school-staffing study: name the outcome, intervention, comparison and main threat.

**Solution:** For example: average learning gain by school; a funded staffing reduction; comparable untreated schools with a justified assignment argument; possible selection of struggling schools into funding. Other designs earn credit when their identifying assumptions are explicit.

## 21. Diagnose the claim

A smaller p-value does not close a confounding path.

Consider the statement: 'The slope is statistically significant, so reducing class sizes will improve scores by exactly the predicted amount.' It combines at least three unjustified steps. Statistical significance is not a test that all confounding has been removed. A district-level average relation does not imply the same effect for every district. A point estimate is uncertain rather than exact.

Use the diagram to explain which problem a causal design must address. The inference calculation and the comparison design answer different questions. We can estimate a sampling distribution very carefully around an estimate that still mixes staffing with omitted determinants.

Rewrite the statement in your own words. A good answer reports what is observed, gives the fitted contrast with units and states the missing causal justification. Avoid replacing the original overclaim with an empty 'correlation is not causation' slogan. Name a specific mechanism that could create bias and say what additional evidence would make the comparison more credible.

**Attempt:** Rewrite: 'Significant slope proves that smaller classes cause higher scores.'

**Solution:** Districts with lower student–teacher ratios have higher fitted scores in these data. A causal staffing effect would require a defensible comparison addressing factors such as family resources and staffing responses to student needs.

**Teaching note:** 165–180: individual transfer, explanation and exit check across the final three pages.

## 22. What would convince you next?

Identify a useful next piece of evidence.

Imagine you can request one additional piece of evidence. Another thousand districts might improve precision, but if staffing is still chosen in response to unobserved learning needs, the same identification problem remains. A credible random staffing allocation or a clearly justified natural experiment could be more informative about the policy effect.

Additional covariates can also help when they are valid pre-policy confounders measured reliably. They are less useful when they are consequences of the intervention or poor proxies for the relevant omitted forces. Repeated observations on the same districts may help remove stable differences, but cannot automatically remove time-varying confounding.

The practical lesson is to choose the next data or design improvement in response to a named threat. We will study each of these possibilities gradually. Today you should be able to explain why better identification and more precise estimation are distinct improvements, and why the research question should come before the choice of software command.

**Attempt:** Choose between more districts and a documented randomized staffing rollout. Which threat does each address?

**Solution:** More districts may improve precision under suitable sampling conditions. Random assignment can support a causal comparison by breaking systematic treatment–confounder links, subject to implementation, compliance, spillovers and other design considerations.

## 23. Exit check: explain one result carefully

A complete answer has a comparison, number, units and limitation.

Write four sentences without looking at the earlier transcript. First identify the observation and variables. Second report the fitted contrast for two fewer students per teacher in the simple model. Third explain how the adjusted comparison differs. Fourth state a specific reason neither result alone establishes the causal gain from a staffing policy.

Then compare your answer with a partner's. If the numbers differ only through harmless rounding, focus on units and interpretation. If someone says the second result is causal because it includes a control, return to the confounding diagram and ask which omitted paths might remain. If someone says the first result is useless because it is not causal, explain why descriptive evidence can still motivate and inform a study.

The next meeting starts from this unresolved issue: how does multiple regression change the comparison, and under what assumptions can it remove omitted-variable bias? Bring that question, rather than a memorized command, into the next class.

**Attempt:** Give the four-sentence report described here.

**Solution:** One observation is a school district; the outcome is average test score and the regressor is students per teacher. Two fewer students per teacher corresponds to about +4.56 fitted score points in the simple model. The contrast becomes about +2.20 points at fixed English-learner share. Unobserved confounding or staffing responses to learning needs can still prevent either fitted association from being causal.

