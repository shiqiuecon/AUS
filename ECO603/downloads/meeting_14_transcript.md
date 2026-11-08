# 14. Instrumental variables and two-stage least squares

## 01. Do higher cigarette prices reduce sales?

Price is chosen in a market, so its variation may be endogenous.

A state with high cigarette prices may also have strong anti-smoking attitudes or other policies affecting sales. A negative price–quantity association can therefore combine a demand response with differences in those omitted determinants. We want to isolate the price response in a stated demand equation rather than assign a causal meaning to every observed price difference.

Instrumental variables, abbreviated IV, uses a proposed outside source of regressor variation under explicit relevance and validity assumptions. Here that proposed source is a sales-tax component in the historical 48-state sample. We first define the outcome, price and tax units, then ask whether the tax predicts price and whether it has other relationships with demand. Finally we reconstruct the estimate from those relationships before interpreting its uncertainty and population meaning.

Question: isolate a demand response from other state differences.

IV: instrumental variables; the proposed source of price variation needs its own argument.

## 02. Define the demand equation and its units

A log price slope is an elasticity under the model.

Let log Q be log cigarette packs sold per person and log P the log real price. The structural equation represents the demand relationship we want to learn. Its price coefficient is an elasticity if that structural interpretation is justified: the proportional quantity response to a small proportional price change.

The error includes omitted demand influences. If price responds to those influences, price is endogenous in the demand equation. The observed OLS slope can then differ from the demand elasticity. Calling an equation structural means it is intended to represent an economic relationship with a specified intervention interpretation; writing that label does not establish identification.

\(\log Q_i=\alpha+\beta\log P_i+u_i\)

## 03. Relevance is the first instrument requirement

The instrument must move the endogenous regressor.

An instrument is a proposed source of regressor variation used to identify the target effect under additional assumptions. In the cigarette example, Z is a sales-tax component measured in real cents per pack; X is log price and Y log quantity. The first stage is the regression describing how log price varies with that tax component and any included exogenous controls.

Relevance means that Z predicts X after those controls: its population first-stage slope is nonzero. The notation pi zero is the intercept, pi one the tax slope and v the first-stage remainder. The first stage gives the scale of price variation associated with the instrument. It does not establish that tax differences are independent of omitted smoking demand or that taxes affect quantity only through the specified price measure. Those are the next requirements.

First stage: \(X=\pi_0+\pi_1Z+v\)

Relevance: \(\pi_1\ne0\)

\(Z\): real cents per pack; \(X=\log P\)

## 04. Exogeneity and exclusion justify the comparison

A strong first stage does not establish either condition.

Instrument exogeneity rules out a relationship between the instrument and the omitted structural demand determinants under the model. Tax differences linked to unobserved smoking attitudes would threaten it. Exclusion says that an intervention changing the instrument reaches quantity only through the specified price channel. For example, a tax-linked information campaign could add a direct demand channel and violate exclusion.

These restrictions do different jobs. In the DAG, the intended directed route runs from tax to price to quantity. A direct tax-to-quantity arrow violates exclusion; a common cause of tax and omitted demand threatens exogeneity. Together with relevance and an appropriate structural equation, the assumptions can justify the IV moment condition, zero covariance between Z and the structural error u. A strong first-stage relationship verifies neither substantive restriction.

Exogeneity: no instrument relationship with omitted structural demand causes.

Exclusion: no causal instrument-to-quantity channel bypassing price.

Required IV moment: \(\operatorname{Cov}(Z,u)=0\)

## 05. Derive the simple IV ratio

Compare how the instrument moves the outcome and the regressor.

Start with the constant-slope structural equation Y equal to alpha plus beta times X plus u. The first stage describes how X changes with Z. The reduced form is the relationship of Y directly to Z, using the same controls and observations. If the instrument changes X by pi one units per Z unit and has no other outcome channel, its outcome relationship is beta times pi one.

Thus the reduced-form slope rho equals beta times the first-stage slope pi one under the IV assumptions. Divide to recover beta when pi one is nonzero. In a sample, the simple just-identified IV estimate is the ratio of the two estimated slopes after matching their controls and sample. The units cancel: outcome per tax unit divided by log-price per tax unit becomes outcome per log-price unit. For log quantity and log price, that coefficient is an elasticity.

First stage: \(X=\pi_0+\pi_1Z+v\)

Reduced form: \(Y=c+\rho Z+\eta,\quad\rho=\beta\pi_1\)

\(\widehat\beta_{IV}=\widehat\rho/\widehat\pi_1\)

## 06. Wald ratio

Try the comparison before opening the explanation.

A proposed instrument increases treatment by 0.30 units; its reduced-form outcome coefficient is −0.09. Compute the simple IV ratio and name the conditions behind a causal interpretation.

Use the constant-slope model just derived. Divide the outcome-per-instrument slope by the treatment-per-instrument slope and track the canceled units.

**Practice:** A proposed instrument increases treatment by 0.30 units; its reduced-form outcome coefficient is −0.09. Compute the simple IV ratio and name the conditions behind a causal interpretation.

## 07. Wald ratio: explanation

Follow the calculation and interpret its units.

The ratio is −0.09 divided by 0.30, or −0.30 outcome units per treatment unit. Under the constant-slope structural model, relevance, instrument exogeneity and exclusion justify the causal interpretation. The reduced-form and first-stage regressions must use compatible controls and observations. A strong first stage alone does not establish instrument validity.

The ratio is −0.09 divided by 0.30, or −0.30 outcome units per treatment unit. Under the constant-slope structural model, relevance, instrument exogeneity and exclusion justify the causal interpretation. The reduced-form and first-stage regressions must use compatible controls and observations. A strong first stage alone does not establish instrument validity.

## 08. Inspect the OLS demand comparison first

It is a useful benchmark, not the target by default.

The OLS price coefficient is -1.213, with robust SE 0.195. It is a negative fitted association in log sales and log price. Its direction alone does not show that market price variation identifies demand.

The benchmark helps communicate how the IV comparison differs. Do not select OLS or IV simply by which estimate is larger, smaller or more significant. Explain which source of variation each uses and which assumptions support it. Both can be invalid if their separate identifying requirements are not credible.

```text
. regress logq logp, vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
        logp |  -1.213057   .1945896    -6.23   0.000    -1.604746   -.8213685
       _cons |   10.33892   .9348202    11.06   0.000     8.457229    12.22062
------------------------------------------------------------------------------
```

## 09. Read the actual first stage

State the instrument units as recorded in the data.

The first-stage sales-tax coefficient is 0.03073. The data construct the tax as the difference between recorded total and cigarette-specific taxes, deflated by the price index. The recorded price and tax series retain their source currency scale; deflating does not by itself convert cents into dollars.

The coefficient describes the fitted log-price change for one unit of that recorded real-tax measure. For the IV ratio, consistently using the same instrument scaling leaves the price elasticity unchanged because the scaling cancels in numerator and denominator. Still label the first-stage units correctly when interpreting it on its own.

```text
. regress logp salestax, vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logp | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
    salestax |   .0307289   .0048354     6.35   0.000     .0209956    .0404621
       _cons |   4.616546   .0289177   159.64   0.000     4.558338    4.674755
------------------------------------------------------------------------------
```

## 10. Read the reduced form using the same controls and sample

Its scale is quantity change per instrument unit.

The reduced-form coefficient on the tax measure is -0.03330. It describes how log sales vary with the proposed instrument. Dividing it by the first-stage coefficient yields about -1.084, the simple IV price coefficient.

The reduced form is informative about the policy–outcome relation, but interpreting that relation as a price mechanism requires exclusion and the other IV assumptions. If tax affects sales through another route, the ratio mixes that route with the price effect. The two component regressions therefore help explain the empirical strategy without proving its validity.

```text
. regress logq salestax, vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
    salestax |  -.0332974   .0102541    -3.25   0.002    -.0539378    -.012657
       _cons |   4.717449   .0650586    72.51   0.000     4.586493    4.848405
------------------------------------------------------------------------------
```

## 11. What the two stages actually fit

Use the instrument-predicted part of price, with a dedicated IV variance calculation.

Let C denote the included exogenous controls, and gamma their coefficients. If there are several controls, gamma times C stands for their coefficient-weighted sum. In the first stage, predict each state's log price from the tax instrument and all included exogenous controls. The fitted price is the part explained by those columns. Two-stage least squares, abbreviated 2SLS, then uses that fitted-price variation and the controls to obtain the structural coefficient. With one excluded instrument and one endogenous regressor, it gives the same coefficient as the reduced-form ratio.

The uncertainty calculation must use the structural residual: actual Y minus the intercept, controls and beta times actual X. An ordinary second-stage regression instead forms residuals using fitted X. These are different residuals, so its usual OLS standard errors are not the proper IV standard errors. Use a dedicated IV estimator with a covariance option justified for the sampling and error structure. The two stages explain the coefficient; they do not license the naive variance formula.

\(C\): included exogenous controls; \(\gamma C\): their coefficient-weighted sum.

First stage: \(\widehat X=\widehat E_{linear}(X\mid Z,C)\)

Structural residual: \(\widehat u=Y-\widehat\alpha-\widehat\beta X-\widehat\gamma C\)

2SLS uses instrument-predicted variation; IV inference uses the structural model.

## 12. Use the dedicated IV estimator for uncertainty

Manual fitted-regressor OLS is not enough for valid IV SEs.

Two-stage least squares, 2SLS, first extracts regressor variation predicted by the instruments and included exogenous controls, then uses that variation to calculate the structural coefficients. A manual second-stage OLS regression on fitted price can reproduce the coefficient under the matching setup.

Its ordinary SE formula does not provide the appropriate IV covariance calculation. Use a dedicated estimator such as ivregress 2sls with a justified covariance option. The command recognises the structural residual and the generated-regressor calculation. This distinction separates a helpful coefficient demonstration from a valid inferential procedure.

\(\texttt{ivregress 2sls logq (logp = salestax), vce(robust)}\)

## 13. Two stages and uncertainty

Try the comparison before opening the explanation.

Why not report ordinary OLS standard errors from regressing y on first-stage fitted x?

Compare actual X with first-stage fitted X in the residual. The variance calculation must correspond to the structural estimating problem.

**Practice:** Why not report ordinary OLS standard errors from regressing y on first-stage fitted x?

## 14. Two stages and uncertainty: explanation

Follow the calculation and interpret its units.

The second-stage fitted regressor is generated, and the relevant structural residual and variance calculation differ from the naive second-stage OLS calculation. Use a proper IV estimator such as ivregress 2sls with a justified covariance option.

The second-stage fitted regressor is generated, and the relevant structural residual and variance calculation differ from the naive second-stage OLS calculation. Use a proper IV estimator such as ivregress 2sls with a justified covariance option.

## 15. Compare the actual IV coefficient with its ratio

The do-file verifies equality before rounding.

The IV price coefficient is -1.084, with robust SE 0.312. The dedicated estimator matches the reduced-form divided by first-stage ratio, and the do-file checks the difference numerically before any rounded display.

The IV estimate has more sampling uncertainty than the OLS benchmark here. That is not an automatic reason to prefer OLS if OLS uses endogenous price variation. The relevant question is whether the proposed instrument provides a credible, informative comparison for the economic target. A precise biased benchmark does not remove the need to evaluate the instrument.

```text
. ivregress 2sls logq (logp=salestax), vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
        logp |  -1.083587   .3122036    -3.47   0.001    -1.695495    -.471679
       _cons |   9.719877   1.496143     6.50   0.000      6.78749    12.65226
------------------------------------------------------------------------------
```

## 16. Included exogenous controls belong in the IV specification

They help define the same conditional comparison in both stages.

Adding real income to the stated IV model gives a price coefficient of -1.143. The included exogenous control enters the instrumented-regressor prediction and the structural specification through the 2SLS setup. Using incompatible controls in hand-built stages can change the intended comparison.

The income adjustment can help with some observed demand differences but does not prove instrument exogeneity. Explain its timing and why it is a suitable included control. The instrument must still supply price variation related to the outcome only through the permitted model channels under the identifying assumptions.

```text
. ivregress 2sls logq logincome (logp=salestax), vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
        logp |  -1.143375   .3604805    -3.17   0.002    -1.849904   -.4368463
   logincome |   .2145153   .3018477     0.71   0.477    -.3770953    .8061258
       _cons |   9.430658   1.219402     7.73   0.000     7.040675    11.82064
------------------------------------------------------------------------------
```

## 17. School availability illustrates the exclusion question

A plausible first stage can still leave another route to the outcome.

Suppose nearby single-sex school availability predicts attendance at that school type, and the outcome is a student's score. Relevance asks whether availability actually moves attendance. Exclusion asks whether availability affects scores only through the attendance measure in the equation.

Residential choice, local resources or school competition may create other relationships. Family preferences can also relate availability to unobserved motivation. Discuss these mechanisms explicitly instead of treating geographical proximity as automatically random. A useful IV proposal identifies the potential violation and explains what institutional evidence or controls could make the assumption more credible.

Suppose nearby single-sex school availability predicts attendance at that school type, and the outcome is a student's score.

Residential choice, local resources or school competition may create other relationships.

## 18. Unexpected first-stage sign

Try the comparison before opening the explanation.

School availability predicts less attendance at the intended school type. Is a negative first-stage coefficient alone proof that IV is invalid?

In this separate school-attendance example, relevance asks for a nonzero slope. Investigate an unexpected sign without confusing it with a test of exclusion.

**Practice:** School availability predicts less attendance at the intended school type. Is a negative first-stage coefficient alone proof that IV is invalid?

## 19. Unexpected first-stage sign: explanation

Follow the calculation and interpret its units.

No. Relevance requires a nonzero first stage, not a prescribed positive sign. An unexpected sign should prompt checks of coding, selection, theory and strength. It does not by itself prove or disprove exclusion or exogeneity.

No. Relevance requires a nonzero first stage, not a prescribed positive sign. An unexpected sign should prompt checks of coding, selection, theory and strength. It does not by itself prove or disprove exclusion or exogeneity.

## 20. Whose treatment changes when encouragement changes?

A binary encouragement example introduces the treatment-response groups.

For a separate constructed example, randomly assign an offer of a training place. Z is the zero-or-one offer and D is zero-or-one attendance. A complier attends if offered but does not attend without the offer. An always-taker attends either way; a never-taker attends neither way. A defier would attend only without the offer.

Monotonicity rules out defiers for this direction of encouragement: the offer cannot make anyone less likely to attend in the individual potential-attendance comparison. It does not require everyone to attend or every effect to be positive. Suppose the offer raises attendance from 0.30 to 0.60 and raises average scores by 0.90 points. We next explain whose causal effect the ratio three can represent under the additional assumptions.

Compliers: attend only if offered. Always-takers/never-takers: unchanged attendance.

Monotonicity: the offer does not reduce any individual’s attendance.

Constructed ratio: \(0.90/(0.60-0.30)=3\) score points.

## 21. With heterogeneous effects, say whose response IV identifies

A constant coefficient can hide a local treatment comparison.

Heterogeneous effects are effects that differ across individuals. In the binary offer-and-attendance example, assume random offer assignment, relevance, exclusion of a direct offer effect, consistency, no relevant spillovers and monotonicity. The attendance difference then gives the fraction of compliers. Always-takers and never-takers do not change attendance, so their treatment status does not generate the offer's outcome difference under exclusion.

Dividing the outcome difference by the attendance difference identifies the compliers' average treatment effect: the local average treatment effect, abbreviated LATE. The constructed ratio is three score points for that group. It is not automatically the average effect for everyone. This binary interpretation does not transfer unchanged to the continuous cigarette-price application; there the interpretation depends on its structural slope and heterogeneity assumptions. State the relevant population rather than calling every IV coefficient a universal effect.

LATE: average treatment effect for compliers under the binary-IV assumptions.

An IV population is determined by the instrument and the maintained model.

## 22. Weak instruments make the ratio fragile

A near-zero first stage magnifies uncertainty.

An instrument is weak when the first stage supplies little information about the endogenous regressor after controls. A ratio with a denominator near zero becomes sensitive to small estimation changes. For illustration, dividing minus 0.09 by 0.30 gives minus 0.30. If both population relationships are ten times smaller, sampling changes of 0.02 in the first-stage slope can move a denominator of 0.03 to 0.01 or 0.05, giving very different ratios.

In such cases, the usual normal approximation for IV can be poor and conventional intervals misleading. A first-stage F statistic can be informative about strength in a specified setting, but a universal cutoff is not a theorem and strong prediction does not establish exclusion. Evaluate strength using diagnostics and inference suited to the actual number of instruments, covariance structure and target.

Weak first stage → denominator uncertainty can dominate the ratio.

Strength and validity are different requirements.

```text
. estat firststage

  First-stage regression summary statistics
  --------------------------------------------------------------------------
               |            Adjusted      Partial       Robust
      Variable |   R-sq.       R-sq.        R-sq.       F(1,45)   Prob > F
  -------------+------------------------------------------------------------
          logp |  0.6389      0.6228       0.5009       44.7305    0.0000
  --------------------------------------------------------------------------
```

## 23. A larger instrument set adds assumptions as well as information

More instruments are not automatically a better design.

An excluded instrument appears in the first stage but is excluded from the structural outcome equation except through the endogenous regressors. A model is overidentified when there are more such instruments than endogenous regressors. Extra instruments can supply additional variation, but each needs a substantive validity argument and may be weak.

An overidentification test checks whether the instrument moment restrictions are mutually compatible with the maintained model. A nonrejection does not prove every instrument valid: the test can have little power, meaning a low probability of detecting a particular violation. Some violations can also be shared across instruments. Keep the present one-instrument application transparent, and explain the distinct economic argument for any proposed additional instrument before using a larger set.

Overidentified: more excluded instruments than endogenous regressors.

A compatibility test cannot certify all substantive instrument assumptions.

## 24. Instrument scaling does not change the simple ratio

Consistent numerator and denominator transformations cancel.

If an instrument is multiplied by one hundred, its first-stage and reduced-form slopes are each divided by one hundred. Their ratio is unchanged in the matching simple IV model. This is a useful numerical check when two data sources report a tax in different units.

Scaling does not solve a weak or invalid instrument. It changes labels and coefficient magnitudes in component regressions, not the underlying source of variation. Keep those units explicit so that an apparently huge or tiny first-stage coefficient is not mistaken for evidence about strength or economic importance.

\(\dfrac{\widehat\rho/c}{\widehat\pi_1/c}=\dfrac{\widehat\rho}{\widehat\pi_1}\) for nonzero \(c\)

## 25. Write the IV argument as a chain of evidence

Separate relevance, exclusion, estimation and inference.

Begin with the endogenous comparison and the omitted forces that threaten OLS. Explain how the instrument changes the regressor, why another direct outcome route is ruled out and why the instrument is not tied to the structural error. Then show the first stage, reduced form and IV result with units and uncertainty.

This sequence helps a policy reader assess the strategy rather than treat 2SLS as a label for causality. State what remains uncertain about the instrument. An honest limitation can identify the next useful source of institutional evidence or data, even if the current estimate is statistically precise.

Begin with the endogenous comparison and the omitted forces that threaten OLS.

This sequence helps a policy reader assess the strategy rather than treat 2SLS as a label for causality.

## 26. DAG practice: challenge exclusion with one extra arrow

Trace the routes before choosing a control.

The tax instrument predicts cigarette price. Add a direct tax-to-quantity arrow that bypasses price. Could the first stage stay strong? Why would dividing the reduced form by the first stage then fail to isolate the intended price elasticity?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** The tax instrument predicts cigarette price. Add a direct tax-to-quantity arrow that bypasses price. Could the first stage stay strong? Why would dividing the reduced form by the first stage then fail to isolate the intended price elasticity?

## 27. DAG practice: challenge exclusion with one extra arrow: explanation

Explain what conditioning changes in this stated graph.

The first stage can remain strong because the tax-to-price arrow has not disappeared. Relevance does not rule out a second route from the instrument to quantity that bypasses price.

The reduced-form instrument association would combine the price channel and that additional direct channel. Dividing by the first stage no longer isolates the price response under the original exclusion argument. Use the graph to name a concrete institutional threat and assess it separately from the numerical strength of the first stage.

The first stage can remain strong because the tax-to-price arrow has not disappeared. Relevance does not rule out a second route from the instrument to quantity that bypasses price. The reduced-form instrument association would combine the price channel and that additional direct channel. Dividing by the first stage no longer isolates the price response under the original exclusion argument. Use the graph to name a concrete institutional threat and assess it separately from the numerical strength of the first stage.

## 28. Reconstruct IV and assess the instrument separately

Reproduce the evidence, then explain its economic meaning.

Run meeting_14.do using cigarettes.csv. Divide the reduced-form tax slope by the first-stage price slope and compare the ratio with ivregress. Explain the coefficient in elasticity units. Then name one concrete exclusion threat that a strong first stage cannot rule out.

**Practice:** Run meeting_14.do using cigarettes.csv. Divide the reduced-form tax slope by the first-stage price slope and compare the ratio with ivregress. Explain the coefficient in elasticity units. Then name one concrete exclusion threat that a strong first stage cannot rule out.

## 29. Reconstruct IV and assess the instrument separately: explanation

A reproducible result needs both a calculation and an interpretation.

The reduced-form slope is -0.033297 and the first-stage slope is 0.030729. Their ratio is -1.083587, matching the simple IV price coefficient. In this log–log specification it is an elasticity: a small one-percent price increase corresponds to roughly 1.08 percent lower quantity under the model and identifying assumptions.

The ratio uses the same observations, instrument and controls in both supporting regressions. The first stage addresses relevance. Tax policy could still be associated with smoking attitudes or other tobacco policies, or affect consumption through other price channels. Those are substantive exogeneity or exclusion threats. Report the dedicated IV estimator's uncertainty rather than ordinary second-stage OLS SEs.

The reduced-form slope is -0.033297 and the first-stage slope is 0.030729. Their ratio is -1.083587, matching the simple IV price coefficient. In this log–log specification it is an elasticity: a small one-percent price increase corresponds to roughly 1.08 percent lower quantity under the model and identifying assumptions. The ratio uses the same observations, instrument and controls in both supporting regressions. The first stage addresses relevance. Tax policy could still be associated with smoking attitudes or other tobacco policies, or affect consumption through other price channels. Those are substantive exogeneity or exclusion threats. Report the dedicated IV estimator's uncertainty rather than ordinary second-stage OLS SEs.

## 30. Next, change the outcome from a level to a probability

A binary response requires a different interpretation of the fitted function.

The instrument lesson connected an outcome contrast to variation justified by a substantive assignment argument. We separated relevance, exogeneity and exclusion, reconstructed the simple ratio and explained why a dedicated estimator is needed for uncertainty. These distinctions remain useful when the outcome is a zero-or-one event.

Next we study whether a mortgage application is denied. A straight-line prediction can leave the zero-to-one probability range, while a bounded curve changes how coefficients translate into probabilities. We will build those functions from a numerical index example before interpreting them. Changing the outcome scale alters the model and reported magnitude; a causal comparison still requires the intervention and identification argument.

Next outcome: a zero-or-one event.

Compare models on the probability scale after defining their functions.

