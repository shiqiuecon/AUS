# 13. Panel comparisons and policy evaluation with DiD

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

## 06. A two-period athlete example uses the same algebra

State what disappears and what the comparison still needs.

Apply the same subtraction to a student rather than a state. GPA means grade point average, a numerical summary of course grades. The regressor season equals one when the student's sport is in season and zero otherwise. Suppose a stable student component captures lasting preparation, while a semester effect captures a common change across students.

Subtract the student's first-semester equation from the second. The stable preparation component cancels. A semester change remains, as does any change in unobserved study conditions. The coefficient uses students whose season indicator changes. If course difficulty or study time changes with the sports season, that time-varying factor can still confound the comparison. Differencing removes the stable additive component, not every reason that participation and grades might move together.

\(GPA_{it}=\beta\,season_{it}+\alpha_i+\lambda_t+u_{it}\)

\(\Delta GPA_i=\beta\Delta season_i+\Delta\lambda+\Delta u_i\)

GPA: grade point average; season: a zero-or-one indicator.

## 07. First differences

Try the comparison before opening the explanation.

In \(GPA_{it}=\beta\,season_{it}+\alpha_i+\lambda_t+u_{it}\) for two semesters, write the differenced equation and say what disappears.

GPA is the student’s grade point average. Subtract the same student’s first-semester equation from the second; keep the common semester change.

**Practice:** In \(GPA_{it}=\beta\,season_{it}+\alpha_i+\lambda_t+u_{it}\) for two semesters, write the differenced equation and say what disappears.

## 08. First differences: explanation

Follow the calculation and interpret its units.

\(\Delta GPA_i=\beta\Delta season_i+\Delta\lambda+\Delta u_i\). The time-invariant \(\alpha_i\) disappears, as do coefficients on time-invariant regressors. Semester effects do not disappear; with two periods they become a common intercept. Time-varying confounding can remain.

\(\Delta GPA_i=\beta\Delta season_i+\Delta\lambda+\Delta u_i\). The time-invariant \(\alpha_i\) disappears, as do coefficients on time-invariant regressors. Semester effects do not disappear; with two periods they become a common intercept. Time-varying confounding can remain.

## 09. Demeaning uses each unit’s own average

Fixed effects remove the same stable component over several periods.

Demeaning means subtracting a unit's own time average from each of its observations. For the constructed unit, X values two and four have average three, giving demeaned values minus one and plus one. Y values ten and fourteen have average twelve, giving minus two and plus two. The within-unit slope is therefore two in this simple example.

A stable additive component equals its own time average, so it disappears in this subtraction. With several dates, the transformation uses every available date for that unit rather than just two endpoints. Common year effects must also be accounted for in the transformed equation. Fixed-effects estimation performs this calculation to estimate the slope from within-unit variation; it does not make a changing omitted cause disappear or establish that the remaining regressor changes are exogenous.

\(X_i=(2,4)\Rightarrow X_i-\overline X_i=(-1,1)\)

\(Y_i=(10,14)\Rightarrow Y_i-\overline Y_i=(-2,2)\)

\(Y_{it}-\overline Y_i=\beta(X_{it}-\overline X_i)+(\lambda_t-\overline\lambda)+(u_{it}-\overline u_i)\)

## 10. Two-period fixed effects and first differences share a slope identity

The identity requires the same two-period sample and specification.

With two observations per unit, demeaning produces one half of the change and its negative. OLS on these within deviations therefore gives the same slope as the first-difference regression with compatible time terms. This is a calculation identity, not a statement that every panel specification must agree.

Our application compares a two-period change from 1982 to 1988 with a fixed-effects fit using all seven years. Those are different samples of time variation, so their coefficients can differ. Do not interpret that difference as a failure of the two-period identity. Align the sample, regressors and covariance treatment before making a numerical comparison.

With two observations per unit, demeaning produces one half of the change and its negative.

Our application compares a two-period change from 1982 to 1988 with a fixed-effects fit using all seven years.

## 11. Read pooled and within-state associations

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

## 12. Use year effects for common shocks

They do not remove state-specific changes.

A year effect permits a common intercept change for every state in the same year. It can absorb a nationwide shift represented by that common component. State effects instead absorb stable additive differences between states. Including both asks which tax changes remain beyond each state's stable level and the common year shifts.

The separate housing diagram illustrates the limit of common time controls. Nearness to an incinerator can be associated with stable location quality, which also affects house prices. Conditioning on common time conditions does not close that location route. Removing a stable additive location component uses a different comparison, and its causal interpretation still requires assumptions about changing local factors. An algebraic subtraction does not literally erase a causal arrow from the world.

Year effects: common date shifts. State effects: stable additive state differences.

A location common cause is not removed by a common calendar control.

## 13. State the fixed-effects exogeneity condition

Transforming variables does not make their remaining changes random.

A common sufficient mean assumption is that the error at each date averages to zero given the unit's full regressor history and its stable effect. This is a strict-exogeneity condition for the panel model. It rules out, for example, an unobserved current fatality shock that drives future tax changes in a way incompatible with the restriction.

First-difference OLS instead needs its differenced regressor to have the required lack of relation with the differenced error. These assumptions should be discussed in the application's timing and policy context. A transformation removes the stable component algebraically; the remaining exogeneity is a substantive claim.

\(E(u_{it}\mid X_{i1},\ldots,X_{iT},\alpha_i)=0\) as a sufficient panel condition

## 14. Build a difference-in-differences comparison

Begin with the Head Start policy question from the original DiD lesson.

Can expanded preschool access allow mothers to take paid work? This is the Head Start policy question in our earlier DiD lesson. Preschool may relax child-care constraints, but mothers can use the released time for work, care or other activities. Economic reasoning motivates a response to measure; it does not determine its size in advance.

For a two-period teaching design, define a group eligible before the expansion and a comparison group not eligible. Observe maternal employment before and after the specified expansion. A difference-in-differences comparison subtracts the comparison group's change from the eligible group's change. The related reading studies Head Start expansions and experimental access, but our simple two-group diagram is a teaching model, not a replication of that paper's full research design.

Policy question: preschool access and maternal employment.

Define eligibility before the expansion, the comparison population and the two dates.

Reading: Wikle and Wilson (2023), Access to Head Start and Maternal Labor Supply.

## 15. Preschool access changes a household’s feasible choices

Released care time can support paid work or another activity.

The diagram adapts the time-allocation illustration in the original Head Start slides. The horizontal axis records home and other non-market time, and the vertical axis paid-work time. In the schematic example, three hours are initially available after required child care. Point E one allocates one hour to other activities and two to paid work.

Suppose preschool releases three more hours. One possible choice, E two, keeps other time at one hour and increases paid work to five. Another, E three, keeps paid work at two and increases other time to four. These points illustrate feasible choices, not estimated household responses. Wages, job availability, preferences and the hours covered by preschool affect which choice is made. We therefore need outcome data and a defensible policy comparison.

Axes: home/other time and paid-work time.

Preschool can relax a care constraint without forcing a particular response.

The diagram is a constructed time-allocation illustration.

## 16. Eligibility, access and participation are different variables

State the policy exposure whose effect is being studied.

Eligibility is meeting the policy's rules. Access means that a preschool place is available. Participation means actually using a place. These can differ: eligible families may face shortages or choose another arrangement. Our classroom expansion comparison concerns the eligible group's exposure to expanded access, not automatically the effect of attending preschool for a participant.

The assumed DAG links access to care constraints and maternal employment. Prior household factors can influence both access and employment. Holding a post-expansion care measure fixed can remove a mechanism that belongs to the total access effect. The graph helps articulate timing and possible channels, while DiD still needs an argument about untreated changes over time. Neither eligibility nor a regression control supplies that argument by itself.

Eligibility: policy conditions; access: an available place; participation: actual use.

Define the expansion comparison before interpreting a coefficient as an attendance effect.

A causal diagram does not establish parallel untreated trends.

## 17. Parallel trends is about unobserved untreated changes

It is not a requirement that the groups begin at the same level.

Use the four labels from the original diagram. A is the eligible group's employment rate before expansion, 40 percent, and B its later observed rate, 48 percent. C and D are the comparison group's rates, 60 and 63 percent. These are constructed teaching values. Different initial levels do not by themselves rule out parallel trends.

The average treatment effect on the treated, abbreviated ATT, is the average difference between the eligible group's post-expansion employment outcome and its outcome without the specified expansion. Here treated means exposure of the predefined eligible group to the expansion; it does not mean that every eligible mother enrolled a child. Under parallel untreated trends, the eligible group's no-expansion increase would equal the comparison group's three-percentage-point increase.

The assumed eligible post rate is therefore 43 percent. Its observed rate is 48, giving a five-percentage-point contrast. The dashed line represents a missing untreated outcome under that assumption. We do not observe it after expansion. Changing the control lets us examine an alternative assumed untreated change; it does not reveal that missing outcome.

Observed DiD: \((Y_B-Y_A)-(Y_D-Y_C)=(48-40)-(63-60)=5\) percentage points.

Assumed untreated eligible post rate: \(40+(63-60)=43\%\).

Parallel trends concerns the missing no-expansion change, not equal starting levels.

## 18. No anticipation and stable comparison units also matter

Define when treatment can begin to affect behaviour.

No anticipation means that the expansion has not already changed the measured pre-period outcome. A mother who starts searching for work before places open can create an anticipation issue. Choose the policy timing and baseline with that possibility in mind.

We also need a well-defined exposure and a suitable comparison population. If expanded preschool changes private care prices for ineligible families, their outcomes may be affected too. If the mix of mothers in the sample changes, the group means can change for a compositional reason. These are substantive questions about the policy and observations. They require institutional evidence and careful definitions alongside the parallel-trends argument.

No anticipation: the policy has not already changed the baseline outcome.

Check spillovers and the population represented at both dates.

A clear policy definition is part of the causal model.

## 19. DiD arithmetic

Try the comparison before opening the explanation.

In the Head Start teaching diagram, eligible mothers’ employment rises from 40% to 48%; comparison mothers’ employment rises from 60% to 63%. Calculate DiD in percentage points and on the zero-or-one employment-regression scale. State the untreated-trend assumption.

First calculate each group’s change in the same units, then subtract. Explain which post-period mean is missing.

Work in percentage points before converting to a zero-or-one outcome scale.

**Practice:** In the Head Start teaching diagram, eligible mothers’ employment rises from 40% to 48%; comparison mothers’ employment rises from 60% to 63%. Calculate DiD in percentage points and on the zero-or-one employment-regression scale. State the untreated-trend assumption.

## 20. DiD arithmetic: explanation

Follow the calculation and interpret its units.

The eligible change is eight percentage points and the comparison change three. The difference is five percentage points, or 0.05 on a zero-or-one outcome scale. Under parallel untreated trends the eligible group’s no-expansion post rate would be 43%. A causal interpretation also requires an unaffected baseline, no spillovers into the comparison group, a well-defined policy, and comparable sampling. The numbers are constructed, not estimates from the Head Start paper.

\((48-40)-(63-60)=5\) percentage points.

Binary-outcome regression contrast: \(0.05\).

The untreated eligible post mean is assumed, not observed.

## 21. The interaction in a two-by-two DiD equation has a specific meaning

Its interpretation follows the four group-time means.

Let the individual outcome Y be one if a mother is employed and zero otherwise. G is one for the group defined as eligible before expansion, and P is one for the post-expansion period. The intercept beta zero is the comparison group's initial employment probability. Beta one is its change over time, beta two the initial eligible-group gap, and beta three the additional change in the eligible group. The remaining term u is the regression error.

The interaction slope is 0.05 in our constructed example, equivalent to five percentage points. An equation with an intercept, group indicator, time indicator and their interaction reproduces the four cell means; this is a saturated two-by-two specification. Interpreting its interaction as the expansion effect needs the policy and untreated-trend assumptions. It does not automatically estimate the effect of preschool participation.

\(Y_{it}=\beta_0+\beta_1P_t+\beta_2G_i+\beta_3G_iP_t+u_{it}\).

\(G_i\): predefined eligible group; \(P_t\): post period; \(Y_{it}\): employment indicator.

Constructed interaction: \(\beta_3=0.05\), or five percentage points.

## 22. Different characteristics can imply different untreated changes

Unequal starting levels and unequal untreated trends are different issues.

The original Head Start lesson next asks whether eligible and ineligible families are comparable over time. Different baseline employment levels alone do not defeat DiD. The concern is a characteristic that produces different no-expansion changes and is distributed differently across the groups. Location can matter because local labour demand changes; prior education can matter because employment opportunities change differently by qualification.

Let W denote characteristics measured before the expansion. Conditional parallel trends requires equal untreated average changes within comparable values of W, rather than only for the two groups as a whole. A covariate is simply a variable used to describe or condition the comparison. We must justify why conditioning on the chosen prior characteristics makes this trend assumption credible. A post-expansion variable affected by preschool is a different kind of control.

\(W\): characteristics fixed before intervention.

Conditional trends: \(E[\Delta Y(0)\mid G=1,W]=E[\Delta Y(0)\mid G=0,W]\).

Here the change in Y(0) means the change without expansion.

## 23. Compare within location before averaging across locations

The original two-location idea separates changing opportunities from policy effects.

Consider two illustrative locations, A and B. Within location A the comparison group's employment rises two percentage points and the eligible group's rises three, giving a one-point DiD. Within location B the changes are six and nine, giving a three-point DiD. These are constructed values under a within-location parallel-trends model.

Now suppose 75 percent of eligible mothers live in A, while only 25 percent of comparison mothers do. The groups put different weights on locations with different untreated changes. Their unadjusted overall changes are 4.5 and five percentage points, giving minus 0.5. The negative overall DiD can coexist with positive within-location contrasts. A group average can mix the policy response with the distribution of changing local opportunities.

Location A: group changes 3 and 2; within-location DiD 1 percentage point.

Location B: group changes 9 and 6; within-location DiD 3 percentage points.

Different location mixtures can reverse the unadjusted aggregate comparison.

## 24. Average conditional effects for the treated population

The target determines the averaging weights.

A conditional ATT is the intervention's average effect for the treated group at a specified value of W. Call it tau of W. To recover the overall ATT, average those conditional effects using the distribution of W among treated units. Do not automatically use the pooled sample or the comparison group's distribution.

In the two-location example, the eligible-group weights are 0.75 and 0.25. The corresponding average is 0.75 times one plus 0.25 times three, or 1.5 percentage points. Equal weights would give two points and describe another target. Move the eligible-group location share to see how both its target average and the naive group comparison change. The conditional causal interpretation still depends on the within-location assumptions and the availability of suitable comparison observations.

\(\tau(W)\): the conditional effect among treated units at characteristic \(W\).

\(ATT=E[\tau(W)\mid G=1]\).

Example: \(0.75(1)+0.25(3)=1.5\) percentage points.

## 25. A covariate in levels need not adjust a trend

Decide whether the model represents untreated changes and effect heterogeneity.

Adding a baseline covariate to an outcome-level regression is not a general solution to conditional parallel trends. In a balanced two-period panel, a time-invariant term gamma times W disappears when we difference the same person's equation. It therefore cannot describe how untreated changes vary with W.

A model of the change as a function of W, or suitable interactions between W and the post indicator, can represent that variation under its functional-form assumptions. A single common policy interaction can also impose a constant conditional effect where effects actually vary. If we allow heterogeneous effects, we must still average for the intended treated population. The question is which comparison and restrictions the equation represents, not simply whether a covariate appears somewhere in the command.

Time-invariant levels: \(\Delta(\gamma W_i)=0\).

Model the untreated change as a function of pre-treatment W.

Allow appropriate heterogeneity and average for the stated population.

## 26. Repeat the original zero-effect income-targeting experiment

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

## 27. Similar-group comparisons need overlap

An estimator cannot create comparison observations absent from the data.

Overlap means that the characteristics represented among the treated also occur among suitable untreated comparison units. If policy assignment is deterministic at the lowest-income-quarter cutoff, no untreated person has an income below that cutoff in this experiment. Conditioning on exact income therefore does not supply both groups at those values.

The nearly zero adjusted coefficient exploits the known linear trend model to extrapolate across this gap. It is not evidence that flexible adjustment has removed the support problem. In an applied Head Start comparison, examine which household characteristics have suitable comparison observations and what population the evidence can support. A narrow income-threshold design would require its own additional assumptions and analysis. An automated estimator cannot create missing comparison observations.

Overlap for treated characteristics requires comparison observations: \(P(G=0\mid W)>0\).

Deterministic income targeting leaves no comparison observations below its cutoff.

A fitted extrapolation should be justified and labelled as such.

## 28. Doubly robust DiD combines two supporting models

Two chances for model correctness retain the design assumptions.

Doubly robust DiD combines a model of the comparison group's untreated change with a model of group membership. The first predicts the change among untreated units given prior characteristics. The second gives a propensity score: the probability of belonging to the treated group given those characteristics. Both help construct the treated group's missing untreated comparison.

Under conditional parallel trends, appropriate timing, overlap and the additional sampling and model-fitting conditions needed for a large-sample approximation, a doubly robust estimate can remain consistent if either supporting model is correctly specified. It does not remain valid when both are wrong or when the design assumptions fail. In the Stata example, a linear model describes untreated changes. The membership model uses a logistic curve, a smooth S-shaped function that keeps probabilities between zero and one. Flexible machine learning can fit more complex relationships, but valid effect inference requires a suitable procedure; prediction cross-validation alone does not supply it. This is the qualified connection to the earlier ridge/lasso section.

Outcome model: \(m_0(W)=E[\Delta Y\mid G=0,W]\).

Propensity score: \(p(W)=P(G=1\mid W)\).

A logistic membership curve stays between zero and one.

Double robustness concerns supporting-model correctness; conditional trends and overlap remain assumptions.

## 29. Read the real-data example from the Overleaf lesson

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

## 30. Separate spillovers, treatment versions and anticipation

Use the original SUTVA discussion to define the policy comparison precisely.

The stable unit treatment value assumption, often abbreviated SUTVA, combines two issues: whether one unit's outcome depends on other units' treatment, and whether the intervention being compared is well-defined. In the preschool example, changes in private care prices can affect ineligible families. That is interference, or a spillover, that can change what the comparison group represents.

Different preschool hours or service bundles can also make access mean different interventions. Define the version or policy mix whose effect is wanted; heterogeneous responses to one defined policy are not themselves a violation. Anticipation is a separate timing issue: parents may change job search before expansion begins. Keep these arguments distinct when defending a DiD. A graph or precise standard error does not replace the institutional explanation.

No interference: other units’ exposure does not change this unit’s potential outcome.

Well-defined treatment: specify the preschool access or service bundle being compared.

No anticipation: the baseline outcome is not already affected by the future intervention.

## 31. Cluster inference for repeated units

Errors within a state can remain related after fixed effects.

State fixed effects remove a stable mean component; they do not force the remaining errors in different years to be independent. State-clustered SEs allow general dependence within a state under suitable conditions across states and enough informative clusters for the approximation.

The policy assignment and shared shocks help determine the appropriate clustering unit. Many district-year rows can still contain relatively few independent state-policy changes. Report both the number of observations and the relevant cluster structure. With few clusters, ordinary cluster approximations can be fragile, which should affect the inference strategy rather than be hidden by a large row count.

State fixed effects remove a stable mean component; they do not force the remaining errors in different years to be independent.

The policy assignment and shared shocks help determine the appropriate clustering unit.

## 32. Cluster choice

Try the comparison before opening the explanation.

A policy is assigned to states and repeated outcomes are observed for many districts over years. Why is clustering by district alone potentially insufficient?

Rows from districts in one state can share the same policy and shocks. Identify the independent assignment units before choosing the covariance calculation.

**Practice:** A policy is assigned to states and repeated outcomes are observed for many districts over years. Why is clustering by district alone potentially insufficient?

## 33. Cluster choice: explanation

Follow the calculation and interpret its units.

Errors and policy exposure may be shared across districts within a state. Inference should reflect the assignment and dependence structure; state clustering is a starting point when states are independent sampling/assignment clusters. Few states require special care, and a universal cluster-count threshold is not a theorem.

Errors and policy exposure may be shared across districts within a state. Inference should reflect the assignment and dependence structure; state clustering is a starting point when states are independent sampling/assignment clusters. Few states require special care, and a universal cluster-count threshold is not a theorem.

## 34. Interpret a feasible tax difference

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

## 35. Inspect the 1982-to-1988 changes separately

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

## 36. DAG practice: pooling is not within-location identification

Trace the routes before choosing a control.

In the incinerator example, common time conditions affect prices while stable location quality affects proximity and prices. Do year indicators close the location route? If proximity never changes, what happens to its level coefficient under unit fixed effects, and what extra comparison could support a DiD question?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** In the incinerator example, common time conditions affect prices while stable location quality affects proximity and prices. Do year indicators close the location route? If proximity never changes, what happens to its level coefficient under unit fixed effects, and what extra comparison could support a DiD question?

## 37. DAG practice: pooling is not within-location identification: explanation

Explain what conditioning changes in this stated graph.

Year indicators do not block \(X\leftarrow C\rightarrow Y\) through stable location quality. Unit fixed effects can cancel an additive stable location component, but they also absorb a proximity indicator that never changes within a unit. Its separate level coefficient is then unavailable.

A proximity-by-post-period interaction can vary across groups and dates. Interpreting that interaction as a DiD effect requires a well-defined intervention and parallel untreated trends, along with the other stated comparison assumptions. Neither pooling nor the causal diagram alone establishes those assumptions.

Year indicators do not block \(X\leftarrow C\rightarrow Y\) through stable location quality. Unit fixed effects can cancel an additive stable location component, but they also absorb a proximity indicator that never changes within a unit. Its separate level coefficient is then unavailable. A proximity-by-post-period interaction can vary across groups and dates. Interpreting that interaction as a DiD effect requires a well-defined intervention and parallel untreated trends, along with the other stated comparison assumptions. Neither pooling nor the causal diagram alone establishes those assumptions.

## 38. Distinguish within-state and endpoint comparisons

Reproduce the evidence, then explain its economic meaning.

Run meeting_13.do using panel.csv. Compare the pooled and fixed-effects beer-tax slopes. Translate a ten-cent tax difference under the fixed-effects fit. Then compare the endpoint first-difference result and explain why it need not equal the seven-year fixed-effects estimate.

Change the endpoint first-difference comparison to 1983 and 1988. Use the same 48 states, calculate the differences yourself and compare the slope with the original endpoint window. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Change the endpoint first-difference comparison to 1983 and 1988. Use the same 48 states, calculate the differences yourself and compare the slope with the original endpoint window. Keep your commands, log, output and interpretation.

## 39. Distinguish within-state and endpoint comparisons: explanation

A reproducible result needs both a calculation and an interpretation.

The pooled slope with year controls is 0.366336; the state fixed-effects slope with year controls is -0.639980. A 0.10-dollar tax contrast in the latter fit gives -0.063998 fatalities per 10,000 residents. Its uncertainty uses state clusters, reflecting repeated observations within 48 states.

The 1982-to-1988 first-difference slope is -1.040973. That fit uses only two endpoints; the seven-year fixed-effects fit uses all within-state changes in its specified sample. The familiar equivalence between first differences and fixed effects concerns compatible two-period models, rather than these different samples. Both methods remove stable state components, while changing state-level confounding can remain.

The 1983-to-1988 slope is -0.845389 with robust SE 0.332000 across 48 states. Changing the endpoints changes the dated comparison; it is neither a replication failure nor proof that one window identifies a causal tax effect.

State FE slope: \(-0.639980\); 1982–1988 endpoint slope: \(-1.040973\).

1983–1988 endpoint slope: \(-0.845389\), robust SE \(0.332000\).

A changed endpoint window changes the dated comparison.

## 40. Next, seek a different source of treatment variation

Panel adjustment may leave time-varying endogeneity.

Panel methods remove stable unit effects and let us form explicit change comparisons. DiD adds a counterfactual trend argument that can support policy evaluation when its conditions are credible. Neither method removes every relationship between a regressor and a changing unobserved factor.

The next lesson introduces instrumental variables, using an outside source of variation that moves the regressor under specified conditions. We will separate relevance from exclusion and exogeneity, derive the simple ratio and use genuine two-stage least-squares output. The purpose is to address a named source of endogeneity rather than add a more advanced command to an unchanged weak design.

Panel methods remove stable unit effects and let us form explicit change comparisons.

The next lesson introduces instrumental variables, using an outside source of variation that moves the regressor under specified conditions.

