# 11. Serial correlation and honest uncertainty

## 01. Why can the same estimate have different uncertainty?

Monthly observations may share information; uncertainty calculations must account for it.

Imagine evaluating a traffic-safety law using monthly accident records. A month is one observation in this dataset. We observe total reported accidents in California from January 1981 through December 1989, giving 108 observations. We also observe unemployment, calendar information and whether two traffic laws were in force. Our outcome is total accidents, not fatal accidents or the risk faced by one driver.

Earlier, we used a regression model, an equation relating an outcome to explanatory variables, to estimate a relationship. We also used a standard error, or SE, to describe how much an estimated coefficient would vary across comparable datasets. Inference means using such estimates and their uncertainty to learn about a population relationship. Today we ask whether that uncertainty calculation needs to change when one month carries information about the next.

For example, bad road conditions or a change in enforcement may last several months. Those months can share influences that our recorded variables do not fully capture. They are then dependent: knowing something about one month helps us anticipate another. If we count them as independent observations, which would provide unrelated information, we may misjudge how much we have learned. Model errors are the part of the outcome outside the included relationship. When those errors are correlated across dates, we call it serial correlation. We will trace this problem through the graphs, then compare three SE calculations for the same regression.

**Practice:** Name a factor that might affect accidents for several consecutive months but is not fully measured in the dataset.

**Explanation:** A lasting change in road conditions, enforcement or reporting could affect several months. Such a shared influence can make the unexplained parts of their accident totals related.

## 02. Define the monthly accident model

State the outcome, law indicators, calendar controls and error term.

First define the variables so that we know what relationship the regression describes. Let t identify a month and \(A_t\) be its total reported accidents. The model uses log(\(A_t\)), the natural logarithm of the accident count. The logarithm is a transformation that lets differences in the fitted outcome describe proportional differences in counts. A log difference of 0.01 is approximately a 1% difference; later we will calculate the exact conversion.

Let \(B_t\) equal one when the seat-belt law is in force and zero otherwise. A variable coded zero or one is an indicator, also called a dummy variable. Define \(S_t\) similarly for the speed law. \(U_t\) is the unemployment rate and \(W_t\) is the number of weekends. The equation also includes a linear trend, a change at a constant fitted rate as months pass, and month effects, recurring differences between calendar months. Eleven month indicators compare February through December with January.

In the equation, a is a baseline intercept. The coefficients b, c, d and f multiply B, S, U and W, while g multiplies the time trend t. The error \(u_t\) is the part of the log outcome outside this included relationship. The coefficient b therefore describes a fitted difference in log accidents between law states, after accounting for the other listed variables. We will first investigate the remaining error pattern, then return to interpreting b.

In the displayed sum, D-m-t is the indicator for calendar month m and gamma-m is its coefficient. The sum includes February through December. January is represented by the intercept rather than a redundant twelfth indicator.

\(A_t\): monthly accidents; outcome: \(\log(A_t)\)

\(B_t,S_t\): seat-belt and speed-law indicators

\(U_t,W_t\): unemployment and weekend count

\(\log(A_t)=a+bB_t+cS_t+dU_t+fW_t+gt+\sum_{m=2}^{12}\gamma_mD_{mt}+u_t\)

\(D_{mt}\): month indicator; \(\gamma_m\): January-relative month shift

## 03. Separate the outcome pattern from the error pattern

Serial correlation concerns errors across dates, after specifying the model.

The raw accident graph shows the outcome before we account for its predictors. A pattern that repeats at the same part of each year is seasonality. A gradual movement across the years is a trend. The month indicators and time trend in our equation are intended to describe such patterns, so a pattern in the raw outcome is not automatically a problem in the remaining error.

We call the model's average outcome at given regressor values its conditional mean. 'Conditional' means that we specify the values of the explanatory variables when making the comparison. If the conditional-mean model is appropriate, its error averages to zero at those values. Serial correlation means that errors at different dates are correlated: for example, a positive error in one month tends to be followed by a positive error. Autocorrelation is another name for correlation across time within a series.

This distinction tells us what to examine next. First allow the model to account for trend, seasonality and the observed controls. Then inspect the residuals, the observed outcomes minus their fitted values. A seasonal accident series may have little residual dependence after this adjustment. Equally, a fairly stable accident series can leave related residuals. We need the residual graph to see what the fitted model has left unexplained.

**Practice:** Does a seasonal accident plot prove that the errors in a seasonally adjusted regression are serially correlated?

**Explanation:** No. Outcome seasonality can be explained by the included month effects. Residual dependence must be assessed after fitting the specified mean model.

## 04. Follow the residual path

Look for sequences of positive or negative residuals.

Each point now shows a residual from the fitted log-accident regression. A positive residual means more log accidents than the model predicts for that month; a negative one means fewer. Reveal the sequence gradually. Do several months remain on the same side of zero? Such a run is a visual sign that nearby residuals may be related.

Residuals help us study the errors, but they are not the errors themselves. We calculate residuals after estimating the model; the population errors are unobserved. A short sequence can also show runs by chance. We will therefore use the graph to understand the concern and later use a formal test to assess it under stated assumptions.

Why would a run matter for uncertainty? Suppose one unrecorded disruption affects four consecutive months. Those observations partly repeat information about the same disruption. They need not provide as much new information as four independent disruptions. The effect on a coefficient's SE depends on which months help estimate that coefficient and how their errors are related. To see the relation more directly, we will compare each residual with the preceding month's residual.

## 05. Compare one month with the previous month

Put the previous month's residual on the horizontal axis.

A lag is a value from an earlier date. A lag-one residual is the previous month's residual, written eₜ₋₁. In this lag plot, the horizontal axis shows eₜ₋₁ and the vertical axis shows the current residual eₜ. Each dot therefore represents two neighboring months, rather than an outcome and a policy variable.

Consider a dot in the upper-right part of the graph. Both residuals are positive: a month with more accidents than predicted followed another such month. In the lower-left part, both are negative. A tendency for dots to occupy those two regions suggests positive lag-one association. Positive means the values tend to have the same direction relative to their averages, not that both values must always be above zero.

There are 107 pairs because the first of our 108 residuals has no observed predecessor. The graph does not estimate the law's effect. It studies the pattern left after the accident regression. We can make that pattern easier to understand with a constructed process in which we choose how strongly one error carries into the next.

**Practice:** Why are there 107 residual pairs? What does a point in the upper-right region mean?

**Explanation:** The first residual has no observed predecessor. An upper-right point is a month with a positive residual preceded by another month with a positive residual.

## 06. See how an error can carry into the next month

An AR(1) process adds a new shock to a fraction of the previous error.

To study how errors carry over, consider \(u_t\)=\(\rho\)\(u_{t-1}\)+\(\varepsilon_t\). This is a first-order autoregressive process, abbreviated AR(1). 'Autoregressive' means that a value depends on its own past value, and 'first order' means one earlier period enters directly. Here \(u_t\) is the current error, \(\rho\), read 'rho', is the carry-over coefficient, and \(\varepsilon_t\) is a new, unpredictable change. Such a new change is called an innovation.

For this illustration, the innovations are independent and average to zero. If \(\rho\)=0.6 and last month's error is two, the part carried into this month is 1.2 before adding the new innovation. A positive \(\rho\) produces persistence: effects remain for several periods. A negative \(\rho\) tends to produce alternating signs. With |\(\rho\)|<1, meaning rho is between −1 and 1, an initial disturbance fades over time rather than growing on its own.

Move the control while keeping the same innovation draws. The graph is a simulation, data generated by a specified rule, rather than an estimated traffic-error process. It uses a burn-in: the first 300 generated periods are discarded so the starting value has little effect on the displayed path. Keeping the new shocks fixed helps us isolate what changing \(\rho\) does. The graph's vertical range adjusts to keep the path visible, so check the axis values as well as the shape.

\(u_t=\rho u_{t-1}+\varepsilon_t\)

\(\rho\): persistence; \(\varepsilon_t\): new unpredictable error

## 07. Separate the comparison, model and uncertainty

Related errors do not, by themselves, tell us whether the coefficient is valid.

The simulation shows how errors can be related over time. Before choosing a response, separate three questions. Are the regressors suitably unrelated to the error? Does the model account for the predictable parts of the outcome? Does the SE calculation allow for the dependence that remains? These concern the comparison, the model and uncertainty, respectively.

Exogeneity is the assumption that the regressors have the required lack of relation with the error. A common stronger version is strict exogeneity: the error at a date averages to zero given the regressors at all dates, including future ones. For example, a policy change made in response to unrecorded accident risk would make the policy variable related to the error and threaten this assumption. Endogeneity names this problem of a regressor being related to the error.

Serial correlation alone does not establish endogeneity. With an appropriate linear model and strict exogeneity, OLS, ordinary least squares, can remain unbiased even if errors are serially correlated. Unbiased means its average estimate across repeated datasets equals the population coefficient. Consistency is a different property: as the number of observations grows, the estimator approaches that coefficient. Serial dependence can be compatible with consistency when the needed stability, dependence and regressor conditions hold. We must therefore diagnose coefficient validity separately from how we calculate its SE. The next slide shows exactly where dependence enters the uncertainty calculation.

The two disturbance nodes carry persistence from one month to the next. Their arrows can create dependent outcomes even though the input nodes have no unblocked common-cause route to the corresponding disturbances in this assumed model. HAC estimates uncertainty allowing suitable remaining dependence; it does not remove the persistence arrows or add exogeneity when a different graph would violate it.

Exogeneity: required lack of relation between regressors and error

Mean model: which variables predict the outcome?

SE calculation: how much uncertainty remains?

## 08. Why dependence changes uncertainty

Related errors add covariance terms to the variance calculation.

Recall that an SE estimates the spread of a coefficient across comparable datasets. Variance is another measure of spread: the average squared distance from a variable's mean. Its square root is the standard deviation. Covariance measures how two variables move together around their means. A positive covariance means they tend to be above their means together or below their means together. These ideas let us see what dependence adds to uncertainty.

Start with the average of n errors, written mean u. The formula adds their individual variances and twice the covariances between different dates, then divides by n². The symbol \(\sum\) means 'add'; \(\sum\)ₛ<ₜ adds each pair of dates once. For two errors each with variance one and covariance zero, the average has variance (1+1)/4=0.5. If their covariance is 0.5, its variance becomes (1+1+2×0.5)/4=0.75. Averaging has removed less uncertainty because the errors move together.

An OLS coefficient also combines errors, with weights determined by the regressors. Its variance therefore depends on related cross-date terms, not just the variance of each error separately. Conventional SEs rely on a restrictive error structure. Heteroskedasticity-robust SEs allow unequal error variance, called heteroskedasticity, but generally leave out serial covariance terms. The average example explains why another adjustment may be needed; it is not the full formula for a regression SE.

\(\operatorname{Var}(\overline u)=\dfrac{\sum_t\operatorname{Var}(u_t)+2\sum_{s<t}\operatorname{Cov}(u_s,u_t)}{n^2}\)

Variance measures spread; covariance measures how two errors move together.

Two unit-variance errors: covariance \(0\Rightarrow0.5\); covariance \(0.5\Rightarrow0.75\)

## 09. Use HAC to account for unequal spread and time dependence

Newey–West keeps the OLS coefficients and changes their estimated uncertainty.

The missing covariance terms motivate HAC standard errors. HAC stands for heteroskedasticity and autocorrelation consistent. It describes a method for estimating uncertainty that can allow both unequal error variance and dependence across dates. Newey–West is the particular HAC method used here. It retains the OLS coefficients while estimating their variances and how the coefficient estimates vary together. The SE of a coefficient is the square root of its estimated variance.

Newey–West combines same-date information with contributions from pairs of dates separated by selected lags. For a regression, these contributions involve regressors multiplied by residuals, not residual correlations alone. A lag window specifies which lags enter and their weights. The graph shows Bartlett weights, which decline in a straight line as dates move further apart. Let L be the maximum lag and k a particular positive lag. Its weight is 1−k/(L+1), up to L. With L=4, the weights are 0.8, 0.6, 0.4 and 0.2.

The word 'consistent' is a condition-dependent claim, not a promise for any dataset. The covariance estimate can approach the needed population value as data increase when the model, error behaviour and lag-selection conditions support that result. Weak dependence means that relations between distant observations weaken sufficiently for such large-sample reasoning. A fixed four-lag classroom example does not establish those conditions. The graph explains the weights; next we will connect their lags to calendar time.

## 10. Interpret the lag in calendar time

Interpret the selected maximum lag using months or quarters.

Our maximum lag L must be interpreted using the data frequency, meaning how often we observe the series. These observations are monthly, so lag(4) allows covariance contributions through four months. In quarterly data, one observation covers three months; the same lag option would reach four quarters, or one year.

This maximum lag is also called a bandwidth in this setting. It controls how far apart two observations can be and still contribute directly to the estimated covariance. It does not add lagged accidents, lagged policy variables or more seasonal controls to the regression equation. Adding those variables would change the mean model; selecting this window changes the uncertainty calculation.

Move L in the graph and watch which weights remain positive. A larger window includes more estimated covariance contributions, but it does not guarantee a larger or better SE. Those extra terms can add noise, and their values can have different signs. The graph changes the taper weights only; it does not rerun Stata. To compare actual SEs for several windows, we would run the same regression with each stated lag choice and explain why those windows are plausible for the application.

\(w_k=1-\dfrac{k}{L+1},\quad k=0,\ldots,L\)

Bartlett weights taper the contribution of later error covariances.

**Practice:** For quarterly data, what calendar window is lag(12)? Does that option add twelve regressors?

**Explanation:** It reaches twelve quarters, or three years. It adjusts the covariance calculation; it adds no conditional-mean regressors.

## 11. What stays fixed in the three fits?

Hold the fitted model fixed and compare its three SE calculations.

We are now ready to compare the three SE methods in the actual accident regression. The outcome, regressors and 108 observations are identical in all three fits. Conventional, heteroskedasticity-robust and Newey–West calculations therefore report the same OLS law coefficient. The different bars show different estimated uncertainty, rather than three different estimated policy relationships.

Each bar is an approximate 95% confidence interval calculated as the estimate plus or minus 1.96 SEs. A confidence interval comes from a procedure designed to cover the population coefficient at its stated rate across comparable datasets. The multiplier 1.96 uses a normal reference distribution, the familiar bell-shaped pattern that gives a large-sample approximation under suitable conditions. Stata's tables use their own stated reference rule, so their interval endpoints differ slightly from this graph.

Notice that the robust SE is smaller than the conventional SE, while the HAC4 SE is larger. HAC4 means Newey–West with a maximum of four lags. There is no rule that a robust SE must always increase. We should choose a method because its assumptions match the dependence in the application, not because it gives the widest interval or the preferred test result. With that distinction clear, we can ask which problems this adjustment still leaves unresolved.

## 12. What an SE adjustment cannot repair

HAC changes uncertainty; it does not remove a regressor's relation with the error.

The SE adjustment deals with uncertainty, but it does not change which comparison the coefficient describes. Suppose the law is introduced when officials anticipate rising accident risk that our recorded variables do not capture. The law indicator is then related to the error: the endogeneity problem defined earlier. Newey–West leaves that relation, and the OLS coefficient, unchanged.

A related problem can arise after adding last month's outcome to the equation. This is a lagged outcome. It contains the influence of last month's error. If that error is related to this month's error, the lagged outcome may also be related to the current error. OLS can then be inconsistent: collecting more months does not necessarily make it approach the target coefficient. A different SE formula cannot remove that regressor–error relation.

This gives us a practical sequence. Check the comparison and the mean model before relying on an uncertainty adjustment. If the remaining concern is error dependence under a valid coefficient model, HAC may address it. If an included variable is related to the error, we need to reconsider the model or the source of the comparison. Next we will look more closely at how omitted predictable changes can create these difficulties.

**Practice:** A lagged outcome is correlated with the current error. What does an HAC option change, and what does it leave?

**Explanation:** It changes the estimated covariance around the fitted coefficients. It leaves the regressor–error correlation and potential coefficient inconsistency in place.

## 13. Check whether past information is still missing

Dynamic completeness concerns whether the model uses the relevant past information.

Suppose an unrecorded change in travel demand lasts for several months. If information from earlier months helps predict its effect on today's accidents, our model may be leaving out a predictable part of the outcome. Dynamic completeness means that, after the included variables are taken into account, additional relevant past information does not improve the prediction of the conditional mean. 'Dynamic' refers to how the relationship develops over time.

For example, yesterday's or last month's travel conditions may help explain today's outcome even after current unemployment and seasonality are included. Adding a justified lag can then change the fitted relationship and reduce the residual pattern. It can also reduce the sample, because the earliest observations may lack the required past values. We should explain which past information matters and why, rather than add variables only until a test gives a preferred answer.

There are now two separate tasks. One is to model predictable changes in accidents; the other is to estimate uncertainty when unexplained parts remain related. Improving the first task may help the second, but a residual pattern alone does not tell us which variable belongs in the causal comparison. The next slide compares adding lags with two methods that treat the error dependence in different ways.

Dynamic completeness: additional relevant past information does not improve the model's conditional mean

Adding a lag changes the fitted equation and may change the sample

HAC addresses uncertainty from dependence that remains

## 14. Choose the response that matches the problem

Adding lags, Newey–West and Prais–Winsten change different parts of the analysis.

Consider three responses to the problem we have traced. Adding a lagged regressor changes the equation used to explain accidents. This can change the coefficient interpretation, the estimates and the sample. Applying Newey–West to the same equation and sample keeps the OLS coefficients and changes their estimated uncertainty. Those methods therefore solve different parts of the problem.

A third response is Prais–Winsten, a method that uses an AR(1) model for the errors. It estimates the carry-over coefficient \(\rho\) and uses that estimate to transform the outcome and regressors. For later observations, the transformation subtracts an estimated fraction of the previous value from the current value; the first observation receives a special adjustment. This changes how observations enter the fit, so coefficients and SEs can both change. The method requires a credible error model and suitable exogeneity assumptions.

Return to the application before choosing. If the equation misses a predictable effect of earlier travel conditions, consider whether a lag belongs in the mean model. If the equation is appropriate but its errors remain dependent, justify an uncertainty calculation. Prais–Winsten adds stronger structure about the errors than the HAC approach. We will examine its software output next meeting. Today we will hold our equation fixed so that the Stata comparison isolates changes in the SE method.

Add regressors → change the conditional-mean model

HAC → retain OLS coefficients, change covariance estimate

Prais–Winsten → use an AR(1) error model; estimates can change

## 15. Run the conventional regression

Find the law coefficient and understand the labels before comparing SEs.

Open the do-file, the saved list of commands for this lesson, and run the conventional regression block. First check that Stata has the correct monthly time variable. The command tsset tells Stata which variable orders the observations in time. A correct time variable is needed before using lags. The script checks the dates against the recorded years and calendar-month indicators.

The code calls log(\(A_t\)) logacc, the seat-belt indicator beltlaw, the speed-law indicator spdlaw, unemployment unem and the weekend count wkends. The coefficient table comes from the actual run. Find beltlaw: its coefficient is 0.09545, with a conventional SE of about 0.01424. Trend is the monthly time count. Rows 2 through 12 under month compare February through December with January, the omitted reference month. A reference category is the category represented by the intercept and other common terms rather than a separate indicator coefficient. The row _cons is the intercept.

For the coefficient tests, the null hypothesis is that the population coefficient is zero. A null hypothesis is the specific statement being tested. The t statistic, shown in the t column, divides the estimate's distance from that null by its SE. P>|t| is the two-sided p-value: under the null and test assumptions, the probability of a statistic at least as far from zero in either direction. The final columns give the confidence interval. We focus on the beltlaw row, then rerun the identical equation with robust SEs to see what changes.

```text
. regress logacc trend i.month unem spdlaw beltlaw wkends

------------------------------------------------------------------------------
      logacc | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       trend |   .0011011   .0002579     4.27   0.000     .0005889    .0016133
             |
        unem |  -.0212173   .0033974    -6.25   0.000    -.0279659   -.0144688
      spdlaw |  -.0537593   .0126036    -4.27   0.000    -.0787948   -.0287238
     beltlaw |   .0954526    .014235     6.71   0.000     .0671765    .1237288
      wkends |   .0033333   .0037761     0.88   0.380    -.0041675    .0108342
       _cons |   10.63986   .0630859   168.66   0.000     10.51455    10.76518
------------------------------------------------------------------------------
```

## 16. Run heteroskedasticity-robust inference

vce(robust) allows unequal error variance, while preserving the OLS coefficients.

The next command adds vce(robust) to the same regression. This requests heteroskedasticity-robust SEs, the unequal-variance adjustment discussed earlier. The law coefficient remains about 0.09545, while its SE changes from about 0.01424 to 0.01237. The do-file checks that the coefficient is unchanged, so we are comparing uncertainty methods for the same fitted relationship.

Why can the line stay while the SE moves? OLS still minimises the same sum of squared residuals on the same observations. The robust option changes how we estimate variation in the resulting coefficient. It allows unequal error variance, but does not generally include the cross-month covariance terms we studied in the averaging example.

In this dataset the robust SE is smaller, not larger. That fact alone does not show whether it is the suitable method. The question is which error patterns the calculation allows and whether those conditions describe this application. Since the residual evidence suggests dependence across months, we will next allow those cross-date contributions using Newey–West.

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

## 17. Run Newey–West on the same model

newey with lag(4) allows covariance contributions through four months.

Run newey with the same outcome and regressors and with lag(4). In Stata, newey requests Newey–West SEs. The lag option is the four-month covariance window we examined in the graph; it does not insert four new predictors into the equation. All 108 months remain in this comparison.

The law coefficient is still about 0.09545, but its SE is now about 0.01890. The do-file again checks that the coefficient agrees with the original OLS estimate. The change from 0.01237 under robust SEs to 0.01890 under HAC4 shows that allowing the selected cross-month terms matters for the estimated uncertainty here.

This is evidence about the comparison of SE calculations, not proof that four lags is the best window. A practical analysis should explain what might keep errors related across months and inspect plausible lag choices. Here the fixed window serves a teaching purpose: it lets us separate the unchanged fitted coefficient from a changed estimate of its uncertainty. Before using that coefficient in a policy report, we must also convert its log units carefully.

```text
. newey logacc trend i.month unem spdlaw beltlaw wkends, lag(4)

------------------------------------------------------------------------------
             |             Newey–West
      logacc | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       trend |   .0011011   .0003897     2.83   0.006      .000327    .0018752
             |
        unem |  -.0212173   .0051302    -4.14   0.000    -.0314079   -.0110268
      spdlaw |  -.0537593   .0170449    -3.15   0.002    -.0876169   -.0199018
     beltlaw |   .0954526   .0188985     5.05   0.000     .0579131    .1329922
      wkends |   .0033333   .0028746     1.16   0.249    -.0023768    .0090434
       _cons |   10.63986   .0635823   167.34   0.000     10.51356    10.76616
------------------------------------------------------------------------------
```

## 18. Convert the fitted log difference into percent

Use 100[exp(b)−1] for the exact contrast between exponentiated fitted values.

The coefficient describes a difference in fitted log accidents. To return from logs to the original count scale, use the exponential function exp, the inverse of the natural logarithm. When the law indicator increases from zero to one, the fitted log outcome increases by b. The ratio of the two exponentiated fitted values is therefore exp(b), and their percentage difference is 100[exp(b)−1]. Here that difference is about 10.02%, compared with the approximation 100b, about 9.55%.

Stata's nlcom command calculates a nonlinear combination, a transformation of coefficients such as this exponential expression. The output labels this calculated result _nl_1. The reported SE uses the delta method: it approximates the transformation locally by a straight line to carry uncertainty from b into the transformed result. In this example the approximate transformed SE is 100exp(b) times SE(b). This explains why its units are percentage units rather than log units. The z statistic divides the transformed estimate by its approximate SE for a zero null, using a normal reference distribution.

One further distinction matters. The exponential of an average log outcome is not generally the average outcome in levels. Converting a fitted log outcome back to levels is called retransformation. To interpret exp(b) as a ratio of conditional arithmetic means, we also need the average of exp(error) to be the same in the compared law states. An arithmetic mean is the ordinary sum divided by the number of values. Without that condition, report the contrast in exponentiated fitted log outcomes. A causal law effect would still require the separate policy-design argument.

```text
. nlcom 100*(exp(_b[beltlaw])-1)

------------------------------------------------------------------------------
      logacc | Coefficient  Std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
       _nl_1 |   10.01567    2.07913     4.82   0.000     5.940653    14.09069
------------------------------------------------------------------------------
```

## 19. Read the serial-correlation diagnostic

Breusch–Godfrey tests a stated no-serial-correlation null.

The graphs suggested that residuals are related. We can assess that evidence with a Breusch–Godfrey test, a test for serial correlation up to a specified number of lags. The script first restores the conventional regression so that the diagnostic uses the intended model. A diagnostic is a check on a feature of the fitted model; it is not a complete judgment of the study.

The null hypothesis is no serial correlation through the stated lag order. The label H0 is shorthand for that null. The header calls this an LM, or Lagrange multiplier, test: here it checks whether earlier residuals help explain the current residual after accounting for the included regressors. In the output, lags(p) tells us that order: one or four months here. The symbol p in that label is not a p-value. The chi2 column is the chi-square test statistic. Its reference distribution describes how the statistic is expected to vary under the null, using the test's large-sample approximation. The df column gives degrees of freedom, the number of restrictions tested here. The corresponding values are one and four. Prob > chi2 reports the p-value.

The reported p-values, about 0.0003 and 0.0020, lead us to reject their respective nulls at the 5% level. This supports taking serial dependence seriously in this regression. It does not establish an exact AR(1) process or prove the policy coefficient is inconsistent. We now combine the diagnostic evidence with the SE comparison, rather than treating a test rejection as an instruction to use one method in every setting.

```text
. estimates restore conventional
(results conventional are active now)

. estat bgodfrey, lags(1 4)

Breusch–Godfrey LM test for autocorrelation
---------------------------------------------------------------------------
    lags(p)  |          chi2               df                 Prob > chi2
-------------+-------------------------------------------------------------
       1     |         13.010               1                   0.0003
       4     |         16.907               4                   0.0020
---------------------------------------------------------------------------
                        H0: no serial correlation
```

## 20. Calculate, then explain the comparison

Calculate the test and interval, then report what they describe.

Use the three SEs to calculate the t ratio for a zero-coefficient null. The coefficient is the same each time, so divide about 0.09545 by each SE. The results are approximately 6.71 with conventional SEs, 7.72 with robust SEs and 5.05 with HAC4. Different uncertainty calculations change how far the estimate lies from zero in SE units.

Using the normal large-sample rule, an absolute ratio above about 1.96 rejects a zero null at the two-sided 5% level. All three ratios pass that threshold here. Yet they do not express the same amount of uncertainty. With the HAC4 SE, the approximate 95% interval is 0.09545±1.96×0.01890, or about [0.05841, 0.13249]. These endpoints are in log-outcome coefficient units, not percent.

Write the result as part of an empirical report. State that the data are monthly, describe the fitted law association, give the uncertainty method and name its four-month window. Then state the main condition that the report has not established, such as the absence of unmeasured changes related to policy timing. A precise report explains both the number and the comparison behind it.

**Practice:** Use b=0.09545264 and HAC4 SE=0.01889849 to calculate the approximate t ratio and 95% interval for b.

**Explanation:** t≈5.05. The large-sample interval is 0.09545264±1.96×0.01889849≈[0.05841, 0.13249], on the log-outcome coefficient scale. This is uncertainty about the fitted coefficient under the inference assumptions; it is not automatically an interval for a causal law effect.

## 21. Apply the reasoning to quarterly inflation

Define the economic shock and time horizon before interpreting a future response.

The same reasoning applies to a new question: does an unexpected increase in production costs affect inflation a year later? Inflation is the rate at which the general price level rises. A supply shock is an unexpected change in production costs or capacity. For example, a sudden disruption to oil supply can increase production costs across many industries. These definitions tell us what the economic question concerns before we write a regression.

Suppose the data are quarterly. A forecast horizon h is the number of observation periods ahead, so h=4 means four quarters, or one year. A local projection fits a separate regression of a future outcome on the current measured shock and stated controls for each horizon. Here it would relate inflation four quarters ahead to the current shock and relevant information. A coefficient has a causal shock-response interpretation only if the shock measurement and comparison support that claim; calling a change a shock does not establish its exogeneity.

Errors in neighboring future-outcome regressions can share unanticipated developments over the overlapping periods. HAC inference can therefore be useful even when the mean model has sensible lag controls. A window of 12 in these quarterly data reaches three years, unlike the four-month window in today's accident example. We will develop these horizon regressions next meeting. The connection is that the meaning of dependence, the data frequency and the coefficient target must all be clear before choosing an SE method.

Inflation: rate of increase in the general price level

Quarterly h = 4: the outcome one year ahead

Local projection: a separate future-outcome regression for each horizon

HAC lag 12 in quarterly data: a three-year covariance window

## 22. Choose an action that addresses the actual problem

Connect the observed concern to the model, comparison or uncertainty calculation.

We have seen several reasons why a regression result might need attention. Choose the next action by naming which problem is present. If the mean equation is appropriate but its errors remain related across nearby dates, a justified HAC calculation can address uncertainty. If relevant past information still predicts the outcome, reconsider whether the mean equation needs that information.

If a regressor is related to the current error, changing the SE method cannot remove that relation. For example, officials might adopt a law because they anticipate an unrecorded rise in accident risk. This is a problem with the policy comparison, even if the residual dependence is also handled carefully. The study needs a reason why its policy variation can separate the law's effect from that changing risk.

Practise linking a recommendation to the diagnosis: 'The concern is…, so I would…, assuming…'. For each case, explain what your proposed change fixes and what it leaves. This prepares you to assess a new empirical question without choosing a command just because it is labelled robust. In the exit task, use the accident example to show that you can make these distinctions in one connected paragraph.

**Practice:** A policy indicator responds to unobserved accident risk. Is the first remedy a longer HAC window?

**Explanation:** No. The named problem is policy endogeneity. A longer HAC window changes uncertainty estimates but does not create an exogenous policy comparison. Address the design or identify a defensible source of policy variation.

## 23. DAG practice: persistent disturbances and HAC

Trace the routes before choosing a control.

The earlier disturbance affects the current disturbance, but the input nodes have no common-cause connection to these disturbances in the stated graph. Does disturbance persistence alone create regressor endogeneity? What does HAC change, and which arrows does it remove?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** The earlier disturbance affects the current disturbance, but the input nodes have no common-cause connection to these disturbances in the stated graph. Does disturbance persistence alone create regressor endogeneity? What does HAC change, and which arrows does it remove?

## 24. DAG practice: persistent disturbances and HAC: explanation

Explain what conditioning changes in this stated graph.

Persistence alone need not create endogeneity in this proposed model. It can create dependent outcomes and errors while the relevant input–disturbance mean conditions remain valid. Those are separate questions.

HAC changes the estimated covariance of the coefficient under suitable exogeneity, dependence and sample conditions. It removes no causal arrows and keeps OLS coefficients fixed on an identical specification and sample. If the actual input selection process introduces a common-cause route to the disturbance, HAC does not close that new route.

Persistence alone need not create endogeneity in this proposed model. It can create dependent outcomes and errors while the relevant input–disturbance mean conditions remain valid. Those are separate questions. HAC changes the estimated covariance of the coefficient under suitable exogeneity, dependence and sample conditions. It removes no causal arrows and keeps OLS coefficients fixed on an identical specification and sample. If the actual input selection process introduces a common-cause route to the disturbance, HAC does not close that new route.

## 25. Choose an uncertainty statement for repeated months

Reproduce the evidence, then explain its economic meaning.

Run meeting_11.do. Confirm that conventional, robust and Newey–West fits retain the same law coefficient. Compare their SEs and approximate intervals. Explain why a smaller robust SE is possible, why four lags means four months here, and what none of these uncertainty options can establish about law adoption.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_11.do. Confirm that conventional, robust and Newey–West fits retain the same law coefficient. Compare their SEs and approximate intervals. Explain why a smaller robust SE is possible, why four lags means four months here, and what none of these uncertainty options can establish about law adoption.

## 26. Choose an uncertainty statement for repeated months: explanation

A reproducible result needs both a calculation and an interpretation.

The common law coefficient is about 0.095453. The SEs are about 0.014235, 0.012368 and 0.018898 for conventional, robust and HAC4 inference. Using the common estimate plus or minus 1.96 times each SE gives different approximate intervals without changing the fitted model.

A robust SE can be smaller because its covariance estimate responds to the actual relationship between regressor leverage and error spread. Four covariance lags are four months in this monthly dataset; the option does not add four regressors. HAC allows a specified treatment of remaining time dependence under suitable conditions, while none of these choices makes law adoption exogenous or removes omitted dynamics from the conditional mean.

The common law coefficient is about 0.095453. The SEs are about 0.014235, 0.012368 and 0.018898 for conventional, robust and HAC4 inference. Using the common estimate plus or minus 1.96 times each SE gives different approximate intervals without changing the fitted model. A robust SE can be smaller because its covariance estimate responds to the actual relationship between regressor leverage and error spread. Four covariance lags are four months in this monthly dataset; the option does not add four regressors. HAC allows a specified treatment of remaining time dependence under suitable conditions, while none of these choices makes law adoption exogenous or removes omitted dynamics from the conditional mean.

## 27. Exit check: connect the model, estimate and SE

Explain the three choices as responses to different empirical concerns.

Explain how three proposed changes would affect our accident analysis. Adding a lagged outcome changes the fitted equation and may reduce the usable sample. Newey–West on the same equation and sample keeps the OLS coefficients but changes estimated uncertainty. Prais–Winsten uses an estimated AR(1) error process to transform the fit, so it can change coefficients as well as SEs. State the assumptions behind the change you recommend.

Then give the calendar meaning of lag(4) for today's monthly data. It reaches covariance contributions through four months; it is not four new regressors. Explain why a coefficient can stay fixed while its interval changes. This links the arithmetic of the output to the variance-and-covariance reasoning, rather than leaving them as separate facts to memorise.

Finally, return to the traffic-policy question. We found a positive fitted law coefficient for total accidents and evidence of residual serial correlation. HAC4 produced a larger SE than the other two methods in this example. These results tell us about the stated regression and its estimated uncertainty. They do not establish that the law caused more accidents. Next meeting, we will use the same distinctions to study models with richer time relationships and responses at future horizons.

**Practice:** In one paragraph, compare adding a lag, using Newey–West and fitting Prais–Winsten. Interpret lag(4) for this dataset.

**Explanation:** Adding a lag changes the mean equation and may change the sample and coefficients. Newey–West keeps OLS coefficients on the same equation and sample, while changing their estimated covariance; lag(4) here reaches four months. Prais–Winsten uses an AR(1) error model to transform the fit and may change coefficients and SEs. None of these changes, by itself, creates an exogenous policy comparison.

