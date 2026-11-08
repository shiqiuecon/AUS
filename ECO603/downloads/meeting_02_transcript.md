# 02. Simple regression: estimation, units and fit

## 01. Make the first regression model explicit

Define the regression equation, its coefficients and the error term.

We now turn from a causal model to a statistical description of district scores. A regressor is a variable used to explain or predict an outcome. Our first regressor is the student–teacher ratio X; the outcome Y is the district score. In the population equation, beta zero is an intercept, the height of the line at X equal to zero, and beta one is a slope. These unknown numbers are the model coefficients. The error u collects the outcome variation outside that specified line.

If the mean error is zero at every X, the line describes the conditional mean: the average score among districts at that ratio. This is an assumption about the population, not a consequence of fitting a line. A causal interpretation needs the additional intervention and assignment argument developed above. Estimation means choosing coefficient values using the sample data. An estimator is the calculation rule; an estimate is the numerical result from one sample. The sample fit uses these estimated coefficients, written with hats, and gives a fitted score for each district. A residual is its observed score minus that fitted score; unlike the population error, we can calculate it after estimation.

Population: \(Y_i=\beta_0+\beta_1X_i+u_i\)

Conditional-mean assumption: \(E(u_i\mid X_i)=0\)

Fit: \(\widehat Y_i=\widehat\beta_0+\widehat\beta_1X_i\); residual: \(e_i=Y_i-\widehat Y_i\)

## 02. A population conditional mean is different from a fitted sample line

The error is an unobserved population remainder; the residual follows an estimated line.

Write the population relationship as Y equals beta zero plus beta one times X plus u. A parameter is a fixed numerical feature of the population model; the betas are its unknown intercept and slope. If the conditional mean of u given X is zero, the population conditional mean of Y at X equal to x is beta zero plus beta one times x. A conditional mean is an average over units sharing the stated X value.

The sample line uses estimated coefficients b zero and b one. Its fitted value for district i is b zero plus b one times its staffing ratio. The residual is observed score minus that fitted value. A residual is calculated from this sample, whereas the population error depends on the unknown coefficients. The sample line approximates a population comparison; causal meaning still requires the earlier identification argument.

Population: \(Y=\beta_0+\beta_1X+u\), with \(E[u\mid X]=0\).

Population conditional mean: \(E[Y\mid X=x]=\beta_0+\beta_1x\).

Sample: \(\widehat Y_i=b_0+b_1X_i\); residual: \(\widehat u_i=Y_i-\widehat Y_i\).

## 03. Inspect variables before running the model

Check the data, then use a saved do-file to reproduce the estimates.

Before fitting the model, inspect what each column records. summarize reports the number of nonmissing observations, the mean, the standard deviation, and the smallest and largest values. The mean is the arithmetic average. The standard deviation describes how far values typically spread around that mean, in the variable's own units. It describes differences across districts, not uncertainty about a regression coefficient.

Check that score is a score in points, str is students per teacher and el is a percentage rather than a fraction. Then run the first regression. regress names the outcome first and the regressors afterward. This lesson focuses on the coefficients; uncertainty options and the other regression columns will receive a systematic introduction in Meeting 05.

Check observation counts, units, ranges and missing values.

Outcome first; regressors afterward.

## 04. A slope is a change with units

A fitted change equals the slope times the change in the regressor.

The slope now lets us translate a proposed staffing change into a fitted score difference. Use \(\Delta X\) to mean the new ratio minus the old ratio. The Greek letter Δ, read 'delta', means a change. Along a straight line, the fitted score change is \(b_1\)\(\Delta X\).

In the simple regression, which includes one explanatory variable, the estimated slope is -2.280 score points per additional student per teacher. Reducing the ratio from 22 to 20 gives \(\Delta X\)=20−22=−2. Multiplying a negative slope by this negative change gives a positive fitted difference: about 4.56 score points. We are moving left and up along the fitted line.

Check the units as well as the sign. The result is in district score points, not percentages, and it compares two values on the line. Whether a staffing policy would cause this gain is the research-design question we discussed earlier. For now, make sure you can translate the proposed change correctly. After the break, we will examine how the data determine the line itself.

\(\Delta X=\text{new ratio}-\text{old ratio}\)

\(22\rightarrow20\) gives \(\Delta X=-2\)

Fitted change: \(b_1\Delta X\approx+4.56\) score points

**Practice:** Use the same slope to calculate the fitted score change when the ratio rises from 20 to 23.

**Explanation:** The change in the ratio is +3. The fitted score change is 3×(−2.279808), about −6.84 score points. Moving right along the downward-sloping line lowers its fitted score.

## 05. Choose a line by its errors

OLS chooses the line with the smallest sum of squared residuals.

We have used a fitted line, but many different lines could pass through the graph. Ordinary least squares, abbreviated OLS, chooses the line with the smallest sum of squared residuals. Recall that a residual is the vertical difference between an observed score and the line's fitted score. Squaring makes each contribution nonnegative, so an overprediction cannot cancel an underprediction.

The sum of squared residuals is the loss we are trying to minimise. The graph calls it SSE, for sum of squared errors; here those 'errors' mean the calculated residuals. A larger miss receives more weight because it is squared. For example, a residual of four points contributes 16 to the loss, while a residual of two contributes four.

Move the slope control to compare candidate lines. Each line passes through the sample mean point: the average ratio and average score. The displayed loss uses all 420 districts. Try a flat line, then a steep downward line, and find where the loss is smallest. This exercise shows how OLS chooses its coefficients. Next we will follow one district's residual to see exactly what enters that calculation.

## 06. Follow one residual

For one district, compare the observed score with the score on the line.

Choose one district with the graph control. Its dot is the observed score. To find its fitted score, move vertically to the line while keeping the same ratio on the horizontal axis. The distance from the fitted score to the observed score is the residual introduced in our equation.

Predict its sign before revealing the segment. A dot above the line has a positive residual because the observed score is higher than the fit. A dot below the line has a negative residual. For example, an observed score of 670 and a fitted score of 665 give a residual of +5 points. Its squared contribution to the OLS loss is 25 squared score points. These numbers illustrate the calculation; the plotted district uses its actual data.

Now choose another district and repeat the steps. The same rule applies to every dot, and OLS adds all the squared contributions. This connects the graph to the formula \(e_i\)=\(Y_i\)−\(\widehat Y_i\). It also shows why a residual is a prediction difference for one observation, rather than the effect of changing staffing. We can now ask how all the observations combine to determine the slope.

## 07. Calculate the OLS slope from the data

Compare each variable with its average, then combine the deviations.

To combine the observations, first compare each variable with its sample average. Write \(\overline X\) for the average ratio and \(\overline Y\) for the average score; the bar means 'sample average'. The expression \(X_i\)−\(\overline X\) is a deviation from the mean: how far district i's ratio lies above or below the average. Define the score deviation in the same way.

The slope formula adds the cross-products (\(X_i\)−\(\overline X\))(\(Y_i\)−\(\overline Y\)) and divides by the sum of squared ratio deviations. A cross-product here is simply the product of the two deviations. A district above the average ratio but below the average score contributes a negative product. If such combinations dominate, the fitted slope is negative. The symbol \(\sum\) means to add across all districts.

The denominator measures the variation available in X. If every district had the same ratio, it would be zero: we would have no comparison from which to estimate a slope. When it is positive, the ratio of these two sums gives \(b_1\). Then \(b_0\)=\(\overline Y\)−\(b_1\)\(\overline X\) chooses the intercept so the line passes through the sample mean point. The next small example lets us check these steps without using software.

\(b_1=\dfrac{\sum_i(X_i-\overline X)(Y_i-\overline Y)}{\sum_i(X_i-\overline X)^2}\)

\(b_0=\overline Y-b_1\overline X\)

Without regressor variation, the slope cannot be separately estimated.

## 08. The normal equations explain the slope formula

Differentiate the squared-error criterion, then solve the two conditions.

Let S be the sum of squared residuals from a proposed intercept b zero and slope b one. A derivative measures how this criterion responds to a very small change in one coefficient, holding the other fixed. A first-order condition sets that derivative to zero at its minimum. Differentiating with respect to the intercept gives a zero sum of residuals. Differentiating with respect to the slope gives a zero sum of X times the residual.

The first condition implies that the fitted line passes through the sample means. Substitute that intercept into the second condition to obtain the displayed slope: the sum of centred X times centred Y divided by the sum of squared centred X. Positive variation in X makes the solution unique. These normal equations are mechanical properties of OLS with an intercept; they do not establish that the regressor is unrelated to the population error.

\(S(b_0,b_1)=\sum_i(Y_i-b_0-b_1X_i)^2\).

\(\partial S/\partial b_0=-2\sum_i\widehat u_i=0\), \(\partial S/\partial b_1=-2\sum_iX_i\widehat u_i=0\).

\(b_0=\overline Y-b_1\overline X\), \(b_1=\dfrac{\sum_i(X_i-\overline X)(Y_i-\overline Y)}{\sum_i(X_i-\overline X)^2}\).

## 09. A small calculation you can finish

Use three constructed districts to see the formula work.

Use three constructed districts with ratios 18, 20 and 22 and scores 680, 670 and 650. These are teaching numbers, not three selected observations from the actual dataset. We know how to fit a line from the previous slide, so work through each sum before revealing the answer.

The average ratio is 20 and the average score is 666⅔. Ratio deviations are therefore −2, 0 and +2. Multiply each by its corresponding score deviation and add: the numerator is −60. Square and add the ratio deviations: the denominator is 8. This gives \(b_1\)=−60/8=−7.5, and \(b_0\)=666⅔−(−7.5×20)=816⅔. The intercept follows from the formula; it does not describe a realistic district with no students per teacher.

Insert each ratio into this fitted equation and subtract its fitted score from the observed score. Check that the residuals sum to zero. This is a property of OLS when the model includes an intercept. It checks the calculation, but it does not test the population assumption that the error averages to zero at each X. Having checked the method, we can return to the real districts and add the language-composition variable.

**Practice:** Find the slope, intercept, fitted scores and residuals for X=(18,20,22) and Y=(680,670,650).

**Explanation:** \(b_1\)=−7.5 and \(b_0\)=816⅔. Fitted scores are 681⅔, 666⅔ and 651⅔. Residuals are −1⅔, +3⅓ and −1⅔, which sum to zero. Small differences from rounding are acceptable.

## 10. Zero conditional mean is stronger than zero covariance

An average restriction need not hold at every regressor value.

Variance is the expected squared distance from a variable's mean; it measures spread in squared units. Covariance measures average co-movement: the expected product of two variables after subtracting their means. When both standard deviations are positive and finite, correlation divides covariance by their product. It is a unit-free measure of linear co-movement, between minus one and one. If the error has mean zero conditional on X, averaging X times that conditional mean gives a zero covariance between X and u, provided the relevant expectations exist. This is a population moment restriction, meaning an equality involving an average of random variables.

The converse need not hold. In a constructed example, X takes minus one, zero and one with equal probability, and u equals X squared minus two thirds. Its mean is zero and its covariance with X is zero, but its conditional mean is one third at the two extremes and minus two thirds at zero. Linear co-movement vanishes while the conditional pattern remains. In this regression discussion, exogeneity refers to the stated restriction connecting regressors and the population error, such as zero conditional mean. Neither zero sample residual covariance nor zero population covariance alone establishes that restriction or proves a causal model.

\(\operatorname{Cov}(X,u)=E[(X-EX)(u-Eu)]\).

\(E[u\mid X]=0\Rightarrow E[Xu]=E[XE(u\mid X)]=0\).

Counterexample: \(P(X=-1)=P(X=0)=P(X=1)=1/3\), \(u=X^2-2/3\).

## 11. With an intercept, fitted and residual variation add up

Define the sums of squares before reading fit statistics.

Let SST denote total score variation around the sample mean, SSR the sum of squared residuals, and ESS the explained sum of squares around that mean. Different books interchange the letters for explained and residual variation, so we state our convention. OLS with an intercept makes fitted deviations orthogonal to residuals, meaning their cross-product sums to zero.

Write each observed deviation as its fitted deviation plus its residual and square it. Summing leaves ESS plus SSR because the cross term vanishes. R squared is therefore one minus SSR divided by SST, when SST is positive. It describes sample fit. A high value can arise in a confounded model, and it does not measure the size of a policy effect.

\(SST=\sum_i(Y_i-\overline Y)^2\), \(SSR=\sum_i\widehat u_i^2\), \(ESS=\sum_i(\widehat Y_i-\overline Y)^2\).

With an intercept: \(\sum_i(\widehat Y_i-\overline Y)\widehat u_i=0\), so \(SST=ESS+SSR\).

\(R^2=1-SSR/SST\), for \(SST>0\).

## 12. Rescaling a variable changes coefficients and preserves fitted values

Units belong to the coefficient, not to the fit.

Suppose staffing X is recorded in students per teacher, and define X star as c times X for a nonzero constant c. Replacing X with X star in the same regression divides its coefficient by c. Multiplying that coefficient by X star recovers the same contribution to every fitted score. For example, doubling the recorded staffing numbers halves their fitted slope.

If the outcome is multiplied by a positive scale factor a, its intercept, slopes, fitted values and residuals all scale by a. These are changes of measurement, not new economic evidence. Removing the intercept is different: it forces the fitted line through zero when X is zero. That imposes a restriction, and the centred fit decomposition need not hold. We will revisit uncertainty under rescaling after developing sampling uncertainty.

\(X^\star=cX\Rightarrow b_1^\star=b_1/c\), \(c\ne0\).

\(Y^\star=aY\Rightarrow b_0^\star=ab_0,\ b_1^\star=ab_1\), \(a>0\).

Changing units preserves the translated fit; removing an intercept changes the model.

## 13. Logs provide a second measurement scale for a simple regression

Define the logarithm before using percentage language.

The natural logarithm of a positive value is the power of e, about 2.718, that produces it. The exponential reverses that operation. A difference in natural logs is the log of the ratio of the original values. Thus a fitted log-outcome change of d corresponds to a ratio exp of d and a proportional change exp of d minus one.

In a log-level model the coefficient b is the fitted log-outcome change for a one-unit increase in X, so 100 times b is a small-change percentage approximation. In a log-log model b relates proportional changes on both sides and is called an elasticity. These translations concern the fitted log relationship. Later we examine arithmetic mean prediction, zeros and finite changes in detail using the same retail data.

\(\log Y_1-\log Y_0=\log(Y_1/Y_0)\); exact proportional change: \(\exp(d)-1\).

Log-level: \(\log Y=b_0+b_1X\); one-unit fitted change: \(100[\exp(b_1)-1]\%\).

Log-log: \(\log Y=b_0+b_1\log X\); \(b_1\) is a local elasticity.

## 14. Check the normal equations and fit decomposition

Try the comparison before opening the explanation.

Estimate score on str with an intercept using schools.csv. Verify that the residual sum and staffing-residual cross-product are approximately zero, reconstruct SST and SSR, and recover R squared. Explain why these numerical identities do not establish exogeneity.

State the assumptions and units alongside the calculation.

**Practice:** Estimate score on str with an intercept using schools.csv. Verify that the residual sum and staffing-residual cross-product are approximately zero, reconstruct SST and SSR, and recover R squared. Explain why these numerical identities do not establish exogeneity.

## 15. Check the normal equations and fit decomposition: explanation

Follow the calculation and interpret its units.

OLS with an intercept makes the two sample cross-products zero up to numerical precision. Here SST is about 152109.594, SSR about 144315.484, and reconstructed R squared is about 0.0512401, matching Stata. The overleaf_technical.do reference demonstrates the calculation. These are consequences of minimisation, not evidence that the unknown population error has zero conditional mean.

OLS with an intercept makes the two sample cross-products zero up to numerical precision. Here SST is about 152109.594, SSR about 144315.484, and reconstructed R squared is about 0.0512401, matching Stata. The overleaf_technical.do reference demonstrates the calculation. These are consequences of minimisation, not evidence that the unknown population error has zero conditional mean.

## 16. Read a genuine Stata result

Read the fitted coefficients and their units in the actual Stata display.

Stata has fitted the score line to the 420 districts. To focus on what we have learned, this display reports only the fitted coefficients. The command matrix list prints a rectangular table of numbers; e(b) is Stata's stored coefficient table. The column str refers to students per teacher. Its coefficient is minus 2.279808 score points per additional student per teacher. The _cons column is the intercept.

For a two-student reduction, the regressor change is minus two. Multiplying it by the slope gives about 4.56 additional fitted score points. This compares two locations on the fitted line, not the two potential outcomes of the same district. The complete regression output is available in the download. We introduce its uncertainty columns in Meeting 05, after explaining what repeated-sample uncertainty means.

\(\widehat\beta_1=-2.279808\) points per student per teacher

Fitted contrast: \((-2)(-2.279808)=4.559616\) points

```text
. quietly regress score str

. matrix list e(b), format(%10.6f)

e(b)[1,2]
           str       _cons
y1   -2.279808  698.932953
```

## 17. Calculate the policy-sized fitted difference

lincom translates a slope into the particular comparison we want.

Stata's lincom command calculates a stated weighted sum of estimated coefficients; here the weight is minus two on the staffing slope. A policy reader usually cares about a feasible staffing change rather than a one-unit coefficient. The proposed change from 22 to 20 students per teacher is minus two units. Stata evaluates minus twice the staffing coefficient and obtains 4.559616 score points.

The sign is positive because both the slope and the proposed ratio change are negative. The intercept cancels when two fitted scores from the same line are subtracted. Compare this fitted difference with the four-point causal effect in our earlier teaching model. They answer different questions: one comes from an observed-data fit, while the other follows from specified causal mechanisms. Numerical similarity would not establish that they have the same interpretation.

\(\Delta X=20-22=-2\)

\(\Delta\widehat Y=\widehat\beta_1\Delta X=4.559616\) points

```text
. display %10.6f -2*_b[str]
  4.559617
```

