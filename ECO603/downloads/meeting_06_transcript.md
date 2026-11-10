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

Unbiasedness concerns the average estimate across repetitions at a fixed sample size. Consistency asks what happens as the sample size grows: does the estimator concentrate near its target? An estimator can have some finite-sample bias and still be consistent. An omitted-variable estimator can instead become tightly concentrated around the wrong value.

The probability limit, written plim, is the value approached in probability. That means the chance of an estimate lying more than any fixed small distance from the value goes to zero. We use the term consistency here for this estimator property. It differs from the causal consistency assumption in Meeting 01, which linked an observed outcome to the potential outcome under the intervention actually received. The shared word does not make these the same claim.

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

For independent zero-or-one draws with probability one half, the average has mean one half and standard deviation 0.5 divided by the square root of sample size. At 100 observations that spread is 0.05; at 400 it is 0.025. Multiply the average's deviation from one half by the square root of sample size and its spread stays at 0.5. Under these conditions, the scaled distribution approaches a normal bell shape.

This is the role of a central limit theorem: it describes the shape and scale of fluctuations, while a law of large numbers describes concentration near a limit. Under suitable regressor and error conditions, a coefficient estimator has a similar square-root-of-sample-size approximation. In the formula, beta is the target, beta hat its estimate, the arrow marked d means convergence in distribution: for this continuous normal limit, probabilities of falling below each fixed cutoff approach the normal probabilities, and Omega is the limiting variance. None of these statements centers an inconsistent short regression on the true structural coefficient.

Average of independent zero-or-one draws, each with mean 1/2: \(SD(\overline Y)=0.5/\sqrt n\)

Coefficient analogue: \(\sqrt n(\widehat\beta-\beta)\overset d\longrightarrow N(0,\Omega)\)

### 10. Square-root sample-size gains require a comparable sampling model

A stable average in the denominator sets the scale for sampling fluctuations.

Use the simple regression with an intercept to see how the two limit results work together. The slope error is the sum of centered X times the population error divided by the sum of squared centered X. The law of large numbers makes the denominator per observation approach the positive population variance of X.

For independent observations from the same population, with zero conditional-mean errors and finite variances for the terms in the calculation, the central limit theorem applies to the centered X times error products. In this step X is centered at its population mean. Using the sample mean instead changes the scaled sum by the sample mean's deviation from the population mean times the square-root scaled average error. The first factor approaches zero and the second has stable spread, so this difference vanishes. Dividing the scaled sum by the stable positive denominator gives the approximate normal shape for the scaled slope error.

When observations provide comparable information, the slope estimate's standard error is roughly proportional to one over the square root of sample size. Four times as many observations roughly halves that standard error. This result concerns variation around the limit. Our earlier simulation shows why it matters whether that limit is the target.

\(\sqrt n(\widehat\beta_1-\beta_1)=\dfrac{n^{-1/2}\sum_i(X_i-\bar X)u_i}{n^{-1}\sum_i(X_i-\bar X)^2}\).

Positive denominator limit: \(Q=\operatorname{Var}(X)>0\).

With \(S=\operatorname{Var}[(X-E X)u]\), approximate slope variance is \(S/(nQ^2)\).

### 11. A restricted-model LM test asks what the omitted columns still explain

The auxiliary statistic and reference distribution must match the null.

LM abbreviates Lagrange multiplier. This test assesses omitted coefficient restrictions using a fit that imposes the null. Suppose the unrestricted model contains the original inputs and q additional columns. The null sets the coefficients on those q columns to zero. Fit the restricted model first and obtain its residuals. In the conventional homoskedastic linear-model LM construction, regress those residuals on the complete unrestricted regressor set, including the original inputs and the intercept.

The auxiliary statistic is n times its R squared, with an asymptotic chi-squared reference having q degrees of freedom under the stated sampling, moment, rank and variance conditions. A chi-squared variable with q degrees of freedom is the sum of squares of q independent standard normal variables. This ordinary construction is not automatically valid under arbitrary heteroskedasticity. For unequal variance, the later variance lesson develops a joint test based on a suitable covariance estimate instead. The restriction count comes from the null, not from the number of degrees of freedom in a conveniently available critical-value table.

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

Let x i be the p-entry regressor vector, including the intercept, and let Q be its population second-moment matrix. A second moment is an expected product: entry j, k of Q is the population average of regressor j times regressor k. These products are not centred as in a covariance matrix. Asymptotic means describing a limit as sample size grows. Assume independent observations, a nonsingular, meaning invertible, Q, zero expected x i times u i, and sufficient finite moments for a law of large numbers and central limit theorem. For example, finite second moments of x i times u i support the familiar independent-data normal approximation.

The scaled OLS estimation error equals the inverse sample second moment times the sum of regressor-error products divided by square root n. The first part approaches Q inverse. The second has a limiting normal distribution with covariance S, defined as the expectation of u squared times x x prime. Their combination gives Q inverse S Q inverse. The asymptotic covariance of the scaled estimator is not its finite-sample variance; the approximate coefficient covariance divides that limiting matrix by n.

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

