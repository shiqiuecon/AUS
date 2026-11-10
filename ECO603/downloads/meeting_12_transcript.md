# 12. Time series: serial correlation and diagnostics

Distinguish residual dependence from a missing part of the mean equation.

## Core lesson

### 01. Why can the same estimate have different uncertainty?

Monthly observations may share information; uncertainty calculations must account for it.

Imagine evaluating a traffic-safety law using monthly accident records. A month is one observation in this dataset. We observe total reported accidents in California from January 1981 through December 1989, giving 108 observations. We also observe unemployment, calendar information and whether two traffic laws were in force. Our outcome is total accidents, not fatal accidents or the risk faced by one driver.

Earlier, we used a regression model, an equation relating an outcome to explanatory variables, to estimate a relationship. We also used a standard error, or SE, to describe how much an estimated coefficient would vary across comparable datasets. Inference means using such estimates and their uncertainty to learn about a population relationship. Today we ask whether that uncertainty calculation needs to change when one month carries information about the next.

For example, bad road conditions or a change in enforcement may last several months. Those months can share influences that our recorded variables do not fully capture. They are then dependent: knowing something about one month helps us anticipate another. If we count them as independent observations, which would provide unrelated information, we may misjudge how much we have learned. Model errors are the part of the outcome outside the included relationship. When those errors are correlated across dates, we call it serial correlation. We will trace this problem through the graphs, then compare three SE calculations for the same regression.

**Practice:** Name a factor that might affect accidents for several consecutive months but is not fully measured in the dataset.

**Explanation:** A lasting change in road conditions, enforcement or reporting could affect several months. Such a shared influence can make the unexplained parts of their accident totals related.

### 02. Define the monthly accident model

State the outcome, law indicators, calendar controls and error term.

We keep the monthly accident equation from Meeting 10 fixed. A is total accidents and log A its logged outcome. B and S indicate the seat-belt and speed-law states. U is unemployment and W the weekend count. Each included predictor has its own coefficient, and lowercase u is the remaining error. Keeping uppercase unemployment U distinct from lowercase error u matters in both the equation and the timing argument.

The trend term uses the monthly index t. The calendar indicators are written D subscript m t here, with gamma subscript m giving each month's shift relative to January. The sum contains eleven indicators because the intercept already represents January. We compare uncertainty procedures for this unchanged equation and sample, so a change in the standard error can be attributed to the covariance calculation rather than a new fitted comparison.

\(\log(A_t)=a+bB_t+cS_t+dU_t+fW_t+gt+\sum_{m=2}^{12}\gamma_mD_{mt}+u_t\)

\(B,S\): law indicators; \(U\): unemployment; \(W\): weekend count.

\(D_{mt}\): month indicator; \(u_t\): error.

### 03. Follow the residual path

Look for sequences of positive or negative residuals.

Each point now shows a residual from the fitted log-accident regression. A positive residual means more log accidents than the model predicts for that month; a negative one means fewer. Reveal the sequence gradually. Do several months remain on the same side of zero? Such a run is a visual sign that nearby residuals may be related.

Residuals help us study the errors, but they are not the errors themselves. We calculate residuals after estimating the model; the population errors are unobserved. A short sequence can also show runs by chance. We will therefore use the graph to understand the concern and later use a formal test to assess it under stated assumptions.

Why would a run matter for uncertainty? Suppose one unrecorded disruption affects four consecutive months. Those observations partly repeat information about the same disruption. They need not provide as much new information as four independent disruptions. The effect on a coefficient's SE depends on which months help estimate that coefficient and how their errors are related. To see the relation more directly, we will compare each residual with the preceding month's residual.

### 04. See how an error can carry into the next month

An AR(1) process adds a new shock to a fraction of the previous error.

To study how errors carry over, consider \(u_t\)=\(\rho\)\(u_{t-1}\)+\(\varepsilon_t\). This is a first-order autoregressive process, abbreviated AR(1). 'Autoregressive' means that a value depends on its own past value, and 'first order' means one earlier period enters directly. Here \(u_t\) is the current error, \(\rho\), read 'rho', is the carry-over coefficient, and \(\varepsilon_t\) is a new, unpredictable change. Such a new change is called an innovation.

For this illustration, the innovations are independent and average to zero. If \(\rho\)=0.6 and last month's error is two, the part carried into this month is 1.2 before adding the new innovation. A positive \(\rho\) produces persistence: effects remain for several periods. A negative \(\rho\) tends to produce alternating signs. With |\(\rho\)|<1, meaning rho is between −1 and 1, an initial disturbance fades over time rather than growing on its own.

Move the control while keeping the same innovation draws. The graph is a simulation, data generated by a specified rule, rather than an estimated traffic-error process. It uses a burn-in: the first 300 generated periods are discarded so the starting value has little effect on the displayed path. Keeping the new shocks fixed helps us isolate what changing \(\rho\) does. The graph's vertical range adjusts to keep the path visible, so check the axis values as well as the shape.

\(u_t=\rho u_{t-1}+\varepsilon_t\)

\(\rho\): persistence; \(\varepsilon_t\): new unpredictable error

### 05. Separate the comparison, model and uncertainty

Related errors do not, by themselves, tell us whether the coefficient is valid.

The simulation shows how errors can be related over time. Before choosing a response, separate three questions. Are the regressors suitably unrelated to the error? Does the model account for the predictable parts of the outcome? Does the SE calculation allow for the dependence that remains? These concern the comparison, the model and uncertainty, respectively.

Exogeneity is the assumption that the regressors have the required lack of relation with the error. A common stronger version is strict exogeneity: the error at a date averages to zero given the regressors at all dates, including future ones. For example, a policy change made in response to unrecorded accident risk would make the policy variable related to the error and threaten this assumption. Endogeneity names this problem of a regressor being related to the error.

Serial correlation alone does not establish endogeneity. With an appropriate linear model and strict exogeneity, OLS, ordinary least squares, can remain unbiased even if errors are serially correlated. Unbiased means its average estimate across repeated datasets equals the population coefficient. Consistency is a different property: as the number of observations grows, the estimator approaches that coefficient. Serial dependence can be compatible with consistency when the needed stability, dependence and regressor conditions hold. We must therefore diagnose coefficient validity separately from how we calculate its SE. The next slide shows exactly where dependence enters the uncertainty calculation.

The two disturbance nodes carry persistence from one month to the next. Their arrows can create dependent outcomes even though the input nodes have no unblocked common-cause route to the corresponding disturbances in this assumed model. HAC estimates uncertainty allowing suitable remaining dependence; it does not remove the persistence arrows or add exogeneity when a different graph would violate it.

Exogeneity: required lack of relation between regressors and error

Mean model: which variables predict the outcome?

SE calculation: how much uncertainty remains?

### 06. Why dependence changes uncertainty

Related errors add covariance terms to the variance calculation.

Recall that an SE estimates the spread of a coefficient across comparable datasets. Variance is another measure of spread: the average squared distance from a variable's mean. Its square root is the standard deviation. Covariance measures how two variables move together around their means. A positive covariance means they tend to be above their means together or below their means together. These ideas let us see what dependence adds to uncertainty.

Start with the average of n errors, written mean u. The formula adds their individual variances and twice the covariances between different dates, then divides by n². The symbol \(\sum\) means 'add'; \(\sum\)ₛ<ₜ adds each pair of dates once. For two errors each with variance one and covariance zero, the average has variance (1+1)/4=0.5. If their covariance is 0.5, its variance becomes (1+1+2×0.5)/4=0.75. Averaging has removed less uncertainty because the errors move together.

An OLS coefficient also combines errors, with weights determined by the regressors. Its variance therefore depends on related cross-date terms, not just the variance of each error separately. Conventional SEs rely on a restrictive error structure. Heteroskedasticity-robust SEs allow unequal error variance, called heteroskedasticity, but generally leave out serial covariance terms. The average example explains why another adjustment may be needed; it is not the full formula for a regression SE.

\(\operatorname{Var}(\overline u)=\dfrac{\sum_t\operatorname{Var}(u_t)+2\sum_{s<t}\operatorname{Cov}(u_s,u_t)}{n^2}\)

Variance measures spread; covariance measures how two errors move together.

Two unit-variance errors: covariance \(0\Rightarrow0.5\); covariance \(0.5\Rightarrow0.75\)

### 07. Serial covariance enters the variance through cross-date terms

The direction of the SE change depends on both regressor and error patterns.

In simple regression with centred regressor values a t, the slope error is the sum of a t times u t divided by the sum of a t squared. Its conditional variance includes same-date error variances and cross-date covariances. The conventional independent-error formula drops those cross-date terms.

Positive error autocorrelation does not mechanically multiply every slope variance by the same number. The signs and time pattern of the regressor weights matter too. The familiar one-plus-rho over one-minus-rho multiplier describes particular persistent-mean settings under additional approximations; it is not a universal regression formula. This is why the actual traffic comparison estimates an appropriate covariance rather than imposing one generic inflation factor.

Let \(a_t=X_t-\overline X\), \(S=\sum_t a_t^2\).

\(\operatorname{Var}(b_1\mid X)=S^{-2}[\sum_t a_t^2\operatorname{Var}(u_t\mid X)+2\sum_{t<s}a_ta_s\operatorname{Cov}(u_t,u_s\mid X)]\).

Both regressor weights and cross-date error covariance affect precision.

### 08. Check whether past information is still missing

Dynamic completeness concerns whether the model uses the relevant past information.

Suppose an unrecorded change in travel demand lasts for several months. If information from earlier months helps predict its effect on today's accidents, our model may be leaving out a predictable part of the outcome. Dynamic completeness means that, after the included variables are taken into account, additional relevant past information does not improve the prediction of the conditional mean. 'Dynamic' refers to how the relationship develops over time.

For example, yesterday's or last month's travel conditions may help explain today's outcome even after current unemployment and seasonality are included. Adding a justified lag can then change the fitted relationship and reduce the residual pattern. It can also reduce the sample, because the earliest observations may lack the required past values. We should explain which past information matters and why, rather than add variables only until a test gives a preferred answer.

There are now two separate tasks. One is to model predictable changes in accidents; the other is to estimate uncertainty when unexplained parts remain related. Improving the first task may help the second, but a residual pattern alone does not tell us which variable belongs in the causal comparison. The next slide compares adding lags with two methods that treat the error dependence in different ways.

Dynamic completeness: additional relevant past information does not improve the model's conditional mean

Adding a lag changes the fitted equation and may change the sample

HAC addresses uncertainty from dependence that remains

### 09. Choose the response that matches the problem

Adding lags, Newey–West and Prais–Winsten change different parts of the analysis.

Keep the mean equation and uncertainty calculation separate. Adding a lagged predictor changes what the regression uses to explain accidents; it can change coefficients, interpretation and sample size. Applying Newey–West to an unchanged equation and sample keeps the OLS coefficients while changing the estimated covariance and hence standard errors.

If a credible model describes how errors persist, another possibility is to transform the equation using that model. The next meeting derives Prais–Winsten, a transformation for an AR(1) error process, before examining its output. We do not need that method to complete today's comparison. Our task here is to decide whether remaining dependence changes uncertainty, signals missing mean dynamics, or accompanies an invalid policy comparison.

Missing mean dynamics → reconsider the equation.

Valid mean model with suitable remaining dependence → justify covariance estimation.

A structured error transformation is developed in the next meeting.

### 10. Durbin–Watson is a residual-difference statistic

Its familiar approximation is a descriptive guide with conditions.

The Durbin–Watson statistic, abbreviated DW, divides the sum of squared changes in fitted residuals by the sum of squared residuals. Expanding the numerator makes its connection with adjacent residual products visible. Ignoring endpoint differences gives the familiar approximation two times one minus the lag-one residual correlation.

Values below two suggest positive adjacent residual association and values above two suggest negative association. The exact testing rule has additional conditions and depends on the design; it is not a generic rule that any value different from two proves misspecification. A lagged dependent regressor complicates the classical DW setting. We therefore use the more explicit auxiliary-regression formulation of the Breusch–Godfrey test for a chosen set of residual lags.

\(DW=\dfrac{\sum_{t=2}^T(\widehat u_t-\widehat u_{t-1})^2}{\sum_{t=1}^T\widehat u_t^2}\approx2(1-\widehat\rho_1)\).

Define the model and testing assumptions before turning a descriptive statistic into a decision.

### 11. A Breusch–Godfrey test keeps the original regressors in its auxiliary model

State the residual lags and the joint null.

The Breusch–Godfrey test, abbreviated BG, regresses fitted residuals on the original regression inputs and q selected lagged residuals. Its null sets all q lag coefficients to zero. Including the original regressors matters because the fitted residuals came from an estimated equation, not from directly observed population errors.

A familiar LM version uses the auxiliary sample size times its R squared and an asymptotic chi-squared reference with q degrees of freedom under the required conditions. LM abbreviates Lagrange multiplier: it assesses a restriction using information under the null. Treatment of initial residual lags and the covariance assumptions belong to the implementation. A conventional BG test is not automatically robust to every variance process. Report the tested lag orders and investigate the economic meaning of a rejection.

\(\widehat u_t=X_t\prime\gamma+\sum_{j=1}^q\rho_j\widehat u_{t-j}+v_t\).

\(H_0:\rho_1=\cdots=\rho_q=0\); a conventional LM reference is \(\chi_q^2\).

State the sample, lag orders, implementation and covariance assumptions.

### 12. Read the serial-correlation diagnostic

Breusch–Godfrey tests a stated no-serial-correlation null.

The Breusch–Godfrey diagnostic asks whether earlier residuals help explain the current residual after the original regressors are included. Its supporting regression adds the requested residual lags and tests their coefficients jointly. Under the null, these extra lag coefficients are zero. A rejection gives evidence against that no-serial-correlation condition for the fitted specification.

The output calls this an LM, or Lagrange multiplier, test. Its large-sample statistic uses a chi-square reference: a distribution obtained by adding squares of independent standard-normal variables. Here the degrees of freedom equal the number of residual-lag restrictions, one or four. The label lags(p) gives the lag order; this p is not a p-value. Prob greater than chi-square reports the tail probability under the null approximation. The small reported p-values support investigating dependence. They neither establish an exact AR(1) process nor diagnose policy endogeneity by themselves.

Supporting regression: current residual on original regressors and earlier residuals.

Null: added residual-lag coefficients are jointly zero.

Chi-square reference degrees of freedom: number of tested lag restrictions.

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

### 13. Reproduce and interpret dated residual diagnostics

Try the comparison before opening the explanation.

Reproduce the diagnostics block in overleaf_technical.do using traffic.csv. Report the DW statistic and BG tests at lag orders one and four. Explain the nulls, why four months are not four quarters, and why a diagnostic result does not by itself identify a policy effect.

State the assumptions and units alongside the calculation.

**Practice:** Reproduce the diagnostics block in overleaf_technical.do using traffic.csv. Report the DW statistic and BG tests at lag orders one and four. Explain the nulls, why four months are not four quarters, and why a diagnostic result does not by itself identify a policy effect.

### 14. Reproduce and interpret dated residual diagnostics: explanation

Follow the calculation and interpret its units.

Use the same 108-month regression, dates and controls. DW is about 1.200475. The BG statistics are about 13.010 for one lag (p about 0.0003) and 16.907 for four lags (p about 0.0020), rejecting their stated nulls under the reference conditions. DW describes adjacent fitted-residual differences. The BG tests jointly set the specified residual-lag coefficients to zero under their reference assumptions. Four lags mean four months. Record the actual statistics and p-values from your successful run, then distinguish a conditional-mean revision from a covariance correction and from a causal identification argument.

Use the same 108-month regression, dates and controls. DW is about 1.200475. The BG statistics are about 13.010 for one lag (p about 0.0003) and 16.907 for four lags (p about 0.0020), rejecting their stated nulls under the reference conditions. DW describes adjacent fitted-residual differences. The BG tests jointly set the specified residual-lag coefficients to zero under their reference assumptions. Four lags mean four months. Record the actual statistics and p-values from your successful run, then distinguish a conditional-mean revision from a covariance correction and from a causal identification argument.

### 15. Choose an action that addresses the actual problem

Connect the observed concern to the model, comparison or uncertainty calculation.

We have seen several reasons why a regression result might need attention. Choose the next action by naming which problem is present. If the mean equation is appropriate but its errors remain related across nearby dates, a justified HAC calculation can address uncertainty. If relevant past information still predicts the outcome, reconsider whether the mean equation needs that information.

If a regressor is related to the current error, changing the SE method cannot remove that relation. For example, officials might adopt a law because they anticipate an unrecorded rise in accident risk. This is a problem with the policy comparison, even if the residual dependence is also handled carefully. The study needs a reason why its policy variation can separate the law's effect from that changing risk.

Practise linking a recommendation to the diagnosis: 'The concern is…, so I would…, assuming…'. For each case, explain what your proposed change fixes and what it leaves. This prepares you to assess a new empirical question without choosing a command just because it is labelled robust. Write one connected paragraph about the accident example: name the concern, choose a response, state its assumptions and explain what it cannot establish.

**Practice:** A policy indicator responds to unobserved accident risk. Is the first remedy a longer HAC window?

**Explanation:** No. The named problem is policy endogeneity. A longer HAC window changes uncertainty estimates but does not create an exogenous policy comparison. Address the design or identify a defensible source of policy variation.

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 16. Separate the outcome pattern from the error pattern

Serial correlation concerns errors across dates, after specifying the model.

The raw accident graph shows the outcome before we account for its predictors. A pattern that repeats at the same part of each year is seasonality. A gradual movement across the years is a trend. The month indicators and time trend in our equation are intended to describe such patterns, so a pattern in the raw outcome is not automatically a problem in the remaining error.

We call the model's average outcome at given regressor values its conditional mean. 'Conditional' means that we specify the values of the explanatory variables when making the comparison. If the conditional-mean model is appropriate, its error averages to zero at those values. Serial correlation means that errors at different dates are correlated: for example, a positive error in one month tends to be followed by a positive error. Autocorrelation is another name for correlation across time within a series.

This distinction tells us what to examine next. First allow the model to account for trend, seasonality and the observed controls. Then inspect the residuals, the observed outcomes minus their fitted values. A seasonal accident series may have little residual dependence after this adjustment. Equally, a fairly stable accident series can leave related residuals. We need the residual graph to see what the fitted model has left unexplained.

**Practice:** Does a seasonal accident plot prove that the errors in a seasonally adjusted regression are serially correlated?

**Explanation:** No. Outcome seasonality can be explained by the included month effects. Residual dependence must be assessed after fitting the specified mean model.

### 17. Compare one month with the previous month

Put the previous month's residual on the horizontal axis.

A lag is a value from an earlier date. A lag-one residual is the previous month's residual, written eₜ₋₁. In this lag plot, the horizontal axis shows eₜ₋₁ and the vertical axis shows the current residual eₜ. Each dot therefore represents two neighboring months, rather than an outcome and a policy variable.

Consider a dot in the upper-right part of the graph. Both residuals are positive: a month with more accidents than predicted followed another such month. In the lower-left part, both are negative. A tendency for dots to occupy those two regions suggests positive lag-one association. Positive means the values tend to have the same direction relative to their averages, not that both values must always be above zero.

There are 107 pairs because the first of our 108 residuals has no observed predecessor. The graph does not estimate the law's effect. It studies the pattern left after the accident regression. We can make that pattern easier to understand with a constructed process in which we choose how strongly one error carries into the next.

**Practice:** Why are there 107 residual pairs? What does a point in the upper-right region mean?

**Explanation:** The first residual has no observed predecessor. An upper-right point is a month with a positive residual preceded by another month with a positive residual.

### 18. What an SE adjustment cannot repair

HAC changes uncertainty; it does not remove a regressor's relation with the error.

The SE adjustment deals with uncertainty, but it does not change which comparison the coefficient describes. Suppose the law is introduced when officials anticipate rising accident risk that our recorded variables do not capture. The law indicator is then related to the error: the endogeneity problem defined earlier. Newey–West leaves that relation, and the OLS coefficient, unchanged.

A related problem can arise after adding last month's outcome to the equation. This is a lagged outcome. It contains the influence of last month's error. If that error is related to this month's error, the lagged outcome may also be related to the current error. OLS can then be inconsistent: collecting more months does not necessarily make it approach the target coefficient. A different SE formula cannot remove that regressor–error relation.

This gives us a practical sequence. Check the comparison and the mean model before relying on an uncertainty adjustment. If the remaining concern is error dependence under a valid coefficient model, HAC may address it. If an included variable is related to the error, we need to reconsider the model or the source of the comparison. Next we will look more closely at how omitted predictable changes can create these difficulties.

**Practice:** A lagged outcome is correlated with the current error. What does an HAC option change, and what does it leave?

**Explanation:** It changes the estimated covariance around the fitted coefficients. It leaves the regressor–error correlation and potential coefficient inconsistency in place.

### 19. Apply the reasoning to quarterly inflation

Define the economic shock and time horizon before interpreting a future response.

The same reasoning applies to a new question: does an unexpected increase in production costs affect inflation a year later? Inflation is the rate at which the general price level rises. A supply shock is an unexpected change in production costs or capacity. For example, a sudden disruption to oil supply can increase production costs across many industries. These definitions tell us what the economic question concerns before we write a regression.

Suppose the data are quarterly. A forecast horizon h is the number of observation periods ahead, so h=4 means four quarters, or one year. A local projection fits a separate regression of a future outcome on the current measured shock and stated controls for each horizon. Here it would relate inflation four quarters ahead to the current shock and relevant information. A coefficient has a causal shock-response interpretation only if the shock measurement and comparison support that claim; calling a change a shock does not establish its exogeneity.

Errors in neighboring future-outcome regressions can share unanticipated developments over the overlapping periods. HAC inference can therefore be useful even when the mean model has sensible lag controls. A window of 12 in these quarterly data reaches three years, unlike the four-month window in today's accident example. We will develop these horizon regressions next meeting. The connection is that the meaning of dependence, the data frequency and the coefficient target must all be clear before choosing an SE method.

Inflation: rate of increase in the general price level

Quarterly h = 4: the outcome one year ahead

Local projection: a separate future-outcome regression for each horizon

HAC lag 12 in quarterly data: a three-year covariance window

