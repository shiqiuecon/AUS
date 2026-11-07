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

Imagine advising an education ministry that can afford to hire more teachers. The ministry wants to know whether this would help students learn more. To answer, we need to compare what would happen with the extra teachers with what would happen without them. A question about the effect of changing a policy is a causal question.

We will start with school districts in California. A school district is a local body that manages a group of public schools. For each district, we observe an average test score and a student–teacher ratio. This ratio is the number of students divided by the number of teachers. A ratio of 20 means 20 students per teacher across the district. It does not mean every classroom contains exactly 20 students.

Each dot in the graph represents one district. If districts with fewer students per teacher also have higher scores, the two measures have an association: they vary together in the observed data. Our task is to find out how much this comparison can tell the ministry. First predict the pattern in the dots. Then select Next step to show the fitted line, a straight line chosen to summarise that pattern. A line's slope tells us how much its height changes when we move one unit to the right.

**Attempt:** Do you expect the line to slope upward or downward? Name one other district characteristic that could help explain the pattern.

**Solution:** A downward slope is plausible: districts with more students per teacher may have lower scores. Family resources could also matter. For example, districts serving richer families may have both more teachers and higher scores. The graph lets us check the observed pattern; it does not yet isolate the effect of hiring teachers.

**Teaching note:** 0–10: individual prediction, pair discussion, reveal points before line. No prior econometrics knowledge required.

## 02. Which question are we answering?

The same data can describe a pattern, predict an outcome or help study a policy effect.

The ministry's question concerns a policy change, but the graph compares districts as they are. To see why this matters, separate three tasks we can do with data. Description reports the pattern we observe: districts with lower student–teacher ratios tend to have higher scores. Prediction uses information about a district to estimate a score we have not yet observed. Causal analysis asks what would happen if we changed staffing.

A useful prediction does not always answer the causal question. For example, average family income may help predict district scores and identify where extra learning support may be needed. To choose a staffing policy, we need a further piece of information: how scores would change when the number of teachers changes. A prediction of existing differences does not by itself provide that answer.

The outcome is the measure we want to explain or predict, here a test score. Throughout the course, a variable means a characteristic that can take different values, such as income, staffing or test score. Before choosing a statistical method, state what you want to learn about those variables. For this study, the description is a starting point. The final goal is to learn what hiring teachers would do to learning, and whether that gain would justify the cost.

**Teaching note:** 10–55, first block: require students to rewrite one question in all three forms.

## 03. Define the observation before the equation

One observation is one district; define the variables and their units.

Before writing an equation, decide what one row in the dataset represents. This is the unit of observation. Here it is a school district. We have 420 observations, so we write n=420, where n is the number of observations. We do not have one observation for every student or every classroom.

Let i identify a district. Write Yᵢ for its average test score, measured in score points, and Xᵢ for its student–teacher ratio. Y is the outcome: the variable we want to explain. X is an explanatory variable, also called a regressor: a variable used to explain differences in the outcome. The subscript i simply tells us which district's values we are using.

The population is the full set of units we want to understand; the sample is the set we observe. Our 420 districts form the observed sample, and we must decide which wider population, if any, they represent. This dataset is a cross section because it compares different districts for one study period. A time series follows a unit over time. A panel follows the same identifiable units repeatedly, such as these districts each year. These different structures will give us different comparisons later in the course.

**Attempt:** Would ten years of the same 420 districts form a panel? Would ten different districts observed each year necessarily do so?

**Solution:** The first is a panel if district identities are tracked. The second may be repeated cross sections; the calendar alone does not create within-unit observations.

## 04. The comparison we want is partly missing

A policy effect compares potential outcomes under two staffing choices.

Now use this notation to state the ministry's comparison more precisely. Let Yᵢ(20) mean district i's score if its ratio were 20 students per teacher. Let Yᵢ(22) mean its score if the ratio were 22. These are potential outcomes: outcomes under specified policy conditions. The difference Yᵢ(20)−Yᵢ(22) is the policy effect for that district. We have named the comparison, but we have not yet measured it.

In the study period, the district operates at one ratio. Its score under the other ratio is a counterfactual: what would have happened under a condition we did not observe. A second district can help us estimate that missing outcome, but only if it provides a suitable comparison. If it also differs in family resources or student needs, the score difference may reflect more than staffing.

A research design is a plan for making this comparison credible. For example, random assignment would allocate an offer of extra teachers by chance, rather than according to a school's expected performance. With enough units, this tends to balance other characteristics between the groups. These are observational data: we observe staffing choices rather than assigning them. We therefore need to understand how those choices were made before interpreting district differences as policy effects.

## 05. Read the data before fitting a line

Start with axes, units, range and unusual observations.

The counterfactual is missing, so our first step is to understand the observations we do have. This graph is a scatterplot: it places one dot at each district's pair of X and Y values. Moving right means more students per teacher. Moving up means a higher score. The vertical scale is in score points, not percentages.

Look at the dots before showing the line. Do districts with higher ratios generally have lower scores? Then look at districts with similar ratios. Their scores still differ. A line can summarise an average pattern without predicting every district perfectly. The differences around it give us a reason to look for other factors that matter for learning.

The range of the data also limits what we can learn. The observed ratios run from about 14 to 26. Using a line from these data to predict scores at a ratio of two would be extrapolation: extending a relationship beyond the values we have observed. A prediction inside the observed range still needs care, but a prediction far outside it requires an especially strong argument. Keep that range in mind as we discuss a realistic change from 22 to 20.

**Attempt:** Districts at about the same student–teacher ratio have different scores. Does this prevent a line from describing their average pattern?

**Solution:** No. A line can summarise the average pattern even when individual districts lie above and below it. Those differences tell us that staffing alone does not fully explain scores.

## 06. Why the observed groups might differ

A confounder is another factor related to both staffing and scores.

What could explain the score differences around the line? Consider the share of students who are English learners. This means students developing their English skills. Write Z for this share. It is measured as a percentage, so a district with 15 English learners out of 100 students has Z=15. A change from 15% to 16% is one percentage point.

Suppose language composition is related both to staffing decisions and to measured scores. It would then be a possible confounder: another factor that helps explain the association between X and Y. For example, districts with greater learning needs might recruit extra teachers, while those needs also affect scores. The direction of the resulting distortion depends on how staffing and those needs are related; the diagram alone does not determine it.

The arrows express this proposed explanation. An arrow from Z to X says language composition may influence staffing; an arrow from Z to Y says it may influence scores. Together, X←Z→Y gives an alternative route linking X and Y. To control for Z means to account for observed differences in Z when comparing ratios and scores. This motivates our next model: compare districts at the same measured language composition, while recognising that other differences may remain.

## 07. Make the first regression model explicit

Define the regression equation, its coefficients and the error term.

We have identified the variables and a reason the comparison may be difficult. Regression gives us a way to describe the relationship using an equation. A regression model relates an outcome to one or more explanatory variables and an error term. Begin with Yᵢ=β₀+β₁Xᵢ+uᵢ. A coefficient is a number describing the model relationship; β₀ and β₁ are the population coefficients here. β₀ is the intercept, the line's height when X is zero. β₁ is the slope, the change in that height for one more student per teacher.

The error term uᵢ contains the part of the outcome outside the included linear relationship. It may include family background, student needs and other factors we have not measured. To interpret the line as the average score at each X, we add E(uᵢ|Xᵢ)=0. Read this as: among districts with a given ratio, the average error is zero. E means an average over the population, and the vertical bar means 'given'. This is called a zero conditional mean assumption. Writing the equation alone does not make the assumption true.

In the sample we estimate coefficients b₀ and b₁. Their values give the fitted score Ŷᵢ=b₀+b₁Xᵢ; the hat over Y means a fitted value. The residual eᵢ=Yᵢ−Ŷᵢ is the observed score minus that fit. We can calculate a residual, but we cannot directly observe the population error. This distinction will help us understand both how the line is chosen and what its assumptions do.

## 08. A slope is a change with units

A fitted change equals the slope times the change in the regressor.

The slope now lets us translate a proposed staffing change into a fitted score difference. Use ΔX to mean the new ratio minus the old ratio. The Greek letter Δ, read 'delta', means a change. Along a straight line, the fitted score change is b₁ΔX.

In the simple regression, which includes one explanatory variable, the estimated slope is -2.280 score points per additional student per teacher. Reducing the ratio from 22 to 20 gives ΔX=20−22=−2. Multiplying a negative slope by this negative change gives a positive fitted difference: about 4.56 score points. We are moving left and up along the fitted line.

Check the units as well as the sign. The result is in district score points, not percentages, and it compares two values on the line. Whether a staffing policy would cause this gain is the research-design question we discussed earlier. For now, make sure you can translate the proposed change correctly. After the break, we will examine how the data determine the line itself.

**Attempt:** Use the same slope to calculate the fitted score change when the ratio rises from 20 to 23.

**Solution:** The change in the ratio is +3. The fitted score change is 3×(−2.279808), about −6.84 score points. Moving right along the downward-sloping line lowers its fitted score.

**Teaching note:** End first 45-minute block. Take the 55–65 minute break after this page.

## 09. Choose a line by its errors

OLS chooses the line with the smallest sum of squared residuals.

We have used a fitted line, but many different lines could pass through the graph. Ordinary least squares, abbreviated OLS, chooses the line with the smallest sum of squared residuals. Recall that a residual is the vertical difference between an observed score and the line's fitted score. Squaring makes each contribution nonnegative, so an overprediction cannot cancel an underprediction.

The sum of squared residuals is the loss we are trying to minimise. The graph calls it SSE, for sum of squared errors; here those 'errors' mean the calculated residuals. A larger miss receives more weight because it is squared. For example, a residual of four points contributes 16 to the loss, while a residual of two contributes four.

Move the slope control to compare candidate lines. Each line passes through the sample mean point: the average ratio and average score. The displayed loss uses all 420 districts. Try a flat line, then a steep downward line, and find where the loss is smallest. This exercise shows how OLS chooses its coefficients. Next we will follow one district's residual to see exactly what enters that calculation.

**Teaching note:** 65–110: begin model block. Have students locate the SSE minimum before revealing the OLS slope.

## 10. Follow one residual

For one district, compare the observed score with the score on the line.

Choose one district with the graph control. Its dot is the observed score. To find its fitted score, move vertically to the line while keeping the same ratio on the horizontal axis. The distance from the fitted score to the observed score is the residual introduced in our equation.

Predict its sign before revealing the segment. A dot above the line has a positive residual because the observed score is higher than the fit. A dot below the line has a negative residual. For example, an observed score of 670 and a fitted score of 665 give a residual of +5 points. Its squared contribution to the OLS loss is 25 squared score points. These numbers illustrate the calculation; the plotted district uses its actual data.

Now choose another district and repeat the steps. The same rule applies to every dot, and OLS adds all the squared contributions. This connects the graph to the formula eᵢ=Yᵢ−Ŷᵢ. It also shows why a residual is a prediction difference for one observation, rather than the effect of changing staffing. We can now ask how all the observations combine to determine the slope.

## 11. Calculate the OLS slope from the data

Compare each variable with its average, then combine the deviations.

To combine the observations, first compare each variable with its sample average. Write X̄ for the average ratio and Ȳ for the average score; the bar means 'sample average'. The expression Xᵢ−X̄ is a deviation from the mean: how far district i's ratio lies above or below the average. Define the score deviation in the same way.

The slope formula adds the cross-products (Xᵢ−X̄)(Yᵢ−Ȳ) and divides by the sum of squared ratio deviations. A cross-product here is simply the product of the two deviations. A district above the average ratio but below the average score contributes a negative product. If such combinations dominate, the fitted slope is negative. The symbol Σ means to add across all districts.

The denominator measures the variation available in X. If every district had the same ratio, it would be zero: we would have no comparison from which to estimate a slope. When it is positive, the ratio of these two sums gives b₁. Then b₀=Ȳ−b₁X̄ chooses the intercept so the line passes through the sample mean point. The next small example lets us check these steps without using software.

## 12. A small calculation you can finish

Use three constructed districts to see the formula work.

Use three constructed districts with ratios 18, 20 and 22 and scores 680, 670 and 650. These are teaching numbers, not three selected observations from the actual dataset. We know how to fit a line from the previous slide, so work through each sum before revealing the answer.

The average ratio is 20 and the average score is 666⅔. Ratio deviations are therefore −2, 0 and +2. Multiply each by its corresponding score deviation and add: the numerator is −60. Square and add the ratio deviations: the denominator is 8. This gives b₁=−60/8=−7.5, and b₀=666⅔−(−7.5×20)=816⅔. The intercept follows from the formula; it does not describe a realistic district with no students per teacher.

Insert each ratio into this fitted equation and subtract its fitted score from the observed score. Check that the residuals sum to zero. This is a property of OLS when the model includes an intercept. It checks the calculation, but it does not test the population assumption that the error averages to zero at each X. Having checked the method, we can return to the real districts and add the language-composition variable.

**Attempt:** Find the slope, intercept, fitted scores and residuals for X=(18,20,22) and Y=(680,670,650).

**Solution:** b₁=−7.5 and b₀=816⅔. Fitted scores are 681⅔, 666⅔ and 651⅔. Residuals are −1⅔, +3⅓ and −1⅔, which sum to zero. Small differences from rounding are acceptable.

## 13. Holding an observed factor fixed

Multiple regression compares ratios and scores at a fixed value of another variable.

Our first line used only the staffing ratio. We now add Zᵢ, the percentage of English learners, to the model. This is multiple regression: a regression with more than one explanatory variable. Its fitted equation is Ŷᵢ=b₀+b₁Xᵢ+b₂Zᵢ. The new coefficient b₂ gives the fitted score difference for one percentage-point increase in Z, keeping X fixed.

The staffing coefficient b₁ now answers a more specific descriptive question. How do fitted scores differ with the ratio when we compare districts at the same Z? This is what 'holding Z fixed' means in this equation. The word adjusted refers to this accounting for Z. We are changing the comparison, rather than physically changing a district's students or teachers.

Select Next step to compare the simple and adjusted lines. For the adjusted line we hold Z at its sample average. Both lines use the same 420 districts, so any change in their slopes comes from adding Z, not from comparing different samples. Notice whether the line becomes steeper or flatter. The next slide translates that change into the staffing comparison we used earlier.

## 14. Explain why the estimated slope changed

Adding Z changes the fitted comparison from about +4.56 to +2.20 score points.

The staffing slope changes from about -2.28 in the simple regression to -1.10 after adding the English-learner share. The adjusted line is flatter. Moving from a ratio of 22 to 20 gives about 4.56 fitted score points on the first line and 2.20 points on the adjusted line. These two numbers describe different comparisons in the same data.

Why might accounting for Z change the slope? If districts at different ratios also have different language composition, the first line combines both differences. The second model tries to separate their fitted relationships with scores. This is why we examined a possible confounder before adding a variable: the control should have a reason connected to the research question.

The second number is not automatically the causal gain from hiring teachers. Family resources and staffing responses to students' needs could still affect the comparison. The useful conclusion at this stage is more specific: one measured district characteristic changes the estimated staffing relationship substantially. Write the two comparisons in words. After the break, we will run the commands and read the numerical evidence behind the graph.

**Attempt:** Report the two fitted score differences for 22 → 20 students per teacher. Explain why they need not be the same.

**Solution:** The simple model gives about +4.56 points. The adjusted model gives about +2.20 points while holding English-learner share fixed. The first comparison also reflects observed differences in language composition across districts; the second accounts for those differences within its stated model.

**Teaching note:** End model block. Break at 110–120 minutes.

## 15. Inspect variables before running the model

Check the data, then use a saved do-file to reproduce the estimates.

We can now reproduce the graph's estimates in Stata. A do-file is a saved list of Stata commands that can be run again. A reproducible result is one for which another person can use the same data and commands to obtain the same calculation. Open the paired do-file and run it from the folder containing its data. The script checks that all 420 districts have values for the variables we need. A missing value is a value that was not recorded or is otherwise unavailable.

The do-file names the outcome score, the ratio str and the English-learner share el. Start with describe to check those names and labels. Then use summarize to inspect their scales. In that output, Obs counts observations, Mean is the average, and Min and Max show the smallest and largest values. Std. dev. means standard deviation, a measure of how widely observed values are spread around their average. This describes variation among districts, which is different from uncertainty about an estimated slope.

The regress command fits the model. Its option vce(robust) requests heteroskedasticity-robust standard errors. A standard error, abbreviated SE, estimates the standard deviation of a coefficient across comparable samples: the scale of variation in that estimate. Heteroskedasticity means the spread of the model errors differs across observations. This option allows for that unequal spread when estimating uncertainty. Its justification assumes that district errors are not related across districts and uses a large-sample approximation: reasoning about how the method behaves as the number of observations increases. It leaves the OLS coefficients unchanged. The next output shows the slope and its SE side by side.

**Teaching note:** 120–165: Stata and practice. Students run commands, rather than only watch a demonstration.

## 16. Read a genuine Stata result

Read the coefficient, SE, test and interval in a real Stata table.

Find the row labelled str. This is the student–teacher ratio. Its estimated coefficient is about -2.280 and its robust SE is about 0.519. The row _cons reports the intercept. This is a coefficient-table excerpt from the actual Stata run; the complete output remains available to download. We will read the columns in the order needed to explain the result.

First consider a null hypothesis, a specific statement we test against the data. Here it is that the population slope equals zero. The t statistic measures the distance between the estimated coefficient and its null value in standard-error units. With a zero null, t=coefficient/SE, so −2.280/0.519 is about −4.39. The column P>|t| gives the two-sided p-value: under the null and the test assumptions, the probability of a t statistic at least this far from zero in either direction. A displayed 0.000 is rounded, not exactly zero. It is not the probability that the null is true.

The last two columns give a 95% confidence interval for the population coefficient, about −3.30 to −1.26. This procedure is designed to cover the true coefficient in 95% of comparable samples when its assumptions hold. Finally, statistical significance means that a result passes a chosen testing threshold, such as p<0.05. It concerns evidence against the stated null; it does not show that other explanations for the staffing association have been removed. We will study these inference ideas, meaning how we learn about a population using sample results and uncertainty, in more detail later.

```text
. regress score str, vce(robust)

------------------------------------------------------------------------------
             |               Robust
       score | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         str |  -2.279808   .5194892    -4.39   0.000    -3.300945   -1.258671
       _cons |    698.933   10.36436    67.44   0.000     678.5602    719.3057
------------------------------------------------------------------------------
```

## 17. Calculate the policy-sized fitted difference

lincom translates a slope into the particular comparison we want.

The table gives the slope for one more student per teacher. The ministry asked about two fewer. To translate between them, we use a contrast: a specified difference between fitted values. Along our line, this contrast is −2 times the staffing slope.

The Stata command lincom -2*str performs that calculation. Lincom means linear combination: multiplying estimated coefficients by stated numbers and adding them if needed. Here there is only one coefficient to multiply. The result is about +4.56 score points. Its SE is about 1.04, which is twice the slope's SE because the contrast multiplies the coefficient by −2. The confidence interval is also expressed in score points.

Before interpreting that interval, check the comparison. A positive two in the command would describe more students per teacher and reverse the sign. The command saves calculation errors only if we ask it the right question. Having translated the simple model, we can now read the model with language composition and calculate the same staffing change at a fixed Z.

```text
. lincom -2*str

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |   4.559617   1.038978     4.39   0.000     2.517343     6.60189
------------------------------------------------------------------------------
```

## 18. Read the adjusted regression

Read both coefficients with their units and the stated comparison.

The second table includes str and el. The variable el is English-learner share, measured in percent. The staffing coefficient is now about -1.101, using the same 420 districts. It matches the flatter adjusted line we saw before the break. The table gives numerical values to the change in comparison that the graph illustrated.

Read the el coefficient with its units. It is about −0.650 score points per percentage-point increase in English-learner share, holding the student–teacher ratio fixed. For example, a change from 15% to 16% corresponds to one unit of this regressor. It does not correspond to moving from a proportion of zero to one. A proportion expresses the share on a scale from zero to one, so 15% would be 0.15 on that scale.

Both coefficients describe fitted district relationships. They do not describe the effect on a particular child of becoming an English learner or changing classrooms. Return to the original question: at the same measured language composition, what fitted score difference accompanies two fewer students per teacher? Use the staffing row to attempt that calculation on the next slide.

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

## 19. Attempt the adjusted policy contrast

Keep the arithmetic and the interpretation together.

Use the adjusted staffing slope to work out the change from 22 to 20 students per teacher. Begin with the change in X, which is −2, and then multiply by the staffing coefficient. Hold the included language-composition variable fixed, as required by this adjusted comparison.

The fitted difference is about +2.20 score points. Stata reports an SE of about 0.866 points and a 95% confidence interval from about 0.50 to 3.90 points. These units belong to the fitted score difference. They are not units of staffing, and they are not percentage changes in scores. Compare your arithmetic with the output only after completing your attempt.

Now add an interpretation. The adjusted model compares districts at the same measured language composition, but it may still leave out other relevant differences. For example, districts might hire teachers in response to earlier low scores, while that earlier difficulty also affects current scores. To use the fitted difference as a policy effect, we would need a design that deals with this explanation. We have therefore learned both what the calculation says and what further evidence a recommendation would require.

**Attempt:** Calculate the adjusted fitted difference for 22 → 20 students per teacher. State its units, what is held fixed and one remaining concern.

**Solution:** (−2)×(−1.101296) is about +2.20 score points, holding English-learner share fixed. Other district differences, or teachers being recruited in response to earlier learning difficulties, may still affect the comparison.

```text
. lincom -2*str

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |   2.202592   .8656943     2.54   0.011     .5009232     3.90426
------------------------------------------------------------------------------
```

## 20. Would the result apply in a new setting?

Check credibility in the original setting and relevance to the new one.

Suppose the ministry now asks whether this California comparison should guide staffing in another country. The answer requires two separate checks. Internal validity asks whether a study identifies the claimed causal effect in its own setting. Identification means that the data and stated assumptions allow us to learn the effect we want, rather than a mixture of that effect and other influences.

External validity asks whether the result applies to the population and policy we now care about. Even a well-identified effect in California may differ elsewhere because class organisation, language needs, teacher training or starting ratios differ. A result must first be credible in its original setting before we ask how well it transfers, but credibility alone does not guarantee transfer.

Use these checks to propose a local study. Specify which schools we would study, what staffing change we would evaluate and how we would measure learning. Then explain what comparison could tell us what would have happened without the change. A concrete plan is more useful than assuming a precise effect from elsewhere must apply locally. This brings us back to the ministry's decision rather than leaving the analysis at a regression table.

**Attempt:** Propose a local staffing study. Name the schools or districts, policy change, learning measure, comparison and main concern.

**Solution:** For example, study school-level learning gains after a funded reduction in the staffing ratio. Compare funded schools with schools whose lack of funding gives a credible estimate of what would otherwise have happened. If struggling schools are selected for funding, the comparison must address their different expected progress.

## 21. Diagnose the claim

A test of the slope and a credible policy comparison answer different questions.

Consider this proposed recommendation: 'The staffing slope is statistically significant, so reducing class sizes will improve scores by exactly the fitted amount.' We now have the tools to evaluate each part of that sentence. The test gives evidence against a zero population slope under the model's assumptions. It does not test whether staffing choices are free from other influences on learning.

The diagram makes the remaining issue concrete. If language composition, family resources or learning needs connect staffing and scores, a sample association can reflect those connections. An estimate of sampling uncertainty tells us how the estimate might vary across comparable samples. It does not tell us whether the comparison separates the policy effect from those other influences. Repeating the same flawed comparison more precisely does not solve that problem.

Rewrite the recommendation using the evidence we have. Name the fitted comparison and give its units, then state the specific reason it may differ from a staffing effect. This is stronger than simply writing 'association is not causation': it shows that you understand the mechanism behind the concern. The final task is to decide what evidence would address it.

**Attempt:** Rewrite: 'Significant slope proves that smaller classes cause higher scores.'

**Solution:** Districts with lower student–teacher ratios have higher fitted scores in these data. A causal staffing effect would require a defensible comparison addressing factors such as family resources and staffing responses to student needs.

**Teaching note:** 165–180: individual transfer, explanation and exit check across the final three pages.

## 22. What would convince you next?

Choose new data or a new comparison to address a specific concern.

Suppose you can improve the study in one way. Adding more districts could make the estimated slope more precise. Precision means that estimates vary less across comparable samples, which is usually reflected in smaller SEs. But more observations do not by themselves explain why districts chose different staffing levels.

If that choice is the main concern, a staffing offer allocated by chance could provide more useful evidence about the policy effect. A natural experiment is another possibility: an outside event or rule creates a comparison that can be argued to resemble random assignment. For example, an unexpected funding rule might alter teacher recruitment for some schools. We would still need to explain why the rule was unrelated to other changes in learning and whether it affected scores through other routes.

Choose an improvement by asking which concern it addresses. Better measurement can help us account for a relevant district difference. More districts can improve precision. A credible assignment rule can help identify a policy effect. These improvements may work together, but they do different jobs. Keeping those jobs separate will guide our model choices throughout the course.

**Attempt:** Compare adding more districts with allocating a staffing offer by chance. What can each improve?

**Solution:** More districts can improve precision if the sampling conditions are suitable. Chance allocation can support a causal comparison by making the offer unrelated to other factors before the policy. We must still check whether the offer was implemented and whether the groups were affected by other differences.

## 23. Exit check: explain one result carefully

Connect the observation, fitted difference, adjustment and policy question.

Return to the ministry's question and explain what we have learned in four sentences. First say what one observation represents and how staffing is measured. Then give the simple model's fitted difference for two fewer students per teacher. Next state how that difference changes after accounting for language composition. Finally, give one specific reason the fitted difference may not equal the policy effect.

Compare answers with a partner. A small rounding difference is an arithmetic detail; confusing score points with percentages changes the meaning. Saying that the adjusted result must be causal because it includes a control is a different and more serious reasoning error. The control changes the comparison in a stated way. Whether it removes the important alternative explanations remains a research-design question.

The next meeting develops this point through omitted-variable bias. An omitted variable is a relevant factor left out of the regression. Bias means that the average estimate across repeated samples differs from the population value we want. If a left-out factor affects scores and is related to staffing, it can systematically distort the staffing estimate. We have already seen the motivation in the two fitted lines; next we will work out the reasoning more fully.

**Attempt:** Write the four-sentence report described here.

**Solution:** One observation is a school district, and staffing is measured as students per teacher. A reduction of two students per teacher gives about +4.56 fitted score points in the simple model. The difference is about +2.20 points after holding English-learner share fixed. Other district differences or staffing responses to learning needs could still prevent either number from measuring the causal gain from hiring teachers.

