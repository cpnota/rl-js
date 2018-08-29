## Classes

<dl>
<dt><a href="#MdpFactory">MdpFactory</a> ⇐ <code>EnvironmentFactory</code></dt>
<dd><p>Class for constructing an Environment implemented as a ReduxMDP</p>
</dd>
<dt><a href="#ReduxMDP">ReduxMDP</a> ⇐ <code>Environment</code></dt>
<dd><p>Class representing in an Environment as an MDP using Redux.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#State">State</a> : <code>*</code></dt>
<dd><p>The underlying state representation of the environment.
Should be a serializable object,
e.g. state =&gt; JSON.parse(JSON.stringify(state)) should be an identity</p>
</dd>
<dt><a href="#MdpAction">MdpAction</a> : <code>*</code></dt>
<dd><p>An object representing an action in an MDP.
The type is specific to the MDP.</p>
</dd>
<dt><a href="#Observation">Observation</a> : <code>*</code></dt>
<dd><p>An object representing the observation of an agent
in the current state.
The type is specific to the MDP.</p>
</dd>
<dt><a href="#ReduxAction">ReduxAction</a> : <code>Object</code></dt>
<dd><p>An Redux action.
e.g. a Flux Standard Action: <a href="https://github.com/redux-utilities/flux-standard-action">https://github.com/redux-utilities/flux-standard-action</a>
Your MdpAction will be converted into a ReduxAction by resolveAction</p>
</dd>
<dt><a href="#reducer">reducer</a> ⇒ <code><a href="#State">State</a></code></dt>
<dd><p>A Redux reducer.
Computes the next state without mutating the previous state object</p>
</dd>
<dt><a href="#getObservation">getObservation</a> ⇒ <code><a href="#Observation">Observation</a></code></dt>
<dd><p>A function to get the observation of the agent given the current state.</p>
</dd>
<dt><a href="#computeReward">computeReward</a> ⇒ <code>number</code></dt>
<dd><p>A function to compute the reward given a state transition,
i.e. (s, a, s).
This function should be completely deterministic;
any non-determinism should be handled by resolveAction.</p>
</dd>
<dt><a href="#isTerminated">isTerminated</a> ⇒ <code>boolean</code></dt>
<dd><p>A function to compute whether the environment is terminated,
i.e. the current episode is over.</p>
</dd>
<dt><a href="#resolveAction">resolveAction</a> ⇒ <code><a href="#ReduxAction">ReduxAction</a></code></dt>
<dd><p>A function to resolve a MdpAction into a ReduxAction.
Any non-determinism in your environment should go here,
as your Redux reducer should be completely deterministic.</p>
</dd>
</dl>

<a name="MdpFactory"></a>

## MdpFactory ⇐ <code>EnvironmentFactory</code>
Class for constructing an Environment implemented as a ReduxMDP

**Kind**: global class  
**Extends**: <code>EnvironmentFactory</code>  

* [MdpFactory](#MdpFactory) ⇐ <code>EnvironmentFactory</code>
    * [new MdpFactory(params)](#new_MdpFactory_new)
    * [.createEnvironment()](#MdpFactory+createEnvironment) ⇒ [<code>ReduxMDP</code>](#ReduxMDP)
    * [.setMdpMiddleware(middleware)](#MdpFactory+setMdpMiddleware)
    * [.setReduxMiddleware(middleware)](#MdpFactory+setReduxMiddleware)

<a name="new_MdpFactory_new"></a>

### new MdpFactory(params)
Create a factory for a particular MDP


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Parameters for constructing the MDP |
| params.reducer | <code>Reducer</code> |  | Redux reducer representing the state of the MDP |
| params.getObservation | [<code>getObservation</code>](#getObservation) |  | Compute the current observation |
| params.computeReward | [<code>computeReward</code>](#computeReward) |  | Compute the current reward |
| params.isTerminated | [<code>isTerminated</code>](#isTerminated) |  | Compute whether the environment is terminated |
| [params.resolveAction] | [<code>resolveAction</code>](#resolveAction) |  | Resolve the MdpAction into a ReduxAction |
| [params.gamma] | <code>number</code> | <code>1</code> | Reward discounting factor for the MDP |

<a name="MdpFactory+createEnvironment"></a>

### mdpFactory.createEnvironment() ⇒ [<code>ReduxMDP</code>](#ReduxMDP)
Create an instance of the environment.

**Kind**: instance method of [<code>MdpFactory</code>](#MdpFactory)  
<a name="MdpFactory+setMdpMiddleware"></a>

### mdpFactory.setMdpMiddleware(middleware)
Configure any MdpMiddleware that should be part of the next
invocation of createEnvironment()

**Kind**: instance method of [<code>MdpFactory</code>](#MdpFactory)  

| Param | Type |
| --- | --- |
| middleware | <code>function</code> | 

<a name="MdpFactory+setReduxMiddleware"></a>

### mdpFactory.setReduxMiddleware(middleware)
Configure any ReduxMiddleware that should be part of the next
invocation of createEnvironment()

**Kind**: instance method of [<code>MdpFactory</code>](#MdpFactory)  

| Param | Type |
| --- | --- |
| middleware | <code>function</code> | 

<a name="ReduxMDP"></a>

## ReduxMDP ⇐ <code>Environment</code>
Class representing in an Environment as an MDP using Redux.

**Kind**: global class  
**Extends**: <code>Environment</code>  
<a name="State"></a>

## State : <code>\*</code>
The underlying state representation of the environment.
Should be a serializable object,
e.g. state => JSON.parse(JSON.stringify(state)) should be an identity

**Kind**: global typedef  
<a name="MdpAction"></a>

## MdpAction : <code>\*</code>
An object representing an action in an MDP.
The type is specific to the MDP.

**Kind**: global typedef  
<a name="Observation"></a>

## Observation : <code>\*</code>
An object representing the observation of an agent
in the current state.
The type is specific to the MDP.

**Kind**: global typedef  
<a name="ReduxAction"></a>

## ReduxAction : <code>Object</code>
An Redux action.
e.g. a Flux Standard Action: https://github.com/redux-utilities/flux-standard-action
Your MdpAction will be converted into a ReduxAction by resolveAction

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Each action must have a type associated with it. |
| [payload] | <code>\*</code> | Any data associated with the action goes here |
| [error] | <code>boolean</code> | Should be true IIF the action represents an error |
| [meta] | <code>\*</code> | Any data that is not explicitly part of the payload |

<a name="reducer"></a>

## reducer ⇒ [<code>State</code>](#State)
A Redux reducer.
Computes the next state without mutating the previous state object

**Kind**: global typedef  
**Returns**: [<code>State</code>](#State) - The new state object after the action is applied  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>State</code>](#State) | The current state of the MDP |
| action | [<code>ReduxAction</code>](#ReduxAction) | The resolved action for the MDP |

<a name="getObservation"></a>

## getObservation ⇒ [<code>Observation</code>](#Observation)
A function to get the observation of the agent given the current state.

**Kind**: global typedef  
**Returns**: [<code>Observation</code>](#Observation) - The observation for the current state  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>State</code>](#State) | The current state of the MDP |

<a name="computeReward"></a>

## computeReward ⇒ <code>number</code>
A function to compute the reward given a state transition,
i.e. (s, a, s).
This function should be completely deterministic;
any non-determinism should be handled by resolveAction.

**Kind**: global typedef  
**Returns**: <code>number</code> - The reward for given the state transition.  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>State</code>](#State) | the current state for the MDP |
| action | [<code>ReduxAction</code>](#ReduxAction) | The next action |
| nextState | [<code>State</code>](#State) | the next state for the mdp |

<a name="isTerminated"></a>

## isTerminated ⇒ <code>boolean</code>
A function to compute whether the environment is terminated,
i.e. the current episode is over.

**Kind**: global typedef  
**Returns**: <code>boolean</code> - True if the environment is terminated, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>State</code>](#State) | the current state for the MDP |
| action | [<code>ReduxAction</code>](#ReduxAction) | The next action |
| nextState | [<code>State</code>](#State) | the next state for the MDP. |
| time | <code>number</code> | The current timestep of the MDP, useful for finite horizon MDPs. |

<a name="resolveAction"></a>

## resolveAction ⇒ [<code>ReduxAction</code>](#ReduxAction)
A function to resolve a MdpAction into a ReduxAction.
Any non-determinism in your environment should go here,
as your Redux reducer should be completely deterministic.

**Kind**: global typedef  
**Returns**: [<code>ReduxAction</code>](#ReduxAction) - The new state object after the action is applied  

| Param | Type | Description |
| --- | --- | --- |
| state | [<code>State</code>](#State) | the current state for the MDP |
| action | [<code>MdpAction</code>](#MdpAction) | The resolved action for the MDP |

