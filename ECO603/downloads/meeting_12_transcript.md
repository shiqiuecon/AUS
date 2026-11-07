# 12. Dynamics, corrections and shock responses

## 01. Which change addresses the problem we found?

Compare improving dynamics, changing an error model and estimating a future response.

The serial-correlation lesson left two tasks: check whether the conditional mean uses relevant past information, and estimate uncertainty for dependence that remains. Today we compare actual dynamic and Prais–Winsten accident fits, then apply the same reasoning to future inflation responses.

The quarterly inflation example is a controlled simulation with a known shock and known population response. Its Stata output is real software output from generated data, not an empirical estimate for a country. Knowing the truth lets us see how finite samples and horizon choices affect reported response paths without pretending that a regression identifies a real macroeconomic shock by itself.

## 02. Recall what HAC preserves

An uncertainty adjustment does not add predictors.

Newey–West retains the OLS coefficient on the same equation and sample while changing its estimated covariance. Adding a lagged outcome changes the equation and usually the usable sample. Prais–Winsten uses an error-process model to transform the fit and can change coefficients and SEs.

Before comparing the results, say which concern motivates each operation. If an omitted lag helps explain current accidents, a mean-model change may be relevant. If the mean model is credible but errors remain dependent, a covariance adjustment may suffice for that part of the problem. An endogenous policy variable requires a separate identification response.

Newey–West retains the OLS coefficient on the same equation and sample while changing its estimated covariance.

Before comparing the results, say which concern motivates each operation.

## 03. Add a lagged outcome with its timing made explicit

A different coefficient can be a different conditional comparison.

The dynamic accident fit adds last month's log accidents to the controls used earlier. Its lagged-outcome coefficient is 0.333, and its seat-belt-law coefficient is 0.065. The model uses 107 observations because the earliest month lacks a lag.

The law coefficient now describes a comparison at fixed previous accidents as well as the other controls. Its movement need not be a pure correction to the same target. Interpret it with the dynamic equation and consider whether the remaining error can be related to the lagged outcome. The command alone cannot establish that the new specification is dynamically complete.

```text
. newey logacc L.logacc trend i.month unem spdlaw beltlaw wkends, lag(4)

------------------------------------------------------------------------------
             |             Newey–West
      logacc | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
      logacc |
         L1. |   .3326578   .1071252     3.11   0.003     .1198023    .5455133
             |
       trend |   .0008893   .0002853     3.12   0.002     .0003223    .0014562
             |
        unem |  -.0125834   .0044189    -2.85   0.005    -.0213638   -.0038031
      spdlaw |  -.0414191   .0141509    -2.93   0.004    -.0695366   -.0133016
     beltlaw |   .0652123   .0154671     4.22   0.000     .0344794    .0959452
      wkends |   .0032099    .002814     1.14   0.257    -.0023815    .0088014
       _cons |   7.018421   1.156725     6.07   0.000     4.720033    9.316809
------------------------------------------------------------------------------
```

## 04. Dynamic completeness is a conditional-mean claim

Past information should not predict the remaining mean error.

A dynamically complete mean specification uses the relevant history so additional past information does not improve its conditional-mean prediction. It does not mean every possible lag belongs in the equation. Timing and economic mechanisms determine which history might matter.

For accidents, past travel conditions or enforcement changes may be relevant. Adding lags until a diagnostic stops rejecting can introduce poorly motivated terms and sample changes. State the information set and why it is sufficient for the intended comparison. Then investigate the remaining error dependence under that specification rather than assume a successful fit has proved the assumptions.

A dynamically complete mean specification uses the relevant history so additional past information does not improve its conditional-mean prediction.

For accidents, past travel conditions or enforcement changes may be relevant.

## 05. Prais–Winsten models an AR(1) error process

Its additional structure can change the fit.

Prais–Winsten estimates an AR(1) carry-over in the errors and transforms the regression accordingly, including a special first-observation adjustment. In the original accident equation, its law coefficient is 0.101 with SE 0.020. It is not required to equal the OLS coefficient.

The potential efficiency benefit depends on the error model and appropriate regressor assumptions. If that structure is not credible, the resulting precision claim may be misleading. Compare this with HAC, which addresses selected covariance contributions without imposing exactly this AR(1) transformation. A method is useful when its assumptions fit the problem, not because its name contains correction.

```text
. prais logacc trend i.month unem spdlaw beltlaw wkends

------------------------------------------------------------------------------
      logacc | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       trend |   .0009183    .000368     2.50   0.014     .0001874    .0016493
             |
        unem |   -.019975   .0047144    -4.24   0.000    -.0293397   -.0106104
      spdlaw |   -.045256   .0179614    -2.52   0.013     -.080934   -.0095779
     beltlaw |   .1008944   .0201055     5.02   0.000     .0609572    .1408315
      wkends |   .0042874   .0028062     1.53   0.130    -.0012867    .0098615
       _cons |   10.61796   .0628171   169.03   0.000     10.49318    10.74274
-------------+----------------------------------------------------------------
```

## 06. A horizon

Apply the idea before reading the solution.

In quarterly local projections \(Y_{t+h}=a_h+b_h\,shock_t+\text{controls}+u_{t+h}\), what does \(b_4\) describe?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** In quarterly local projections \(Y_{t+h}=a_h+b_h\,shock_t+\text{controls}+u_{t+h}\), what does \(b_4\) describe?

## 07. A horizon: explanation

Connect the calculation to the empirical claim.

It describes the outcome association or response four quarters, one year, after a unit shock, conditional on the specification. A causal impulse-response interpretation requires valid shock identification and controls; the regression form alone does not provide it.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

It describes the outcome association or response four quarters, one year, after a unit shock, conditional on the specification. A causal impulse-response interpretation requires valid shock identification and controls; the regression form alone does not provide it.

## 08. A local projection asks about a specified future outcome

Define the shock and horizon before the coefficient.

A local projection fits a separate regression for each future horizon. Here inflation h quarters ahead is related to a current shock and lagged inflation. A horizon is the number of observation periods into the future, so h equal to four in quarterly data means one year.

A supply shock is an unexpected change in production costs or capacity. In real applications, identifying such a shock is a substantive task. In our generated example the shock is drawn independently by construction. This makes the causal simulation comparison clear while showing why the same regression form would not automatically identify a causal response in observed macroeconomic data.

The Greek letter pi denotes inflation, s denotes the shock and h is the horizon in quarters. The coefficients a-h, b-h and c-h are estimated separately at each horizon; b-h is the response of interest. The horizon-specific error collects future inflation variation outside those included predictors.

\(\pi_{t+h}=a_h+b_h s_t+c_h\pi_{t-1}+u_{t+h}\)

\(\pi\): inflation; \(s\): shock; \(h\): quarters ahead; \(b_h\): response

## 09. Specify the known quarterly data-generating rule

A stable process gives a transparent response benchmark.

The constructed inflation process has an autoregressive coefficient of 0.6 and a direct shock coefficient of 0.8, with independent innovations. We generate a longer history, discard the first 200 periods and analyse 240 remaining quarterly observations. Discarding initial periods is a burn-in used to reduce starting-value effects.

For a one-period unit shock, the true response is 0.8 immediately and 0.8 times 0.6 to the power h at horizon h. These are known features of the simulation, not estimates. The graph can therefore display the true path beside the independently estimated Stata local-projection points.

\(\pi_t=0.6\pi_{t-1}+0.8s_t+\varepsilon_t\)

True impulse response: \(b_h=0.8(0.6)^h\)

## 10. The horizon coefficient has outcome-per-shock units

Do not confuse a future value with a cumulative sum.

At horizon four, the coefficient concerns inflation four quarters after the shock. It is not the sum of responses over the first four quarters. A cumulative response requires a separately defined sum, with uncertainty reflecting covariance among the estimated responses.

Write the economic sentence before calculating: a one-unit shock is associated with a fitted difference in the outcome at a specified future date, conditional on the included information. In the controlled simulation, the shock's independence supports the intended causal response. In a real application, that causal sentence needs a justified shock measure and appropriate controls.

At horizon four, the coefficient concerns inflation four quarters after the shock.

Write the economic sentence before calculating: a one-unit shock is associated with a fitted difference in the outcome at a specified future date, conditional on the included information.

## 11. Inspect the estimated path without forcing it to match the truth

Finite-sample response estimates can be noisy.

The plotted points and SEs come from the Stata regressions at horizons zero through eight. The line is the known simulation response. Estimates need not equal the line in any particular generated dataset, and an individual 95% interval need not contain its true value.

This is not a reason to select a different random seed after seeing an inconvenient result. The simulation helps us learn that sampling uncertainty remains even with a correctly identified constructed shock. At longer horizons, fewer usable observations and greater unexplained variation can make the path less precise. Report that uncertainty instead of drawing a smooth curve that hides the actual estimates.

## 12. Read the horizon-four output honestly

A negative sample estimate can coexist with a positive true response.

The estimated horizon-four coefficient in this generated sample is -0.178, with HAC SE 0.101. The known population response is 0.8 times 0.6 to the fourth power, about 0.104. This particular point estimate is quite different from that truth.

A confidence procedure has a repeated-sample coverage property, not a promise for each sample or every horizon simultaneously. The example is deliberately retained rather than edited to obtain a visually pleasing response. Use the difference to explain uncertainty, the limits of pointwise intervals and the distinction between a known simulation population and an observed research setting.

```text
. newey F4.inflation shock L.inflation, lag(8)

------------------------------------------------------------------------------
             |             Newey–West
F4.inflation | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       shock |    -.17841   .1013114    -1.76   0.080    -.3780179    .0211979
             |
   inflation |
         L1. |   .0652363   .0710399     0.92   0.359    -.0747295    .2052021
             |
       _cons |  -.2784281   .1669179    -1.67   0.097    -.6072968    .0504406
------------------------------------------------------------------------------
```

## 13. Future-outcome errors can overlap across dates

A sensible mean model can still leave serial dependence.

For a horizon longer than one, future outcomes from neighboring starting dates can be affected by some of the same intervening shocks. Their projection errors may therefore be related even if the original one-step innovations are independent. This is one reason local-projection inference often allows serial covariance.

The overlap argument concerns the regression errors at a specified horizon. It does not imply that every residual pattern requires another lagged predictor. First understand the construction of the outcome and information set, then choose a covariance treatment justified for that structure. A mean-model diagnosis and an uncertainty diagnosis remain distinct.

For a horizon longer than one, future outcomes from neighboring starting dates can be affected by some of the same intervening shocks.

The overlap argument concerns the regression errors at a specified horizon.

## 14. Model or inference?

Apply the idea before reading the solution.

Compare adding a lagged regressor, changing OLS SEs to HAC, and fitting Prais–Winsten. Which can change coefficients?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Compare adding a lagged regressor, changing OLS SEs to HAC, and fitting Prais–Winsten. Which can change coefficients?

## 15. Model or inference?: explanation

Connect the calculation to the empirical claim.

Adding regressors changes the conditional-mean model and generally the OLS coefficients and sample. HAC on the identical specification and sample preserves OLS coefficients. Prais–Winsten transforms/weights the model under a modeled error process and can change coefficients as well as SEs; its assumptions must be justified.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Adding regressors changes the conditional-mean model and generally the OLS coefficients and sample. HAC on the identical specification and sample preserves OLS coefficients. Prais–Winsten transforms/weights the model under a modeled error process and can change coefficients as well as SEs; its assumptions must be justified.

## 16. A HAC lag has calendar meaning

The same number describes different windows at different frequencies.

The simulation uses quarterly data and Newey–West lag eight, allowing contributions through eight quarters, or two years. The accident example used monthly data with lag four, a four-month window. These are not interchangeable adjustments.

The appropriate window depends on the dependence structure and the asymptotic justification, and a finite-sample analysis should inspect plausible choices. A longer window is not automatically more conservative or more accurate. Also remember that lag selection in the covariance calculation does not add regressors to the horizon equation.

The simulation uses quarterly data and Newey–West lag eight, allowing contributions through eight quarters, or two years.

The appropriate window depends on the dependence structure and the asymptotic justification, and a finite-sample analysis should inspect plausible choices.

## 17. Pointwise intervals do not cover an entire response path at the same rate

Multiple horizons change the inferential question.

A pointwise 95% interval refers to one horizon considered on its own under the procedure's assumptions. Drawing nine such intervals does not guarantee a 95% chance, in the repeated-sample sense, that all nine cover together. The estimated horizon coefficients are also related.

If the research claim concerns a whole response path or a sum, define an inference procedure for that combined quantity. For this introductory application, label the plotted normal-approximation bars as pointwise and avoid an unsupported whole-path claim. The visual should help distinguish what was estimated from what has actually been tested.

A pointwise 95% interval refers to one horizon considered on its own under the procedure's assumptions.

If the research claim concerns a whole response path or a sum, define an inference procedure for that combined quantity.

## 18. Controlling a mechanism can change the response being studied

A current mediator is not just another lag control.

Suppose a cost shock changes inflation expectations, which then influence future inflation. Expectations can be a mediator: part of the pathway through which the shock affects the outcome. Controlling current expectations can therefore remove part of the total response rather than merely improve precision.

A direct-response interpretation requires additional assumptions about that mediator and other confounding. A smaller shock coefficient after adding expectations is consistent with several stories; it does not prove mediation by itself. Define whether the study targets a total response or a response holding a mechanism fixed before comparing specifications.

Here M denotes expectations and U other news. Expectations are downstream of the shock in this diagram. Conditioning on them closes one shock-to-inflation mechanism. They are also a shared consequence of the shock and other news, so that conditioning can open an alternative route through news. The smaller adjusted shock coefficient is therefore not, by itself, an identified direct effect or proof of mediation.

## 19. Initial information and post-shock information have different roles

Timing determines what a control can do.

A variable known before the shock can help account for the state of the economy that predicts both measured shocks and future outcomes. A variable changed by the shock can instead be part of its transmission. The same variable name can play different roles depending on when it is measured.

Write a time line for the shock, controls and outcome. This is especially useful when survey expectations, policy announcements and quarterly averages are recorded at different points. A regression with many controls can still target the wrong response if their timing is not aligned with the economic question.

A variable known before the shock can help account for the state of the economy that predicts both measured shocks and future outcomes.

Write a time line for the shock, controls and outcome.

## 20. Distinguish an estimated shock from a known innovation

Measurement and first-step uncertainty can matter.

Our simulation observes its independent shock exactly. Real research often estimates a shock or a latent persistence measure from another model. Those generated quantities can carry measurement error and uncertainty from the first step.

The appropriate treatment depends on how they were obtained and the inferential target. Taking a supplied measure as given is a legitimate classroom simplification when it is stated, but it should not be mistaken for a complete uncertainty analysis of the original research. Keep the simple regression lesson useful while identifying what a full empirical study would still need to justify.

Our simulation observes its independent shock exactly.

The appropriate treatment depends on how they were obtained and the inferential target.

## 21. Choose among the three changes using the application

The preferred response follows the diagnosed failure.

For omitted predictable dynamics, reconsider the conditional-mean equation and its timing assumptions. For a justified AR(1) error model, Prais–Winsten may offer a useful transformed estimator. For remaining weakly dependent errors under a valid coefficient model, HAC may provide an appropriate covariance estimate.

None automatically solves policy endogeneity or shock mismeasurement. Explain what changes in the coefficient target, sample and error assumptions. This gives a reader a reason to trust the method choice beyond a list of software options and keeps a technically correct calculation connected to its practical purpose.

For omitted predictable dynamics, reconsider the conditional-mean equation and its timing assumptions.

None automatically solves policy endogeneity or shock mismeasurement.

## 22. Mediation is not proven

Apply the idea before reading the solution.

A shock coefficient becomes smaller after adding current expectations. Does this prove that expectations mediate the causal effect?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** A shock coefficient becomes smaller after adding current expectations. Does this prove that expectations mediate the causal effect?

## 23. Mediation is not proven: explanation

Connect the calculation to the empirical claim.

No. It is consistent with a mediation story but may reflect confounding, post-treatment conditioning, endogeneity or other specification changes. State the target and the assumptions under which conditioning has a direct-effect interpretation.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

No. It is consistent with a mediation story but may reflect confounding, post-treatment conditioning, endogeneity or other specification changes. State the target and the assumptions under which conditioning has a direct-effect interpretation.

## 24. DAG practice: expectations after a shock

Trace the routes before choosing a control.

A shock changes expectations and future inflation. Other news affects expectations and future inflation. Explain why adding current expectations can remove a mechanism and also create an alternative route, even if the shock initially had no common cause with the news.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** A shock changes expectations and future inflation. Other news affects expectations and future inflation. Explain why adding current expectations can remove a mechanism and also create an alternative route, even if the shock initially had no common cause with the news.

## 25. DAG practice: expectations after a shock: explanation

Explain what conditioning changes in this stated graph.

Expectations lie on \(s_t\rightarrow M\rightarrow\pi_{t+h}\), so conditioning on them blocks part of the shock’s response. They also form a collider on \(s_t\rightarrow M\leftarrow U\rightarrow\pi_{t+h}\); conditioning can open the route through other news.

The adjusted shock coefficient therefore does not automatically identify a direct response. An observed reduction in its size is compatible with several stories. State the target, the control’s timing and the additional assumptions needed to separate mediation from selection or mediator–outcome confounding.

Expectations lie on \(s_t\rightarrow M\rightarrow\pi_{t+h}\), so conditioning on them blocks part of the shock’s response. They also form a collider on \(s_t\rightarrow M\leftarrow U\rightarrow\pi_{t+h}\); conditioning can open the route through other news. The adjusted shock coefficient therefore does not automatically identify a direct response. An observed reduction in its size is compatible with several stories. State the target, the control’s timing and the additional assumptions needed to separate mediation from selection or mediator–outcome confounding.

## 26. Compare a known response with a noisy estimate

Reproduce the evidence, then explain its economic meaning.

Run meeting_12.do. In its explicitly constructed quarterly experiment, calculate the true response four quarters after a unit shock. Compare it with the actual horizon-four estimate and approximate interval. Explain what the discrepancy teaches about finite-sample estimates and why the experiment does not identify an observed historical supply shock.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_12.do. In its explicitly constructed quarterly experiment, calculate the true response four quarters after a unit shock. Compare it with the actual horizon-four estimate and approximate interval. Explain what the discrepancy teaches about finite-sample estimates and why the experiment does not identify an observed historical supply shock.

## 27. Compare a known response with a noisy estimate: explanation

A reproducible result needs both a calculation and an interpretation.

The known response is 0.8 times 0.6 to the fourth power, or 0.10368. The estimated horizon-four coefficient is -0.178410, with SE 0.101311. Its approximate 1.96 interval is [-0.3770, 0.0202]. This particular interval misses the true positive response.

A coverage statement concerns repeated samples, so a particular estimated response can have the wrong sign and a particular interval can miss the truth. The displayed result has not been replaced with its theoretical target. The independent shock is known by construction in this experiment. Observed macroeconomic work still needs a credible shock measure, appropriate dated controls and justified inference.

The known response is 0.8 times 0.6 to the fourth power, or 0.10368. The estimated horizon-four coefficient is -0.178410, with SE 0.101311. Its approximate 1.96 interval is [-0.3770, 0.0202]. This particular interval misses the true positive response. A coverage statement concerns repeated samples, so a particular estimated response can have the wrong sign and a particular interval can miss the truth. The displayed result has not been replaced with its theoretical target. The independent shock is known by construction in this experiment. Observed macroeconomic work still needs a credible shock measure, appropriate dated controls and justified inference.

## 28. Next, use repeated units to construct another comparison

Panel methods exploit changes within an identified unit.

Time-series methods studied a single ordered history and its dynamics. Panel data add repeated observations on identifiable units, allowing us to separate stable unit differences from changes over time. This creates another way to address a particular kind of omitted-variable problem.

The next lesson will derive first differences and fixed effects, then build a two-group policy comparison over time. We will see exactly which omitted factors disappear, which remain and how dependence within units affects inference. The central habit stays the same: identify the comparison and its assumptions before interpreting the fitted coefficient.

Time-series methods studied a single ordered history and its dynamics.

The next lesson will derive first differences and fixed effects, then build a two-group policy comparison over time.

