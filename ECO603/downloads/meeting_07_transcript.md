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

Let Y be score, X the staffing ratio and W income. The equation includes an intercept, X, D, X times D and income. Beta two shifts the intercept between groups, while beta three changes the X slope for D equal to one. Income is included additively here, so its fitted slope is common across these groups.

This is a specific modelling choice. An interaction does not automatically represent every possible difference between groups. Define which relationships may vary and which remain common. The fitted comparison then has an explicit meaning that we can evaluate against the empirical question.

Gamma is the common income slope, W is income and u is the remaining outcome error. Multiplying X by D switches the additional staffing term off in the reference group and on in the higher-language-share group.

\(Y_i=\beta_0+\beta_1X_i+\beta_2D_i+\beta_3X_iD_i+\gamma W_i+u_i\)

\(\gamma\): common income slope; \(XD\): staffing–group product

## 04. Substitute zero and one before interpreting

Two group equations reveal the relevant combinations.

For D equal to zero, the D and interaction terms disappear. The X slope is beta one. For D equal to one, the intercept becomes beta zero plus beta two and the X slope becomes beta one plus beta three. The interaction coefficient is therefore the slope difference, not the second group's total slope.

Work through these substitutions before using verbal shortcuts. An intercept difference is the group gap at X equal to zero, which may lie outside the meaningful staffing range. A more useful group comparison can be calculated at a realistic X, as we will do after reading the fitted values.

\(D=0:\quad \partial E(Y\mid X,D,W)/\partial X=\beta_1\)

\(D=1:\quad \partial E(Y\mid X,D,W)/\partial X=\beta_1+\beta_3\)

## 05. Read both fitted lines in the actual school data

The reference slope and slope difference can have different signs.

The lower-share group's staffing slope is 0.680. The interaction is -2.192, so the higher-share group's fitted slope is about -1.512. These are conditional associations with income held fixed. They do not establish that changing a district's group status would cause either pattern.

The graph draws the two fitted lines at a common observed income value. Select the next step to show the difference. Use it to check that the interaction changes a slope, while the group main effect changes the intercept. The two changes enter different policy and group comparisons.

## 06. Interaction contrast

Apply the idea before reading the solution.

In \(Y=a+0.4X-0.9(X\times near)+c\,near+u\), near is 0 or 1. What are the x slopes far from and near the border?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** In \(Y=a+0.4X-0.9(X\times near)+c\,near+u\), near is 0 or 1. What are the x slopes far from and near the border?

## 07. Interaction contrast: explanation

Connect the calculation to the empirical claim.

Far: 0.4. Near: \(0.4-0.9=-0.5\). The interaction is the difference in slopes, −0.9. The near-group intercept shift c is a different quantity.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Far: 0.4. Near: \(0.4-0.9=-0.5\). The interaction is the difference in slopes, −0.9. The near-group intercept shift c is a different quantity.

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

The variance of a sum equals the sum of variances plus twice the covariance. Here covariance describes how the two coefficient estimates vary together across comparable samples. Ignoring it can overstate or understate uncertainty in the combined slope.

The SE is the square root of that variance; it is not the sum of the coefficient SEs. Stata's lincom uses the fitted covariance matrix to calculate the appropriate combination. The same rule applies to many policy contrasts, marginal effects and predicted differences, making covariance a practical concept rather than an abstract extra term.

V-eleven and V-thirty-three denote the variances of the first and interaction slope estimates. V-thirteen is their covariance, the corresponding off-diagonal entry of the estimated coefficient covariance matrix.

\(\operatorname{Var}(\widehat\beta_1+\widehat\beta_3)=V_{11}+V_{33}+2V_{13}\)

\(V_{11},V_{33}\): variances; \(V_{13}\): covariance

## 11. Read the higher-group slope as one tested quantity

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

## 12. A group gap can depend on X

The group main effect is not the gap at every staffing ratio.

At a fixed staffing ratio X and income W, the fitted gap between D equals one and D equals zero is beta two plus beta three times X. When there is an interaction, the gap changes along the horizontal axis.

Evaluate it at a realistic ratio, such as twenty, instead of treating the group main effect as a universal difference. If a zero value of X is not meaningful, the intercept difference alone may have little substantive use. Centering X around a realistic reference point can make that intercept comparison easier to interpret without changing the fitted model.

\(\mathrm{Gap}(X)=\beta_2+\beta_3X\)

## 13. A joint hypothesis asks whether several restrictions hold together

One coefficient test cannot replace the combined question.

Suppose we ask whether the two groups share the same intercept and staffing slope, conditional on income. The joint null sets both the group main effect and the interaction to zero. A joint test evaluates those restrictions together, taking their covariance into account.

The F statistic summarises the evidence against the group of restrictions under the chosen inference method. Its numerator degrees of freedom count the restrictions, here two. With robust covariance estimation, this is a robust Wald-type F test rather than an automatically exact classical finite-sample test. State the hypothesis in words before reading the p-value.

\(H_0:\ \beta_2=0,\ \beta_3=0\)

```text
. test 1.high 1.high#c.str

 ( 1)  1.high = 0
 ( 2)  1.high#c.str = 0

       F(  2,   415) =   98.88
            Prob > F =    0.0000
```

## 14. Uncertainty of a sum

Apply the idea before reading the solution.

To test the near-group slope \(\beta_1+\beta_2\), is \(\operatorname{SE}(\widehat\beta_1)+\operatorname{SE}(\widehat\beta_2)\) correct?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** To test the near-group slope \(\beta_1+\beta_2\), is \(\operatorname{SE}(\widehat\beta_1)+\operatorname{SE}(\widehat\beta_2)\) correct?

## 15. Uncertainty of a sum: explanation

Connect the calculation to the empirical claim.

No. Its variance is \(\operatorname{Var}(\widehat\beta_1)+\operatorname{Var}(\widehat\beta_2)+2\operatorname{Cov}(\widehat\beta_1,\widehat\beta_2)\). Take the square root of that sum; use lincom after the fitted interaction model. The covariance cannot generally be ignored.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

No. Its variance is \(\operatorname{Var}(\widehat\beta_1)+\operatorname{Var}(\widehat\beta_2)+2\operatorname{Cov}(\widehat\beta_1,\widehat\beta_2)\). Take the square root of that sum; use lincom after the fitted interaction model. The covariance cannot generally be ignored.

## 16. Classical fit-loss F tests require matched models

Restricted and unrestricted fits must answer one nested comparison.

In the classical constant-variance setting, an F test can compare the increase in residual sum of squares when q restrictions are imposed. The restricted model must be nested within the unrestricted model, meaning it is obtained by imposing those restrictions. Both fits must use the same observations.

The numerator measures fit lost per restriction; the denominator scales it by the unrestricted residual variance estimate. This formula is not the general formula for a heteroskedasticity-robust test. If using robust inference, use the estimated covariance and a suitable Wald test rather than applying the classical residual-sum-of-squares shortcut without its assumptions.

SSR means sum of squared residuals. R and U label the restricted and unrestricted regressions, q counts the restrictions and k-U counts all coefficients estimated in the unrestricted regression, including the intercept. The denominator n minus k-U is its residual degrees of freedom.

\(F=\dfrac{(SSR_R-SSR_U)/q}{SSR_U/(n-k_U)}\) under classical conditions

\(SSR\): residual sum of squares; \(q\): restrictions; \(k_U\): unrestricted coefficients

## 17. Centering changes coefficient labels, not fitted values

Choose a reference value that helps interpretation.

Define a centered ratio as X minus twenty. In the interacted equation, the group main effect now describes the fitted group gap at a ratio of twenty rather than zero. The interaction still describes the slope difference. Predictions at any actual staffing ratio remain unchanged when the model is re-expressed consistently.

This is a useful presentation choice, especially when an uncentered intercept lies far outside the data. It does not remove confounding or create new information. Its benefit is that a coefficient now answers a more meaningful reference comparison, which should be stated in the report.

\(X_i^c=X_i-20\)

## 18. Check whether fixed effects absorb a regressor

A time-only variable cannot survive unrestricted time indicators.

Suppose a tax measure has one common value for all districts in each year. An intercept and a full set of year indicators can reproduce that tax series exactly. Its separate coefficient is therefore not identified in the same equation. This is exact multicollinearity, not merely a large SE.

An interaction between the time-varying tax and a district group can still vary across groups within a year and across years. After unit and year effects are removed, that remaining interaction may be estimable. It describes a differential relationship across groups; it does not recover the absorbed common tax effect. The written equation must match the interpretation.

A year fixed effect is a separate intercept shift for each year. The span of the year indicators is the set of all series their linear combinations can reproduce. A variable entirely in that set adds no new variation for estimating a separate coefficient.

\(T_t\in\operatorname{span}\{\text{year indicators}\}\)

\(T_tD_i\) can retain two-way residual variation

\(\operatorname{span}\): all linear combinations of the listed variables

## 19. Separate group heterogeneity from causal identification

A different slope is still a fitted relationship.

The school grouping is based on observed language composition. Its members can differ in many measured and unmeasured ways. An interaction describes how a conditional fitted relationship differs across these groups, but does not make the group comparison experimental.

For a causal heterogeneity claim, explain how staffing variation is identified within each relevant group and whether the assumptions support comparing those effects. Also consider whether the group characteristic is measured before treatment. Interacting an endogenous variable with a group indicator generally does not remove the underlying endogeneity.

Let X indicate programme participation, M post-programme skills, Y earnings and U prior ability. Skills can be a mediator between participation and earnings. If prior ability affects both skills and earnings, skills are also a collider on the programme-to-skills-to-ability-to-earnings alternative route. Conditioning on skills can both remove part of the programme mechanism and open selection through ability. The interaction coefficient describes functional-form heterogeneity; the DAG supplies the separate causal control argument.

## 20. Choose the dependence unit for inference

The number of rows need not equal the number of independent sources.

If several observations share a policy assignment or common shocks, their errors may be related. Clustered SEs allow dependence within specified groups while relying on suitable conditions across clusters. A cluster is a group of observations treated as a potentially dependent unit for inference.

For a state policy observed in many districts, state-level clustering may be a starting point if states provide the relevant independent variation. Merely clustering by district can miss shared state shocks. The right choice depends on assignment, sampling and error dependence, and few clusters can make conventional approximations unreliable. Explain the structure rather than invoke one universal threshold.

If several observations share a policy assignment or common shocks, their errors may be related.

For a state policy observed in many districts, state-level clustering may be a starting point if states provide the relevant independent variation.

## 21. Build an empirical comparison before reading stars

List the coefficient combination and its units.

For each question, write the required expression: a reference slope, a second-group slope, a slope difference or a group gap at a stated X. Then use the fitted covariance to test or interval that quantity. This keeps the analysis tied to the question rather than the arrangement of rows in the output.

In a policy memo, report a feasible change within each group and the evidence for any difference between them. Explain the adjustment and identifying assumptions. A clear comparison can remain useful even if uncertainty is too large to conclude that the group effects differ.

For each question, write the required expression: a reference slope, a second-group slope, a slope difference or a group gap at a stated X.

In a policy memo, report a feasible change within each group and the evidence for any difference between them.

## 22. What year effects absorb

Apply the idea before reading the solution.

\(Tax_t\) is identical across all districts in each year. Can its coefficient be estimated separately in a regression with an intercept and a full set of year effects? Can \(Tax_t\times near_i\) survive?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** \(Tax_t\) is identical across all districts in each year. Can its coefficient be estimated separately in a regression with an intercept and a full set of year effects? Can \(Tax_t\times near_i\) survive?

## 23. What year effects absorb: explanation

Connect the calculation to the empirical claim.

The common tax variable is an exact linear combination of year indicators and is absorbed. The interaction can survive because it differs across groups within a year and changes over time. With both unit and year effects, identification requires nonzero two-way residualized interaction variation. It estimates a differential slope, not the absorbed common effect.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

The common tax variable is an exact linear combination of year indicators and is absorbed. The interaction can survive because it differs across groups within a year and changes over time. With both unit and year effects, identification requires nonzero two-way residualized interaction variation. It estimates a differential slope, not the absorbed common effect.

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

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

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

