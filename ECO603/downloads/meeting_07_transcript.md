# 07. Group comparisons, interactions and joint tests

## 01. Does the staffing association differ across district groups?

An interaction lets slopes differ in a stated way.

A single staffing slope may hide different fitted patterns across districts. We will compare districts with English-learner shares below ten percent with those at or above ten percent. This threshold defines a descriptive grouping for the exercise, not a randomly assigned policy.

An interaction is a product of regressors that allows the relationship of one variable with the outcome to depend on another. We will derive each group's line before reading Stata. This prevents a common mistake: treating the interaction coefficient as the whole effect for the second group rather than the difference between group slopes.

## 02. Define the indicator and reference group

Coding determines which coefficients describe the baseline.

Let D equal one for the higher-English-learner-share group and zero for the lower-share group. An indicator, or dummy variable, is coded this way to represent a condition. The D equals zero group is the reference group: its line is described by the intercept and the main staffing coefficient before interaction additions.

Changing the reference group changes how coefficients are labelled, but not the fitted group predictions when the same model is represented correctly. Always state the coding and threshold in words. Without that information, a group coefficient or interaction cannot be interpreted reliably.

\(D_i=1\{\mathrm{EL}_i\ge10\}\)

## 03. Write the interacted equation

Include the main terms as well as their product.

Let X be the staffing ratio, D the zero-or-one higher-language-share group indicator, and W district income. Y remains the test score. Multiplying X by D gives an interaction regressor: it is zero for group zero and equals X for group one. This permits the fitted staffing slope to differ by group.

In the equation, beta zero is the group-zero intercept, beta one its staffing slope, beta two the group-one intercept shift and beta three the group-one slope shift. Gamma is the income slope, assumed common to both groups in this specification, and u is the remaining error. Define these roles before reading coefficients. The next step is simply to substitute D equal to zero and one, so that the two fitted lines can be seen directly.

\(Y_i=\beta_0+\beta_1X_i+\beta_2D_i+\beta_3X_iD_i+\gamma W_i+u_i\)

\(X\): staffing; \(D\): group; \(W\): income; \(XD\): their interaction.

## 04. Substitute zero and one before interpreting

Two group equations reveal the relevant combinations.

For D equal to zero, the D and interaction terms disappear. The X slope is beta one. For D equal to one, the intercept becomes beta zero plus beta two and the X slope becomes beta one plus beta three. The interaction coefficient is therefore the slope difference, not the second group's total slope.

Work through these substitutions before using verbal shortcuts. An intercept difference is the group gap at X equal to zero, which may lie outside the meaningful staffing range. A more useful group comparison can be calculated at a realistic X, as we will do after reading the fitted values.

\(D=0:\quad \partial E(Y\mid X,D,W)/\partial X=\beta_1\)

\(D=1:\quad \partial E(Y\mid X,D,W)/\partial X=\beta_1+\beta_3\)

## 05. Interaction contrast

Try the comparison before opening the explanation.

In \(Y=a+0.4X-0.9(X\times near)+c\,near+u\), near is 0 or 1. What are the x slopes far from and near the border?

This constructed border example uses the same zero-or-one substitution as the school-group model. Set near to zero and then one; keep the intercept shift separate from the slope change.

**Practice:** In \(Y=a+0.4X-0.9(X\times near)+c\,near+u\), near is 0 or 1. What are the x slopes far from and near the border?

## 06. Interaction contrast: explanation

Follow the calculation and interpret its units.

Far: 0.4. Near: \(0.4-0.9=-0.5\). The interaction is the difference in slopes, −0.9. The near-group intercept shift c is a different quantity.

Far: 0.4. Near: \(0.4-0.9=-0.5\). The interaction is the difference in slopes, −0.9. The near-group intercept shift c is a different quantity.

## 07. Read both fitted lines in the actual school data

The reference slope and slope difference can have different signs.

The lower-share group's staffing slope is 0.680. The interaction is -2.192, so the higher-share group's fitted slope is about -1.512. These are conditional associations with income held fixed. They do not establish that changing a district's group status would cause either pattern.

The graph draws the two fitted lines at a common observed income value. Select the next step to show the difference. Use it to check that the interaction changes a slope, while the group main effect changes the intercept. The two changes enter different policy and group comparisons.

## 08. Factor-variable syntax keeps the model explicit

Use Stata’s interaction notation to include the needed terms.

In Stata, c.str marks the staffing ratio as continuous and i.high marks the group indicator as categorical. The double-hash operator includes both main effects and their interaction. This makes the intended model easier to inspect and supports post-estimation comparisons.

Read the resulting row labels rather than assume every coefficient applies to every group. The staffing row gives the reference slope; the interaction row gives the additional slope for the higher-share group. The group indicator row gives an intercept difference. These meanings follow the coding we defined before estimating.

```text
. regress score c.str##i.high income, vce(robust)

------------------------------------------------------------------------------
             |               Robust
       score | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         str |   .6800597   .3532615     1.93   0.055    -.0143453    1.374465
      1.high |   28.41596   12.83889     2.21   0.027     3.178593    53.65332
             |
  high#c.str |
          1  |  -2.192258   .6399264    -3.43   0.001    -3.450159   -.9343566
             |
      income |   1.651672   .1034089    15.97   0.000     1.448401    1.854942
       _cons |   622.5112   7.209389    86.35   0.000     608.3397    636.6826
------------------------------------------------------------------------------
```

## 09. Calculate a policy contrast within a group

A two-student change uses that group’s total slope.

For the higher-share group, a two-student reduction changes the fitted score by minus two times beta one plus beta three. The grouping and income value are held fixed in this calculation. The result differs from simply multiplying the interaction coefficient by minus two.

The distinction matters in policy applications where one group responds differently from another. A slope difference describes heterogeneity, meaning variation in the fitted relationship across groups. The total group slope describes the within-group change. Name which of those quantities the question asks for before calculating or testing it.

\(\Delta\widehat Y_{D=1}=-2(\widehat\beta_1+\widehat\beta_3)\)

```text
. lincom -2*str-2*1.high#c.str

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |   3.024396   1.071979     2.82   0.005       .91721    5.131582
------------------------------------------------------------------------------
```

## 10. The SE of a sum needs covariance

Coefficient estimates can move together across samples.

The higher-group slope is the staffing coefficient plus the interaction coefficient. Across repeated samples, those estimates move together, so their separate standard errors do not determine the sum's standard error. Covariance is the average product of their deviations from their respective means. We introduced that co-movement measure in the previous meeting; here it concerns estimates rather than raw district variables.

For a constructed example, suppose their variances are 0.04 and 0.09 and their covariance is minus 0.03. The sum's variance is 0.04 plus 0.09 minus 0.06, or 0.07. Its standard error is the square root, about 0.265. Adding the two standard errors would give 0.5 and be wrong. In the displayed matrix notation, V eleven and V thirty-three are the two variances and V thirteen their covariance. Stata's lincom uses all three pieces.

\(\operatorname{Var}(\widehat\beta_1+\widehat\beta_3)=V_{11}+V_{33}+2V_{13}\)

Example: \(SE=\sqrt{0.04+0.09+2(-0.03)}=\sqrt{0.07}\approx0.265\)

## 11. Uncertainty of a sum

Try the comparison before opening the explanation.

In the lesson’s interaction model, the higher-group staffing slope is beta one plus beta three. Can its standard error be obtained by adding the two coefficient standard errors?

Use the variance of a sum. A negative covariance can make the sum more precise than a calculation that ignores co-movement.

**Practice:** In the lesson’s interaction model, the higher-group staffing slope is beta one plus beta three. Can its standard error be obtained by adding the two coefficient standard errors?

## 12. Uncertainty of a sum: explanation

Follow the calculation and interpret its units.

No. Add their variances and twice their covariance, then take the square root. With variances 0.04 and 0.09 and covariance −0.03, the result is the square root of 0.07, about 0.265. Stata’s lincom uses the fitted covariance matrix for the actual model.

No. Add their variances and twice their covariance, then take the square root. With variances 0.04 and 0.09 and covariance −0.03, the result is the square root of 0.07, about 0.265. Stata’s lincom uses the fitted covariance matrix for the actual model.

## 13. Read the higher-group slope as one tested quantity

Use the output for the combination the question asks about.

The lincom command adds the staffing main effect and the group interaction. Its coefficient is the higher-share group's total staffing slope. Its SE and interval use the covariance between those two estimates.

Compare this with the interaction row alone. A significant interaction tests a difference between slopes; a test of the combined slope asks whether the higher group's slope differs from a stated value. One can be detected when the other is not. This is why comparing two separate significance stars is not a valid test that two group effects differ.

```text
. lincom str+1.high#c.str

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |  -1.512198   .5359897    -2.82   0.005    -2.565791    -.458605
------------------------------------------------------------------------------
```

## 14. A group gap can depend on X

The group main effect is not the gap at every staffing ratio.

The group indicator shifts the fitted intercept by beta two, and its interaction shifts the staffing slope by beta three. Subtract the fitted value for group zero from that for group one at the same staffing X and income. The gap is beta two plus beta three times X. It is not a single constant when the slopes differ.

The intercept gap refers to X equal to zero, which is not a realistic school-staffing ratio. To make it refer to 20 students per teacher, define a centered regressor as X minus 20 and rewrite the same model using it. Centering means subtracting a chosen reference value. It changes coefficient labels and the meaning of an intercept but leaves the fitted lines unchanged. We verify this algebra below.

\(\mathrm{Gap}(X)=\beta_2+\beta_3X\)

Center at 20: \(X^c=X-20\)

## 15. A joint hypothesis asks whether several restrictions hold together

One coefficient test cannot replace the combined question.

To ask whether the two group lines coincide, test two restrictions together: the group intercept shift is zero and the interaction slope shift is zero. Checking only the interaction permits different intercepts. Checking two separate p-values also does not create a single test with the desired overall rejection probability.

A Wald test measures the estimated restrictions' joint distance from their null values, accounting for their estimated variances and covariances. A restriction is a claimed equality involving coefficients. Here there are two. After the robust regression, Stata can test the indicator and interaction jointly using the fitted covariance matrix. A classical F test obtains a related comparison from the loss of fit between restricted and unrestricted models under the additional equal-variance assumptions introduced in Meeting 04.

\(H_0:\beta_2=0,\ \beta_3=0\)

Joint Wald test: evaluate the estimated restrictions using their covariance.

```text
. test 1.high 1.high#c.str

 ( 1)  1.high = 0
 ( 2)  1.high#c.str = 0

       F(  2,   415) =   98.88
            Prob > F =    0.0000
```

## 16. Classical fit-loss F tests require matched models

Restricted and unrestricted fits must answer one nested comparison.

The restricted model imposes the null equalities; the unrestricted model allows the corresponding coefficients to vary. Both must use the same outcome and observations. SSR is the sum of squared residuals. For a constructed example, let restricted SSR be 110, unrestricted SSR be 100, and let two restrictions remove two parameters. With 100 observations and five unrestricted coefficients, divide the SSR increase per restriction, five, by unrestricted SSR per residual degree of freedom, 100 divided by 95. The F statistic is 4.75.

The general formula uses q for the number of restrictions and k subscript U for all unrestricted coefficients, including the intercept. The classical F reference needs the conventional model assumptions. With unequal variance or dependence, use an appropriately estimated covariance and a justified joint test rather than treating a mechanical SSR calculation as universally valid.

\(F=\dfrac{(SSR_R-SSR_U)/q}{SSR_U/(n-k_U)}\)

Example: \(F=\dfrac{(110-100)/2}{100/(100-5)}=4.75\)

## 17. Centering changes coefficient labels, not fitted values

Choose a reference value that helps interpretation.

Define a centered ratio as X minus twenty. In the interacted equation, the group main effect now describes the fitted group gap at a ratio of twenty rather than zero. The interaction still describes the slope difference. Predictions at any actual staffing ratio remain unchanged when the model is re-expressed consistently.

This is a useful presentation choice, especially when an uncentered intercept lies far outside the data. It does not remove confounding or create new information. Its benefit is that a coefficient now answers a more meaningful reference comparison, which should be stated in the report.

\(X_i^c=X_i-20\)

## 18. Check whether fixed effects absorb a regressor

A time-only variable cannot survive unrestricted time indicators.

A year indicator permits a separate intercept shift for each year. Suppose a tax is one in the first year and two in the second for every district. With an intercept and an indicator for the second year, the tax equals the intercept column plus that indicator. It supplies no separate variation, so its coefficient cannot also be estimated. We say the year effects absorb it.

Now multiply the tax by near, a zero-or-one indicator for a location group. In each year the product differs between the groups, and its group difference changes across years. It can therefore have variation beyond the common year shifts. The coefficient is a differential group slope, while the common tax slope remains absorbed. In Meeting 13 we add separate unit intercepts and show how to check the variation that survives both kinds of controls.

If \(Tax_t=1+1\{t=2\}\), its column duplicates year-intercept variation.

\(Tax_t\times near_i\) can vary across groups within a year.

A separate coefficient needs variation beyond the included controls.

## 19. What year effects absorb

Try the comparison before opening the explanation.

\(Tax_t\) is identical across all districts in each year. Can its coefficient be estimated separately in a regression with an intercept and a full set of year effects? Can \(Tax_t\times near_i\) survive?

Try reproducing the common tax column using the year indicators. Then ask whether the tax-by-group product has additional variation.

**Practice:** \(Tax_t\) is identical across all districts in each year. Can its coefficient be estimated separately in a regression with an intercept and a full set of year effects? Can \(Tax_t\times near_i\) survive?

## 20. What year effects absorb: explanation

Follow the calculation and interpret its units.

The common tax column is a linear combination of the year indicators, so its separate coefficient is not identified in that regression. The tax-by-group product can retain variation because it differs across groups within years. Check that it is not reproduced by all the included controls. It describes a differential group slope; it does not recover the absorbed common tax effect.

The common tax column is a linear combination of the year indicators, so its separate coefficient is not identified in that regression. The tax-by-group product can retain variation because it differs across groups within years. Check that it is not reproduced by all the included controls. It describes a differential group slope; it does not recover the absorbed common tax effect.

## 21. Separate group heterogeneity from causal identification

A different slope is still a fitted relationship.

The school grouping is based on observed language composition. Its members can differ in many measured and unmeasured ways. An interaction describes how a conditional fitted relationship differs across these groups, but does not make the group comparison experimental.

For a causal heterogeneity claim, explain how staffing variation is identified within each relevant group and whether the assumptions support comparing those effects. Also consider whether the group characteristic is measured before treatment. Interacting an endogenous variable with a group indicator generally does not remove the underlying endogeneity.

Let X indicate programme participation, M post-programme skills, Y earnings and U prior ability. Skills can be a mediator between participation and earnings. If prior ability affects both skills and earnings, skills are also a collider on the programme-to-skills-to-ability-to-earnings alternative route. Conditioning on skills can both remove part of the programme mechanism and open selection through ability. The interaction coefficient describes functional-form heterogeneity; the DAG supplies the separate causal control argument.

## 22. Choose the dependence unit for inference

The number of rows need not equal the number of independent sources.

Imagine a state policy observed for many districts. Districts in one state may share an implementation decision or an economic shock, so their errors need not be independent. Adding districts within that state then adds less independent policy information than adding another independently assigned state.

A cluster is a group within which errors may be related. Cluster-robust inference allows that within-group dependence while relying on suitable independence across clusters and enough informative clusters. The clustering unit should follow the policy assignment and error story; it is not selected to obtain a preferred standard error. For repeated state observations, state clustering is often a candidate, but common national shocks or very few states require additional care. We use repeated-state data in Meeting 13.

Cluster: a group within which errors may be related.

Independent information follows the assignment/error structure, not just the row count.

## 23. Build an empirical comparison before reading stars

List the coefficient combination and its units.

For each question, write the required expression: a reference slope, a second-group slope, a slope difference or a group gap at a stated X. Then use the fitted covariance to test or interval that quantity. This keeps the analysis tied to the question rather than the arrangement of rows in the output.

In a policy memo, report a feasible change within each group and the evidence for any difference between them. Explain the adjustment and identifying assumptions. A clear comparison can remain useful even if uncertainty is too large to conclude that the group effects differ.

For each question, write the required expression: a reference slope, a second-group slope, a slope difference or a group gap at a stated X.

In a policy memo, report a feasible change within each group and the evidence for any difference between them.

## 24. DAG practice: a binary treatment still needs a control argument

Trace the routes before choosing a control.

Programme participation affects post-programme skills and earnings. Prior ability affects skills and earnings. If the programme is initially independent of ability, what two changes can occur when skills are held fixed? Would adding a group interaction automatically resolve them?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Programme participation affects post-programme skills and earnings. Prior ability affects skills and earnings. If the programme is initially independent of ability, what two changes can occur when skills are held fixed? Would adding a group interaction automatically resolve them?

## 25. DAG practice: a binary treatment still needs a control argument: explanation

Explain what conditioning changes in this stated graph.

Conditioning on skills blocks the mediated programme route \(X\rightarrow M\rightarrow Y\). It can also open \(X\rightarrow M\leftarrow U\rightarrow Y\), where skills are a collider and ability influences earnings. A regression can consequently mix a changed target with new selection.

A group interaction changes the specified shape or subgroup slope. It does not automatically supply the missing causal control argument. Define the intervention and whether its total or a suitable direct effect is wanted, then assess assignment and mediator–outcome assumptions before interpreting the interaction causally.

Conditioning on skills blocks the mediated programme route \(X\rightarrow M\rightarrow Y\). It can also open \(X\rightarrow M\leftarrow U\rightarrow Y\), where skills are a collider and ability influences earnings. A regression can consequently mix a changed target with new selection. A group interaction changes the specified shape or subgroup slope. It does not automatically supply the missing causal control argument. Define the intervention and whether its total or a suitable direct effect is wanted, then assess assignment and mediator–outcome assumptions before interpreting the interaction causally.

## 26. Turn an interaction into two policy contrasts

Reproduce the evidence, then explain its economic meaning.

Run meeting_07.do. Compute the staffing slope for each language-share group and the fitted score contrast for a reduction of two students per teacher in each group, holding income fixed. Use the lincom output to assess the higher-share contrast. Explain why the group slope difference and the group intercept difference answer different questions.

**Practice:** Run meeting_07.do. Compute the staffing slope for each language-share group and the fitted score contrast for a reduction of two students per teacher in each group, holding income fixed. Use the lincom output to assess the higher-share contrast. Explain why the group slope difference and the group intercept difference answer different questions.

## 27. Turn an interaction into two policy contrasts: explanation

A reproducible result needs both a calculation and an interpretation.

The lower-share staffing slope is 0.680060. Adding the interaction coefficient -2.192258 gives the higher-share slope -1.512198. The fitted two-student contrasts are therefore -1.3601 and 3.0244 score points, respectively.

Use lincom for the second contrast because its uncertainty depends on covariance between the staffing and interaction estimates. The interaction measures a difference in slopes, while the group indicator shifts the intercept. Neither is automatically a causal subgroup treatment effect. The adjusted comparison and the reason for different staffing choices within each group still need to be defended.

The lower-share staffing slope is 0.680060. Adding the interaction coefficient -2.192258 gives the higher-share slope -1.512198. The fitted two-student contrasts are therefore -1.3601 and 3.0244 score points, respectively. Use lincom for the second contrast because its uncertainty depends on covariance between the staffing and interaction estimates. The interaction measures a difference in slopes, while the group indicator shifts the intercept. Neither is automatically a causal subgroup treatment effect. The adjusted comparison and the reason for different staffing choices within each group still need to be defended.

## 28. Carry the same reasoning into ordered observations

Time adds structure to both models and uncertainty.

We can now represent different group slopes, calculate combined effects and evaluate joint restrictions. We also saw why a regressor's available variation must be checked against the rest of the equation. These are practical tools for reading applied research and building a defensible specification.

The next teaching block turns to observations ordered through time. Trend, seasonality and persistent errors create new comparisons and uncertainty problems. The principles remain familiar: define the data structure, derive the quantity that answers the question, and justify the assumptions before treating the fitted result as an economic effect.

We can now represent different group slopes, calculate combined effects and evaluate joint restrictions.

The next teaching block turns to observations ordered through time.

