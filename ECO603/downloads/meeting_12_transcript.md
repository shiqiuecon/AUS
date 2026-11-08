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

## 03. Dynamic completeness is a conditional-mean claim

Past information should not predict the remaining mean error.

A mean specification is dynamically complete relative to an information set if relevant earlier information cannot improve its conditional-mean prediction. This does not mean that every series must include every possible lag. It asks whether the history left out of the equation still predicts the outcome after the included variables have been used.

For accidents, earlier travel conditions or enforcement changes could carry information beyond current controls. A lagged outcome may summarize some of that history, but adding it changes the equation and can create a regressor–error relationship if the remaining error is persistent. We therefore state the timing and mean assumptions before reading its coefficient. A residual dependence test is evidence to investigate, not proof that one particular dynamic specification is correct.

Dynamic completeness: omitted history adds no conditional-mean prediction for the stated information set.

A lagged outcome changes both the comparison and the needed assumptions.

## 04. Add a lagged outcome with its timing made explicit

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

## 05. Transform a serial-error equation step by step

Subtracting the error carry-over also transforms the regressors.

Suppose the outcome equation is Y at t equal to an intercept a plus beta times X at t plus u at t. Model the error as rho times the previous error plus a new mean-zero innovation. For a later observation, subtract rho times the entire previous outcome equation from the current equation. The new error is u at t minus rho times the previous u, which equals the innovation.

The left side becomes current Y minus rho times previous Y. The regressor becomes current X minus rho times previous X, and the intercept becomes a times one minus rho. Transforming only the outcome would leave a different model. If the error process and exogeneity assumptions are appropriate, this transformed equation removes that particular error carry-over and can use information more efficiently.

\(Y_t=a+\beta X_t+u_t,\quad u_t=\rho u_{t-1}+\varepsilon_t\)

\(Y_t-\rho Y_{t-1}=a(1-\rho)+\beta(X_t-\rho X_{t-1})+\varepsilon_t\)

## 06. Make the transformation feasible

Prais–Winsten estimates the carry-over and retains the first observation.

The carry-over rho is usually unknown. Prais–Winsten estimates it from the fitted error pattern and uses that estimate to transform the outcome and every regressor. With rho equal to 0.5, an outcome pair of ten followed by twelve gives a transformed later outcome of twelve minus five, or seven. A regressor pair of two followed by three becomes three minus one, or two. The intercept column becomes one half.

For stationary AR(1) errors with absolute rho below one, the first observation has a different variance from the transformed later innovations. Prais–Winsten retains it with a square-root-of-one-minus-rho-squared weight. The method therefore uses a structured error model and can change coefficients as well as standard errors. Its potential precision gain depends on that structure and the exogeneity assumptions being credible; it is not interchangeable with retaining OLS and using HAC.

For \(\rho=0.5\): \(12-0.5(10)=7\), \(3-0.5(2)=2\)

First-observation weight: \(\sqrt{1-\rho^2}\)

Estimate rho, transform all columns, and fit the transformed equation.

## 07. Prais–Winsten models an AR(1) error process

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

## 08. Model or inference?

Try the comparison before opening the explanation.

Compare adding a lagged regressor, changing OLS SEs to HAC, and fitting Prais–Winsten. Which can change coefficients?

Compare three operations: add a predictor, retain OLS but change covariance, or transform the equation using a modeled error process.

**Practice:** Compare adding a lagged regressor, changing OLS SEs to HAC, and fitting Prais–Winsten. Which can change coefficients?

## 09. Model or inference?: explanation

Follow the calculation and interpret its units.

Adding regressors changes the conditional-mean model and generally the OLS coefficients and sample. HAC on the identical specification and sample preserves OLS coefficients. Prais–Winsten transforms/weights the model under a modeled error process and can change coefficients as well as SEs; its assumptions must be justified.

Adding regressors changes the conditional-mean model and generally the OLS coefficients and sample. HAC on the identical specification and sample preserves OLS coefficients. Prais–Winsten transforms/weights the model under a modeled error process and can change coefficients as well as SEs; its assumptions must be justified.

## 10. Specify the known quarterly data-generating rule

A stable process gives a transparent response benchmark.

Change applications explicitly: we now use a constructed quarterly inflation experiment, not the historical accident data. Pi denotes inflation. Its rule is 0.6 times last quarter's inflation plus 0.8 times the current shock s plus a separate innovation epsilon. The shock and innovation draws are independent across dates and of each other in this experiment.

Define the intervention as increasing the current s by one while holding all other external draws and the previous inflation value fixed. The inflation mechanism is then allowed to carry the change forward. Inflation rises by 0.8 immediately, 0.48 next quarter and 0.288 the quarter after. At horizon h, measured in quarters after the initial date, the known response is 0.8 times 0.6 to power h. This response is known because we specified the causal mechanism and its inputs; it is not a fitted historical policy effect.

\(\pi_t=0.6\pi_{t-1}+0.8s_t+\varepsilon_t\)

Hold other external draws fixed; allow inflation to propagate.

Known intervention response: \(0.8(0.6)^h\)

## 11. A local projection asks about a specified future outcome

Define the shock and horizon before the coefficient.

A local projection estimates a separate regression for each future horizon. At horizon zero, regress current inflation on the current shock and the chosen earlier information. At horizon four, use inflation four quarters later as the outcome but keep the shock dated at the initial quarter. The shock coefficient then has inflation-units per unit of that initial shock.

In the displayed equation, h is the horizon, a subscript h is its intercept, b subscript h its shock coefficient and c subscript h the coefficient on earlier inflation. The error is also horizon specific: different future outcomes leave different unexplained components. Because the constructed shock is independent of the other innovations, this experiment lets us compare estimates with the known intervention response. In observed data, the shock and control choices require their own identification argument.

\(\pi_{t+h}=a_h+b_hs_t+c_h\pi_{t-1}+u^{(h)}_{t+h}\)

\(h\): quarters ahead; \(b_h\): response per current shock unit.

## 12. The horizon coefficient has outcome-per-shock units

Do not confuse a future value with a cumulative sum.

At horizon four, the coefficient concerns inflation four quarters after the shock. It is not the sum of responses over the first four quarters. A cumulative response requires a separately defined sum, with uncertainty reflecting covariance among the estimated responses.

Write the economic sentence before calculating: a one-unit shock is associated with a fitted difference in the outcome at a specified future date, conditional on the included information. In the controlled simulation, the shock's independence supports the intended causal response. In a real application, that causal sentence needs a justified shock measure and appropriate controls.

At horizon four, the coefficient concerns inflation four quarters after the shock.

Write the economic sentence before calculating: a one-unit shock is associated with a fitted difference in the outcome at a specified future date, conditional on the included information.

## 13. A horizon

Try the comparison before opening the explanation.

In quarterly local projections \(Y_{t+h}=a_h+b_h\,shock_t+\text{controls}+u_{t+h}\), what does \(b_4\) describe?

Keep the shock date fixed and move the outcome date forward by h observation periods. Translate those periods into quarters.

**Practice:** In quarterly local projections \(Y_{t+h}=a_h+b_h\,shock_t+\text{controls}+u_{t+h}\), what does \(b_4\) describe?

## 14. A horizon: explanation

Follow the calculation and interpret its units.

It describes the outcome association or response four quarters, one year, after a unit shock, conditional on the specification. A causal impulse-response interpretation requires valid shock identification and controls; the regression form alone does not provide it.

It describes the outcome association or response four quarters, one year, after a unit shock, conditional on the specification. A causal impulse-response interpretation requires valid shock identification and controls; the regression form alone does not provide it.

## 15. Inspect the estimated path without forcing it to match the truth

Finite-sample response estimates can be noisy.

The plotted points and SEs come from the Stata regressions at horizons zero through eight. The line is the known simulation response. Estimates need not equal the line in any particular generated dataset, and an individual 95% interval need not contain its true value.

This is not a reason to select a different random seed after seeing an inconvenient result. The simulation helps us learn that sampling uncertainty remains even with a correctly identified constructed shock. At longer horizons, fewer usable observations and greater unexplained variation can make the path less precise. Report that uncertainty instead of drawing a smooth curve that hides the actual estimates.

## 16. Read the horizon-four output honestly

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

## 17. Future-outcome errors can overlap across dates

A sensible mean model can still leave serial dependence.

At a given horizon, two adjacent starting dates can use outcomes affected by some of the same future innovations. To see overlap simply, consider a two-period outcome sum whose unexplained component at starting date t is v at t plus one plus v at t plus two. The next starting date's error includes v at t plus two plus v at t plus three. Both contain the same middle innovation.

This is a constructed overlap illustration, not a claim that the inflation experiment has exactly that two-term error formula. It explains why independent underlying innovations can still produce related regression errors at a future horizon. The relevant dependence belongs to the error process for that horizon, so the covariance choice should reflect its timing and other maintained conditions. Overlap does not make every estimated response biased, but it matters for inference.

Illustration: \(w_t=v_{t+1}+v_{t+2}\)

\(w_{t+1}=v_{t+2}+v_{t+3}\): shared \(v_{t+2}\)

## 18. A HAC lag has calendar meaning

The same number describes different windows at different frequencies.

The simulation uses quarterly data and Newey–West lag eight, allowing contributions through eight quarters, or two years. The accident example used monthly data with lag four, a four-month window. These are not interchangeable adjustments.

The appropriate window depends on the dependence structure and the asymptotic justification, and a finite-sample analysis should inspect plausible choices. A longer window is not automatically more conservative or more accurate. Also remember that lag selection in the covariance calculation does not add regressors to the horizon equation.

The simulation uses quarterly data and Newey–West lag eight, allowing contributions through eight quarters, or two years.

The appropriate window depends on the dependence structure and the asymptotic justification, and a finite-sample analysis should inspect plausible choices.

## 19. Pointwise intervals do not cover an entire response path at the same rate

Multiple horizons change the inferential question.

A pointwise 95-percent interval is designed for one specified horizon considered by itself. Covering every point on a response path is a different event: every horizon's interval must succeed together. For illustration, if nine separate coverage events were independent and each had probability 0.95, their joint probability would be 0.95 to the ninth power, about 0.63.

Actual local-projection estimates across horizons are correlated, so 0.63 is not the coverage probability of this graph. The example shows why individual confidence levels do not automatically provide the same simultaneous confidence level. A claim about the whole path, a peak or a cumulative response needs an inference procedure for that joint quantity, using its covariance and an appropriate reference argument.

Pointwise coverage: one stated horizon.

Simultaneous coverage: the complete stated collection of horizons.

Illustration only, with independent events: \(0.95^9\approx0.63\).

## 20. Controlling a mechanism can change the response being studied

A current mediator is not just another lag control.

Consider a new causal story for observed inflation: a shock changes expectations, and expectations help determine future inflation. This expectations variable is not part of the small simulation's specified equation. We add it here to analyze a possible control choice. It is a mediator when it carries part of the shock's total effect.

Other news may also affect expectations and future inflation. Select expectations in the graph. Doing so blocks part of the shock's mechanism and can open a path through other news because expectations are a collider on that alternative route. A smaller adjusted shock coefficient would therefore not prove that its difference is a mediated effect. The intervention target, timing, support and mediator–outcome assumptions must be stated before interpreting the adjusted comparison.

New application: expectations mediate a shock and also respond to other news.

Post-shock controls can change the target and create selection.

## 21. Mediation is not proven

Try the comparison before opening the explanation.

A shock coefficient becomes smaller after adding current expectations. Does this prove that expectations mediate the causal effect?

Trace the mediated route and the route through other news. A coefficient difference alone cannot tell which mechanism produced the change.

**Practice:** A shock coefficient becomes smaller after adding current expectations. Does this prove that expectations mediate the causal effect?

## 22. Mediation is not proven: explanation

Follow the calculation and interpret its units.

No. It is consistent with a mediation story but may reflect confounding, post-treatment conditioning, endogeneity or other specification changes. State the target and the assumptions under which conditioning has a direct-effect interpretation.

No. It is consistent with a mediation story but may reflect confounding, post-treatment conditioning, endogeneity or other specification changes. State the target and the assumptions under which conditioning has a direct-effect interpretation.

## 23. Initial information and post-shock information have different roles

Timing determines what a control can do.

A variable known before the shock can help account for the state of the economy that predicts both measured shocks and future outcomes. A variable changed by the shock can instead be part of its transmission. The same variable name can play different roles depending on when it is measured.

Write a time line for the shock, controls and outcome. This is especially useful when survey expectations, policy announcements and quarterly averages are recorded at different points. A regression with many controls can still target the wrong response if their timing is not aligned with the economic question.

A variable known before the shock can help account for the state of the economy that predicts both measured shocks and future outcomes.

Write a time line for the shock, controls and outcome.

## 24. Distinguish an estimated shock from a known innovation

Measurement and first-step uncertainty can matter.

In the simulation, the independent shock is observed exactly because we generated it. In applied macroeconomics, a shock may instead be inferred from a first regression, a statistical decomposition or an outside instrument. An inferred shock contains estimation uncertainty and may mix the intended innovation with other economic news.

Putting that estimated series into a response regression is a two-step procedure. Inference must consider how the first-step estimation affects the response estimate, including dependence between the steps. A suitable joint method or resampling procedure depends on the actual construction and target. Before choosing one, explain what intervention the shock is meant to represent and why its variation is independent of omitted future-outcome causes. We develop the outside-instrument argument in Meeting 14.

Known simulated shock: observed by construction.

Estimated empirical shock: identification and first-step uncertainty need separate arguments.

## 25. Choose among the three changes using the application

The preferred response follows the diagnosed failure.

For omitted predictable dynamics, reconsider the conditional-mean equation and its timing assumptions. For a justified AR(1) error model, Prais–Winsten may offer a useful transformed estimator. For remaining weakly dependent errors under a valid coefficient model, HAC may provide an appropriate covariance estimate.

None automatically solves policy endogeneity or shock mismeasurement. Explain what changes in the coefficient target, sample and error assumptions. This gives a reader a reason to trust the method choice beyond a list of software options and keeps a technically correct calculation connected to its practical purpose.

For omitted predictable dynamics, reconsider the conditional-mean equation and its timing assumptions.

None automatically solves policy endogeneity or shock mismeasurement.

## 26. DAG practice: expectations after a shock

Trace the routes before choosing a control.

A shock changes expectations and future inflation. Other news affects expectations and future inflation. Explain why adding current expectations can remove a mechanism and also create an alternative route, even if the shock initially had no common cause with the news.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** A shock changes expectations and future inflation. Other news affects expectations and future inflation. Explain why adding current expectations can remove a mechanism and also create an alternative route, even if the shock initially had no common cause with the news.

## 27. DAG practice: expectations after a shock: explanation

Explain what conditioning changes in this stated graph.

Expectations lie on \(s_t\rightarrow M\rightarrow\pi_{t+h}\), so conditioning on them blocks part of the shock’s response. They also form a collider on \(s_t\rightarrow M\leftarrow U\rightarrow\pi_{t+h}\); conditioning can open the route through other news.

The adjusted shock coefficient therefore does not automatically identify a direct response. An observed reduction in its size is compatible with several stories. State the target, the control’s timing and the additional assumptions needed to separate mediation from selection or mediator–outcome confounding.

Expectations lie on \(s_t\rightarrow M\rightarrow\pi_{t+h}\), so conditioning on them blocks part of the shock’s response. They also form a collider on \(s_t\rightarrow M\leftarrow U\rightarrow\pi_{t+h}\); conditioning can open the route through other news. The adjusted shock coefficient therefore does not automatically identify a direct response. An observed reduction in its size is compatible with several stories. State the target, the control’s timing and the additional assumptions needed to separate mediation from selection or mediator–outcome confounding.

## 28. Compare a known response with a noisy estimate

Reproduce the evidence, then explain its economic meaning.

Run meeting_12.do. In its explicitly constructed quarterly experiment, calculate the true response four quarters after a unit shock. Compare it with the actual horizon-four estimate and approximate interval. Explain what the discrepancy teaches about finite-sample estimates and why the experiment does not identify an observed historical supply shock.

Then use actual traffic.csv. Add one lag of log accidents to the monthly mean model, retain the calendar and policy controls, and use four-month HAC inference. Report the law coefficient and the stable-model long-run contrast. Explain why this observed application has no known historical causal truth supplied by the simulation. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Then use actual traffic.csv. Add one lag of log accidents to the monthly mean model, retain the calendar and policy controls, and use four-month HAC inference. Report the law coefficient and the stable-model long-run contrast. Explain why this observed application has no known historical causal truth supplied by the simulation. Keep your commands, log, output and interpretation.

## 29. Compare a known response with a noisy estimate: explanation

A reproducible result needs both a calculation and an interpretation.

The known response is 0.8 times 0.6 to the fourth power, or 0.10368. The estimated horizon-four coefficient is -0.178410, with SE 0.101311. Its approximate 1.96 interval is [-0.3770, 0.0202]. This particular interval misses the true positive response.

A coverage statement concerns repeated samples, so a particular estimated response can have the wrong sign and a particular interval can miss the truth. The displayed result has not been replaced with its theoretical target. The independent shock is known by construction in this experiment. Observed macroeconomic work still needs a credible shock measure, appropriate dated controls and justified inference.

The real-data dynamic fit uses 107 months: the lag coefficient is 0.332658 and the law impact coefficient is 0.065212. The model-implied long-run log contrast is 0.097719 (approximate delta-method SE 0.019357). It assumes stability and a defensible exogenous permanent input change. HAC does not repair endogeneity from an invalid lagged-outcome specification.

Constructed quarterly response: known truth and realised estimate differ.

Real monthly fit: lag coefficient \(0.332658\); law impact \(0.065212\).

Stable-model long-run log contrast \(0.097719\), approximate SE \(0.019357\).

## 30. Next, use repeated units to construct another comparison

Panel methods exploit changes within an identified unit.

Time-series methods studied a single ordered history and its dynamics. Panel data add repeated observations on identifiable units, allowing us to separate stable unit differences from changes over time. This creates another way to address a particular kind of omitted-variable problem.

The next lesson will derive first differences and fixed effects, then build a two-group policy comparison over time. We will see exactly which omitted factors disappear, which remain and how dependence within units affects inference. The central habit stays the same: identify the comparison and its assumptions before interpreting the fitted coefficient.

Time-series methods studied a single ordered history and its dynamics.

The next lesson will derive first differences and fixed effects, then build a two-group policy comparison over time.

