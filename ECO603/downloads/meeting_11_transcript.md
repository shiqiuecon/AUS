# 11. Time series: stationarity, persistence and dynamic completeness

Use persistence and stationarity to decide what a fitted time-series relationship describes.

## Core lesson

### 01. When is a persistent time series stable enough for the model?

A lagged outcome can carry a shock forward for several periods. Our next question is whether this propagation settles into a stable process and whether past information still helps predict the remaining error. Stationarity concerns stability of distributions or moments; weak dependence concerns restrictions on information shared across distant dates.

We now introduce an autoregressive model, which predicts an outcome using its own past values. We compare a fading response with a random walk, in which new shocks accumulate permanently, and then examine a finite-memory moving-average example. We then make dynamic completeness explicit. These are assumptions and modelling questions, not conclusions that follow from seeing a smooth line in the data.

Distinguish persistence, stationarity and dependence.

Then ask whether the conditional mean has used the relevant past information.

### 02. An AR(1) model carries the outcome forward

The persistence parameter determines whether shocks fade.

An autoregressive model predicts a series using its own earlier values. Order one means that the immediately preceding outcome enters. In the equation, a is an intercept, rho is the coefficient carrying yesterday's level into today, and epsilon is a new innovation: an unexpected disturbance with mean zero given the earlier history.

Set rho to 0.6 and give the series a one-unit innovation, holding later innovations fixed. Its level difference is one immediately, 0.6 next period, 0.36 after that and progressively smaller values later. Contrast rho equal to one: the difference remains one at every later date. The first process forgets the original innovation, while the second keeps it. These paths give an intuitive basis for the stability and stationarity definitions that follow.

\(Y_t=a+\rho Y_{t-1}+\varepsilon_t\)

One innovation with \(\rho=0.6\): \(1,0.6,0.36,0.216,\ldots\)

### 03. Stationarity describes stable statistical features

Specify which definition is being used.

Covariance stationarity means that a series has a constant finite mean and variance, and covariance between two dates depends on their separation rather than on which calendar dates they are. Observations can still fluctuate and be related across time. The rho-equals-one accumulation just traced fails this definition when its variance grows with the date.

For an AR(1) with independent mean-zero, finite-variance innovations and absolute rho below one, a stationary regime exists: old innovations receive progressively smaller weights. Exact stationarity also requires an initial distribution consistent with that regime; an arbitrary starting value can create an initial adjustment period. Strict stationarity is a different definition requiring every joint distribution, the probabilities for a collection of dates, to be unchanged when all those dates shift together. With finite second moments it implies covariance stationarity, but the converse need not hold. Our main calculations use the covariance definition.

Covariance stationary: stable finite mean/variance and lag-dependent covariance.

AR(1) stationary regime requires \(|\rho|<1\) and suitable innovations/initialization.

Strict stationarity concerns full joint distributions.

### 04. Strict and covariance stationarity make different distributional claims

Moment statements require the corresponding moments to exist.

Strict stationarity means that every finite collection of observations has the same joint distribution after a common shift in its dates. Covariance stationarity asks only for a constant finite mean and variance, and for covariance between dates to depend on their distance rather than their calendar location.

In the notation, gamma of h denotes covariance between observations h periods apart; gamma of zero is the variance. Strict stationarity with finite second moments implies covariance stationarity. Without those moments, the mean and variance may not even exist. Neither definition alone supplies every dependence condition needed for a central limit theorem. In an applied model with deterministic trends or seasonal terms, the relevant stability claim may concern the remaining process after those terms have been accounted for.

Strict: \((Y_{t_1},\ldots,Y_{t_m})\) and \((Y_{t_1+h},\ldots,Y_{t_m+h})\) share a distribution.

Covariance stationary: \(EY_t=\mu\), \(\operatorname{Var}(Y_t)=\gamma(0)<\infty\), \(\operatorname{Cov}(Y_t,Y_{t-h})=\gamma(h)\).

Stationarity and sufficient weak-dependence conditions are distinct.

### 05. A moving-average example makes shared shocks visible

An MA(1) observation shares one innovation with its neighbour.

Let e subscript t denote independent shocks with mean zero and variance sigma squared. A moving-average process of order one, abbreviated MA one, adds the current shock to theta times the previous shock. Theta is a fixed coefficient. The process variance is one plus theta squared, multiplied by sigma squared. Consecutive observations share the previous shock, so their covariance is theta times sigma squared.

Observations separated by at least two dates use disjoint independent shocks in this example. Take theta equal to one half and give each shock variance one. The process variance is then 1.25. The covariance of neighbours is one half. Dividing that covariance by 1.25 gives their correlation, 0.4. Rho of h denotes this lag-h correlation, rather than the single carry-over coefficient rho in the earlier autoregression. This is a concrete finite-memory example with the needed moments; correlation decay alone is not a general proof of every large-sample theorem.

\(Y_t=e_t+\theta e_{t-1}\), with iid mean-zero shocks of variance \(\sigma^2\).

\(\gamma(0)=(1+\theta^2)\sigma^2\), \(\gamma(1)=\theta\sigma^2\), \(\gamma(h)=0\) for \(|h|\ge2\).

At \(\theta=0.5,\sigma^2=1\): \(\rho(1)=0.5/1.25=0.4\).

### 06. A unit root does not let shocks fade in the usual way

A random walk accumulates innovations.

With rho equal to one and no intercept, the autoregression becomes a random walk: today's value is yesterday's value plus a new innovation. Starting at zero, it equals the sum of all innovations so far. A one-unit innovation is never automatically reversed by the model, so its effect on the level remains one at later dates. This persistence is called a unit root in the AR(1) case.

If independent innovations have variance sigma squared, the variance of the level after t dates is t times sigma squared. It grows with the calendar rather than remaining stable. The first difference, today's level minus yesterday's, is just the innovation in this simple model. Differencing can remove this particular accumulation, but it also changes the economic target from levels to changes.

Random walk: \(Y_t=Y_{t-1}+\varepsilon_t\)

If \(Y_0=0\), \(\operatorname{Var}(Y_t)=t\sigma^2\)

\(\Delta Y_t=\varepsilon_t\)

### 07. A permanent input change can be amplified by outcome persistence

Solve for the steady difference instead of adding coefficients blindly.

Now add a current input to the autoregression, with input coefficient 0.2 and rho equal to 0.6. Raise the input by one permanently, hold other inputs and innovations fixed, and start both paths at the same previous outcome. The fitted difference is 0.2 immediately. Next it is 0.6 times 0.2 plus 0.2, or 0.32; after that it is 0.392.

As the path settles, the same long-run difference appears on both sides of the recursion. Call it delta Y. Then delta Y equals 0.6 times delta Y plus 0.2. Solving gives 0.5. More generally, the stable long-run multiplier is beta divided by one minus rho. This argument needs stability and a permanent input path. It is different from summing only the directly included input-lag coefficients.

\(\Delta Y_h=0.6\Delta Y_{h-1}+0.2:\quad0.20,0.32,0.392,\ldots\)

\(\Delta Y=0.6\Delta Y+0.2\Rightarrow\Delta Y=0.5\)

Long-run multiplier: \(\beta/(1-\rho)\) for a stable recursion.

### 08. Inspect persistence in the accident model

The fitted lag is a conditional association.

The lagged log-accident coefficient is 0.678, with HAC SE 0.083, in a model containing the lagged outcome, trend and month effects, without the law and economic controls. The later expanded dynamic fit adds those inputs, so its lagged-outcome coefficient need not agree. Its positive magnitude suggests substantial persistence in the fitted outcome after those controls.

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

### 09. Differencing changes the target relationship

It can remove an accumulating level component in a specific model.

For the simple random walk, first differencing leaves the innovation. For other processes, differencing may produce a more stable series, but it can also remove useful level information or introduce additional dependence. It is not a universal instruction to difference every variable.

A level relationship and a relationship between changes answer different empirical questions. If studying monthly percentage growth, a difference of natural logs is approximately a growth rate. State why the transformed outcome is appropriate and which long-run question is no longer being estimated directly. Transformation should follow the data process and research target.

For the simple random walk, first differencing leaves the innovation.

A level relationship and a relationship between changes answer different empirical questions.

### 10. Unrelated trending series can appear related

A high R-squared can be misleading.

Two independent series with accumulating random shocks can produce a striking regression fit in levels even without an economic relationship. This is the spurious-regression concern: familiar t statistics and fit measures can look persuasive when the series do not satisfy the usual regression asymptotics.

Inspect time plots and model the source of persistence before interpreting a slope. A common deterministic trend, a trend built from accumulated random changes and stable fluctuations require different treatments. The purpose is not to reject all level regressions, but to establish why the selected equation and inference are justified for the histories being compared.

Two independent series with accumulating random shocks can produce a striking regression fit in levels even without an economic relationship.

Inspect time plots and model the source of persistence before interpreting a slope.

### 11. Weak dependence concerns information far apart in time

Persistence and large-sample reasoning must be compatible.

In the stable AR example, an innovation's contribution is multiplied by 0.6 at each additional date. Far-apart observations therefore share less of the same old innovation. This fading connection motivates weak dependence: sufficiently distant observations are related weakly enough for the averaging and limit arguments being used.

Stationarity and weak dependence are separate conditions. A series can have stable distributions while retaining a common random component forever. Conversely, a deterministic trend can violate stationarity without being a random walk. For time-series inference, name both the stability of the process and the conditions limiting dependence. A stationary-looking plot alone does not verify either assumption.

Weak dependence: sufficiently distant information becomes weak enough for the stated limit result.

Stationarity alone does not guarantee that time averages behave like independent draws.

### 12. Dynamic completeness is a conditional-mean claim

Past information should not predict the remaining mean error.

A mean specification is dynamically complete relative to an information set if relevant earlier information cannot improve its conditional-mean prediction. This does not mean that every series must include every possible lag. It asks whether the history left out of the equation still predicts the outcome after the included variables have been used.

For accidents, earlier travel conditions or enforcement changes could carry information beyond current controls. A lagged outcome may summarize some of that history, but adding it changes the equation and can create a regressor–error relationship if the remaining error is persistent. We therefore state the timing and mean assumptions before reading its coefficient. A residual dependence test is evidence to investigate, not proof that one particular dynamic specification is correct.

Dynamic completeness: omitted history adds no conditional-mean prediction for the stated information set.

A lagged outcome changes both the comparison and the needed assumptions.

### 13. Define the information set before calling an error an innovation

A mean restriction is stronger than a failed residual-correlation test.

Let I t denote the information available for predicting the current outcome: the included current inputs and the relevant past observations. A dynamically complete conditional-mean model satisfies E of Y t given I t equals the stated mean m t. Its error is Y t minus m t, so its conditional mean given I t is zero. An error with this mean-unpredictability property is called an innovation relative to that information set.

If past errors are measurable from the past information and the needed moments exist, this restriction implies zero covariance with past errors. The reverse does not generally hold. A failed serial-correlation rejection also does not prove that no useful nonlinear or omitted predictor remains. When new lags are added, verify their timing and reassess the comparison rather than declaring dynamic completeness automatically restored.

\(I_t\): stated current inputs and past information; \(m_t=E[Y_t\mid I_t]\).

\(u_t=Y_t-m_t\Rightarrow E[u_t\mid I_t]=0\).

Mean unpredictability, zero autocovariance and a diagnostic test result are distinct.

### 14. Fit a dynamic conditional mean in the same monthly data

Try the comparison before opening the explanation.

Using traffic.csv, fit the model in the dynamic block of overleaf_technical.do. State the estimation dates, interpret the lagged log-accident coefficient, and explain why its estimated value does not prove stationarity or dynamic completeness. Save your own commands and robust output.

State the assumptions and units alongside the calculation.

**Practice:** Using traffic.csv, fit the model in the dynamic block of overleaf_technical.do. State the estimation dates, interpret the lagged log-accident coefficient, and explain why its estimated value does not prove stationarity or dynamic completeness. Save your own commands and robust output.

### 15. Fit a dynamic conditional mean in the same monthly data: explanation

Follow the calculation and interpret its units.

The first lag removes the initial observation, leaving 107 months for this complete dataset. The lagged log-accident coefficient is about 0.332658 with robust SE 0.090942. Interpret it conditional on the included calendar and policy regressors. A coefficient inside minus one and one is compatible with stability of that specified AR part, but does not establish the whole data-generating process or zero conditional mean given all relevant information.

The first lag removes the initial observation, leaving 107 months for this complete dataset. The lagged log-accident coefficient is about 0.332658 with robust SE 0.090942. Interpret it conditional on the included calendar and policy regressors. A coefficient inside minus one and one is compatible with stability of that specified AR part, but does not establish the whole data-generating process or zero conditional mean given all relevant information.

### 16. Add a lagged outcome with its timing made explicit

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

### 17. From dynamic completeness to serial-correlation diagnosis

An autoregressive model uses past outcomes, while a distributed-lag model describes the time pattern of an input. Stability and appropriate moment conditions are needed before turning those coefficients into long-run statements.

We next inspect what the fitted errors still remember across dates. Residual correlation can diagnose missing dynamics or a dependent error process, but a test result must be interpreted together with the regressors and the economic model.

From dynamic completeness to serial-correlation diagnosis

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 18. AR long run

Try the comparison before opening the explanation.

For \(Y_t=a+0.6Y_{t-1}+0.2X_t+e_t\), what is the long-run response to a permanent unit increase in x under a stable model?

Write the recursion for the difference between two paths. In a stable long run, solve for the same level difference on both sides.

**Practice:** For \(Y_t=a+0.6Y_{t-1}+0.2X_t+e_t\), what is the long-run response to a permanent unit increase in x under a stable model?

### 19. AR long run: explanation

Follow the calculation and interpret its units.

The steady-state change solves \(\Delta Y=0.6\Delta Y+0.2\), so \(\Delta Y=0.2/(1-0.6)=0.5\). This calculation assumes a stable dynamic relation and an exogenous permanent x change with other determinants fixed.

The steady-state change solves \(\Delta Y=0.6\Delta Y+0.2\), so \(\Delta Y=0.2/(1-0.6)=0.5\). This calculation assumes a stable dynamic relation and an exogenous permanent x change with other determinants fixed.

### 20. Trending regression

Try the comparison before opening the explanation.

Two unrelated series both rise over time and produce a high \(R^2\) when regressed on each other. What should you do before interpreting the slope?

A high fit can come from unrelated persistent paths. Ask whether the regression errors and reference approximation satisfy the needed conditions.

**Practice:** Two unrelated series both rise over time and produce a high \(R^2\) when regressed on each other. What should you do before interpreting the slope?

### 21. Trending regression: explanation

Follow the calculation and interpret its units.

Inspect their time plots and consider deterministic trends, stochastic trends and stationarity. A high \(R^2\) does not establish a meaningful relationship. Choose a specification and inference procedure justified by the series' properties; differencing every series automatically is also not a substitute for reasoning.

Inspect their time plots and consider deterministic trends, stochastic trends and stationarity. A high \(R^2\) does not establish a meaningful relationship. Choose a specification and inference procedure justified by the series' properties; differencing every series automatically is also not a substitute for reasoning.

