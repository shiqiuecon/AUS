# 03. Multiple regression: estimation and omitted variables

Explain why an estimate changes when the controls change.

## Core lesson

### 01. What does holding other things fixed mean?

Show the comparison left after observed controls are removed.

The simple regression compared district scores using staffing alone. Now we introduce multiple regression: include more than one explanatory variable in the same fitted equation. Adding language composition and income lets us describe staffing differences while holding those measured characteristics fixed in the model.

We will first define the longer equation, explain its fitting rule and derive why adding a regressor can change a slope. We then check those ideas in the actual district data. In the next lesson, partialling out will make the adjusted comparison visible by removing the fitted contributions of the controls. A coefficient calculation and its causal policy interpretation will continue to require separate arguments.

### 02. The full model sets the target coefficient

Define every component before removing controls.

Let Y be district test score, X the student–teacher ratio, Z language composition and W income. The full linear regression includes an intercept and all three regressors. Its coefficient on X is the fitted staffing slope at fixed Z and W.

For this estimation exercise, assume all included variables are observed on the same districts and no regressor is an exact linear combination of the others. Exact linear dependence is perfect multicollinearity; it prevents a separate coefficient from being estimated. Causal interpretation also needs a suitable population error restriction, such as a zero conditional mean given the included variables.

\(Y_i=\beta_0+\beta_1X_i+\beta_2Z_i+\beta_3W_i+u_i\)

\(E(u_i\mid X_i,Z_i,W_i)=0\) for the stated mean model

### 03. OLS solves a sample optimisation

Its residual identities follow from the fitted model.

OLS chooses coefficients to minimize the sum of squared residuals. At the chosen coefficients, a small change in the intercept cannot lower that loss. The corresponding condition makes the residuals add to zero. A small change in an included slope likewise gives a zero sum of that regressor multiplied by the fitted residuals.

These conditions are called the normal equations, the equations characterizing the least-squares solution. Their name imposes no particular distributional shape on the errors. They hold because of how the coefficients are chosen. They cannot test whether an included regressor was related to an unobserved population error before the fit. The next slide names and explains the zero product-sum property directly.

\(\sum_i e_i=0\)

\(\sum_i X_i e_i=0\) for each included regressor.

### 04. Sample orthogonality is mechanical

Population exogeneity is a substantive assumption.

OLS chooses coefficients to minimize the sum of squared residuals. With an intercept, its fitted residuals add to zero. It also makes the sum of regressor-times-residual products zero for each included regressor. This zero product-sum is called sample orthogonality. It describes how the fitted residuals line up with the columns used to fit the model.

For example, a residual can be positive at one staffing value and negative at another, with the weighted products balancing exactly. That balance follows from the optimization even if omitted learning needs affected staffing choices. The unobserved population errors need not have the corresponding zero conditional mean. A mechanical feature of a fit cannot verify the assignment assumption required for a causal interpretation.

\(\sum_i e_i=0\), \(\sum_i X_i e_i=0\) with an OLS intercept

Orthogonality here means a zero sum of paired products.

### 05. What is hidden in the staffing comparison?

Use a second variable to understand a changed slope.

The previous lesson found a negative association between students per teacher and district test scores. We will now compare that fit with a regression including English-learner share. The question is whether the fitted staffing comparison changes and what that change can establish. This matters whenever a policy variable is chosen rather than assigned by chance.

We will use the same 420 districts throughout the main comparison. Keeping the observations fixed lets us study a change in the model without also changing the sample. Our goal is to explain the coefficient movement with an equation, a diagram and actual data, then decide what additional assumptions a causal interpretation would require.

### 06. Write the longer relationship first

Define what the short model leaves out.

Keep X for staffing and let Z be English-learner share. The longer population equation has an intercept beta zero, a staffing slope beta one and a language-share slope beta two. Its error u contains outcome determinants left outside that specified relationship. Before asking what omitting Z does, state what makes the longer model's coefficient the target.

Suppose the average u is zero at every combination of X and Z. This zero conditional-mean restriction is called exogeneity here: the included regressors provide no information about the remaining average error. If staffing is selected using an omitted learning need, that restriction can fail; we call that an endogeneity problem for the model. The causal interpretation also needs the intervention and assignment argument. The algebra that follows tells us how the shorter regression changes the longer coefficient under its stated conditions.

\(Y_i=\beta_0+\beta_1X_i+\beta_2Z_i+u_i\)

Exogeneity for this mean model: \(E(u_i\mid X_i,Z_i)=0\)

### 07. Two relationships determine omitted-variable bias

Multiply the omitted effect by the omitted-variable association.

Let Z be English-learner share and X the staffing ratio. The longer score relationship has staffing slope beta one and language slope beta two. To describe how Z varies with X, write an auxiliary equation, meaning a supporting regression: Z equals delta zero plus delta one times X plus v. Delta zero is its intercept, delta one its slope, and v the remainder with mean zero at each X.

Substitute that expression for Z into the longer score equation. The constant terms combine, and the coefficient multiplying X becomes beta one plus beta two times delta one. The new error is beta two times v plus u. If the longer error u also has mean zero given X and Z, this composite error has mean zero given X. The short population regression therefore adds beta two times delta one to the longer staffing slope. Bias here means a difference from the target longer-model coefficient; that target is causal only under its stated causal assumptions.

\(Z=\delta_0+\delta_1X+v\)

\(Y=(\beta_0+\beta_2\delta_0)+(\beta_1+\beta_2\delta_1)X+(\beta_2v+u)\)

Short slope minus longer slope: \(\beta_2\delta_1\)

### 08. Predict the direction before seeing the estimate

The sign depends on both parts of the product.

Suppose a left-out factor raises the outcome and is positively related to X. Both terms in the product are positive, so the short slope is higher than the longer-model slope. If the omitted effect is negative while the association with X is positive, the short slope is lower. You must explain both signs to justify the direction.

In an earnings example, ability may raise wages and be positively related to schooling. A regression of wages on schooling alone can then mix the schooling relationship with ability. This example provides an economic reason for the algebra. It does not establish the size of bias in a particular wage dataset, because ability and its relationships would still need to be studied.

### 09. Predict omitted-variable bias

Try the comparison before opening the explanation.

In a wage model, the causal return to schooling is \(\beta\). Ability raises wages by \(\gamma>0\), and the auxiliary regression of ability on schooling has slope \(\delta>0\). Under the scalar model, what is the omitted-variable bias?

Use the longer outcome slope of the omitted factor and its supporting relationship with X. Multiply their signs before inspecting the fitted staffing coefficients.

**Practice:** In a wage model, the causal return to schooling is \(\beta\). Ability raises wages by \(\gamma>0\), and the auxiliary regression of ability on schooling has slope \(\delta>0\). Under the scalar model, what is the omitted-variable bias?

### 10. Predict omitted-variable bias: explanation

Follow the calculation and interpret its units.

The short-regression slope is \(\beta+\gamma\delta\), so its bias relative to \(\beta\) is positive. Schooling picks up some of the association between ability and wages. This requires the stated linear model and exogeneity of the remaining error.

The short-regression slope is \(\beta+\gamma\delta\), so its bias relative to \(\beta\) is positive. Schooling picks up some of the association between ability and wages. This requires the stated linear model and exogeneity of the remaining error.

### 11. Check the actual coefficient movement

Use the same districts in both regressions.

The short staffing coefficient is -2.280. Adding English-learner share gives -1.101. The short coefficient is therefore more negative. The longer model estimates a negative language-composition coefficient, while the auxiliary regression finds a positive association between the staffing ratio and language composition.

Those two signs imply a negative omitted-variable contribution. They explain the observed direction of movement without requiring a new story after seeing the answer. This is a useful empirical habit: state the hypothesised mechanism and predicted direction first, then compare them with the data. The sign calculation concerns the stated linear models; whether either slope is a causal staffing effect remains a separate design question.

```text
. quietly regress score str el

. matrix list e(b), format(%10.6f)

e(b)[1,3]
           str          el       _cons
y1   -1.101296   -0.649777  686.032250
```

### 12. Verify the omitted-variable calculation

An exact sample identity can be checked independently.

In the sample, the language coefficient is -0.650 and the auxiliary slope is 1.814. Their product is about -1.179 score points per student per teacher. Adding that to the adjusted staffing slope reproduces the short slope, up to rounding.

This equality is a least-squares identity when the short, long and auxiliary regressions use compatible variables and the same observations. It is a numerical check on our explanation. It is not evidence that English-learner share is the only omitted factor or that we have discovered a causal language effect. The identity tells us how these fitted regressions relate, while the research question determines which comparison we want.

\(b_{1,\mathrm{short}}-b_{1,\mathrm{long}}=b_2\widehat\delta_1\)

```text
. quietly regress el str

. matrix list e(b), format(%10.6f)

e(b)[1,2]
           str       _cons
y1    1.813719  -19.854055
```

### 13. Derive the omitted-variable contribution from population moments

The omitted effect and its association with the included regressor both matter.

Write the longer population model as Y equals beta zero plus beta one X plus beta two W plus u. Here X is staffing, W a specified omitted characteristic, and u has zero conditional mean given both variables. The short population linear-projection slope is covariance of X and Y divided by variance of X; a linear projection is the best population linear fit in squared-error terms.

Taking covariance of X with the longer equation gives beta one times variance of X plus beta two times covariance of X and W. The remaining covariance with u is zero under the stated assumption. Dividing yields the omitted-variable expression. Its population interpretation differs from the exact same-sample OLS identity already checked in Stata. In either case, adding a variable is useful only when it represents the intended comparison.

\(Y=\beta_0+\beta_1X+\beta_2W+u\), \(E[u\mid X,W]=0\).

\(\operatorname{Cov}(X,Y)=\beta_1\operatorname{Var}(X)+\beta_2\operatorname{Cov}(X,W)\).

\(\alpha_1=\beta_1+\beta_2\operatorname{Cov}(X,W)/\operatorname{Var}(X)\), \(\operatorname{Var}(X)>0\).

### 14. Explain why the estimated slope changed

Adding Z changes the fitted comparison from about +4.56 to +2.20 score points.

The staffing slope changes from about -2.28 in the simple regression to -1.10 after adding the English-learner share. The adjusted line is flatter. Moving from a ratio of 22 to 20 gives about 4.56 fitted score points on the first line and 2.20 points on the adjusted line. These two numbers describe different comparisons in the same data.

Why might accounting for Z change the slope? If districts at different ratios also have different language composition, the first line combines both differences. The second model tries to separate their fitted relationships with scores. This is why we examined a possible confounder before adding a variable: the control should have a reason connected to the research question.

The second number is not automatically the causal gain from hiring teachers. Family resources and staffing responses to students' needs could still affect the comparison. The useful conclusion at this stage is more specific: one measured district characteristic changes the estimated staffing relationship substantially. Write the two comparisons in words. After the break, we will run the commands and read the numerical evidence behind the graph.

**Practice:** Report the two fitted score differences for 22 → 20 students per teacher. Explain why they need not be the same.

**Explanation:** The simple model gives about +4.56 points. The adjusted model gives about +2.20 points while holding English-learner share fixed. The first comparison also reflects observed differences in language composition across districts; the second accounts for those differences within its stated model.

### 15. Read the adjusted regression

Read both coefficients with their units and the stated comparison.

The longer fit includes English-learner share, called el in Stata. This variable is measured in percentage points. The staffing coefficient is now minus 1.101296, so the fitted two-student contrast is about 2.20 score points at a fixed language share. The language coefficient describes the fitted score difference for a one-percentage-point language-share difference at fixed staffing.

Both models use the same 420 districts. The coefficient movement therefore reflects a changed comparison rather than a changed sample. Multiple regression describes how one regressor is associated with the outcome after the included others are accounted for in the specified form. It does not guarantee that language share captures all prior learning needs or that the staffing contrast is causal. The omitted-variable derivation explains how this slope movement can arise.

Adjusted staffing slope: \(-1.101296\)

At fixed language share: \((-2)(-1.101296)=2.202592\) points

```text
. quietly regress score str el

. matrix list e(b), format(%10.6f)

e(b)[1,3]
           str          el       _cons
y1   -1.101296   -0.649777  686.032250
```

### 16. Attempt the adjusted policy contrast

Keep the arithmetic and the interpretation together.

Use the adjusted staffing slope to evaluate the same ratio change. The change in X is still minus two; changing the model has not changed the policy units. Multiplication gives 2.202592 fitted score points while holding the included language-share variable fixed.

Explain why this number differs from the short-model contrast. The short fit also uses staffing differences associated with language composition; the longer fit separates their fitted contributions. A complete answer states both the calculation and the meaning of fixed language share. It does not assume that every relevant district difference has now been observed.

\(\Delta\widehat Y=(-2)(-1.101296)=2.202592\) points

**Practice:** Calculate the adjusted fitted contrast for a ratio reduction from 22 to 20. Explain what is held fixed.

**Explanation:** About +2.20 score points, with English-learner share fixed in the fitted model.

```text
. display %10.6f -2*_b[str]
  2.202592
```

### 17. Choose controls for the research question

State what each variable is meant to address.

Apply the school-control reasoning to a second setting: job training and earnings. The diagram's X is training, Y earnings, C prior education and U unmeasured motivation. Prior education can affect both participation and earnings, so holding it fixed can remove that common-cause route.

Select education and trace the remaining route through motivation. It is still open because motivation affects both training and earnings. Acquired skills, by contrast, would occur after training and carry part of its effect. Before choosing controls, name the intervention, decide whether its total effect is wanted, and distinguish earlier common causes from later mechanisms. Moving to a new application changes the substantive story, while the path rules remain the same.

New application: training → earnings.

Prior education is a proposed common cause; motivation remains unmeasured.

### 18. Adjustment changes a comparison; it does not guarantee identification

A richer model can still leave an important factor out.

Identification asks whether the available data and assumptions determine the quantity we want. For a causal staffing effect, we must be able to connect observed district comparisons to the outcomes under the specified staffing intervention. A coefficient being precisely computable from a dataset does not by itself make that connection.

For example, holding language share fixed may close a route through measured district composition. An unmeasured learning need could still affect teacher recruitment and scores. If that route remains, several causal effects can be compatible with the same observed association under different background stories. State which routes the controls address and which assumptions rule out the others. Estimation then uses the sample to calculate the quantity the identifying argument has defined.

Identification: do the data and assumptions determine the target?

Estimation: use the sample to calculate it.

### 19. Add income and inspect what changes

An additional observed factor can substantially alter a slope.

Adding district income changes the staffing coefficient to -0.069. This is much closer to zero than the short-model estimate. Do not summarise this as proof that staffing never matters. The sample contains observational comparisons, and the interpretation depends on the controls, functional form and remaining error relationships.

Use the result to ask a more informed question: how much independent staffing variation remains among districts with similar observed backgrounds? If that variation is small or systematically chosen, a causal claim may still be difficult. The next lesson will make 'holding other variables fixed' more concrete by removing their fitted contributions from both staffing and scores.

```text
. quietly regress score str el income

. matrix list e(b), format(%10.6f)

e(b)[1,4]
           str          el      income       _cons
y1   -0.068776   -0.488267    1.494517  640.315497
```

### 20. Keep the estimation sample fixed

Otherwise a coefficient change can have two explanations.

Suppose income is missing for some districts. A longer regression will drop those observations. Comparing its staffing coefficient with a short regression using all districts changes both the variables and the population represented by the sample. We cannot assign the entire movement to controlling for income.

First determine the observations used by the longer model. Refit the short model on that same set, then compare it with the longer model. Separately report how the complete-data sample differs from the original data. This procedure isolates a model change but does not solve selection caused by missing data. The main application here has complete values for its included variables, so the 420-district comparison remains fixed.

Compare identical observations

Then investigate why observations are missing

### 21. Explain an observed omitted-variable contribution

Reproduce the evidence, then explain its economic meaning.

Run lab_02.do using schools.csv. Record the staffing slopes in the short model and the model with English-learner share. Multiply the longer-model language coefficient by the auxiliary staffing–language slope. Check that this product equals the staffing-coefficient movement, then explain why that identity does not identify a causal language effect.

Repeat the omitted-variable decomposition for income, retaining language share in every supporting equation. Verify the staffing-coefficient movement on one common sample. Write and run your own commands, then save the code, execution log and an explanation in your own words. The independent practice file is a worked reference.

**Practice:** Repeat the omitted-variable decomposition for income, retaining language share in every supporting equation. Verify the staffing-coefficient movement on one common sample. Keep your commands, log, output and interpretation.

### 22. Explain an observed omitted-variable contribution: explanation

A reproducible result needs both a calculation and an interpretation.

The short staffing slope is -2.279808 and the language-adjusted slope is -1.101296. Their difference is -1.178512. The product of the language coefficient -0.649777 and auxiliary slope 1.813719 gives the same difference before rounding.

The identity describes compatible least-squares fits on the same 420 observations. The negative language association and positive staffing–language association make the short staffing slope more negative. Neither component is automatically causal: language share can stand for measured district composition while other background differences remain unobserved. The numerical identity verifies the regression explanation, while the causal interpretation still requires substantive assumptions.

Omitting income changes the staffing slope by -1.032520; the full-model income slope times the income-on-staffing auxiliary slope, controlling for language share, gives the same value on 420 districts.

Original language contribution: \(-1.178512\).

Income contribution, retaining language share: \(-1.032520\).

Check compatible models and the same 420 districts.

### 23. From a control set to the information OLS uses

The longer regression changes the comparison by holding the included controls fixed. The omitted-variable calculation explains why a short slope can differ from a longer slope even on the same sample. Neither calculation establishes that all important causes have been observed.

We next study the properties of the estimator. Partialling out will show exactly which sample variation remains after removing the linear information in the controls. We can then ask what assumptions make that remaining comparison informative about the intended coefficient.

From a control set to the information OLS uses

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 24. Why can adding a regressor change a slope?

A raw comparison can mix several observed differences.

The simple regression used staffing alone to describe score differences. A longer regression can hold specified characteristics, such as language share, fixed while comparing staffing. These are different observed comparisons, so their slopes need not agree.

We first write that longer relationship and solve the multiple-regression fitting problem. We then derive the omitted-variable expression and check the actual same-sample coefficient movement. The algebra explains how a slope can change; the causal claim still depends on whether the longer comparison addresses the important common causes.

A short and a longer regression describe different conditional comparisons.

Derive the difference before interpreting observed coefficient movement.

### 25. Recall the difference between an error and a residual

A property of a fitted line is not a test of the design.

An error is the part of the population outcome outside the included relationship. A residual is observed outcome minus fitted outcome after we estimate the model. OLS with an intercept makes the sample residuals sum to zero. That calculation can hold even when staffing is related to an important omitted factor.

For example, districts might recruit teachers because their students need extra help. The resulting staffing measure can be related to learning needs inside the error. Before looking at any new output, explain why a zero average residual would not rule out this possibility. We need an argument about the population relationship, not only a check that the software solved the least-squares problem.

\(e_i=Y_i-\widehat Y_i\)

\(\sum_i e_i=0\) with an OLS intercept

### 26. Holding an observed factor fixed

Multiple regression compares ratios and scores at a fixed value of another variable.

Our first line used only the staffing ratio. We now add Zᵢ, the percentage of English learners, to the model. This is multiple regression: a regression with more than one explanatory variable. Its fitted equation is \(\widehat Y_i\)=\(b_0\)+\(b_1\)\(X_i\)+\(b_2\)Zᵢ. The new coefficient \(b_2\) gives the fitted score difference for one percentage-point increase in Z, keeping X fixed.

The staffing coefficient \(b_1\) now answers a more specific descriptive question. How do fitted scores differ with the ratio when we compare districts at the same Z? This is what 'holding Z fixed' means in this equation. The word adjusted refers to this accounting for Z. We are changing the comparison, rather than physically changing a district's students or teachers.

Select Next step to compare the simple and adjusted lines. For the adjusted line we hold Z at its sample average. Both lines use the same 420 districts, so any change in their slopes comes from adding Z, not from comparing different samples. Notice whether the line becomes steeper or flatter. The next slide translates that change into the staffing comparison we used earlier.

\(\widehat Y_i=b_0+b_1X_i+b_2Z_i\)

\(b_1\): staffing slope at fixed \(Z\)

The graph fixes language share at its sample average.

### 27. A confounder and a mediator do different jobs

The timing of a control changes its meaning.

A confounder helps explain both the explanatory variable and the outcome before the intervention. A mediator lies on a pathway through which the intervention changes the outcome. For training and earnings, prior education might be a confounder, while skills learned during training might be a mediator.

If the target is training's total effect, holding newly acquired skills fixed removes part of the effect we wanted to measure. The resulting comparison concerns a different question. An observed variable is therefore not automatically a good control because it predicts earnings well. Ask when it was measured, why it is related to treatment and whether it is itself changed by treatment. The causal mechanism comes before the choice of regressors.

In this graph, X is training, Y is earnings and M is acquired skills. Training has a direct earnings route and a route through skills. Toggle conditioning on skills. The mediated route closes, while the direct route remains. This illustrates why the total-effect question and a skills-held-fixed question differ. Identifying a direct effect additionally requires adequate control of mediator–outcome confounding; merely including the mediator does not provide that guarantee.

Confounder: a prior common influence

Mediator: part of the effect pathway

### 28. Why a collider can be a bad control

Selection into a shared consequence can create a relationship.

A collider is a variable caused by two other variables. Imagine scholarship selection depending on both academic preparation and financial need. Among scholarship recipients, a student with less preparation may need greater financial need to qualify. Conditioning on selection can create an association between the two causes even if they were unrelated in the wider population.

In a regression study, controlling for a similar shared consequence can open an unwanted route between the explanatory variable and the outcome. This is why a longer control list is not automatically more credible. Draw the proposed relationships and explain the selection rule. The word collider names a specific structure, not a general label for any variable you dislike.

The graph makes scholarship selection the common consequence of preparation and financial need. Without selection, the proposed path between those two roots is blocked. Conditioning on scholarship selection opens it. A collider is defined relative to the particular path being traced; it is the meeting point of two arrowheads on that path.

\(\text{Preparation}\rightarrow\text{Selection}\leftarrow\text{Need}\)

### 29. Confounder or mediator?

Try the comparison before opening the explanation.

Training changes skills, and skills change earnings. The target is training's total effect. Should post-training skill automatically be included as a control?

Locate the variable in time. Ask whether it precedes the policy and helps determine it, or is produced by the policy and carries its consequences.

**Practice:** Training changes skills, and skills change earnings. The target is training's total effect. Should post-training skill automatically be included as a control?

### 30. Confounder or mediator?: explanation

Follow the calculation and interpret its units.

No. Skill is a mediator on a causal path from training to earnings. Holding it fixed changes the estimand, meaning the population quantity we want and may introduce other bias. A direct-effect interpretation needs additional assumptions, not merely an added control.

No. Skill is a mediator on a causal path from training to earnings. Holding it fixed changes the estimand, meaning the population quantity we want and may introduce other bias. A direct-effect interpretation needs additional assumptions, not merely an added control.

### 31. Keep the sample fixed

Try the comparison before opening the explanation.

A coefficient changes after adding income, but income is missing for 20% of observations. Why can you not attribute the entire change to controlling for income?

Separate the two changes: adding a regressor changes the comparison, while excluding incomplete records changes which observations contribute.

**Practice:** A coefficient changes after adding income, but income is missing for 20% of observations. Why can you not attribute the entire change to controlling for income?

### 32. Keep the sample fixed: explanation

Follow the calculation and interpret its units.

The comparison changes both the regressors and the estimation sample. Refit the short and long models on the same complete-case sample to isolate the specification change. Then consider whether missingness itself creates selection bias.

The comparison changes both the regressors and the estimation sample. Refit the short and long models on the same complete-case sample to isolate the specification change. Then consider whether missingness itself creates selection bias.

### 33. Interpret a control coefficient cautiously

The variable may be useful without having a causal interpretation.

The coefficient on English-learner share is an adjusted district association. It is measured in score points per percentage-point change in the share, holding the listed regressors fixed. It is not the effect on an individual student of learning English or changing language status.

The staffing study may include this variable to address a possible source of confounding, without trying to identify the causal effect of language composition itself. Not every coefficient in a causal model has the same research status. In a report, identify the policy coefficient of interest and explain the role of supporting controls. This makes the interpretation more useful than presenting a list of significant variables with no target question.

The coefficient on English-learner share is an adjusted district association.

The staffing study may include this variable to address a possible source of confounding, without trying to identify the causal effect of language composition itself.

### 34. Fit and causal validity are different properties

Explaining more variation need not improve the comparison.

R-squared measures the fraction of sample outcome variation accounted for by the fitted model. Adding a regressor cannot reduce ordinary R-squared on an unchanged sample, because OLS can always assign it a zero coefficient. This is a property of the optimisation, not a guarantee that the extra variable belongs in the causal model.

A mediator or selection variable can improve prediction while changing or damaging the intended causal comparison. Conversely, a design with modest R-squared may identify a useful effect if its variation is credible. Evaluate fit, precision and identification as separate questions. Each is useful, but none replaces the others.

\(R^2=1-\dfrac{\sum_i e_i^2}{\sum_i(Y_i-\overline Y)^2}\)

### 35. A useful control plan fits in a short table

Make the assumptions inspectable.

For each proposed control, write a sentence about timing and a sentence about purpose. For prior income, explain why it might influence both staffing and scores. For current attendance, ask whether staffing could already have affected it. For a test-based funding rule, ask whether selection creates additional relationships.

This exercise reveals disagreements about the economic model before they become disagreements about software. Two analysts may estimate the same equation while intending different effects. A clear control plan helps them discover that difference. It also makes the limitations of an observational study easier for a policymaker to assess.

For each proposed control, write a sentence about timing and a sentence about purpose.

This exercise reveals disagreements about the economic model before they become disagreements about software.

### 36. Use the design to decide what data to collect next

More variables are useful when they address a named problem.

If earlier learning difficulties drive teacher recruitment, prior outcome measurements may be useful. If unobserved stable district features are the main concern, repeated observations could help compare changes within a district. If policy assignment remains related to changing unobserved needs, a more credible source of assignment may be required.

These suggestions follow from different explanations of the error term. Do not collect a long list of convenient variables and hope one solves the problem. Start with the mechanism that threatens the comparison, then explain how the new data would help. Later panel-data and instrumental-variable lessons will develop two of these strategies in detail.

If earlier learning difficulties drive teacher recruitment, prior outcome measurements may be useful.

These suggestions follow from different explanations of the error term.

### 37. Write the result as an empirical argument

A coefficient is one part of the explanation.

A useful report starts with the staffing question and identifies a district as the observation. It then compares the short and adjusted slopes, keeping their units explicit. Explain the omitted-variable calculation and the reason each control was included. End with a specific remaining threat and a suitable next step.

Avoid saying that the model 'controls for everything'. Instead state exactly what was measured. Readers can then assess the remaining assumptions. This style of reporting is useful for a policy memo, a thesis application or a replication exercise because it connects the statistical result to the decision the analysis was intended to inform.

A useful report starts with the staffing question and identifies a district as the observation.

Avoid saying that the model 'controls for everything'.

### 38. Check the two requirements for omitted-variable bias

A left-out factor must matter in both relationships.

If Z does not affect Y in the longer model, its omitted-effect coefficient is zero and the product vanishes. If Z is unrelated to X in the relevant auxiliary relationship, its auxiliary slope is zero and the product also vanishes. A variable's absence alone does not prove bias.

Explain these two cases using an economic example. Then explain why a variable related to X but measured after treatment may create a different problem when included. This combines the algebraic condition with the control-selection reasoning. The goal is to choose and defend a comparison, rather than treat every added regressor as an improvement.

If Z does not affect Y in the longer model, its omitted-effect coefficient is zero and the product vanishes.

Explain these two cases using an economic example.

### 39. DAG practice: preserve the intended effect

Trace the routes before choosing a control.

Training can affect earnings directly and through acquired skills. The target is the total effect of training. Use the diagram to explain what conditioning on acquired skills removes. Does the graph alone guarantee that an adjusted regression identifies a direct effect?

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** Training can affect earnings directly and through acquired skills. The target is the total effect of training. Use the diagram to explain what conditioning on acquired skills removes. Does the graph alone guarantee that an adjusted regression identifies a direct effect?

### 40. DAG practice: preserve the intended effect: explanation

Explain what conditioning changes in this stated graph.

Conditioning on skills closes the route \(X\rightarrow M\rightarrow Y\), removing a mechanism included in the total-effect question. The direct route \(X\rightarrow Y\) remains in the diagram. A skills-held-fixed comparison therefore concerns a different target.

A direct-effect estimate also needs suitable assumptions about treatment assignment, mediator–outcome confounding, intervention meaning, support and the fitted model. Adding a post-training mediator is not, by itself, evidence that these conditions hold. Start with the intended effect, then justify the control choice.

Conditioning on skills closes the route \(X\rightarrow M\rightarrow Y\), removing a mechanism included in the total-effect question. The direct route \(X\rightarrow Y\) remains in the diagram. A skills-held-fixed comparison therefore concerns a different target. A direct-effect estimate also needs suitable assumptions about treatment assignment, mediator–outcome confounding, intervention meaning, support and the fitted model. Adding a post-training mediator is not, by itself, evidence that these conditions hold. Start with the intended effect, then justify the control choice.

