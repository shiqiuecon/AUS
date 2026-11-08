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

Use a constructed finite-lag model with current-input coefficient 0.2, one-period-lag coefficient 0.1 and two-period-lag coefficient minus 0.05. Raise X by one at a single date and keep all its other dates fixed. The fitted outcome change is 0.2 immediately, 0.1 one period later and minus 0.05 two periods later. It is zero afterward in this specification.

The immediate change is the impact response. Adding the three dated outcome changes gives 0.25, the cumulative response to that imposed temporary input path. It is not the outcome difference at the final date. The input path has been specified externally; if an economic innovation also changes later X values, we must include those additional input changes when tracing its outcome response.

Horizon \(h\): \(0,1,2,3\)

Temporary-input responses: \(0.20,0.10,-0.05,0\)

Cumulative response: \(0.20+0.10-0.05=0.25\)

## 05. A permanent change has another time path

The long-run level effect reaches the lag sum in this model.

Now raise X by one at the starting date and keep it one unit higher at every later date. The current coefficient contributes 0.2 immediately. At the next date, both current and lag-one inputs are higher, so the outcome difference is 0.3. From the third date onward, all three input terms are active and the difference is 0.25.

The same sum of coefficients is now a long-run level contrast, because it describes the outcome difference at each sufficiently late date. In the temporary experiment it was a sum of outcome changes over dates. This numerical equality belongs to this finite distributed-lag model without a lagged outcome. It does not make the two paths equivalent, and a causal interpretation still requires the stated input intervention and exogeneity assumptions.

Permanent-input responses: \(0.20,0.30,0.25,0.25,\ldots\)

Temporary cumulative response and permanent long-run level contrast are different quantities.

## 06. Lag sum

Try the comparison before opening the explanation.

A finite distributed-lag model has coefficients 0.2, 0.1 and −0.05 on current x, lag 1 and lag 2. Compute the impact and the cumulative response to a one-period unit x shock.

Write the temporary and permanent paths separately. State whether the sum refers to responses across dates or the outcome difference at a late date.

**Practice:** A finite distributed-lag model has coefficients 0.2, 0.1 and −0.05 on current x, lag 1 and lag 2. Compute the impact and the cumulative response to a one-period unit x shock.

## 07. Lag sum: explanation

Follow the calculation and interpret its units.

Impact is 0.2. The three-period cumulative response is \(0.2+0.1-0.05=0.25\) outcome units. In this finite-lag model, a permanent unit x increase has a long-run level effect of 0.25 as well. An autoregressive dependent-variable model has a different multiplier formula.

Impact is 0.2. The three-period cumulative response is \(0.2+0.1-0.05=0.25\) outcome units. In this finite-lag model, a permanent unit x increase has a long-run level effect of 0.25 as well. An autoregressive dependent-variable model has a different multiplier formula.

## 08. Introduce the uncertainty option before reading the lag table

Newey–West changes the covariance estimate around an unchanged OLS fit.

The lag regression is estimated from repeated months, so its errors may move together across time. We use Newey–West inference, a way to estimate coefficient uncertainty while allowing unequal error spread and limited time dependence under appropriate large-sample conditions. The broader name is heteroskedasticity-and-autocorrelation-consistent covariance estimation, abbreviated HAC. Autocorrelation means correlation between a series and its own values at other dates.

The four-lag option here includes error-related covariance information through four months. It does not insert four outcome lags into the mean equation or change the OLS coefficients. We develop the covariance weights and assumptions in Meeting 11. For this table, read the estimated lag coefficients as the dated fitted associations, and keep the uncertainty choice separate from whether unemployment changes identify a causal effect.

Newey–West/HAC: allow suitable unequal spread and time dependence in uncertainty estimation.

Four covariance lags here mean four months; the mean equation is unchanged.

## 09. Read the observed lag estimates

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

## 10. Estimate uncertainty for the lag sum

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

## 11. An AR(1) model carries the outcome forward

The persistence parameter determines whether shocks fade.

An autoregressive model predicts a series using its own earlier values. Order one means that the immediately preceding outcome enters. In the equation, a is an intercept, rho is the coefficient carrying yesterday's level into today, and epsilon is a new innovation: an unexpected disturbance with mean zero given the earlier history.

Set rho to 0.6 and give the series a one-unit innovation, holding later innovations fixed. Its level difference is one immediately, 0.6 next period, 0.36 after that and progressively smaller values later. Contrast rho equal to one: the difference remains one at every later date. The first process forgets the original innovation, while the second keeps it. These paths give an intuitive basis for the stability and stationarity definitions that follow.

\(Y_t=a+\rho Y_{t-1}+\varepsilon_t\)

One innovation with \(\rho=0.6\): \(1,0.6,0.36,0.216,\ldots\)

## 12. A unit root does not let shocks fade in the usual way

A random walk accumulates innovations.

With rho equal to one and no intercept, the autoregression becomes a random walk: today's value is yesterday's value plus a new innovation. Starting at zero, it equals the sum of all innovations so far. A one-unit innovation is never automatically reversed by the model, so its effect on the level remains one at later dates. This persistence is called a unit root in the AR(1) case.

If independent innovations have variance sigma squared, the variance of the level after t dates is t times sigma squared. It grows with the calendar rather than remaining stable. The first difference, today's level minus yesterday's, is just the innovation in this simple model. Differencing can remove this particular accumulation, but it also changes the economic target from levels to changes.

Random walk: \(Y_t=Y_{t-1}+\varepsilon_t\)

If \(Y_0=0\), \(\operatorname{Var}(Y_t)=t\sigma^2\)

\(\Delta Y_t=\varepsilon_t\)

## 13. Stationarity describes stable statistical features

Specify which definition is being used.

Covariance stationarity means that a series has a constant finite mean and variance, and covariance between two dates depends on their separation rather than on which calendar dates they are. Observations can still fluctuate and be related across time. The random walk fails this definition because its variance grows with the date.

For an AR(1) with independent mean-zero, finite-variance innovations and absolute rho below one, a stationary regime exists: old innovations receive progressively smaller weights. Exact stationarity also requires an initial distribution consistent with that regime; an arbitrary starting value can create an initial adjustment period. Strict stationarity is a different definition requiring every joint distribution, the probabilities for a collection of dates, to be unchanged when all those dates shift together. With finite second moments it implies covariance stationarity, but the converse need not hold. Our main calculations use the covariance definition.

Covariance stationary: stable finite mean/variance and lag-dependent covariance.

AR(1) stationary regime requires \(|\rho|<1\) and suitable innovations/initialization.

Strict stationarity concerns full joint distributions.

## 14. A permanent input change can be amplified by outcome persistence

Solve for the steady difference instead of adding coefficients blindly.

Now add a current input to the autoregression, with input coefficient 0.2 and rho equal to 0.6. Raise the input by one permanently, hold other inputs and innovations fixed, and start both paths at the same previous outcome. The fitted difference is 0.2 immediately. Next it is 0.6 times 0.2 plus 0.2, or 0.32; after that it is 0.392.

As the path settles, the same long-run difference appears on both sides of the recursion. Call it delta Y. Then delta Y equals 0.6 times delta Y plus 0.2. Solving gives 0.5. More generally, the stable long-run multiplier is beta divided by one minus rho. This argument needs stability and a permanent input path. It is different from summing only the directly included input-lag coefficients.

\(\Delta Y_h=0.6\Delta Y_{h-1}+0.2:\quad0.20,0.32,0.392,\ldots\)

\(\Delta Y=0.6\Delta Y+0.2\Rightarrow\Delta Y=0.5\)

Long-run multiplier: \(\beta/(1-\rho)\) for a stable recursion.

## 15. AR long run

Try the comparison before opening the explanation.

For \(Y_t=a+0.6Y_{t-1}+0.2X_t+e_t\), what is the long-run response to a permanent unit increase in x under a stable model?

Write the recursion for the difference between two paths. In a stable long run, solve for the same level difference on both sides.

**Practice:** For \(Y_t=a+0.6Y_{t-1}+0.2X_t+e_t\), what is the long-run response to a permanent unit increase in x under a stable model?

## 16. AR long run: explanation

Follow the calculation and interpret its units.

The steady-state change solves \(\Delta Y=0.6\Delta Y+0.2\), so \(\Delta Y=0.2/(1-0.6)=0.5\). This calculation assumes a stable dynamic relation and an exogenous permanent x change with other determinants fixed.

The steady-state change solves \(\Delta Y=0.6\Delta Y+0.2\), so \(\Delta Y=0.2/(1-0.6)=0.5\). This calculation assumes a stable dynamic relation and an exogenous permanent x change with other determinants fixed.

## 17. Inspect persistence in the accident model

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

## 18. Differencing changes the target relationship

It can remove an accumulating level component in a specific model.

For the simple random walk, first differencing leaves the innovation. For other processes, differencing may produce a more stable series, but it can also remove useful level information or introduce additional dependence. It is not a universal instruction to difference every variable.

A level relationship and a relationship between changes answer different empirical questions. If studying monthly percentage growth, a difference of natural logs is approximately a growth rate. State why the transformed outcome is appropriate and which long-run question is no longer being estimated directly. Transformation should follow the data process and research target.

For the simple random walk, first differencing leaves the innovation.

A level relationship and a relationship between changes answer different empirical questions.

## 19. Unrelated trending series can appear related

A high R-squared can be misleading.

Two independent series with accumulating random shocks can produce a striking regression fit in levels even without an economic relationship. This is the spurious-regression concern: familiar t statistics and fit measures can look persuasive when the series do not satisfy the usual regression asymptotics.

Inspect time plots and model the source of persistence before interpreting a slope. A common deterministic trend, a stochastic trend and stable fluctuations require different treatments. The purpose is not to reject all level regressions, but to establish why the selected equation and inference are justified for the histories being compared.

Two independent series with accumulating random shocks can produce a striking regression fit in levels even without an economic relationship.

Inspect time plots and model the source of persistence before interpreting a slope.

## 20. Trending regression

Try the comparison before opening the explanation.

Two unrelated series both rise over time and produce a high \(R^2\) when regressed on each other. What should you do before interpreting the slope?

A high fit can come from unrelated persistent paths. Ask whether the regression errors and reference approximation satisfy the needed conditions.

**Practice:** Two unrelated series both rise over time and produce a high \(R^2\) when regressed on each other. What should you do before interpreting the slope?

## 21. Trending regression: explanation

Follow the calculation and interpret its units.

Inspect their time plots and consider deterministic trends, stochastic trends and stationarity. A high \(R^2\) does not establish a meaningful relationship. Choose a specification and inference procedure justified by the series' properties; differencing every series automatically is also not a substitute for reasoning.

Inspect their time plots and consider deterministic trends, stochastic trends and stationarity. A high \(R^2\) does not establish a meaningful relationship. Choose a specification and inference procedure justified by the series' properties; differencing every series automatically is also not a substitute for reasoning.

## 22. Weak dependence concerns information far apart in time

Persistence and large-sample reasoning must be compatible.

In the stable AR example, an innovation's contribution is multiplied by 0.6 at each additional date. Far-apart observations therefore share less of the same old innovation. This fading connection motivates weak dependence: sufficiently distant observations are related weakly enough for the averaging and limit arguments being used.

Stationarity and weak dependence are separate conditions. A series can have stable distributions while retaining a common random component forever. Conversely, a deterministic trend can violate stationarity without being a random walk. For time-series inference, name both the stability of the process and the conditions limiting dependence. A stationary-looking plot alone does not verify either assumption.

Weak dependence: sufficiently distant information becomes weak enough for the stated limit result.

Stationarity alone does not guarantee that time averages behave like independent draws.

## 23. The sample changes when lags are added

Compare fit and tests on compatible observations.

A two-lag model loses the first two observations if no earlier data are available. Adding more lags can remove still more dates. A comparison between nested models can be distorted if their apparent fit differences also reflect different samples.

Define the common estimation window before comparing models or applying a fit-loss test. Record the number of usable observations after each transformation. This is the time-series version of keeping samples fixed in multiple regression: a numerical model comparison is informative only when we know which history each equation actually uses.

A two-lag model loses the first two observations if no earlier data are available.

Define the common estimation window before comparing models or applying a fit-loss test.

## 24. Explain a dynamic result with a time path

One label such as effect is not enough.

A useful dynamic report states the data frequency, timing of the X change, immediate response, relevant later responses and uncertainty for any sum or multiplier. It says whether the scenario is temporary or permanent and which stability and exogeneity conditions support it.

For the accident application, describe dated unemployment associations rather than a causal experiment unless the design identifies that variation. For a constructed model with a known shock, explain the known assumptions explicitly. This keeps a graph of responses from carrying a stronger interpretation than its source supports.

The dated-input DAG adapts the earlier ECO603 distributed-lag diagram. An earlier input can change the outcome directly and through later input values. Holding the later inputs fixed isolates a different route from allowing the input process to propagate naturally. The finite-lag coefficients describe partial dated-input contrasts; an innovation that changes several future input values requires tracing that entire input path.

## 25. DAG practice: partial lag effect or propagated input change?

Trace the routes before choosing a control.

An earlier input influences the outcome directly and by changing later input values. Which routes remain if the later inputs are held fixed? Why can the response to a naturally propagated input innovation differ from the coefficient on that earlier input?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** An earlier input influences the outcome directly and by changing later input values. Which routes remain if the later inputs are held fixed? Why can the response to a naturally propagated input innovation differ from the coefficient on that earlier input?

## 26. DAG practice: partial lag effect or propagated input change?: explanation

Explain what conditioning changes in this stated graph.

Holding both later inputs fixed blocks the routes through those input nodes. The direct earlier-input-to-current-outcome route remains. Its partial contrast differs from an intervention that also changes later values of the input process.

For a propagated innovation, trace the resulting entire input path and combine it with the distributed-lag coefficients. For a one-period imposed regressor increase, specify that all other dates remain fixed. A sum of lag coefficients is meaningful for the stated path and model; the word shock alone does not define which path was changed.

Holding both later inputs fixed blocks the routes through those input nodes. The direct earlier-input-to-current-outcome route remains. Its partial contrast differs from an intervention that also changes later values of the input process. For a propagated innovation, trace the resulting entire input path and combine it with the distributed-lag coefficients. For a one-period imposed regressor increase, specify that all other dates remain fixed. A sum of lag coefficients is meaningful for the stated path and model; the word shock alone does not define which path was changed.

## 27. Trace the actual monthly lag pattern

Reproduce the evidence, then explain its economic meaning.

Run meeting_10.do. Record the current, one-month-lagged and two-month-lagged unemployment coefficients. Calculate their sum and compare it with lincom. Explain the difference between the sequence after a one-month unit increase and the long-run level contrast after a permanent increase in this finite-lag model.

Extend unemployment lags from two to three months. First restrict both fits to the same 105 available months. Compare the cumulative coefficients and their lincom SEs. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Extend unemployment lags from two to three months. First restrict both fits to the same 105 available months. Compare the cumulative coefficients and their lincom SEs. Keep your commands, log, output and interpretation.

## 28. Trace the actual monthly lag pattern: explanation

A reproducible result needs both a calculation and an interpretation.

The three coefficients are -0.021834, -0.002771 and 0.002824. Their sum is -0.021781 in log-accident units per unemployment-rate unit. The covariance among estimates matters for the SE of that sum, which is why lincom is useful.

A one-month unit increase has those dated fitted responses, then no further direct effect in this finite two-lag specification. Their sum is the cumulative log-outcome response. A permanent unit increase eventually activates all three terms at once, giving the same sum as a long-run level contrast. An equation with a lagged outcome needs a different multiplier calculation and stability assumptions.

On the common 105 months, the two-lag sum is -0.018658 (SE 0.003752) and the three-lag sum is -0.018684 (SE 0.003761). Common-sample comparison separates changed lag specification from the loss of another initial observation.

Common 105 months: two-lag sum \(-0.018658\); three-lag sum \(-0.018684\).

Corresponding robust SEs: \(0.003752\) and \(0.003761\).

Fixing the sample isolates the change in lag specification.

## 29. Next, examine what the fitted errors still remember

Dynamics and uncertainty are related but distinct.

We have defined stationary behaviour, distributed lags and autoregressive persistence, and distinguished several dynamic contrasts. These tools help describe the conditional mean and the time path relevant to the question.

The next lesson studies serial correlation in what the model leaves unexplained. We will see why a conventional SE may miss cross-date covariance, why a heteroskedasticity-robust option is not enough for arbitrary time dependence and why HAC changes uncertainty without curing an endogenous dynamic regressor. Keep today's distinction between the mean equation and its error process in mind.

We have defined stationary behaviour, distributed lags and autoregressive persistence, and distinguished several dynamic contrasts.

The next lesson studies serial correlation in what the model leaves unexplained.

