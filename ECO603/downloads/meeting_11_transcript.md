# Meeting 11: Serial correlation and honest uncertainty

Draft for review. No narration.

## Teaching plan

- 0–10 minutes: Recall and prediction
- 10–55 minutes: Question and comparison
- 55–65 minutes: Break
- 65–110 minutes: Model and evidence
- 110–120 minutes: Break
- 120–165 minutes: Stata and practice
- 165–180 minutes: Transfer and exit check

## 01. Why can the same estimate have different uncertainty?

Start with a familiar policy question and monthly observations.

Suppose you are evaluating a traffic-safety policy. You have monthly observations on total reported accidents, unemployment, seasonal indicators and dates when two laws were in force. The outcome is a statewide monthly total, not a record for each driver. The data run from January 1981 through December 1989, giving 108 observations.

Our question is whether the relation between policy indicators and accidents is estimated with honest uncertainty when neighboring months resemble one another. First predict what happens if a bad traffic month tends to be followed by another bad month. Would 108 months then contain the same information as 108 independent draws?

This is an inference lesson built around a real dataset. The law indicators are not randomly assigned, so we will keep the causal limitations explicit. A statistically precise policy association can still reflect omitted changes in travel, enforcement or reporting. Today we will separate that design issue from the dependence issue rather than asking one standard-error option to solve both.

**Attempt:** Name one reason accidents in adjacent months might remain correlated after some observed controls.

**Solution:** Persistent travel conditions, unmeasured enforcement, economic activity or reporting changes can make neighboring monthly errors related. A seasonal cycle should first be modeled if relevant rather than simply labeled random noise.

**Teaching note:** 0–10: retrieve the distinction between the conditional-mean model and the covariance of its errors.

## 02. Begin with a dated model

Specify what is observed now, what is lagged and what each unit means.

Let t index months. Define A_t as total reported accidents, L_t as the indicator that the seat-belt law is in force, S_t as the speed-law indicator, U_t as the unemployment rate and W_t as the number of weekends. We model log(A_t) with a linear trend, eleven month indicators, these controls and an error u_t.

The coefficient on L_t is a difference in the fitted log outcome, holding the included trend, season and observed controls fixed. It is not a percentage-point change in a probability and does not concern fatal accidents unless we change the dependent variable. Defining the outcome carefully prevents the sign from being given an unrelated interpretation.

The data are in their documented chronological order. The do-file reconstructs the Stata monthly date and verifies it against the year, sequential time trend and all eleven archived month indicators. A correct lag operation requires the correct time index. Declaring tsset without checking order and gaps is not a substitute for that verification.

**Teaching note:** 10–55: question/comparison block across pages 2–7.

## 03. Remove modeled patterns before interpreting residuals

A seasonal outcome pattern is not itself an error diagnostic.

The outcome time plot includes both what the model explains and what it leaves unexplained. If accidents rise in particular months or trend over the sample, those patterns can belong in the conditional-mean model. Serial correlation concerns the relation between errors across dates after that model is specified.

This distinction is why we do not diagnose the regression merely by pointing at the raw outcome plot. A strongly seasonal series can have relatively uncorrelated model errors after adequate adjustment. Conversely, an outcome that looks fairly stable can leave persistent residuals after regression.

Use the plot to predict which controls are economically sensible, then compare it with the residual path on the next page. The purpose is not to force every visible wiggle into the model. It is to identify systematic, substantively justified variation and then assess the remaining dependence under a clearly stated specification.

**Attempt:** Does a seasonal accident plot prove that the errors in a seasonally adjusted regression are serially correlated?

**Solution:** No. Outcome seasonality can be explained by the included month effects. Residual dependence must be assessed after fitting the specified mean model.

## 04. Follow the residual path

Neighboring residuals can carry related information.

Each point now shows the fitted regression's residual for one month. Positive means more log accidents than the model predicts; negative means fewer. Reveal the path gradually and look for runs above or below zero rather than reading each month as unrelated to the last.

Runs are a useful visual clue, but not a complete test or a proof of a particular error process. Residuals are estimated from a model and differ from the unobserved population errors. Short samples can produce patterns by chance, while modest dependence can be hard to see. Formal diagnostics and economic reasoning therefore complement the graph.

Explain why dependence changes information. If one unobserved disruption persists for several months, those observations partly repeat news about the same disruption. Treating them as independent can misstate the variance of the estimated policy coefficient. The direction and magnitude of the mistake depend on the regressor and covariance structure; it is not a universal rule that every serial correlation makes every conventional SE too small.

## 05. Compare one month with the previous month

A lag plot changes the horizontal variable.

In this graph, the horizontal coordinate is the previous month's residual, e_(t−1), and the vertical coordinate is the current residual, e_t. We lose the first date because there is no preceding observed residual. There are 107 plotted pairs from the 108-month fit.

If points tend to occupy the lower-left and upper-right regions, a negative residual tends to be followed by a negative one and a positive residual by a positive one. That is the kind of pattern associated with positive lag-one dependence. An alternating sequence would instead tend toward an opposite-sign pattern.

Read these axes carefully. This is not a scatterplot of accidents against unemployment, and its fitted slope is not the policy effect. We are investigating how the fitted errors relate over time. A lag plot can motivate a model check, but identifying a causal law effect still requires the separate exogeneity and counterfactual arguments.

**Attempt:** Why are there 107 residual pairs? What does a point in the upper-right region mean?

**Solution:** The first residual has no observed predecessor. An upper-right point is a month with a positive residual preceded by another month with a positive residual.

## 06. Build a serially correlated process

An AR(1) illustration makes persistence visible.

Consider an illustrative error process u_t=ρu_(t−1)+ε_t. The parameter ρ describes how much of the previous error carries into the next month. The innovations ε_t are independent, mean-zero shocks in this constructed example. For an absolute value of ρ less than one, a stationary version of this process exists under suitable finite-variance conditions.

Move ρ while keeping the innovation draws fixed. At zero, the next error does not inherit the previous error through this channel. A positive value produces persistence; a negative value encourages alternating signs. Near one, shocks can take a long time to fade. The displayed path is a simulation after a burn-in, not an estimated traffic-error process.

Keeping the innovations fixed helps you see the consequence of changing the persistence parameter instead of confusing it with a new random draw. This is a teaching experiment about dependence. It does not prove that the actual residuals follow AR(1), nor does choosing a visually similar path justify a particular estimator.

## 07. Separate three questions

Coefficient validity, dynamic specification and inference are distinct.

First ask whether the regressors are exogenous in the relevant model. If a regressor is correlated with the current error, the policy slope may not estimate the intended target consistently. Second ask whether the conditional-mean specification omits important dynamics. Third ask how the errors' covariance affects uncertainty around the estimator.

Serial correlation alone does not automatically imply biased or inconsistent OLS coefficients. For example, with a correctly specified linear mean and suitable strict exogeneity, serially correlated errors need not bias OLS. Under appropriate stationarity, weak-dependence, moment and rank conditions, consistent estimation can still be possible.

But when the model includes a lagged outcome, persistent omitted errors may be correlated with that lagged outcome. Then an inference adjustment alone is insufficient. Write a short diagnosis stating which of the three questions is at stake before choosing a command. This discipline is more useful than memorizing 'serial correlation means use Newey–West'.

**Teaching note:** Break after page 7, at 55–65 minutes.

## 08. A conventional SE omits cross-date terms

Dependence adds covariance, not more independent observations.

To see the issue without matrix algebra, suppose we average n errors. The variance of their average equals one over n squared times the sum of all individual variances plus twice all pairwise covariances. Under independence the cross-date covariances vanish. Under serial dependence they need not.

OLS slopes involve weighted combinations of errors, so their variance similarly depends on cross-date terms involving regressors and errors. Heteroskedasticity-robust inference allows the size of the error variance to differ across observations. It does not generally account for nonzero covariance between different dates.

This explains why adding vce(robust) need not solve a time-series dependence problem. It also explains why the exact effect on an SE depends on the weights and covariance signs rather than just an intuitive count of observations. We use an average to expose the logic, not to replace the regression covariance formula with the formula for a sample mean.

**Teaching note:** 65–110: model/evidence block across pages 8–14.

## 09. HAC estimates long-run covariance

Allow both changing variance and short-range dependence.

HAC stands for heteroskedasticity and autocorrelation consistent. The Newey–West procedure keeps the OLS point estimate and estimates its covariance using same-date and selected cross-date products of regressors times residuals. It does not change the dependent variable or add lagged regressors.

The lag window gives a visual account of one part of the calculation. For maximum lag L, Bartlett weights taper as 1−k/(L+1) at positive lag k up to L. For L=4, those weights are 0.8, 0.6, 0.4 and 0.2. These are weights on estimated lag-covariance contributions, not the actual autocorrelations in the data.

The word consistent requires assumptions: suitable weak dependence, moments, a valid coefficient model and bandwidth conditions. A fixed lag chosen for a short classroom example is a specification to inspect, not a guarantee of reliable finite-sample inference. State the data frequency and lag choice, and consider whether the relevant dependence extends beyond the chosen window.

## 10. Interpret the lag in calendar time

Four lags mean four months in these data.

In our monthly application, lag(4) uses residual-based dependence contributions through four months. In quarterly data the same option reaches four quarters, which is a year. Confusing the sampling frequency changes the substantive interpretation of the correction.

The option is not a command to add four lags of accidents, four lags of a policy variable or four seasonal indicators. Those changes would alter the conditional-mean regression. Newey–West instead changes how uncertainty is estimated for the existing OLS coefficients on a fixed sample.

Ask what economic mechanism might make errors related over four, twelve or more months. A larger lag window includes more estimated covariance terms and can make a noisy estimate still noisier; the resulting SE need not increase monotonically. The slider illustrates taper weights only. To compare actual lag choices, rerun Stata and report the resulting estimates rather than pretending the slider has recalculated a HAC covariance matrix.

**Attempt:** For quarterly data, what calendar window is lag(12)? Does that option add twelve regressors?

**Solution:** It reaches twelve quarters, or three years. It adjusts the covariance calculation; it adds no conditional-mean regressors.

## 11. What stays fixed in the three fits?

Same dependent variable, regressors and sample; different covariance estimates.

The three estimates shown here use the same log-accident outcome, trend, month effects, unemployment, both policy indicators and weekend count, on the same 108 observations. Conventional, heteroskedasticity-robust and Newey–West lag-four methods therefore produce the same OLS law coefficient.

The horizontal intervals use the familiar large-sample estimate ±1.96 times SE to make the uncertainty comparison visible. They are explicitly approximate; the raw Stata output reports its own reference distribution and interval. Keep those two displays conceptually separate when checking exact endpoint values.

The robust SE is smaller than the conventional SE in this application, while the HAC4 SE is larger. That is useful evidence against the rule that robust adjustments always increase SEs. What matters is whether the covariance estimator matches the dependence assumptions, not whether it produces the largest or most reassuring interval.

## 12. What HAC leaves unresolved

An uncertain estimate and a biased estimate are different problems.

Suppose the policy indicator is correlated with an omitted change in enforcement or reporting. That violates the causal comparison regardless of which SE appears next to the estimate. Newey–West leaves the coefficient unchanged and therefore cannot remove that source of endogeneity.

Now suppose the model includes a lagged accident outcome while the current error remains serially correlated. The lagged outcome contains past errors, which can be related to the current error. In that setting we need to examine coefficient consistency as well as standard errors. Simply changing the covariance option can give precise-looking inference around an inconsistent estimator.

The right response depends on the diagnosis. Better dynamics may help explain an omitted predictable component. A stronger policy design may address endogeneity. HAC can address the covariance calculation under its assumptions. These responses can be combined when justified, but none should be sold as a universal correction for every problem revealed by a residual plot.

**Attempt:** A lagged outcome is correlated with the current error. What does an HAC option change, and what does it leave?

**Solution:** It changes the estimated covariance around the fitted coefficients. It leaves the regressor–error correlation and potential coefficient inconsistency in place.

## 13. Dynamic completeness concerns predictability

A richer mean model can remove some residual pattern.

Let the information set contain the current exogenous regressors and relevant history. A dynamically adequate conditional-mean specification uses that information so that omitted past information does not systematically predict the remaining error. This is the sense of dynamic completeness useful for this course.

If lagged outcomes or lagged predictors explain a systematic component left out of the model, including them can change coefficients, the sample and the residual dependence. The choice must be motivated by timing, mechanism and statistical evidence, not by adding lags until a favorite p-value appears.

Not every residual autocorrelation is proof that a specific additional lag belongs in the causal model. Local-projection errors, for instance, can overlap by construction across adjacent forecast horizons even with a sensible mean specification. We will study that next meeting. Today retain the distinction between modeling predictable outcome variation and estimating a robust covariance for whatever dependence remains.

## 14. Choose the response that matches the problem

Adding lags, HAC and Prais–Winsten do different jobs.

Adding lagged regressors changes the mean specification. It can alter the coefficient target, estimates and usable sample. HAC keeps OLS on the same specification and sample but changes estimated uncertainty. Prais–Winsten uses a modeled AR(1) error process to transform the regression and can change both coefficients and standard errors.

Prais–Winsten can be useful under a justified error model and suitable regressor assumptions. It is not automatically preferable because a residual plot looks persistent, and its additional structure should be checked. Nor should we choose the method that produces statistical significance.

For an empirical report, state which issue each choice addresses. A concise explanation might say that seasonality is modeled in the mean, residual dependence motivates a HAC covariance estimate and policy endogeneity remains a limitation. This is a much more informative answer than listing three corrections without saying what they change.

**Teaching note:** Break at 110–120 minutes. Prais–Winsten is explained here; its actual output belongs in the next meeting's lab.

## 15. Run the conventional regression

Read the actual monthly-data output.

Run the first marked block of the do-file. The seat-belt-law coefficient is 0.09545264 and its conventional SE is about 0.01424. Locate the trend and month terms so that you can describe exactly what is held fixed. The sample remains 108 monthly observations.

The coefficient is positive for total accidents. It does not show that a seat-belt law caused fatal crashes to increase. The outcome is different, the policy was not randomly assigned and omitted contemporaneous changes may matter. A surprising sign is a reason to inspect the model and design, not to reverse the definition of the dependent variable.

Reproduce the command rather than typing the displayed numbers into a new table. Check that your variable definitions and sample match. If the output differs, investigate before explaining the result; do not change data or controls to force agreement. The published excerpt preserves the numerical output from the recorded run.

```text
. regress logacc trend i.month unem spdlaw beltlaw wkends

      Source |       SS           df       MS      Number of obs   =       108
-------------+----------------------------------   F(16, 91)       =     57.61
       Model |  1.14490873        16  .071556796   Prob > F        =    0.0000
    Residual |  .113028314        91  .001242069   R-squared       =    0.9101
-------------+----------------------------------   Adj R-squared   =    0.8943
       Total |  1.25793704       107  .011756421   Root MSE        =    .03524

------------------------------------------------------------------------------
      logacc | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       trend |   .0011011   .0002579     4.27   0.000     .0005889    .0016133
             |
       month |
          2  |  -.0338346   .0177683    -1.90   0.060    -.0691291    .0014599
          3  |    .076953   .0167941     4.58   0.000     .0435936    .1103123
          4  |   .0104562   .0170469     0.61   0.541    -.0234053    .0443178
          5  |   .0237075   .0169389     1.40   0.165    -.0099395    .0573546
          6  |   .0219334   .0172149     1.27   0.206    -.0122619    .0561288
          7  |   .0499292   .0167036     2.99   0.004     .0167496    .0831088
          8  |   .0559523   .0168173     3.33   0.001     .0225468    .0893578
          9  |   .0420694   .0172819     2.43   0.017     .0077411    .0763977
         10  |    .081717   .0169554     4.82   0.000     .0480372    .1153968
         11  |   .0768721   .0172455     4.46   0.000     .0426161    .1111282
         12  |   .0990862   .0170705     5.80   0.000     .0651778    .1329947
             |
        unem |  -.0212173   .0033974    -6.25   0.000    -.0279659   -.0144688
      spdlaw |  -.0537593   .0126036    -4.27   0.000    -.0787948   -.0287238
     beltlaw |   .0954526    .014235     6.71   0.000     .0671765    .1237288
      wkends |   .0033333   .0037761     0.88   0.380    -.0041675    .0108342
       _cons |   10.63986   .0630859   168.66   0.000     10.51455    10.76518
------------------------------------------------------------------------------
```

**Teaching note:** 120–165: software/application block across pages 15–21.

## 16. Run heteroskedasticity-robust inference

The coefficient stays; the estimated standard error changes.

The next command adds vce(robust) to the same regression. The law coefficient stays at approximately 0.09545 while the SE is approximately 0.01237. The program explicitly checks that the coefficient is unchanged, so this is a verified property of the actual run rather than an assumption about two different samples.

This covariance estimate allows changing error variance under suitable independent or uncorrelated-observation asymptotics. It does not generally allow serial dependence of the regressor–error products across months. That is why the word 'robust' must always be followed by 'robust to what?'

Compare the robust and conventional columns before moving on. Here the robust SE is smaller. That observation does not make it correct or incorrect by itself; suitability depends on the data-generating and sampling conditions. Report the chosen method and its justification, rather than using 'robust' as an all-purpose quality label.

```text
. regress logacc trend i.month unem spdlaw beltlaw wkends, vce(robust)

Linear regression                               Number of obs     =        108
                                                F(16, 91)         =      51.37
                                                Prob > F          =     0.0000
                                                R-squared         =     0.9101
                                                Root MSE          =     .03524

------------------------------------------------------------------------------
             |               Robust
      logacc | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       trend |   .0011011   .0002676     4.12   0.000     .0005696    .0016326
             |
       month |
          2  |  -.0338346    .021402    -1.58   0.117    -.0763471    .0086779
          3  |    .076953   .0215727     3.57   0.001     .0341013    .1198046
          4  |   .0104562   .0189763     0.55   0.583    -.0272378    .0481503
          5  |   .0237075    .018758     1.26   0.210    -.0135529    .0609679
          6  |   .0219334   .0200891     1.09   0.278    -.0179711    .0618379
          7  |   .0499292   .0198585     2.51   0.014     .0104827    .0893756
          8  |   .0559523   .0193811     2.89   0.005     .0174541    .0944505
          9  |   .0420694   .0186208     2.26   0.026     .0050814    .0790574
         10  |    .081717   .0211651     3.86   0.000     .0396752    .1237588
         11  |   .0768721   .0199737     3.85   0.000     .0371969    .1165474
         12  |   .0990862    .021658     4.58   0.000     .0560653    .1421072
             |
        unem |  -.0212173   .0038238    -5.55   0.000    -.0288128   -.0136218
      spdlaw |  -.0537593   .0120059    -4.48   0.000    -.0776076    -.029911
     beltlaw |   .0954526   .0123682     7.72   0.000     .0708847    .1200206
      wkends |   .0033333   .0039443     0.85   0.400    -.0045016    .0111682
       _cons |   10.63986   .0681238   156.18   0.000     10.50454    10.77518
------------------------------------------------------------------------------
```

## 17. Run Newey–West on the same model

lag(4) changes inference, while preserving the OLS coefficient.

The command newey uses the identical dependent variable and regressors with a maximum lag of four months. The law coefficient stays at approximately 0.09545, and the HAC SE is approximately 0.01890. Again the do-file checks equality of the coefficients numerically.

Explain the result in two separate statements. The fitted policy association is unchanged because the OLS problem is unchanged. Estimated uncertainty changes because the covariance calculation now incorporates selected cross-date contributions. This is why an inference adjustment can matter even when the estimated policy contrast does not move.

Do not claim that lag four has been proven optimal. It is a transparent teaching choice for comparing procedures. An applied paper should justify and inspect its bandwidth choice, the time-series assumptions and the stability of the specification. The same care applies even when several plausible lag choices lead to the same reject/fail-to-reject decision.

```text
. newey logacc trend i.month unem spdlaw beltlaw wkends, lag(4)

Regression with Newey–West standard errors      Number of obs     =        108
Maximum lag = 4                                 F( 16,        91) =      37.42
                                                Prob > F          =     0.0000

------------------------------------------------------------------------------
             |             Newey–West
      logacc | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       trend |   .0011011   .0003897     2.83   0.006      .000327    .0018752
             |
       month |
          2  |  -.0338346   .0168283    -2.01   0.047    -.0672619   -.0004073
          3  |    .076953   .0183367     4.20   0.000     .0405293    .1133766
          4  |   .0104562   .0176927     0.59   0.556    -.0246882    .0456006
          5  |   .0237075    .018769     1.26   0.210    -.0135748    .0609899
          6  |   .0219334   .0200354     1.09   0.277    -.0178644    .0617313
          7  |   .0499292   .0200711     2.49   0.015     .0100605    .0897979
          8  |   .0559523   .0194475     2.88   0.005     .0173223    .0945823
          9  |   .0420694   .0187812     2.24   0.028     .0047629    .0793759
         10  |    .081717    .021099     3.87   0.000     .0398064    .1236276
         11  |   .0768721   .0210425     3.65   0.000     .0350737    .1186705
         12  |   .0990862   .0241168     4.11   0.000     .0511812    .1469913
             |
        unem |  -.0212173   .0051302    -4.14   0.000    -.0314079   -.0110268
      spdlaw |  -.0537593   .0170449    -3.15   0.002    -.0876169   -.0199018
     beltlaw |   .0954526   .0188985     5.05   0.000     .0579131    .1329922
      wkends |   .0033333   .0028746     1.16   0.249    -.0023768    .0090434
       _cons |   10.63986   .0635823   167.34   0.000     10.51356    10.76616
------------------------------------------------------------------------------
```

## 18. Give a log coefficient a careful interpretation

Total accidents are an outcome count, modeled in logs.

For a binary policy indicator in this log-outcome model, multiplying the coefficient by one hundred gives the familiar approximate percentage contrast, about 9.55%. The exact contrast in the exponentiated fitted log outcome is 100[exp(b)−1], about 10.02%.

This exact transformation does not by itself make the result a change in the conditional arithmetic mean of accident counts. Retransforming a log model into a mean in levels requires attention to the conditional distribution of the error, because the expectation of an exponential is not generally the exponential of an expectation.

Stata's nlcom computes the nonlinear transformation and a delta-method uncertainty estimate. Read the units as percent, not percentage points. Then add the design qualification: the fitted contrast does not establish a causal safety effect. This is the same discipline used for the school-staffing example, now combined with a log scale and dependent observations.

```text
. nlcom 100*(exp(_b[beltlaw])-1)

       _nl_1: 100*(exp(_b[beltlaw])-1)

------------------------------------------------------------------------------
      logacc | Coefficient  Std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
       _nl_1 |   10.01567    2.07913     4.82   0.000     5.940653    14.09069
------------------------------------------------------------------------------
```

## 19. Use diagnostic evidence without overclaiming

A serial-correlation test addresses a specified null.

After restoring the conventional regression, we run Breusch–Godfrey tests at orders one and four. The output rejects the respective no-serial-correlation nulls at conventional levels. This supports taking residual dependence seriously in this specification.

A rejection does not prove that the errors follow an exact AR(1) process, that the policy coefficient is biased or that one particular correction solves the problem. It is evidence about the specified null conditional on the model and test assumptions. The test should be interpreted with the residual plots and the economic timing argument.

The program uses the conventional fit for this diagnostic rather than silently forcing a test after an incompatible estimation command. When reading a software result, verify which model is active; Stata stores the most recent estimation results unless you save and restore them. That small reproducibility habit prevents a diagnostic from being attached to the wrong regression.

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

Arithmetic alone does not choose the correct covariance model.

Compute the coefficient-to-SE ratio for each of the three fits. The rough ratios are 6.71 with the conventional SE, 7.72 with the robust SE and 5.05 with HAC4. All exceed 1.96 in absolute value, but that common decision should not hide the substantial difference in estimated uncertainty.

Under the large-sample approximation, the HAC4 interval is wider because its SE is larger here. We would not choose an SE by asking which one rejects. We choose it because the covariance assumptions fit the dependence structure and the inferential target, subject to finite-sample limitations.

Now write a report that states the outcome and sampling frequency, gives the coefficient, names the HAC window and distinguishes the association from the causal policy effect. This is the kind of short empirical answer expected in a graduate course: precise, economical and qualified by a specific assumption rather than a generic disclaimer.

**Attempt:** Use b=0.09545264 and HAC4 SE=0.01889849. Compute the approximate t ratio and 95% interval for b.

**Solution:** t≈5.05. The large-sample interval is 0.09545264±1.96×0.01889849≈[0.05841,0.13249]. It is on the log-outcome coefficient scale. It is not a causal effect interval unless the identification assumptions also hold.

## 21. Transfer the logic to quarterly inflation

A different application uses the same inference questions.

Suppose a quarterly regression relates an inflation-persistence outcome four quarters ahead to a current supply shock and observed controls. A separate regression is fitted for each horizon. The coefficient at horizon four concerns the outcome one year after the shock, not four months later.

Neighboring horizon-regression errors can share future shocks because their outcome windows overlap. HAC inference can therefore be natural even if the researcher has chosen a sensible set of lag controls. This is one reason residual dependence is not always a simple demand for an extra lagged regressor.

For an accessible first treatment, take the outcome measure and identified shock as given while still asking what makes the shock plausibly exogenous. We do not need to estimate a regime-switching model to learn horizon interpretation or HAC logic. The next meeting develops this extension step by step, with the frequency, horizon and coefficient target defined before the output.

**Teaching note:** 165–180: transfer and exit checks across the last three pages.

## 22. Choose the next action for a named problem

Match the intervention to the diagnosis.

Consider three research problems. First, the conditional mean is plausible but residuals remain dependent over nearby dates. An appropriately justified HAC covariance may address uncertainty. Second, an omitted lag predicts the outcome and its omission makes an included regressor endogenous. Reconsider the mean specification and identification; HAC alone cannot repair the coefficient. Third, policy timing responds to unobserved contemporaneous safety conditions. You need a more credible causal comparison.

None of these choices requires new notation, but each requires a different argument. That is the modest graduate step beyond reading a coefficient: explain why a proposed method addresses the actual failure, and say what it leaves unresolved.

Write your diagnosis in the form 'The concern is…, therefore I would…, under the assumption that…'. A sentence in that form makes it harder to hide a design problem behind a command name. Discuss disagreements by tracing the regressor, error and information timing rather than by selecting a preferred software option.

**Attempt:** A policy indicator responds to unobserved accident risk. Is the first remedy a longer HAC window?

**Solution:** No. The named problem is policy endogeneity. A longer HAC window changes uncertainty estimates but does not create an exogenous policy comparison. Address the design or identify a defensible source of policy variation.

## 23. Exit check: model, estimate or uncertainty?

Explain what each proposed change actually changes.

Without looking at the earlier pages, explain the difference between adding a lagged outcome, applying Newey–West to the same model and fitting Prais–Winsten. Identify which change leaves OLS point estimates unchanged and give the calendar interpretation of lag four in today's data.

Then state one condition needed for meaningful inference and one limitation that no standard-error option resolves. A strong answer connects weak dependence and exogeneity to the appropriate roles, rather than listing assumptions with no explanation. Minor rounding differences in the t ratio should not obscure this conceptual distinction.

Finally, return to the traffic-policy question. We have learned that the same fitted association can carry different estimated uncertainty and that residual dependence matters for the covariance calculation. We have not established a causal accident effect of either law. Carry both conclusions into the next class, where dynamics and horizon responses will extend the same reasoning.

**Attempt:** In one paragraph, compare the three changes and interpret monthly lag(4).

**Solution:** Adding a lag changes the mean model and may change coefficients and sample. Newey–West on the same specification and sample retains OLS coefficients while changing the covariance estimate; lag(4) here reaches four months. Prais–Winsten models an AR(1) error process and can change coefficients as well as SEs. None automatically cures policy endogeneity.

