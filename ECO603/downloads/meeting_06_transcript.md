# 06. OLS asymptotics

Decide whether collecting more data would solve the problem in an estimate.

## Core lesson

### 01. Can a larger dataset rescue a biased design?

Use a known population to separate bias from sampling noise.

Asymptotics studies what happens to statistical procedures as sample size grows. Large administrative datasets often produce small SEs. That is useful when the comparison estimates the intended effect, but it can make a flawed comparison look very convincing. Today we will construct data where the true coefficient is known and observe what increases in sample size actually do.

The simulation distinguishes a short regression omitting ability from a longer regression that includes it. The true direct X coefficient is one. The short slope approaches one and a half in this constructed population. Watching the distributions narrow around different values makes consistency and bias visible before we return to imperfect real-world records.

### 02. Define the simulation as an economic thought experiment

The generated truth is known by construction.

Let ability and a second noise term be independent standard-normal variables. Define X as ability plus that noise. Define Y as one plus X plus ability plus an independent outcome error. A standard-normal variable has mean zero and variance one; the normal shape is a convenient teaching choice, not a claim about real ability.

Ability affects Y directly and is related to X. The constructed model therefore gives a clear omitted-variable problem. Because we choose the population, we can compare estimates with its known coefficients. In real research we do not have that advantage, which is why simulations support understanding rather than prove a real design valid.

\(X=A+V\)

\(Y=1+X+A+U\)

\(A,V,U\) independent, with mean zero and variance one

### 03. Unbiasedness and consistency ask different questions

One concerns an average at a sample size; the other concerns a limit.

Imagine repeating a study with a hundred observations. If the average of those estimates equals the target, the estimator is unbiased at that sample size. Now try larger and larger samples. If the estimates gather around the target, the estimator is consistent. A method can start with some bias and still converge to the right value. The short regression in our simulation will illustrate the opposite problem: the estimates can gather tightly around the wrong value.

The probability limit, written plim, is the value the estimates approach in probability. For any fixed distance from that value, the chance of being farther away goes to zero as the sample grows. Here consistency describes an estimator. In the causal lesson, consistency linked the observed outcome to the potential outcome under the policy received.

Unbiasedness: correct repeated-sample mean at a fixed sample size.

Estimator consistency: concentration near the target as sample size grows.

Causal consistency: observed/potential-outcome link; a different use of the word.

### 04. The law of large numbers stabilises averages

More data can reveal a stable but unwanted relationship.

Imagine repeatedly drawing independent zero-or-one observations with probability one half of obtaining one. The sample average need not be exactly one half, but as the number of draws grows it concentrates near one half. The law of large numbers gives conditions under which sample averages approach their population means. Independent, identically distributed observations with a finite absolute mean provide one familiar set of sufficient conditions.

A probability limit is the value an estimator concentrates near as sample size grows. Consistency means that this limit equals its target. Averages inside an omitted-variable regression may stabilize perfectly while its coefficient converges to the wrong target. To see why, we must calculate the population relationship retained by the short model. The theorem reduces sampling fluctuation; it does not delete the omitted mechanism.

Law of large numbers: sample averages approach population means under stated conditions.

Consistent estimator: concentrates near its target as the sample grows.

### 05. Measure co-movement before calculating the limit

Covariance records whether centered variables tend to move together.

Variance averages the square of one variable's deviation from its mean. Covariance instead averages the product of two variables' deviations from their means. It is positive when above-average values tend to occur together, negative when they tend to move oppositely, and zero when those products balance. Zero covariance alone is weaker than independence.

In our experiment, X is A plus V. A and V are independent, each has mean zero and variance one. X therefore has variance two. Multiplying X by A and averaging gives the variance of A plus the covariance of V and A, or one plus zero. Thus the covariance of X with A is one. These facts provide the supporting slope needed to calculate omitted-variable bias before running a simulation.

\(\operatorname{Cov}(X,A)=E[(X-EX)(A-EA)]\)

\(X=A+V:\quad\operatorname{Var}(X)=2,\quad\operatorname{Cov}(X,A)=1\)

### 06. Calculate the wrong limit before simulating it

The short slope tends to one and a half.

The variance of X is two because it adds two independent variance-one components. Its covariance with ability is one. The auxiliary slope of ability on X is therefore one half. Since the direct ability coefficient in Y is one, omitted-variable bias contributes one half to the direct X coefficient of one.

The resulting short slope has probability limit 1.5. This prediction follows from the model before we inspect any simulated histogram. The controlled regression targets one under its stated assumptions. The exercise demonstrates why a known data-generating rule is valuable: we can distinguish a method's target from the random deviations around it.

\(\delta_1=\dfrac{\operatorname{Cov}(X,A)}{\operatorname{Var}(X)}=\dfrac12\)

\(\operatorname{plim}\widehat b_{\mathrm{short}}=1+\dfrac12=1.5\)

### 07. Compare repeated samples at two sizes

Concentration alone is not evidence of a correct target.

The graph uses 300 Stata-generated replications at each sample size, 100 and 1,000. Each replication draws a new sample from the same constructed population and estimates the short and controlled slopes. A replication is one repetition of the entire sampling-and-estimation process.

Select the larger sample size. Both collections should become less spread out, but they need not move toward the same centre. The short estimates concentrate near 1.5, while the controlled estimates concentrate near one. These are simulation results, not observed labour-market effects. They illustrate the specific assumptions we built into the experiment.

### 08. Read one large generated sample

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

### 09. The central limit theorem describes scaled fluctuations

The square-root rate concerns sampling variation around a limit.

Take independent zero-or-one draws with a one-half chance of one. Their sample average has mean one half. Its standard deviation is 0.05 with a hundred draws and 0.025 with four hundred. The average stays centered at one half and its spread shrinks.

To see a stable shape, subtract one half and multiply by the square root of the number of draws. The scaled average has standard deviation 0.5. As the sample grows, its distribution approaches a normal bell shape. The central limit theorem describes this scaled distribution. The law of large numbers told us where the original average settles.

The second formula shows the analogous result for a coefficient under suitable sampling and regression assumptions. Beta hat minus beta is its estimation error. The arrow marked d means probabilities of falling below fixed cutoffs approach those of the normal limit. Omega is the variance in that limiting distribution. We still need an argument that the estimator centers on the coefficient we want.

Average of independent zero-or-one draws, each with mean 1/2: \(SD(\overline Y)=0.5/\sqrt n\)

Coefficient analogue: \(\sqrt n(\widehat\beta-\beta)\overset d\longrightarrow N(0,\Omega)\)

### 10. Square-root sample-size gains require a comparable sampling model

A stable average in the denominator sets the scale for sampling fluctuations.

Look at the denominator of the slope formula. It is the sample average of squared staffing deviations. With independent observations from one population and finite variance, it approaches Q, the population variance of staffing. We need Q to be positive because the slope needs some staffing variation.

In the numerator, add the products of staffing deviations and population errors and divide by the square root of sample size. For the limit argument, center staffing at its population mean. If the error has zero conditional mean, the products have mean zero. With finite product variance S, the central limit theorem gives a normal limit with variance S. Replacing the population center by the sample center changes the scaled sum by a term that goes to zero: the difference between the centers goes to zero, while the square-root scaled average error has stable spread if the error variance is finite.

The ratio therefore approaches a normal distribution with variance S divided by Q squared. That is for the slope error multiplied by the square root of sample size. Divide the variance by n for the slope estimate itself. This is why four times as many comparable observations roughly halves the standard error. That improvement concerns uncertainty around the limit.

\(\sqrt n(\widehat\beta_1-\beta_1)=\dfrac{n^{-1/2}\sum_i(X_i-\bar X)u_i}{n^{-1}\sum_i(X_i-\bar X)^2}\).

Positive denominator limit: \(Q=\operatorname{Var}(X)>0\).

With \(S=\operatorname{Var}[(X-E X)u]\), approximate slope variance is \(S/(nQ^2)\).

### 11. A restricted-model LM test asks what the omitted columns still explain

The auxiliary statistic and reference distribution must match the null.

Suppose we want to test whether q extra regressors all have zero coefficients. L M stands for Lagrange multiplier. Start by fitting the smaller model that sets those coefficients to zero. Save its residuals. Now run a supporting regression of those residuals on all the regressors in the larger model, including its intercept. If the extra variables still explain the residuals, the smaller model may have left out something systematic.

Multiply the supporting regression's R squared by the sample size. Under the null, with the usual independent sampling, equal conditional variance and other regularity conditions, this statistic has an approximate chi-squared reference with q degrees of freedom. A chi-squared variable with q degrees of freedom is the sum of squares of q independent standard normal variables. Count the independent restrictions in the null to get q. When error variance differs across observations, use a procedure whose covariance assumptions allow for it.

\(H_0:\gamma_1=\cdots=\gamma_q=0\) for the \(q\) additional columns.

Conventional homoskedastic auxiliary test: \(LM=nR^2_{aux}\xrightarrow{d}\chi_q^2\).

Estimate under the null, then test the information left in the omitted columns.

### 12. Compare sample size and precision in the district data

Try the comparison before opening the explanation.

Use overleaf_technical.do to fit score on str and el for a fixed random 105-district subset and all 420 districts. Independently reproduce both robust fits. Compare sample sizes, staffing variation, coefficients and standard errors. Does the observed SE ratio have to equal two?

State the assumptions and units alongside the calculation.

**Practice:** Use overleaf_technical.do to fit score on str and el for a fixed random 105-district subset and all 420 districts. Independently reproduce both robust fits. Compare sample sizes, staffing variation, coefficients and standard errors. Does the observed SE ratio have to equal two?

### 13. Compare sample size and precision in the district data: explanation

Follow the calculation and interpret its units.

The smaller sample has 105 observations and the full sample 420, but its regressor mix and realised residuals differ. The observed ratio need not equal the square-root size ratio of two. The 105-district staffing estimate is about -0.176454 with robust SE 0.689649; the 420-district estimate is about -1.101296 with SE 0.432847. Their observed SE ratio is about 1.593286. Report values from your own successful run. The rate approximation requires comparable information and a valid sampling model; neither fit establishes a causal staffing effect.

The smaller sample has 105 observations and the full sample 420, but its regressor mix and realised residuals differ. The observed ratio need not equal the square-root size ratio of two. The 105-district staffing estimate is about -0.176454 with robust SE 0.689649; the 420-district estimate is about -1.101296 with SE 0.432847. Their observed SE ratio is about 1.593286. Report values from your own successful run. The rate approximation requires comparable information and a valid sampling model; neither fit establishes a causal staffing effect.

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 14. Two simple estimators separate bias from concentration

The two properties answer different repeated-sample questions.

Suppose Y observations are independent draws with mean mu and a positive finite variance. Estimating mu using only the first observation is unbiased, because that observation has mean mu. But collecting more unused observations does not make this estimator concentrate near mu; its distribution stays unchanged. It is not consistent when the population has positive variance.

Now use the sample mean plus one divided by n. Its repeated-sample mean is mu plus one divided by n, so it is biased at every finite n. Under a law of large numbers, a result giving conditions for sample averages to approach population averages, the sample mean converges to mu and the added term vanishes, making the estimator consistent. These examples explain why neither finite-sample unbiasedness nor a small standard error alone settles the large-sample question.

\(\widehat\mu_n=Y_1\): \(E\widehat\mu_n=\mu\), \(\operatorname{Var}(\widehat\mu_n)=\sigma^2>0\).

\(\widetilde\mu_n=\overline Y_n+1/n\): bias \(=1/n\), but \(\widetilde\mu_n\xrightarrow{p}\mu\).

### 15. More data, same bias

Try the comparison before opening the explanation.

An estimator converges to 1.4 while the causal target is 1.0. What happens to the bias problem as n grows?

Compare where each distribution is centered, then compare its spread. A narrower distribution can still concentrate on the wrong target.

**Practice:** An estimator converges to 1.4 while the causal target is 1.0. What happens to the bias problem as n grows?

### 16. More data, same bias: explanation

Follow the calculation and interpret its units.

It remains: the estimator is inconsistent for the causal target. Sampling variation may shrink around the wrong limit. Narrow intervals around 1.4 do not repair the design.

It remains: the estimator is inconsistent for the causal target. Sampling variation may shrink around the wrong limit. Narrow intervals around 1.4 do not repair the design.

### 17. The OLS large-sample argument separates a stable denominator from random scores

Define the moments needed for consistency and normal approximation.

Let x i be the list of regressors for observation i, including the intercept, written as a column. In Q, each entry averages a product of two regressor entries. For example, the staffing and income entry is the average of staffing times income. Q is a second-moment matrix. Its entries use the original values. A covariance matrix would first subtract their means. Assume independent observations from one population, invertible Q, zero average regressor-error products and the finite moments needed for the two limit results.

The scaled O L S estimation error has two parts. The inverse sample second-moment matrix approaches Q inverse. The sum of regressor-error products divided by square root n approaches a normal distribution with covariance S. Here S averages the outer product of a regressor-error column with itself, meaning one product for each pair of entries. The regressor-error column has mean zero under the moment assumption, so S is its covariance.

The asymptotic covariance of the scaled estimator is Q inverse, times S, times Q inverse. Asymptotic describes what happens as the sample grows. Dividing this matrix by n gives the large-sample covariance approximation for the original coefficient estimates.

\(Q=E[x_ix_i\prime]\), \(E[x_iu_i]=0\), \(S=E[u_i^2x_ix_i\prime]\).

\(\sqrt n(\widehat\beta-\beta)=[n^{-1}\sum_ix_ix_i\prime]^{-1}n^{-1/2}\sum_ix_iu_i\).

\(\sqrt n(\widehat\beta-\beta)\xrightarrow{d}N(0,Q^{-1}SQ^{-1})\); approximate covariance \(Q^{-1}SQ^{-1}/n\).

### 18. Count the restrictions before choosing an LM reference

Try the comparison before opening the explanation.

A conventional homoskedastic LM exercise has n=500, auxiliary R squared 0.012 and two excluded-coefficient restrictions. Calculate the statistic and compare it with the 5% chi-squared critical value 5.991 for two degrees of freedom. Would a three-degree-of-freedom critical value answer the stated question?

State the assumptions and units alongside the calculation.

**Practice:** A conventional homoskedastic LM exercise has n=500, auxiliary R squared 0.012 and two excluded-coefficient restrictions. Calculate the statistic and compare it with the 5% chi-squared critical value 5.991 for two degrees of freedom. Would a three-degree-of-freedom critical value answer the stated question?

### 19. Count the restrictions before choosing an LM reference: explanation

Follow the calculation and interpret its units.

LM=500*0.012=6. With q=2, compare it with 5.991, so the conventional test narrowly rejects at 5% under its assumptions. A three-degree-of-freedom critical value tests a different restriction count and is incorrect here. Rounding and the reference assumptions matter near the boundary.

LM=500*0.012=6. With q=2, compare it with 5.991, so the conventional test narrowly rejects at 5% under its assumptions. A three-degree-of-freedom critical value tests a different restriction count and is incorrect here. Rounding and the reference assumptions matter near the boundary.

