## Interfaces

<dl>
<dt><a href="#ActionTraces">ActionTraces</a></dt>
<dd></dd>
<dt><a href="#ActionValueFunction">ActionValueFunction</a> ⇐ <code><a href="#FunctionApproximator">FunctionApproximator</a></code></dt>
<dd></dd>
<dt><a href="#AgentFactory">AgentFactory</a></dt>
<dd></dd>
<dt><a href="#Agent">Agent</a></dt>
<dd></dd>
<dt><a href="#EnvironmentFactory">EnvironmentFactory</a></dt>
<dd></dd>
<dt><a href="#Environment">Environment</a></dt>
<dd></dd>
<dt><a href="#FunctionApproximator">FunctionApproximator</a></dt>
<dd></dd>
<dt><a href="#PolicyTraces">PolicyTraces</a></dt>
<dd></dd>
<dt><a href="#Policy">Policy</a></dt>
<dd></dd>
<dt><a href="#StateTraces">StateTraces</a></dt>
<dd></dd>
<dt><a href="#StateValueFunction">StateValueFunction</a> ⇐ <code><a href="#FunctionApproximator">FunctionApproximator</a></code></dt>
<dd></dd>
</dl>

<a name="ActionTraces"></a>

## ActionTraces
**Kind**: global interface  

* [ActionTraces](#ActionTraces)
    * [.record(state, action)](#ActionTraces+record) ⇒ [<code>ActionTraces</code>](#ActionTraces)
    * [.update(error)](#ActionTraces+update) ⇒ [<code>ActionTraces</code>](#ActionTraces)
    * [.decay(amount)](#ActionTraces+decay) ⇒ [<code>ActionTraces</code>](#ActionTraces)
    * [.reset()](#ActionTraces+reset) ⇒ [<code>ActionTraces</code>](#ActionTraces)

<a name="ActionTraces+record"></a>

### actionTraces.record(state, action) ⇒ [<code>ActionTraces</code>](#ActionTraces)
Records a trace for the given state-action pair.

**Kind**: instance method of [<code>ActionTraces</code>](#ActionTraces)  
**Returns**: [<code>ActionTraces</code>](#ActionTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |

<a name="ActionTraces+update"></a>

### actionTraces.update(error) ⇒ [<code>ActionTraces</code>](#ActionTraces)
Updates the value function based on the stored traces, and the given error.

**Kind**: instance method of [<code>ActionTraces</code>](#ActionTraces)  
**Returns**: [<code>ActionTraces</code>](#ActionTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>number</code> | The current TD error |

<a name="ActionTraces+decay"></a>

### actionTraces.decay(amount) ⇒ [<code>ActionTraces</code>](#ActionTraces)
Decay the traces by the given amount.

**Kind**: instance method of [<code>ActionTraces</code>](#ActionTraces)  
**Returns**: [<code>ActionTraces</code>](#ActionTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | The amount to multiply the traces by, usually a value less than 1. |

<a name="ActionTraces+reset"></a>

### actionTraces.reset() ⇒ [<code>ActionTraces</code>](#ActionTraces)
Reset the traces to their starting values.
Usually called at the beginning of an episode.

**Kind**: instance method of [<code>ActionTraces</code>](#ActionTraces)  
**Returns**: [<code>ActionTraces</code>](#ActionTraces) - - This object  
<a name="ActionValueFunction"></a>

## ActionValueFunction ⇐ [<code>FunctionApproximator</code>](#FunctionApproximator)
**Kind**: global interface  
**Extends**: [<code>FunctionApproximator</code>](#FunctionApproximator)  

* [ActionValueFunction](#ActionValueFunction) ⇐ [<code>FunctionApproximator</code>](#FunctionApproximator)
    * [.call(state, action)](#ActionValueFunction+call) ⇒ <code>number</code>
    * [.update(state, action, error)](#ActionValueFunction+update)
    * [.gradient(state, action)](#ActionValueFunction+gradient) ⇒ <code>Array.&lt;number&gt;</code>
    * [.getParameters()](#FunctionApproximator+getParameters) ⇒ <code>Array.&lt;number&gt;</code>
    * [.setParameters(parameters)](#FunctionApproximator+setParameters)
    * [.updateParameters(errors)](#FunctionApproximator+updateParameters)

<a name="ActionValueFunction+call"></a>

### actionValueFunction.call(state, action) ⇒ <code>number</code>
Estimate the expected value of the returns given a specific state-action pair

**Kind**: instance method of [<code>ActionValueFunction</code>](#ActionValueFunction)  
**Overrides**: [<code>call</code>](#FunctionApproximator+call)  
**Returns**: <code>number</code> - - The approximated action value (q)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |

<a name="ActionValueFunction+update"></a>

### actionValueFunction.update(state, action, error)
Update the value of the function approximator for a given state-action pair

**Kind**: instance method of [<code>ActionValueFunction</code>](#ActionValueFunction)  
**Overrides**: [<code>update</code>](#FunctionApproximator+update)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |
| error | <code>number</code> | The difference between the target value and the currently approximated value |

<a name="ActionValueFunction+gradient"></a>

### actionValueFunction.gradient(state, action) ⇒ <code>Array.&lt;number&gt;</code>
Compute the gradient of the function approximator for a given state-action pair,
with respect to its parameters.

**Kind**: instance method of [<code>ActionValueFunction</code>](#ActionValueFunction)  
**Overrides**: [<code>gradient</code>](#FunctionApproximator+gradient)  
**Returns**: <code>Array.&lt;number&gt;</code> - The gradient of the function approximator with respect to its parameters at the given point  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |

<a name="FunctionApproximator+getParameters"></a>

### actionValueFunction.getParameters() ⇒ <code>Array.&lt;number&gt;</code>
Get the differentiable parameters of the function approximator

**Kind**: instance method of [<code>ActionValueFunction</code>](#ActionValueFunction)  
**Returns**: <code>Array.&lt;number&gt;</code> - The parameters that define the function approximator  
<a name="FunctionApproximator+setParameters"></a>

### actionValueFunction.setParameters(parameters)
Set the differentiable parameters fo the function approximator

**Kind**: instance method of [<code>ActionValueFunction</code>](#ActionValueFunction)  

| Param | Type | Description |
| --- | --- | --- |
| parameters | <code>Array.&lt;number&gt;</code> | new parameters for the function approximator |

<a name="FunctionApproximator+updateParameters"></a>

### actionValueFunction.updateParameters(errors)
Update the parameters in some direction given by an array of errors.

**Kind**: instance method of [<code>ActionValueFunction</code>](#ActionValueFunction)  

| Param | Type | Description |
| --- | --- | --- |
| errors | <code>Array.&lt;number&gt;</code> | = The direction with which to update each parameter |

<a name="AgentFactory"></a>

## AgentFactory
**Kind**: global interface  
<a name="AgentFactory+createAgent"></a>

### agentFactory.createAgent() ⇒ [<code>Agent</code>](#Agent)
**Kind**: instance method of [<code>AgentFactory</code>](#AgentFactory)  
<a name="Agent"></a>

## Agent
**Kind**: global interface  

* [Agent](#Agent)
    * [.newEpisode(environment)](#Agent+newEpisode)
    * [.act()](#Agent+act)

<a name="Agent+newEpisode"></a>

### agent.newEpisode(environment)
Prepare the agent of the next episode.
The Agent should perform any cleanup and
setup stepts that are necessary here.
An Environment object is passed in,
which the agent should store
each time.

**Kind**: instance method of [<code>Agent</code>](#Agent)  

| Param | Type | Description |
| --- | --- | --- |
| environment | [<code>Environment</code>](#Environment) | The Environment object for the new episode. |

<a name="Agent+act"></a>

### agent.act()
Perform an action for the current timestep.
Usually, the agent should at least:
1) dispatch an action to the environment, and
2) perform any necessary internal updates (e.g. updating the value function).

**Kind**: instance method of [<code>Agent</code>](#Agent)  
<a name="EnvironmentFactory"></a>

## EnvironmentFactory
**Kind**: global interface  
<a name="EnvironmentFactory+createEnvironment"></a>

### environmentFactory.createEnvironment() ⇒ [<code>Environment</code>](#Environment)
**Kind**: instance method of [<code>EnvironmentFactory</code>](#EnvironmentFactory)  
<a name="Environment"></a>

## Environment
**Kind**: global interface  

* [Environment](#Environment)
    * [.dispatch(action)](#Environment+dispatch)
    * [.getObservation()](#Environment+getObservation) ⇒ <code>\*</code>
    * [.getReward()](#Environment+getReward) ⇒ <code>number</code>
    * [.isTerminated()](#Environment+isTerminated) ⇒ <code>boolean</code>

<a name="Environment+dispatch"></a>

### environment.dispatch(action)
Apply an action selected by an Agent to the environment.
This could a string representing the action (e.g. "LEFT"),
or an array representing the force to apply on actuators, etc.

**Kind**: instance method of [<code>Environment</code>](#Environment)  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>\*</code> | An action object specific to the environment. |

<a name="Environment+getObservation"></a>

### environment.getObservation() ⇒ <code>\*</code>
Get an environment-specific observation for the current timestep.
This might be a string identifying the current state,
an array representing the current environment parameters,
pixel-data representing the agent's vision, etc.

**Kind**: instance method of [<code>Environment</code>](#Environment)  
**Returns**: <code>\*</code> - An observation object specific to the environment.  
<a name="Environment+getReward"></a>

### environment.getReward() ⇒ <code>number</code>
Get the reward for the current timestep.
Rewards guide the learning of the agent:
Positive rewards should be given when the agent selects good actions,
and negative rewards should be given when the agent selects bad actions.

**Kind**: instance method of [<code>Environment</code>](#Environment)  
**Returns**: <code>number</code> - A scalar representing the reward for the current timestep.  
<a name="Environment+isTerminated"></a>

### environment.isTerminated() ⇒ <code>boolean</code>
Return whether or not the current episode is terminated, or finished.
For example, this should return True if the agent has reached some goal,
if the maximum number of timesteps has been exceeded, or if the agent has
otherwise failed. Otherwise, this should return False.

**Kind**: instance method of [<code>Environment</code>](#Environment)  
**Returns**: <code>boolean</code> - A boolean representing whether or not the episode has terminated.  
<a name="FunctionApproximator"></a>

## FunctionApproximator
**Kind**: global interface  

* [FunctionApproximator](#FunctionApproximator)
    * [.call(args)](#FunctionApproximator+call) ⇒ <code>number</code>
    * [.update(args, error)](#FunctionApproximator+update)
    * [.gradient(args)](#FunctionApproximator+gradient) ⇒ <code>Array.&lt;number&gt;</code>
    * [.getParameters()](#FunctionApproximator+getParameters) ⇒ <code>Array.&lt;number&gt;</code>
    * [.setParameters(parameters)](#FunctionApproximator+setParameters)
    * [.updateParameters(errors)](#FunctionApproximator+updateParameters)

<a name="FunctionApproximator+call"></a>

### functionApproximator.call(args) ⇒ <code>number</code>
Call the function approximators with the given arguments.
The FA should return an estimate of the value of the function
at the point given by the arguments.

**Kind**: instance method of [<code>FunctionApproximator</code>](#FunctionApproximator)  
**Returns**: <code>number</code> - - The approximated value of the function at the given point  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>\*</code> | Arguments to the function being approximated approximated |

<a name="FunctionApproximator+update"></a>

### functionApproximator.update(args, error)
Update the value of the function approximator at the given point.

**Kind**: instance method of [<code>FunctionApproximator</code>](#FunctionApproximator)  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>\*</code> | Arguments to the function being approximated approximated |
| error | <code>number</code> | The difference between the target value and the currently approximated value |

<a name="FunctionApproximator+gradient"></a>

### functionApproximator.gradient(args) ⇒ <code>Array.&lt;number&gt;</code>
Compute the gradient of the function approximator at the given point,
with respect to its parameters.

**Kind**: instance method of [<code>FunctionApproximator</code>](#FunctionApproximator)  
**Returns**: <code>Array.&lt;number&gt;</code> - The gradient of the function approximator with respect to its parameters at the given point  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Array.&lt;number&gt;</code> | Arguments to the function being approximated approximated |

<a name="FunctionApproximator+getParameters"></a>

### functionApproximator.getParameters() ⇒ <code>Array.&lt;number&gt;</code>
Get the differentiable parameters of the function approximator

**Kind**: instance method of [<code>FunctionApproximator</code>](#FunctionApproximator)  
**Returns**: <code>Array.&lt;number&gt;</code> - The parameters that define the function approximator  
<a name="FunctionApproximator+setParameters"></a>

### functionApproximator.setParameters(parameters)
Set the differentiable parameters fo the function approximator

**Kind**: instance method of [<code>FunctionApproximator</code>](#FunctionApproximator)  

| Param | Type | Description |
| --- | --- | --- |
| parameters | <code>Array.&lt;number&gt;</code> | new parameters for the function approximator |

<a name="FunctionApproximator+updateParameters"></a>

### functionApproximator.updateParameters(errors)
Update the parameters in some direction given by an array of errors.

**Kind**: instance method of [<code>FunctionApproximator</code>](#FunctionApproximator)  

| Param | Type | Description |
| --- | --- | --- |
| errors | <code>Array.&lt;number&gt;</code> | = The direction with which to update each parameter |

<a name="PolicyTraces"></a>

## PolicyTraces
**Kind**: global interface  

* [PolicyTraces](#PolicyTraces)
    * [.record(state, action)](#PolicyTraces+record) ⇒ [<code>PolicyTraces</code>](#PolicyTraces)
    * [.update(error)](#PolicyTraces+update) ⇒ [<code>PolicyTraces</code>](#PolicyTraces)
    * [.decay(amount)](#PolicyTraces+decay) ⇒ [<code>PolicyTraces</code>](#PolicyTraces)
    * [.reset()](#PolicyTraces+reset) ⇒ [<code>PolicyTraces</code>](#PolicyTraces)

<a name="PolicyTraces+record"></a>

### policyTraces.record(state, action) ⇒ [<code>PolicyTraces</code>](#PolicyTraces)
Records a trace for the given state-action pair.

**Kind**: instance method of [<code>PolicyTraces</code>](#PolicyTraces)  
**Returns**: [<code>PolicyTraces</code>](#PolicyTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |

<a name="PolicyTraces+update"></a>

### policyTraces.update(error) ⇒ [<code>PolicyTraces</code>](#PolicyTraces)
Updates the value function based on the stored traces, and the given error.

**Kind**: instance method of [<code>PolicyTraces</code>](#PolicyTraces)  
**Returns**: [<code>PolicyTraces</code>](#PolicyTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>number</code> | The current TD error |

<a name="PolicyTraces+decay"></a>

### policyTraces.decay(amount) ⇒ [<code>PolicyTraces</code>](#PolicyTraces)
Decay the traces by the given amount.

**Kind**: instance method of [<code>PolicyTraces</code>](#PolicyTraces)  
**Returns**: [<code>PolicyTraces</code>](#PolicyTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | The amount to multiply the traces by, usually a value less than 1. |

<a name="PolicyTraces+reset"></a>

### policyTraces.reset() ⇒ [<code>PolicyTraces</code>](#PolicyTraces)
Reset the traces to their starting values.
Usually called at the beginning of an episode.

**Kind**: instance method of [<code>PolicyTraces</code>](#PolicyTraces)  
**Returns**: [<code>PolicyTraces</code>](#PolicyTraces) - - This object  
<a name="Policy"></a>

## Policy
**Kind**: global interface  

* [Policy](#Policy)
    * [.chooseAction(state)](#Policy+chooseAction) ⇒ <code>\*</code>
    * [.chooseBestAction(state)](#Policy+chooseBestAction) ⇒ <code>\*</code>
    * [.probability(state, action)](#Policy+probability) ⇒ <code>number</code>
    * [.update(state, action, error)](#Policy+update)
    * [.gradient(state, action)](#Policy+gradient) ⇒ <code>Array.&lt;number&gt;</code>
    * [.trueGradient(state, action)](#Policy+trueGradient) ⇒ <code>Array.&lt;number&gt;</code>
    * [.getParameters()](#Policy+getParameters) ⇒ <code>Array.&lt;number&gt;</code>
    * [.setParameters(parameters)](#Policy+setParameters)
    * [.updateParameters(errors)](#Policy+updateParameters)

<a name="Policy+chooseAction"></a>

### policy.chooseAction(state) ⇒ <code>\*</code>
Choose an action given the current state.

**Kind**: instance method of [<code>Policy</code>](#Policy)  
**Returns**: <code>\*</code> - An Action object of type specific to the environment  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |

<a name="Policy+chooseBestAction"></a>

### policy.chooseBestAction(state) ⇒ <code>\*</code>
Choose the best known action given the current state.

**Kind**: instance method of [<code>Policy</code>](#Policy)  
**Returns**: <code>\*</code> - An Action object of type specific to the environment  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |

<a name="Policy+probability"></a>

### policy.probability(state, action) ⇒ <code>number</code>
Compute the probability of selecting a given action in a given state.

**Kind**: instance method of [<code>Policy</code>](#Policy)  
**Returns**: <code>number</code> - the probability between [0, 1]  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |

<a name="Policy+update"></a>

### policy.update(state, action, error)
Update the probability of choosing a particular action in a particular state.
Generally, a positive error should make chosing the action more likely,
and a negative error should make chosing the action less likely.

**Kind**: instance method of [<code>Policy</code>](#Policy)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Array.&lt;number&gt;</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |
| error | <code>number</code> | The direction and magnitude of the update |

<a name="Policy+gradient"></a>

### policy.gradient(state, action) ⇒ <code>Array.&lt;number&gt;</code>
Compute the gradient of natural logarithm of the probability of
choosing the given action in the given state
with respect to the parameters of the policy.
This can often be computed more efficiently than the true gradient.

**Kind**: instance method of [<code>Policy</code>](#Policy)  
**Returns**: <code>Array.&lt;number&gt;</code> - The gradient of the policy  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |

<a name="Policy+trueGradient"></a>

### policy.trueGradient(state, action) ⇒ <code>Array.&lt;number&gt;</code>
Compute the true gradient of the probability of
choosing the given action in the given state
with respect to the parameters of the policy.
This is contrast to the log gradient which is used for most things.

**Kind**: instance method of [<code>Policy</code>](#Policy)  
**Returns**: <code>Array.&lt;number&gt;</code> - The gradient of log(π(state, action))  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| action | <code>\*</code> | Action object of type specific to the environment |

<a name="Policy+getParameters"></a>

### policy.getParameters() ⇒ <code>Array.&lt;number&gt;</code>
Get the differentiable parameters of the policy

**Kind**: instance method of [<code>Policy</code>](#Policy)  
**Returns**: <code>Array.&lt;number&gt;</code> - The parameters that define the policy  
<a name="Policy+setParameters"></a>

### policy.setParameters(parameters)
Set the differentiable parameters of the policy

**Kind**: instance method of [<code>Policy</code>](#Policy)  

| Param | Type | Description |
| --- | --- | --- |
| parameters | <code>Array.&lt;number&gt;</code> | The parameters that define the policy |

<a name="Policy+updateParameters"></a>

### policy.updateParameters(errors)
Update the parameters in some direction given by an array of errors.

**Kind**: instance method of [<code>Policy</code>](#Policy)  

| Param | Type | Description |
| --- | --- | --- |
| errors | <code>Array.&lt;number&gt;</code> | = The direction with which to update each parameter |

<a name="StateTraces"></a>

## StateTraces
**Kind**: global interface  

* [StateTraces](#StateTraces)
    * [.record(state)](#StateTraces+record) ⇒ [<code>StateTraces</code>](#StateTraces)
    * [.update(error)](#StateTraces+update) ⇒ [<code>StateTraces</code>](#StateTraces)
    * [.decay(amount)](#StateTraces+decay) ⇒ [<code>StateTraces</code>](#StateTraces)
    * [.reset()](#StateTraces+reset) ⇒ [<code>StateTraces</code>](#StateTraces)

<a name="StateTraces+record"></a>

### stateTraces.record(state) ⇒ [<code>StateTraces</code>](#StateTraces)
Records a trace for the given state

**Kind**: instance method of [<code>StateTraces</code>](#StateTraces)  
**Returns**: [<code>StateTraces</code>](#StateTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |

<a name="StateTraces+update"></a>

### stateTraces.update(error) ⇒ [<code>StateTraces</code>](#StateTraces)
Updates the value function based on the stored traces, and the given error.

**Kind**: instance method of [<code>StateTraces</code>](#StateTraces)  
**Returns**: [<code>StateTraces</code>](#StateTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>number</code> | The current TD error |

<a name="StateTraces+decay"></a>

### stateTraces.decay(amount) ⇒ [<code>StateTraces</code>](#StateTraces)
Decay the traces by the given amount.

**Kind**: instance method of [<code>StateTraces</code>](#StateTraces)  
**Returns**: [<code>StateTraces</code>](#StateTraces) - - This object  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | The amount to multiply the traces by, usually a value less than 1. |

<a name="StateTraces+reset"></a>

### stateTraces.reset() ⇒ [<code>StateTraces</code>](#StateTraces)
Reset the traces to their starting values.
Usually called at the beginning of an episode.

**Kind**: instance method of [<code>StateTraces</code>](#StateTraces)  
**Returns**: [<code>StateTraces</code>](#StateTraces) - - This object  
<a name="StateValueFunction"></a>

## StateValueFunction ⇐ [<code>FunctionApproximator</code>](#FunctionApproximator)
**Kind**: global interface  
**Extends**: [<code>FunctionApproximator</code>](#FunctionApproximator)  

* [StateValueFunction](#StateValueFunction) ⇐ [<code>FunctionApproximator</code>](#FunctionApproximator)
    * [.call(state)](#StateValueFunction+call) ⇒ <code>number</code>
    * [.update(state, error)](#StateValueFunction+update)
    * [.gradient(state)](#StateValueFunction+gradient) ⇒ <code>Array.&lt;number&gt;</code>
    * [.getParameters()](#FunctionApproximator+getParameters) ⇒ <code>Array.&lt;number&gt;</code>
    * [.setParameters(parameters)](#FunctionApproximator+setParameters)
    * [.updateParameters(errors)](#FunctionApproximator+updateParameters)

<a name="StateValueFunction+call"></a>

### stateValueFunction.call(state) ⇒ <code>number</code>
Estimate the expected value of the returns given a specific state.

**Kind**: instance method of [<code>StateValueFunction</code>](#StateValueFunction)  
**Overrides**: [<code>call</code>](#FunctionApproximator+call)  
**Returns**: <code>number</code> - - The approximated state value (v)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |

<a name="StateValueFunction+update"></a>

### stateValueFunction.update(state, error)
Update the value of the function approximator for a given state

**Kind**: instance method of [<code>StateValueFunction</code>](#StateValueFunction)  
**Overrides**: [<code>update</code>](#FunctionApproximator+update)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |
| error | <code>number</code> | The difference between the target value and the currently approximated value |

<a name="StateValueFunction+gradient"></a>

### stateValueFunction.gradient(state) ⇒ <code>Array.&lt;number&gt;</code>
Compute the gradient of the function approximator for a given state,
with respect to its parameters.

**Kind**: instance method of [<code>StateValueFunction</code>](#StateValueFunction)  
**Overrides**: [<code>gradient</code>](#FunctionApproximator+gradient)  
**Returns**: <code>Array.&lt;number&gt;</code> - The gradient of the function approximator with respect to its parameters at the given point  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | State object of type specific to the environment |

<a name="FunctionApproximator+getParameters"></a>

### stateValueFunction.getParameters() ⇒ <code>Array.&lt;number&gt;</code>
Get the differentiable parameters of the function approximator

**Kind**: instance method of [<code>StateValueFunction</code>](#StateValueFunction)  
**Returns**: <code>Array.&lt;number&gt;</code> - The parameters that define the function approximator  
<a name="FunctionApproximator+setParameters"></a>

### stateValueFunction.setParameters(parameters)
Set the differentiable parameters fo the function approximator

**Kind**: instance method of [<code>StateValueFunction</code>](#StateValueFunction)  

| Param | Type | Description |
| --- | --- | --- |
| parameters | <code>Array.&lt;number&gt;</code> | new parameters for the function approximator |

<a name="FunctionApproximator+updateParameters"></a>

### stateValueFunction.updateParameters(errors)
Update the parameters in some direction given by an array of errors.

**Kind**: instance method of [<code>StateValueFunction</code>](#StateValueFunction)  

| Param | Type | Description |
| --- | --- | --- |
| errors | <code>Array.&lt;number&gt;</code> | = The direction with which to update each parameter |

