# 05. Functional form: levels, logs and curvature

## 01. Do prices differ by the same amount or the same percent?

Choose a scale that answers the economic question.

Consider retail soda prices linked to local family income in New Jersey and Pennsylvania. A higher-income area might have a higher price in dollars, a higher price in percentage terms, or a relationship whose slope changes with income. These are different questions, so they need not use the same equation.

Functional form means the way variables enter a model, such as levels, logarithms or squared terms. It determines what a coefficient describes. Today we will connect each form to a meaningful comparison, use actual pricing records and check exact changes rather than rely on a memorised percentage rule.

## 02. Define the observation and the usable sample

Inspect the data before interpreting a transformed variable.

The file contains retail-price records linked to local median family income. Its five variables do not establish that each row is a unique geographic area, so we describe the observed records rather than claim one independent observation per postcode. The working sample contains 401 records with positive, observed price and income values.

Price is measured in dollars. Income is measured in dollars and is also scaled into units of ten thousand dollars for a readable level coefficient. This rescaling changes a coefficient's numerical units without changing fitted prices. Taking logs instead changes the shape and interpretation of the fitted relationship.

\(X=\text{income}/10{,}000\)

Outcome: medium soda price, in dollars

## 03. A level–level model has a constant unit slope

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

## 04. A logarithm expresses a proportional scale

Small log differences approximate percentage differences.

The natural logarithm, written log or ln here, turns multiplication into addition. For positive values, the log difference between a new and old value equals the log of their ratio. This is why a change of about 0.01 in a log outcome corresponds to about one percent.

The approximation is useful for small changes. For an exact percentage difference, undo the log using the exponential function, exp. A log change of 0.08 gives 100 times exp(0.08) minus one, about 8.33 percent, rather than exactly eight percent. Define the proposed comparison before choosing between a local approximation and an exact finite change.

We use the natural logarithm throughout. The exponential function, written exp, is its inverse: exp(log P) returns the positive price P. Thus the exponential converts a log difference into a ratio before we subtract one to obtain a proportional change.

\(\log P_1-\log P_0=\log(P_1/P_0)\)

\(\%\Delta P=100\{\exp(\Delta\log P)-1\}\)

\(\exp(\log P)=P\) for \(P>0\)

## 05. A log–level model gives a proportional outcome contrast

Keep the regressor units visible.

In a log–level model the outcome is logged and the regressor stays in levels. A change of delta X produces a fitted log difference of b times delta X. The approximate percent contrast is 100b times delta X; the exact contrast between exponentiated fitted values is 100 times exp(b delta X) minus one.

If income is measured in ten-thousand-dollar units, a coefficient applies to that unit, not one dollar. A dummy-variable coefficient compares its zero and one states. These interpretations all follow from the same equation. The apparent variety of percentage rules becomes manageable when we first write the change in the fitted log outcome.

\(\widehat{\log P}=a+bX\)

\(100\{\exp(b\Delta X)-1\}\)

## 06. Exact log change

Apply the idea before reading the solution.

In a log-outcome model, a policy dummy has coefficient 0.08. Give the usual approximate percentage contrast and the exact multiplicative contrast in the fitted exp(linear predictor).

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** In a log-outcome model, a policy dummy has coefficient 0.08. Give the usual approximate percentage contrast and the exact multiplicative contrast in the fitted exp(linear predictor).

## 07. Exact log change: explanation

Connect the calculation to the empirical claim.

Approximate: +8%. Exact: \(100[\exp(0.08)-1]=8.3287\%\). This is a contrast in the exponentiated fitted log outcome. A conditional-mean claim in outcome levels additionally needs a justified retransformation treatment of the error distribution.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Approximate: +8%. Exact: \(100[\exp(0.08)-1]=8.3287\%\). This is a contrast in the exponentiated fitted log outcome. A conditional-mean claim in outcome levels additionally needs a justified retransformation treatment of the error distribution.

## 08. A level–log model gives a level outcome contrast

A percent change in X becomes a small change in log X.

Now keep the outcome in levels and log the regressor. A proportional increase from X to 1.1X changes the fitted outcome by b log(1.1). For a small one-percent increase in X, the fitted level change is approximately b divided by one hundred.

The outcome units remain dollars, points or whatever its original definition specifies. They do not become percent merely because one regressor is logged. For a substantial proposed income change, use the exact log ratio of new to old income. This avoids an interpretation that quietly treats a large change as a tiny local movement.

\(\widehat Y=a+b\log X\)

\(\Delta\widehat Y=b\log(X_1/X_0)\)

## 09. A log–log slope is an elasticity

It relates proportional changes in both variables.

An elasticity is the proportional change in an outcome for a small proportional change in a regressor. In a log–log model, the slope is a constant fitted elasticity. A slope of minus 0.7 means a one-percent price rise corresponds locally to about a 0.7-percent quantity decline.

For a finite ten-percent price rise, the exact fitted quantity ratio is 1.1 raised to the power minus 0.7. Its percentage change is about minus 6.45 percent. It is not exactly minus seven percent. The distinction between a local slope and a finite contrast is especially useful when policy changes are large.

\(\widehat{\log Y}=a+b\log X\)

\(\%\Delta\widehat Y=100\{(X_1/X_0)^b-1\}\)

## 10. Read the actual price–income elasticity

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

## 11. Compare predictions for the same realistic change

Use the equation, not just the coefficient label.

Choose two income values within the observed range and calculate the fitted price at each under the level and log specifications. Then subtract or divide according to the question. The same numerical coefficient can imply very different changes when units and transformations differ.

Comparing predictions also makes model differences understandable to a nontechnical reader. Show the income range supported by the records, the fitted curves and the proposed contrast. Avoid evaluating one model at an observed income and another at an unsupported extrapolation. A fair comparison keeps both the sample and the economic scenario clear.

## 12. A quadratic lets the slope change with X

Define the squared term before interpreting it.

A quadratic model includes X and its square. The coefficient on the squared term does not by itself give the effect of a one-unit increase in X, because that increase changes both X and X squared. The local slope is beta one plus twice beta two times X.

In a price–income model, this allows the fitted dollar association to become steeper or flatter with income. The model remains linear in its coefficients even though it curves in X. This is the meaning of linear regression used by OLS: linear in the unknown coefficients, not necessarily a straight line in the original regressor.

The derivative, written d fitted Y over d X, is the local slope: the fitted outcome change per very small change in X. It can vary with the starting value of X even though the regression is linear in its coefficients.

\(\widehat Y=b_0+b_1X+b_2X^2\)

\(\dfrac{d\widehat Y}{dX}=b_1+2b_2X\)

\(d\widehat Y/dX\): local fitted slope at the stated \(X\)

## 13. Use a finite quadratic difference for a finite change

The tangent slope is a local description.

For a change from X to X plus delta, substitute both values into the fitted equation and subtract. The resulting difference is beta one times delta plus beta two times twice X delta plus delta squared. The last term is why multiplying the starting slope by a large change is only an approximation.

Work through the illustrative score equation with slope 8 minus 0.4X. At X equal to ten, its local slope is four points per unit. A five-unit change does not keep that slope fixed. Showing the two fitted endpoints on a curve makes this distinction easier to see than treating a derivative as a universal finite effect.

\(\Delta\widehat Y=b_1\Delta+b_2(2X\Delta+\Delta^2)\)

## 14. Elasticity

Apply the idea before reading the solution.

In \(\log(quantity)=a-0.7\log(price)+u\), what is the local elasticity? What is the exact fitted quantity change for a 10% price rise?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** In \(\log(quantity)=a-0.7\log(price)+u\), what is the local elasticity? What is the exact fitted quantity change for a 10% price rise?

## 15. Elasticity: explanation

Connect the calculation to the empirical claim.

The elasticity is −0.7. A 10% price rise multiplies fitted exponentiated log quantity by \(1.1^{-0.7}\); the percentage contrast is \(100[1.1^{-0.7}-1]\), about −6.45%, not exactly −7%. Causal interpretation requires price exogeneity or a valid identification strategy.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

The elasticity is −0.7. A 10% price rise multiplies fitted exponentiated log quantity by \(1.1^{-0.7}\); the percentage contrast is \(100[1.1^{-0.7}-1]\), about −6.45%, not exactly −7%. Causal interpretation requires price exogeneity or a valid identification strategy.

## 16. A turning point must be inside a meaningful range

Do not report an unsupported optimum.

The quadratic slope is zero at minus beta one divided by twice beta two, provided beta two is nonzero. A negative squared coefficient gives a maximum and a positive one a minimum. This is a mathematical feature of the fitted curve.

Before describing an economic optimum, check whether the turning point lies inside the data range and whether the model is credible there. A tiny, imprecise squared coefficient can produce an extreme and unstable turning point. The equation's ability to calculate one does not mean the data identify a useful policy threshold.

\(X^*=-\dfrac{b_1}{2b_2}\) when \(b_2\ne0\)

## 17. Inspect the actual curvature rather than assume it

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

## 18. Ask Stata for slopes at stated values

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

## 19. Retransforming a log fit needs care

The exponential of an average log is not the average level.

Retransformation means returning a transformed prediction to the original outcome scale. In a log model, simply exponentiating the fitted log outcome does not generally give the conditional arithmetic mean in levels. The additional factor is the conditional average of exp(error).

If that factor is the same across the compared regressor values, a ratio of exponentiated fits can also describe the ratio of conditional arithmetic means. Otherwise the mean-level contrast needs more work. State what quantity the reported prediction represents. A clean percentage formula does not remove the statistical issue introduced by a nonlinear transformation.

Here X beta is a compact way to write the intercept plus all coefficient-weighted regressors. E of exp u given X is the conditional mean of the exponentiated error; it need not equal one even when the conditional mean of u is zero.

\(E(Y\mid X)=\exp(X\beta)E\{\exp(u)\mid X\}\)

\(X\beta\): intercept plus coefficient-weighted regressors

## 20. Zeros and negative values are substantive information

Do not hide them through an automatic log transformation.

The natural log is defined only for positive values. Dropping nonpositive records changes the sample; adding an arbitrary constant changes the interpretation of the fitted relation. Neither step should be treated as a harmless software repair.

In this retail application, the analysis explicitly requires positive observed price and income. In an application with genuine zero spending or zero employment, a different outcome model may be more useful. Explain the economic meaning of the zeros and the target population before selecting a transformation. Always report the sample restriction that the command actually used.

The natural log is defined only for positive values.

In this retail application, the analysis explicitly requires positive observed price and income.

## 21. Choose a form for a decision-sized comparison

Keep fit, interpretation and design connected.

An analyst studying affordability may want dollar price differences. A demand study may naturally focus on elasticities. A study of diminishing gains may need a changing slope. These choices follow the economic question rather than a competition to maximise R-squared across incompatible outcome scales.

Use graphs and stated prediction contrasts to communicate the model. Identify which comparisons are within the observed data and which rely on extrapolation. Then carry forward the same identification and uncertainty questions used in the linear model. Transforming variables can improve the representation of a relationship, but it does not itself make the regressor exogenous.

An analyst studying affordability may want dollar price differences.

Use graphs and stated prediction contrasts to communicate the model.

## 22. Transforming the variables does not close a backdoor

A better scale and a credible comparison answer different questions.

Suppose neighbourhood characteristics C influence both local income X and retail prices Y. That common-cause route is present whether we fit prices in dollars or log prices. Logging an observed variable changes its numerical scale; it does not remove the neighbourhood mechanism or turn an observational income comparison into a policy experiment.

The diagram describes the economic variables before transformation. Choose a functional form that gives a useful local or finite contrast, and separately explain what adjustment or design addresses the alternative route. A curved line can fit the observed prices well while still mixing the income relationship with omitted local characteristics.

This also works in the other direction: a defensible causal design still needs a meaningful numerical specification. We need both pieces. State the comparison the graph supports and the quantity the equation reports, rather than asking R-squared or a logarithm to do the work of identification.

Functional form chooses the scale and shape.

Identification addresses the alternative causal explanations.

## 23. Quadratic slope

Apply the idea before reading the solution.

For \(\widehat{score}=500+8X-0.2X^2\), give the slope at \(X=10\) and the turning point. What must be checked before using the turning point?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** For \(\widehat{score}=500+8X-0.2X^2\), give the slope at \(X=10\) and the turning point. What must be checked before using the turning point?

## 24. Quadratic slope: explanation

Connect the calculation to the empirical claim.

The slope is \(8-0.4X\), which equals 4 at \(X=10\). The turning point is \(X=20\), a maximum because the squared coefficient is negative. Check that \(X=20\) lies within the observed and substantively meaningful range; extrapolated turning points are unreliable.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

The slope is \(8-0.4X\), which equals 4 at \(X=10\). The turning point is \(X=20\), a maximum because the squared coefficient is negative. Check that \(X=20\) lies within the observed and substantively meaningful range; extrapolated turning points are unreliable.

## 25. DAG practice: logs and a common cause

Trace the routes before choosing a control.

Neighbourhood characteristics influence local income and retail prices. Would replacing prices and income by their logarithms close the common-cause route? Explain the distinct roles of the graph and the functional form.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Neighbourhood characteristics influence local income and retail prices. Would replacing prices and income by their logarithms close the common-cause route? Explain the distinct roles of the graph and the functional form.

## 26. DAG practice: logs and a common cause: explanation

Explain what conditioning changes in this stated graph.

The route \(X\leftarrow C\rightarrow Y\) remains. A numerical transformation does not remove the economic mechanism represented by C. A better fit or a convenient elasticity therefore does not establish causal income variation.

The graph states the proposed causal relationships and helps assess controls or alternative designs. The equation chooses how a given comparison is represented numerically and which finite or local contrast is reported. An applied analysis needs both a defensible comparison and a useful specification.

The route \(X\leftarrow C\rightarrow Y\) remains. A numerical transformation does not remove the economic mechanism represented by C. A better fit or a convenient elasticity therefore does not establish causal income variation. The graph states the proposed causal relationships and helps assess controls or alternative designs. The equation chooses how a given comparison is represented numerically and which finite or local contrast is reported. An applied analysis needs both a defensible comparison and a useful specification.

## 27. Translate retail coefficients into a useful contrast

Reproduce the evidence, then explain its economic meaning.

Run meeting_05.do using retail.csv. In the level model, calculate the fitted soda-price contrast for a 20,000-dollar income difference. In the log–log model, calculate the exact contrast for a ten-percent income increase. State the units and the prediction quantity in each answer.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_05.do using retail.csv. In the level model, calculate the fitted soda-price contrast for a 20,000-dollar income difference. In the log–log model, calculate the exact contrast for a ten-percent income increase. State the units and the prediction quantity in each answer.

## 28. Translate retail coefficients into a useful contrast: explanation

A reproducible result needs both a calculation and an interpretation.

Income is rescaled by 10,000 in the level model, so the proposed change is two units. The fitted price contrast is two times 0.009073, or 0.018147 dollars. Treating the coefficient as dollars per one dollar of income would give the wrong magnitude.

The log–log income slope is 0.037475. A ten-percent income rise multiplies the exponentiated fitted log price by 1.1 raised to that slope, giving 0.3578 percent. This is a contrast in exponentiated fitted log values. A claim about arithmetic mean prices also requires the retransformation factor to be handled appropriately. These local-income associations do not identify a causal income effect.

Income is rescaled by 10,000 in the level model, so the proposed change is two units. The fitted price contrast is two times 0.009073, or 0.018147 dollars. Treating the coefficient as dollars per one dollar of income would give the wrong magnitude. The log–log income slope is 0.037475. A ten-percent income rise multiplies the exponentiated fitted log price by 1.1 raised to that slope, giving 0.3578 percent. This is a contrast in exponentiated fitted log values. A claim about arithmetic mean prices also requires the retransformation factor to be handled appropriately. These local-income associations do not identify a causal income effect.

## 29. Connect functional form with the next data-quality question

A better curve cannot repair every data problem.

We can now translate coefficients in levels, logs and quadratic models into meaningful changes. The key habit is to define the scale, write the requested comparison and evaluate the fitted equation at the stated values. Small-change rules and exact finite contrasts then have clear roles.

The next lesson asks what happens when we collect more observations while the design or measurements remain imperfect. We will use simulations with known population values to distinguish less sampling noise from less bias. This will clarify why a precise fitted curve can still answer the wrong empirical question.

We can now translate coefficients in levels, logs and quadratic models into meaningful changes.

The next lesson asks what happens when we collect more observations while the design or measurements remain imperfect.

