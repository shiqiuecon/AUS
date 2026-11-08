# 03. OLS assumptions and partialling out

## 01. What does holding other things fixed mean?

Show the comparison left after observed controls are removed.

The longer staffing regression compared districts at fixed language composition and income. Today we will see how OLS constructs that adjusted comparison. The method is called partialling out, or residualisation: remove the part of a variable predicted by selected controls, then study the remainder.

This is useful when a coefficient table hides the source of variation. We will apply the method to actual district scores and staffing ratios. A numerical equality will show that the partialled regression reproduces the full-model slope. The equality explains estimation; separate assumptions are still needed to interpret that slope as a causal policy effect.

## 02. Recall why the short slope moved

A raw comparison can mix several observed differences.

In the previous lesson, the short staffing slope combined the staffing relationship with an omitted language-composition contribution. Adding income changed the fitted comparison further. Begin by explaining why the sample must stay fixed when studying those movements.

Then identify what is left to understand. We can write a full equation and read its staffing coefficient, but we have not yet seen which pairs of district differences drive that coefficient. Residualisation answers this question by comparing deviations from what the controls predict. These deviations are not newly randomised observations. They remain values calculated from the same observational sample.

In the previous lesson, the short staffing slope combined the staffing relationship with an omitted language-composition contribution.

Then identify what is left to understand.

## 03. The full model sets the target coefficient

Define every component before removing controls.

Let Y be district test score, X the student–teacher ratio, Z language composition and W income. The full linear regression includes an intercept and all three regressors. Its coefficient on X is the fitted staffing slope at fixed Z and W.

For this estimation exercise, assume all included variables are observed on the same districts and no regressor is an exact linear combination of the others. Exact linear dependence is perfect multicollinearity; it prevents a separate coefficient from being estimated. Causal interpretation also needs a suitable population error restriction, such as a zero conditional mean given the included variables.

\(Y_i=\beta_0+\beta_1X_i+\beta_2Z_i+\beta_3W_i+u_i\)

\(E(u_i\mid X_i,Z_i,W_i)=0\) for the stated mean model

## 04. OLS solves a sample optimisation

Its residual identities follow from the fitted model.

OLS chooses coefficients to minimize the sum of squared residuals. At the chosen coefficients, a small change in the intercept cannot lower that loss. The corresponding condition makes the residuals add to zero. A small change in an included slope likewise gives a zero sum of that regressor multiplied by the fitted residuals.

These conditions are called the normal equations, the equations characterizing the least-squares solution. Their name imposes no particular distributional shape on the errors. They hold because of how the coefficients are chosen. They cannot test whether an included regressor was related to an unobserved population error before the fit. The next slide names and explains the zero product-sum property directly.

\(\sum_i e_i=0\)

\(\sum_i X_i e_i=0\) for each included regressor.

## 05. Sample orthogonality is mechanical

Population exogeneity is a substantive assumption.

OLS chooses coefficients to minimize the sum of squared residuals. With an intercept, its fitted residuals add to zero. It also makes the sum of regressor-times-residual products zero for each included regressor. This zero product-sum is called sample orthogonality. It describes how the fitted residuals line up with the columns used to fit the model.

For example, a residual can be positive at one staffing value and negative at another, with the weighted products balancing exactly. That balance follows from the optimization even if omitted learning needs affected staffing choices. The unobserved population errors need not have the corresponding zero conditional mean. A mechanical feature of a fit cannot verify the assignment assumption required for a causal interpretation.

\(\sum_i e_i=0\), \(\sum_i X_i e_i=0\) with an OLS intercept

Orthogonality here means a zero sum of paired products.

## 06. Residual versus error

Try the comparison before opening the explanation.

OLS with an intercept gives residuals summing to zero. Does that verify \(E(u\mid X)=0\) in the population?

Use what is observed after fitting to distinguish a residual from the unobserved population error.

**Practice:** OLS with an intercept gives residuals summing to zero. Does that verify \(E(u\mid X)=0\) in the population?

## 07. Residual versus error: explanation

Follow the calculation and interpret its units.

No. The zero residual sum is a normal-equation identity imposed by least squares. The unobserved population error and its relation to X are a substantive assumption. OLS can satisfy its sample identities in a badly confounded model.

No. The zero residual sum is a normal-equation identity imposed by least squares. The unobserved population error and its relation to X are a substantive assumption. OLS can satisfy its sample identities in a badly confounded model.

## 08. First remove controls from the outcome

Save the score differences the controls do not predict.

To isolate the score variation beyond the controls, first fit score using language share, income and an intercept, leaving staffing out. For each district, subtract this fitted score from its observed score. Call the resulting score remainder rY. It is measured in score points and can be positive or negative.

The hat over the linear prediction in the displayed notation means an estimated value from that supporting regression. It does not claim that every feature of the true conditional mean is exactly linear. This first subtraction removes the part that the specified control columns reproduce in the sample. We next perform a matching subtraction for staffing; both must use the same observations and controls.

Fit score on the control columns; save \(rY_i=Y_i-\widehat Y_{i,controls}\).

rY remains in score points.

## 09. Then remove the same controls from staffing

An adjusted outcome must be compared with an adjusted regressor.

Regress X on the same intercept, Z and W and save rX. It tells us whether a district has more or fewer students per teacher than those controls predict. The controls, observations and linear fitting rule must match those used to residualise Y.

Removing controls only from Y is not the same calculation. The raw X still contains its relationships with Z and W. The adjusted slope uses the part of X left after those relationships are accounted for. This step explains why 'controlling for income' does more than subtract one fitted number from the outcome.

\(rX_i=X_i-\widehat E_{\mathrm{linear}}(X_i\mid Z_i,W_i)\)

## 10. Follow one district through both subtractions

The residual plot uses actual score points and staffing units.

Use the first district in the exported data. Its observed score is 690.80 and its staffing ratio is 17.89. The regression on language share, income and an intercept predicts a score of 672.92. Subtracting gives a score remainder rY of about 17.88 points. A separate regression of staffing on those same controls predicts a ratio of 19.06; subtracting gives rX of about -1.17 students per teacher. These displayed values are rounded; the stored calculations retain full precision.

That district appears on the residual plot at horizontal coordinate -1.17 and vertical coordinate 17.88. It has fewer students per teacher and a higher score than its controls predict. Zero on either residual axis means equal to the control-based prediction, not a zero score or no teachers. We now fit the relationship between the two remainders, using all districts.

Actual first district: \(rY\approx690.80-672.92=17.88\) score points.

\(rX\approx17.89-19.06=-1.17\) students per teacher.

## 11. Regress the two remainders on each other

The partialled slope equals the full-model staffing slope.

Now regress rY on rX without an intercept. The Frisch–Waugh–Lovell theorem, usually abbreviated FWL, states that this slope equals the coefficient on X in the full regression with the same controls and observations. Both residual series already have mean zero because their supporting regressions included intercepts.

The theorem is an estimation identity. It shows that the staffing coefficient is driven by covariation between outcome and staffing after their fitted control contributions are removed. It does not say the remaining staffing variation is random. Draw the residual scatterplot and compare its slope with the raw staffing-score plot to see how the available comparison has changed.

\(\widehat\beta_1=\dfrac{\sum_i rX_i rY_i}{\sum_i rX_i^2}\)

## 12. Read the full regression first

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

## 13. Verify the FWL identity in Stata

The slopes agree to numerical precision.

The residual-on-residual coefficient matches the staffing coefficient in the full regression. This is the Frisch–Waugh–Lovell result, usually abbreviated FWL. It is an exact least-squares identity when both subtractions use the same observations and control columns as the full fit. The residual regression needs no extra intercept because both remainders already have zero means.

 The identity concerns the coefficient. A separate manual residual regression can print a different standard error because it can use different assumptions about error spread and a different count of fitted coefficients. A standard error describes uncertainty across repeated samples; we teach that calculation in the next meeting. For now, verify the coefficient identity and explain the two residual axes. Use the full fitted model when later requesting its uncertainty estimates.

FWL: the same adjusted coefficient from compatible residuals.

A coefficient identity does not make every printed uncertainty calculation identical.

```text
. quietly regress ry rx, noconstant

. matrix list e(b), format(%10.6f)

symmetric e(b)[1,1]
           rx
y1  -0.068776
```

## 14. Read the residual axes in real units

They are deviations, not new measurements.

The horizontal axis measures students per teacher above or below the level predicted by the controls. The vertical axis measures score points above or below its predicted baseline. A point at zero on one axis does not mean the district has zero students or a zero test score.

The fitted line summarises how these adjusted deviations move together. Its slope retains units of score points per additional student per teacher. Use the graph to explain which variation the full coefficient uses, then ask whether that variation is plausibly unrelated to omitted learning determinants. The residual plot makes the question visible but does not answer it automatically.

## 15. Partialling out

Try the comparison before opening the explanation.

To estimate the schooling coefficient controlling for experience, describe the FWL procedure in words.

Name both variables that are residualised and list the identical controls used in both subtractions.

**Practice:** To estimate the schooling coefficient controlling for experience, describe the FWL procedure in words.

## 16. Partialling out: explanation

Follow the calculation and interpret its units.

Regress wages on an intercept and experience and save the residuals. Regress schooling on the same intercept and experience and save those residuals. Regress wage residuals on schooling residuals without another intercept. Its slope equals the schooling coefficient in the full regression on the same observations. Both subtractions must remove exactly the same control columns.

Regress wages on an intercept and experience and save the residuals. Regress schooling on the same intercept and experience and save those residuals. Regress wage residuals on schooling residuals without another intercept. Its slope equals the schooling coefficient in the full regression on the same observations. Both subtractions must remove exactly the same control columns.

## 17. Unbiasedness concerns repeated samples

It does not promise an accurate estimate in every sample.

Imagine repeating the sampling process and estimating the same target each time. An estimator is unbiased if its average over these repetitions equals the target. It does not have to equal the target in any particular sample. Consider a target of one. Suppose one estimator produces 0.7, 1.0 and 1.3 equally often, while another produces zero, one and two equally often. Both average to one.

The first estimator varies less. Its variance, the average squared deviation from its mean, is 0.06; the second variance is two thirds. Precision refers to this spread, so two unbiased estimators can have different precision. Under independent sampling, a correctly specified linear mean, sufficient separate regressor variation and a zero conditional-mean error, OLS is unbiased. These assumptions concern the population and sampling process rather than the fitted residual identities.

Unbiased: repeated-sample average equals the target.

Variance: average squared distance from that average.

Two unbiased procedures can have different precision.

## 18. Precision depends on usable regressor variation

Little variation after adjustment means a weak comparison.

Suppose most staffing variation is already predicted by income and language composition. Then rX has little variation. The FWL slope divides by the sum of squared rX values, so small remaining variation can make the estimate sensitive to outcome noise.

This is one reason a control may increase an SE even when it helps address confounding. The analyst is asking a more specific comparison and may have fewer independent differences available to answer it. Precision and credibility can move in different directions. Explain that trade-off instead of dropping a substantively needed control solely to obtain a smaller SE.

Usable variation: \(\sum_i rX_i^2\)

## 19. Multicollinearity reduces separate information

High correlation is different from exact dependence.

Multicollinearity describes strong linear relationships among regressors. With exact dependence, separate coefficients cannot be estimated. With strong but imperfect relationships, OLS can still be unbiased under exogeneity, but some coefficients may be imprecise because little independent variation remains.

For example, including income measured in dollars and the same income divided by one thousand creates exact dependence. Including income and a related but distinct education measure creates a different issue. The first is a redundant equation; the second may be a legitimate but demanding comparison. Always connect the numerical diagnostic to the variables' definitions.

Multicollinearity describes strong linear relationships among regressors.

For example, including income measured in dollars and the same income divided by one thousand creates exact dependence.

## 20. Efficiency needs additional error assumptions

Small variance is a comparison among estimators.

To compare precision, specify which estimators and assumptions are being compared. In the Gauss–Markov result, linear estimators are weighted sums of the observed outcomes, with weights determined by the regressors. Unbiased means that their repeated-sample averages equal the coefficient target. Among this class, OLS has the smallest variance under the theorem's assumptions.

Those assumptions include the correct linear mean and zero conditional-mean error, nonredundant regressor columns, and errors that are uncorrelated with each other and have the same variance given the regressors. Equal conditional error variance is called homoskedasticity. The theorem does not compare every possible estimator, establish a causal interpretation or make unequal-variance OLS coefficients automatically biased. We next study how to estimate uncertainty when the equal-variance condition is doubtful.

Linear unbiased estimators: weighted outcome sums with correct repeated-sample means.

Gauss–Markov adds equal error variance and no cross-observation error correlation.

## 21. Use VIF as a description, not a decision rule

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

## 22. Collinearity

Try the comparison before opening the explanation.

Two controls are highly correlated but neither is an exact linear combination of the others. Does this alone create omitted-variable bias?

Ask whether X still changes after the other regressors have been accounted for. Lack of separate variation is the key issue.

**Practice:** Two controls are highly correlated but neither is an exact linear combination of the others. Does this alone create omitted-variable bias?

## 23. Collinearity: explanation

Follow the calculation and interpret its units.

No. Under exogeneity, it need not bias OLS. It can reduce precision because there is little independent regressor variation. Exact collinearity is different: a separate coefficient is not identified in that specification.

No. Under exogeneity, it need not bias OLS. It can reduce precision because there is little independent regressor variation. Exact collinearity is different: a separate coefficient is not identified in that specification.

## 24. A residual is not an automatically valid control

Its construction does not establish a causal role.

Residualisation is a way to calculate an adjusted linear slope. It does not authorise adding any predicted or residual quantity to a causal model. If a control is affected by the policy or selected through a shared consequence, partialling it out may change the target or create an unwanted relationship.

Return to the control-selection discussion. First decide which comparison is justified by the economic timing and mechanism. Then use FWL to understand how that specified regression estimates its slope. The order matters: a precise computational identity cannot choose the causal model for us.

In this separate diagram, R is an observed staffing-allocation rule, while unmeasured learning needs U influence staffing and scores. Removing the fitted R component does not block the route through U. Residualisation is a calculation on the observed variables; it does not certify that the remaining variation is unrelated to every omitted outcome determinant.

## 25. Explain what the estimate uses

Describe the remaining comparison in ordinary language.

For the school application, say that the staffing coefficient uses variation in student–teacher ratios left after their linear relationships with income and language composition are accounted for. It relates that variation to similarly adjusted scores. This explanation is more informative than saying only that we 'ran a multiple regression'.

Then state the remaining assumption: the adjusted staffing variation must not be related to relevant unobserved determinants in the way ruled out by the chosen error restriction. Readers can now distinguish the calculation from the design claim. They can also see why a small amount of remaining variation may limit precision.

For the school application, say that the staffing coefficient uses variation in student–teacher ratios left after their linear relationships with income and language composition are accounted for.

Then state the remaining assumption: the adjusted staffing variation must not be related to relevant unobserved determinants in the way ruled out by the chosen error restriction.

## 26. Make the computation reproducible

The same sample and control set are essential.

The do-file fits the full model, saves the staffing coefficient, creates both supporting-regression residuals and checks the final slope. Use the same controls and observations in every step. A different missing-value sample would change the identity being checked. Name the saved residual variables so that another reader can tell which predictors were removed.

For a reproducible coefficient calculation, retain the data definitions, sample, equation and exact commands. For a causal interpretation, add the separate argument about why the remaining staffing variation is comparable. The next meeting adds uncertainty calculations to this record. A reader should be able to reproduce the arithmetic and distinguish it from the assumptions supplied by the researcher.

Record the sample, control columns, residual definitions and coefficient check.

Reproducibility of a calculation does not establish its causal assumptions.

## 27. DAG practice: partialling out and hidden needs

Trace the routes before choosing a control.

The observed allocation rule R helps explain staffing. Unmeasured needs U affect both staffing and scores. After residualising staffing and scores on R, has the graph-based identification problem necessarily disappeared? State the route and distinguish the calculation from the assumption.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** The observed allocation rule R helps explain staffing. Unmeasured needs U affect both staffing and scores. After residualising staffing and scores on R, has the graph-based identification problem necessarily disappeared? State the route and distinguish the calculation from the assumption.

## 28. DAG practice: partialling out and hidden needs: explanation

Explain what conditioning changes in this stated graph.

The route \(X\leftarrow U\rightarrow Y\) is still open. Removing the fitted contributions of R does not condition on the unobserved common cause U. The FWL coefficient identity can hold exactly while that identification problem remains.

Residualisation describes which observed linear variation drives a coefficient. Exogeneity concerns whether the remaining comparison is unrelated to relevant omitted outcome determinants under the model. Those are different statements. A clear empirical report can verify the first by calculation while explaining why the second is, or is not, credible.

The route \(X\leftarrow U\rightarrow Y\) is still open. Removing the fitted contributions of R does not condition on the unobserved common cause U. The FWL coefficient identity can hold exactly while that identification problem remains. Residualisation describes which observed linear variation drives a coefficient. Exogeneity concerns whether the remaining comparison is unrelated to relevant omitted outcome determinants under the model. Those are different statements. A clear empirical report can verify the first by calculation while explaining why the second is, or is not, credible.

## 29. Verify partialling out without misusing its SE

Reproduce the evidence, then explain its economic meaning.

Run the partialling-out code and compare the full-model staffing coefficient with the coefficient from regressing rY on rX. Then describe what one point on the residual plot measures. Both subtractions must use language share, income and an intercept on the same districts.

The full log also prints standard errors. Treat them as estimates of repeated-sample spread, which the next meeting develops. The FWL exercise establishes an algebraic identity for the coefficient, not permission to use any manual regression's uncertainty calculation for the full model. Record the matching coefficients and state why residualisation does not remove an unobserved common cause.

Replace income by log income in both residualising equations and in the full model. Verify the new slope identity and report uncertainty from the complete model. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Replace income by log income in both residualising equations and in the full model. Verify the new slope identity and report uncertainty from the complete model. Keep your commands, log, output and interpretation.

## 30. Verify partialling out without misusing its SE: explanation

A reproducible result needs both a calculation and an interpretation.

The residual staffing coefficient and the full-model staffing coefficient both equal about −0.068776 on the same observations. rx measures staffing minus its fitted prediction from the controls; ry measures score minus its prediction from those same controls.

The manual fit prints standard error 0.275915, while the full fit prints 0.290160. These use different uncertainty procedures. A standard error estimates repeated-sample spread; FWL guarantees the coefficient identity without guaranteeing that every manual spread calculation matches. Use the complete model’s justified uncertainty calculation when reporting that model. Neither matching coefficients nor small residuals establish a causal staffing comparison.

The full and partialled staffing slopes both equal -0.385338 on 420 districts. The full-model robust SE is 0.289855. Removing different control columns would not be the same FWL calculation.

Original staffing slope: \(-0.068776\).

Using log income: \(-0.385338\), full-model robust SE \(0.289855\).

FWL requires the same control columns in both residualising fits.

## 31. Next, measure uncertainty around the estimate

A valid calculation still needs an uncertainty statement.

We have traced how OLS constructs a coefficient, distinguished fitted residual identities from population-error assumptions, and used FWL to see the adjusted comparison. We also saw why little separate regressor variation can make the coefficient less precise.

The next question is how much this estimate would change across comparable samples. We will build an uncertainty statement from that repeated-sample idea and connect it to a decision a ministry could make. Keep today's outcome units, staffing contrast and causal assumptions in view. They determine what the estimate means before we assess how accurately the sample has measured it.

Computation: which observed variation determines the coefficient?

Next: how much would that estimate vary across samples?

