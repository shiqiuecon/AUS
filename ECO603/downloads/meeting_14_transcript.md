# 14. Panel methods, DiD and instrumental variables

## 01. Can repeated observations improve a policy comparison?

Use changes within states to study alcohol taxes and traffic fatalities.

States differ in geography, driving culture and other persistent characteristics. A pooled comparison between beer taxes and traffic fatalities can mix those differences with a policy relationship. Panel data observe the same identifiable units repeatedly, giving us a way to remove a particular kind of stable omitted factor.

Our application follows 48 states for seven years, with 336 state-year observations. The outcome is traffic fatalities per ten thousand residents and the regressor is a real beer-tax measure. We will compare pooled, fixed-effect and two-period change regressions, then build a simple difference-in-differences policy comparison with clearly constructed numbers.

## 02. A panel has identities as well as dates

Repeated cross sections do not give the same within-unit comparison.

One row is a state in a year. The state identifier connects its observations over time, and the year records when the outcome and tax were measured. A balanced panel has the same set of dates for every unit; an unbalanced panel has some missing unit-date observations.

Before estimating, verify that the state-year pair uniquely identifies rows and inspect the coverage. Repeated records can reflect real panel structure or accidental duplicates. The model must describe the actual units being followed. A survey that samples different households each year may be repeated cross sections rather than a household panel, even though it spans the same dates.

One row is a state in a year.

Before estimating, verify that the state-year pair uniquely identifies rows and inspect the coverage.

## 03. Write a stable omitted effect explicitly

An unobserved unit component may be related to policy.

Use i for a state and t for a year. Y is the fatality rate and X the beer tax. Alpha subscript i is an additive state component that is constant across the observed years, such as a stable part of road conditions. Lambda subscript t is a common year shift. The remaining error u subscript i t can vary across both states and years.

The tax coefficient beta is the target slope in this specification. If stable state factors are related to taxes, a regression pooling all observations without accounting for them can mix their contribution into the tax association. Repeated observations let us subtract the same stable component from itself. The next numerical example shows this cancellation before we apply the general first-difference and demeaning formulas.

\(Y_{it}=\beta X_{it}+\alpha_i+\lambda_t+u_{it}\)

\(\alpha_i\): stable state component; \(\lambda_t\): common year shift.

\(u_{it}\): remaining state-year error.

## 04. Follow one unit across two dates

Subtracting the same unit’s outcomes removes its stable intercept.

Consider a constructed unit with X equal to two before and four after, and Y equal to ten before and fourteen after. Its X change is two and its Y change is four. Suppose its outcome rule contains an unobserved stable component alpha equal to six. Subtracting later Y minus earlier Y subtracts six minus six, which is zero.

This is why a within-unit comparison can remove a stable additive omitted component. It does not remove a component that changes over time or a stable characteristic whose effect itself changes. Common date changes also remain unless the model accounts for them. We now write the subtraction in general notation, keeping i for unit and t for date.

\((X_{i1},X_{i2})=(2,4),\quad(Y_{i1},Y_{i2})=(10,14)\)

\(\Delta X_i=2,\quad\Delta Y_i=4,\quad\alpha_i-\alpha_i=0\)

## 05. First differencing removes a stable unit component

Subtract the earlier equation from the later equation.

With two periods, subtract a state's earlier outcome from its later outcome and do the same for its regressor. The stable alpha i cancels because the same value appears in both equations. The common change in year effects remains as an intercept.

Time-invariant regressors also disappear from a differenced equation. This is useful when the concern is a stable unobserved state characteristic, but it means their separate level coefficients cannot be learned from this within-state change comparison. Time-varying omitted factors remain in the differenced error and can still threaten identification.

\(\Delta Y_i=\beta\Delta X_i+\Delta\lambda+\Delta u_i\)

## 06. Differencing can create dependence even from independent level errors

Adjacent differences share one error with opposite signs.

Suppose the level errors for one panel unit are independent over time with common variance sigma squared. The differenced error at t is u t minus u t minus one. Its variance is two sigma squared. The next adjacent difference shares one level error with the opposite sign, so their covariance is minus sigma squared and their correlation is minus one half.

This calculation does not make the differenced regressor exogenous; that needs its own moment condition. It does show why treating repeated differences from one unit as independent can give an incorrect covariance estimate. Unit-clustered inference permits within-unit dependence under its own sampling and many-independent-cluster conditions. Independent-data robust standard errors alone do not generally handle those shared errors.

\(\Delta u_{it}=u_{it}-u_{i,t-1}\); if level errors are independent with variance \(\sigma^2\), \(\operatorname{Var}(\Delta u_{it})=2\sigma^2\).

\(\operatorname{Cov}(\Delta u_{it},\Delta u_{i,t-1})=-\sigma^2\); adjacent correlation \(=-1/2\).

## 07. A two-period athlete example uses the same algebra

State what disappears and what the comparison still needs.

Apply the same subtraction to a student rather than a state. GPA means grade point average, a numerical summary of course grades. The regressor season equals one when the student's sport is in season and zero otherwise. Suppose a stable student component captures lasting preparation, while a semester effect captures a common change across students.

Subtract the student's first-semester equation from the second. The stable preparation component cancels. A semester change remains, as does any change in unobserved study conditions. The coefficient uses students whose season indicator changes. If course difficulty or study time changes with the sports season, that time-varying factor can still confound the comparison. Differencing removes the stable additive component, not every reason that participation and grades might move together.

\(GPA_{it}=\beta\,season_{it}+\alpha_i+\lambda_t+u_{it}\)

\(\Delta GPA_i=\beta\Delta season_i+\Delta\lambda+\Delta u_i\)

GPA: grade point average; season: a zero-or-one indicator.

## 08. First differences

Try the comparison before opening the explanation.

In \(GPA_{it}=\beta\,season_{it}+\alpha_i+\lambda_t+u_{it}\) for two semesters, write the differenced equation and say what disappears.

GPA is the student’s grade point average. Subtract the same student’s first-semester equation from the second; keep the common semester change.

**Practice:** In \(GPA_{it}=\beta\,season_{it}+\alpha_i+\lambda_t+u_{it}\) for two semesters, write the differenced equation and say what disappears.

## 09. First differences: explanation

Follow the calculation and interpret its units.

\(\Delta GPA_i=\beta\Delta season_i+\Delta\lambda+\Delta u_i\). The time-invariant \(\alpha_i\) disappears, as do coefficients on time-invariant regressors. Semester effects do not disappear; with two periods they become a common intercept. Time-varying confounding can remain.

\(\Delta GPA_i=\beta\Delta season_i+\Delta\lambda+\Delta u_i\). The time-invariant \(\alpha_i\) disappears, as do coefficients on time-invariant regressors. Semester effects do not disappear; with two periods they become a common intercept. Time-varying confounding can remain.

## 10. Demeaning uses each unit’s own average

Fixed effects remove the same stable component over several periods.

Demeaning means subtracting a unit's own time average from each of its observations. For the constructed unit, X values two and four have average three, giving demeaned values minus one and plus one. Y values ten and fourteen have average twelve, giving minus two and plus two. The within-unit slope is therefore two in this simple example.

A stable additive component equals its own time average, so it disappears in this subtraction. With several dates, the transformation uses every available date for that unit rather than just two endpoints. Common year effects must also be accounted for in the transformed equation. Fixed-effects estimation performs this calculation to estimate the slope from within-unit variation; it does not make a changing omitted cause disappear or establish that the remaining regressor changes are exogenous.

\(X_i=(2,4)\Rightarrow X_i-\overline X_i=(-1,1)\)

\(Y_i=(10,14)\Rightarrow Y_i-\overline Y_i=(-2,2)\)

\(Y_{it}-\overline Y_i=\beta(X_{it}-\overline X_i)+(\lambda_t-\overline\lambda)+(u_{it}-\overline u_i)\)

## 11. Two-period fixed effects and first differences share a slope identity

The identity requires the same two-period sample and specification.

With two observations per unit, demeaning produces one half of the change and its negative. OLS on these within deviations therefore gives the same slope as the first-difference regression with compatible time terms. This is a calculation identity, not a statement that every panel specification must agree.

Our application compares a two-period change from 1982 to 1988 with a fixed-effects fit using all seven years. Those are different samples of time variation, so their coefficients can differ. Do not interpret that difference as a failure of the two-period identity. Align the sample, regressors and covariance treatment before making a numerical comparison.

With two observations per unit, demeaning produces one half of the change and its negative.

Our application compares a two-period change from 1982 to 1988 with a fixed-effects fit using all seven years.

## 12. Read pooled and within-state associations

Removing stable differences can change the sign.

The pooled tax coefficient with year indicators is 0.366; the two-way fixed-effect coefficient is -0.640. Their signs differ. This is evidence that between-state and within-state comparisons in these data are not interchangeable.

The fixed-effect coefficient is measured in fatalities per ten thousand residents per unit of the recorded real tax measure, conditional on the time effects. It is not automatically causal: changing state conditions may influence both policy and fatalities. Interpret the coefficient movement through the comparison each estimator uses, rather than choosing the sign that best fits a preferred story.

```text
. xtreg fatality beertax i.year, fe vce(cluster state)

------------------------------------------------------------------------------
             |               Robust
    fatality | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
     beertax |  -.6399799   .3570783    -1.79   0.080    -1.358329     .078369
             |
       _cons |    2.42847   .2016884    12.04   0.000     2.022725    2.834215
-------------+----------------------------------------------------------------
```

## 13. Use year effects for common shocks

They do not remove state-specific changes.

A year effect permits a common intercept change for every state in the same year. It can absorb a nationwide shift represented by that common component. State effects instead absorb stable additive differences between states. Including both asks which tax changes remain beyond each state's stable level and the common year shifts.

The separate housing diagram illustrates the limit of common time controls. Nearness to an incinerator can be associated with stable location quality, which also affects house prices. Conditioning on common time conditions does not close that location route. Removing a stable additive location component uses a different comparison, and its causal interpretation still requires assumptions about changing local factors. An algebraic subtraction does not literally erase a causal arrow from the world.

Year effects: common date shifts. State effects: stable additive state differences.

A location common cause is not removed by a common calendar control.

## 14. Check whether fixed effects absorb a regressor

A time-only variable cannot survive unrestricted time indicators.

A year indicator permits a separate intercept shift for each year. Suppose a tax is one in the first year and two in the second for every district. With an intercept and an indicator for the second year, the tax equals the intercept column plus that indicator. It supplies no separate variation, so its coefficient cannot also be estimated. We say the year effects absorb it.

Now multiply the tax by near, a zero-or-one indicator for a location group. In each year the product differs between the groups, and its group difference changes across years. It can therefore have variation beyond the common year shifts. The coefficient is a differential group slope, while the common tax slope remains absorbed. With separate unit and year intercepts, check the variation that survives both kinds of controls.

If \(Tax_t=1+1\{t=2\}\), its column duplicates year-intercept variation.

\(Tax_t\times near_i\) can vary across groups within a year.

A separate coefficient needs variation beyond the included controls.

## 15. What year effects absorb

Try the comparison before opening the explanation.

\(Tax_t\) is identical across all districts in each year. Can its coefficient be estimated separately in a regression with an intercept and a full set of year effects? Can \(Tax_t\times near_i\) survive?

Try reproducing the common tax column using the year indicators. Then ask whether the tax-by-group product has additional variation.

**Practice:** \(Tax_t\) is identical across all districts in each year. Can its coefficient be estimated separately in a regression with an intercept and a full set of year effects? Can \(Tax_t\times near_i\) survive?

## 16. What year effects absorb: explanation

Follow the calculation and interpret its units.

The common tax column is a linear combination of the year indicators, so its separate coefficient is not identified in that regression. The tax-by-group product can retain variation because it differs across groups within years. Check that it is not reproduced by all the included controls. It describes a differential group slope; it does not recover the absorbed common tax effect.

The common tax column is a linear combination of the year indicators, so its separate coefficient is not identified in that regression. The tax-by-group product can retain variation because it differs across groups within years. Check that it is not reproduced by all the included controls. It describes a differential group slope; it does not recover the absorbed common tax effect.

## 17. State the fixed-effects exogeneity condition

Transforming variables does not make their remaining changes random.

A common sufficient mean assumption is that the error at each date averages to zero given the unit's full regressor history and its stable effect. This is a strict-exogeneity condition for the panel model. It rules out, for example, an unobserved current fatality shock that drives future tax changes in a way incompatible with the restriction.

First-difference OLS instead needs its differenced regressor to have the required lack of relation with the differenced error. These assumptions should be discussed in the application's timing and policy context. A transformation removes the stable component algebraically; the remaining exogeneity is a substantive claim.

\(E(u_{it}\mid X_{i1},\ldots,X_{iT},\alpha_i)=0\) as a sufficient panel condition

## 18. Build a difference-in-differences comparison

Begin with the Head Start policy question from the original DiD lesson.

Can expanded preschool access allow mothers to take paid work? This is the Head Start policy question in our earlier DiD lesson. Preschool may relax child-care constraints, but mothers can use the released time for work, care or other activities. Economic reasoning motivates a response to measure; it does not determine its size in advance.

For a two-period teaching design, define a group eligible before the expansion and a comparison group not eligible. Observe maternal employment before and after the specified expansion. A difference-in-differences comparison subtracts the comparison group's change from the eligible group's change. The related reading studies Head Start expansions and experimental access, but our simple two-group diagram is a teaching model, not a replication of that paper's full research design.

Policy question: preschool access and maternal employment.

Define eligibility before the expansion, the comparison population and the two dates.

Reading: Wikle and Wilson (2023), Access to Head Start and Maternal Labor Supply.

## 19. Preschool access changes a household’s feasible choices

Released care time can support paid work or another activity.

The diagram adapts the time-allocation illustration in the original Head Start slides. The horizontal axis records home and other non-market time, and the vertical axis paid-work time. In the schematic example, three hours are initially available after required child care. Point E one allocates one hour to other activities and two to paid work.

Suppose preschool releases three more hours. One possible choice, E two, keeps other time at one hour and increases paid work to five. Another, E three, keeps paid work at two and increases other time to four. These points illustrate feasible choices, not estimated household responses. Wages, job availability, preferences and the hours covered by preschool affect which choice is made. We therefore need outcome data and a defensible policy comparison.

Axes: home/other time and paid-work time.

Preschool can relax a care constraint without forcing a particular response.

The diagram is a constructed time-allocation illustration.

## 20. Eligibility, access and participation are different variables

State the policy exposure whose effect is being studied.

Eligibility is meeting the policy's rules. Access means that a preschool place is available. Participation means actually using a place. These can differ: eligible families may face shortages or choose another arrangement. Our classroom expansion comparison concerns the eligible group's exposure to expanded access, not automatically the effect of attending preschool for a participant.

The assumed DAG links access to care constraints and maternal employment. Prior household factors can influence both access and employment. Holding a post-expansion care measure fixed can remove a mechanism that belongs to the total access effect. The graph helps articulate timing and possible channels, while DiD still needs an argument about untreated changes over time. Neither eligibility nor a regression control supplies that argument by itself.

Eligibility: policy conditions; access: an available place; participation: actual use.

Define the expansion comparison before interpreting a coefficient as an attendance effect.

A causal diagram does not establish parallel untreated trends.

## 21. Parallel trends is about unobserved untreated changes

It is not a requirement that the groups begin at the same level.

Use the four labels from the original diagram. A is the eligible group's employment rate before expansion, 40 percent, and B its later observed rate, 48 percent. C and D are the comparison group's rates, 60 and 63 percent. These are constructed teaching values. Different initial levels do not by themselves rule out parallel trends.

The average treatment effect on the treated, abbreviated ATT, is the average difference between the eligible group's post-expansion employment outcome and its outcome without the specified expansion. Here treated means exposure of the predefined eligible group to the expansion; it does not mean that every eligible mother enrolled a child. Under parallel untreated trends, the eligible group's no-expansion increase would equal the comparison group's three-percentage-point increase.

The assumed eligible post rate is therefore 43 percent. Its observed rate is 48, giving a five-percentage-point contrast. The dashed line represents a missing untreated outcome under that assumption. We do not observe it after expansion. Changing the control lets us examine an alternative assumed untreated change; it does not reveal that missing outcome.

Observed DiD: \((Y_B-Y_A)-(Y_D-Y_C)=(48-40)-(63-60)=5\) percentage points.

Assumed untreated eligible post rate: \(40+(63-60)=43\%\).

Parallel trends concerns the missing no-expansion change, not equal starting levels.

## 22. No anticipation and stable comparison units also matter

Define when treatment can begin to affect behaviour.

No anticipation means that the expansion has not already changed the measured pre-period outcome. A mother who starts searching for work before places open can create an anticipation issue. Choose the policy timing and baseline with that possibility in mind.

We also need a well-defined exposure and a suitable comparison population. If expanded preschool changes private care prices for ineligible families, their outcomes may be affected too. If the mix of mothers in the sample changes, the group means can change for a compositional reason. These are substantive questions about the policy and observations. They require institutional evidence and careful definitions alongside the parallel-trends argument.

No anticipation: the policy has not already changed the baseline outcome.

Check spillovers and the population represented at both dates.

A clear policy definition is part of the causal model.

## 23. DiD arithmetic

Try the comparison before opening the explanation.

In the Head Start teaching diagram, eligible mothers’ employment rises from 40% to 48%; comparison mothers’ employment rises from 60% to 63%. Calculate DiD in percentage points and on the zero-or-one employment-regression scale. State the untreated-trend assumption.

First calculate each group’s change in the same units, then subtract. Explain which post-period mean is missing.

Work in percentage points before converting to a zero-or-one outcome scale.

**Practice:** In the Head Start teaching diagram, eligible mothers’ employment rises from 40% to 48%; comparison mothers’ employment rises from 60% to 63%. Calculate DiD in percentage points and on the zero-or-one employment-regression scale. State the untreated-trend assumption.

## 24. DiD arithmetic: explanation

Follow the calculation and interpret its units.

The eligible change is eight percentage points and the comparison change three. The difference is five percentage points, or 0.05 on a zero-or-one outcome scale. Under parallel untreated trends the eligible group’s no-expansion post rate would be 43%. A causal interpretation also requires an unaffected baseline, no spillovers into the comparison group, a well-defined policy, and comparable sampling. The numbers are constructed, not estimates from the Head Start paper.

\((48-40)-(63-60)=5\) percentage points.

Binary-outcome regression contrast: \(0.05\).

The untreated eligible post mean is assumed, not observed.

## 25. The interaction in a two-by-two DiD equation has a specific meaning

Its interpretation follows the four group-time means.

Let the individual outcome Y be one if a mother is employed and zero otherwise. G is one for the group defined as eligible before expansion, and P is one for the post-expansion period. The intercept beta zero is the comparison group's initial employment probability. Beta one is its change over time, beta two the initial eligible-group gap, and beta three the additional change in the eligible group. The remaining term u is the regression error.

The interaction slope is 0.05 in our constructed example, equivalent to five percentage points. An equation with an intercept, group indicator, time indicator and their interaction reproduces the four cell means; this is a saturated two-by-two specification. Interpreting its interaction as the expansion effect needs the policy and untreated-trend assumptions. It does not automatically estimate the effect of preschool participation.

\(Y_{it}=\beta_0+\beta_1P_t+\beta_2G_i+\beta_3G_iP_t+u_{it}\).

\(G_i\): predefined eligible group; \(P_t\): post period; \(Y_{it}\): employment indicator.

Constructed interaction: \(\beta_3=0.05\), or five percentage points.

## 26. Different characteristics can imply different untreated changes

Unequal starting levels and unequal untreated trends are different issues.

The original Head Start lesson next asks whether eligible and ineligible families are comparable over time. Different baseline employment levels alone do not defeat DiD. The concern is a characteristic that produces different no-expansion changes and is distributed differently across the groups. Location can matter because local labour demand changes; prior education can matter because employment opportunities change differently by qualification.

Let W denote characteristics measured before the expansion. Conditional parallel trends requires equal untreated average changes within comparable values of W, rather than only for the two groups as a whole. A covariate is simply a variable used to describe or condition the comparison. We must justify why conditioning on the chosen prior characteristics makes this trend assumption credible. A post-expansion variable affected by preschool is a different kind of control.

\(W\): characteristics fixed before intervention.

Conditional trends: \(E[\Delta Y(0)\mid G=1,W]=E[\Delta Y(0)\mid G=0,W]\).

Here the change in Y(0) means the change without expansion.

## 27. Compare within location before averaging across locations

The original two-location idea separates changing opportunities from policy effects.

Consider two illustrative locations, A and B. Within location A the comparison group's employment rises two percentage points and the eligible group's rises three, giving a one-point DiD. Within location B the changes are six and nine, giving a three-point DiD. These are constructed values under a within-location parallel-trends model.

Now suppose 75 percent of eligible mothers live in A, while only 25 percent of comparison mothers do. The groups put different weights on locations with different untreated changes. Their unadjusted overall changes are 4.5 and five percentage points, giving minus 0.5. The negative overall DiD can coexist with positive within-location contrasts. A group average can mix the policy response with the distribution of changing local opportunities.

Location A: group changes 3 and 2; within-location DiD 1 percentage point.

Location B: group changes 9 and 6; within-location DiD 3 percentage points.

Different location mixtures can reverse the unadjusted aggregate comparison.

## 28. Average conditional effects for the treated population

The target determines the averaging weights.

A conditional ATT is the intervention's average effect for the treated group at a specified value of W. Call it tau of W. To recover the overall ATT, average those conditional effects using the distribution of W among treated units. Do not automatically use the pooled sample or the comparison group's distribution.

In the two-location example, the eligible-group weights are 0.75 and 0.25. The corresponding average is 0.75 times one plus 0.25 times three, or 1.5 percentage points. Equal weights would give two points and describe another target. Move the eligible-group location share to see how both its target average and the naive group comparison change. The conditional causal interpretation still depends on the within-location assumptions and the availability of suitable comparison observations.

\(\tau(W)\): the conditional effect among treated units at characteristic \(W\).

\(ATT=E[\tau(W)\mid G=1]\).

Example: \(0.75(1)+0.25(3)=1.5\) percentage points.

## 29. A covariate in levels need not adjust a trend

Decide whether the model represents untreated changes and effect heterogeneity.

Adding a baseline covariate to an outcome-level regression is not a general solution to conditional parallel trends. In a balanced two-period panel, a time-invariant term gamma times W disappears when we difference the same person's equation. It therefore cannot describe how untreated changes vary with W.

A model of the change as a function of W, or suitable interactions between W and the post indicator, can represent that variation under its functional-form assumptions. A single common policy interaction can also impose a constant conditional effect where effects actually vary. If we allow heterogeneous effects, we must still average for the intended treated population. The question is which comparison and restrictions the equation represents, not simply whether a covariate appears somewhere in the command.

Time-invariant levels: \(\Delta(\gamma W_i)=0\).

Model the untreated change as a function of pre-treatment W.

Allow appropriate heterogeneity and average for the stated population.

## 30. Repeat the original zero-effect income-targeting experiment

Known simulation truth lets us diagnose a misleading comparison.

The original exercise uses 300 people and targets the lowest-income quarter. We make the timing explicit: define the group using baseline income, before the intervention. In the generated model the true policy effect is zero, while the untreated change depends on baseline income. The 75 targeted people consequently have a different untreated change from the other 225.

The actual Stata estimate from regressing the outcome change on the group indicator is -3.223 in constructed outcome units, with robust standard error 0.142. Adding baseline income only in levels to a balanced panel reproduces the same interaction coefficient. Modelling the change as a linear function of baseline income gives -0.027. That last result uses the deliberately correct linear form in this generated experiment. Before treating it as a general solution, inspect whether comparable incomes are observed in both groups.

Constructed data: 300 people; 75 targeted; known effect zero.

Untreated changes vary with the baseline income used for targeting.

A correct linear change model and a defensible comparison are different requirements.

```text
. regress dy group, vce(robust)

------------------------------------------------------------------------------
             |               Robust
          dy | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
       group |  -3.222965   .1420669   -22.69   0.000    -3.502547   -2.943384
       _cons |   2.900887   .1026169    28.27   0.000     2.698941    3.102832
------------------------------------------------------------------------------
```

## 31. Similar-group comparisons need overlap

An estimator cannot create comparison observations absent from the data.

Overlap means that the characteristics represented among the treated also occur among suitable untreated comparison units. If policy assignment is deterministic at the lowest-income-quarter cutoff, no untreated person has an income below that cutoff in this experiment. Conditioning on exact income therefore does not supply both groups at those values.

The nearly zero adjusted coefficient exploits the known linear trend model to extrapolate across this gap. It is not evidence that flexible adjustment has removed the support problem. In an applied Head Start comparison, examine which household characteristics have suitable comparison observations and what population the evidence can support. A narrow income-threshold design would require its own additional assumptions and analysis. An automated estimator cannot create missing comparison observations.

Overlap for treated characteristics requires comparison observations: \(P(G=0\mid W)>0\).

Deterministic income targeting leaves no comparison observations below its cutoff.

A fitted extrapolation should be justified and labelled as such.

## 32. Doubly robust DiD combines two supporting models

Two chances for model correctness retain the design assumptions.

Doubly robust DiD combines a model of the comparison group's untreated change with a model of group membership. The first predicts the change among untreated units given prior characteristics. The second gives a propensity score: the probability of belonging to the treated group given those characteristics. Both help construct the treated group's missing untreated comparison.

Under conditional parallel trends, appropriate timing, overlap and the additional sampling and model-fitting conditions needed for a large-sample approximation, a doubly robust estimate can remain consistent if either supporting model is correctly specified. It does not remain valid when both are wrong or when the design assumptions fail. In the Stata example, a linear model describes untreated changes. The membership model uses a logistic curve, a smooth S-shaped function that keeps probabilities between zero and one. Flexible machine learning can fit more complex relationships, but valid effect inference requires a suitable procedure; prediction cross-validation alone does not supply it. This is the qualified connection to the earlier ridge/lasso section.

Outcome model: \(m_0(W)=E[\Delta Y\mid G=0,W]\).

Propensity score: \(p(W)=P(G=1\mid W)\).

A logistic membership curve stays between zero and one.

Double robustness concerns supporting-model correctness; conditional trends and overlap remain assumptions.

## 33. Read the real-data example from the Overleaf lesson

Identify the sample and the reported target before interpreting ATET.

We now reproduce the real-data command in the original DiD deck. Its filter keeps National Supported Work experimental controls and a Current Population Survey comparison sample, dropping the actual trainees. The variable experimental identifies the data-source group here. Both retained groups are non-trainees, so this is a placebo comparison for a zero training-effect benchmark, not an estimate of Head Start or a training-program effect.

The data contain 16,417 people observed in 1975 and 1978. Their simple difference in earnings changes is 867.51 in the file's dollar units. The installed doubly robust command gives -901.27, with standard error 393.61, using seven pre-period covariates. Its ATET label means average treatment effect on the treated, the same target abbreviation as ATT. These nonzero placebo discrepancies are reasons to scrutinise the comparison, overlap and models. A different estimator is not automatically a more credible design.

Retained sample: NSW experimental controls and CPS comparison observations.

Data-source group membership is not actual training receipt.

ATET and ATT name the same treated-group average target.

```text
. drdid re age educ black married nodegree hisp re74, ///

------------------------------------------------------------------------------
             | Coefficient  Std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
ATET         |
experimental |
   (1 vs 0)  |  -901.2703   393.6127    -2.29   0.022    -1672.737   -129.8037
------------------------------------------------------------------------------
```

## 34. Separate spillovers, treatment versions and anticipation

Use the original SUTVA discussion to define the policy comparison precisely.

The stable unit treatment value assumption, often abbreviated SUTVA, combines two issues: whether one unit's outcome depends on other units' treatment, and whether the intervention being compared is well-defined. In the preschool example, changes in private care prices can affect ineligible families. That is interference, or a spillover, that can change what the comparison group represents.

Different preschool hours or service bundles can also make access mean different interventions. Define the version or policy mix whose effect is wanted; heterogeneous responses to one defined policy are not themselves a violation. Anticipation is a separate timing issue: parents may change job search before expansion begins. Keep these arguments distinct when defending a DiD. A graph or precise standard error does not replace the institutional explanation.

No interference: other units’ exposure does not change this unit’s potential outcome.

Well-defined treatment: specify the preschool access or service bundle being compared.

No anticipation: the baseline outcome is not already affected by the future intervention.

## 35. Cluster inference for repeated units

Errors within a state can remain related after fixed effects.

State fixed effects remove a stable mean component; they do not force the remaining errors in different years to be independent. State-clustered SEs allow general dependence within a state under suitable conditions across states and enough informative clusters for the approximation.

The policy assignment and shared shocks help determine the appropriate clustering unit. Many district-year rows can still contain relatively few independent state-policy changes. Report both the number of observations and the relevant cluster structure. With few clusters, ordinary cluster approximations can be fragile, which should affect the inference strategy rather than be hidden by a large row count.

State fixed effects remove a stable mean component; they do not force the remaining errors in different years to be independent.

The policy assignment and shared shocks help determine the appropriate clustering unit.

## 36. Choose the dependence unit for inference

The number of rows need not equal the number of independent sources.

Imagine a state policy observed for many districts. Districts in one state may share an implementation decision or an economic shock, so their errors need not be independent. Adding districts within that state then adds less independent policy information than adding another independently assigned state.

A cluster is a group within which errors may be related. Cluster-robust inference allows that within-group dependence while relying on suitable independence across clusters and enough informative clusters. The clustering unit should follow the policy assignment and error story; it is not selected to obtain a preferred standard error. For repeated state observations, state clustering is often a candidate, but common national shocks or very few states require additional care. We use repeated-state data in Meeting 14.

Cluster: a group within which errors may be related.

Independent information follows the assignment/error structure, not just the row count.

## 37. Cluster choice

Try the comparison before opening the explanation.

A policy is assigned to states and repeated outcomes are observed for many districts over years. Why is clustering by district alone potentially insufficient?

Rows from districts in one state can share the same policy and shocks. Identify the independent assignment units before choosing the covariance calculation.

**Practice:** A policy is assigned to states and repeated outcomes are observed for many districts over years. Why is clustering by district alone potentially insufficient?

## 38. Cluster choice: explanation

Follow the calculation and interpret its units.

Errors and policy exposure may be shared across districts within a state. Inference should reflect the assignment and dependence structure; state clustering is a starting point when states are independent sampling/assignment clusters. Few states require special care, and a universal cluster-count threshold is not a theorem.

Errors and policy exposure may be shared across districts within a state. Inference should reflect the assignment and dependence structure; state clustering is a starting point when states are independent sampling/assignment clusters. Few states require special care, and a universal cluster-count threshold is not a theorem.

## 39. Interpret a feasible tax difference

Use the fitted contrast and preserve the outcome units.

The lincom output evaluates a 0.10-unit increase in the recorded tax measure in the two-way fixed-effects model. Its coefficient and interval are in fatalities per ten thousand residents. This is a clearer practical comparison than leaving readers to infer what one unit of the tax variable represents.

Explain the within-state adjustment and time effects in the same result sentence or nearby paragraph. Then state the remaining time-varying confounding concern. A panel result can be useful while still requiring this design qualification; the value of the method is that it removes a named stable source of omitted variation.

```text
. lincom .10*beertax

------------------------------------------------------------------------------
    fatality | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
         (1) |   -.063998   .0357078    -1.79   0.080    -.1358329    .0078369
------------------------------------------------------------------------------
```

## 40. Inspect the 1982-to-1988 changes separately

A longer change can use different variation from annual fixed effects.

The regression of state fatality changes on tax changes between 1982 and 1988 gives a slope of -1.041, using 48 state changes. It answers a two-date change comparison. The full fixed-effects fit uses all seven annual observations per state.

Discuss why their estimates need not be equal and which changes each model can remove. A stable state component cancels in both. State-specific changes across the selected interval can remain in the differenced error. A longer interval does not automatically make those changes unrelated to policy, and the covariance calculation should reflect the actual resulting sample.

```text
. regress dy dx, vce(robust)

------------------------------------------------------------------------------
             |               Robust
          dy | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
          dx |  -1.040973   .3550061    -2.93   0.005    -1.755563   -.3263823
       _cons |  -.0720371   .0653552    -1.10   0.276    -.2035903    .0595161
------------------------------------------------------------------------------
```

## 41. DAG practice: pooling is not within-location identification

Trace the routes before choosing a control.

In the incinerator example, common time conditions affect prices while stable location quality affects proximity and prices. Do year indicators close the location route? If proximity never changes, what happens to its level coefficient under unit fixed effects, and what extra comparison could support a DiD question?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** In the incinerator example, common time conditions affect prices while stable location quality affects proximity and prices. Do year indicators close the location route? If proximity never changes, what happens to its level coefficient under unit fixed effects, and what extra comparison could support a DiD question?

## 42. DAG practice: pooling is not within-location identification: explanation

Explain what conditioning changes in this stated graph.

Year indicators do not block \(X\leftarrow C\rightarrow Y\) through stable location quality. Unit fixed effects can cancel an additive stable location component, but they also absorb a proximity indicator that never changes within a unit. Its separate level coefficient is then unavailable.

A proximity-by-post-period interaction can vary across groups and dates. Interpreting that interaction as a DiD effect requires a well-defined intervention and parallel untreated trends, along with the other stated comparison assumptions. Neither pooling nor the causal diagram alone establishes those assumptions.

Year indicators do not block \(X\leftarrow C\rightarrow Y\) through stable location quality. Unit fixed effects can cancel an additive stable location component, but they also absorb a proximity indicator that never changes within a unit. Its separate level coefficient is then unavailable. A proximity-by-post-period interaction can vary across groups and dates. Interpreting that interaction as a DiD effect requires a well-defined intervention and parallel untreated trends, along with the other stated comparison assumptions. Neither pooling nor the causal diagram alone establishes those assumptions.

## 43. Distinguish within-state and endpoint comparisons

Reproduce the evidence, then explain its economic meaning.

Run lab_13.do using panel.csv. Compare the pooled and fixed-effects beer-tax slopes. Translate a ten-cent tax difference under the fixed-effects fit. Then compare the endpoint first-difference result and explain why it need not equal the seven-year fixed-effects estimate.

Change the endpoint first-difference comparison to 1983 and 1988. Use the same 48 states, calculate the differences yourself and compare the slope with the original endpoint window. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Change the endpoint first-difference comparison to 1983 and 1988. Use the same 48 states, calculate the differences yourself and compare the slope with the original endpoint window. Keep your commands, log, output and interpretation.

## 44. Distinguish within-state and endpoint comparisons: explanation

A reproducible result needs both a calculation and an interpretation.

The pooled slope with year controls is 0.366336; the state fixed-effects slope with year controls is -0.639980. A 0.10-dollar tax contrast in the latter fit gives -0.063998 fatalities per 10,000 residents. Its uncertainty uses state clusters, reflecting repeated observations within 48 states.

The 1982-to-1988 first-difference slope is -1.040973. That fit uses only two endpoints; the seven-year fixed-effects fit uses all within-state changes in its specified sample. The familiar equivalence between first differences and fixed effects concerns compatible two-period models, rather than these different samples. Both methods remove stable state components, while changing state-level confounding can remain.

The 1983-to-1988 slope is -0.845389 with robust SE 0.332000 across 48 states. Changing the endpoints changes the dated comparison; it is neither a replication failure nor proof that one window identifies a causal tax effect.

State FE slope: \(-0.639980\); 1982–1988 endpoint slope: \(-1.040973\).

1983–1988 endpoint slope: \(-0.845389\), robust SE \(0.332000\).

A changed endpoint window changes the dated comparison.

## 45. From panel comparisons to instrumental variation

From panel comparisons to instrumental variation

Panel methods removed a stable unit component, and the DiD discussion made assumptions about missing untreated changes explicit. Neither method automatically removes a time-varying cause of both the regressor and the outcome.

We now ask whether an instrument can provide useful regressor variation. It must predict the endogenous input and support an exclusion and exogeneity argument. A convincing first stage supplies only the first part of that case.

From panel comparisons to instrumental variation

## 46. Do higher cigarette prices reduce sales?

Price is chosen in a market, so its variation may be endogenous.

A state with high cigarette prices may also have strong anti-smoking attitudes or other policies affecting sales. A negative price–quantity association can therefore combine a demand response with differences in those omitted determinants. We want to isolate the price response in a stated demand equation rather than assign a causal meaning to every observed price difference.

Instrumental variables, abbreviated IV, uses a proposed outside source of regressor variation under explicit relevance and validity assumptions. Here that proposed source is a sales-tax component in the historical 48-state sample. We first define the outcome, price and tax units, then ask whether the tax predicts price and whether it has other relationships with demand. Finally we reconstruct the estimate from those relationships before interpreting its uncertainty and population meaning.

Question: isolate a demand response from other state differences.

IV: instrumental variables; the proposed source of price variation needs its own argument.

## 47. Define the demand equation and its units

A log price slope is an elasticity under the model.

Let log Q be log cigarette packs sold per person and log P the log real price. The structural equation represents the demand relationship we want to learn. Its price coefficient is an elasticity if that structural interpretation is justified: the proportional quantity response to a small proportional price change.

The error includes omitted demand influences. If price responds to those influences, price is endogenous in the demand equation. The observed OLS slope can then differ from the demand elasticity. Calling an equation structural means it is intended to represent an economic relationship with a specified intervention interpretation; writing that label does not establish identification.

The consumer price index converts the source money prices to a common price scale. This file records its index with a base of one, rather than 100. We therefore divide nominal cents per pack by that recorded index before taking logs. An equivalent base-100 index would be divided by 100 first, just as in the earlier deflation example. Changing a common index base changes a log-price intercept, not the elasticity.

\(\log Q_i=\alpha+\beta\log P_i+u_i\)

Source deflator has base one: real cents per pack equal nominal cents divided by the recorded price index.

## 48. Relevance is the first instrument requirement

The instrument must move the endogenous regressor.

An instrument is a proposed source of regressor variation used to identify the target effect under additional assumptions. In the cigarette example, Z is a sales-tax component measured in real cents per pack; X is log price and Y log quantity. The first stage is the regression describing how log price varies with that tax component and any included exogenous controls.

Relevance means that Z predicts X after those controls: its population first-stage slope is nonzero. The notation pi zero is the intercept, pi one the tax slope and v the first-stage remainder. The first stage gives the scale of price variation associated with the instrument. It does not establish that tax differences are independent of omitted smoking demand or that taxes affect quantity only through the specified price measure. Those are the next requirements.

First stage: \(X=\pi_0+\pi_1Z+v\)

Relevance: \(\pi_1\ne0\)

\(Z\): real cents per pack; \(X=\log P\)

## 49. Exogeneity and exclusion justify the comparison

A strong first stage does not establish either condition.

Instrument exogeneity rules out a relationship between the instrument and the omitted structural demand determinants under the model. Tax differences linked to unobserved smoking attitudes would threaten it. Exclusion says that an intervention changing the instrument reaches quantity only through the specified price channel. For example, a tax-linked information campaign could add a direct demand channel and violate exclusion.

These restrictions do different jobs. In the DAG, the intended directed route runs from tax to price to quantity. A direct tax-to-quantity arrow violates exclusion; a common cause of tax and omitted demand threatens exogeneity. Together with relevance and an appropriate structural equation, the assumptions can justify the IV moment condition, zero covariance between Z and the structural error u. A strong first-stage relationship verifies neither substantive restriction.

Exogeneity: no instrument relationship with omitted structural demand causes.

Exclusion: no causal instrument-to-quantity channel bypassing price.

Required IV moment: \(\operatorname{Cov}(Z,u)=0\)

## 50. Derive the simple IV ratio

Compare how the instrument moves the outcome and the regressor.

Start with the constant-slope structural equation Y equal to alpha plus beta times X plus u. The first stage describes how X changes with Z. The reduced form is the relationship of Y directly to Z, using the same controls and observations. If the instrument changes X by pi one units per Z unit and has no other outcome channel, its outcome relationship is beta times pi one.

Thus the reduced-form slope rho equals beta times the first-stage slope pi one under the IV assumptions. Divide to recover beta when pi one is nonzero. In a sample, the simple just-identified IV estimate is the ratio of the two estimated slopes after matching their controls and sample. The units cancel: outcome per tax unit divided by log-price per tax unit becomes outcome per log-price unit. For log quantity and log price, that coefficient is an elasticity.

First stage: \(X=\pi_0+\pi_1Z+v\)

Reduced form: \(Y=c+\rho Z+\eta,\quad\rho=\beta\pi_1\)

\(\widehat\beta_{IV}=\widehat\rho/\widehat\pi_1\)

## 51. Wald ratio

Try the comparison before opening the explanation.

A proposed instrument increases treatment by 0.30 units; its reduced-form outcome coefficient is −0.09. Compute the simple IV ratio and name the conditions behind a causal interpretation.

Use the constant-slope model just derived. Divide the outcome-per-instrument slope by the treatment-per-instrument slope and track the canceled units.

**Practice:** A proposed instrument increases treatment by 0.30 units; its reduced-form outcome coefficient is −0.09. Compute the simple IV ratio and name the conditions behind a causal interpretation.

## 52. Wald ratio: explanation

Follow the calculation and interpret its units.

The ratio is −0.09 divided by 0.30, or −0.30 outcome units per treatment unit. Under the constant-slope structural model, relevance, instrument exogeneity and exclusion justify the causal interpretation. The reduced-form and first-stage regressions must use compatible controls and observations. A strong first stage alone does not establish instrument validity.

The ratio is −0.09 divided by 0.30, or −0.30 outcome units per treatment unit. Under the constant-slope structural model, relevance, instrument exogeneity and exclusion justify the causal interpretation. The reduced-form and first-stage regressions must use compatible controls and observations. A strong first stage alone does not establish instrument validity.

## 53. Inspect the OLS demand comparison first

It is a useful benchmark, not the target by default.

The OLS price coefficient is -1.213, with robust SE 0.195. It is a negative fitted association in log sales and log price. Its direction alone does not show that market price variation identifies demand.

The benchmark helps communicate how the IV comparison differs. Do not select OLS or IV simply by which estimate is larger, smaller or more significant. Explain which source of variation each uses and which assumptions support it. Both can be invalid if their separate identifying requirements are not credible.

```text
. regress logq logp, vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
        logp |  -1.213057   .1945896    -6.23   0.000    -1.604746   -.8213685
       _cons |   10.33892   .9348202    11.06   0.000     8.457229    12.22062
------------------------------------------------------------------------------
```

## 54. Read the actual first stage

State the instrument units as recorded in the data.

The first-stage sales-tax coefficient is 0.03073. The data construct the tax as the difference between recorded total and cigarette-specific taxes, deflated by the price index. The recorded price and tax series retain their source currency scale; deflating does not by itself convert cents into dollars.

The coefficient describes the fitted log-price change for one unit of that recorded real-tax measure. For the IV ratio, consistently using the same instrument scaling leaves the price elasticity unchanged because the scaling cancels in numerator and denominator. Still label the first-stage units correctly when interpreting it on its own.

```text
. regress logp salestax, vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logp | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
    salestax |   .0307289   .0048354     6.35   0.000     .0209956    .0404621
       _cons |   4.616546   .0289177   159.64   0.000     4.558338    4.674755
------------------------------------------------------------------------------
```

## 55. Read the reduced form using the same controls and sample

Its scale is quantity change per instrument unit.

The reduced-form coefficient on the tax measure is -0.03330. It describes how log sales vary with the proposed instrument. Dividing it by the first-stage coefficient yields about -1.084, the simple IV price coefficient.

The reduced form is informative about the policy–outcome relation, but interpreting that relation as a price mechanism requires exclusion and the other IV assumptions. If tax affects sales through another route, the ratio mixes that route with the price effect. The two component regressions therefore help explain the empirical strategy without proving its validity.

```text
. regress logq salestax, vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
    salestax |  -.0332974   .0102541    -3.25   0.002    -.0539378    -.012657
       _cons |   4.717449   .0650586    72.51   0.000     4.586493    4.848405
------------------------------------------------------------------------------
```

## 56. What the two stages actually fit

Use the instrument-predicted part of price, with a dedicated IV variance calculation.

Let C denote the included exogenous controls, and gamma their coefficients. If there are several controls, gamma times C stands for their coefficient-weighted sum. In the first stage, predict each state's log price from the tax instrument and all included exogenous controls. The fitted price is the part explained by those columns. Two-stage least squares, abbreviated 2SLS, then uses that fitted-price variation and the controls to obtain the structural coefficient. With one excluded instrument and one endogenous regressor, it gives the same coefficient as the reduced-form ratio.

The uncertainty calculation must use the structural residual: actual Y minus the intercept, controls and beta times actual X. An ordinary second-stage regression instead forms residuals using fitted X. These are different residuals, so its usual OLS standard errors are not the proper IV standard errors. Use a dedicated IV estimator with a covariance option justified for the sampling and error structure. The two stages explain the coefficient; they do not license the naive variance formula.

\(C\): included exogenous controls; \(\gamma C\): their coefficient-weighted sum.

First stage: \(\widehat X=\widehat E_{linear}(X\mid Z,C)\)

Structural residual: \(\widehat u=Y-\widehat\alpha-\widehat\beta X-\widehat\gamma C\)

2SLS uses instrument-predicted variation; IV inference uses the structural model.

## 57. Use the dedicated IV estimator for uncertainty

Manual fitted-regressor OLS is not enough for valid IV SEs.

Two-stage least squares, 2SLS, first extracts regressor variation predicted by the instruments and included exogenous controls, then uses that variation to calculate the structural coefficients. A manual second-stage OLS regression on fitted price can reproduce the coefficient under the matching setup.

Its ordinary SE formula does not provide the appropriate IV covariance calculation. Use a dedicated estimator such as ivregress 2sls with a justified covariance option. The command recognises the structural residual and the generated-regressor calculation. This distinction separates a helpful coefficient demonstration from a valid inferential procedure.

\(\texttt{ivregress 2sls logq (logp = salestax), vce(robust)}\)

## 58. Two-stage least squares projects regressors onto the instrument space

The instrument matrix includes the exogenous controls and the excluded instruments.

Let X contain the endogenous regressor, the exogenous controls and the intercept in the outcome equation. Let Z contain the exogenous controls, the intercept and the excluded instruments. The projection matrix P sub Z maps each column of X to its fitted values from its regression on Z. Two-stage least squares uses those fitted regressor columns to estimate the outcome coefficients.

The matrix expression is X prime P sub Z X inverse times X prime P sub Z y, when the required rank condition holds. Orthogonality of instruments to the structural error supplies the identifying moments; rank supplies sufficient instrument-predicted variation. The second-stage numerical coefficient identity does not justify ordinary OLS standard errors computed as though the first-stage fits were fixed observed regressors. Use the dedicated IV covariance estimator.

\(P_Z=Z(Z\prime Z)^{-1}Z\prime\); \(\widehat X=P_ZX\).

\(\widehat\beta_{2SLS}=(X\prime P_ZX)^{-1}X\prime P_Zy\).

Population moments: \(E[z_iu_i]=0\), with the required rank condition.

## 59. Two stages and uncertainty

Try the comparison before opening the explanation.

Why not report ordinary OLS standard errors from regressing y on first-stage fitted x?

Compare actual X with first-stage fitted X in the residual. The variance calculation must correspond to the structural estimating problem.

**Practice:** Why not report ordinary OLS standard errors from regressing y on first-stage fitted x?

## 60. Two stages and uncertainty: explanation

Follow the calculation and interpret its units.

The second-stage fitted regressor is generated, and the relevant structural residual and variance calculation differ from the naive second-stage OLS calculation. Use a proper IV estimator such as ivregress 2sls with a justified covariance option.

The second-stage fitted regressor is generated, and the relevant structural residual and variance calculation differ from the naive second-stage OLS calculation. Use a proper IV estimator such as ivregress 2sls with a justified covariance option.

## 61. Compare the actual IV coefficient with its ratio

The do-file verifies equality before rounding.

The IV price coefficient is -1.084, with robust SE 0.312. The dedicated estimator matches the reduced-form divided by first-stage ratio, and the do-file checks the difference numerically before any rounded display.

The IV estimate has more sampling uncertainty than the OLS benchmark here. That is not an automatic reason to prefer OLS if OLS uses endogenous price variation. The relevant question is whether the proposed instrument provides a credible, informative comparison for the economic target. A precise biased benchmark does not remove the need to evaluate the instrument.

```text
. ivregress 2sls logq (logp=salestax), vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
        logp |  -1.083587   .3122036    -3.47   0.001    -1.695495    -.471679
       _cons |   9.719877   1.496143     6.50   0.000      6.78749    12.65226
------------------------------------------------------------------------------
```

## 62. Included exogenous controls belong in the IV specification

They help define the same conditional comparison in both stages.

Adding real income to the stated IV model gives a price coefficient of -1.143. The included exogenous control enters the instrumented-regressor prediction and the structural specification through the 2SLS setup. Using incompatible controls in hand-built stages can change the intended comparison.

The income adjustment can help with some observed demand differences but does not prove instrument exogeneity. Explain its timing and why it is a suitable included control. The instrument must still supply price variation related to the outcome only through the permitted model channels under the identifying assumptions.

```text
. ivregress 2sls logq logincome (logp=salestax), vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
        logp |  -1.143375   .3604805    -3.17   0.002    -1.849904   -.4368463
   logincome |   .2145153   .3018477     0.71   0.477    -.3770953    .8061258
       _cons |   9.430658   1.219402     7.73   0.000     7.040675    11.82064
------------------------------------------------------------------------------
```

## 63. Hold income fixed in both supporting IV regressions

Compatible controls and observations make the controlled ratio meaningful.

Income is a plausible determinant of cigarette demand and can also be related to taxes and prices. Suppose real income is included as an exogenous control under our stated model. It belongs in the price first stage, the quantity reduced form and the structural demand equation. Each regression must use the same 48 states.

After controlling for log real income, the tax-to-log-price slope is 0.027395 and the tax-to-log-quantity slope is -0.031323. Their ratio is -1.143375, matching the dedicated two-stage least-squares estimate. It remains a price elasticity under the log-log model and instrument conditions. Adding income changes the comparison; it does not demonstrate that all tax-related demand determinants have been removed. The do-file prints both stages and verifies the identity before reporting IV uncertainty.

Use the same exogenous income control and 48 states in every supporting equation.

Controlled ratio: \(\widehat\beta=\widehat r_Z/\widehat\pi_Z\).

Read the dedicated IV result for its uncertainty.

```text
. ivregress 2sls logq logincome (logp=salestax), vce(robust)

------------------------------------------------------------------------------
             |               Robust
        logq | Coefficient  std. err.      z    P>|z|     [95% conf. interval]
-------------+----------------------------------------------------------------
        logp |  -1.143375   .3604805    -3.17   0.002    -1.849904   -.4368463
   logincome |   .2145153   .3018477     0.71   0.477    -.3770953    .8061258
       _cons |   9.430658   1.219402     7.73   0.000     7.040675    11.82064
------------------------------------------------------------------------------
```

## 64. School availability illustrates the exclusion question

A plausible first stage can still leave another route to the outcome.

Suppose nearby single-sex school availability predicts attendance at that school type, and the outcome is a student's score. Relevance asks whether availability actually moves attendance. Exclusion asks whether availability affects scores only through the attendance measure in the equation.

Residential choice, local resources or school competition may create other relationships. Family preferences can also relate availability to unobserved motivation. Discuss these mechanisms explicitly instead of treating geographical proximity as automatically random. A useful IV proposal identifies the potential violation and explains what institutional evidence or controls could make the assumption more credible.

Suppose nearby single-sex school availability predicts attendance at that school type, and the outcome is a student's score.

Residential choice, local resources or school competition may create other relationships.

## 65. Unexpected first-stage sign

Try the comparison before opening the explanation.

School availability predicts less attendance at the intended school type. Is a negative first-stage coefficient alone proof that IV is invalid?

In this separate school-attendance example, relevance asks for a nonzero slope. Investigate an unexpected sign without confusing it with a test of exclusion.

**Practice:** School availability predicts less attendance at the intended school type. Is a negative first-stage coefficient alone proof that IV is invalid?

## 66. Unexpected first-stage sign: explanation

Follow the calculation and interpret its units.

No. Relevance requires a nonzero first stage, not a prescribed positive sign. An unexpected sign should prompt checks of coding, selection, theory and strength. It does not by itself prove or disprove exclusion or exogeneity.

No. Relevance requires a nonzero first stage, not a prescribed positive sign. An unexpected sign should prompt checks of coding, selection, theory and strength. It does not by itself prove or disprove exclusion or exogeneity.

## 67. Whose treatment changes when encouragement changes?

A binary encouragement example introduces the treatment-response groups.

For a separate constructed example, randomly assign an offer of a training place. Z is the zero-or-one offer and D is zero-or-one attendance. A complier attends if offered but does not attend without the offer. An always-taker attends either way; a never-taker attends neither way. A defier would attend only without the offer.

Monotonicity rules out defiers for this direction of encouragement: the offer cannot make anyone less likely to attend in the individual potential-attendance comparison. It does not require everyone to attend or every effect to be positive. Suppose the offer raises attendance from 0.30 to 0.60 and raises average scores by 0.90 points. We next explain whose causal effect the ratio three can represent under the additional assumptions.

Compliers: attend only if offered. Always-takers/never-takers: unchanged attendance.

Monotonicity: the offer does not reduce any individual’s attendance.

Constructed ratio: \(0.90/(0.60-0.30)=3\) score points.

## 68. With heterogeneous effects, say whose response IV identifies

A constant coefficient can hide a local treatment comparison.

Heterogeneous effects are effects that differ across individuals. In the binary offer-and-attendance example, assume random offer assignment, relevance, exclusion of a direct offer effect, consistency, no relevant spillovers and monotonicity. The attendance difference then gives the fraction of compliers. Always-takers and never-takers do not change attendance, so their treatment status does not generate the offer's outcome difference under exclusion.

Dividing the outcome difference by the attendance difference identifies the compliers' average treatment effect: the local average treatment effect, abbreviated LATE. The constructed ratio is three score points for that group. It is not automatically the average effect for everyone. This binary interpretation does not transfer unchanged to the continuous cigarette-price application; there the interpretation depends on its structural slope and heterogeneity assumptions. State the relevant population rather than calling every IV coefficient a universal effect.

LATE: average treatment effect for compliers under the binary-IV assumptions.

An IV population is determined by the instrument and the maintained model.

## 69. Weak instruments make the ratio fragile

A near-zero first stage magnifies uncertainty.

An instrument is weak when the first stage supplies little information about the endogenous regressor after controls. A ratio with a denominator near zero becomes sensitive to small estimation changes. For illustration, dividing minus 0.09 by 0.30 gives minus 0.30. If both population relationships are ten times smaller, sampling changes of 0.02 in the first-stage slope can move a denominator of 0.03 to 0.01 or 0.05, giving very different ratios.

In such cases, the usual normal approximation for IV can be poor and conventional intervals misleading. A first-stage F statistic can be informative about strength in a specified setting, but a universal cutoff is not a theorem and strong prediction does not establish exclusion. Evaluate strength using diagnostics and inference suited to the actual number of instruments, covariance structure and target.

Weak first stage → denominator uncertainty can dominate the ratio.

Strength and validity are different requirements.

```text
. estat firststage

  First-stage regression summary statistics
  --------------------------------------------------------------------------
               |            Adjusted      Partial       Robust
      Variable |   R-sq.       R-sq.        R-sq.       F(1,45)   Prob > F
  -------------+------------------------------------------------------------
          logp |  0.6389      0.6228       0.5009       44.7305    0.0000
  --------------------------------------------------------------------------
```

## 70. The simple IV precision formula shows the cost of a weak first stage

A formula under strong-instrument asymptotics is not a cure for weak identification.

In the single-endogenous-regressor, single-instrument model with an intercept, iid observations and homoskedastic structural errors, the usual large-sample IV variance can be written as sigma squared divided by centred X variation times the first-stage R squared. Here sigma squared is the structural error variance and the first-stage R squared measures instrument-predicted X variation in that simple model.

When the first stage explains little variation, the denominator is small and ordinary ratio-based inference becomes fragile. This formula assumes the regular strong-identification approximation; it should not be used to declare standard Wald inference reliable in a weak-instrument design. With controls, use the appropriate partial first-stage variation and a dedicated procedure. The earlier weak-robust coefficient test addresses inference under specified instrument validity, not exclusion itself.

Simple homoskedastic strong-IV approximation: \(\operatorname{Var}(\widehat\beta_{IV})\approx\sigma_u^2/[SST_X R_{X,Z}^2]\).

Instrument validity, first-stage strength and the validity of an inference approximation are distinct.

## 71. A weak-instrument-robust test asks a stated coefficient question

Protecting inference from a weak first stage does not validate the instrument.

An ordinary IV interval can be unreliable when the instrument barely shifts the endogenous regressor. A weak-instrument-robust test is designed to remain valid for its coefficient null without assuming that first-stage relevance is strong, while retaining the other identification and sampling requirements.

The Anderson–Rubin idea can be seen by proposing a price elasticity of minus one. Under that null, move minus one times log price out of the quantity equation. A valid excluded instrument should not predict the remaining adjusted outcome after the included controls. Our model has one excluded instrument for one endogenous regressor; this is called just identified. Stata performs the appropriate test. Its p-value is about 0.691, so this test does not reject an elasticity of minus one. This is not evidence that exclusion holds or that the null is true. Weak-robust inference and instrument validity address different questions.

For a proposed \(\beta_0=-1\), consider \(\log Q-\beta_0\log P=\log Q+\log P\).

Anderson–Rubin: test the instrument restriction under the proposed coefficient.

Validity still requires exogeneity, exclusion and justified sampling/inference conditions.

```text
. estat weakrobust, betanull(-1)

Test robust to weak instruments
Model VCE: Robust

 ( 1)  logp = -1

Anderson–Rubin chi2(1) =   0.16
           Prob > chi2 = 0.6914

Note: Anderson–Rubin test reported by
      default because model is just
      identified.
```

## 72. A larger instrument set adds assumptions as well as information

More instruments are not automatically a better design.

An excluded instrument appears in the first stage but is excluded from the structural outcome equation except through the endogenous regressors. A model is overidentified when there are more such instruments than endogenous regressors. Extra instruments can supply additional variation, but each needs a substantive validity argument and may be weak.

An overidentification test checks whether the instrument moment restrictions are mutually compatible with the maintained model. A nonrejection does not prove every instrument valid: the test can have little power, meaning a low probability of detecting a particular violation. Some violations can also be shared across instruments. Keep the present one-instrument application transparent, and explain the distinct economic argument for any proposed additional instrument before using a larger set.

Overidentified: more excluded instruments than endogenous regressors.

A compatibility test cannot certify all substantive instrument assumptions.

## 73. Instrument scaling does not change the simple ratio

Consistent numerator and denominator transformations cancel.

If an instrument is multiplied by one hundred, its first-stage and reduced-form slopes are each divided by one hundred. Their ratio is unchanged in the matching simple IV model. This is a useful numerical check when two data sources report a tax in different units.

Scaling does not solve a weak or invalid instrument. It changes labels and coefficient magnitudes in component regressions, not the underlying source of variation. Keep those units explicit so that an apparently huge or tiny first-stage coefficient is not mistaken for evidence about strength or economic importance.

\(\dfrac{\widehat\rho/c}{\widehat\pi_1/c}=\dfrac{\widehat\rho}{\widehat\pi_1}\) for nonzero \(c\)

## 74. Write the IV argument as a chain of evidence

Separate relevance, exclusion, estimation and inference.

Begin with the endogenous comparison and the omitted forces that threaten OLS. Explain how the instrument changes the regressor, why another direct outcome route is ruled out and why the instrument is not tied to the structural error. Then show the first stage, reduced form and IV result with units and uncertainty.

This sequence helps a policy reader assess the strategy rather than treat 2SLS as a label for causality. State what remains uncertain about the instrument. An honest limitation can identify the next useful source of institutional evidence or data, even if the current estimate is statistically precise.

Begin with the endogenous comparison and the omitted forces that threaten OLS.

This sequence helps a policy reader assess the strategy rather than treat 2SLS as a label for causality.

## 75. How sensitive is IV to an excluded tax channel?

Treat an assumed exclusion violation as a sensitivity scenario, not an estimate.

The IV DAG rules out a direct tax-to-quantity route that bypasses price. For a sensitivity exercise, let gamma be the quantity-equation slope of that extra tax channel. Let pi be the controlled tax-to-log-price slope and r the controlled reduced-form quantity slope. Under this additive extension, the reduced form combines beta times pi with gamma.

If gamma is zero, division gives the original controlled elasticity, about -1.143. If we instead assume gamma is 0.005 log-quantity units per real cent of tax, subtract that channel before dividing, giving about -1.326. Move the control to compare such assumptions. Gamma is not estimated by this calculation. The graph shows how a direct channel would change the interpretation while leaving the first stage strong; it does not cover every possible threat to instrument exogeneity.

Extended reduced form: \(r=\beta\pi+\gamma\).

Assumption-based sensitivity: \(\beta(\gamma)=(r-\gamma)/\pi\).

The direct-channel value is assumed; the supporting regression slopes are actual estimates.

**Practice:** Is the direct-channel value gamma estimated by this exercise?

**Explanation:** No. It is an explicitly assumed sensitivity value.

## 76. DAG practice: challenge exclusion with one extra arrow

Trace the routes before choosing a control.

The tax instrument predicts cigarette price. Add a direct tax-to-quantity arrow that bypasses price. Could the first stage stay strong? Why would dividing the reduced form by the first stage then fail to isolate the intended price elasticity?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** The tax instrument predicts cigarette price. Add a direct tax-to-quantity arrow that bypasses price. Could the first stage stay strong? Why would dividing the reduced form by the first stage then fail to isolate the intended price elasticity?

## 77. DAG practice: challenge exclusion with one extra arrow: explanation

Explain what conditioning changes in this stated graph.

The first stage can remain strong because the tax-to-price arrow has not disappeared. Relevance does not rule out a second route from the instrument to quantity that bypasses price.

The reduced-form instrument association would combine the price channel and that additional direct channel. Dividing by the first stage no longer isolates the price response under the original exclusion argument. Use the graph to name a concrete institutional threat and assess it separately from the numerical strength of the first stage.

The first stage can remain strong because the tax-to-price arrow has not disappeared. Relevance does not rule out a second route from the instrument to quantity that bypasses price. The reduced-form instrument association would combine the price channel and that additional direct channel. Dividing by the first stage no longer isolates the price response under the original exclusion argument. Use the graph to name a concrete institutional threat and assess it separately from the numerical strength of the first stage.

## 78. Reconstruct IV and assess the instrument separately

Reproduce the evidence, then explain its economic meaning.

Run lab_14.do using cigarettes.csv. Divide the reduced-form tax slope by the first-stage price slope and compare the ratio with ivregress. Explain the coefficient in elasticity units. Then name one concrete exclusion threat that a strong first stage cannot rule out.

Add log real income to the first stage, reduced form and IV equation, using the same 48 states. Verify the controlled ratio and compare the elasticity with the original no-income result. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Add log real income to the first stage, reduced form and IV equation, using the same 48 states. Verify the controlled ratio and compare the elasticity with the original no-income result. Keep your commands, log, output and interpretation.

## 79. Reconstruct IV and assess the instrument separately: explanation

A reproducible result needs both a calculation and an interpretation.

The reduced-form slope is -0.033297 and the first-stage slope is 0.030729. Their ratio is -1.083587, matching the simple IV price coefficient. In this log–log specification it is an elasticity: a small one-percent price increase corresponds to roughly 1.08 percent lower quantity under the model and identifying assumptions.

The ratio uses the same observations, instrument and controls in both supporting regressions. The first stage addresses relevance. Tax policy could still be associated with smoking attitudes or other tobacco policies, or affect consumption through other price channels. Those are substantive exogeneity or exclusion threats. Report the dedicated IV estimator's uncertainty rather than ordinary second-stage OLS SEs.

The controlled ratio and dedicated IV estimate are both -1.143375, with dedicated robust SE 0.360481. The compatible first-stage and reduced-form slopes are 0.027395 and -0.031323. Income adjustment does not establish exclusion.

Original IV elasticity: \(-1.083587\).

Income-controlled IV: \(-1.143375\), robust SE \(0.360481\).

Both stages need the same controls and states; exclusion remains a substantive argument.

## 80. Next, change the outcome from a level to a probability

A binary response requires a different interpretation of the fitted function.

The instrument lesson connected an outcome contrast to variation justified by a substantive assignment argument. We separated relevance, exogeneity and exclusion, reconstructed the simple ratio and explained why a dedicated estimator is needed for uncertainty. These distinctions remain useful when the outcome is a zero-or-one event.

Next we study whether a mortgage application is denied. A straight-line prediction can leave the zero-to-one probability range, while a bounded curve changes how coefficients translate into probabilities. We will build those functions from a numerical index example before interpreting them. Changing the outcome scale alters the model and reported magnitude; a causal comparison still requires the intervention and identification argument.

Next outcome: a zero-or-one event.

Compare models on the probability scale after defining their functions.

