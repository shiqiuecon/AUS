# 10. Time series: functional form, indexes and calendar patterns

Choose units, trends and calendar controls for a dated policy comparison.

## Core lesson

### 01. What do the units and calendar controls change?

The monthly traffic model is our continuing application. Before interpreting its coefficients, we need to distinguish the measurement scale from the time pattern included in the equation. An index compares a level with a base period; a log difference describes a ratio; trend and seasonal terms describe particular calendar patterns.

We use those ideas to translate a fitted time-series result and to ask which changes the calendar controls can explain. Neither a base-year rescaling nor a high R squared settles the causal question about a dated policy. The model still needs an argument about other events occurring at the same time.

Measurement: levels, logs, indexes and purchasing power.

Calendar specification: trends, seasonality and dated indicators.

### 02. An index number compares a level with a base period

A value of 125 on a base-100 index means 25 percent above its base.

A dated monetary series can rise because quantities or prices change. An index number expresses a level relative to a chosen base period. Divide the current level by its base-period level and multiply by 100. The base value is therefore 100; an index of 125 means that the indexed level is 25 percent above its base.

A price index summarises a specified basket of prices. It does not measure every household's exact cost of living. Changing the base rescales the index without changing its proportional growth rates. An increase from 120 to 125 is five index points but about 4.17 percent, because the percentage change divides by the starting 120. Distinguish those units before using an index in a regression.

\(I_t=100\,P_t/P_0\); \(P_0\) is the base-period price level.

\(120\rightarrow125:\quad100(125/120-1)\approx4.17\%\).

Index points and percentage changes answer different questions.

### 03. Convert nominal money to a common purchasing-power scale

Deflation separates a monetary level from the price scale used to express it.

Nominal income is the amount of money recorded at that date's prices. Real income expresses purchasing power using a common price scale. With a base-100 price index, divide nominal income by the index divided by 100. Deflation is the name for this conversion; it does not mean that the amount of money actually paid changes.

In the constructed example, income rises from 100 to 110 thousand dirhams while the price index rises from 100 to 125. The later real income is 88 thousand base-period dirhams: nominal income rose ten percent, but purchasing power fell twelve percent. These are teaching values, not current UAE statistics. The cigarette-demand application later divides nominal prices by a price index before taking logs. Define that monetary scale before interpreting its elasticity.

Real amount: \(Y_t^{R}=Y_t^{N}/(I_t/100)\); superscripts \(R,N\) denote real and nominal amounts.

Example: \(110/1.25=88\), compared with base-period real income \(100\).

Choose an index suited to the economic quantity and state the base year.

**Practice:** Nominal income is 110 and the base-100 price index is 125. What is real income?

**Explanation:** 110 divided by 1.25 is 88, in base-period monetary units.

### 04. A nominal-real restriction is a testable statement about coefficients

Rewrite the real-variable theory in the observed nominal variables.

Suppose a theory relates log real spending C divided by P to log real income W divided by P, where P is a positive price index on a stated base. Let beta be its income elasticity and a its intercept. Expanding the log ratios gives an equation for nominal log C with beta multiplying log W and one minus beta multiplying log P.

If we estimate separate coefficients b W and b P in the nominal equation, this particular real-variable model implies that their sum equals one. Testing that restriction evaluates one formulation of money illusion: whether a common proportional change in nominal income and prices leaves fitted real spending unchanged. The test still needs the model, measurement and uncertainty assumptions; it is not a universal definition of rational behaviour.

\(\log(C/P)=a+\beta\log(W/P)+u\).

\(\log C=a+\beta\log W+(1-\beta)\log P+u\).

In an unrestricted nominal equation, test \(H_0:b_W+b_P=1\).

### 05. A trend is a gradual time pattern

In a log outcome, a linear trend describes proportional growth.

A deterministic linear trend is a fitted change at a constant rate as the time index increases. In a level outcome, its coefficient is in outcome units per period. In a log outcome, it describes a constant log change per period, approximately a percentage rate for small coefficients.

This is one way to represent gradual changes in exposure, population or reporting, but it does not measure each mechanism separately. A trend control is therefore a modelling assumption. It can help separate a gradual pattern from a policy-date shift only insofar as that pattern is adequately represented by the chosen function.

\(\log A_t=a+gt+u_t\)

Small-change interpretation: about \(100g\)% per month

### 06. Seasonality repeats at the same part of the year

Use a reference month to avoid redundant indicators.

Seasonality is a recurring calendar pattern, such as travel or weather conditions that differ across months. With an intercept, eleven month indicators compare February through December with January. Including all twelve would create an exact linear dependence with the intercept.

These effects need not be the same as a gradual trend. The trend compares the sequence across years, while month indicators allow a repeated annual pattern. A seasonal outcome plot does not by itself prove that the regression errors are serially correlated: the model may explain that seasonal component. We will examine remaining residual dependence separately.

January is the reference category

Eleven recurring month indicators, not 108 unique date indicators

### 07. Write the policy model with its calendar controls

Make the intervention and units explicit.

Let A denote monthly total accidents, so log A is the outcome. B indicates whether the seat-belt law is in force and S the speed-law state; each is zero or one. U is unemployment and W the weekend count. Lowercase u is the regression error, a different quantity from uppercase U. The intercept is a and g is the linear trend coefficient on the monthly index t.

M subscript m t is one if date t is in calendar month m. The sum includes February through December, each with coefficient gamma subscript m relative to January. January uses the intercept, avoiding a redundant twelfth indicator. The other coefficients describe fitted contrasts at fixed included calendar and economic variables. These controls represent particular patterns; they do not automatically supply the no-law accident path needed for a causal policy effect.

\(\log A_t=a+gt+\sum_{m=2}^{12}\gamma_mM_{mt}+bB_t+cS_t+dU_t+fW_t+u_t\)

\(M_{mt}\): month indicator; January is the reference.

\(U_t\): unemployment; \(u_t\): regression error.

### 08. Inspect the calendar-only regression

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

### 09. A seasonal joint test asks about the whole pattern

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

### 10. Read the adjusted accident regression

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

### 11. A date indicator can mix several simultaneous changes

A coefficient needs a counterfactual interpretation.

If a law begins in one month, its indicator distinguishes a period after that date from earlier observations. Any unmeasured persistent change beginning nearby may contribute to the same contrast. Trend and season controls remove only the patterns their equations represent.

For a causal claim, explain what the accident path would have looked like without the law and why the included comparison supports that prediction. An additional comparison region, a credible assignment rule or more detailed exposure data might help in a suitable design. A long series by itself does not make one adoption event equivalent to repeated random assignments.

Earlier accident history and economic conditions can influence both law adoption and later accidents. The diagram shows the two resulting backdoor routes. Toggle the proposed history and economic controls separately. A calendar indicator does not close a route merely because adoption occurred at a known date; the relevant pre-policy causes must be addressed by the design and measured controls.

### 12. A linear trend does not remove every nonstationary process

A straight calendar pattern need not describe accumulated random changes.

A straight time trend assumes a predictable drift of a constant amount per period. A nonstationary process has statistical features that change with the calendar, such as a growing variance. Some series instead accumulate unexpected changes. If a new disturbance permanently changes the level each month, the path can wander far above or below any fitted straight line. Subtracting a deterministic trend does not remove this accumulation.

We introduce stationarity and a random-walk model in the next meeting to describe the distinction precisely. For now, inspect the time plot and ask whether deviations appear to fade or remain. A calendar control addresses only the pattern it represents. It does not by itself justify treating the remaining observations as independent or interpreting a law indicator as the effect of a policy intervention.

A fixed calendar drift and accumulated unexpected changes are different mechanisms.

Inspect whether deviations fade before relying on a trend regression.

### 13. Interpret the traffic-law coefficient with its timing

Reproduce the evidence, then explain its economic meaning.

Run lab_09.do using traffic.csv. Verify the monthly date range and sample size. Translate the seat-belt-law coefficient into an exact percentage contrast in exponentiated fitted log accidents. Explain why the trend and month controls do not establish that the law caused this contrast.

Refit the traffic model without its linear trend, retaining the same month controls, other regressors and 108 months. Compare the law slopes and explain the changed time-path assumption. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Refit the traffic model without its linear trend, retaining the same month controls, other regressors and 108 months. Compare the law slopes and explain the changed time-path assumption. Keep your commands, log, output and interpretation.

### 14. Interpret the traffic-law coefficient with its timing: explanation

A reproducible result needs both a calculation and an interpretation.

The series has 108 months, January 1981 through December 1989. Its seat-belt-law coefficient is 0.095453. The exact fitted multiplicative contrast is 10.0157 percent. It concerns total accidents, rather than deaths or accidents per distance travelled.

The result compares law states after accounting for the specified trend, seasonal pattern and other included variables. Adoption could coincide with unmeasured enforcement, reporting, exposure or other policy changes. Controlling for the calendar addresses the pattern represented by those controls. A causal statement needs a credible argument about the remaining counterfactual accident path, rather than relying on the law indicator's p-value.

The law slope is 0.095453 with a trend and 0.130158 without it. These are log-accident associations under different time specifications. A more attractive sign or p-value is not a reason to select the counterfactual trend.

Law slope with trend: \(0.095453\); without trend: \(0.130158\).

Same 108 months and remaining regressors.

The models impose different time-path assumptions.

### 15. From calendar controls to persistence

The time index, measurement scale, trend and seasonal controls specify the comparison being estimated. A date indicator can capture several simultaneous changes, so its coefficient alone does not establish a policy effect.

Next we study stationarity, persistence and dynamic completeness. These ideas help us judge whether the chosen time-series model represents a stable relationship and whether useful past information remains in its error.

From calendar controls to persistence

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 16. Frequency and season

Try the comparison before opening the explanation.

An accident dataset runs monthly from January 1981 through December 1989. How many observations are there, and why use eleven month indicators with an intercept?

Translate each lag into calendar time using the observation frequency. A month effect repeats annually; a linear trend does not repeat.

**Practice:** An accident dataset runs monthly from January 1981 through December 1989. How many observations are there, and why use eleven month indicators with an intercept?

### 17. Frequency and season: explanation

Follow the calculation and interpret its units.

There are \(9\times12=108\) observations. Eleven indicators compare months with an omitted reference month; including all twelve plus an intercept creates exact collinearity. Their purpose is seasonal adjustment, not causal identification by itself.

There are \(9\times12=108\) observations. Eleven indicators compare months with an omitted reference month; including all twelve plus an intercept creates exact collinearity. Their purpose is seasonal adjustment, not causal identification by itself.

### 18. Before–after is not enough

Try the comparison before opening the explanation.

Accidents fall after a road-safety law. Why is this not yet evidence of its causal effect?

Describe the accident path that would have occurred under the specified no-law policy. Ask whether another change at adoption could explain the observed difference.

**Practice:** Accidents fall after a road-safety law. Why is this not yet evidence of its causal effect?

### 19. Before–after is not enough: explanation

Follow the calculation and interpret its units.

Traffic volume, seasonality, fuel prices, enforcement, reporting or other policies may also change. A defensible causal comparison must rule out relevant counterfactual changes; adding a trend is useful only insofar as its assumptions are credible.

Traffic volume, seasonality, fuel prices, enforcement, reporting or other policies may also change. A defensible causal comparison must rule out relevant counterfactual changes; adding a trend is useful only insofar as its assumptions are credible.

### 20. Record the time-series specification in words

Dates and frequency are part of reproducibility.

A useful description gives the date range, monthly frequency, outcome scale, policy coding, trend and seasonal controls. It states how gaps and lags are handled and which observations are lost when lagged terms are added. Another analyst should be able to reproduce the same sample and equation.

Then explain the proposed economic comparison and its main uncertainty and identification conditions. This is more useful than reporting only a command name or a number of observations. In a time-series setting, the time structure is part of what the model means, not a formatting detail appended after estimation.

A useful description gives the date range, monthly frequency, outcome scale, policy coding, trend and seasonal controls.

Then explain the proposed economic comparison and its main uncertainty and identification conditions.

