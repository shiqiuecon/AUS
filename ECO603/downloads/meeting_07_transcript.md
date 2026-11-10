# 07. Functional form, indicators and prediction

Choose a specification for a realistic comparison and check whether it predicts well.

## Core lesson

### 01. Do prices differ by the same amount or the same percent?

Choose a scale that answers the economic question.

Suppose you are comparing soda prices in two areas with different family incomes. Should your result be in dollars or in percent? Does the answer change when the income difference is large? We will use the same retail observations to see what levels, logs and a curved relationship imply.

We then allow two district groups to have different staffing slopes. The same idea of a fitted comparison also helps us describe changes in mortgage denial probability. We finish by judging predictions on districts held out of fitting. Across these tasks, start by naming the quantity you need to report, then choose an equation and an evaluation that answer that question.

### 02. Define the observation and the usable sample

Inspect the data before interpreting a transformed variable.

The file contains retail-price records linked to local median family income. A median is the middle value when values are ordered; it differs from the arithmetic mean. Its five variables do not establish that each row is a unique geographic area, so we describe the observed records rather than claim one independent observation per postcode. The working sample contains 401 records with positive, observed price and income values.

Price is measured in dollars. Income is measured in dollars and is also scaled into units of ten thousand dollars for a readable level coefficient. This rescaling changes a coefficient's numerical units without changing fitted prices. Taking logs instead changes the shape and interpretation of the fitted relationship.

\(X=\text{income}/10{,}000\)

Outcome: medium soda price, in dollars

### 03. A level–level model has a constant unit slope

A one-unit income change produces the same fitted dollar difference.

In the level model, price equals an intercept plus beta times income measured in ten-thousand-dollar units. The coefficient is 0.009. A ten-thousand-dollar income difference therefore corresponds to about nine-tenths of one cent in fitted price.

That is a small dollar difference even when a statistical test detects a relationship. For another feasible comparison, multiply the slope by the income difference in the correct scaled units. This model assumes the same slope across the observed income range. The assumption is about the shape of the fitted comparison, not proof that changing income would cause prices to follow it.

\(\widehat P=a+bX\)

\(\Delta\widehat P=b\Delta X\)

```text
. regress sprice inc10, vce(robust)

------------------------------------------------------------------------------
             |               Robust
      sprice | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       inc10 |   .0090733   .0031523     2.88   0.004     .0028761    .0152705
       _cons |   1.002219   .0157154    63.77   0.000     .9713236    1.033114
------------------------------------------------------------------------------
```

### 04. A logarithm expresses a proportional scale

Small log differences approximate percentage differences.

A natural logarithm changes the scale of a positive number. Think of it as answering which power of the number e, about 2.718, produces the original number. A price of one has log zero; a price of two has log about 0.693. The exponential function reverses this operation: exponentiating 0.693 gives about two. We use natural logs throughout.

The useful property is that subtracting logs gives the log of a ratio. If price rises from two to 2.20, its ratio is 1.10 and its log change is about 0.09531. Exponentiating the log change and subtracting one recovers the proportional change, 0.10 or ten percent. A log change is close to a proportional change when the change is small, but they are not identical. We can now interpret a regression with a logged outcome without confusing the two scales.

\(\log(1)=0,\quad \log(2)\approx0.693,\quad \exp(0.693)\approx2\)

\(\log(2.20)-\log(2)=\log(1.10)\approx0.09531\)

\(100\{\exp(0.09531)-1\}\approx10\%\)

### 05. A log–level model gives a proportional outcome contrast

Keep the regressor units visible.

In a log–level model the outcome is logged and the regressor stays in levels. A change of delta X produces a fitted log difference of b times delta X. The approximate percent contrast is 100b times delta X; the exact contrast between exponentiated fitted values is 100 times exp(b delta X) minus one.

If income is measured in ten-thousand-dollar units, a coefficient applies to that unit, not one dollar. A dummy variable is a zero-or-one indicator for a stated condition. Its coefficient compares those two states in this log specification. These interpretations all follow from the same equation. The apparent variety of percentage rules becomes manageable when we first write the change in the fitted log outcome.

\(\widehat{\log P}=a+bX\)

\(100\{\exp(b\Delta X)-1\}\)

### 06. Which average does a log fit describe?

An average log is not the log of an arithmetic average.

Take two equally likely positive prices, one and nine. Their arithmetic mean is five. Their logs are zero and about 2.197, whose average is about 1.099. Exponentiating that average gives three, not five. This is the geometric mean: the exponential of the average log.

A regression for the mean log price therefore does not automatically predict the arithmetic mean price when exponentiated. Our percentage translations initially describe ratios of exponentiated fitted log values. If the outcome distributions in two comparison groups differ only by a common multiplicative factor, that ratio also gives the ratio of arithmetic means. More generally, we must account for the remaining log-error distribution. Keep this distinction in mind as we compare the functional forms; we return to its formula after the worked contrasts.

Arithmetic mean: \((1+9)/2=5\)

Exponentiated mean log: \(\exp\{(\log1+\log9)/2\}=3\)

State which prediction quantity is being compared.

### 07. A level–log model gives a level outcome contrast

A percent change in X becomes a small change in log X.

Now keep the outcome in levels and log the regressor. A proportional increase from X to 1.1X changes the fitted outcome by b log(1.1). For a small one-percent increase in X, the fitted level change is approximately b divided by one hundred.

The outcome units remain dollars, points or whatever its original definition specifies. They do not become percent merely because one regressor is logged. For a substantial proposed income change, use the exact log ratio of new to old income. This avoids an interpretation that quietly treats a large change as a tiny local movement.

\(\widehat Y=a+b\log X\)

\(\Delta\widehat Y=b\log(X_1/X_0)\)

### 08. A log–log slope is an elasticity

It relates proportional changes in both variables.

An elasticity is the proportional change in an outcome for a small proportional change in a regressor. In a log–log model, the slope is a constant fitted elasticity. A slope of minus 0.7 means a one-percent price rise corresponds locally to about a 0.7-percent quantity decline.

For a finite ten-percent price rise, the exact fitted quantity ratio is 1.1 raised to the power minus 0.7. Its percentage change is about minus 6.45 percent. It is not exactly minus seven percent. The distinction between a local slope and a finite contrast is especially useful when policy changes are large.

\(\widehat{\log Y}=a+b\log X\)

\(\%\Delta\widehat Y=100\{(X_1/X_0)^b-1\}\)

### 09. Read the actual price–income elasticity

A unit-free slope still needs an empirical interpretation.

The log–log regression gives an income slope of 0.037, with robust SE 0.015. A one-percent higher local income corresponds to about a 0.037-percent higher fitted price in this sample. This is a small association, measured on a different scale from the dollar slope.

The coefficient does not show what a transfer to households would cause retailers to charge. Area characteristics, costs and market structure may also vary with income. It is useful as a descriptive comparison and as a demonstration of how a meaningful proportional question changes the equation. Read both the scale and the design before making a policy claim.

```text
. regress lp li, vce(robust)

------------------------------------------------------------------------------
             |               Robust
          lp | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
          li |   .0374749   .0145083     2.58   0.010     .0089527    .0659971
       _cons |  -.3613775   .1559216    -2.32   0.021     -.667908   -.0548471
------------------------------------------------------------------------------
```

### 10. A quadratic lets the slope change with X

Define the squared term before interpreting it.

A straight line has the same slope everywhere. A quadratic adds the square of X, allowing the fitted slope to change with the starting value. In the teaching curve, the fitted score is 500 plus eight times X minus 0.2 times X squared. A derivative is the local slope: the fitted change per unit for a very small movement in X.

For this curve, the local slope is eight minus 0.4 times X. It equals four at X equal to ten and zero at X equal to twenty. The displayed general formula uses b zero for the intercept, b one for the X coefficient and b two for the squared-X coefficient. Although the curve is nonlinear in X, it is linear in those unknown coefficients, so OLS can estimate them. For a substantial change in X, calculate two fitted values rather than treating a local slope as constant.

\(\widehat Y=500+8X-0.2X^2\)

Local slope: \(d\widehat Y/dX=8-0.4X\)

General slope: \(b_1+2b_2X\)

### 11. Use a finite quadratic difference for a finite change

The tangent slope is a local description.

Increase X from ten to fifteen in the teaching curve. The first fitted score is 560 and the second is 575, so the finite fitted difference is fifteen points. At the starting value ten, the local slope was four. Multiplying that slope by five would give twenty and overstate the finite difference because the slope falls along the curve.

Let delta denote a finite change from a starting value X. Expand the square of X plus delta and subtract the original fitted value. The remaining terms are b one times delta plus b two times the quantity twice X times delta plus delta squared. This expression equals direct prediction and subtraction. The derivative becomes a useful approximation when the proposed change is small enough that the slope barely changes.

\(\widehat Y(10)=560,\quad\widehat Y(15)=575,\quad\Delta\widehat Y=15\)

\(\Delta\widehat Y=b_1\Delta+b_2(2X\Delta+\Delta^2)\)

Local approximation: \(4\times5=20\), not the finite difference.

### 12. A turning point must be inside a meaningful range

Do not report an unsupported optimum.

The quadratic slope is zero at minus beta one divided by twice beta two, provided beta two is nonzero. A negative squared coefficient gives a maximum and a positive one a minimum. This is a mathematical feature of the fitted curve.

Before describing an economic optimum, check whether the turning point lies inside the data range and whether the model is credible there. A tiny, imprecise squared coefficient can produce an extreme and unstable turning point. The equation's ability to calculate one does not mean the data identify a useful policy threshold.

\(X^*=-\dfrac{b_1}{2b_2}\) when \(b_2\ne0\)

### 13. Inspect the actual curvature rather than assume it

A flexible model may provide little evidence of bending.

The quadratic price specification estimates the squared-income coefficient at -0.000008, with SE 0.000833. Its magnitude is small relative to its uncertainty. The graph therefore should not be described as revealing a clear income threshold.

This is a useful applied outcome. We learn that allowing curvature and finding convincing curvature are different things. Compare fitted values over observed incomes and consider whether the more complex specification materially changes the substantive comparison. Complexity is justified by the question and evidence, not by the mere availability of another polynomial term.

```text
. regress sprice c.inc10##c.inc10, vce(robust)

---------------------------------------------------------------------------------
                |               Robust
         sprice | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
----------------+----------------------------------------------------------------
          inc10 |   .0091573   .0103187     0.89   0.375    -.0111286    .0294432
                |
c.inc10#c.inc10 |  -7.86e-06   .0008332    -0.01   0.992    -.0016458    .0016301
                |
          _cons |   1.002011   .0304353    32.92   0.000     .9421772    1.061845
---------------------------------------------------------------------------------
```

### 14. Ask Stata for slopes at stated values

margins makes the comparison explicit.

After the quadratic regression, margins with dydx requests a derivative of the fitted outcome. The at option chooses income values where that derivative is evaluated. Here the values two, four and six are in ten-thousand-dollar units, so they correspond to twenty, forty and sixty thousand dollars.

Read each derivative as a local fitted dollar change for one unit of scaled income at that point. Its uncertainty depends on both fitted coefficients and their covariance. Stata uses that covariance information. Computing a slope by hand is a useful check, but adding the two coefficient SEs would not produce the correct derivative SE.

```text
. margins, dydx(inc10) at(inc10=(2 4 6))

Conditional marginal effects                               Number of obs = 401
Model VCE: Robust

Expression: Linear prediction, predict()
dy/dx wrt:  inc10
1._at: inc10 = 2
2._at: inc10 = 4
3._at: inc10 = 6

------------------------------------------------------------------------------
             |            Delta-method
             |      dy/dx   std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
inc10        |
         _at |
          1  |   .0091259   .0071961     1.27   0.205    -.0050213    .0232731
          2  |   .0090945    .004394     2.07   0.039      .000456    .0177329
          3  |    .009063   .0030074     3.01   0.003     .0031507    .0149754
------------------------------------------------------------------------------
```

### 15. Retransforming a log fit needs care

The exponential of an average log is not the average level.

Write a log-outcome model as log Y equals m of X plus u. Here m of X is the fitted or population linear log relationship and u is the remaining log error. Exponentiating both sides gives Y equal to exp of m times exp of u. At a fixed X, taking the average therefore gives exp of m times the conditional average of exp of u.

Even a mean-zero log error does not generally make that last average equal to one. The one-and-nine example showed the reason: exponentiation changes how spread contributes to an average. To estimate an arithmetic mean in levels, we need a suitable estimate of this retransformation factor. To interpret a ratio between groups as a mean ratio, we need the factors to cancel or to be modeled. State the target before selecting a correction.

\(\log Y=m(X)+u\)

\(E(Y\mid X)=\exp\{m(X)\}\,E\{\exp(u)\mid X\}\)

The retransformation factor need not be one or constant across X.

### 16. Zeros and negative values are substantive information

Do not hide them through an automatic log transformation.

The natural log is defined only for positive values. Dropping nonpositive records changes the sample; adding an arbitrary constant changes the interpretation of the fitted relation. Neither step should be treated as a harmless software repair.

In this retail application, the analysis explicitly requires positive observed price and income. In an application with genuine zero spending or zero employment, a different outcome model may be more useful. Explain the economic meaning of the zeros and the target population before selecting a transformation. Always report the sample restriction that the command actually used.

The natural log is defined only for positive values.

In this retail application, the analysis explicitly requires positive observed price and income.

### 17. Transforming the variables does not close a backdoor

A better scale and a credible comparison answer different questions.

Suppose neighbourhood characteristics C influence both local income X and retail prices Y. That common-cause route is present whether we fit prices in dollars or log prices. Logging an observed variable changes its numerical scale; it does not remove the neighbourhood mechanism or turn an observational income comparison into a policy experiment.

The diagram describes the economic variables before transformation. Choose a functional form that gives a useful local or finite contrast, and separately explain what adjustment or design addresses the alternative route. A curved line can fit the observed prices well while still mixing the income relationship with omitted local characteristics.

This also works in the other direction: a defensible causal design still needs a meaningful numerical specification. We need both pieces. State the comparison the graph supports and the quantity the equation reports, rather than asking R-squared or a logarithm to do the work of identification.

Functional form chooses the scale and shape.

Identification addresses the alternative causal explanations.

### 18. Translate retail coefficients into a useful contrast

Reproduce the evidence, then explain its economic meaning.

Run lab_05.do using retail.csv. In the level model, calculate the fitted soda-price contrast for a 20,000-dollar income difference. In the log–log model, calculate the exact contrast for a ten-percent income increase. State the units and the prediction quantity in each answer.

Change the income comparison from 30,000 to 50,000 dollars. Report the level-model dollar contrast and the exact exponentiated-log percentage contrast. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Change the income comparison from 30,000 to 50,000 dollars. Report the level-model dollar contrast and the exact exponentiated-log percentage contrast. Keep your commands, log, output and interpretation.

### 19. Translate retail coefficients into a useful contrast: explanation

A reproducible result needs both a calculation and an interpretation.

Income is rescaled by 10,000 in the level model, so the proposed change is two units. The fitted price contrast is two times 0.009073, or 0.018147 dollars. Treating the coefficient as dollars per one dollar of income would give the wrong magnitude.

The log–log income slope is 0.037475. A ten-percent income rise multiplies the exponentiated fitted log price by 1.1 raised to that slope, giving 0.3578 percent. This is a contrast in exponentiated fitted log values. A claim about arithmetic mean prices also requires the retransformation factor to be handled appropriately. These local-income associations do not identify a causal income effect.

The level contrast is 0.018147 dollars; the log-log contrast is 1.932756 percent because the income ratio is 5/3. These describe different fitted quantities; an arithmetic-mean price claim requires a suitable retransformation treatment.

A 20,000-dollar income difference gives a 0.018147-dollar level-model contrast.

From 30,000 to 50,000: exponentiated-log contrast 1.932756%.

A fitted log-value ratio needs extra assumptions to be an arithmetic-mean ratio.

### 20. Does the staffing association differ across district groups?

An interaction lets slopes differ in a stated way.

A single staffing slope may hide different fitted patterns across districts. We will compare districts with English-learner shares below ten percent with those at or above ten percent. This threshold defines a descriptive grouping for the exercise, not a randomly assigned policy.

An interaction is a product of regressors that allows the relationship of one variable with the outcome to depend on another. We will derive each group's line before reading Stata. This prevents a common mistake: treating the interaction coefficient as the whole effect for the second group rather than the difference between group slopes.

### 21. Define the indicator and reference group

Coding determines which coefficients describe the baseline.

Let D equal one for the higher-English-learner-share group and zero for the lower-share group. An indicator, or dummy variable, is coded this way to represent a condition. The D equals zero group is the reference group: its line is described by the intercept and the main staffing coefficient before interaction additions.

Changing the reference group changes how coefficients are labelled, but not the fitted group predictions when the same model is represented correctly. Always state the coding and threshold in words. Without that information, a group coefficient or interaction cannot be interpreted reliably.

\(D_i=1\{\mathrm{EL}_i\ge10\}\)

### 22. Multiple categories require a base category when there is an intercept

An omitted category supplies the reference comparison.

For a categorical variable with G mutually exclusive and exhaustive groups, define one indicator for each group. Each observation belongs to one group, so its indicators sum to one. Including all G indicators together with an intercept therefore creates an exact linear dependence, called the dummy-variable trap.

Use an intercept and G minus one indicators, or use all G indicators without an intercept if group-specific intercepts are the intended parameterisation. The first form reports differences relative to the omitted base group. These are equivalent ways to span group means, not different empirical evidence. For comparisons with additional controls, state both the base category and which inputs are held fixed.

\(D_1+\cdots+D_G=1\): all \(G\) indicators and an intercept are linearly dependent.

Use an intercept and \(G-1\) indicators; interpret against the omitted group.

Stata factor notation i.group records the category structure.

### 23. Write the interacted equation

Include the main terms as well as their product.

Let X be the staffing ratio, D the zero-or-one higher-language-share group indicator, and W district income. Y remains the test score. Multiplying X by D gives an interaction regressor: it is zero for group zero and equals X for group one. This permits the fitted staffing slope to differ by group.

In the equation, beta zero is the group-zero intercept, beta one its staffing slope, beta two the group-one intercept shift and beta three the group-one slope shift. Gamma is the income slope, assumed common to both groups in this specification, and u is the remaining error. Define these roles before reading coefficients. The next step is simply to substitute D equal to zero and one, so that the two fitted lines can be seen directly.

\(Y_i=\beta_0+\beta_1X_i+\beta_2D_i+\beta_3X_iD_i+\gamma W_i+u_i\)

\(X\): staffing; \(D\): group; \(W\): income; \(XD\): their interaction.

### 24. Substitute zero and one before interpreting

Two group equations reveal the relevant combinations.

For D equal to zero, the D and interaction terms disappear. The X slope is beta one. For D equal to one, the intercept becomes beta zero plus beta two and the X slope becomes beta one plus beta three. The interaction coefficient is therefore the slope difference, not the second group's total slope.

Work through these substitutions before using verbal shortcuts. An intercept difference is the group gap at X equal to zero, which may lie outside the meaningful staffing range. A more useful group comparison can be calculated at a realistic X, as we will do after reading the fitted values.

\(D=0:\quad \partial E(Y\mid X,D,W)/\partial X=\beta_1\)

\(D=1:\quad \partial E(Y\mid X,D,W)/\partial X=\beta_1+\beta_3\)

### 25. Read both fitted lines in the actual school data

The reference slope and slope difference can have different signs.

The lower-share group's staffing slope is 0.680. The interaction is -2.192, so the higher-share group's fitted slope is about -1.512. These are conditional associations with income held fixed. They do not establish that changing a district's group status would cause either pattern.

The graph draws the two fitted lines at a common observed income value. Select the next step to show the difference. Use it to check that the interaction changes a slope, while the group main effect changes the intercept. The two changes enter different policy and group comparisons.

### 26. Factor-variable syntax keeps the model explicit

Use Stata’s interaction notation to include the needed terms.

In Stata, c.str treats staffing as a numerical input whose size matters, rather than as separate categories; i.high marks the group indicator as categorical. The double-hash operator includes both main effects and their interaction. This makes the intended model easier to inspect and supports post-estimation comparisons.

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

### 27. Calculate a policy contrast within a group

A two-student change uses that group’s total slope.

For the higher-share group, a two-student reduction changes the fitted score by minus two times the sum of beta one and beta three. The grouping and income value are held fixed in this calculation. The result differs from simply multiplying the interaction coefficient by minus two.

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

### 28. The SE of a sum needs covariance

Coefficient estimates can move together across samples.

The higher-group slope adds the staffing and interaction coefficients. Across repeated samples the two estimates can move together. Their covariance measures this co-movement as the average product of their deviations from their respective means.

Suppose their variances are 0.04 and 0.09 and their covariance is minus 0.03. The variance of the sum is 0.04 plus 0.09 plus twice minus 0.03, which is 0.07. Its standard error is the square root, about 0.265. The displayed V eleven and V thirty-three are the two variances, and V thirteen is their covariance. Stata's lincom uses all three pieces to report the group slope and its uncertainty.

\(\operatorname{Var}(\widehat\beta_1+\widehat\beta_3)=V_{11}+V_{33}+2V_{13}\)

Example: \(SE=\sqrt{0.04+0.09+2(-0.03)}=\sqrt{0.07}\approx0.265\)

### 29. Read the higher-group slope as one tested quantity

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

### 30. A group gap can depend on X

The group main effect is not the gap at every staffing ratio.

The group indicator shifts the fitted intercept by beta two, and its interaction shifts the staffing slope by beta three. Subtract the fitted value for group zero from that for group one at the same staffing X and income. The gap is beta two plus beta three times X. It is not a single constant when the slopes differ.

The intercept gap refers to X equal to zero, which is not a realistic school-staffing ratio. To make it refer to 20 students per teacher, define a centered regressor as X minus 20 and rewrite the same model using it. Centering means subtracting a chosen reference value. It changes coefficient labels and the meaning of an intercept but leaves the fitted lines unchanged. We verify this algebra below.

\(\mathrm{Gap}(X)=\beta_2+\beta_3X\)

Center at 20: \(X^c=X-20\)

### 31. Separate group heterogeneity from causal identification

A different slope is still a fitted relationship.

The school grouping is based on observed language composition. Its members can differ in many measured and unmeasured ways. An interaction describes how a conditional fitted relationship differs across these groups, but does not make the group comparison experimental.

For a causal heterogeneity claim, explain how staffing variation is identified within each relevant group and whether the assumptions support comparing those effects. Also consider whether the group characteristic is measured before treatment. Interacting an endogenous variable with a group indicator generally does not remove the underlying endogeneity.

Let X indicate programme participation, M post-programme skills, Y earnings and U prior ability. Skills can be a mediator between participation and earnings. If prior ability affects both skills and earnings, skills are also a collider on the programme-to-skills-to-ability-to-earnings alternative route. Conditioning on skills can both remove part of the programme mechanism and open selection through ability. The interaction coefficient describes functional-form heterogeneity; the DAG supplies the separate causal control argument.

### 32. Turn an interaction into two policy contrasts

Reproduce the evidence, then explain its economic meaning.

Run lab_07.do. Compute the staffing slope for each language-share group and the fitted score contrast for a reduction of two students per teacher in each group, holding income fixed. Use the lincom output to assess the higher-share contrast. Explain why the group slope difference and the group intercept difference answer different questions.

Centre staffing at 20 and refit the same interaction model. Interpret the resulting group-indicator coefficient and verify that fitted group slopes have not changed. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Centre staffing at 20 and refit the same interaction model. Interpret the resulting group-indicator coefficient and verify that fitted group slopes have not changed. Keep your commands, log, output and interpretation.

### 33. Turn an interaction into two policy contrasts: explanation

A reproducible result needs both a calculation and an interpretation.

The lower-share staffing slope is 0.680060. Adding the interaction coefficient -2.192258 gives the higher-share slope -1.512198. The fitted two-student contrasts are therefore -1.3601 and 3.0244 score points, respectively.

Use lincom for the second contrast because its uncertainty depends on covariance between the staffing and interaction estimates. The interaction measures a difference in slopes, while the group indicator shifts the intercept. Neither is automatically a causal subgroup treatment effect. The adjusted comparison and the reason for different staffing choices within each group still need to be defended.

The group gap at a staffing ratio of 20, holding income fixed, is -15.429199 score points with robust SE 1.128935. Centring changes the reference point for the intercept comparison; it does not change predictions or the two group slopes.

Original subgroup staffing slopes: \(0.680060\) and \(-1.512198\).

Group gap at ratio 20: \(-15.429199\), robust SE \(1.128935\).

Centring changes the reference point, not the predictions.

### 34. How does payment burden predict mortgage denial?

A zero-or-one outcome is an event indicator.

A lender records whether each mortgage application is denied. Code denial as one and non-denial as zero. In the historical sample, payment-to-income ratio measures the proposed payment burden as a fraction. An applicant at 0.40 would devote forty percent of the measured income to the stated payment measure.

Our first question is predictive: how does denial probability vary across observed applicants with different burdens? A separate causal question would ask what happens under a specified intervention changing burden for the same kind of applicant. Other borrower characteristics and selection into applying can separate those questions. We begin with a straight-line probability approximation, then build bounded probability functions and translate their coefficients into meaningful contrasts.

Outcome: denied = 1, not denied = 0.

Payment-to-income ratio: a fraction, with 0.40 representing 40%.

Define prediction before making an intervention claim.

### 35. The conditional mean of an indicator is a probability

This gives the linear model a useful starting interpretation.

An indicator takes value one when an event occurs and zero otherwise. Here Y equals one for a denied mortgage application. If 20 of 100 comparable applications are denied, their average Y is 0.20, which is the observed denial frequency. In the population, the average zero-or-one outcome at a fixed X equals the event probability at that X.

Call this probability p of X. The linear probability model, or LPM, uses a straight-line conditional-mean approximation a plus b times X. With payment-to-income ratio recorded as a fraction, a change from 0.30 to 0.40 is a 0.10-unit change, or ten percentage points of burden. The corresponding fitted probability change is b times 0.10, measured in probability units rather than relative percent.

\(Y\in\{0,1\}:\quad E(Y\mid X)=\Pr(Y=1\mid X)=p(X)\)

LPM: \(p(X)\approx a+bX\)

### 36. A probability change is not a relative percent change

Keep percentage points and percent distinct.

A probability increase from 0.18 to 0.23 is a rise of 0.05, or five percentage points. Relative to the initial 0.18, it is about a 27.8-percent increase. Both statements describe the same two probabilities on different scales.

For a regression coefficient, first identify the regressor change and calculate the probability difference. Only then express it in percentage points or relative percent if useful. Saying a probability rises by five percent when the intended meaning is five percentage points can materially change a policy interpretation.

\(0.23-0.18=0.05=5\) percentage points

Relative percent: \(100(0.05/0.18)\approx27.8\%\)

### 37. Read the actual LPM coefficient

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

### 38. The LPM error variance is generally unequal

Robust SEs address uncertainty, not invalid fitted probabilities.

For a zero-or-one outcome, squaring Y leaves it unchanged. At a fixed X, its mean and mean square both equal the event probability p. Variance is the mean square minus the squared mean, giving p minus p squared, or p times one minus p.

At p equal to 0.10 the variance is 0.09; at p equal to 0.50 it is 0.25. The outcome's conditional spread therefore changes as the probability changes. If the linear probability mean is correctly specified, its error inherits this unequal conditional variance. Robust standard errors are then appropriate under the relevant sampling and large-sample conditions. They address uncertainty; they do not keep a fitted straight line between zero and one or repair a misspecified mean.

\(Y^2=Y\Rightarrow\operatorname{Var}(Y\mid X)=p(X)-p(X)^2\)

\(p=0.1\Rightarrow\operatorname{Var}=0.09;\quad p=0.5\Rightarrow\operatorname{Var}=0.25\)

### 39. Can we predict a district left out of fitting?

A prediction question has a different target from a staffing intervention.

Suppose a ministry wants a score prediction for another district from the same historical population. A prediction uses available characteristics to forecast an outcome. We reserve 140 of the 420 districts as a test sample and fit using the other 280, the training sample. Test outcomes will be used only to evaluate frozen predictions.

We compare staffing, language share and income with an expanded specification containing their squares and pairwise products. Overfitting means adapting to sample-specific noise rather than a pattern that predicts new observations. Extra columns can improve training fit without improving new predictions. Our target here is an unseen district from this population. Predicting a future year or a new region would require a validation design matching that different task.

Training: 280 districts for fitting and tuning.

Test: 140 districts kept out of fitting and tuning.

Base: three predictors; expanded: nine predictor columns specified before test evaluation.

### 40. Ridge shrinks coefficients with a squared penalty

Accept some bias if it reduces enough estimation variation.

Highly related predictor columns can produce unstable OLS coefficients. Shrinkage pulls fitted coefficients toward zero. A penalty is an extra cost in the fitting objective; lambda is the nonnegative number controlling its strength. Ridge adds a squared-coefficient penalty to the usual prediction loss, trading some coefficient bias against reduced sampling variation.

The formula uses n training observations, k predictor columns, outcome y, intercept a and slopes b. Index i identifies an observation and j a predictor column. The z columns are standardised: subtracting a training mean and dividing by a training standard deviation, so large numerical units alone do not dictate the penalty. The intercept is not penalised. In the single-standardised-predictor illustration, increasing lambda smoothly shrinks the ridge slope. The real nine-column fit need not follow this simple one-column formula.

Loss: \(L(a,b)=\frac{1}{2n}\sum_i[y_i-a-\sum_j b_jz_{ij}]^2\).

Ridge objective: \(L(a,b)+\frac{\lambda}{2}\sum_j b_j^2\).

Standardise predictor columns using training information; leave the intercept unpenalised.

### 41. Lasso can set a predictor coefficient to zero

Absolute and squared penalties behave differently near zero.

Lasso changes the penalty from squared slopes to their absolute values. Absolute value measures magnitude without a sign. The corner of this cost at zero allows an estimated slope to become exactly zero. Thus lasso can select a smaller set of predictor columns, while ridge usually retains all of them with smaller magnitudes.

In our one-standardised-predictor illustration, the OLS slope is 0.8. At lambda 0.3 the ridge slope is about 0.615 and the lasso slope is 0.5. At lambda 0.8 the lasso slope reaches zero. These are transparent teaching calculations, not the district estimates. The same numerical lambda does not imply equal complexity across the two penalties. With correlated columns, dropping one column does not establish that its underlying economic variable is irrelevant or has zero causal effect.

Lasso objective: \(L(a,b)+\lambda\sum_j|b_j|\).

One standardised predictor: \(\widehat b_R=0.8/(1+\lambda)\), \(\widehat b_L=\max(0.8-\lambda,0)\).

These simple paths illustrate the penalties; the actual model has nine correlated columns.

### 42. Choose the penalty inside the training sample

Cross-validation reserves the test answers for a later check.

Cross-validation splits the training sample into folds, or partitions. With five folds, fit on four and predict the fifth. Rotate the held-out fold and average prediction errors for each candidate penalty. All these observations belong to the training sample; the separate test sample stays untouched.

Choose a penalty from those validation errors, then refit on all 280 training districts. Learned preprocessing belongs within training, including within validation folds when fitted there. The software handles its penalised fitting; do not standardise using the separate test outcomes or tune against their errors.

Only after the models are frozen do we reveal the test outcomes. Root mean squared error, abbreviated RMSE, is the square root of the average squared prediction error. It is measured in score points. For a dated forecasting task, use chronological validation so later information cannot leak into an earlier prediction.

Five training folds: fit on four, validate on one, then rotate.

Choose the penalty and refit using training observations.

Score frozen predictions on the separate 140-district test sample.

### 43. Compare actual predictions on the same held-out districts

A small error difference is evidence for this run, not a universal ranking.

The prediction do-file fits all four models before calculating test errors. Stata's elasticnet command can mix squared and absolute-value penalties. Alpha zero selects the squared ridge penalty; lasso linear fits the absolute-value lasso penalty. Here alpha is the software's penalty-mixing setting, not the intercept a in our equation. Five-fold training cross-validation chooses each penalty.

On the same 140 held-out districts, the RMSEs are 9.992 for three-column OLS, 9.906 for expanded OLS, 9.886 for ridge and 9.991 for lasso. Lower is better under this loss. Ridge is slightly lower in this split; the small differences do not establish universal superiority. Do not keep changing the split or penalty grid until the test ranking looks attractive. Explain the intended prediction population and preserve the reported result even when a preferred method does not win.

Same training/test split and the same outcome scale for every model.

Penalties are selected inside training; the test set is evaluated afterwards.

No test-error ranking identifies a causal staffing effect.

**Practice:** Does this one test split establish a universally best estimator?

**Explanation:** No. These small RMSE differences describe this particular evaluation.

### 44. Predictive selection does not choose a causal adjustment set

Return to the DAG when the question changes from prediction to intervention.

The selected lasso retains some income and language columns and drops others. It may retain an interaction while dropping its main column. This reports a penalised prediction choice conditional on the other candidate columns, not a test that a structural staffing effect is zero.

If our question is a staffing intervention, begin again with its causal target and the DAG. A required pre-treatment confounder cannot be removed solely because prediction lasso gives it zero weight. A mediator or collider does not become a suitable causal control because it improves prediction. Ordinary p-values computed after using the same data to select predictors also need separate justification; specialised inferential lasso methods use additional procedures and assumptions. Our short component concerns prediction and the disciplined evaluation of new observations.

Prediction selection depends on the candidate columns, penalty and sample.

Causal controls follow the target and a defensible identification argument.

Keep prediction accuracy separate from evidence about an intervention.

**Practice:** Can prediction lasso justify removing a necessary confounder?

**Explanation:** No. Causal controls follow the intervention target and identification assumptions.

### 45. From flexible models to variance and data problems

We have extended linear regression with logs, curvature, group indicators and interactions. The short prediction extension separated fitting data from evaluating predictions on held-out districts. These tools answer different tasks and do not choose the causal control set for us.

Next we examine unequal error variance, weighting, measurement error and sample selection. Those problems affect different parts of the empirical argument, so each needs a response that matches its cause.

From flexible models to variance and data problems

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 46. Exact log change

Try the comparison before opening the explanation.

In a log-outcome model, a policy dummy has coefficient 0.08. Give the usual approximate percentage contrast and the exact multiplicative contrast in the fitted exp(linear predictor).

Convert the fitted log difference to a ratio with the exponential, then subtract one and multiply by 100. Name the prediction quantity.

**Practice:** In a log-outcome model, a policy dummy has coefficient 0.08. Give the usual approximate percentage contrast and the exact multiplicative contrast in the fitted exp(linear predictor).

### 47. Exact log change: explanation

Follow the calculation and interpret its units.

Approximate: +8%. Exact: \(100[\exp(0.08)-1]=8.3287\%\). This is a contrast in the exponentiated fitted log outcome. A conditional-mean claim in outcome levels additionally needs a justified retransformation treatment of the error distribution.

Approximate: +8%. Exact: \(100[\exp(0.08)-1]=8.3287\%\). This is a contrast in the exponentiated fitted log outcome. A conditional-mean claim in outcome levels additionally needs a justified retransformation treatment of the error distribution.

### 48. Elasticity

Try the comparison before opening the explanation.

In \(\log(quantity)=a-0.7\log(price)+u\), what is the local elasticity? What is the exact fitted quantity change for a 10% price rise?

An elasticity uses percentage changes on both sides. For the finite price increase asked here, use the new-to-old price ratio rather than treating a local approximation as exact.

**Practice:** In \(\log(quantity)=a-0.7\log(price)+u\), what is the local elasticity? What is the exact fitted quantity change for a 10% price rise?

### 49. Elasticity: explanation

Follow the calculation and interpret its units.

The elasticity is −0.7. A 10% price rise multiplies fitted exponentiated log quantity by \(1.1^{-0.7}\); the percentage contrast is \(100[1.1^{-0.7}-1]\), about −6.45%, not exactly −7%. Causal interpretation requires price exogeneity or a valid identification strategy.

The elasticity is −0.7. A 10% price rise multiplies fitted exponentiated log quantity by \(1.1^{-0.7}\); the percentage contrast is \(100[1.1^{-0.7}-1]\), about −6.45%, not exactly −7%. Causal interpretation requires price exogeneity or a valid identification strategy.

### 50. Compare predictions for the same realistic change

Use the equation, not just the coefficient label.

Choose two income values within the observed range and calculate the fitted price at each under the level and log specifications. Then subtract or divide according to the question. The same numerical coefficient can imply very different changes when units and transformations differ.

Comparing predictions also makes model differences understandable to a nontechnical reader. Show the income range supported by the records, the fitted curves and the proposed contrast. Avoid evaluating one model at an observed income and another at an unsupported extrapolation. A fair comparison keeps both the sample and the economic scenario clear.

### 51. Predicting a mean and predicting a new outcome have different uncertainty

A new observation brings its own error as well as coefficient uncertainty.

Let x zero be a stated input vector including the intercept. Its fitted conditional mean is x zero prime b. If V hat is the estimated coefficient covariance, the variance of that mean prediction is x zero prime V hat x zero. This measures uncertainty in estimating the regression mean at those inputs.

A new individual outcome also contains a new error. Under a correctly specified homoskedastic independent-observation model with the new error independent of the fitted sample, its prediction-error variance adds sigma squared. An individual prediction interval is therefore wider than a confidence interval for the mean at the same inputs. With unequal variance, dependence or a different prediction population, the extra error term and the approximation need a model appropriate to that task.

Mean prediction: \(\widehat m_0=x_0\prime b\); estimated variance \(x_0\prime\widehat Vx_0\).

Under the stated independent homoskedastic model, prediction-error variance \(\approx x_0\prime\widehat Vx_0+s^2\).

State whether the target is an average response or a new individual outcome.

### 52. Quadratic slope

Try the comparison before opening the explanation.

For \(\widehat{score}=500+8X-0.2X^2\), give the slope at \(X=10\) and the turning point. What must be checked before using the turning point?

Differentiate the fitted curve, substitute the requested starting X, and distinguish a local slope from a finite change.

**Practice:** For \(\widehat{score}=500+8X-0.2X^2\), give the slope at \(X=10\) and the turning point. What must be checked before using the turning point?

### 53. Quadratic slope: explanation

Follow the calculation and interpret its units.

The slope is \(8-0.4X\), which equals 4 at \(X=10\). The turning point is \(X=20\), a maximum because the squared coefficient is negative. Check that \(X=20\) lies within the observed and substantively meaningful range; extrapolated turning points are unreliable.

The slope is \(8-0.4X\), which equals 4 at \(X=10\). The turning point is \(X=20\), a maximum because the squared coefficient is negative. Check that \(X=20\) lies within the observed and substantively meaningful range; extrapolated turning points are unreliable.

### 54. Choose a form for a decision-sized comparison

Keep fit, interpretation and design connected.

An analyst studying affordability may want dollar price differences. A demand study may naturally focus on elasticities. A study of diminishing gains may need a changing slope. These choices follow the economic question rather than a competition to maximise R-squared across incompatible outcome scales.

Use graphs and stated prediction contrasts to communicate the model. Identify which comparisons are within the observed data and which rely on extrapolation. Then carry forward the same identification and uncertainty questions used in the linear model. Transforming variables can improve the representation of a relationship, but it does not itself make the regressor exogenous.

An analyst studying affordability may want dollar price differences.

Use graphs and stated prediction contrasts to communicate the model.

### 55. Adjusted R squared changes the fit penalty, not the identification argument

Compare the same outcome and observations before using a fit criterion.

Ordinary R squared cannot decrease when extra columns are added to a least-squares regression on the same sample. Adjusted R squared compares residual variation per residual degree of freedom with total variation per total degree of freedom. It can fall when an extra regressor improves fit too little relative to the lost degree of freedom.

Here p counts all coefficients including the intercept, and n is the common sample size. Neither fit statistic chooses a causal adjustment set, and values from different outcomes or samples need not be comparable. The confounder, mediator and collider distinctions still determine the causal comparison. Held-out prediction is another criterion again: it evaluates predictions on observations excluded from fitting.

\(\overline R^2=1-\dfrac{SSR/(n-p)}{SST/(n-1)}\).

An added regressor can raise \(R^2\) and lower adjusted \(R^2\).

Use the same outcome and sample; defend the control set separately.

### 56. DAG practice: logs and a common cause

Trace the routes before choosing a control.

Neighbourhood characteristics influence local income and retail prices. Would replacing prices and income by their logarithms close the common-cause route? Explain the distinct roles of the graph and the functional form.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Neighbourhood characteristics influence local income and retail prices. Would replacing prices and income by their logarithms close the common-cause route? Explain the distinct roles of the graph and the functional form.

### 57. DAG practice: logs and a common cause: explanation

Explain what conditioning changes in this stated graph.

The route \(X\leftarrow C\rightarrow Y\) remains. A numerical transformation does not remove the economic mechanism represented by C. A better fit or a convenient elasticity therefore does not establish causal income variation.

The graph states the proposed causal relationships and helps assess controls or alternative designs. The equation chooses how a given comparison is represented numerically and which finite or local contrast is reported. An applied analysis needs both a defensible comparison and a useful specification.

The route \(X\leftarrow C\rightarrow Y\) remains. A numerical transformation does not remove the economic mechanism represented by C. A better fit or a convenient elasticity therefore does not establish causal income variation. The graph states the proposed causal relationships and helps assess controls or alternative designs. The equation chooses how a given comparison is represented numerically and which finite or local contrast is reported. An applied analysis needs both a defensible comparison and a useful specification.

### 58. From curvature to indicators and interactions

The retail example showed why a level difference, a log difference and a local slope answer different questions. A functional form should express a useful comparison over the observed range, with its units stated.

We now let the relationship differ across groups. Indicators encode categories, and interactions allow selected slopes to vary. The same discipline applies: define the comparison first, then calculate fitted values or effects at meaningful inputs.

From curvature to indicators and interactions

### 59. Interaction contrast

Try the comparison before opening the explanation.

In \(Y=a+0.4X-0.9(X\times near)+c\,near+u\), near is 0 or 1. What are the x slopes far from and near the border?

This constructed border example uses the same zero-or-one substitution as the school-group model. Set near to zero and then one; keep the intercept shift separate from the slope change.

**Practice:** In \(Y=a+0.4X-0.9(X\times near)+c\,near+u\), near is 0 or 1. What are the x slopes far from and near the border?

### 60. Interaction contrast: explanation

Follow the calculation and interpret its units.

Far: 0.4. Near: \(0.4-0.9=-0.5\). The interaction is the difference in slopes, −0.9. The near-group intercept shift c is a different quantity.

Far: 0.4. Near: \(0.4-0.9=-0.5\). The interaction is the difference in slopes, −0.9. The near-group intercept shift c is a different quantity.

### 61. Uncertainty of a sum

Try the comparison before opening the explanation.

In the lesson’s interaction model, the higher-group staffing slope is beta one plus beta three. Can its standard error be obtained by adding the two coefficient standard errors?

Use the variance of a sum. A negative covariance can make the sum more precise than a calculation that ignores co-movement.

**Practice:** In the lesson’s interaction model, the higher-group staffing slope is beta one plus beta three. Can its standard error be obtained by adding the two coefficient standard errors?

### 62. Uncertainty of a sum: explanation

Follow the calculation and interpret its units.

No. Add their variances and twice their covariance, then take the square root. With variances 0.04 and 0.09 and covariance −0.03, the result is the square root of 0.07, about 0.265. Stata’s lincom uses the fitted covariance matrix for the actual model.

No. Add their variances and twice their covariance, then take the square root. With variances 0.04 and 0.09 and covariance −0.03, the result is the square root of 0.07, about 0.265. Stata’s lincom uses the fitted covariance matrix for the actual model.

### 63. An interaction between two continuous inputs changes both partial slopes

The main coefficient is the slope at a specified value of the other input.

The same interaction logic applies when both inputs are continuous. Let X and W be two measured predictors, and include their product with both main terms. The fitted local slope on X is b one plus b three times W. The fitted local slope on W is b two plus b three times X. Thus the interaction coefficient describes how one local slope changes when the other input rises by one unit.

Its units combine the units of both inputs. In the school application, this logic could describe a staffing slope that varies with language share. Evaluate a meaningful pair of inputs rather than interpreting a main coefficient only at an unrealistic zero. For a finite change, compare fitted values at the proposed inputs; a local derivative alone need not describe the full contrast.

\(\widehat Y=b_0+b_1X+b_2W+b_3XW\).

\(\partial\widehat Y/\partial X=b_1+b_3W\), \(\partial\widehat Y/\partial W=b_2+b_3X\).

Evaluate slopes or finite contrasts at explicitly stated input values.

### 64. Centering changes coefficient labels, not fitted values

Choose a reference value that helps interpretation.

Define a centered ratio as X minus twenty. In the interacted equation, the group main effect now describes the fitted group gap at a ratio of twenty rather than zero. The interaction still describes the slope difference. Predictions at any actual staffing ratio remain unchanged when the model is re-expressed consistently.

This is a useful presentation choice, especially when an uncentered intercept lies far outside the data. It does not remove confounding or create new information. Its benefit is that a coefficient now answers a more meaningful reference comparison, which should be stated in the report.

\(X_i^c=X_i-20\)

### 65. Build an empirical comparison before reading stars

List the coefficient combination and its units.

For each question, write the required expression: a reference slope, a second-group slope, a slope difference or a group gap at a stated X. Then use the fitted covariance to test or interval that quantity. This keeps the analysis tied to the question rather than the arrangement of rows in the output.

In a policy memo, report a feasible change within each group and the evidence for any difference between them. Explain the adjustment and identifying assumptions. A clear comparison can remain useful even if uncertainty is too large to conclude that the group effects differ.

For each question, write the required expression: a reference slope, a second-group slope, a slope difference or a group gap at a stated X.

In a policy memo, report a feasible change within each group and the evidence for any difference between them.

### 66. DAG practice: a binary treatment still needs a control argument

Trace the routes before choosing a control.

Programme participation affects post-programme skills and earnings. Prior ability affects skills and earnings. If the programme is initially independent of ability, what two changes can occur when skills are held fixed? Would adding a group interaction automatically resolve them?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Programme participation affects post-programme skills and earnings. Prior ability affects skills and earnings. If the programme is initially independent of ability, what two changes can occur when skills are held fixed? Would adding a group interaction automatically resolve them?

### 67. DAG practice: a binary treatment still needs a control argument: explanation

Explain what conditioning changes in this stated graph.

Conditioning on skills blocks the mediated programme route \(X\rightarrow M\rightarrow Y\). It can also open \(X\rightarrow M\leftarrow U\rightarrow Y\), where skills are a collider and ability influences earnings. A regression can consequently mix a changed target with new selection.

A group interaction changes the specified shape or subgroup slope. It does not automatically supply the missing causal control argument. Define the intervention and whether its total or a suitable direct effect is wanted, then assess assignment and mediator–outcome assumptions before interpreting the interaction causally.

Conditioning on skills blocks the mediated programme route \(X\rightarrow M\rightarrow Y\). It can also open \(X\rightarrow M\leftarrow U\rightarrow Y\), where skills are a collider and ability influences earnings. A regression can consequently mix a changed target with new selection. A group interaction changes the specified shape or subgroup slope. It does not automatically supply the missing causal control argument. Define the intervention and whether its total or a suitable direct effect is wanted, then assess assignment and mediator–outcome assumptions before interpreting the interaction causally.

### 68. Probability scale

Try the comparison before opening the explanation.

An LPM predicts 0.18 at one covariate vector and 0.23 at another. State the change in percentage points and relative percent.

Subtract the two probabilities, then multiply by 100 for percentage points. For a relative percent, divide by the starting probability as well.

**Practice:** An LPM predicts 0.18 at one covariate vector and 0.23 at another. State the change in percentage points and relative percent.

### 69. Probability scale: explanation

Follow the calculation and interpret its units.

The change is 0.05, or 5 percentage points. Relative to 0.18 it is \(100\times0.05/0.18=27.78\%\). These are different scales. The contrast is predictive unless identification assumptions support a causal claim.

The change is 0.05, or 5 percentage points. Relative to 0.18 it is \(100\times0.05/0.18=27.78\%\). These are different scales. The contrast is predictive unless identification assumptions support a causal claim.

