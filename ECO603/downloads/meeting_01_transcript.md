# 01. Economic questions, data and causal reasoning

Turn an economic question into a comparison that the data might support.

## Core lesson

### 01. Do smaller classes improve learning?

Compare districts. Then ask what else differs.

Suppose an education ministry can hire more teachers. Would that improve learning? We want to compare the scores the same district would get with and without the extra teachers. That is a causal question because it asks what would change under a policy.

Each dot is one California school district, a local group of public schools. Read its students per teacher on the horizontal axis and its average test score on the vertical axis. A ratio of twenty means twenty students per teacher across the district. Individual classroom sizes can vary.

Predict what the dots will show, then select Next step to reveal the fitted line. It summarises how scores and staffing vary together in these data. This observed relationship is called an association. The line's slope tells us how its height changes when we move one unit to the right. To use that slope for the hiring decision, we first need to understand who is being compared.

**Practice:** Do you expect the line to slope upward or downward? Name one other district characteristic that could help explain the pattern.

**Explanation:** A downward slope is plausible: districts with more students per teacher may have lower scores. Family resources could also matter. For example, districts serving richer families may have both more teachers and higher scores. The graph lets us check the observed pattern; it does not yet isolate the effect of hiring teachers.

### 02. Which question are we answering?

The same data can describe a pattern, predict an outcome or help study a policy effect.

The ministry's question concerns a policy change, but the graph compares districts as they are. To see why this matters, separate three tasks we can do with data. Description reports the pattern we observe: districts with lower student–teacher ratios tend to have higher scores. Prediction uses information about a district to estimate a score we have not yet observed. Causal analysis asks what would happen if we changed staffing.

A useful prediction does not always answer the causal question. For example, average family income may help predict district scores and identify where extra learning support may be needed. To choose a staffing policy, we need a further piece of information: how scores would change when the number of teachers changes. A prediction of existing differences does not by itself provide that answer.

The outcome is the measure we want to explain or predict, here a test score. Throughout the course, a variable means a characteristic that can take different values, such as income, staffing or test score. Before choosing a statistical method, state what you want to learn about those variables. For this study, the description is a starting point. The final goal is to learn what hiring teachers would do to learning, and whether that gain would justify the cost.

Description: how do observed districts differ?

Prediction: how well can we forecast a new outcome?

Causation: what changes when the policy changes?

### 03. Define the observation before the equation

One observation is one district; define the variables and their units.

Before writing an equation, decide what one row in the dataset represents. This is the unit of observation. Here it is a school district. We have 420 observations, so we write n=420, where n is the number of observations. We do not have one observation for every student or every classroom.

Let i identify a district. Write \(Y_i\) for its average test score, measured in score points, and \(X_i\) for its student–teacher ratio. Y is the outcome: the variable we want to explain. X is an explanatory variable, also called a regressor or covariate: a variable used to explain differences in the outcome. The subscript i simply tells us which district's values we are using.

The population is the full set of units we want to understand; the sample is the set we observe. Our 420 districts form the observed sample, and we must decide which wider population, if any, they represent. This dataset is a cross section because it compares different districts for one study period. A time series follows a unit over time. A panel follows the same identifiable units repeatedly, such as these districts each year. These different structures will give us different comparisons later in the course.

\(i\): school district

\(Y_i\): average score, in points

\(X_i\): students per teacher

\(n=420\) districts

**Practice:** Would ten years of the same 420 districts form a panel? Would ten different districts observed each year necessarily do so?

**Explanation:** The first is a panel if district identities are tracked. The second may be repeated cross sections; the calendar alone does not create within-unit observations.

### 04. Different data structures support different comparisons

Identify the unit and whether the same units return over time.

A cross section records different units at a particular time, such as the school districts in our application. A time series records an ordered sequence for a unit or an aggregate. Pooled cross sections combine samples from different dates without requiring the same people or firms to return. A panel follows identified units across dates.

These distinctions determine what comparisons are possible. A panel can compare a district with itself, while repeated cross sections can compare population averages without observing each person's change. None of these labels guarantees random sampling. We must also explain how observations entered the file and which population they represent.

Cross section: different units at a date; time series: observations ordered by date.

Pooled cross sections: samples at several dates; panel: identified units followed over time.

Data structure and sampling design are separate questions.

### 05. Random sampling is a claim about how observations are drawn

Independence and a common distribution need a substantive argument.

A random variable is a quantity whose value is uncertain before we observe it. A probability is a chance, measured between zero and one. A probability distribution describes the possible values and their chances. A joint distribution describes combinations of variables: here, which score and staffing values occur together in a district. These population descriptions differ from the particular values in our observed file.

Independent observations do not provide information about one another's random outcomes under the sampling model. Identically distributed means that each observation follows the same joint distribution of the measured variables. The abbreviation iid combines independent and identically distributed. A random sample, in the convention used here, consists of independent draws from one population distribution.

Neighbouring districts may share shocks, and later observations in a time series can depend on earlier ones. A file restricted to large districts can also represent a different population from a file covering all districts. These cases need an explicit sampling argument. A large number of rows does not establish independence or population representativeness.

Random sample: \((Y_i,X_i)\), \(i=1,\ldots,n\), are independent draws from one joint distribution.

iid: independent and identically distributed.

Ask how units were selected and whether they share shocks.

### 06. Start with a rule for how the outcome is produced

A causal model states mechanisms before asking what would change.

Imagine a district in which staffing and learning follow two simple rules. X is students per teacher. C is a prior support index, V is another staffing input, and U is another learning input. The staffing rule is X equals 22 minus C plus V. The score rule is Y equals 700 minus twice X plus five times C plus U. These are assumed teaching rules, not estimates from the California data.

Calling these structural equations means that we interpret them as mechanisms that continue to operate when another mechanism is changed. A complete model also describes the background inputs. For this illustration, take C, V and U as independent: learning one of them gives no information about the others. The same support index nevertheless affects both staffing and scores. For a district with C equal to two, V equal to two and U equal to three, the rules produce X equal to 22 and a score of 669.

Staffing: \(X=22-C+V\)

Learning: \(Y=700-2X+5C+U\)

\(C=2,V=2,U=3\Rightarrow X=22,Y=669\)

### 07. Define the intervention before its counterfactual

Change the staffing rule; retain the stated learning mechanism.

The district started with twenty-two students per teacher and scored 669 in our teaching model. Suppose it hires enough teachers to bring the ratio down to twenty, with enrollment and teacher characteristics held fixed.

Replace the staffing rule by setting X to twenty. Now use the score rule with the same background inputs. Substitute twenty for X and get 673. Compare those two scores. The change is four points for this district in this model.

A counterfactual is the outcome the same district would have under the specified alternative policy. Here we can calculate it because we stated how the score is produced. In real data we observe the outcome under the policy that occurred. Another district with a ratio of twenty may differ in background and support. Also specify how the policy reaches twenty. Hiring teachers and moving students could reach the same ratio while changing different parts of the score mechanism.

Intervene: replace the assignment rule by \(X=20\)

Alternative score: \(700-2(20)+5(2)+3=673\)

Same-district difference: \(673-669=4\) points

### 08. The comparison we want is partly missing

A policy effect compares potential outcomes under two staffing choices.

We can now name the two outcomes without leaving their meaning implicit. For district i, Y subscript i of 20 is its score under the teacher-hiring intervention that sets the ratio to 20. Y subscript i of 22 is its score under the corresponding ratio-22 intervention. These are potential outcomes. Their difference is this district's causal effect for the specified period and implementations. The teaching model made that difference calculable because we supplied all its rules and inputs.

In real data, we observe one staffing implementation and its resulting score. The other potential outcome is missing. Consistency is the assumption linking the observed score to the potential outcome under the intervention actually received; it requires that the recorded policy match the defined implementation. If extra teachers are taken from a neighboring district, that spillover must also be represented rather than silently ignored. Comparing other districts can help estimate the missing comparison only with an argument about assignment and comparability. Random assignment allocates the specified policy by chance; observational data record choices made by others.

Potential outcomes: \(Y_i(20),Y_i(22)\)

Causal contrast: \(Y_i(20)-Y_i(22)\)

Observed groups do not automatically supply the missing outcome.

### 09. Average effects require a population and an identification argument

Define the policy states, population and averaging rule.

Let D be one for the hiring policy and zero for the comparison policy. A variable with these two values is binary. For any district, Y of one is its score under hiring and Y of zero its score under comparison. The average treatment effect, or ATE, averages the difference over the target districts. The average treatment effect on the treated, or ATT, averages the same difference over districts that received the hiring policy. Look at the bar in the ATT formula. It means given that D equals one. E denotes a population average.

To learn about the missing scores, compare districts with the same measured prior characteristics C. Consistency means that the score we observe equals the potential score for the policy the district received. The independence symbol in the second line expresses conditional exchangeability. Within C, the two groups have the same distributions of potential scores. Overlap means both policies occur with positive probability within the C values we need. The letter P denotes that probability.

Within each such group, subtract the comparison group's observed mean from the hiring group's observed mean. Then average those differences using the target population's distribution of C. That is what E sub C does. Under the stated assumptions this observed comparison determines the ATE. We call this identification. Estimation asks how well a particular sample measures that identified quantity.

\(ATE=E[Y(1)-Y(0)]\); \(ATT=E[Y(1)-Y(0)\mid D=1]\).

Exchangeability: \((Y(1),Y(0))\perp D\mid C\); overlap: \(0<P(D=1\mid C)<1\).

Under the stated conditions, \(ATE=E_C\{E[Y\mid D=1,C]-E[Y\mid D=0,C]\}\).

### 10. Read the data before fitting a line

Start with axes, units, range and unusual observations.

The counterfactual is missing, so our first step is to understand the observations we do have. This graph is a scatterplot: it places one dot at each district's pair of X and Y values. Moving right means more students per teacher. Moving up means a higher score. The vertical scale is in score points, not percentages.

Look at the dots before showing the line. Do districts with higher ratios generally have lower scores? Then look at districts with similar ratios. Their scores still differ. A line can summarise an average pattern without predicting every district perfectly. The differences around it give us a reason to look for other factors that matter for learning.

The range of the data also limits what we can learn. The observed ratios run from about 14 to 26. Using a line from these data to predict scores at a ratio of two would be extrapolation: extending a relationship beyond the values we have observed. A prediction inside the observed range still needs care, but a prediction far outside it requires an especially strong argument. Keep that range in mind as we discuss a realistic change from 22 to 20.

**Practice:** Districts at about the same student–teacher ratio have different scores. Does this prevent a line from describing their average pattern?

**Explanation:** No. A line can summarise the average pattern even when individual districts lie above and below it. Those differences tell us that staffing alone does not fully explain scores.

### 11. Use a DAG to make the causal story visible

Begin with assumptions about the arrows and mechanisms.

The two mechanisms can also be drawn. A node is a variable: X represents staffing, Y the score and C prior support. An arrow from C to X says that support enters the staffing mechanism. An arrow from C to Y says that support also enters the learning mechanism. The arrow from X to Y represents the proposed staffing effect. An absent arrow is an assumption that there is no additional direct mechanism between those variables in this model.

This is a directed acyclic graph, abbreviated DAG. Directed means that arrows have a direction. Acyclic means that following arrow directions cannot return to the same node. The diagram summarizes an assumed causal structure; it is not proof obtained from a scatterplot. Unshown background inputs still exist. Here they are taken to be independent, so they do not create an additional shared cause. Later we will use dated nodes to represent feedback without drawing a cycle.

Node: a variable; arrow: a proposed direct causal mechanism.

Directed: arrows have a direction. Acyclic: no directed loop.

Missing arrows and independent background inputs are assumptions.

### 12. Trace a path one connection at a time

A causal route follows arrows; a general path need not.

A path is a sequence of distinct connected nodes. First trace X to Y along the direct arrow. Next trace X back to C and then forward to Y. Both are paths, even though the second traversal goes against the first arrow. Only the first is a directed causal path from staffing to scores.

The second route begins with an arrow pointing into X. We call a path with that beginning a backdoor path. Here C is a common cause of X and Y. Districts with different staffing can therefore have different support even before the staffing mechanism affects learning. Confounding means that such an alternative source of outcome differences contaminates the proposed causal comparison. The distinction is visible before fitting any numerical relationship.

Causal route: \(X\rightarrow Y\)

Backdoor route: \(X\leftarrow C\rightarrow Y\)

### 13. A common cause creates a backdoor comparison

Compare districts with similar prior background.

Suppose we compare districts at the same prior-support value. This is conditioning on C: restrict the comparison to a fixed value or account for it in a model. It changes which districts are compared; it does not set anyone's staffing by intervention. Using C as a control means holding its observed value fixed in the comparison. A regression is a statistical model relating an average outcome to stated explanatory variables; it can represent such a conditional comparison. Select C in the graph. The common-cause route through C closes, while the staffing-to-score arrow remains.

On this path, C is a non-collider because its two neighboring arrows do not both point into it. Conditioning on a non-collider blocks that path. In the simple graph, holding support fixed closes the only drawn backdoor. A regression that correctly represents the conditional relationship could use that comparison, provided the needed staffing values occur at the support levels being compared. This availability is called overlap or support. The conclusion depends on the graph being adequate, on measuring C appropriately and on the comparison being available in the data.

Compare at fixed \(C\): block \(X\leftarrow C\rightarrow Y\)

Conditioning selects comparisons; intervention changes a mechanism.

### 14. An intermediate mechanism is a mediator

A variable caused by staffing can carry part of its effect.

Keep the school question, but add teacher attention. Suppose staffing changes attention and attention changes scores. Teacher attention is a mediator: an intermediate variable on a directed causal path. The graph also allows a direct staffing route that does not pass through measured attention.

The total effect allows attention to respond to the staffing policy. Select attention as a control and the mediated route closes. A comparison at fixed attention asks a different question. It is not automatically a valid direct-effect estimate: attention may have other causes related to scores, and an intervention that fixes attention needs its own meaning. The practical lesson is to distinguish a prior common cause from a later mechanism before deciding what belongs in a regression.

Mediated route: \(X\rightarrow M\rightarrow Y\)

Total effect allows the mediator to respond.

### 15. Selection can create a relationship

A four-case scholarship example makes the mechanism visible.

Consider a separate, constructed scholarship rule. Preparation and financial need are independent zero-or-one characteristics. Their four combinations are equally likely. A scholarship is awarded when preparation is one or need is one, including when both are one. Before selection, half the applicants have need, whether preparation is zero or one.

Now keep scholarship recipients only. The zero-preparation, zero-need case disappears. Among recipients with zero preparation, everyone has need. Among recipients with preparation one, only half have need. Preparation and need have become associated in the selected sample even though neither causes the other. We can see the reason by listing the four cases before giving the pattern its technical name.

Equally likely \((P,N)\): \((0,0),(0,1),(1,0),(1,1)\)

Award if \(P=1\) or \(N=1\); exclude only \((0,0)\)

Among recipients: \(\Pr(N=1\mid P=0)=1\), \(\Pr(N=1\mid P=1)=1/2\)

### 16. A shared consequence behaves differently

Conditioning can open a route that was blocked.

Trace the path from preparation to financial need. Preparation points into scholarship selection, and need also points into selection. A node with two arrowheads meeting on this path is a collider. The path is blocked when we leave selection and its consequences alone.

Select scholarship selection in the diagram. Among recipients, someone with less preparation may need more financial need to qualify. This is the same selection pattern we saw in the four cases. Conditioning on a collider opens a route between its causes. An open route allows an association, whose size and sign depend on the model. To recognise a collider, check the arrowheads on the path you are actually tracing.

Collider: \(P\rightarrow S\leftarrow N\)

Unconditioned collider blocks; selecting recipients opens the path.

### 17. Selecting a consequence can also open the route

A descendant is reached by following arrows forward.

Suppose scholarship status determines whether a usable award record exists. The record indicator is a descendant of scholarship selection: following an arrow forward from selection reaches the record. Add this fourth node to the previous diagram. We still want the relationship between preparation and need.

Select the record indicator rather than scholarship status. Information about a consequence of the collider can also open the path. For example, observing an award record may strongly reveal that an applicant received a scholarship. The same selection logic then applies indirectly. The general rule is to check both a collider and its descendants. Compare this with the earlier common-cause example: conditioning on a non-collider blocks its path, while conditioning on a collider or descendant can open a previously blocked route.

\(P\rightarrow S\leftarrow N\), with \(S\rightarrow R\)

Conditioning on a collider descendant can open its path.

### 18. Why the observed groups might differ

A confounder is another factor related to both staffing and scores.

What could explain the score differences around the line? Consider the share of students who are English learners. This means students developing their English skills. Write Z for this share. It is measured as a percentage, so a district with 15 English learners out of 100 students has Z=15. A change from 15% to 16% is one percentage point.

Suppose language composition is related both to staffing decisions and to measured scores. It would then be a possible confounder: another factor that helps explain the association between X and Y. For example, districts with greater learning needs might recruit extra teachers, while those needs also affect scores. The direction of the resulting distortion depends on how staffing and those needs are related; the diagram alone does not determine it.

The arrows express this proposed explanation. An arrow from Z to X says language composition may influence staffing; an arrow from Z to Y says it may influence scores. Together, X←Z→Y gives an alternative route linking X and Y. To control for Z means to account for observed differences in Z when comparing ratios and scores. This motivates our next model: compare districts at the same measured language composition, while recognising that other differences may remain.

\(Z\): English-learner share, in percent

Possible confounder: related to staffing and scores

\(X\leftarrow Z\rightarrow Y\): an alternative explanation

### 19. Law and order: identify the conviction comparison

A useful adjustment closes every drawn backdoor route.

Switch from schools to a law enforcement example. C is the probability of conviction and Y is time spent in crime. We want to study the arrow from C to Y. Enforcement intensity E affects both conviction and arrest probability A. Arrest also affects criminal time. The dashed node U represents unobserved background factors that affect enforcement, arrest and criminal time.

Start at conviction and walk backward to enforcement. One route continues through arrest to criminal time. Another continues backward to background and then forward to criminal time. Conditioning on enforcement blocks both routes because both pass through E as a noncollider. Use the checkbox to see what closes. The arrow from conviction to criminal time remains.

In this model, enforcement is an adjustment set, the variable or group of variables used to close the backdoor paths. The next slide changes the proposed cause from conviction to arrest. Follow the arrows again before reusing the same adjustment.

Target: \(\text{conviction probability}\rightarrow\text{criminal time}\)

Ask which variable closes every backdoor route.

### 20. Changing the target can change the required controls

The arrest comparison still has an unobserved route.

Keep the same model but make arrest probability the explanatory variable. Enforcement is already held fixed in this diagram. That closes the enforcement-based routes, yet unobserved background still affects both arrest and criminal time directly. The arrest-to-background-to-outcome backdoor remains open.

This is why a control set is tied to a target comparison. A variable that was sufficient for the conviction question need not be sufficient for the arrest question. The dashed background box also reminds us that naming a necessary control does not make it observed. We may need another design or better measurements rather than another command in the same dataset.

Compare the two diagrams and explain the remaining route in words. We will use the same habit with school staffing and later policy applications: specify the proposed cause, trace the alternatives, and state which assumptions or data close them. A fitted comparison is useful only when its meaning is clear.

Remaining route: \(A\leftarrow U\rightarrow Y\)

A control plan is specific to the chosen explanatory variable.

### 21. Before estimating, state what the data can answer

We have defined the observation, the policy intervention and the missing comparison. A useful empirical argument states which population is represented and which assumptions connect its data to the policy question. The causal graph makes proposed channels visible; it does not supply evidence for every arrow.

Write four sentences: name the district population; define the teacher-hiring intervention and score outcome; explain one alternative cause that could distort an observed comparison; and propose evidence that would address it. Next we build simple regression carefully. A fitted slope will describe an observed comparison. Its calculation and its causal interpretation require separate arguments.

Before estimating, state what the data can answer

**Practice:** Write four sentences naming the population, staffing intervention and outcome, one alternative explanation, and evidence that could address it.

**Explanation:** One observation is a school district, and staffing is measured as students per teacher. A reduction of two students per teacher gives about +4.56 fitted score points in the simple model. The difference is about +2.20 points after holding English-learner share fixed. Other district differences or staffing responses to learning needs could still prevent either number from measuring the causal gain from hiring teachers.

### 22. Audit the school observations before estimating

Try the comparison before opening the explanation.

Stata is the statistical software used for our applications. Download the Stata bundle and extract it into one folder. A do-file is a saved text file of Stata commands, which lets you repeat and document an analysis. Save your own commands in that folder and run them from there. A log is a saved record of the commands and their printed results.

The file schools.csv stores one district per row. Its columns are score, the average test score in points; str, students per teacher; el, English-learner share in percent; and income, average district income in thousands of dollars. CSV means comma-separated values, a plain-text table format. The command import delimited reads that table. The summarize command reports counts, averages, spread and ranges; count if el>20 counts rows meeting the stated condition.

Use these commands to verify the number of districts, inspect the four variables and count districts with el above 20. Save the do-file and output log. Explain which sampling and causal claims those numerical checks cannot establish.

Read schools.csv with import delimited; inspect score, str, el and income with summarize.

count if el>20 counts districts with English-learner share above 20 percent.

Save your commands in a do-file and their printed results in a log.

**Practice:** Use schools.csv in Stata. Verify the number of districts, inspect score, str, el and income, and count districts with el above 20. Save your commands and output. Explain which sampling and causal claims cannot be verified merely by these counts.

### 23. Audit the school observations before estimating: explanation

Follow the calculation and interpret its units.

There are 420 district observations. The variables are district test score, students per teacher, English-learner percentage and district income in thousands of dollars. There are 118 districts with English-learner share above 20 percent; mean score is about 654.157 and mean staffing ratio about 19.640. The overleaf_technical.do reference prints the summaries. Correct execution, documented units and an explicit population statement are required. Counts do not establish random sampling, independent errors or a causal staffing effect.

There are 420 district observations. The variables are district test score, students per teacher, English-learner percentage and district income in thousands of dollars. There are 118 districts with English-learner share above 20 percent; mean score is about 654.157 and mean staffing ratio about 19.640. The overleaf_technical.do reference prints the summaries. Correct execution, documented units and an explicit population statement are required. Counts do not establish random sampling, independent errors or a causal staffing effect.

## Appendix

Further examples, practice and technical derivations for study after the core lesson.

### 24. An intervention graph changes a different object

The policy removes incoming staffing arrows rather than selecting a subgroup.

Return to staffing. In the observed-data graph, prior support helps determine staffing. In the intervention graph shown here, the policy sets staffing to a specified value, so support no longer determines it. That incoming arrow has been removed. Support continues to affect learning, and staffing can still affect learning through its retained mechanism.

This operation corresponds to replacing the staffing equation in our numerical model. It differs from conditioning on support, which compares observed districts with the same support, and from conditioning on staffing, which selects districts with a particular observed ratio. The graph and the numerical model now tell the same story. Before using a counterfactual later in the course, we will specify the intervention, the mechanisms allowed to respond and the assumptions used to estimate its missing outcome.

Intervention: replace the assignment mechanism.

Conditioning: compare within an observed subgroup.

### 25. Would the result apply in a new setting?

Check credibility in the original setting and relevance to the new one.

Suppose the ministry now asks whether this California comparison should guide staffing in another country. The answer requires two separate checks. Internal validity asks whether a study identifies the claimed causal effect in its own setting. Identification means that the data and stated assumptions allow us to learn the effect we want, rather than a mixture of that effect and other influences.

External validity asks whether the result applies to the population and policy we now care about. Even a well-identified effect in California may differ elsewhere because class organisation, language needs, teacher training or starting ratios differ. A result must first be credible in its original setting before we ask how well it transfers, but credibility alone does not guarantee transfer.

Use these checks to propose a local study. Specify which schools we would study, what staffing change we would evaluate and how we would measure learning. Then explain what comparison could tell us what would have happened without the change. A concrete plan is more useful than assuming a precise effect from elsewhere must apply locally. This brings us back to the ministry's decision rather than leaving the analysis at a regression table.

**Practice:** Propose a local staffing study. Name the schools or districts, policy change, learning measure, comparison and main concern.

**Explanation:** For example, study school-level learning gains after a funded reduction in the staffing ratio. Compare funded schools with schools whose lack of funding gives a credible estimate of what would otherwise have happened. If struggling schools are selected for funding, the comparison must address their different expected progress.

### 26. Diagnose the claim

A test of the slope and a credible policy comparison answer different questions.

Suppose a report says the staffing slope is statistically significant, so hiring more teachers will raise scores by the fitted amount. Statistically significant means that a test finds the estimate unusually far from a proposed value, such as zero, under the test's assumptions. Separate that claim about the fitted slope from the claim about a hiring policy.

Pick a prior factor, such as family resources, that could affect both staffing and scores. A test of a slope does not tell us whether we have addressed that path. Rewrite the claim in two sentences. Name the fitted comparison and its units, then explain one reason the fitted amount could differ from the gain under hiring.

**Practice:** Rewrite: 'Significant slope proves that smaller classes cause higher scores.'

**Explanation:** Districts with lower student–teacher ratios have higher fitted scores in these data. A causal staffing effect would require a defensible comparison addressing factors such as family resources and staffing responses to student needs.

### 27. What would convince you next?

Choose new data or a new comparison to address a specific concern.

Suppose you can improve the study in one way. Adding more districts could make the estimated slope more precise. Precision means that estimates vary less across comparable samples, when the sampling conditions support that comparison. But more observations do not by themselves explain why districts chose different staffing levels.

If that choice is the main concern, a staffing offer allocated by chance could provide more useful evidence about the policy effect. A natural experiment is another possibility: an outside event or rule creates a comparison that can be argued to resemble random assignment. For example, an unexpected funding rule might alter teacher recruitment for some schools. We would still need to explain why the rule was unrelated to other changes in learning and whether it affected scores through other routes.

Choose an improvement by asking which concern it addresses. Better measurement can help us account for a relevant district difference. More districts can improve precision. A credible assignment rule can help identify a policy effect. These improvements may work together, but they do different jobs. Keeping those jobs separate will guide our model choices throughout the course.

**Practice:** Compare adding more districts with allocating a staffing offer by chance. What can each improve?

**Explanation:** More districts can improve precision if the sampling conditions are suitable. Chance allocation can support a causal comparison by making the offer unrelated to other factors before the policy. We must still check whether the offer was implemented and whether the groups were affected by other differences.

### 28. DAG practice: conviction and arrest

Trace the routes before choosing a control.

In the law-and-order model, hold enforcement fixed. Which backdoor route from arrest probability to criminal time remains open? Explain why the same enforcement adjustment can be enough for the drawn conviction comparison but insufficient for arrest.

Name the target comparison first. Trace each route through the relevant variables and say whether it is directed, blocked or open under the stated conditioning. Use the diagram controls to test your proposed explanation before opening the worked reasoning.

**Practice:** In the law-and-order model, hold enforcement fixed. Which backdoor route from arrest probability to criminal time remains open? Explain why the same enforcement adjustment can be enough for the drawn conviction comparison but insufficient for arrest.

### 29. DAG practice: conviction and arrest: explanation

Explain what conditioning changes in this stated graph.

For arrest, the route \(A\leftarrow U\rightarrow Y\) remains open because unobserved background affects both arrest probability and criminal time. Holding enforcement fixed does not block that route.

For conviction, every drawn backdoor starts through enforcement, so conditioning on enforcement blocks those routes in this stated graph. The result is specific to the chosen explanatory variable and assumed arrows. If the real conviction process had another unmeasured parent affecting the outcome, that control set could also be insufficient.

For arrest, the route \(A\leftarrow U\rightarrow Y\) remains open because unobserved background affects both arrest probability and criminal time. Holding enforcement fixed does not block that route. For conviction, every drawn backdoor starts through enforcement, so conditioning on enforcement blocks those routes in this stated graph. The result is specific to the chosen explanatory variable and assumed arrows. If the real conviction process had another unmeasured parent affecting the outcome, that control set could also be insufficient.

