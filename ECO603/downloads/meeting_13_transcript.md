# 13. Panel comparisons, first differences and DiD

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

Calculate the observed contrast before assigning it a causal meaning.

Use a new constructed training-program example. Outcomes are monthly earnings in thousands of dirhams. The treated group's mean rises from ten to fourteen, while the comparison group's rises from eight to eleven. The treated change is four and the comparison change is three. Difference-in-differences, or DiD, subtracts those changes and gives one thousand dirhams.

That arithmetic is observable. Calling it a treatment effect requires a missing comparison: what would treated earnings have been after the program under the specified no-program intervention? We did not observe that potential outcome. The next slide states the assumption that uses the comparison group's change to supply it. Different baseline levels are allowed; the key issue is the untreated change, rather than equality of the initial means.

Treated: \(10\rightarrow14\); comparison: \(8\rightarrow11\)

\(\widehat\tau=(14-10)-(11-8)=1\) thousand dirhams

## 15. Parallel trends is about unobserved untreated changes

It is not a requirement that the groups begin at the same level.

Parallel untreated trends means that, without the program, the treated group would have had the same average outcome change as the comparison group. This is a statement about the no-program potential outcome, not a claim that their observed post-program paths must be parallel. In the example, it supplies a treated-group no-program change of three.

Add that change to the treated baseline of ten to obtain a counterfactual post-program mean of thirteen. The observed mean is fourteen, giving an effect of one thousand dirhams under the assumption. Earlier outcome trends can help assess the story, but similar pre-program paths do not prove the missing post-program path. The intervention also needs a stable meaning and an assignment story: a coincident treated-group earnings shock would undermine the comparison.

Counterfactual treated post mean under parallel untreated trends: \(10+(11-8)=13\)

Effect under the maintained assumptions: \(14-13=1\)

The unobserved untreated change is the identifying claim.

## 16. No anticipation and stable comparison units also matter

Define when treatment can begin to affect behaviour.

No anticipation means that future treatment does not already alter the pre-treatment outcomes used in the comparison. If a policy is announced early and behaviour changes immediately, the apparent baseline may already contain part of the response. The treatment date should reflect the economic timing rather than only a legal implementation date.

Also examine whether group composition changes and whether treatment affects the comparison group's outcomes through spillovers. The simple two-group calculation needs a credible account of these issues. Adding fixed effects cannot mechanically repair a comparison group whose outcome path has been changed by the policy itself.

No anticipation means that future treatment does not already alter the pre-treatment outcomes used in the comparison.

Also examine whether group composition changes and whether treatment affects the comparison group's outcomes through spillovers.

## 17. DiD arithmetic

Try the comparison before opening the explanation.

Treated mean outcomes rise from 10 to 14; comparison means rise from 8 to 11. Compute DiD and state its identifying assumption.

Calculate both observed changes, then construct the treated group’s missing no-treatment post mean. State the assumptions needed for that second step.

**Practice:** Treated mean outcomes rise from 10 to 14; comparison means rise from 8 to 11. Compute DiD and state its identifying assumption.

## 18. DiD arithmetic: explanation

Follow the calculation and interpret its units.

\(\mathrm{DiD}=(14-10)-(11-8)=1\). A causal interpretation needs parallel untreated trends, no anticipation and suitable composition/spillover assumptions. Similar baseline levels are not required; the key assumption concerns counterfactual changes.

\(\mathrm{DiD}=(14-10)-(11-8)=1\). A causal interpretation needs parallel untreated trends, no anticipation and suitable composition/spillover assumptions. Similar baseline levels are not required; the key assumption concerns counterfactual changes.

## 19. The interaction in a two-by-two DiD equation has a specific meaning

Its interpretation follows the four group-time means.

Let G equal one for membership in the treated group and zero for the comparison group. Let P equal one after the program and zero before it. Their product GP equals one only in the treated-post cell. In the displayed regression, a is the comparison group's pre mean, b the initial group gap and c the comparison group's time change.

Substitute the four zero-or-one combinations and subtract the two changes. The coefficient tau on GP equals the observed DiD contrast. This algebra does not supply parallel untreated trends, no anticipation or the absence of changing composition and spillovers. Those assumptions connect the four observed cell means to a causal contrast under the specified intervention. Group membership, date and treatment exposure play distinct roles, even though their product conveniently encodes exposure here.

\(Y=a+bG+cP+\tau(GP)+u\)

\(G\): treated-group membership; \(P\): post period; \(GP\): treated-post exposure.

## 20. Cluster inference for repeated units

Errors within a state can remain related after fixed effects.

State fixed effects remove a stable mean component; they do not force the remaining errors in different years to be independent. State-clustered SEs allow general dependence within a state under suitable conditions across states and enough informative clusters for the approximation.

The policy assignment and shared shocks help determine the appropriate clustering unit. Many district-year rows can still contain relatively few independent state-policy changes. Report both the number of observations and the relevant cluster structure. With few clusters, ordinary cluster approximations can be fragile, which should affect the inference strategy rather than be hidden by a large row count.

State fixed effects remove a stable mean component; they do not force the remaining errors in different years to be independent.

The policy assignment and shared shocks help determine the appropriate clustering unit.

## 21. Cluster choice

Try the comparison before opening the explanation.

A policy is assigned to states and repeated outcomes are observed for many districts over years. Why is clustering by district alone potentially insufficient?

Rows from districts in one state can share the same policy and shocks. Identify the independent assignment units before choosing the covariance calculation.

**Practice:** A policy is assigned to states and repeated outcomes are observed for many districts over years. Why is clustering by district alone potentially insufficient?

## 22. Cluster choice: explanation

Follow the calculation and interpret its units.

Errors and policy exposure may be shared across districts within a state. Inference should reflect the assignment and dependence structure; state clustering is a starting point when states are independent sampling/assignment clusters. Few states require special care, and a universal cluster-count threshold is not a theorem.

Errors and policy exposure may be shared across districts within a state. Inference should reflect the assignment and dependence structure; state clustering is a starting point when states are independent sampling/assignment clusters. Few states require special care, and a universal cluster-count threshold is not a theorem.

## 23. Interpret a feasible tax difference

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

## 24. Inspect the 1982-to-1988 changes separately

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

## 25. DAG practice: pooling is not within-location identification

Trace the routes before choosing a control.

In the incinerator example, common time conditions affect prices while stable location quality affects proximity and prices. Do year indicators close the location route? If proximity never changes, what happens to its level coefficient under unit fixed effects, and what extra comparison could support a DiD question?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** In the incinerator example, common time conditions affect prices while stable location quality affects proximity and prices. Do year indicators close the location route? If proximity never changes, what happens to its level coefficient under unit fixed effects, and what extra comparison could support a DiD question?

## 26. DAG practice: pooling is not within-location identification: explanation

Explain what conditioning changes in this stated graph.

Year indicators do not block \(X\leftarrow C\rightarrow Y\) through stable location quality. Unit fixed effects can cancel an additive stable location component, but they also absorb a proximity indicator that never changes within a unit. Its separate level coefficient is then unavailable.

A proximity-by-post-period interaction can vary across groups and dates. Interpreting that interaction as a DiD effect requires a well-defined intervention and parallel untreated trends, along with the other stated comparison assumptions. Neither pooling nor the causal diagram alone establishes those assumptions.

Year indicators do not block \(X\leftarrow C\rightarrow Y\) through stable location quality. Unit fixed effects can cancel an additive stable location component, but they also absorb a proximity indicator that never changes within a unit. Its separate level coefficient is then unavailable. A proximity-by-post-period interaction can vary across groups and dates. Interpreting that interaction as a DiD effect requires a well-defined intervention and parallel untreated trends, along with the other stated comparison assumptions. Neither pooling nor the causal diagram alone establishes those assumptions.

## 27. Distinguish within-state and endpoint comparisons

Reproduce the evidence, then explain its economic meaning.

Run meeting_13.do using panel.csv. Compare the pooled and fixed-effects beer-tax slopes. Translate a ten-cent tax difference under the fixed-effects fit. Then compare the endpoint first-difference result and explain why it need not equal the seven-year fixed-effects estimate.

**Practice:** Run meeting_13.do using panel.csv. Compare the pooled and fixed-effects beer-tax slopes. Translate a ten-cent tax difference under the fixed-effects fit. Then compare the endpoint first-difference result and explain why it need not equal the seven-year fixed-effects estimate.

## 28. Distinguish within-state and endpoint comparisons: explanation

A reproducible result needs both a calculation and an interpretation.

The pooled slope with year controls is 0.366336; the state fixed-effects slope with year controls is -0.639980. A 0.10-dollar tax contrast in the latter fit gives -0.063998 fatalities per 10,000 residents. Its uncertainty uses state clusters, reflecting repeated observations within 48 states.

The 1982-to-1988 first-difference slope is -1.040973. That fit uses only two endpoints; the seven-year fixed-effects fit uses all within-state changes in its specified sample. The familiar equivalence between first differences and fixed effects concerns compatible two-period models, rather than these different samples. Both methods remove stable state components, while changing state-level confounding can remain.

The pooled slope with year controls is 0.366336; the state fixed-effects slope with year controls is -0.639980. A 0.10-dollar tax contrast in the latter fit gives -0.063998 fatalities per 10,000 residents. Its uncertainty uses state clusters, reflecting repeated observations within 48 states. The 1982-to-1988 first-difference slope is -1.040973. That fit uses only two endpoints; the seven-year fixed-effects fit uses all within-state changes in its specified sample. The familiar equivalence between first differences and fixed effects concerns compatible two-period models, rather than these different samples. Both methods remove stable state components, while changing state-level confounding can remain.

## 29. Next, seek a different source of treatment variation

Panel adjustment may leave time-varying endogeneity.

Panel methods remove stable unit effects and let us form explicit change comparisons. DiD adds a counterfactual trend argument that can support policy evaluation when its conditions are credible. Neither method removes every relationship between a regressor and a changing unobserved factor.

The next lesson introduces instrumental variables, using an outside source of variation that moves the regressor under specified conditions. We will separate relevance from exclusion and exogeneity, derive the simple ratio and use genuine two-stage least-squares output. The purpose is to address a named source of endogeneity rather than add a more advanced command to an unchanged weak design.

Panel methods remove stable unit effects and let us form explicit change comparisons.

The next lesson introduces instrumental variables, using an outside source of variation that moves the regressor under specified conditions.

