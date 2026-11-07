# 10. Persistence, stationarity and distributed lags

## 01. Does unemployment affect accidents only this month?

Allow a relationship to unfold over several periods.

Travel behaviour and economic conditions can adjust gradually. A current unemployment change may be associated with current accidents and with accidents in later months. A model containing only the current regressor assumes away those additional direct lag relationships.

A distributed-lag model includes current and earlier values of an explanatory variable. We will use the monthly accident series to distinguish an immediate coefficient from a sum of lag coefficients. We then add autoregressive persistence, define the conditions for a stable long-run comparison and examine why unrelated trending series can produce misleading regressions.

## 02. Define lags, differences and horizons

They are different operations on ordered observations.

A lag takes an earlier value, such as unemployment in the previous month. A first difference subtracts the previous value from the current value. A horizon counts periods ahead when studying a future response. Monthly and quarterly versions have different calendar meanings.

Declaring the time index lets Stata apply L and D operators consistently with gaps. A lag is not a percent change, and a difference of logs is not the same quantity as a difference of levels. Start with the economic unit and operation before interpreting the resulting coefficient. These definitions will be reused throughout the dynamic applications.

\(LX_t=X_{t-1}\)

\(\Delta X_t=X_t-X_{t-1}\)

## 03. Write a finite distributed-lag model

Every coefficient has an outcome date and a regressor date.

Let Y be log accidents and X be unemployment. A two-lag model includes current X, its previous-month value and its value two months earlier, together with the stated trend and seasonal controls. Beta zero is the impact coefficient, the fitted current association for a one-unit current X difference with the other included X values fixed.

The lag coefficients describe additional dated associations. A causal response interpretation requires that the sequence of X variation and error conditions support it. A lagged regressor is not automatically exogenous because its date is earlier; omitted persistent conditions can connect it with the current error.

\(Y_t=a+\beta_0X_t+\beta_1X_{t-1}+\beta_2X_{t-2}+\text{controls}+u_t\)

## 04. Trace a one-period regressor change

Its outcome responses occur at several dates.

Consider a one-unit X increase lasting only one month, followed by a return to its previous path. In a model without lagged Y, its direct fitted outcome responses are beta zero now, beta one next month and beta two the following month. Their sum is the cumulative outcome response over those dates.

For illustrative coefficients 0.2, 0.1 and minus 0.05, the immediate response is 0.2 and the cumulative response is 0.25 outcome units. The negative late response offsets part of the earlier increase. Drawing the three bars makes it easier to distinguish the outcome at one date from a sum of outcomes across dates.

Impact: \(\beta_0\)

Cumulative temporary-change response: \(\beta_0+\beta_1+\beta_2\)

## 05. A permanent change has another time path

The long-run level effect reaches the lag sum in this model.

If X instead rises by one and stays higher, the fitted outcome change is beta zero in the first period, beta zero plus beta one in the second, and the full coefficient sum from the third period onward. The long-run level difference is the same lag sum in this finite distributed-lag model.

This equality concerns a model without lagged outcomes. It does not mean every dynamic long-run effect is obtained by adding the visible X coefficients. We will soon show how outcome persistence adds a denominator. Always identify whether the regressor change is temporary or permanent and whether the outcome also feeds back through its own lags.

If X instead rises by one and stays higher, the fitted outcome change is beta zero in the first period, beta zero plus beta one in the second, and the full coefficient sum from the third period onward.

This equality concerns a model without lagged outcomes.

## 06. Lag sum

Apply the idea before reading the solution.

A finite distributed-lag model has coefficients 0.2, 0.1 and −0.05 on current x, lag 1 and lag 2. Compute the impact and the cumulative response to a one-period unit x shock.

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** A finite distributed-lag model has coefficients 0.2, 0.1 and −0.05 on current x, lag 1 and lag 2. Compute the impact and the cumulative response to a one-period unit x shock.

## 07. Lag sum: explanation

Connect the calculation to the empirical claim.

Impact is 0.2. The three-period cumulative response is \(0.2+0.1-0.05=0.25\) outcome units. In this finite-lag model, a permanent unit x increase has a long-run level effect of 0.25 as well. An autoregressive dependent-variable model has a different multiplier formula.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Impact is 0.2. The three-period cumulative response is \(0.2+0.1-0.05=0.25\) outcome units. In this finite-lag model, a permanent unit x increase has a long-run level effect of 0.25 as well. An autoregressive dependent-variable model has a different multiplier formula.

## 08. Read the observed lag estimates

Let the application determine the pattern.

The estimated current-unemployment coefficient is -0.022, followed by lag coefficients -0.003 and 0.003. Their units are log-accident changes per percentage-point unemployment difference, conditional on the included trend and seasonality. The first two lags leave 106 observations.

These estimates use Newey–West uncertainty with four monthly lags, allowing selected residual time dependence under its assumptions. The coefficient bars are observed fitted estimates, not known causal shock responses. A small or differently signed lag should be interpreted with its uncertainty and the complete specification, rather than forced into an expected economic story.

Newey–West is a covariance estimator: it changes the estimated uncertainty around OLS coefficients to allow unequal error spread and specified serial dependence under suitable assumptions. This is called heteroskedasticity-and-autocorrelation-consistent inference, abbreviated HAC. The lag option here uses four months in the covariance calculation; it does not add four regressors. We will examine its assumptions and weights in the next lesson.

Newey–West (HAC): adjust covariance for unequal spread and time dependence

```text
. newey logacc unem L(1/2).unem trend i.month, lag(4)

------------------------------------------------------------------------------
             |             Newey–West
      logacc | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
        unem |
         --. |  -.0218345   .0073752    -2.96   0.004    -.0364866   -.0071823
         L1. |  -.0027711   .0075824    -0.37   0.716    -.0178349    .0122927
         L2. |   .0028242   .0079337     0.36   0.723    -.0129375    .0185858
             |
       trend |   .0018359   .0002514     7.30   0.000     .0013365    .0023352
             |
       _cons |   10.67207   .0367848   290.12   0.000     10.59899    10.74515
------------------------------------------------------------------------------
```

## 09. Estimate uncertainty for the lag sum

The coefficient covariances matter.

The cumulative coefficient is a linear combination of current and lagged unemployment slopes. Its SE depends on the variances of all three estimates and their covariances. Adding their individual SEs would be incorrect.

Lincom calculates the sum using the fitted covariance matrix. State the outcome scale and whether this is the cumulative response to a temporary change or the eventual level contrast for a permanent change in this particular model. Those two interpretations can share a number while describing different paths. Their meaning comes from the equation and the stated scenario.

```text
. lincom unem+L.unem+L2.unem

------------------------------------------------------------------------------
      logacc | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |  -.0217814    .004154    -5.24   0.000    -.0300341   -.0135287
------------------------------------------------------------------------------
```

## 10. Stationarity describes stable statistical features

Specify which definition is being used.

A covariance-stationary series has a constant mean and variance, with covariance between dates depending on their separation rather than the calendar dates themselves. Strict stationarity is stronger in a different sense: the full joint distribution is unchanged by shifting all dates together. The course mainly uses the first definition to build intuition for stable fluctuations.

Stationarity does not mean observations are constant or independent. A series can fluctuate and remain persistent while its statistical features stay stable. A deterministic trend changes the unconditional mean over time, so we may study stationary fluctuations around a separately modelled trend rather than call the raw trending series stationary.

A covariance-stationary series has a constant mean and variance, with covariance between dates depending on their separation rather than the calendar dates themselves.

Stationarity does not mean observations are constant or independent.

## 11. An AR(1) model carries the outcome forward

The persistence parameter determines whether shocks fade.

An autoregressive model relates the current outcome to its own past. In an AR(1), one lag enters directly. The coefficient rho measures how much of the previous deviation carries forward. With an appropriate independent finite-variance innovation and absolute rho less than one, a covariance-stationary solution exists.

At rho equal to 0.6, a one-unit deviation contributes 0.6 next period, 0.36 the period after and progressively less thereafter. Negative rho tends to alternate the direction. The graph keeps its innovation draws fixed while changing rho so that the effect of persistence can be distinguished from a new random sample.

\(Y_t=a+\rho Y_{t-1}+\varepsilon_t\)

Stable AR(1): \(|\rho|<1\)

## 12. A permanent input change can be amplified by outcome persistence

Solve for the steady difference instead of adding coefficients blindly.

In a model with lagged Y and current X, a permanent X increase affects Y directly and then continues through the lagged outcome. At a stable steady difference, the outcome change equals rho times itself plus the direct X coefficient. Rearranging gives beta divided by one minus rho.

For rho 0.6 and beta 0.2, the eventual difference is 0.5. This assumes a stable relationship and a justified permanent exogenous change, with other determinants held fixed in the relevant sense. A temporary input impulse follows another path. The denominator is meaningful only when the dynamic model supports convergence.

\(\Delta Y=\rho\Delta Y+\beta\)

Long-run multiplier: \(\dfrac{\beta}{1-\rho}\)

## 13. Inspect persistence in the accident model

The fitted lag is a conditional association.

The lagged log-accident coefficient is 0.678, with HAC SE 0.083, in the model with trend and month effects. Its positive magnitude suggests substantial persistence in the fitted outcome after those controls.

This estimate does not prove that errors are independent or that every other regressor is exogenous. If omitted persistent errors are related to lagged accidents, coefficient consistency can be threatened. The result should motivate a careful dynamic specification and residual analysis. The next serial-correlation lesson separates those model questions from the covariance adjustment used here.

```text
. newey logacc L.logacc trend i.month, lag(4)

------------------------------------------------------------------------------
             |             Newey–West
      logacc | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
      logacc |
         L1. |   .6783359   .0825587     8.22   0.000     .5143906    .8422811
             |
       trend |   .0009218   .0002548     3.62   0.000     .0004158    .0014278
             |
       _cons |   3.276324   .8753799     3.74   0.000     1.537993    5.014655
------------------------------------------------------------------------------
```

## 14. AR long run

Apply the idea before reading the solution.

For \(Y_t=a+0.6Y_{t-1}+0.2X_t+e_t\), what is the long-run response to a permanent unit increase in x under a stable model?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** For \(Y_t=a+0.6Y_{t-1}+0.2X_t+e_t\), what is the long-run response to a permanent unit increase in x under a stable model?

## 15. AR long run: explanation

Connect the calculation to the empirical claim.

The steady-state change solves \(\Delta Y=0.6\Delta Y+0.2\), so \(\Delta Y=0.2/(1-0.6)=0.5\). This calculation assumes a stable dynamic relation and an exogenous permanent x change with other determinants fixed.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

The steady-state change solves \(\Delta Y=0.6\Delta Y+0.2\), so \(\Delta Y=0.2/(1-0.6)=0.5\). This calculation assumes a stable dynamic relation and an exogenous permanent x change with other determinants fixed.

## 16. A unit root does not let shocks fade in the usual way

A random walk accumulates innovations.

When rho equals one in a simple autoregression, the current value equals the previous value plus an innovation, possibly with drift. This is a random walk. Shocks accumulate, and the level variance grows rather than settling at a constant value under the usual independent-innovation setup.

The stationary AR long-run formula is not valid at this unit-root boundary. Regressions involving such levels can require different reasoning. It is important to distinguish high persistence from a unit root rather than assume that any slowly changing plot is one or the other. The economic mechanism, data history and suitable diagnostics all contribute to that assessment.

\(Y_t=Y_{t-1}+\varepsilon_t\)

\(\Delta Y_t=\varepsilon_t\) in this simple model

## 17. Differencing changes the target relationship

It can remove an accumulating level component in a specific model.

For the simple random walk, first differencing leaves the innovation. For other processes, differencing may produce a more stable series, but it can also remove useful level information or introduce additional dependence. It is not a universal instruction to difference every variable.

A level relationship and a relationship between changes answer different empirical questions. If studying monthly percentage growth, a difference of natural logs is approximately a growth rate. State why the transformed outcome is appropriate and which long-run question is no longer being estimated directly. Transformation should follow the data process and research target.

For the simple random walk, first differencing leaves the innovation.

A level relationship and a relationship between changes answer different empirical questions.

## 18. Unrelated trending series can appear related

A high R-squared can be misleading.

Two independent series with accumulating random shocks can produce a striking regression fit in levels even without an economic relationship. This is the spurious-regression concern: familiar t statistics and fit measures can look persuasive when the series do not satisfy the usual regression asymptotics.

Inspect time plots and model the source of persistence before interpreting a slope. A common deterministic trend, a stochastic trend and stable fluctuations require different treatments. The purpose is not to reject all level regressions, but to establish why the selected equation and inference are justified for the histories being compared.

Two independent series with accumulating random shocks can produce a striking regression fit in levels even without an economic relationship.

Inspect time plots and model the source of persistence before interpreting a slope.

## 19. Weak dependence concerns information far apart in time

Persistence and large-sample reasoning must be compatible.

Weak dependence means relations among sufficiently distant observations diminish enough for the particular averaging and limiting arguments being used. The exact condition depends on the model and statistic. It is not identical to independence, nor guaranteed by a plot that looks calm.

A stable AR process with suitable innovations offers a useful example: the influence of a shock declines geometrically. An accumulating random walk has a different structure. When invoking a law of large numbers or a normal approximation for time-series coefficients, connect the claim to the stability, dependence and error restrictions of the actual model.

Weak dependence means relations among sufficiently distant observations diminish enough for the particular averaging and limiting arguments being used.

A stable AR process with suitable innovations offers a useful example: the influence of a shock declines geometrically.

## 20. The sample changes when lags are added

Compare fit and tests on compatible observations.

A two-lag model loses the first two observations if no earlier data are available. Adding more lags can remove still more dates. A comparison between nested models can be distorted if their apparent fit differences also reflect different samples.

Define the common estimation window before comparing models or applying a fit-loss test. Record the number of usable observations after each transformation. This is the time-series version of keeping samples fixed in multiple regression: a numerical model comparison is informative only when we know which history each equation actually uses.

A two-lag model loses the first two observations if no earlier data are available.

Define the common estimation window before comparing models or applying a fit-loss test.

## 21. Explain a dynamic result with a time path

One label such as effect is not enough.

A useful dynamic report states the data frequency, timing of the X change, immediate response, relevant later responses and uncertainty for any sum or multiplier. It says whether the scenario is temporary or permanent and which stability and exogeneity conditions support it.

For the accident application, describe dated unemployment associations rather than a causal experiment unless the design identifies that variation. For a constructed model with a known shock, explain the known assumptions explicitly. This keeps a graph of responses from carrying a stronger interpretation than its source supports.

The dated-input DAG adapts the earlier ECO603 distributed-lag diagram. An earlier input can change the outcome directly and through later input values. Holding the later inputs fixed isolates a different route from allowing the input process to propagate naturally. The finite-lag coefficients describe partial dated-input contrasts; an innovation that changes several future input values requires tracing that entire input path.

## 22. Trending regression

Apply the idea before reading the solution.

Two unrelated series both rise over time and produce a high \(R^2\) when regressed on each other. What should you do before interpreting the slope?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Two unrelated series both rise over time and produce a high \(R^2\) when regressed on each other. What should you do before interpreting the slope?

## 23. Trending regression: explanation

Connect the calculation to the empirical claim.

Inspect their time plots and consider deterministic trends, stochastic trends and stationarity. A high \(R^2\) does not establish a meaningful relationship. Choose a specification and inference procedure justified by the series' properties; differencing every series automatically is also not a substitute for reasoning.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Inspect their time plots and consider deterministic trends, stochastic trends and stationarity. A high \(R^2\) does not establish a meaningful relationship. Choose a specification and inference procedure justified by the series' properties; differencing every series automatically is also not a substitute for reasoning.

## 24. DAG practice: partial lag effect or propagated input change?

Trace the routes before choosing a control.

An earlier input influences the outcome directly and by changing later input values. Which routes remain if the later inputs are held fixed? Why can the response to a naturally propagated input innovation differ from the coefficient on that earlier input?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** An earlier input influences the outcome directly and by changing later input values. Which routes remain if the later inputs are held fixed? Why can the response to a naturally propagated input innovation differ from the coefficient on that earlier input?

## 25. DAG practice: partial lag effect or propagated input change?: explanation

Explain what conditioning changes in this stated graph.

Holding both later inputs fixed blocks the routes through those input nodes. The direct earlier-input-to-current-outcome route remains. Its partial contrast differs from an intervention that also changes later values of the input process.

For a propagated innovation, trace the resulting entire input path and combine it with the distributed-lag coefficients. For a one-period imposed regressor increase, specify that all other dates remain fixed. A sum of lag coefficients is meaningful for the stated path and model; the word shock alone does not define which path was changed.

Holding both later inputs fixed blocks the routes through those input nodes. The direct earlier-input-to-current-outcome route remains. Its partial contrast differs from an intervention that also changes later values of the input process. For a propagated innovation, trace the resulting entire input path and combine it with the distributed-lag coefficients. For a one-period imposed regressor increase, specify that all other dates remain fixed. A sum of lag coefficients is meaningful for the stated path and model; the word shock alone does not define which path was changed.

## 26. Trace the actual monthly lag pattern

Reproduce the evidence, then explain its economic meaning.

Run meeting_10.do. Record the current, one-month-lagged and two-month-lagged unemployment coefficients. Calculate their sum and compare it with lincom. Explain the difference between the sequence after a one-month unit increase and the long-run level contrast after a permanent increase in this finite-lag model.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_10.do. Record the current, one-month-lagged and two-month-lagged unemployment coefficients. Calculate their sum and compare it with lincom. Explain the difference between the sequence after a one-month unit increase and the long-run level contrast after a permanent increase in this finite-lag model.

## 27. Trace the actual monthly lag pattern: explanation

A reproducible result needs both a calculation and an interpretation.

The three coefficients are -0.021834, -0.002771 and 0.002824. Their sum is -0.021781 in log-accident units per unemployment-rate unit. The covariance among estimates matters for the SE of that sum, which is why lincom is useful.

A one-month unit increase has those dated fitted responses, then no further direct effect in this finite two-lag specification. Their sum is the cumulative log-outcome response. A permanent unit increase eventually activates all three terms at once, giving the same sum as a long-run level contrast. An equation with a lagged outcome needs a different multiplier calculation and stability assumptions.

The three coefficients are -0.021834, -0.002771 and 0.002824. Their sum is -0.021781 in log-accident units per unemployment-rate unit. The covariance among estimates matters for the SE of that sum, which is why lincom is useful. A one-month unit increase has those dated fitted responses, then no further direct effect in this finite two-lag specification. Their sum is the cumulative log-outcome response. A permanent unit increase eventually activates all three terms at once, giving the same sum as a long-run level contrast. An equation with a lagged outcome needs a different multiplier calculation and stability assumptions.

## 28. Next, examine what the fitted errors still remember

Dynamics and uncertainty are related but distinct.

We have defined stationary behaviour, distributed lags and autoregressive persistence, and distinguished several dynamic contrasts. These tools help describe the conditional mean and the time path relevant to the question.

The next lesson studies serial correlation in what the model leaves unexplained. We will see why a conventional SE may miss cross-date covariance, why a heteroskedasticity-robust option is not enough for arbitrary time dependence and why HAC changes uncertainty without curing an endogenous dynamic regressor. Keep today's distinction between the mean equation and its error process in mind.

We have defined stationary behaviour, distributed lags and autoregressive persistence, and distinguished several dynamic contrasts.

The next lesson studies serial correlation in what the model leaves unexplained.

