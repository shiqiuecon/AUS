# 02. Simple regression: estimation, units and fit

Fit a line and report what a realistic change in its predictor would imply.

## Core lesson

### 01. Make the first regression model explicit

Define the regression equation, its coefficients and the error term.

We now turn from a causal model to a statistical description of district scores. A regressor is a variable used to explain or predict an outcome. Our first regressor is the student–teacher ratio X; the outcome Y is the district score. In the population equation, beta zero is an intercept, the height of the line at X equal to zero, and beta one is a slope. These unknown numbers are the model coefficients. The error u collects the outcome variation outside that specified line.

If the mean error is zero at every X, the line describes the conditional mean: the average score among districts at that ratio. This is an assumption about the population, not a consequence of fitting a line. A causal interpretation needs the additional intervention and assignment argument developed above. Estimation means choosing coefficient values using the sample data. An estimator is the calculation rule; an estimate is the numerical result from one sample. The sample fit uses these estimated coefficients, written with hats, and gives a fitted score for each district. A residual is its observed score minus that fitted score; unlike the population error, we can calculate it after estimation.

Population: \(Y_i=\beta_0+\beta_1X_i+u_i\)

Conditional-mean assumption: \(E(u_i\mid X_i)=0\)

Fit: \(\widehat Y_i=\widehat\beta_0+\widehat\beta_1X_i\); residual: \(e_i=Y_i-\widehat Y_i\)

### 02. A population conditional mean is different from a fitted sample line

The error is an unobserved population remainder; the residual follows an estimated line.

Start with the population equation. Beta zero and beta one are the unknown intercept and slope. These fixed features of the population model are called parameters. The error u is the part of a district's score left after its population line is subtracted. If this error averages to zero among districts with the same staffing ratio, that line gives the average score at each ratio. An average at a stated ratio is a conditional mean.

Now look at the fitted sample line. It uses b zero and b one, the coefficients estimated from the districts we observed. For district i, plug its ratio into that fitted line. Subtract the fitted score from the observed score to get its residual. We can calculate the residual from the data. Calculating the population error would require the unknown population coefficients.

Population: \(Y=\beta_0+\beta_1X+u\), with \(E[u\mid X]=0\).

Population conditional mean: \(E[Y\mid X=x]=\beta_0+\beta_1x\).

Sample: \(\widehat Y_i=b_0+b_1X_i\); residual: \(\widehat u_i=Y_i-\widehat Y_i\).

### 03. Inspect variables before running the model

Check the data, then use a saved do-file to reproduce the estimates.

Before fitting the model, inspect what each column records. summarize reports the number of nonmissing observations, the mean, the standard deviation, and the smallest and largest values. The mean is the arithmetic average. The standard deviation describes how far values typically spread around that mean, in the variable's own units. It describes differences across districts, not uncertainty about a regression coefficient.

Check that score is a score in points, str is students per teacher and el is a percentage rather than a fraction. Then run the first regression. regress names the outcome first and the regressors afterward. This lesson focuses on the coefficients; uncertainty options and the other regression columns will receive a systematic introduction in Meeting 05.

Check observation counts, units, ranges and missing values.

Outcome first; regressors afterward.

### 04. A slope is a change with units

A fitted change equals the slope times the change in the regressor.

The slope now lets us translate a proposed staffing change into a fitted score difference. Use \(\Delta X\) to mean the new ratio minus the old ratio. The Greek letter Δ, read 'delta', means a change. Along a straight line, the fitted score change is \(b_1\)\(\Delta X\).

In the simple regression, which includes one explanatory variable, the estimated slope is -2.280 score points per additional student per teacher. Reducing the ratio from 22 to 20 gives \(\Delta X\)=20−22=−2. Multiplying a negative slope by this negative change gives a positive fitted difference: about 4.56 score points. We are moving left and up along the fitted line.

Check the units as well as the sign. The result is in district score points, not percentages, and it compares two values on the line. Whether a staffing policy would cause this gain is the research-design question we discussed earlier. For now, make sure you can translate the proposed change correctly. After the break, we will examine how the data determine the line itself.

\(\Delta X=\text{new ratio}-\text{old ratio}\)

\(22\rightarrow20\) gives \(\Delta X=-2\)

Fitted change: \(b_1\Delta X\approx+4.56\) score points

**Practice:** Use the same slope to calculate the fitted score change when the ratio rises from 20 to 23.

**Explanation:** The change in the ratio is +3. The fitted score change is 3×(−2.279808), about −6.84 score points. Moving right along the downward-sloping line lowers its fitted score.

### 05. Choose a line by its errors

OLS chooses the line with the smallest sum of squared residuals.

Move the slope control to try a flat line and a steep downward line. Watch the number labelled SSE. It is the sum of squared errors, where errors here are fitted residuals. For each of the 420 districts, subtract the fitted score from the observed score, square that difference, then add the squares.

Why square the differences? A residual of four points contributes sixteen, and a residual of minus two contributes four. Both misses add to the loss, and the larger miss adds more.

Every candidate line in this graph passes through the point for the average ratio and average score. For each slope that is the intercept that gives the smallest loss. Ordinary least squares, or OLS, chooses the intercept and slope with the lowest overall loss. Next we will track one district's contribution.

### 06. Follow one residual

For one district, compare the observed score with the score on the line.

Choose one district with the graph control. Its dot is the observed score. To find its fitted score, move vertically to the line while keeping the same ratio on the horizontal axis. The distance from the fitted score to the observed score is the residual introduced in our equation.

Predict its sign before revealing the segment. A dot above the line has a positive residual because the observed score is higher than the fit. A dot below the line has a negative residual. For example, an observed score of 670 and a fitted score of 665 give a residual of +5 points. Its squared contribution to the OLS loss is 25 squared score points. These numbers illustrate the calculation; the plotted district uses its actual data.

Now choose another district and repeat the steps. The same rule applies to every dot, and OLS adds all the squared contributions. This connects the graph to the formula \(e_i\)=\(Y_i\)−\(\widehat Y_i\). It also shows why a residual is a prediction difference for one observation, rather than the effect of changing staffing. We can now ask how all the observations combine to determine the slope.

### 07. Calculate the OLS slope from the data

Compare each variable with its average, then combine the deviations.

Start with the numerator. For each district, subtract the average ratio from its ratio and the average score from its score. A bar over a variable denotes its sample average. Multiply the two deviations to get a cross-product. Add those cross-products across districts. The sum symbol tells us to add. A district with a ratio above average and a score below average contributes a negative product.

The denominator adds the squared ratio deviations. It is positive when districts differ in staffing. Without variation in the ratio we cannot fit a separate slope. Divide the first sum by the second to get the slope. If negative products dominate, the fitted line slopes down.

Now get the intercept. Start at the average score and subtract the slope times the average ratio. This puts the line through the point for the two sample averages. We will see why this calculation minimises squared residuals on the next slide.

\(b_1=\dfrac{\sum_i(X_i-\overline X)(Y_i-\overline Y)}{\sum_i(X_i-\overline X)^2}\)

\(b_0=\overline Y-b_1\overline X\)

Without regressor variation, the slope cannot be separately estimated.

### 08. The normal equations explain the slope formula

Differentiate the squared-error criterion, then solve the two conditions.

Let S be the sum of squared residuals from a proposed intercept b zero and slope b one. A derivative measures how this criterion responds to a very small change in one coefficient, holding the other fixed. A first-order condition sets that derivative to zero at its minimum. Differentiating with respect to the intercept gives a zero sum of residuals. Differentiating with respect to the slope gives a zero sum of X times the residual.

The first condition implies that the fitted line passes through the sample means. Substitute that intercept into the second condition to obtain the displayed slope: the sum of centred X times centred Y divided by the sum of squared centred X. Positive variation in X makes the solution unique. These normal equations are mechanical properties of OLS with an intercept; they do not establish that the regressor is unrelated to the population error.

\(S(b_0,b_1)=\sum_i(Y_i-b_0-b_1X_i)^2\).

\(\partial S/\partial b_0=-2\sum_i\widehat u_i=0\), \(\partial S/\partial b_1=-2\sum_iX_i\widehat u_i=0\).

\(b_0=\overline Y-b_1\overline X\), \(b_1=\dfrac{\sum_i(X_i-\overline X)(Y_i-\overline Y)}{\sum_i(X_i-\overline X)^2}\).

### 09. A small calculation you can finish

Use three constructed districts to see the formula work.

Use three constructed districts with ratios 18, 20 and 22 and scores 680, 670 and 650. These are teaching numbers, not three selected observations from the actual dataset. We know how to fit a line from the previous slide, so work through each sum before revealing the answer.

The average ratio is 20 and the average score is 666⅔. Ratio deviations are therefore −2, 0 and +2. Multiply each by its corresponding score deviation and add: the numerator is −60. Square and add the ratio deviations: the denominator is 8. This gives \(b_1\)=−60/8=−7.5, and \(b_0\)=666⅔−(−7.5×20)=816⅔. The intercept follows from the formula; it does not describe a realistic district with no students per teacher.

Insert each ratio into this fitted equation and subtract its fitted score from the observed score. Check that the residuals sum to zero. This is a property of OLS when the model includes an intercept. It checks the calculation, but it does not test the population assumption that the error averages to zero at each X. Having checked the method, we can return to the real districts and add the language-composition variable.

**Practice:** Find the slope, intercept, fitted scores and residuals for X=(18,20,22) and Y=(680,670,650).

**Explanation:** \(b_1\)=−7.5 and \(b_0\)=816⅔. Fitted scores are 681⅔, 666⅔ and 651⅔. Residuals are −1⅔, +3⅓ and −1⅔, which sum to zero. Small differences from rounding are acceptable.

### 10. Zero conditional mean is stronger than zero covariance

An average restriction need not hold at every regressor value.

Variance measures spread. It is the average squared distance from a variable's mean. Covariance measures average co-movement. Subtract the two variables' means, multiply their deviations, and take the population average. Correlation divides this covariance by the two standard deviations when both are positive and finite. Its scale runs from minus one to one.

Suppose the population error has mean zero at every X. At a fixed X, multiplying that average error by X still gives zero. Averaging X times that conditional mean gives zero overall. The error also has mean zero overall, so the covariance between X and u is zero.

The converse need not hold. In the example, X is minus one, zero or one, each equally likely. The error is one third at both ends and minus two thirds in the middle. The products at the two ends cancel and the middle contributes zero. The covariance is zero even though the average error changes with X. Exogeneity names a stated restriction on the relationship between a regressor and the population error. Check the restriction your argument actually needs.

\(\operatorname{Cov}(X,u)=E[(X-EX)(u-Eu)]\).

\(E[u\mid X]=0\Rightarrow E[Xu]=E[XE(u\mid X)]=0\).

Counterexample: \(P(X=-1)=P(X=0)=P(X=1)=1/3\), \(u=X^2-2/3\).

### 11. With an intercept, fitted and residual variation add up

Define the sums of squares before reading fit statistics.

Let SST denote total score variation around the sample mean, SSR the sum of squared residuals, and ESS the explained sum of squares around that mean. Different books interchange the letters for explained and residual variation, so we state our convention. OLS with an intercept makes fitted deviations orthogonal to residuals, meaning their cross-product sums to zero.

Write each observed deviation as its fitted deviation plus its residual and square it. Summing leaves ESS plus SSR because the cross term vanishes. R squared is therefore one minus SSR divided by SST, when SST is positive. It describes sample fit. A high value can arise in a confounded model, and it does not measure the size of a policy effect.

\(SST=\sum_i(Y_i-\overline Y)^2\), \(SSR=\sum_i\widehat u_i^2\), \(ESS=\sum_i(\widehat Y_i-\overline Y)^2\).

With an intercept: \(\sum_i(\widehat Y_i-\overline Y)\widehat u_i=0\), so \(SST=ESS+SSR\).

\(R^2=1-SSR/SST\), for \(SST>0\).

### 12. Rescaling a variable changes coefficients and preserves fitted values

Units belong to the coefficient, not to the fit.

Suppose staffing X is recorded in students per teacher, and define X star as c times X for a nonzero constant c. Replacing X with X star in the same regression divides its coefficient by c. Multiplying that coefficient by X star recovers the same contribution to every fitted score. For example, doubling the recorded staffing numbers halves their fitted slope.

If the outcome is multiplied by a positive scale factor a, its intercept, slopes, fitted values and residuals all scale by a. These are changes of measurement, not new economic evidence. Removing the intercept is different: it forces the fitted line through zero when X is zero. That imposes a restriction, and the centred fit decomposition need not hold. We will revisit uncertainty under rescaling after developing sampling uncertainty.

\(X^\star=cX\Rightarrow b_1^\star=b_1/c\), \(c\ne0\).

\(Y^\star=aY\Rightarrow b_0^\star=ab_0,\ b_1^\star=ab_1\), \(a>0\).

Changing units preserves the translated fit; removing an intercept changes the model.

### 13. Read a genuine Stata result

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

### 14. Calculate the policy-sized fitted difference

lincom translates a slope into the particular comparison we want.

Stata's lincom command calculates a stated weighted sum of estimated coefficients; here the weight is minus two on the staffing slope. A policy reader usually cares about a feasible staffing change rather than a one-unit coefficient. The proposed change from 22 to 20 students per teacher is minus two units. Stata evaluates minus twice the staffing coefficient and obtains 4.559616 score points.

The sign is positive because both the slope and the proposed ratio change are negative. The intercept cancels when two fitted scores from the same line are subtracted. Compare this fitted difference with the four-point causal effect in our earlier teaching model. They answer different questions: one comes from an observed-data fit, while the other follows from specified causal mechanisms. Numerical similarity would not establish that they have the same interpretation.

\(\Delta X=20-22=-2\)

\(\Delta\widehat Y=\widehat\beta_1\Delta X=4.559616\) points

```text
. display %10.6f -2*_b[str]
  4.559617
```

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 15. Logs provide a second measurement scale for a simple regression

Define the logarithm before using percentage language.

The natural logarithm of a positive value is the power of e, about 2.718, that produces it. The exponential reverses that operation. A difference in natural logs is the log of the ratio of the original values. Thus a fitted log-outcome change of d corresponds to a ratio exp of d and a proportional change exp of d minus one.

In a log-level model the coefficient b is the fitted log-outcome change for a one-unit increase in X, so 100 times b is a small-change percentage approximation. In a log-log model b relates proportional changes on both sides and is called an elasticity. These translations concern the fitted log relationship. Later we examine arithmetic mean prediction, zeros and finite changes in detail using the same retail data.

\(\log Y_1-\log Y_0=\log(Y_1/Y_0)\); exact proportional change: \(\exp(d)-1\).

Log-level: \(\log Y=b_0+b_1X\); one-unit fitted change: \(100[\exp(b_1)-1]\%\).

Log-log: \(\log Y=b_0+b_1\log X\); \(b_1\) is a local elasticity.

### 16. Check the normal equations and fit decomposition

Try the comparison before opening the explanation.

Estimate score on str with an intercept using schools.csv. Verify that the residual sum and staffing-residual cross-product are approximately zero, reconstruct SST and SSR, and recover R squared. Explain why these numerical identities do not establish exogeneity.

State the assumptions and units alongside the calculation.

**Practice:** Estimate score on str with an intercept using schools.csv. Verify that the residual sum and staffing-residual cross-product are approximately zero, reconstruct SST and SSR, and recover R squared. Explain why these numerical identities do not establish exogeneity.

### 17. Check the normal equations and fit decomposition: explanation

Follow the calculation and interpret its units.

After fitting score on staffing with an intercept, check the sum of fitted residuals and the sum of staffing times the residual. Both are close to zero at machine precision. They follow from the way the line was fitted.

Next use each district to compute a squared deviation of score from its average and a squared residual from the line. Add each set separately. One minus the residual sum divided by the total sum gives about 0.0512 for R squared, matching Stata. Use the same districts for both sums. These calculations verify the fit. Whether staffing is related to the unobserved population error calls for a separate argument about the districts.

OLS with an intercept makes the two sample cross-products zero up to numerical precision. Here SST is about 152109.594, SSR about 144315.484, and reconstructed R squared is about 0.0512401, matching Stata. The overleaf_technical.do reference demonstrates the calculation. These are consequences of minimisation, not evidence that the unknown population error has zero conditional mean.

