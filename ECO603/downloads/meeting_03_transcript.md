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

OLS chooses coefficients to minimise the sum of squared residuals. In a model with an intercept, changing that intercept slightly cannot reduce the loss at the solution. This yields a zero sum of residuals. Changing an included slope similarly yields a zero sum of the regressor multiplied by residuals.

These conditions are called normal equations: the equations characterising the least-squares solution. The word normal here does not require normally distributed errors. They hold because of how the coefficients were chosen. They therefore cannot test whether a regressor was related to an unobserved population error before fitting the model.

\(\sum_i e_i=0\)

\(\sum_i X_i e_i=0\) for an included regressor

## 05. Sample orthogonality is mechanical

Population exogeneity is a substantive assumption.

Orthogonality means a zero inner product; here it is the zero sum of an included regressor times the OLS residual. We can verify it from the fitted data. Exogeneity instead concerns the required lack of relation between regressors and the unobserved population error.

Suppose recruitment responds to learning needs not captured by Z and W. OLS still produces residuals orthogonal to X, yet the policy comparison can remain confounded. Explain why these statements are compatible. This distinction matters whenever an analyst claims that a tidy residual calculation proves a model is causal. The calculation verifies the optimisation, while the design argument justifies the population interpretation.

Orthogonality means a zero inner product; here it is the zero sum of an included regressor times the OLS residual.

Suppose recruitment responds to learning needs not captured by Z and W.

## 06. Residual versus error

Apply the idea before reading the solution.

OLS with an intercept gives residuals summing to zero. Does that verify \(E(u\mid X)=0\) in the population?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** OLS with an intercept gives residuals summing to zero. Does that verify \(E(u\mid X)=0\) in the population?

## 07. Residual versus error: explanation

Connect the calculation to the empirical claim.

No. The zero residual sum is a normal-equation identity imposed by least squares. The unobserved population error and its relation to X are a substantive assumption. OLS can satisfy its sample identities in a badly confounded model.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

No. The zero residual sum is a normal-equation identity imposed by least squares. The unobserved population error and its relation to X are a substantive assumption. OLS can satisfy its sample identities in a badly confounded model.

## 08. First remove controls from the outcome

Save the score differences the controls do not predict.

Regress Y on an intercept, Z and W, leaving X out of this supporting regression. Save the residual for each district and call it rY. A positive value means the district scores above what its measured language composition and income predict; a negative value means below that prediction.

The residual is a deviation from a fitted baseline, not a measure of innate quality or causal teacher effectiveness. Its interpretation depends on the controls and functional form used. Keeping that qualification explicit lets us use residualisation as a transparent calculation without giving the residual a stronger substantive meaning than the data support.

The hat over the conditional-mean expression denotes a fitted linear prediction. It is the value predicted by the regression on the listed controls, rather than a claim that the population mean must be exactly linear.

\(rY_i=Y_i-\widehat E_{\mathrm{linear}}(Y_i\mid Z_i,W_i)\)

\(\widehat E_{\mathrm{linear}}\): fitted linear prediction

## 09. Then remove the same controls from staffing

An adjusted outcome must be compared with an adjusted regressor.

Regress X on the same intercept, Z and W and save rX. It tells us whether a district has more or fewer students per teacher than those controls predict. The controls, observations and linear fitting rule must match those used to residualise Y.

Removing controls only from Y is not the same calculation. The raw X still contains its relationships with Z and W. The adjusted slope uses the part of X left after those relationships are accounted for. This step explains why 'controlling for income' does more than subtract one fitted number from the outcome.

\(rX_i=X_i-\widehat E_{\mathrm{linear}}(X_i\mid Z_i,W_i)\)

## 10. Regress the two remainders on each other

The partialled slope equals the full-model staffing slope.

Now regress rY on rX without an intercept. The Frisch–Waugh–Lovell theorem, usually abbreviated FWL, states that this slope equals the coefficient on X in the full regression with the same controls and observations. Both residual series already have mean zero because their supporting regressions included intercepts.

The theorem is an estimation identity. It shows that the staffing coefficient is driven by covariation between outcome and staffing after their fitted control contributions are removed. It does not say the remaining staffing variation is random. Draw the residual scatterplot and compare its slope with the raw staffing-score plot to see how the available comparison has changed.

\(\widehat\beta_1=\dfrac{\sum_i rX_i rY_i}{\sum_i rX_i^2}\)

## 11. Read the full regression first

Keep its covariance calculation for inference.

The full model gives a staffing coefficient of -0.069 with robust SE 0.290. The estimate is close to zero in this specification. That is a result about the adjusted observational comparison, rather than proof that a staffing intervention can never matter.

This table is the appropriate starting point for inference about the full fitted model. It uses its complete regressor set and stated covariance option. We will compare the partialled coefficient next, but will not replace this robust SE with the unadjusted SE printed by a manually reconstructed regression.

```text
. regress score str el income, vce(robust)

------------------------------------------------------------------------------
             |               Robust
       score | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         str |  -.0687755   .2901597    -0.24   0.813    -.6391376    .5015865
          el |  -.4882667   .0281161   -17.37   0.000     -.543534   -.4329995
      income |   1.494517     .09156    16.32   0.000     1.314539    1.674495
       _cons |   640.3155   5.991918   106.86   0.000     628.5373    652.0937
------------------------------------------------------------------------------
```

## 12. Verify the FWL identity in Stata

The slopes agree to numerical precision.

The residual-on-residual slope is -0.069, matching the full staffing slope. The do-file verifies their difference is smaller than a stated numerical tolerance. This is a stronger calculation check than comparing two rounded values on a slide.

The displayed SEs need not match. The manual regression has a different residual degrees-of-freedom calculation and here uses a different covariance option. FWL gives the coefficient identity; correct inference must also account for the complete fitting procedure. For an applied report, use the original full regression with the covariance treatment justified for the data.

```text
. regress ry rx, noconstant

------------------------------------------------------------------------------
          ry | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
          rx |  -.0687755   .2759147    -0.25   0.803    -.6111251     .473574
------------------------------------------------------------------------------
```

## 13. Read the residual axes in real units

They are deviations, not new measurements.

The horizontal axis measures students per teacher above or below the level predicted by the controls. The vertical axis measures score points above or below its predicted baseline. A point at zero on one axis does not mean the district has zero students or a zero test score.

The fitted line summarises how these adjusted deviations move together. Its slope retains units of score points per additional student per teacher. Use the graph to explain which variation the full coefficient uses, then ask whether that variation is plausibly unrelated to omitted learning determinants. The residual plot makes the question visible but does not answer it automatically.

## 14. Partialling out

Apply the idea before reading the solution.

To estimate the schooling coefficient controlling for experience, describe the FWL procedure in words.

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** To estimate the schooling coefficient controlling for experience, describe the FWL procedure in words.

## 15. Partialling out: explanation

Connect the calculation to the empirical claim.

Regress wages on an intercept and experience and save residuals. Regress schooling on an intercept and experience and save residuals. Regress the wage residual on the schooling residual (without an intercept). Its slope equals the schooling coefficient in the full regression. Standard-error reconstruction requires appropriate degrees of freedom and covariance treatment; the slope identity alone is the core result.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Regress wages on an intercept and experience and save residuals. Regress schooling on an intercept and experience and save residuals. Regress the wage residual on the schooling residual (without an intercept). Its slope equals the schooling coefficient in the full regression. Standard-error reconstruction requires appropriate degrees of freedom and covariance treatment; the slope identity alone is the core result.

## 16. Unbiasedness concerns repeated samples

It does not promise an accurate estimate in every sample.

An estimator is unbiased if its average value across repeated samples equals the target population coefficient. Under a suitable linear mean model, random sampling, sufficient regressor variation and zero conditional mean, OLS has this property. Each particular sample can still produce a higher or lower estimate.

Do not confuse the expected value of an estimator with an observed outcome. We usually observe one dataset, so uncertainty remains even when the assumptions justify unbiasedness. Later large-sample theory will address consistency, a different question about what happens as sample size increases. Today focus on which assumptions make the repeated-sample statement meaningful.

\(E(\widehat\beta_1)=\beta_1\) under the stated assumptions

## 17. Precision depends on usable regressor variation

Little variation after adjustment means a weak comparison.

Suppose most staffing variation is already predicted by income and language composition. Then rX has little variation. The FWL slope divides by the sum of squared rX values, so small remaining variation can make the estimate sensitive to outcome noise.

This is one reason a control may increase an SE even when it helps address confounding. The analyst is asking a more specific comparison and may have fewer independent differences available to answer it. Precision and credibility can move in different directions. Explain that trade-off instead of dropping a substantively needed control solely to obtain a smaller SE.

Usable variation: \(\sum_i rX_i^2\)

## 18. Multicollinearity reduces separate information

High correlation is different from exact dependence.

Multicollinearity describes strong linear relationships among regressors. With exact dependence, separate coefficients cannot be estimated. With strong but imperfect relationships, OLS can still be unbiased under exogeneity, but some coefficients may be imprecise because little independent variation remains.

For example, including income measured in dollars and the same income divided by one thousand creates exact dependence. Including income and a related but distinct education measure creates a different issue. The first is a redundant equation; the second may be a legitimate but demanding comparison. Always connect the numerical diagnostic to the variables' definitions.

Multicollinearity describes strong linear relationships among regressors.

For example, including income measured in dollars and the same income divided by one thousand creates exact dependence.

## 19. Use VIF as a description, not a decision rule

It measures linear overlap among included regressors.

The variance inflation factor, VIF, summarises how strongly one regressor is linearly predicted by the others. In the conventional homoskedastic formula it equals one divided by one minus the R-squared from that supporting regression. A high value signals little remaining independent variation.

There is no universal VIF threshold that tells us a causal model is valid or invalid. A needed confounder should not be removed automatically because a diagnostic is large. Consider whether coefficients are separately interpretable, how uncertain they are and whether another design or more informative data could improve the comparison.

The subscript j identifies one explanatory variable. Here R-j-squared is the R-squared from regressing that variable on all the other included explanatory variables and an intercept.

\(\mathrm{VIF}_j=\dfrac{1}{1-R_j^2}\)

\(R_j^2\): fit from predicting regressor \(j\) with the other regressors

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

## 20. Efficiency needs additional error assumptions

Small variance is a comparison among estimators.

Efficiency means having less sampling variance than competing estimators within a stated comparison class. The Gauss–Markov result says OLS has the smallest variance among linear unbiased estimators under the classical constant-variance conditions and appropriate error assumptions.

This does not mean OLS is always best for every task or every dataset. Unequal variance changes the efficiency comparison, and endogeneity threatens the target itself. Nor does efficiency guarantee a small SE in a particular weakly informative sample. State the assumptions and the comparison class when using the term, rather than treating it as a general compliment for a regression.

Efficiency means having less sampling variance than competing estimators within a stated comparison class.

This does not mean OLS is always best for every task or every dataset.

## 21. A residual is not an automatically valid control

Its construction does not establish a causal role.

Residualisation is a way to calculate an adjusted linear slope. It does not authorise adding any predicted or residual quantity to a causal model. If a control is affected by the policy or selected through a shared consequence, partialling it out may change the target or create an unwanted relationship.

Return to the control-selection discussion. First decide which comparison is justified by the economic timing and mechanism. Then use FWL to understand how that specified regression estimates its slope. The order matters: a precise computational identity cannot choose the causal model for us.

In this separate diagram, R is an observed staffing-allocation rule, while unmeasured learning needs U influence staffing and scores. Removing the fitted R component does not block the route through U. Residualisation is a calculation on the observed variables; it does not certify that the remaining variation is unrelated to every omitted outcome determinant.

## 22. Collinearity

Apply the idea before reading the solution.

Two controls are highly correlated but neither is an exact linear combination of the others. Does this alone create omitted-variable bias?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Two controls are highly correlated but neither is an exact linear combination of the others. Does this alone create omitted-variable bias?

## 23. Collinearity: explanation

Connect the calculation to the empirical claim.

No. Under exogeneity, it need not bias OLS. It can reduce precision because there is little independent regressor variation. Exact collinearity is different: a separate coefficient is not identified in that specification.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

No. Under exogeneity, it need not bias OLS. It can reduce precision because there is little independent regressor variation. Exact collinearity is different: a separate coefficient is not identified in that specification.

## 24. Explain what the estimate uses

Describe the remaining comparison in ordinary language.

For the school application, say that the staffing coefficient uses variation in student–teacher ratios left after their linear relationships with income and language composition are accounted for. It relates that variation to similarly adjusted scores. This explanation is more informative than saying only that we 'ran a multiple regression'.

Then state the remaining assumption: the adjusted staffing variation must not be related to relevant unobserved determinants in the way ruled out by the chosen error restriction. Readers can now distinguish the calculation from the design claim. They can also see why a small amount of remaining variation may limit precision.

For the school application, say that the staffing coefficient uses variation in student–teacher ratios left after their linear relationships with income and language composition are accounted for.

Then state the remaining assumption: the adjusted staffing variation must not be related to relevant unobserved determinants in the way ruled out by the chosen error restriction.

## 25. Make the computation reproducible

The same sample and control set are essential.

The do-file fits the full model, saves the staffing coefficient, creates both supporting-regression residuals and checks the final slope. Keep a clear list of controls and avoid allowing missing values to change the sample between steps. Use saved variable names that describe what each residual removes.

For reporting, retain the full model's chosen covariance estimate and the graph as an explanation of its identifying comparison. This produces a compact audit trail: data definitions, sample, equation, coefficient calculation, inference choice and substantive interpretation. The same habits will be useful when regressions become more complicated.

The do-file fits the full model, saves the staffing coefficient, creates both supporting-regression residuals and checks the final slope.

For reporting, retain the full model's chosen covariance estimate and the graph as an explanation of its identifying comparison.

## 26. DAG practice: partialling out and hidden needs

Trace the routes before choosing a control.

The observed allocation rule R helps explain staffing. Unmeasured needs U affect both staffing and scores. After residualising staffing and scores on R, has the graph-based identification problem necessarily disappeared? State the route and distinguish the calculation from the assumption.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** The observed allocation rule R helps explain staffing. Unmeasured needs U affect both staffing and scores. After residualising staffing and scores on R, has the graph-based identification problem necessarily disappeared? State the route and distinguish the calculation from the assumption.

## 27. DAG practice: partialling out and hidden needs: explanation

Explain what conditioning changes in this stated graph.

The route \(X\leftarrow U\rightarrow Y\) is still open. Removing the fitted contributions of R does not condition on the unobserved common cause U. The FWL coefficient identity can hold exactly while that identification problem remains.

Residualisation describes which observed linear variation drives a coefficient. Exogeneity concerns whether the remaining comparison is unrelated to relevant omitted outcome determinants under the model. Those are different statements. A clear empirical report can verify the first by calculation while explaining why the second is, or is not, credible.

The route \(X\leftarrow U\rightarrow Y\) is still open. Removing the fitted contributions of R does not condition on the unobserved common cause U. The FWL coefficient identity can hold exactly while that identification problem remains. Residualisation describes which observed linear variation drives a coefficient. Exogeneity concerns whether the remaining comparison is unrelated to relevant omitted outcome determinants under the model. Those are different statements. A clear empirical report can verify the first by calculation while explaining why the second is, or is not, credible.

## 28. Verify partialling out without misusing its SE

Reproduce the evidence, then explain its economic meaning.

Run meeting_03.do. Describe what rx and ry measure, compare the residual-on-residual staffing slope with the full-model slope, and compare their printed SEs. Explain which result you would use to report robust uncertainty about the full staffing model and why.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_03.do. Describe what rx and ry measure, compare the residual-on-residual staffing slope with the full-model slope, and compare their printed SEs. Explain which result you would use to report robust uncertainty about the full staffing model and why.

## 29. Verify partialling out without misusing its SE: explanation

A reproducible result needs both a calculation and an interpretation.

rx is staffing after removing its fitted relationship with the intercept, language share and income. ry is the score remainder after removing the same controls. The residual-on-residual slope is -0.068776, matching the full-model slope -0.068776.

The manual residual regression prints SE 0.275915; the full regression's robust SE is 0.290160. These are different covariance calculations. FWL guarantees the coefficient identity for compatible fits, while inference must also account for the complete regression and covariance procedure. Use the full regression with its justified robust option when reporting that model's uncertainty. A residual plot is useful for understanding the adjusted comparison, but it does not establish exogeneity.

rx is staffing after removing its fitted relationship with the intercept, language share and income. ry is the score remainder after removing the same controls. The residual-on-residual slope is -0.068776, matching the full-model slope -0.068776. The manual residual regression prints SE 0.275915; the full regression's robust SE is 0.290160. These are different covariance calculations. FWL guarantees the coefficient identity for compatible fits, while inference must also account for the complete regression and covariance procedure. Use the full regression with its justified robust option when reporting that model's uncertainty. A residual plot is useful for understanding the adjusted comparison, but it does not establish exogeneity.

## 30. Next, measure uncertainty around the estimate

A valid calculation still needs an uncertainty statement.

We have seen exactly how OLS constructs a coefficient and which sample identities it imposes. We also separated those identities from assumptions about the population error. FWL made the adjusted comparison visible, and multicollinearity explained why usable variation matters for precision.

The next lesson asks how much an estimate would vary across comparable samples. We will connect standard errors, confidence intervals and tests to an empirical decision, including the difference between a statistically detectable effect and an effect large enough to justify a policy. Keep the comparison and units from today's regression in view as we add that uncertainty analysis.

We have seen exactly how OLS constructs a coefficient and which sample identities it imposes.

The next lesson asks how much an estimate would vary across comparable samples.

