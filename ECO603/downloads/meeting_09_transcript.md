# 09. Time-series regression, trends and seasonality

## 01. Did a traffic law change accidents, or did the calendar change?

Begin with a dated outcome and a plausible alternative explanation.

Traffic accidents can change after a law for several reasons: policy, travel volume, employment conditions or the time of year. A before-and-after difference combines these influences. Time-series regression uses observations ordered through time to describe a more specific comparison.

Our data are monthly California accident totals from January 1981 through December 1989. We will identify trend and seasonality, write an equation with explicit timing and inspect actual output. The main question is what the controls explain and what assumption is still needed to describe a policy effect. The calendar must be understood before a coefficient is interpreted.

## 02. Recall the problem of a time-only policy variable

Time controls can remove useful variation as well as confounding.

The previous block showed that unrestricted year indicators absorb any variable with one common value in each year. In a single monthly series, a separate indicator for every observation date would similarly leave no variation for other time-only regressors.

We therefore need to distinguish seasonal indicators, which repeat by calendar month, from an indicator for every unique month-year. January effects across nine years are not the same as 108 separate date effects. This distinction determines whether the written policy coefficient can be estimated. It also makes clear that the time pattern we choose to control is an assumption about the comparison.

The previous block showed that unrestricted year indicators absorb any variable with one common value in each year.

We therefore need to distinguish seasonal indicators, which repeat by calendar month, from an indicator for every unique month-year.

## 03. Define the monthly unit and time index

A lag requires a correct ordering, not just a row number.

One observation is a statewide month, so 108 records are nine years of monthly totals. A time index identifies the date associated with each observation. In Stata, a numeric monthly date together with a display format records both order and frequency.

The do-file checks the reconstructed date against the original year, sequential time count and eleven calendar-month indicators. A missing month would change the meaning of a row-based previous observation, so a lag should use the declared time index. These checks protect a substantive interpretation: the previous month means the previous calendar month, not merely the row above.

\(t=1,\ldots,108\): monthly observations

January 1981 through December 1989

## 04. A trend is a gradual time pattern

In a log outcome, a linear trend describes proportional growth.

A deterministic linear trend is a fitted change at a constant rate as the time index increases. In a level outcome, its coefficient is in outcome units per period. In a log outcome, it describes a constant log change per period, approximately a percentage rate for small coefficients.

This is one way to represent gradual changes in exposure, population or reporting, but it does not measure each mechanism separately. A trend control is therefore a modelling assumption. It can help separate a gradual pattern from a policy-date shift only insofar as that pattern is adequately represented by the chosen function.

\(\log A_t=a+gt+u_t\)

Small-change interpretation: about \(100g\)% per month

## 05. Seasonality repeats at the same part of the year

Use a reference month to avoid redundant indicators.

Seasonality is a recurring calendar pattern, such as travel or weather conditions that differ across months. With an intercept, eleven month indicators compare February through December with January. Including all twelve would create an exact linear dependence with the intercept.

These effects need not be the same as a gradual trend. The trend compares the sequence across years, while month indicators allow a repeated annual pattern. A seasonal outcome plot does not by itself prove that the regression errors are serially correlated: the model may explain that seasonal component. We will examine remaining residual dependence separately.

January is the reference category

Eleven recurring month indicators, not 108 unique date indicators

## 06. Frequency and season

Apply the idea before reading the solution.

An accident dataset runs monthly from January 1981 through December 1989. How many observations are there, and why use eleven month indicators with an intercept?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** An accident dataset runs monthly from January 1981 through December 1989. How many observations are there, and why use eleven month indicators with an intercept?

## 07. Frequency and season: explanation

Connect the calculation to the empirical claim.

There are \(9\times12=108\) observations. Eleven indicators compare months with an omitted reference month; including all twelve plus an intercept creates exact collinearity. Their purpose is seasonal adjustment, not causal identification by itself.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

There are \(9\times12=108\) observations. Eleven indicators compare months with an omitted reference month; including all twelve plus an intercept creates exact collinearity. Their purpose is seasonal adjustment, not causal identification by itself.

## 08. Write the policy model with its calendar controls

Make the intervention and units explicit.

Let A be total accidents, B the seat-belt-law indicator, S the speed-law indicator, U unemployment and W the number of weekends. The model uses log accidents, a linear trend, calendar-month effects and these observed controls. Each law indicator changes from zero to one when the law is in force.

The law coefficient is a fitted log-level difference at fixed included controls and time pattern. It does not automatically give a causal law effect, because adoption may coincide with unmeasured changes. Nor does a coefficient on total accidents directly describe fatalities. The outcome definition must remain part of the result sentence.

M-m-t is one when date t falls in calendar month m, and zero otherwise. The sum runs from February to December, with January as the reference. Gamma-m is that month’s fitted shift relative to January; a is the intercept and u is the remaining log-outcome error.

\(\log A_t=a+gt+\sum_{m=2}^{12}\gamma_mM_{mt}+bB_t+cS_t+dU_t+fW_t+u_t\)

\(M_{mt}\): month indicator; \(\gamma_m\): shift relative to January

## 09. Inspect the calendar-only regression

Understand the baseline before adding policy variables.

The calendar-only log-accident trend is 0.00275 per month. The month coefficients describe fitted differences from January after accounting for that trend. Read their scale as log differences rather than changes in accident counts.

This baseline helps us see what the policy model is adding. It does not establish that the trend has captured every changing influence or that seasonal differences are fixed permanently. Compare the time plot with the model's assumptions and consider whether a sudden event or changing seasonal pattern could remain outside the equation.

```text
. regress logacc trend i.month

------------------------------------------------------------------------------
      logacc | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       trend |   .0027471   .0001611    17.06   0.000     .0024274    .0030669
             |
       _cons |   10.46857   .0190028   550.90   0.000     10.43084    10.50629
------------------------------------------------------------------------------
```

## 10. A seasonal joint test asks about the whole pattern

One insignificant month does not settle the annual question.

The null for a seasonal joint test is that all eleven calendar-month coefficients are zero, conditional on the other regressors. The alternative is that at least one contributes a difference. This is not the same as selecting whichever month has the largest t statistic.

Use testparm after fitting the intended model to state the grouped restriction. As before, the reference distribution depends on the covariance treatment and assumptions. The test describes evidence for a seasonal component in that fitted model; it does not identify the economic cause of the seasonality or verify the policy comparison.

```text
. testparm i.month

 ( 1)  2.month = 0
 ( 2)  3.month = 0
 ( 3)  4.month = 0
 ( 4)  5.month = 0
 ( 5)  6.month = 0
 ( 6)  7.month = 0
 ( 7)  8.month = 0
 ( 8)  9.month = 0
 ( 9)  10.month = 0
 (10)  11.month = 0
 (11)  12.month = 0

       F( 11,    91) =   10.29
            Prob > F =    0.0000
```

## 11. Contemporaneous exogeneity concerns the current regressor vector

Current means the variables included for the same date.

Write x sub t for the full vector of included regressors at month t. Contemporaneous exogeneity requires the current error to average to zero given that current vector. It rules out a current omitted influence related to the included current policy and controls in the specified way.

This assumption alone is weaker than conditioning on the full history and future of regressors. Time ordering matters because current shocks can influence future policy or future outcomes. State which information is conditioned on instead of using the word exogenous without defining its timing. The next slide compares stronger and weaker versions.

\(E(u_t\mid x_t)=0\)

## 12. Strict and sequential exogeneity condition on different information

Future regressors make strict exogeneity demanding.

Strict exogeneity requires the error at each date to average to zero given regressors at every date, including the future. Sequential exogeneity conditions on current and past regressors instead. Strict exogeneity implies the sequential restriction, which in turn implies the contemporaneous one when the conditions are well defined.

For example, a current accident shock may influence a future law or enforcement response. That feedback can violate strict exogeneity even if the current policy was not set in response to the current unexpected shock. Dynamic regressions therefore need their timing assumptions examined carefully. A weaker timing condition can support consistency under suitable additional assumptions without guaranteeing finite-sample unbiasedness.

Strict: \(E(u_t\mid x_1,\ldots,x_T)=0\)

Sequential: \(E(u_t\mid x_1,\ldots,x_t)=0\)

## 13. Feedback across dates does not require a causal cycle

Current accidents can affect the policy chosen next month.

Here X denotes policy and Y accidents, with a subscript identifying the date. The arrows move forward in time: current policy can affect current accidents, which can influence next month's policy. An unexpected current cause of accidents can then reach that future policy through the observed accident outcome. We have not drawn a later policy causing an earlier accident.

This is a concrete reason strict exogeneity can fail: a current regression disturbance can be related to future regressors. A sequential mean assumption conditions only on the allowed current and earlier regressor history, so it is a different claim. Whether it is justified depends on what policymakers observe and when they choose the current policy.

Use dated nodes whenever the economic story contains feedback. Acyclic does not mean that the economy has no response mechanisms. It means the graph must represent the timing clearly enough that an arrow cannot be followed around a directed loop back to the same dated variable.

Possible route: \(u_t\rightarrow Y_t\rightarrow X_{t+1}\)

Future policy can respond to current unexpected outcomes.

## 14. Past outcomes can contain past errors

Adding dynamics changes the exogeneity question.

A lagged outcome is the outcome from an earlier date. If it enters the current regression, it includes the influence of earlier unobserved shocks. When those shocks are related to the current error, the lagged outcome can be endogenous in the current equation.

This is a reason to model timing explicitly rather than assume lagging a variable always makes it safe. Some well-specified dynamic models use appropriate sequential restrictions, but an omitted persistent component can threaten coefficient consistency. We will develop persistence and serial correlation in the next two lessons, keeping this connection between the regressor and the error in view.

A lagged outcome is the outcome from an earlier date.

This is a reason to model timing explicitly rather than assume lagging a variable always makes it safe.

## 15. Strict exogeneity

Apply the idea before reading the solution.

Define strict and contemporaneous exogeneity for a time-series regression using \(x_t\) and error \(u_t\). Which is stronger?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Define strict and contemporaneous exogeneity for a time-series regression using \(x_t\) and error \(u_t\). Which is stronger?

## 16. Strict exogeneity: explanation

Connect the calculation to the empirical claim.

Contemporaneous exogeneity requires \(E(u_t\mid x_t)=0\). Strict exogeneity requires \(E(u_t\mid x_1,\ldots,x_T)=0\) for every t, including future regressors. Strict implies contemporaneous, but the reverse need not hold. These statements use \(x_t\) as the entire regressor vector.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Contemporaneous exogeneity requires \(E(u_t\mid x_t)=0\). Strict exogeneity requires \(E(u_t\mid x_1,\ldots,x_T)=0\) for every t, including future regressors. Strict implies contemporaneous, but the reverse need not hold. These statements use \(x_t\) as the entire regressor vector.

## 17. Read the adjusted accident regression

Connect the coefficient with the actual outcome and controls.

The seat-belt-law coefficient is 0.095, and the unemployment coefficient is -0.021. Both are from the stated log-accident equation with trend, seasonal indicators and observed controls. A positive law coefficient here concerns total reported accidents, not a finding that safety equipment causes fatal injuries.

The result raises useful applied questions. Could travel, risk behaviour, enforcement or reporting have changed near adoption? Does the time pattern represent the data adequately? Which dependence remains in the residuals? A surprising sign should prompt those checks rather than a new outcome definition or a search for a preferred specification.

```text
. regress logacc trend i.month unem spdlaw beltlaw wkends, vce(robust)

------------------------------------------------------------------------------
             |               Robust
      logacc | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       trend |   .0011011   .0002676     4.12   0.000     .0005696    .0016326
             |
        unem |  -.0212173   .0038238    -5.55   0.000    -.0288128   -.0136218
      spdlaw |  -.0537593   .0120059    -4.48   0.000    -.0776076    -.029911
     beltlaw |   .0954526   .0123682     7.72   0.000     .0708847    .1200206
      wkends |   .0033333   .0039443     0.85   0.400    -.0045016    .0111682
       _cons |   10.63986   .0681238   156.18   0.000     10.50454    10.77518
------------------------------------------------------------------------------
```

## 18. A date indicator can mix several simultaneous changes

A coefficient needs a counterfactual interpretation.

If a law begins in one month, its indicator distinguishes a period after that date from earlier observations. Any unmeasured persistent change beginning nearby may contribute to the same contrast. Trend and season controls remove only the patterns their equations represent.

For a causal claim, explain what the accident path would have looked like without the law and why the included comparison supports that prediction. An additional comparison region, a credible assignment rule or more detailed exposure data might help in a suitable design. A long series by itself does not make one adoption event equivalent to repeated random assignments.

Earlier accident history and economic conditions can influence both law adoption and later accidents. The diagram shows the two resulting backdoor routes. Toggle the proposed history and economic controls separately. A calendar indicator does not close a route merely because adoption occurred at a known date; the relevant pre-policy causes must be addressed by the design and measured controls.

## 19. A count and a rate answer different questions

Exposure can change while individual risk stays fixed.

Total accidents can rise because there is more driving, even if risk per trip falls. A rate divides a count by an exposure measure, such as vehicle distance or population, depending on the target. Choosing the denominator changes the question and can introduce its own measurement problems.

Our current outcome is the recorded statewide count, logged for the fitted comparison. Do not silently describe it as an accident probability. If the ministry cares about safety per kilometre, identify the exposure data needed and formulate that rate explicitly. A statistically careful regression cannot compensate for an outcome that does not match the policy question.

Total accidents can rise because there is more driving, even if risk per trip falls.

Our current outcome is the recorded statewide count, logged for the fitted comparison.

## 20. Time ordering changes the meaning of a sample

One realised history can contain strongly related observations.

A cross-sectional sampling argument often imagines independent draws of units. A time series is one ordered history, and its neighboring observations can share persistent influences. We cannot treat the order as irrelevant simply because a regression command accepts the rows.

The law of large numbers and central limit reasoning used for independent observations require suitable extensions for dependent histories. Stability and weak dependence will matter. This does not make time-series regression unusable; it means the model, information timing and covariance assumptions must describe how the history evolves.

A cross-sectional sampling argument often imagines independent draws of units.

The law of large numbers and central limit reasoning used for independent observations require suitable extensions for dependent histories.

## 21. A linear trend does not remove every nonstationary process

Distinguish a chosen path from cumulative random shocks.

A deterministic trend is a specified function of time. A stochastic trend is generated by random shocks whose effects accumulate rather than fade in the usual way. Removing a straight line does not necessarily eliminate that second kind of movement.

Before interpreting relationships among trending variables, inspect their time plots and consider a model for their persistence. Two unrelated series can appear closely related if both wander over time. The next lesson will distinguish stationary fluctuations from persistent or accumulating paths and show why their regression interpretation requires care.

A deterministic trend is a specified function of time.

Before interpreting relationships among trending variables, inspect their time plots and consider a model for their persistence.

## 22. Record the time-series specification in words

Dates and frequency are part of reproducibility.

A useful description gives the date range, monthly frequency, outcome scale, policy coding, trend and seasonal controls. It states how gaps and lags are handled and which observations are lost when lagged terms are added. Another analyst should be able to reproduce the same sample and equation.

Then explain the proposed economic comparison and its main uncertainty and identification conditions. This is more useful than reporting only a command name or a number of observations. In a time-series setting, the time structure is part of what the model means, not a formatting detail appended after estimation.

A useful description gives the date range, monthly frequency, outcome scale, policy coding, trend and seasonal controls.

Then explain the proposed economic comparison and its main uncertainty and identification conditions.

## 23. Before–after is not enough

Apply the idea before reading the solution.

Accidents fall after a road-safety law. Why is this not yet evidence of its causal effect?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Accidents fall after a road-safety law. Why is this not yet evidence of its causal effect?

## 24. Before–after is not enough: explanation

Connect the calculation to the empirical claim.

Traffic volume, seasonality, fuel prices, enforcement, reporting or other policies may also change. A defensible causal comparison must rule out relevant counterfactual changes; adding a trend is useful only insofar as its assumptions are credible.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Traffic volume, seasonality, fuel prices, enforcement, reporting or other policies may also change. A defensible causal comparison must rule out relevant counterfactual changes; adding a trend is useful only insofar as its assumptions are credible.

## 25. DAG practice: dated policy feedback

Trace the routes before choosing a control.

Current unexpected accident causes can affect current accidents and hence next month’s policy. Trace that dated route. Why can it challenge strict exogeneity without requiring a future policy to cause an earlier accident?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Current unexpected accident causes can affect current accidents and hence next month’s policy. Trace that dated route. Why can it challenge strict exogeneity without requiring a future policy to cause an earlier accident?

## 26. DAG practice: dated policy feedback: explanation

Explain what conditioning changes in this stated graph.

The route is \(u_t\rightarrow Y_t\rightarrow X_{t+1}\). It provides a reason that the current disturbance can be related to future regressors, which strict exogeneity conditions on. Every causal arrow still moves forward through the policy process.

A sequential mean assumption uses a different information set and can be considered when current policy is chosen before the current unexpected cause, subject to the full model and timing assumptions. The graph does not prove that assumption. It makes clear why the strict version should not be imposed merely because the observations have dates.

The route is \(u_t\rightarrow Y_t\rightarrow X_{t+1}\). It provides a reason that the current disturbance can be related to future regressors, which strict exogeneity conditions on. Every causal arrow still moves forward through the policy process. A sequential mean assumption uses a different information set and can be considered when current policy is chosen before the current unexpected cause, subject to the full model and timing assumptions. The graph does not prove that assumption. It makes clear why the strict version should not be imposed merely because the observations have dates.

## 27. Interpret the traffic-law coefficient with its timing

Reproduce the evidence, then explain its economic meaning.

Run meeting_09.do using traffic.csv. Verify the monthly date range and sample size. Translate the seat-belt-law coefficient into an exact percentage contrast in exponentiated fitted log accidents. Explain why the trend and month controls do not establish that the law caused this contrast.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_09.do using traffic.csv. Verify the monthly date range and sample size. Translate the seat-belt-law coefficient into an exact percentage contrast in exponentiated fitted log accidents. Explain why the trend and month controls do not establish that the law caused this contrast.

## 28. Interpret the traffic-law coefficient with its timing: explanation

A reproducible result needs both a calculation and an interpretation.

The series has 108 months, January 1981 through December 1989. Its seat-belt-law coefficient is 0.095453. The exact fitted multiplicative contrast is 10.0157 percent. It concerns total accidents, rather than deaths or accidents per distance travelled.

The result compares law states after accounting for the specified trend, seasonal pattern and other included variables. Adoption could coincide with unmeasured enforcement, reporting, exposure or other policy changes. Controlling for the calendar addresses the pattern represented by those controls. A causal statement needs a credible argument about the remaining counterfactual accident path, rather than relying on the law indicator's p-value.

The series has 108 months, January 1981 through December 1989. Its seat-belt-law coefficient is 0.095453. The exact fitted multiplicative contrast is 10.0157 percent. It concerns total accidents, rather than deaths or accidents per distance travelled. The result compares law states after accounting for the specified trend, seasonal pattern and other included variables. Adoption could coincide with unmeasured enforcement, reporting, exposure or other policy changes. Controlling for the calendar addresses the pattern represented by those controls. A causal statement needs a credible argument about the remaining counterfactual accident path, rather than relying on the law indicator's p-value.

## 29. Next, ask how long a shock lasts

Persistence determines useful dynamics and long-run comparisons.

We have separated trend, recurring seasonality and remaining errors, and we have defined exogeneity with its time information. The next question is whether a change disappears quickly, persists for several periods or accumulates without fading.

We will use autoregressive and distributed-lag models to make those possibilities explicit. We will also distinguish an immediate effect, a cumulative response to a temporary change and the eventual response to a permanent change. Keeping the date frequency and equation visible will prevent these different quantities from being given the same interpretation.

We have separated trend, recurring seasonality and remaining errors, and we have defined exogeneity with its time information.

We will use autoregressive and distributed-lag models to make those possibilities explicit.

