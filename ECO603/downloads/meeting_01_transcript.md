# 01. Economic questions and data

## 01. Do smaller classes improve learning?

Compare districts. Then ask what else differs.

Imagine advising an education ministry that can afford to hire more teachers. The ministry wants to know whether this would help students learn more. To answer, we need to compare what would happen with the extra teachers with what would happen without them. A question about the effect of changing a policy is a causal question.

We will start with school districts in California. A school district is a local body that manages a group of public schools. For each district, we observe an average test score and a student–teacher ratio. This ratio is the number of students divided by the number of teachers. A ratio of 20 means 20 students per teacher across the district. It does not mean every classroom contains exactly 20 students.

Each dot in the graph represents one district. If districts with fewer students per teacher also have higher scores, the two measures have an association: they vary together in the observed data. Our task is to find out how much this comparison can tell the ministry. First predict the pattern in the dots. Then select Next step to show the fitted line, a straight line chosen to summarise that pattern. A line's slope tells us how much its height changes when we move one unit to the right.

**Practice:** Do you expect the line to slope upward or downward? Name one other district characteristic that could help explain the pattern.

**Explanation:** A downward slope is plausible: districts with more students per teacher may have lower scores. Family resources could also matter. For example, districts serving richer families may have both more teachers and higher scores. The graph lets us check the observed pattern; it does not yet isolate the effect of hiring teachers.

## 02. Which question are we answering?

The same data can describe a pattern, predict an outcome or help study a policy effect.

The ministry's question concerns a policy change, but the graph compares districts as they are. To see why this matters, separate three tasks we can do with data. Description reports the pattern we observe: districts with lower student–teacher ratios tend to have higher scores. Prediction uses information about a district to estimate a score we have not yet observed. Causal analysis asks what would happen if we changed staffing.

A useful prediction does not always answer the causal question. For example, average family income may help predict district scores and identify where extra learning support may be needed. To choose a staffing policy, we need a further piece of information: how scores would change when the number of teachers changes. A prediction of existing differences does not by itself provide that answer.

The outcome is the measure we want to explain or predict, here a test score. Throughout the course, a variable means a characteristic that can take different values, such as income, staffing or test score. Before choosing a statistical method, state what you want to learn about those variables. For this study, the description is a starting point. The final goal is to learn what hiring teachers would do to learning, and whether that gain would justify the cost.

Description: how do observed districts differ?

Prediction: how well can we forecast a new outcome?

Causation: what changes when the policy changes?

## 03. Define the observation before the equation

One observation is one district; define the variables and their units.

Before writing an equation, decide what one row in the dataset represents. This is the unit of observation. Here it is a school district. We have 420 observations, so we write n=420, where n is the number of observations. We do not have one observation for every student or every classroom.

Let i identify a district. Write \(Y_i\) for its average test score, measured in score points, and \(X_i\) for its student–teacher ratio. Y is the outcome: the variable we want to explain. X is an explanatory variable, also called a regressor: a variable used to explain differences in the outcome. The subscript i simply tells us which district's values we are using.

The population is the full set of units we want to understand; the sample is the set we observe. Our 420 districts form the observed sample, and we must decide which wider population, if any, they represent. This dataset is a cross section because it compares different districts for one study period. A time series follows a unit over time. A panel follows the same identifiable units repeatedly, such as these districts each year. These different structures will give us different comparisons later in the course.

\(i\): school district

\(Y_i\): average score, in points

\(X_i\): students per teacher

\(n=420\) districts

**Practice:** Would ten years of the same 420 districts form a panel? Would ten different districts observed each year necessarily do so?

**Explanation:** The first is a panel if district identities are tracked. The second may be repeated cross sections; the calendar alone does not create within-unit observations.

## 04. Start with a rule for how the outcome is produced

A causal model states mechanisms before asking what would change.

Imagine a district in which staffing and learning follow two simple rules. X is students per teacher. C is a prior support index, V is another staffing input, and U is another learning input. The staffing rule is X equals 22 minus C plus V. The score rule is Y equals 700 minus twice X plus five times C plus U. These are assumed teaching rules, not estimates from the California data.

Calling these structural equations means that we interpret them as mechanisms that continue to operate when another mechanism is changed. A complete model also describes the background inputs. For this illustration, take C, V and U as independent: learning one of them gives no information about the others. The same support index nevertheless affects both staffing and scores. For a district with C equal to two, V equal to two and U equal to three, the rules produce X equal to 22 and a score of 669.

Staffing: \(X=22-C+V\)

Learning: \(Y=700-2X+5C+U\)

\(C=2,V=2,U=3\Rightarrow X=22,Y=669\)

## 05. Define the intervention before its counterfactual

Change the staffing rule; retain the stated learning mechanism.

Now specify a policy: hire enough teachers to set this district's ratio to 20, with enrollment and the relevant teacher characteristics held fixed. In our teaching model, this intervention replaces the staffing rule by X equals 20. It leaves the score rule and this district's background inputs unchanged. Substitution gives a score of 673, four points above 669.

A counterfactual is the outcome generated by this alternative intervention for the same district and background circumstances. It is a consequence of the stated causal model. Selecting districts whose observed ratio happens to be 20 is a different operation: their support and learning inputs can differ. Nor does the phrase smaller classes fully define a real policy. Hiring teachers and moving pupils can achieve the same ratio through different mechanisms. Our intervention needs to specify which implementation is intended.

Intervene: replace the assignment rule by \(X=20\)

Alternative score: \(700-2(20)+5(2)+3=673\)

Same-district difference: \(673-669=4\) points

## 06. The comparison we want is partly missing

A policy effect compares potential outcomes under two staffing choices.

We can now name the two outcomes without leaving their meaning implicit. For district i, Y subscript i of 20 is its score under the teacher-hiring intervention that sets the ratio to 20. Y subscript i of 22 is its score under the corresponding ratio-22 intervention. These are potential outcomes. Their difference is this district's causal effect for the specified period and implementations. The teaching model made that difference calculable because we supplied all its rules and inputs.

In real data, we observe one staffing implementation and its resulting score. The other potential outcome is missing. Consistency is the assumption linking the observed score to the potential outcome under the intervention actually received; it requires that the recorded policy match the defined implementation. If extra teachers are taken from a neighboring district, that spillover must also be represented rather than silently ignored. Comparing other districts can help estimate the missing comparison only with an argument about assignment and comparability. Random assignment allocates the specified policy by chance; observational data record choices made by others.

Potential outcomes: \(Y_i(20),Y_i(22)\)

Causal contrast: \(Y_i(20)-Y_i(22)\)

Observed groups do not automatically supply the missing outcome.

## 07. Read the data before fitting a line

Start with axes, units, range and unusual observations.

The counterfactual is missing, so our first step is to understand the observations we do have. This graph is a scatterplot: it places one dot at each district's pair of X and Y values. Moving right means more students per teacher. Moving up means a higher score. The vertical scale is in score points, not percentages.

Look at the dots before showing the line. Do districts with higher ratios generally have lower scores? Then look at districts with similar ratios. Their scores still differ. A line can summarise an average pattern without predicting every district perfectly. The differences around it give us a reason to look for other factors that matter for learning.

The range of the data also limits what we can learn. The observed ratios run from about 14 to 26. Using a line from these data to predict scores at a ratio of two would be extrapolation: extending a relationship beyond the values we have observed. A prediction inside the observed range still needs care, but a prediction far outside it requires an especially strong argument. Keep that range in mind as we discuss a realistic change from 22 to 20.

**Practice:** Districts at about the same student–teacher ratio have different scores. Does this prevent a line from describing their average pattern?

**Explanation:** No. A line can summarise the average pattern even when individual districts lie above and below it. Those differences tell us that staffing alone does not fully explain scores.

## 08. Use a DAG to make the causal story visible

Begin with assumptions about arrows before choosing controls.

The two mechanisms can also be drawn. A node is a variable: X represents staffing, Y the score and C prior support. An arrow from C to X says that support enters the staffing mechanism. An arrow from C to Y says that support also enters the learning mechanism. The arrow from X to Y represents the proposed staffing effect. An absent arrow is an assumption that there is no additional direct mechanism between those variables in this model.

This is a directed acyclic graph, abbreviated DAG. Directed means that arrows have a direction. Acyclic means that following arrow directions cannot return to the same node. The diagram summarizes an assumed causal structure; it is not proof obtained from a scatterplot. Unshown background inputs still exist. Here they are taken to be independent, so they do not create an additional shared cause. Later we will use dated nodes to represent feedback without drawing a cycle.

Node: a variable; arrow: a proposed direct causal mechanism.

Directed: arrows have a direction. Acyclic: no directed loop.

Missing arrows and independent background inputs are assumptions.

## 09. Trace a path one connection at a time

A causal route follows arrows; a general path need not.

A path is a sequence of distinct connected nodes. First trace X to Y along the direct arrow. Next trace X back to C and then forward to Y. Both are paths, even though the second traversal goes against the first arrow. Only the first is a directed causal path from staffing to scores.

The second route begins with an arrow pointing into X. We call a path with that beginning a backdoor path. Here C is a common cause of X and Y. Districts with different staffing can therefore have different support even before the staffing mechanism affects learning. Confounding means that such an alternative source of outcome differences contaminates the proposed causal comparison. The distinction is visible before any coefficient is calculated.

Causal route: \(X\rightarrow Y\)

Backdoor route: \(X\leftarrow C\rightarrow Y\)

## 10. A common cause creates a backdoor comparison

Compare districts with similar prior background.

Suppose we compare districts at the same prior-support value. This is conditioning on C: restrict the comparison to a fixed value or account for it in a model. It changes which districts are compared; it does not set anyone's staffing by intervention. Select C in the graph. The common-cause route through C closes, while the staffing-to-score arrow remains.

On this path, C is a non-collider because its two neighboring arrows do not both point into it. Conditioning on a non-collider blocks that path. In the simple graph, holding support fixed closes the only drawn backdoor. A regression that correctly represents the conditional relationship could use that comparison, provided the needed staffing values occur at the support levels being compared. This availability is called overlap or support. The conclusion depends on the graph being adequate, on measuring C appropriately and on the comparison being available in the data.

Compare at fixed \(C\): block \(X\leftarrow C\rightarrow Y\)

Conditioning selects comparisons; intervention changes a mechanism.

## 11. An intermediate mechanism is a mediator

A variable caused by staffing can carry part of its effect.

Keep the school question, but add teacher attention. Suppose staffing changes attention and attention changes scores. Teacher attention is a mediator: an intermediate variable on a directed causal path. The graph also allows a direct staffing route that does not pass through measured attention.

The total effect allows attention to respond to the staffing policy. Select attention as a control and the mediated route closes. A comparison at fixed attention asks a different question. It is not automatically a valid direct-effect estimate: attention may have other causes related to scores, and an intervention that fixes attention needs its own meaning. The practical lesson is to distinguish a prior common cause from a later mechanism before deciding what belongs in a regression.

Mediated route: \(X\rightarrow M\rightarrow Y\)

Total effect allows the mediator to respond.

## 12. Selection can create a relationship

A four-case scholarship example makes the mechanism visible.

Consider a separate, constructed scholarship rule. Preparation and financial need are independent zero-or-one characteristics. Their four combinations are equally likely. A scholarship is awarded when preparation is one or need is one, including when both are one. Before selection, half the applicants have need, whether preparation is zero or one.

Now keep scholarship recipients only. The zero-preparation, zero-need case disappears. Among recipients with zero preparation, everyone has need. Among recipients with preparation one, only half have need. Preparation and need have become associated in the selected sample even though neither causes the other. We can see the reason by listing the four cases before giving the pattern its technical name.

Equally likely \((P,N)\): \((0,0),(0,1),(1,0),(1,1)\)

Award if \(P=1\) or \(N=1\); exclude only \((0,0)\)

Among recipients: \(\Pr(N=1\mid P=0)=1\), \(\Pr(N=1\mid P=1)=1/2\)

## 13. A shared consequence behaves differently

Conditioning can open a route that was blocked.

The scholarship diagram names the pattern we just calculated. Preparation and need both point into scholarship selection. On the path joining those two causes, selection is a collider: the two arrowheads meet at the same interior node. A collider blocks the path when we do not condition on it or select information about its consequences. This is why the unselected graph does not connect the two independent causes through selection.

Select scholarship selection in the diagram. The path opens, matching the relationship among recipients in the four-case example. Conditioning on a shared consequence can therefore create an association rather than remove one. Collider is a role on a particular path, not a permanent label that a variable carries on every path. An open path allows dependence; it does not guarantee a nonzero observed correlation for every possible numerical model.

Collider: \(P\rightarrow S\leftarrow N\)

Unconditioned collider blocks; selecting recipients opens the path.

## 14. Selecting a consequence can also open the route

A descendant is reached by following arrows forward.

Suppose scholarship status determines whether a usable award record exists. The record indicator is a descendant of scholarship selection: following an arrow forward from selection reaches the record. Add this fourth node to the previous diagram. We still want the relationship between preparation and need.

Select the record indicator rather than scholarship status. Information about a consequence of the collider can also open the path. For example, observing an award record may strongly reveal that an applicant received a scholarship. The same selection logic then applies indirectly. The general rule is to check both a collider and its descendants. Compare this with the earlier common-cause example: conditioning on a non-collider blocks its path, while conditioning on a collider or descendant can open a previously blocked route.

\(P\rightarrow S\leftarrow N\), with \(S\rightarrow R\)

Conditioning on a collider descendant can open its path.

## 15. Why the observed groups might differ

A confounder is another factor related to both staffing and scores.

What could explain the score differences around the line? Consider the share of students who are English learners. This means students developing their English skills. Write Z for this share. It is measured as a percentage, so a district with 15 English learners out of 100 students has Z=15. A change from 15% to 16% is one percentage point.

Suppose language composition is related both to staffing decisions and to measured scores. It would then be a possible confounder: another factor that helps explain the association between X and Y. For example, districts with greater learning needs might recruit extra teachers, while those needs also affect scores. The direction of the resulting distortion depends on how staffing and those needs are related; the diagram alone does not determine it.

The arrows express this proposed explanation. An arrow from Z to X says language composition may influence staffing; an arrow from Z to Y says it may influence scores. Together, X←Z→Y gives an alternative route linking X and Y. To control for Z means to account for observed differences in Z when comparing ratios and scores. This motivates our next model: compare districts at the same measured language composition, while recognising that other differences may remain.

\(Z\): English-learner share, in percent

Possible confounder: related to staffing and scores

\(X\leftarrow Z\rightarrow Y\): an alternative explanation

## 16. An intervention graph changes a different object

The policy removes incoming staffing arrows rather than selecting a subgroup.

Return to staffing. In the observed-data graph, prior support helps determine staffing. In the intervention graph shown here, the policy sets staffing to a specified value, so support no longer determines it. That incoming arrow has been removed. Support continues to affect learning, and staffing can still affect learning through its retained mechanism.

This operation corresponds to replacing the staffing equation in our numerical model. It differs from conditioning on support, which compares observed districts with the same support, and from conditioning on staffing, which selects districts with a particular observed ratio. The graph and the numerical model now tell the same story. Before using a counterfactual later in the course, we will specify the intervention, the mechanisms allowed to respond and the assumptions used to estimate its missing outcome.

Intervention: replace the assignment mechanism.

Conditioning: compare within an observed subgroup.

## 17. Law and order: identify the conviction comparison

A useful adjustment closes every drawn backdoor route.

Let conviction probability C be the explanatory variable and criminal time Y the outcome. Enforcement intensity E influences both conviction and arrest probability A, while arrest also affects criminal time. Unobserved background U affects enforcement, arrest and criminal time. These arrows adapt the law-and-order model from the earlier ECO603 lectures.

Before changing a control, trace every route from conviction to criminal time that starts by moving backward to enforcement. One runs through arrest. Another runs backward again to background and then forward to the outcome. Conditioning on enforcement blocks these routes at the same observed variable. The direct conviction-to-criminal-time route remains open.

Use the checkbox to compare the diagram before and after adjustment. Under this stated graph, enforcement is an adjustment set: a collection of variables used to close the relevant backdoor paths. Whether the real application satisfies this graph remains an economic question. The exercise teaches how to translate a specific causal story into a defensible comparison.

Target: \(\text{conviction probability}\rightarrow\text{criminal time}\)

Ask which variable closes every backdoor route.

## 18. Changing the target can change the required controls

The arrest comparison still has an unobserved route.

Keep the same model but make arrest probability the explanatory variable. Enforcement is already held fixed in this diagram. That closes the enforcement-based routes, yet unobserved background still affects both arrest and criminal time directly. The arrest-to-background-to-outcome backdoor remains open.

This is why a control set is tied to a target comparison. A variable that was sufficient for the conviction question need not be sufficient for the arrest question. The dashed background box also reminds us that naming a necessary control does not make it observed. We may need another design or better measurements rather than another command in the same dataset.

Compare the two diagrams and explain the remaining route in words. We will use the same habit with school staffing, traffic laws, panel comparisons and instruments: specify the proposed cause, trace the alternatives, and state which assumptions or data close them. A regression coefficient is useful only when its comparison is clear.

Remaining route: \(A\leftarrow U\rightarrow Y\)

A control plan is specific to the chosen explanatory variable.

## 19. Make the first regression model explicit

Define the regression equation, its coefficients and the error term.

We now turn from a causal model to a statistical description of district scores. A regressor is a variable used to explain or predict an outcome. Our first regressor is the student–teacher ratio X; the outcome Y is the district score. In the population equation, beta zero is an intercept and beta one is a slope. The error u collects the outcome variation outside that specified line.

If the mean error is zero at every X, the line describes the conditional mean: the average score among districts at that ratio. This is an assumption about the population, not a consequence of fitting a line. A causal interpretation needs the additional intervention and assignment argument developed above. Estimation means choosing coefficient values using the sample data. The sample fit uses these estimated coefficients, written with hats, and gives a fitted score for each district. A residual is its observed score minus that fitted score; unlike the population error, we can calculate it after estimation.

Population: \(Y_i=\beta_0+\beta_1X_i+u_i\)

Conditional-mean assumption: \(E(u_i\mid X_i)=0\)

Fit: \(\widehat Y_i=\widehat\beta_0+\widehat\beta_1X_i\); residual: \(e_i=Y_i-\widehat Y_i\)

## 20. A slope is a change with units

A fitted change equals the slope times the change in the regressor.

The slope now lets us translate a proposed staffing change into a fitted score difference. Use \(\Delta X\) to mean the new ratio minus the old ratio. The Greek letter Δ, read 'delta', means a change. Along a straight line, the fitted score change is \(b_1\)\(\Delta X\).

In the simple regression, which includes one explanatory variable, the estimated slope is -2.280 score points per additional student per teacher. Reducing the ratio from 22 to 20 gives \(\Delta X\)=20−22=−2. Multiplying a negative slope by this negative change gives a positive fitted difference: about 4.56 score points. We are moving left and up along the fitted line.

Check the units as well as the sign. The result is in district score points, not percentages, and it compares two values on the line. Whether a staffing policy would cause this gain is the research-design question we discussed earlier. For now, make sure you can translate the proposed change correctly. After the break, we will examine how the data determine the line itself.

\(\Delta X=\text{new ratio}-\text{old ratio}\)

\(22\rightarrow20\) gives \(\Delta X=-2\)

Fitted change: \(b_1\Delta X\approx+4.56\) score points

**Practice:** Use the same slope to calculate the fitted score change when the ratio rises from 20 to 23.

**Explanation:** The change in the ratio is +3. The fitted score change is 3×(−2.279808), about −6.84 score points. Moving right along the downward-sloping line lowers its fitted score.

## 21. Choose a line by its errors

OLS chooses the line with the smallest sum of squared residuals.

We have used a fitted line, but many different lines could pass through the graph. Ordinary least squares, abbreviated OLS, chooses the line with the smallest sum of squared residuals. Recall that a residual is the vertical difference between an observed score and the line's fitted score. Squaring makes each contribution nonnegative, so an overprediction cannot cancel an underprediction.

The sum of squared residuals is the loss we are trying to minimise. The graph calls it SSE, for sum of squared errors; here those 'errors' mean the calculated residuals. A larger miss receives more weight because it is squared. For example, a residual of four points contributes 16 to the loss, while a residual of two contributes four.

Move the slope control to compare candidate lines. Each line passes through the sample mean point: the average ratio and average score. The displayed loss uses all 420 districts. Try a flat line, then a steep downward line, and find where the loss is smallest. This exercise shows how OLS chooses its coefficients. Next we will follow one district's residual to see exactly what enters that calculation.

## 22. Follow one residual

For one district, compare the observed score with the score on the line.

Choose one district with the graph control. Its dot is the observed score. To find its fitted score, move vertically to the line while keeping the same ratio on the horizontal axis. The distance from the fitted score to the observed score is the residual introduced in our equation.

Predict its sign before revealing the segment. A dot above the line has a positive residual because the observed score is higher than the fit. A dot below the line has a negative residual. For example, an observed score of 670 and a fitted score of 665 give a residual of +5 points. Its squared contribution to the OLS loss is 25 squared score points. These numbers illustrate the calculation; the plotted district uses its actual data.

Now choose another district and repeat the steps. The same rule applies to every dot, and OLS adds all the squared contributions. This connects the graph to the formula \(e_i\)=\(Y_i\)−\(\widehat Y_i\). It also shows why a residual is a prediction difference for one observation, rather than the effect of changing staffing. We can now ask how all the observations combine to determine the slope.

## 23. Calculate the OLS slope from the data

Compare each variable with its average, then combine the deviations.

To combine the observations, first compare each variable with its sample average. Write \(\overline X\) for the average ratio and \(\overline Y\) for the average score; the bar means 'sample average'. The expression \(X_i\)−\(\overline X\) is a deviation from the mean: how far district i's ratio lies above or below the average. Define the score deviation in the same way.

The slope formula adds the cross-products (\(X_i\)−\(\overline X\))(\(Y_i\)−\(\overline Y\)) and divides by the sum of squared ratio deviations. A cross-product here is simply the product of the two deviations. A district above the average ratio but below the average score contributes a negative product. If such combinations dominate, the fitted slope is negative. The symbol \(\sum\) means to add across all districts.

The denominator measures the variation available in X. If every district had the same ratio, it would be zero: we would have no comparison from which to estimate a slope. When it is positive, the ratio of these two sums gives \(b_1\). Then \(b_0\)=\(\overline Y\)−\(b_1\)\(\overline X\) chooses the intercept so the line passes through the sample mean point. The next small example lets us check these steps without using software.

\(b_1=\dfrac{\sum_i(X_i-\overline X)(Y_i-\overline Y)}{\sum_i(X_i-\overline X)^2}\)

\(b_0=\overline Y-b_1\overline X\)

Without regressor variation, the slope cannot be separately estimated.

## 24. A small calculation you can finish

Use three constructed districts to see the formula work.

Use three constructed districts with ratios 18, 20 and 22 and scores 680, 670 and 650. These are teaching numbers, not three selected observations from the actual dataset. We know how to fit a line from the previous slide, so work through each sum before revealing the answer.

The average ratio is 20 and the average score is 666⅔. Ratio deviations are therefore −2, 0 and +2. Multiply each by its corresponding score deviation and add: the numerator is −60. Square and add the ratio deviations: the denominator is 8. This gives \(b_1\)=−60/8=−7.5, and \(b_0\)=666⅔−(−7.5×20)=816⅔. The intercept follows from the formula; it does not describe a realistic district with no students per teacher.

Insert each ratio into this fitted equation and subtract its fitted score from the observed score. Check that the residuals sum to zero. This is a property of OLS when the model includes an intercept. It checks the calculation, but it does not test the population assumption that the error averages to zero at each X. Having checked the method, we can return to the real districts and add the language-composition variable.

**Practice:** Find the slope, intercept, fitted scores and residuals for X=(18,20,22) and Y=(680,670,650).

**Explanation:** \(b_1\)=−7.5 and \(b_0\)=816⅔. Fitted scores are 681⅔, 666⅔ and 651⅔. Residuals are −1⅔, +3⅓ and −1⅔, which sum to zero. Small differences from rounding are acceptable.

## 25. Holding an observed factor fixed

Multiple regression compares ratios and scores at a fixed value of another variable.

Our first line used only the staffing ratio. We now add Zᵢ, the percentage of English learners, to the model. This is multiple regression: a regression with more than one explanatory variable. Its fitted equation is \(\widehat Y_i\)=\(b_0\)+\(b_1\)\(X_i\)+\(b_2\)Zᵢ. The new coefficient \(b_2\) gives the fitted score difference for one percentage-point increase in Z, keeping X fixed.

The staffing coefficient \(b_1\) now answers a more specific descriptive question. How do fitted scores differ with the ratio when we compare districts at the same Z? This is what 'holding Z fixed' means in this equation. The word adjusted refers to this accounting for Z. We are changing the comparison, rather than physically changing a district's students or teachers.

Select Next step to compare the simple and adjusted lines. For the adjusted line we hold Z at its sample average. Both lines use the same 420 districts, so any change in their slopes comes from adding Z, not from comparing different samples. Notice whether the line becomes steeper or flatter. The next slide translates that change into the staffing comparison we used earlier.

\(\widehat Y_i=b_0+b_1X_i+b_2Z_i\)

\(b_1\): staffing slope at fixed \(Z\)

The graph fixes language share at its sample average.

## 26. Explain why the estimated slope changed

Adding Z changes the fitted comparison from about +4.56 to +2.20 score points.

The staffing slope changes from about -2.28 in the simple regression to -1.10 after adding the English-learner share. The adjusted line is flatter. Moving from a ratio of 22 to 20 gives about 4.56 fitted score points on the first line and 2.20 points on the adjusted line. These two numbers describe different comparisons in the same data.

Why might accounting for Z change the slope? If districts at different ratios also have different language composition, the first line combines both differences. The second model tries to separate their fitted relationships with scores. This is why we examined a possible confounder before adding a variable: the control should have a reason connected to the research question.

The second number is not automatically the causal gain from hiring teachers. Family resources and staffing responses to students' needs could still affect the comparison. The useful conclusion at this stage is more specific: one measured district characteristic changes the estimated staffing relationship substantially. Write the two comparisons in words. After the break, we will run the commands and read the numerical evidence behind the graph.

**Practice:** Report the two fitted score differences for 22 → 20 students per teacher. Explain why they need not be the same.

**Explanation:** The simple model gives about +4.56 points. The adjusted model gives about +2.20 points while holding English-learner share fixed. The first comparison also reflects observed differences in language composition across districts; the second accounts for those differences within its stated model.

## 27. Inspect variables before running the model

Check the data, then use a saved do-file to reproduce the estimates.

Before fitting the model, inspect what each column records. summarize reports the number of nonmissing observations, the mean, the standard deviation, and the smallest and largest values. The mean is the arithmetic average. The standard deviation describes how far values typically spread around that mean, in the variable's own units. It describes differences across districts, not uncertainty about a regression coefficient.

Check that score is a score in points, str is students per teacher and el is a percentage rather than a fraction. Then run the first regression. regress names the outcome first and the regressors afterward. This lesson focuses on the coefficients; uncertainty options and the other regression columns will receive a systematic introduction in Meeting 04.

Check observation counts, units, ranges and missing values.

Outcome first; regressors afterward.

## 28. Read a genuine Stata result

Read the coefficient, SE, test and interval in a real Stata table.

Stata has fitted the score line to the 420 districts. To focus on what we have learned, this display reports only the fitted coefficients. The command matrix list prints a rectangular table of numbers; e(b) is Stata's stored coefficient table. The column str refers to students per teacher. Its coefficient is minus 2.279808 score points per additional student per teacher. The _cons column is the intercept.

For a two-student reduction, the regressor change is minus two. Multiplying it by the slope gives about 4.56 additional fitted score points. This compares two locations on the fitted line, not the two potential outcomes of the same district. The complete regression output is available in the download. We introduce its uncertainty columns in Meeting 04, after explaining what repeated-sample uncertainty means.

\(\widehat\beta_1=-2.279808\) points per student per teacher

Fitted contrast: \((-2)(-2.279808)=4.559616\) points

```text
. quietly regress score str

. matrix list e(b), format(%10.6f)

e(b)[1,2]
           str       _cons
y1   -2.279808  698.932953
```

## 29. Calculate the policy-sized fitted difference

lincom translates a slope into the particular comparison we want.

A policy reader usually cares about a feasible staffing change rather than a one-unit coefficient. The proposed change from 22 to 20 students per teacher is minus two units. Stata evaluates minus twice the staffing coefficient and obtains 4.559616 score points.

The sign is positive because both the slope and the proposed ratio change are negative. The intercept cancels when two fitted scores from the same line are subtracted. Compare this fitted difference with the four-point causal effect in our earlier teaching model. They answer different questions: one comes from an observed-data fit, while the other follows from specified causal mechanisms. Numerical similarity would not establish that they have the same interpretation.

\(\Delta X=20-22=-2\)

\(\Delta\widehat Y=\widehat\beta_1\Delta X=4.559616\) points

```text
. display %10.6f -2*_b[str]
  4.559617
```

## 30. Read the adjusted regression

Read both coefficients with their units and the stated comparison.

The longer fit includes English-learner share, called el in Stata. This variable is measured in percentage points. The staffing coefficient is now minus 1.101296, so the fitted two-student contrast is about 2.20 score points at a fixed language share. The language coefficient describes the fitted score difference for a one-percentage-point language-share difference at fixed staffing.

Both models use the same 420 districts. The coefficient movement therefore reflects a changed comparison rather than a changed sample. Multiple regression describes how one regressor is associated with the outcome after the included others are accounted for in the specified form. It does not guarantee that language share captures all prior learning needs or that the staffing contrast is causal. The next meeting derives exactly how an omitted variable can move a coefficient.

Adjusted staffing slope: \(-1.101296\)

At fixed language share: \((-2)(-1.101296)=2.202592\) points

```text
. quietly regress score str el

. matrix list e(b), format(%10.6f)

e(b)[1,3]
           str          el       _cons
y1   -1.101296   -0.649777  686.032250
```

## 31. Attempt the adjusted policy contrast

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

## 32. Would the result apply in a new setting?

Check credibility in the original setting and relevance to the new one.

Suppose the ministry now asks whether this California comparison should guide staffing in another country. The answer requires two separate checks. Internal validity asks whether a study identifies the claimed causal effect in its own setting. Identification means that the data and stated assumptions allow us to learn the effect we want, rather than a mixture of that effect and other influences.

External validity asks whether the result applies to the population and policy we now care about. Even a well-identified effect in California may differ elsewhere because class organisation, language needs, teacher training or starting ratios differ. A result must first be credible in its original setting before we ask how well it transfers, but credibility alone does not guarantee transfer.

Use these checks to propose a local study. Specify which schools we would study, what staffing change we would evaluate and how we would measure learning. Then explain what comparison could tell us what would have happened without the change. A concrete plan is more useful than assuming a precise effect from elsewhere must apply locally. This brings us back to the ministry's decision rather than leaving the analysis at a regression table.

**Practice:** Propose a local staffing study. Name the schools or districts, policy change, learning measure, comparison and main concern.

**Explanation:** For example, study school-level learning gains after a funded reduction in the staffing ratio. Compare funded schools with schools whose lack of funding gives a credible estimate of what would otherwise have happened. If struggling schools are selected for funding, the comparison must address their different expected progress.

## 33. Diagnose the claim

A test of the slope and a credible policy comparison answer different questions.

Consider this proposed recommendation: 'The staffing slope is statistically significant, so reducing class sizes will improve scores by exactly the fitted amount.' We now have the tools to evaluate each part of that sentence. The test gives evidence against a zero population slope under the model's assumptions. It does not test whether staffing choices are free from other influences on learning.

The diagram makes the remaining issue concrete. If language composition, family resources or learning needs connect staffing and scores, a sample association can reflect those connections. An estimate of sampling uncertainty tells us how the estimate might vary across comparable samples. It does not tell us whether the comparison separates the policy effect from those other influences. Repeating the same flawed comparison more precisely does not solve that problem.

Rewrite the recommendation using the evidence we have. Name the fitted comparison and give its units, then state the specific reason it may differ from a staffing effect. This is stronger than simply writing 'association is not causation': it shows that you understand the mechanism behind the concern. The final task is to decide what evidence would address it.

**Practice:** Rewrite: 'Significant slope proves that smaller classes cause higher scores.'

**Explanation:** Districts with lower student–teacher ratios have higher fitted scores in these data. A causal staffing effect would require a defensible comparison addressing factors such as family resources and staffing responses to student needs.

## 34. What would convince you next?

Choose new data or a new comparison to address a specific concern.

Suppose you can improve the study in one way. Adding more districts could make the estimated slope more precise. Precision means that estimates vary less across comparable samples, which is usually reflected in smaller SEs. But more observations do not by themselves explain why districts chose different staffing levels.

If that choice is the main concern, a staffing offer allocated by chance could provide more useful evidence about the policy effect. A natural experiment is another possibility: an outside event or rule creates a comparison that can be argued to resemble random assignment. For example, an unexpected funding rule might alter teacher recruitment for some schools. We would still need to explain why the rule was unrelated to other changes in learning and whether it affected scores through other routes.

Choose an improvement by asking which concern it addresses. Better measurement can help us account for a relevant district difference. More districts can improve precision. A credible assignment rule can help identify a policy effect. These improvements may work together, but they do different jobs. Keeping those jobs separate will guide our model choices throughout the course.

**Practice:** Compare adding more districts with allocating a staffing offer by chance. What can each improve?

**Explanation:** More districts can improve precision if the sampling conditions are suitable. Chance allocation can support a causal comparison by making the offer unrelated to other factors before the policy. We must still check whether the offer was implemented and whether the groups were affected by other differences.

## 35. DAG practice: conviction and arrest

Trace the routes before choosing a control.

In the law-and-order model, hold enforcement fixed. Which backdoor route from arrest probability to criminal time remains open? Explain why the same enforcement adjustment can be enough for the drawn conviction comparison but insufficient for arrest.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** In the law-and-order model, hold enforcement fixed. Which backdoor route from arrest probability to criminal time remains open? Explain why the same enforcement adjustment can be enough for the drawn conviction comparison but insufficient for arrest.

## 36. DAG practice: conviction and arrest: explanation

Explain what conditioning changes in this stated graph.

For arrest, the route \(A\leftarrow U\rightarrow Y\) remains open because unobserved background affects both arrest probability and criminal time. Holding enforcement fixed does not block that route.

For conviction, every drawn backdoor starts through enforcement, so conditioning on enforcement blocks those routes in this stated graph. The result is specific to the chosen explanatory variable and assumed arrows. If the real conviction process had another unmeasured parent affecting the outcome, that control set could also be insufficient.

For arrest, the route \(A\leftarrow U\rightarrow Y\) remains open because unobserved background affects both arrest probability and criminal time. Holding enforcement fixed does not block that route. For conviction, every drawn backdoor starts through enforcement, so conditioning on enforcement blocks those routes in this stated graph. The result is specific to the chosen explanatory variable and assumed arrows. If the real conviction process had another unmeasured parent affecting the outcome, that control set could also be insufficient.

## 37. School staffing: reproduce and explain

Reproduce the evidence, then explain its economic meaning.

Open schools.csv and run meeting_01.do from the Stata bundle. Check the number of districts and the units of score and str. Compare the fitted score change when the ratio falls from 22 to 20 before and after including English-learner share. Write two sentences for a ministry reader: one reporting the magnitudes, and one explaining what comparison would still be needed for a causal claim.

**Practice:** Open schools.csv and run meeting_01.do from the Stata bundle. Check the number of districts and the units of score and str. Compare the fitted score change when the ratio falls from 22 to 20 before and after including English-learner share. Write two sentences for a ministry reader: one reporting the magnitudes, and one explaining what comparison would still be needed for a causal claim.

## 38. School staffing: reproduce and explain: explanation

A reproducible result needs both a calculation and an interpretation.

The file has 420 districts. Score is measured in points and str in students per teacher. A reduction of two students per teacher has a fitted contrast of about +4.56 points in the short regression and +2.20 after adjustment for language composition. Both fits use the same districts, so the movement is a model change.

A suitable ministry statement reports these as adjusted or unadjusted associations. It explains that districts may differ in resources or learning needs that also affect teacher recruitment. A credible intervention comparison would need to address that source of staffing selection. The smaller adjusted estimate does not establish that all remaining selection has been removed.

The file has 420 districts. Score is measured in points and str in students per teacher. A reduction of two students per teacher has a fitted contrast of about +4.56 points in the short regression and +2.20 after adjustment for language composition. Both fits use the same districts, so the movement is a model change. A suitable ministry statement reports these as adjusted or unadjusted associations. It explains that districts may differ in resources or learning needs that also affect teacher recruitment. A credible intervention comparison would need to address that source of staffing selection. The smaller adjusted estimate does not establish that all remaining selection has been removed.

## 39. Exit check: explain one result carefully

Connect the observation, fitted difference, adjustment and policy question.

Return to the ministry's question and explain what we have learned in four sentences. First say what one observation represents and how staffing is measured. Then give the simple model's fitted difference for two fewer students per teacher. Next state how that difference changes after accounting for language composition. Finally, give one specific reason the fitted difference may not equal the policy effect.

Compare answers with a partner. A small rounding difference is an arithmetic detail; confusing score points with percentages changes the meaning. Saying that the adjusted result must be causal because it includes a control is a different and more serious reasoning error. The control changes the comparison in a stated way. Whether it removes the important alternative explanations remains a research-design question.

The next meeting develops this point through omitted-variable bias. An omitted variable is a relevant factor left out of the regression. Bias means that the average estimate across repeated samples differs from the population value we want. If a left-out factor affects scores and is related to staffing, it can systematically distort the staffing estimate. We have already seen the motivation in the two fitted lines; next we will work out the reasoning more fully.

**Practice:** Write the four-sentence report described here.

**Explanation:** One observation is a school district, and staffing is measured as students per teacher. A reduction of two students per teacher gives about +4.56 fitted score points in the simple model. The difference is about +2.20 points after holding English-learner share fixed. Other district differences or staffing responses to learning needs could still prevent either number from measuring the causal gain from hiring teachers.

