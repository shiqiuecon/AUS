# 09. Time series: basic regression and distributed lags

Specify the timing of a regression and recover a response over several dates.

## Core lesson

### 01. Did a traffic law change accidents, or did the calendar change?

Begin with a dated outcome and a plausible alternative explanation.

Traffic accidents can change after a law for several reasons: policy, travel volume, employment conditions or the time of year. A before-and-after difference combines these influences. Time-series regression uses observations ordered through time to describe a more specific comparison.

Our data are monthly California accident totals from January 1981 through December 1989. A trend is a gradual time pattern; seasonality is a pattern recurring at the same calendar positions, such as each December. We will identify these patterns, write an equation with explicit timing and inspect actual output. The main question is what the controls explain and what assumption is still needed to describe a policy effect. The calendar must be understood before a coefficient is interpreted.

### 02. A time-only policy variable compares dates

Time controls can remove useful variation as well as confounding.

A dated policy indicator takes the same value for every observation at a particular date. In a single monthly series, its coefficient compares dates before and after the change, conditional on the other included inputs. Other events occurring at the same dates can therefore be mixed into that coefficient.

A calendar specification chooses which common changes are represented, such as a gradual trend or a recurring seasonal pattern. It cannot identify a policy effect merely by naming a date. Later panel comparisons add units as well as dates and require us to check which policy variation survives the chosen controls.

A date-based policy contrast can mix several simultaneous changes.

Calendar controls and an identification argument have distinct roles.

### 03. Define the monthly unit and time index

A lag requires a correct ordering, not just a row number.

One observation is a statewide month, so 108 records are nine years of monthly totals. A time index identifies the date associated with each observation. In Stata, a numeric monthly date together with a display format records both order and frequency.

The do-file checks the reconstructed date against the original year, sequential time count and eleven calendar-month indicators. A missing month would change the meaning of a row-based previous observation, so a lag should use the declared time index. These checks protect a substantive interpretation: the previous month means the previous calendar month, not merely the row above.

\(t=1,\ldots,108\): monthly observations

January 1981 through December 1989

### 04. Feedback across dates does not require a causal cycle

Current accidents can affect the policy chosen next month.

Before writing a time-series assumption, put the decision on a timeline. Let X be policy and Y accidents. Current policy can affect current accidents. An unexpectedly dangerous month can raise current accidents, and policymakers may respond by changing next month's policy. In the diagram, u is the unexpected current cause and the subscripts identify dates.

Trace the route from the current unexpected cause to current accidents and then to next month's policy. It gives a reason that today's error can be related to a future regressor. No arrow runs backward in time, and there is no directed cycle. We will use this story to distinguish assumptions that condition only on current information from an assumption that conditions on the entire history, including future choices.

\(u_t\rightarrow Y_t\rightarrow X_{t+1}\)

Policy at the next date can respond to an unexpected outcome now.

### 05. Contemporaneous exogeneity concerns the current regressor vector

Current means the variables included for the same date.

A regressor vector is simply the ordered list of regressors in one observation. At date t, it includes the law indicators, unemployment, weekend composition and calendar controls in our model. Contemporaneous means at the same date. The contemporaneous zero conditional-mean assumption says that the average current error is zero at each value of that current regressor list.

This is a statement about the error's mean, not full independence of every variable. It rules out current policy being selected using an omitted current cause of accidents that remains in the error. It says nothing by itself about how tomorrow's policy responds to today's unexpected accidents. The timeline therefore helps us see which additional timing restrictions are required for a particular estimator or interpretation.

\(x_t\): the ordered list of regressors at date \(t\)

Contemporaneous condition: \(E(u_t\mid x_t)=0\)

### 06. Strict and sequential exogeneity condition on different information

Future regressors make strict exogeneity demanding.

Read the two lists after the conditioning bar. Lowercase x at a date is the list of included regressors then. Capital T is the last date. Strict exogeneity asks the average error at date t to be zero even when we know every regressor value through T, including future choices.

In the feedback example, unusually high accidents today may prompt a policy change next month. Knowing that future policy can then tell us something about today's error. Sequential exogeneity uses the shorter list, ending with today's regressors. It allows that kind of future response.

The shorter restriction still needs a reason. Did the policy decision use information about today's unobserved accident shock? Does the model include the relevant history? State which list you condition on and why a mean of zero is plausible for that list.

Strict: \(E(u_t\mid x_1,\ldots,x_T)=0\)

Sequential: \(E(u_t\mid x_1,\ldots,x_t)=0\)

### 07. Past outcomes can contain past errors

Adding dynamics changes the exogeneity question.

A lagged outcome is the outcome from an earlier date. If it enters the current regression, it includes the influence of earlier unobserved shocks. When those shocks are related to the current error, the lagged outcome can be endogenous in the current equation.

This is a reason to model timing explicitly rather than assume lagging a variable always makes it safe. Some well-specified dynamic models use appropriate sequential restrictions, but an omitted persistent component can threaten coefficient consistency. Serial correlation means that errors at different dates move together. We will develop that dependence and the persistence of past influences in the later time-series lessons, keeping this connection between the regressor and the error in view.

A lagged outcome is the outcome from an earlier date.

This is a reason to model timing explicitly rather than assume lagging a variable always makes it safe.

### 08. Time ordering changes the meaning of a sample

One realised history can contain strongly related observations.

A cross section records different units, often at a common date, and a simple sampling argument may treat them as independent draws. A time series instead records one ordered history. Neighboring months can share weather, travel conditions or persistent policy influences. Treating its rows as independent simply because a regression command accepts them would ignore that history.

The averaging and reference-distribution arguments from earlier lessons need conditions appropriate to this dependence. We must ask how strongly dates are related, whether old influences fade and whether the process keeps comparable statistical features over time. The next lesson gives those ideas precise names and worked examples. Time-series regression remains useful when the model and uncertainty calculation describe how the history evolves.

An ordered history can share information across dates.

Justify averaging and uncertainty for the process, rather than treating rows as independent.

### 09. Finite-sample OLS assumptions apply to the complete regressor path

Temporal dependence and regressor-error dependence are different restrictions.

Write the outcome at date t as the intercept, the sum of the included regressor terms and the error at that date. Call the collection of regressor values at every observed date the regressor path. A unique OLS fit needs each included regressor to have some variation that the others cannot reproduce exactly.

Strict exogeneity says that the mean of each date's error given the full path is zero. The weights in the OLS calculation are fixed given that path. The same weighted-error argument as in the district regression then gives conditional unbiasedness. For conventional variance calculations, also assume that errors have the same conditional variance and are uncorrelated across dates. The traffic application gives us reasons to check those extra conditions separately.

Let \(\mathcal X=(x_1,\ldots,x_T)\) denote the whole regressor path.

Conditional mean: \(E(u_t\mid\mathcal X)=0\) for each \(t\).

Conventional variance: \(\operatorname{Var}(u_t\mid\mathcal X)=\sigma^2\) and \(\operatorname{Cov}(u_t,u_s\mid\mathcal X)=0\) for \(s\ne t\).

### 10. Does unemployment affect accidents only this month?

Allow a relationship to unfold over several periods.

Travel behaviour and economic conditions can adjust gradually. A current unemployment change may be associated with current accidents and with accidents in later months. A model containing only the current regressor assumes away those additional direct lag relationships.

A distributed-lag model includes current and earlier values of an explanatory variable. We will use the monthly accident series to distinguish an immediate coefficient from a sum of lag coefficients. Later we allow earlier outcomes to help predict current outcomes, define stability conditions for long-run comparisons and examine misleading relationships between unrelated trending series.

### 11. Define lags, differences and horizons

They are different operations on ordered observations.

Suppose unemployment was six percent in March and seven percent in April. From April, a lag of one month gives March's value, six percent. The first difference is the April value minus the March value, one percentage point. A lag reads an earlier observation. A difference calculates a change.

A horizon counts how far ahead we look from the starting date. From April, horizon one is May in monthly data. In quarterly data it would be one quarter ahead. Declare the date index in Stata so that the lag and difference operators follow calendar dates, including gaps in the observations.

\(LX_t=X_{t-1}\)

\(\Delta X_t=X_t-X_{t-1}\)

### 12. Write a finite distributed-lag model

Every coefficient has an outcome date and a regressor date.

Let Y be log accidents and X be unemployment. A two-lag model includes current X, its previous-month value and its value two months earlier, together with the stated trend and seasonal controls. Beta zero is the impact coefficient, the fitted current association for a one-unit current X difference with the other included X values fixed.

The lag coefficients describe additional dated associations. A causal response interpretation requires that the sequence of X variation and error conditions support it. A lagged regressor is not automatically exogenous because its date is earlier; omitted persistent conditions can connect it with the current error.

\(Y_t=a+\beta_0X_t+\beta_1X_{t-1}+\beta_2X_{t-2}+\text{controls}+u_t\)

### 13. Trace a one-period regressor change

Its outcome responses occur at several dates.

Raise the input by one at the starting date only. Keep the rest of the input path fixed. Look across the horizons. At horizon zero, the change enters through the current term, giving 0.20. One period later, that same input is the first lag, giving 0.10. Two periods later it is the second lag, giving minus 0.05. At horizon three the changed input is outside the model's lag window.

Add the three dated responses to get 0.25. This is the cumulative response to the temporary change. The outcome at the last date on the slide has a change of zero. If an economic shock also moves later input values, trace those changes too. The calculation here fixes that later path by construction.

Horizon \(h\): \(0,1,2,3\)

Temporary-input responses: \(0.20,0.10,-0.05,0\)

Cumulative response: \(0.20+0.10-0.05=0.25\)

### 14. A permanent change has another time path

The long-run level effect reaches the lag sum in this model.

This time raise the input by one at the starting date and at every date after it. At the start, only the current input is higher, so the fitted change is 0.20. One period later the current input and the first lag are both higher, so add 0.20 and 0.10. Two periods later all three terms are active. Their sum is 0.25 and it stays there.

Here the sum is the difference in the fitted outcome at each sufficiently late date. In the temporary example the same number came from adding responses across dates. The equality follows from the finite distributed-lag model we specified, without a lagged outcome. Explain which input path you are using before interpreting the sum.

Permanent-input responses: \(0.20,0.30,0.25,0.25,\ldots\)

Temporary cumulative response and permanent long-run level contrast are different quantities.

### 15. Introduce the uncertainty option before reading the lag table

Newey–West changes the covariance estimate around an unchanged OLS fit.

The lag regression is estimated from repeated months, so its errors may move together across time. We use Newey–West inference, a way to estimate coefficient uncertainty while allowing unequal error spread and limited time dependence under appropriate large-sample conditions. The broader name is heteroskedasticity-and-autocorrelation-consistent covariance estimation, abbreviated HAC. Autocorrelation means correlation between a series and its own values at other dates.

The four-lag option here includes error-related covariance information through four months. It does not insert four outcome lags into the mean equation or change the OLS coefficients. We develop the covariance weights and assumptions in Meeting 13. For this table, read the estimated lag coefficients as the dated fitted associations, and keep the uncertainty choice separate from whether unemployment changes identify a causal effect.

Newey–West/HAC: allow suitable unequal spread and time dependence in uncertainty estimation.

Four covariance lags here mean four months; the mean equation is unchanged.

### 16. Read the observed lag estimates

Let the application determine the pattern.

The estimated current-unemployment coefficient is -0.022, followed by lag coefficients -0.003 and 0.003. Their units are log-accident changes per percentage-point unemployment difference, conditional on the included trend and seasonality. The first two lags leave 106 observations.

These estimates use Newey–West uncertainty with four monthly lags, allowing selected residual time dependence under its assumptions. The coefficient bars are observed fitted estimates, not known causal shock responses. A small or differently signed lag should be interpreted with its uncertainty and the complete specification, rather than forced into an expected economic story.

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

### 17. Estimate uncertainty for the lag sum

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

### 18. Testing no dynamic response differs from testing a zero total response

A collection of lag coefficients can cancel in its sum.

In the finite distributed-lag model, let beta zero through beta q be the current and lagged input coefficients. A joint test that all are zero asks whether the input has any modelled response at those horizons. Their sum is called the long-run propensity in this finite-lag model. A test that this sum is zero asks whether a permanent one-unit input change has zero eventual fitted effect in this model.

Positive early and negative later coefficients can sum to zero even though there is a substantial temporary response. A scalar sum needs its covariance-based standard error; the joint restriction needs the covariance of the entire coefficient vector. Use the same sample and the uncertainty procedure justified for the dated observations. Neither test independently establishes that the input change was an exogenous intervention.

Any included response: \(H_0:\beta_0=\cdots=\beta_q=0\).

Zero long-run propensity: \(H_0:\sum_{j=0}^q\beta_j=0\).

Different null restrictions answer different empirical questions.

### 19. The sample changes when lags are added

Compare fit and tests on compatible observations.

A two-lag model loses the first two observations if no earlier data are available. Adding more lags can remove still more dates. A comparison between nested models, where one is obtained by restricting coefficients in the other, can be distorted if their apparent fit differences also reflect different samples.

Define the common estimation window before comparing models or applying a fit-loss test. Record the number of usable observations after each transformation. This is the time-series version of keeping samples fixed in multiple regression: a numerical model comparison is informative only when we know which history each equation actually uses.

A two-lag model loses the first two observations if no earlier data are available.

Define the common estimation window before comparing models or applying a fit-loss test.

### 20. Trace the actual monthly lag pattern

Reproduce the evidence, then explain its economic meaning.

Run lab_10.do. Record the current, one-month-lagged and two-month-lagged unemployment coefficients. Calculate their sum and compare it with lincom. Explain the difference between the sequence after a one-month unit increase and the long-run level contrast after a permanent increase in this finite-lag model.

Extend unemployment lags from two to three months. First restrict both fits to the same 105 available months. Compare the cumulative coefficients and their lincom SEs. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Extend unemployment lags from two to three months. First restrict both fits to the same 105 available months. Compare the cumulative coefficients and their lincom SEs. Keep your commands, log, output and interpretation.

### 21. Trace the actual monthly lag pattern: explanation

A reproducible result needs both a calculation and an interpretation.

The three coefficients are -0.021834, -0.002771 and 0.002824. Their sum is -0.021781 in log-accident units per unemployment-rate unit. The covariance among estimates matters for the SE of that sum, which is why lincom is useful.

A one-month unit increase has those dated fitted responses, then no further direct effect in this finite two-lag specification. Their sum is the cumulative log-outcome response. A permanent unit increase eventually activates all three terms at once, giving the same sum as a long-run level contrast. An equation with a lagged outcome needs a different multiplier calculation and stability assumptions.

On the common 105 months, the two-lag sum is -0.018658 (SE 0.003752) and the three-lag sum is -0.018684 (SE 0.003761). Common-sample comparison separates changed lag specification from the loss of another initial observation.

Common 105 months: two-lag sum \(-0.018658\); three-lag sum \(-0.018684\).

Corresponding robust SEs: \(0.003752\) and \(0.003761\).

Fixing the sample isolates the change in lag specification.

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 22. Strict exogeneity

Try the comparison before opening the explanation.

Define strict and contemporaneous exogeneity for a time-series regression using \(x_t\) and error \(u_t\). Which is stronger?

Trace the current-error-to-future-policy route. Compare whether future regressors appear in the conditioning information.

**Practice:** Define strict and contemporaneous exogeneity for a time-series regression using \(x_t\) and error \(u_t\). Which is stronger?

### 23. Strict exogeneity: explanation

Follow the calculation and interpret its units.

Contemporaneous exogeneity requires \(E(u_t\mid x_t)=0\). Strict exogeneity requires \(E(u_t\mid x_1,\ldots,x_T)=0\) for every t, including future regressors. Strict implies contemporaneous, but the reverse need not hold. These statements use \(x_t\) as the entire regressor vector.

Contemporaneous exogeneity requires \(E(u_t\mid x_t)=0\). Strict exogeneity requires \(E(u_t\mid x_1,\ldots,x_T)=0\) for every t, including future regressors. Strict implies contemporaneous, but the reverse need not hold. These statements use \(x_t\) as the entire regressor vector.

### 24. A count and a rate answer different questions

Exposure can change while individual risk stays fixed.

Total accidents can rise because there is more driving, even if risk per trip falls. A rate divides a count by an exposure measure, such as vehicle distance or population, depending on the target. Choosing the denominator changes the question and can introduce its own measurement problems.

Our current outcome is the recorded statewide count, logged for the fitted comparison. Do not silently describe it as an accident probability. If the ministry cares about safety per kilometre, identify the exposure data needed and formulate that rate explicitly. A statistically careful regression cannot compensate for an outcome that does not match the policy question.

Total accidents can rise because there is more driving, even if risk per trip falls.

Our current outcome is the recorded statewide count, logged for the fitted comparison.

### 25. DAG practice: dated policy feedback

Trace the routes before choosing a control.

Current unexpected accident causes can affect current accidents and hence next month’s policy. Trace that dated route. Why can it challenge strict exogeneity without requiring a future policy to cause an earlier accident?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Current unexpected accident causes can affect current accidents and hence next month’s policy. Trace that dated route. Why can it challenge strict exogeneity without requiring a future policy to cause an earlier accident?

### 26. DAG practice: dated policy feedback: explanation

Explain what conditioning changes in this stated graph.

The route is \(u_t\rightarrow Y_t\rightarrow X_{t+1}\). It provides a reason that the current disturbance can be related to future regressors, which strict exogeneity conditions on. Every causal arrow still moves forward through the policy process.

A sequential mean assumption uses a different information set and can be considered when current policy is chosen before the current unexpected cause, subject to the full model and timing assumptions. The graph does not prove that assumption. It makes clear why the strict version should not be imposed merely because the observations have dates.

The route is \(u_t\rightarrow Y_t\rightarrow X_{t+1}\). It provides a reason that the current disturbance can be related to future regressors, which strict exogeneity conditions on. Every causal arrow still moves forward through the policy process. A sequential mean assumption uses a different information set and can be considered when current policy is chosen before the current unexpected cause, subject to the full model and timing assumptions. The graph does not prove that assumption. It makes clear why the strict version should not be imposed merely because the observations have dates.

### 27. Lag sum

Try the comparison before opening the explanation.

A finite distributed-lag model has coefficients 0.2, 0.1 and −0.05 on current x, lag 1 and lag 2. Compute the impact and the cumulative response to a one-period unit increase in x.

Write the temporary and permanent paths separately. State whether the sum refers to responses across dates or the outcome difference at a late date.

**Practice:** A finite distributed-lag model has coefficients 0.2, 0.1 and −0.05 on current x, lag 1 and lag 2. Compute the impact and the cumulative response to a one-period unit increase in x.

### 28. Lag sum: explanation

Follow the calculation and interpret its units.

Impact is 0.2. The three-period cumulative response is \(0.2+0.1-0.05=0.25\) outcome units. In this finite-lag model, a permanent unit x increase has a long-run level effect of 0.25 as well. A model also containing earlier outcomes needs a different long-run calculation, developed next.

Impact is 0.2. The three-period cumulative response is \(0.2+0.1-0.05=0.25\) outcome units. In this finite-lag model, a permanent unit x increase has a long-run level effect of 0.25 as well. A model also containing earlier outcomes needs a different long-run calculation, developed next.

### 29. Explain a dynamic result with a time path

One label such as effect is not enough.

A useful dynamic report states the data frequency, timing of the X change, immediate response, relevant later responses and uncertainty for any stated sum or long-run contrast. It says whether the scenario is temporary or permanent and which stability and exogeneity conditions support it.

For the accident application, describe dated unemployment associations rather than a causal experiment unless the design identifies that variation. For a constructed model with a known shock, explain the known assumptions explicitly. This keeps a graph of responses from carrying a stronger interpretation than its source supports.

The dated-input DAG adapts the earlier ECO603 distributed-lag diagram. An earlier input can change the outcome directly and through later input values. Holding the later inputs fixed isolates a different route from allowing the input process to propagate naturally. The finite-lag coefficients describe partial dated-input contrasts; an innovation that changes several future input values requires tracing that entire input path.

### 30. DAG practice: partial lag effect or propagated input change?

Trace the routes before choosing a control.

An earlier input influences the outcome directly and by changing later input values. Which routes remain if the later inputs are held fixed? Why can the response to a naturally propagated input innovation differ from the coefficient on that earlier input?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** An earlier input influences the outcome directly and by changing later input values. Which routes remain if the later inputs are held fixed? Why can the response to a naturally propagated input innovation differ from the coefficient on that earlier input?

### 31. DAG practice: partial lag effect or propagated input change?: explanation

Explain what conditioning changes in this stated graph.

Holding both later inputs fixed blocks the routes through those input nodes. The direct earlier-input-to-current-outcome route remains. Its partial contrast differs from an intervention that also changes later values of the input process.

For a propagated innovation, trace the resulting entire input path and combine it with the distributed-lag coefficients. For a one-period imposed regressor increase, specify that all other dates remain fixed. A sum of lag coefficients is meaningful for the stated path and model; the word shock alone does not define which path was changed.

Holding both later inputs fixed blocks the routes through those input nodes. The direct earlier-input-to-current-outcome route remains. Its partial contrast differs from an intervention that also changes later values of the input process. For a propagated innovation, trace the resulting entire input path and combine it with the distributed-lag coefficients. For a one-period imposed regressor increase, specify that all other dates remain fixed. A sum of lag coefficients is meaningful for the stated path and model; the word shock alone does not define which path was changed.

