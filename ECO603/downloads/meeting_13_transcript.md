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

Let i identify states and t identify years. Alpha i is an unobserved state component that does not change over the observed period. Lambda t is a year effect shared across states. The remaining error varies by both state and year.

If states with particular driving environments also choose different taxes, the stable component can be correlated with the tax. Pooled OLS that leaves it out can then mix the tax association with that stable difference. Panel transformations address this specific time-invariant component; they do not remove every unobserved influence.

The two subscripts i and t identify state and year. Alpha-i is a stable state component, lambda-t is a common year shift and u-i-t is the remaining error that can vary across both states and years. Beta is the slope on the observed regressor.

\(Y_{it}=\beta X_{it}+\alpha_i+\lambda_t+u_{it}\)

\(\alpha_i\): stable state component; \(\lambda_t\): common year shift

## 04. First differencing removes a stable unit component

Subtract the earlier equation from the later equation.

With two periods, subtract a state's earlier outcome from its later outcome and do the same for its regressor. The stable alpha i cancels because the same value appears in both equations. The common change in year effects remains as an intercept.

Time-invariant regressors also disappear from a differenced equation. This is useful when the concern is a stable unobserved state characteristic, but it means their separate level coefficients cannot be learned from this within-state change comparison. Time-varying omitted factors remain in the differenced error and can still threaten identification.

\(\Delta Y_i=\beta\Delta X_i+\Delta\lambda+\Delta u_i\)

## 05. A two-period athlete example uses the same algebra

State what disappears and what the comparison still needs.

Consider a student's GPA in two semesters, related to whether the student's sport is in season. Differencing removes a stable student component such as persistent ability. A common semester effect remains as a constant in the change equation. A time-invariant test-score control disappears.

The design can still be confounded by time-varying course difficulty, study time or other changes related to the in-season indicator. The word panel does not establish that these changes are unrelated. Explain why differencing addresses stable ability and why it does not, by itself, eliminate every other explanation for a GPA change.

GPA means grade point average, a numerical summary of a student’s course grades. In this example, compare the same student across semesters rather than different students with potentially different stable preparation.

Consider a student's GPA in two semesters, related to whether the student's sport is in season.

The design can still be confounded by time-varying course difficulty, study time or other changes related to the in-season indicator.

GPA: grade point average

## 06. First differences

Apply the idea before reading the solution.

In \(GPA_{it}=\beta\,season_{it}+\alpha_i+\lambda_t+u_{it}\) for two semesters, write the differenced equation and say what disappears.

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** In \(GPA_{it}=\beta\,season_{it}+\alpha_i+\lambda_t+u_{it}\) for two semesters, write the differenced equation and say what disappears.

## 07. First differences: explanation

Connect the calculation to the empirical claim.

\(\Delta GPA_i=\beta\Delta season_i+\Delta\lambda+\Delta u_i\). The time-invariant \(\alpha_i\) disappears, as do coefficients on time-invariant regressors. Semester effects do not disappear; with two periods they become a common intercept. Time-varying confounding can remain.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

\(\Delta GPA_i=\beta\Delta season_i+\Delta\lambda+\Delta u_i\). The time-invariant \(\alpha_i\) disappears, as do coefficients on time-invariant regressors. Semester effects do not disappear; with two periods they become a common intercept. Time-varying confounding can remain.

## 08. Demeaning uses each unit’s own average

Fixed effects remove the same stable component over several periods.

The within transformation subtracts each state's time average from its values at every date. The state component disappears because its average equals itself. The remaining equation compares deviations from a state's usual outcome with deviations from its usual tax.

This is the fixed-effects estimator in the linear panel model. It uses within-state variation rather than treating a permanent high-tax state as equivalent to a tax increase within a state. The parameter interpretation and required exogeneity argument must fit that within comparison. A state with no tax variation contributes no direct within variation for the tax slope.

\(Y_{it}-\overline Y_i=\beta(X_{it}-\overline X_i)+(\lambda_t-\overline\lambda)+u_{it}-\overline u_i\)

## 09. Two-period fixed effects and first differences share a slope identity

The identity requires the same two-period sample and specification.

With two observations per unit, demeaning produces one half of the change and its negative. OLS on these within deviations therefore gives the same slope as the first-difference regression with compatible time terms. This is a calculation identity, not a statement that every panel specification must agree.

Our application compares a two-period change from 1982 to 1988 with a fixed-effects fit using all seven years. Those are different samples of time variation, so their coefficients can differ. Do not interpret that difference as a failure of the two-period identity. Align the sample, regressors and covariance treatment before making a numerical comparison.

With two observations per unit, demeaning produces one half of the change and its negative.

Our application compares a two-period change from 1982 to 1988 with a fixed-effects fit using all seven years.

## 10. Read pooled and within-state associations

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

## 11. Use year effects for common shocks

They do not remove state-specific changes.

Year indicators allow a common outcome shift in each year, such as a national change in vehicle safety or economic conditions. Combined with state effects, they separate stable state differences and shared year movements from the variation used for the slope.

The remaining comparison is still vulnerable to state-specific changes related to tax policy. It also cannot identify the effect of a regressor that varies only nationally by year. That common regressor is absorbed by the year effects. These are consequences of the written equation, so the empirical interpretation should be checked before software is run.

The diagram adapts the earlier incinerator example: X is proximity, Y house price, C stable location quality and T common time conditions. Common time conditions affect house prices, but stable location quality affects both proximity to the incinerator and prices. Holding time fixed leaves that location backdoor open. A within-unit transformation can cancel a stable additive component under the panel model; it does not literally erase the causal arrows or remove changing confounding. If proximity itself never changes, its level coefficient is also absorbed; a proximity-by-post-period interaction supplies a different, dated comparison. Parallel trends for a DiD comparison remains an additional assumption about untreated changes.

## 12. State the fixed-effects exogeneity condition

Transforming variables does not make their remaining changes random.

A common sufficient mean assumption is that the error at each date averages to zero given the unit's full regressor history and its stable effect. This is a strict-exogeneity condition for the panel model. It rules out, for example, an unobserved current fatality shock that drives future tax changes in a way incompatible with the restriction.

First-difference OLS instead needs its differenced regressor to have the required lack of relation with the differenced error. These assumptions should be discussed in the application's timing and policy context. A transformation removes the stable component algebraically; the remaining exogeneity is a substantive claim.

\(E(u_{it}\mid X_{i1},\ldots,X_{iT},\alpha_i)=0\) as a sufficient panel condition

## 13. Build a difference-in-differences comparison

Subtract the comparison group’s change from the treated group’s change.

Difference-in-differences, DiD, compares changes across a treated group and a comparison group. Use constructed means: the treated group rises from ten to fourteen, while the comparison group rises from eight to eleven. The treated change is four and the comparison change is three, giving DiD equal to one.

The comparison group's change is used to represent what would have happened to the treated group without treatment. This is a counterfactual argument. The arithmetic is simple; the identifying assumption is the important new step. Baseline levels may differ even when the required untreated trends are parallel.

\(\widehat\tau=(14-10)-(11-8)=1\)

## 14. DiD arithmetic

Apply the idea before reading the solution.

Treated mean outcomes rise from 10 to 14; comparison means rise from 8 to 11. Compute DiD and state its identifying assumption.

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** Treated mean outcomes rise from 10 to 14; comparison means rise from 8 to 11. Compute DiD and state its identifying assumption.

## 15. DiD arithmetic: explanation

Connect the calculation to the empirical claim.

\(\mathrm{DiD}=(14-10)-(11-8)=1\). A causal interpretation needs parallel untreated trends, no anticipation and suitable composition/spillover assumptions. Similar baseline levels are not required; the key assumption concerns counterfactual changes.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

\(\mathrm{DiD}=(14-10)-(11-8)=1\). A causal interpretation needs parallel untreated trends, no anticipation and suitable composition/spillover assumptions. Similar baseline levels are not required; the key assumption concerns counterfactual changes.

## 16. Parallel trends is about unobserved untreated changes

It is not a requirement that the groups begin at the same level.

Parallel trends means that, without treatment, the treated group's expected outcome change would match the comparison group's expected change over the relevant period. We do not observe the treated group's untreated post-period outcome, so this is an assumption about a missing comparison.

Prior trends can provide relevant evidence, but similar earlier changes do not prove the unobserved post-period condition. Consider the mechanism: were other policies, economic shocks or selection changes different between groups? A convincing DiD study explains why the comparison change is informative for the treated group's missing path, not only why two plotted lines look similar before treatment.

## 17. No anticipation and stable comparison units also matter

Define when treatment can begin to affect behaviour.

No anticipation means that future treatment does not already alter the pre-treatment outcomes used in the comparison. If a policy is announced early and behaviour changes immediately, the apparent baseline may already contain part of the response. The treatment date should reflect the economic timing rather than only a legal implementation date.

Also examine whether group composition changes and whether treatment affects the comparison group's outcomes through spillovers. The simple two-group calculation needs a credible account of these issues. Adding fixed effects cannot mechanically repair a comparison group whose outcome path has been changed by the policy itself.

No anticipation means that future treatment does not already alter the pre-treatment outcomes used in the comparison.

Also examine whether group composition changes and whether treatment affects the comparison group's outcomes through spillovers.

## 18. The interaction in a two-by-two DiD equation has a specific meaning

Its interpretation follows the four group-time means.

Let D indicate the treated group and P indicate the post period. The equation includes both indicators and their product. The coefficient on the product equals the difference between the groups' changes in the simple two-by-two model.

This is the same interaction algebra used earlier, now applied to time and group. The causal interpretation additionally requires the counterfactual trend assumptions. Recognising the product term is not enough to establish policy identification. For more complicated adoption patterns or heterogeneous effects, a simple extension may require different methods; the present core comparison is the two-group, two-period design.

\(Y=a+bD+cP+\tau(DP)+u\)

## 19. Cluster inference for repeated units

Errors within a state can remain related after fixed effects.

State fixed effects remove a stable mean component; they do not force the remaining errors in different years to be independent. State-clustered SEs allow general dependence within a state under suitable conditions across states and enough informative clusters for the approximation.

The policy assignment and shared shocks help determine the appropriate clustering unit. Many district-year rows can still contain relatively few independent state-policy changes. Report both the number of observations and the relevant cluster structure. With few clusters, ordinary cluster approximations can be fragile, which should affect the inference strategy rather than be hidden by a large row count.

State fixed effects remove a stable mean component; they do not force the remaining errors in different years to be independent.

The policy assignment and shared shocks help determine the appropriate clustering unit.

## 20. Interpret a feasible tax difference

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

## 21. Inspect the 1982-to-1988 changes separately

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

## 22. Cluster choice

Apply the idea before reading the solution.

A policy is assigned to states and repeated outcomes are observed for many districts over years. Why is clustering by district alone potentially insufficient?

Start by naming the comparison and its units. Write the assumption you need before calculating. If the question concerns a causal effect, explain why the proposed comparison would recover it. Keep your calculation and interpretation together so another reader can follow your reasoning.

**Practice:** A policy is assigned to states and repeated outcomes are observed for many districts over years. Why is clustering by district alone potentially insufficient?

## 23. Cluster choice: explanation

Connect the calculation to the empirical claim.

Errors and policy exposure may be shared across districts within a state. Inference should reflect the assignment and dependence structure; state clustering is a starting point when states are independent sampling/assignment clusters. Few states require special care, and a universal cluster-count threshold is not a theorem.

Compare this reasoning with your attempt. Check the sign, the units and the assumption separately. A correct number with an incorrect interpretation needs a different correction from a small rounding difference. Use the explanation to identify which part of the argument you would change.

Errors and policy exposure may be shared across districts within a state. Inference should reflect the assignment and dependence structure; state clustering is a starting point when states are independent sampling/assignment clusters. Few states require special care, and a universal cluster-count threshold is not a theorem.

## 24. DAG practice: pooling is not within-location identification

Trace the routes before choosing a control.

In the incinerator example, common time conditions affect prices while stable location quality affects proximity and prices. Do year indicators close the location route? If proximity never changes, what happens to its level coefficient under unit fixed effects, and what extra comparison could support a DiD question?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** In the incinerator example, common time conditions affect prices while stable location quality affects proximity and prices. Do year indicators close the location route? If proximity never changes, what happens to its level coefficient under unit fixed effects, and what extra comparison could support a DiD question?

## 25. DAG practice: pooling is not within-location identification: explanation

Explain what conditioning changes in this stated graph.

Year indicators do not block \(X\leftarrow C\rightarrow Y\) through stable location quality. Unit fixed effects can cancel an additive stable location component, but they also absorb a proximity indicator that never changes within a unit. Its separate level coefficient is then unavailable.

A proximity-by-post-period interaction can vary across groups and dates. Interpreting that interaction as a DiD effect requires a well-defined intervention and parallel untreated trends, along with the other stated comparison assumptions. Neither pooling nor the causal diagram alone establishes those assumptions.

Year indicators do not block \(X\leftarrow C\rightarrow Y\) through stable location quality. Unit fixed effects can cancel an additive stable location component, but they also absorb a proximity indicator that never changes within a unit. Its separate level coefficient is then unavailable. A proximity-by-post-period interaction can vary across groups and dates. Interpreting that interaction as a DiD effect requires a well-defined intervention and parallel untreated trends, along with the other stated comparison assumptions. Neither pooling nor the causal diagram alone establishes those assumptions.

## 26. Distinguish within-state and endpoint comparisons

Reproduce the evidence, then explain its economic meaning.

Run meeting_13.do using panel.csv. Compare the pooled and fixed-effects beer-tax slopes. Translate a ten-cent tax difference under the fixed-effects fit. Then compare the endpoint first-difference result and explain why it need not equal the seven-year fixed-effects estimate.

Work in pairs if possible. One reader checks the data, units and software result; the other checks the interpretation and assumptions. Agree on a short result paragraph before opening the explanation. Keep the numerical calculation separate from the additional argument needed for a causal claim.

**Practice:** Run meeting_13.do using panel.csv. Compare the pooled and fixed-effects beer-tax slopes. Translate a ten-cent tax difference under the fixed-effects fit. Then compare the endpoint first-difference result and explain why it need not equal the seven-year fixed-effects estimate.

## 27. Distinguish within-state and endpoint comparisons: explanation

A reproducible result needs both a calculation and an interpretation.

The pooled slope with year controls is 0.366336; the state fixed-effects slope with year controls is -0.639980. A 0.10-dollar tax contrast in the latter fit gives -0.063998 fatalities per 10,000 residents. Its uncertainty uses state clusters, reflecting repeated observations within 48 states.

The 1982-to-1988 first-difference slope is -1.040973. That fit uses only two endpoints; the seven-year fixed-effects fit uses all within-state changes in its specified sample. The familiar equivalence between first differences and fixed effects concerns compatible two-period models, rather than these different samples. Both methods remove stable state components, while changing state-level confounding can remain.

The pooled slope with year controls is 0.366336; the state fixed-effects slope with year controls is -0.639980. A 0.10-dollar tax contrast in the latter fit gives -0.063998 fatalities per 10,000 residents. Its uncertainty uses state clusters, reflecting repeated observations within 48 states. The 1982-to-1988 first-difference slope is -1.040973. That fit uses only two endpoints; the seven-year fixed-effects fit uses all within-state changes in its specified sample. The familiar equivalence between first differences and fixed effects concerns compatible two-period models, rather than these different samples. Both methods remove stable state components, while changing state-level confounding can remain.

## 28. Next, seek a different source of treatment variation

Panel adjustment may leave time-varying endogeneity.

Panel methods remove stable unit effects and let us form explicit change comparisons. DiD adds a counterfactual trend argument that can support policy evaluation when its conditions are credible. Neither method removes every relationship between a regressor and a changing unobserved factor.

The next lesson introduces instrumental variables, using an outside source of variation that moves the regressor under specified conditions. We will separate relevance from exclusion and exogeneity, derive the simple ratio and use genuine two-stage least-squares output. The purpose is to address a named source of endogeneity rather than add a more advanced command to an unchanged weak design.

Panel methods remove stable unit effects and let us form explicit change comparisons.

The next lesson introduces instrumental variables, using an outside source of variation that moves the regressor under specified conditions.

