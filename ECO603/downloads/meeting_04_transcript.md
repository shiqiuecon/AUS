# 04. Multiple regression: OLS properties and partialling out

Show which variation identifies the fitted slope and why its precision can change.

## Core lesson

### 01. What makes an OLS comparison informative and precise?

Two districts with the same measured income and language composition can still have different staffing. Which part of the staffing data drives the adjusted slope? We will isolate that part by subtracting what the controls predict.

Once we know how each district contributes to the slope, we can ask two questions about repeated samples. Does the estimate center on the population coefficient? How widely does it vary? The same slope calculation lets us answer both questions under explicit assumptions.

Recover the adjusted slope from two sets of residuals.

Use the slope’s observation weights to explain bias and precision.

### 02. First remove controls from the outcome

Save the score differences the controls do not predict.

To isolate the score variation beyond the controls, first fit score using language share, income and an intercept, leaving staffing out. For each district, subtract this fitted score from its observed score. Call the resulting score remainder rY. It is measured in score points and can be positive or negative.

The hat over the linear prediction in the displayed notation means an estimated value from that supporting regression. It does not claim that every feature of the true conditional mean is exactly linear. This first subtraction removes the part that the specified control columns reproduce in the sample. We next perform a matching subtraction for staffing; both must use the same observations and controls.

Fit score on the control columns; save \(rY_i=Y_i-\widehat Y_{i,controls}\).

rY remains in score points.

### 03. Then remove the same controls from staffing

An adjusted outcome must be compared with an adjusted regressor.

Regress X on the same intercept, Z and W and save rX. It tells us whether a district has more or fewer students per teacher than those controls predict. The controls, observations and linear fitting rule must match those used to residualise Y.

Removing controls only from Y is not the same calculation. The raw X still contains its relationships with Z and W. The adjusted slope uses the part of X left after those relationships are accounted for. This step explains why 'controlling for income' does more than subtract one fitted number from the outcome.

\(rX_i=X_i-\widehat E_{\mathrm{linear}}(X_i\mid Z_i,W_i)\)

### 04. Follow one district through both subtractions

The residual plot uses actual score points and staffing units.

Use the first district in the exported data. Its observed score is 690.80 and its staffing ratio is 17.89. The regression on language share, income and an intercept predicts a score of 672.92. Subtracting gives a score remainder rY of about 17.88 points. A separate regression of staffing on those same controls predicts a ratio of 19.06; subtracting gives rX of about -1.17 students per teacher. These displayed values are rounded; the stored calculations retain full precision.

That district appears on the residual plot at horizontal coordinate -1.17 and vertical coordinate 17.88. It has fewer students per teacher and a higher score than its controls predict. Zero on either residual axis means equal to the control-based prediction, not a zero score or no teachers. We now fit the relationship between the two remainders, using all districts.

Actual first district: \(rY\approx690.80-672.92=17.88\) score points.

\(rX\approx17.89-19.06=-1.17\) students per teacher.

### 05. Regress the two remainders on each other

The partialled slope equals the full-model staffing slope.

Fit the score remainder r Y on the staffing remainder r X through the origin. The Frisch–Waugh–Lovell theorem, or F W L, says that this slope equals the staffing slope from the full model on the same districts.

To see why, multiply the full fitted equation by r X and sum over districts. The intercept and control terms disappear because r X has zero product sums with those inputs. The full residual term also disappears: r X is a linear combination of included inputs, and each has zero product sum with the full residual. The product sum with staffing equals the sum of squared r X. This follows because staffing is its prediction from the controls plus r X. Subtracting the control prediction from scores also leaves the product sum with r X unchanged. Dividing gives the displayed slope.

The identity tells us which district differences determine the estimate. Whether those differences are suitable for a causal comparison depends on the control argument from the previous week.

\(\widehat\beta_1=\dfrac{\sum_i rX_i rY_i}{\sum_i rX_i^2}\)

### 06. Read the full regression first

Compare coefficients on the same observations and controls.

With staffing, language share and income in the same model, the staffing slope is about minus 0.069 score points per student per teacher. The coefficient-only display lets us compare this with the result from the two residual variables. Check that the control list and the sample are identical before comparing the numbers.

The estimate is close to zero in this specification. This describes the adjusted observational comparison in these data. It does not show that every teacher-hiring intervention has zero effect: the causal interpretation still depends on the assignment argument and on the population to which the question applies. The purpose of the next calculation is to reproduce this particular coefficient from its underlying variation.

Full-model staffing coefficient: \(-0.068776\)

Controls: language share, income and an intercept.

```text
. quietly regress score str el income

. matrix list e(b), format(%10.6f)

e(b)[1,4]
           str          el      income       _cons
y1   -0.068776   -0.488267    1.494517  640.315497
```

### 07. Verify the FWL identity in Stata

The slopes agree to numerical precision.

The residual-on-residual coefficient matches the staffing coefficient in the full regression. This is the Frisch–Waugh–Lovell result, abbreviated FWL. It is an exact least-squares identity when both subtractions use the same observations and control columns as the full fit. The residual regression needs no extra intercept because both remainders already have zero means.

This identity concerns the coefficient. It does not make every uncertainty calculation from a manual residual regression identical to the full model's calculation. Those calculations can use different assumptions about error spread and different counts of fitted coefficients. First verify the coefficient and explain the two residual axes. We will then define how a coefficient varies across repeated samples and how to estimate that spread.

FWL: the same adjusted coefficient from compatible residuals.

A coefficient identity does not make every printed uncertainty calculation identical.

```text
. quietly regress ry rx, noconstant

. matrix list e(b), format(%10.6f)

symmetric e(b)[1,1]
           rx
y1  -0.068776
```

### 08. Read the residual axes in real units

They are deviations, not new measurements.

The horizontal axis measures students per teacher above or below the level predicted by the controls. The vertical axis measures score points above or below its predicted baseline. A point at zero on one axis does not mean the district has zero students or a zero test score.

The fitted line summarises how these adjusted deviations move together. Its slope retains units of score points per additional student per teacher. Use the graph to explain which variation the full coefficient uses, then ask whether that variation is plausibly unrelated to omitted learning determinants. The residual plot makes the question visible but does not answer it automatically.

### 09. Partialling out

Try the comparison before opening the explanation.

To estimate the schooling coefficient controlling for experience, describe the FWL procedure in words.

Name both variables that are residualised and list the identical controls used in both subtractions.

**Practice:** To estimate the schooling coefficient controlling for experience, describe the FWL procedure in words.

### 10. Partialling out: explanation

Follow the calculation and interpret its units.

Regress wages on an intercept and experience and save the residuals. Regress schooling on the same intercept and experience and save those residuals. Regress wage residuals on schooling residuals without another intercept. Its slope equals the schooling coefficient in the full regression on the same observations. Both subtractions must remove exactly the same control columns.

Regress wages on an intercept and experience and save the residuals. Regress schooling on the same intercept and experience and save those residuals. Regress wage residuals on schooling residuals without another intercept. Its slope equals the schooling coefficient in the full regression on the same observations. Both subtractions must remove exactly the same control columns.

### 11. An outcome distribution is not a sampling distribution

The random object changes.

A distribution describes the possible values of a random quantity and how often they occur. The distribution of district scores concerns variation among districts. An estimator is a rule that calculates a coefficient from sample data; an estimate is the numerical value it gives in one sample. Its sampling distribution describes the slopes that rule would produce across repeated comparable samples.

These are different objects. A large spread of scores does not itself tell us how much the estimated slope varies across samples. Sample size, error variation and usable regressor variation all matter for the estimator's spread. We use repeated samples as a way to understand uncertainty even though the empirical study usually provides one observed dataset.

A distribution describes the possible values of a random quantity and how often they occur.

These are different objects.

### 12. Describe spread before estimating uncertainty

Variance and standard deviation summarize different kinds of variation.

For the three equally likely numbers zero, one and two, the mean is one. Their squared distances from the mean are one, zero and one. Averaging gives a variance of two thirds. The square root, about 0.816, is the standard deviation and has the original units. Variance has squared units.

The same calculation can describe scores across districts or coefficient estimates across repeated samples. These are different distributions. A standard error estimates the standard deviation of an estimator, not the standard deviation of individual outcomes. We do not observe all repeated samples, so we use a formula justified by assumptions about sampling and the errors. Degrees of freedom count independent residual directions left after fitting parameters; a regression with n observations and p nonredundant fitted coefficients, including the intercept, has n minus p residual degrees of freedom.

\(\operatorname{Var}(0,1,2)=(1+0+1)/3=2/3\)

Standard deviation: \(\sqrt{2/3}\approx0.816\)

Residual degrees of freedom: \(n-p\), with \(p=k+1\) including the intercept.

### 13. A standard error estimates the estimator’s spread

It is not the standard deviation of the outcome.

A standard error estimates how much a coefficient estimate would vary across repeated samples under the maintained model. For the adjusted staffing slope, the heteroskedasticity-robust standard error is about 0.433 score points per student per teacher. Heteroskedasticity means that the conditional error variance differs across regressor values. This robust calculation permits that unequal spread under appropriate independent-sampling and large-sample conditions; we will derive it in the variance lesson. It is in the same units as the coefficient. It is not the typical prediction error for a district.

To turn this spread into an interval or test, we also need a reference distribution: the distribution that a standardized estimation error approximately follows under the assumptions. A normal reference is bell shaped, centered at zero and scaled to standard deviation one. About 95 percent of its probability lies between minus 1.96 and plus 1.96. This explains where the familiar multiplier comes from; it is not a guarantee for every dataset or every error structure.

SE: estimated repeated-sample standard deviation of the coefficient.

Normal reference: about 95% between \(-1.96\) and \(1.96\).

### 14. Unbiasedness concerns repeated samples

It does not promise an accurate estimate in every sample.

Keep the observed regressor values fixed for this calculation. Let r X be the staffing remainder from the same controls. Write each district's weight as its r X divided by the sum of squared r X. Apply the preceding product-sum argument to the population equation, where the unknown coefficient multiplies staffing and the unobserved error remains. The fitted slope equals the population slope plus the weighted sum of those errors.

Conditional on all regressor values, these weights are fixed. If every error has conditional mean zero given those values, the weighted sum has conditional mean zero. This gives conditional unbiasedness. For an independent sample, the assumption that each observation's error has mean zero given its own regressors gives this zero mean for the full set of regressors. A unique slope needs variation in r X. Precision is a separate question about how much the weighted sum varies.

Let \(\mathcal X\) denote all observed regressor values. Put \(w_i=rX_i/\sum_j rX_j^2\).

\(\widehat\beta_1-\beta_1=\sum_i w_i u_i\).

If \(E(u_i\mid\mathcal X)=0\) for each \(i\), then \(E(\widehat\beta_1\mid\mathcal X)=\beta_1\).

### 15. Precision depends on usable regressor variation

Little variation after adjustment means a weak comparison.

Start with the weighted error sum for the staffing slope. Suppose that, given the regressors, errors from different districts are uncorrelated and each has variance sigma squared. The variance of the weighted sum is sigma squared times the sum of squared weights. Substituting the weights gives sigma squared divided by the sum of squared staffing remainders. Equal conditional error variance is called homoskedasticity.

We estimate sigma squared by the residual sum of squares divided by n minus p. Here n counts districts and p counts all fitted coefficients, including the intercept. The denominator is the residual degrees of freedom, the number of observations left after accounting for fitted coefficients in this calculation. Replace sigma squared by its estimate and take the square root to get the conventional standard error.

When controls predict staffing very closely, the staffing remainders are small and the same amount of error variation can produce a less precise slope. A control can improve the comparison while leaving less independent variation for estimating the coefficient.

Given equal conditional variances and zero error correlation across districts, \(\operatorname{Var}(\widehat\beta_1\mid\mathcal X)=\sigma^2/\sum_i rX_i^2\).

\(s^2=\sum_i\widehat u_i^2/(n-p)\), with \(p\) counting the intercept.

Conventional \(SE(\widehat\beta_1)=\sqrt{s^2/\sum_i rX_i^2}\).

### 16. Multicollinearity reduces separate information

High correlation is different from exact dependence.

Multicollinearity describes strong linear relationships among regressors. With exact dependence, separate coefficients cannot be estimated. With strong but imperfect relationships, OLS can still be unbiased under exogeneity, but some coefficients may be imprecise because little independent variation remains.

For example, including income measured in dollars and the same income divided by one thousand creates exact dependence. Including income and a related but distinct education measure creates a different issue. The first is a redundant equation; the second may be a legitimate but demanding comparison. Always connect the numerical diagnostic to the variables' definitions.

Multicollinearity describes strong linear relationships among regressors.

For example, including income measured in dollars and the same income divided by one thousand creates exact dependence.

### 17. Efficiency needs additional error assumptions

Small variance is a comparison among estimators.

Suppose several procedures estimate the same slope without bias. To compare their precision, restrict attention to linear estimators: each is a weighted sum of the observed outcomes with weights determined by the regressors.

Under the Gauss–Markov assumptions, OLS has the smallest conditional variance in this class. We need a unique linear fit, zero conditional-mean errors, equal conditional error variance and zero error correlation across observations. This is why OLS is called the best linear unbiased estimator, or BLUE, under these conditions. The efficiency result gives a reason to use OLS when its variance assumptions fit the application. Unequal variances can change the efficiency comparison while the conditional unbiasedness argument still holds.

Linear estimators weight the observed outcomes using the regressors.

Gauss–Markov gives OLS minimum conditional variance among linear unbiased estimators under its assumptions.

BLUE means best linear unbiased estimator.

### 18. Use VIF as a description, not a decision rule

It measures linear overlap among included regressors.

The variance inflation factor, VIF, describes how much a regressor overlaps linearly with the other included regressors. Choose regressor j, predict it from the other regressors and an intercept, and call that supporting regression's fit R subscript j squared. The factor is one divided by one minus that R squared. A value near one indicates little overlap; it grows when the other columns predict most of the regressor's variation.

In the conventional equal-error-variance formula, this overlap inflates the coefficient's variance relative to otherwise comparable separate regressor variation. It is not a universal model-selection threshold. Removing a needed common-cause control because its VIF is large can make the causal comparison worse. Use the diagnostic to explain limited separate information, then consider more informative data or another design.

\(VIF_j=1/(1-R_j^2)\)

\(R_j^2\): fit from predicting regressor \(j\) with the other control columns.

No universal VIF cutoff certifies a causal model.

```text
. quietly regress score str el income

. estat vif

    Variable |       VIF       1/VIF  
-------------+----------------------
      income |      1.14    0.873929
          el |      1.12    0.891206
         str |      1.07    0.931159
-------------+----------------------
    Mean VIF |      1.11
```

### 19. Reconstruct precision and the degrees of freedom

Try the comparison before opening the explanation.

Run score on str, el and income using schools.csv. Reconstruct s squared as SSR/(n-p), identify p, and explain the staffing VIF. Then compare the full staffing coefficient with the residual-on-residual coefficient. State which equality is algebraic and which variance claims require additional assumptions.

State the assumptions and units alongside the calculation.

**Practice:** Run score on str, el and income using schools.csv. Reconstruct s squared as SSR/(n-p), identify p, and explain the staffing VIF. Then compare the full staffing coefficient with the residual-on-residual coefficient. State which equality is algebraic and which variance claims require additional assumptions.

### 20. Reconstruct precision and the degrees of freedom: explanation

Follow the calculation and interpret its units.

The model has an intercept and three slopes, so p is 4 and n minus p is 416. The fitted s squared is about 107.0691, the staffing VIF about 1.07, and both FWL and full staffing coefficients are about -0.068776. The conventional covariance formula requires equal conditional error variance and no cross-observation correlation; it is not established by this equality. The reference overleaf_technical.do prints s squared, VIF and the direct and residualised coefficients.

The model has an intercept and three slopes, so p is 4 and n minus p is 416. The fitted s squared is about 107.0691, the staffing VIF about 1.07, and both FWL and full staffing coefficients are about -0.068776. The conventional covariance formula requires equal conditional error variance and no cross-observation correlation; it is not established by this equality. The reference overleaf_technical.do prints s squared, VIF and the direct and residualised coefficients.

### 21. A residual is not an automatically valid control

Its construction does not establish a causal role.

Residualisation is a way to calculate an adjusted linear slope. It does not authorise adding any predicted or residual quantity to a causal model. If a control is affected by the policy or selected through a shared consequence, partialling it out may change the target or create an unwanted relationship.

Return to the control-selection discussion. First decide which comparison is justified by the economic timing and mechanism. Then use FWL to understand how that specified regression estimates its slope. The order matters: a precise computational identity cannot choose the causal model for us.

In this separate diagram, R is an observed staffing-allocation rule, while unmeasured learning needs U influence staffing and scores. Removing the fitted R component does not block the route through U. Residualisation is a calculation on the observed variables; it does not certify that the remaining variation is unrelated to every omitted outcome determinant.

### 22. Explain what the estimate uses

Describe the remaining comparison in ordinary language.

For the school application, say that the staffing coefficient uses variation in student–teacher ratios left after their linear relationships with income and language composition are accounted for. It relates that variation to similarly adjusted scores. This explanation is more informative than saying only that we 'ran a multiple regression'.

Then state the remaining assumption: the adjusted staffing variation must not be related to relevant unobserved determinants in the way ruled out by the chosen error restriction. Readers can now distinguish the calculation from the design claim. They can also see why a small amount of remaining variation may limit precision.

For the school application, say that the staffing coefficient uses variation in student–teacher ratios left after their linear relationships with income and language composition are accounted for.

Then state the remaining assumption: the adjusted staffing variation must not be related to relevant unobserved determinants in the way ruled out by the chosen error restriction.

### 23. Verify partialling out without misusing its SE

Reproduce the evidence, then explain its economic meaning.

Run the partialling-out code and compare the full-model staffing coefficient with the coefficient from regressing rY on rX. Then describe what one point on the residual plot measures. Both subtractions must use language share, income and an intercept on the same districts.

The full log also prints standard errors. Treat them as estimates of repeated-sample spread, which the next meeting develops. The FWL exercise establishes an algebraic identity for the coefficient, not permission to use any manual regression's uncertainty calculation for the full model. Record the matching coefficients and state why residualisation does not remove an unobserved common cause.

Replace income by log income in both residualising equations and in the full model. Verify the new slope identity and report uncertainty from the complete model. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Replace income by log income in both residualising equations and in the full model. Verify the new slope identity and report uncertainty from the complete model. Keep your commands, log, output and interpretation.

### 24. Verify partialling out without misusing its SE: explanation

A reproducible result needs both a calculation and an interpretation.

The residual staffing coefficient and the full-model staffing coefficient both equal about −0.068776 on the same observations. rx measures staffing minus its fitted prediction from the controls; ry measures score minus its prediction from those same controls.

The manual fit prints standard error 0.275915, while the full fit prints 0.290160. These use different uncertainty procedures. A standard error estimates repeated-sample spread; FWL guarantees the coefficient identity without guaranteeing that every manual spread calculation matches. Use the complete model’s justified uncertainty calculation when reporting that model. Neither matching coefficients nor small residuals establish a causal staffing comparison.

The full and partialled staffing slopes both equal -0.385338 on 420 districts. The full-model robust SE is 0.289855. Removing different control columns would not be the same FWL calculation.

Original staffing slope: \(-0.068776\).

Using log income: \(-0.385338\), full-model robust SE \(0.289855\).

FWL requires the same control columns in both residualising fits.

### 25. From OLS properties to statistical inference

We can now separate the calculation of an OLS coefficient from its repeated-sample properties. Full rank makes the sample solution unique, zero conditional mean supports unbiasedness, and additional variance assumptions determine the conventional precision formula.

The next meeting uses these ideas for confidence intervals and hypothesis tests. A confidence interval is a range from a procedure intended to cover the coefficient at a stated rate across repeated samples. A hypothesis test assesses a specified population restriction using sample evidence and a reference rule. A causal interpretation still needs the earlier argument about the economic comparison; an interval describes uncertainty around the coefficient in a specified model.

From OLS properties to statistical inference

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 26. Residual versus error

Try the comparison before opening the explanation.

OLS with an intercept gives residuals summing to zero. Does that verify \(E(u\mid X)=0\) in the population?

Use what is observed after fitting to distinguish a residual from the unobserved population error.

**Practice:** OLS with an intercept gives residuals summing to zero. Does that verify \(E(u\mid X)=0\) in the population?

### 27. Residual versus error: explanation

Follow the calculation and interpret its units.

No. The zero residual sum is a normal-equation identity imposed by least squares. The unobserved population error and its relation to X are a substantive assumption. OLS can satisfy its sample identities in a badly confounded model.

No. The zero residual sum is a normal-equation identity imposed by least squares. The unobserved population error and its relation to X are a substantive assumption. OLS can satisfy its sample identities in a badly confounded model.

### 28. Matrix notation stacks the same regression equations

Define dimensions and operations before using the compact estimator.

Stack the n observed scores into a column vector y, meaning a vertical list of numbers. Put an intercept column and k regressor columns into the design matrix X, which has n rows and p equals k plus one columns. The coefficient vector beta has p entries. A prime denotes transpose, which exchanges rows and columns. Matrix multiplication forms the sums of products in the normal equations.

Full column rank means no column is an exact linear combination of the others. It makes X prime X invertible: its inverse undoes multiplication by that square matrix. The displayed estimator solves the same OLS normal equations as the scalar formulas. Matrix notation keeps the bookkeeping compact; it introduces no additional causal assumption.

\(y=X\beta+u\); \(X:n\times p\), \(\beta:p\times1\), \(p=k+1\).

Normal equations: \(X\prime(y-X\widehat\beta)=0\).

Under full column rank, \(\widehat\beta=(X\prime X)^{-1}X\prime y\).

### 29. The residual-maker gives a compact FWL proof

Remove the same control space from the outcome and target regressor.

Let x be the staffing column and let Z contain the intercept and the other controls. The projection matrix P sub Z maps a vector to its fitted values from OLS on Z. The residual-maker M sub Z is the identity matrix I minus that projection. I leaves a vector unchanged, so M sub Z keeps the remainder after fitting on Z.

The residual-maker is symmetric, meaning its transpose equals itself, and idempotent, meaning that applying it twice changes nothing further. It also removes Z exactly. Minimising the full squared-error criterion over the coefficients on Z therefore leaves a criterion using M sub Z times y and M sub Z times x. Its one-regressor normal equation gives the displayed FWL coefficient. This proves the coefficient identity, while uncertainty still needs assumptions about error variation and an accounting of every fitted coefficient.

\(P_Z=Z(Z\prime Z)^{-1}Z\prime\), \(M_Z=I-P_Z\); \(M_ZZ=0\).

\(M_Z\prime=M_Z\), \(M_Z^2=M_Z\).

\(\widehat\beta_x=(x\prime M_Zx)^{-1}x\prime M_Zy\).

### 30. The estimator-error identity shows where unbiasedness comes from

Separate the algebra from the conditional-mean assumption.

Substitute y equals X beta plus u into the OLS formula. The result is the true coefficient vector plus X prime X inverse times X prime u. Conditional on the entire design matrix, the matrix weights are fixed. If the error vector has conditional mean zero, the added term averages to zero, giving conditional unbiasedness.

This conclusion requires full rank and the stated sampling and mean assumptions. It does not require normally distributed errors or equal error variances. The weights multiply the observed outcomes linearly, which is the meaning of linear estimator in the later efficiency result. A model can be linear in unknown coefficients even when its regressors contain logs, squares or products.

\(\widehat\beta-\beta=(X\prime X)^{-1}X\prime u\).

\(E[u\mid X]=0\Rightarrow E[\widehat\beta\mid X]=\beta\).

Linearity of the estimator in outcomes and linearity of the model in parameters are distinct statements.

### 31. The conventional variance formula uses usable regressor variation

Make the assumptions behind the precision calculation explicit.

Suppose errors have conditional variance sigma squared, are uncorrelated across observations, and have zero mean conditional on the design. Equal conditional variances are called homoskedasticity. A covariance matrix collects the coefficient variances on its diagonal and the pairwise covariances off that diagonal. The covariance matrix of OLS is then sigma squared times X prime X inverse. For a particular regressor j, its variance can also be written using its total centred variation and the R squared from regressing it on the other inputs.

As that auxiliary R squared approaches one, less separate variation remains and the coefficient becomes less precise. Estimate sigma squared by residual sum of squares divided by n minus p, where p counts every fitted coefficient including the intercept. The conventional standard error is the square root of the corresponding estimated variance. Later, unequal variance and dependence will change this covariance formula.

If \(\operatorname{Var}(u\mid X)=\sigma^2I\), \(\operatorname{Var}(\widehat\beta\mid X)=\sigma^2(X\prime X)^{-1}\).

\(\operatorname{Var}(\widehat\beta_j\mid X)=\dfrac{\sigma^2}{SST_j(1-R_j^2)}\), \(SST_j=\sum_i(X_{ij}-\overline X_j)^2\).

\(s^2=SSR/(n-p)\), \(SE_j=\sqrt{s^2[(X\prime X)^{-1}]_{jj}}\).

### 32. Best linear unbiased has a precise comparison class

An efficiency theorem is conditional on a model and a class of estimators.

The Gauss–Markov result compares OLS with other estimators that are linear combinations of the observed outcomes and unbiased conditional on the design matrix. Under zero conditional mean, full rank and error covariance sigma squared I, OLS has the smallest conditional variance in that class. BLUE abbreviates best linear unbiased estimator.

The result does not compare every conceivable biased or nonlinear procedure, and it does not establish the causal validity of the coefficient. With unequal error variances, OLS can remain unbiased while losing this efficiency guarantee. The appropriate response depends on whether we want a covariance correction or have a credible variance model for weighting. A smaller reported standard error does not by itself validate either choice.

BLUE: best linear unbiased estimator under the stated mean, rank and covariance assumptions.

“Best” means minimum conditional variance within the linear unbiased class.

Normality is not needed for this theorem.

### 33. Collinearity

Try the comparison before opening the explanation.

Two controls are highly correlated but neither is an exact linear combination of the others. Does this alone create omitted-variable bias?

Ask whether X still changes after the other regressors have been accounted for. Lack of separate variation is the key issue.

**Practice:** Two controls are highly correlated but neither is an exact linear combination of the others. Does this alone create omitted-variable bias?

### 34. Collinearity: explanation

Follow the calculation and interpret its units.

No. Under exogeneity, it need not bias OLS. It can reduce precision because there is little independent regressor variation. Exact collinearity is different: a separate coefficient is not identified in that specification.

No. Under exogeneity, it need not bias OLS. It can reduce precision because there is little independent regressor variation. Exact collinearity is different: a separate coefficient is not identified in that specification.

### 35. Make the computation reproducible

The same sample and control set are essential.

The do-file fits the full model, saves the staffing coefficient, creates both supporting-regression residuals and checks the final slope. Use the same controls and observations in every step. A different missing-value sample would change the identity being checked. Name the saved residual variables so that another reader can tell which predictors were removed.

For a reproducible coefficient calculation, retain the data definitions, sample, equation and exact commands. For a causal interpretation, add the separate argument about why the remaining staffing variation is comparable. The next meeting adds uncertainty calculations to this record. A reader should be able to reproduce the arithmetic and distinguish it from the assumptions supplied by the researcher.

Record the sample, control columns, residual definitions and coefficient check.

Reproducibility of a calculation does not establish its causal assumptions.

### 36. DAG practice: partialling out and hidden needs

Trace the routes before choosing a control.

The observed allocation rule R helps explain staffing. Unmeasured needs U affect both staffing and scores. After residualising staffing and scores on R, has the graph-based identification problem necessarily disappeared? State the route and distinguish the calculation from the assumption.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** The observed allocation rule R helps explain staffing. Unmeasured needs U affect both staffing and scores. After residualising staffing and scores on R, has the graph-based identification problem necessarily disappeared? State the route and distinguish the calculation from the assumption.

### 37. DAG practice: partialling out and hidden needs: explanation

Explain what conditioning changes in this stated graph.

The route \(X\leftarrow U\rightarrow Y\) is still open. Removing the fitted contributions of R does not condition on the unobserved common cause U. The FWL coefficient identity can hold exactly while that identification problem remains.

Residualisation describes which observed linear variation drives a coefficient. Exogeneity concerns whether the remaining comparison is unrelated to relevant omitted outcome determinants under the model. Those are different statements. A clear empirical report can verify the first by calculation while explaining why the second is, or is not, credible.

The route \(X\leftarrow U\rightarrow Y\) is still open. Removing the fitted contributions of R does not condition on the unobserved common cause U. The FWL coefficient identity can hold exactly while that identification problem remains. Residualisation describes which observed linear variation drives a coefficient. Exogeneity concerns whether the remaining comparison is unrelated to relevant omitted outcome determinants under the model. Those are different statements. A clear empirical report can verify the first by calculation while explaining why the second is, or is not, credible.

