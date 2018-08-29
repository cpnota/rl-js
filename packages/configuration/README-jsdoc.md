## Classes

<dl>
<dt><a href="#AgentBuilder">AgentBuilder</a></dt>
<dd></dd>
<dt><a href="#AgentSuite">AgentSuite</a></dt>
<dd></dd>
<dt><a href="#EnvironmentBuilder">EnvironmentBuilder</a></dt>
<dd></dd>
<dt><a href="#EnvironmentSuite">EnvironmentSuite</a></dt>
<dd></dd>
<dt><a href="#Discrete">Discrete</a> ⇐ <code><a href="#Hyperparameter">Hyperparameter</a></code></dt>
<dd><p>Class representing a hyperparameter with a discrete
set of possible values</p>
</dd>
<dt><a href="#Exponential">Exponential</a> ⇐ <code><a href="#Hyperparameter">Hyperparameter</a></code></dt>
<dd><p>Class representing a hyperparameter in logarithmic space</p>
</dd>
<dt><a href="#Fixed">Fixed</a> ⇐ <code><a href="#Hyperparameter">Hyperparameter</a></code></dt>
<dd><p>Class representing a Fixed hyperparameter</p>
</dd>
<dt><a href="#Linear">Linear</a> ⇐ <code><a href="#Hyperparameter">Hyperparameter</a></code></dt>
<dd><p>Class reperesenting a hyperparameter in linear space</p>
</dd>
</dl>

## Interfaces

<dl>
<dt><a href="#Hyperparameter">Hyperparameter</a></dt>
<dd><p>Interface defining hyperparameter configuration</p>
</dd>
<dt><a href="#ContinuousEnvironmentFactory">ContinuousEnvironmentFactory</a> ⇐ <code>EnvironmentFactory</code></dt>
<dd><p>Interface for an EnvironmentFactory corresponding to an Environment
with a single continuous action and a continuous state space.
The actions should be bounded by some range.
The observation should be an array of numbers.</p>
</dd>
<dt><a href="#DiscreteEnvironmentFactory">DiscreteEnvironmentFactory</a> ⇐ <code>EnvironmentFactory</code></dt>
<dd><p>Interface for an EnvironmentFactory corresponding to an Environment
with discrete actions and a continuous state space.
The actions should be an array of strings.
The observation should be an array of numbers.</p>
</dd>
<dt><a href="#TabularEnvironmentFactory">TabularEnvironmentFactory</a> ⇐ <code>EnvironmentFactory</code></dt>
<dd><p>Interface for an EnvironmentFactory corresponding to an Environment
with discrete actions and a discrete state space.
The actions should be an array of strings.</p>
</dd>
</dl>

<a name="Hyperparameter"></a>

## Hyperparameter
Interface defining hyperparameter configuration

**Kind**: global interface  

* [Hyperparameter](#Hyperparameter)
    * [.getName()](#Hyperparameter+getName) ⇒ <code>string</code>
    * [.defaultValue()](#Hyperparameter+defaultValue) ⇒ <code>\*</code>
    * [.randomValue()](#Hyperparameter+randomValue) ⇒ <code>\*</code>
    * [.discretize(steps)](#Hyperparameter+discretize) ⇒ <code>array</code>

<a name="Hyperparameter+getName"></a>

### hyperparameter.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>Hyperparameter</code>](#Hyperparameter)  
**Returns**: <code>string</code> - the name of the hyperparameter  
<a name="Hyperparameter+defaultValue"></a>

### hyperparameter.defaultValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Hyperparameter</code>](#Hyperparameter)  
**Returns**: <code>\*</code> - the default value for the hyperparameter  
<a name="Hyperparameter+randomValue"></a>

### hyperparameter.randomValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Hyperparameter</code>](#Hyperparameter)  
**Returns**: <code>\*</code> - a randomly chosen value for the hyperparameter  
<a name="Hyperparameter+discretize"></a>

### hyperparameter.discretize(steps) ⇒ <code>array</code>
Discretize the range into evenly spaced values

**Kind**: instance method of [<code>Hyperparameter</code>](#Hyperparameter)  
**Returns**: <code>array</code> - an array of hyperparameter values  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>number</code> | an integer number of steps to discretize the range into |

<a name="ContinuousEnvironmentFactory"></a>

## ContinuousEnvironmentFactory ⇐ <code>EnvironmentFactory</code>
Interface for an EnvironmentFactory corresponding to an Environment
with a single continuous action and a continuous state space.
The actions should be bounded by some range.
The observation should be an array of numbers.

**Kind**: global interface  
**Extends**: <code>EnvironmentFactory</code>  

* [ContinuousEnvironmentFactory](#ContinuousEnvironmentFactory) ⇐ <code>EnvironmentFactory</code>
    * [.getObservationCount()](#ContinuousEnvironmentFactory+getObservationCount) ⇒ <code>number</code>
    * [.getActionRange()](#ContinuousEnvironmentFactory+getActionRange) ⇒ <code>Array.&lt;number&gt;</code>

<a name="ContinuousEnvironmentFactory+getObservationCount"></a>

### continuousEnvironmentFactory.getObservationCount() ⇒ <code>number</code>
**Kind**: instance method of [<code>ContinuousEnvironmentFactory</code>](#ContinuousEnvironmentFactory)  
**Returns**: <code>number</code> - The size of the observation array for the environment  
<a name="ContinuousEnvironmentFactory+getActionRange"></a>

### continuousEnvironmentFactory.getActionRange() ⇒ <code>Array.&lt;number&gt;</code>
**Kind**: instance method of [<code>ContinuousEnvironmentFactory</code>](#ContinuousEnvironmentFactory)  
**Returns**: <code>Array.&lt;number&gt;</code> - An array whose first element represents the lower bound of the action, and the second element represents the upper bound.  
<a name="DiscreteEnvironmentFactory"></a>

## DiscreteEnvironmentFactory ⇐ <code>EnvironmentFactory</code>
Interface for an EnvironmentFactory corresponding to an Environment
with discrete actions and a continuous state space.
The actions should be an array of strings.
The observation should be an array of numbers.

**Kind**: global interface  
**Extends**: <code>EnvironmentFactory</code>  

* [DiscreteEnvironmentFactory](#DiscreteEnvironmentFactory) ⇐ <code>EnvironmentFactory</code>
    * [.getObservationCount()](#DiscreteEnvironmentFactory+getObservationCount) ⇒ <code>number</code>
    * [.getActions()](#DiscreteEnvironmentFactory+getActions) ⇒ <code>Array.&lt;string&gt;</code>

<a name="DiscreteEnvironmentFactory+getObservationCount"></a>

### discreteEnvironmentFactory.getObservationCount() ⇒ <code>number</code>
**Kind**: instance method of [<code>DiscreteEnvironmentFactory</code>](#DiscreteEnvironmentFactory)  
**Returns**: <code>number</code> - The size of the observation array for the environment  
<a name="DiscreteEnvironmentFactory+getActions"></a>

### discreteEnvironmentFactory.getActions() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>DiscreteEnvironmentFactory</code>](#DiscreteEnvironmentFactory)  
**Returns**: <code>Array.&lt;string&gt;</code> - The action set for the environment  
<a name="TabularEnvironmentFactory"></a>

## TabularEnvironmentFactory ⇐ <code>EnvironmentFactory</code>
Interface for an EnvironmentFactory corresponding to an Environment
with discrete actions and a discrete state space.
The actions should be an array of strings.

**Kind**: global interface  
**Extends**: <code>EnvironmentFactory</code>  

* [TabularEnvironmentFactory](#TabularEnvironmentFactory) ⇐ <code>EnvironmentFactory</code>
    * [.getStates()](#TabularEnvironmentFactory+getStates) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getActions()](#TabularEnvironmentFactory+getActions) ⇒ <code>Array.&lt;string&gt;</code>

<a name="TabularEnvironmentFactory+getStates"></a>

### tabularEnvironmentFactory.getStates() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>TabularEnvironmentFactory</code>](#TabularEnvironmentFactory)  
**Returns**: <code>Array.&lt;string&gt;</code> - The state set for the environment  
<a name="TabularEnvironmentFactory+getActions"></a>

### tabularEnvironmentFactory.getActions() ⇒ <code>Array.&lt;string&gt;</code>
**Kind**: instance method of [<code>TabularEnvironmentFactory</code>](#TabularEnvironmentFactory)  
**Returns**: <code>Array.&lt;string&gt;</code> - The action set for the environment  
<a name="AgentBuilder"></a>

## AgentBuilder
**Kind**: global class  

* [AgentBuilder](#AgentBuilder)
    * [new AgentBuilder()](#new_AgentBuilder_new)
    * [.getName()](#AgentBuilder+getName) ⇒ <code>string</code>
    * [.getId()](#AgentBuilder+getId) ⇒ <code>string</code>
    * [.getHyperparameterDefinitions()](#AgentBuilder+getHyperparameterDefinitions) ⇒ <code>object</code>
    * [.buildFactory()](#AgentBuilder+buildFactory) ⇒
    * [.buildAgent()](#AgentBuilder+buildAgent) ⇒
    * [.setEnvironmentFactory(environmentFactory)](#AgentBuilder+setEnvironmentFactory)
    * [.setHyperparameters(hyperparameters)](#AgentBuilder+setHyperparameters)
    * [.clone()](#AgentBuilder+clone) ⇒

<a name="new_AgentBuilder_new"></a>

### new AgentBuilder()
Class defining a builder for AgentFactories.
Used for defining the configuration of the
resulting Agent

<a name="AgentBuilder+getName"></a>

### agentBuilder.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>AgentBuilder</code>](#AgentBuilder)  
**Returns**: <code>string</code> - Display name of the Agent  
<a name="AgentBuilder+getId"></a>

### agentBuilder.getId() ⇒ <code>string</code>
**Kind**: instance method of [<code>AgentBuilder</code>](#AgentBuilder)  
**Returns**: <code>string</code> - The unique identifier for the Agent  
<a name="AgentBuilder+getHyperparameterDefinitions"></a>

### agentBuilder.getHyperparameterDefinitions() ⇒ <code>object</code>
**Kind**: instance method of [<code>AgentBuilder</code>](#AgentBuilder)  
**Returns**: <code>object</code> - The hyperparameter definitions and ranges for the Agent  
<a name="AgentBuilder+buildFactory"></a>

### agentBuilder.buildFactory() ⇒
**Kind**: instance method of [<code>AgentBuilder</code>](#AgentBuilder)  
**Returns**: A fully configured AgentFactory  
<a name="AgentBuilder+buildAgent"></a>

### agentBuilder.buildAgent() ⇒
**Kind**: instance method of [<code>AgentBuilder</code>](#AgentBuilder)  
**Returns**: A fully configured Agent  
<a name="AgentBuilder+setEnvironmentFactory"></a>

### agentBuilder.setEnvironmentFactory(environmentFactory)
The EnvironmentFactory corresponding to the
specific Environment that the AgentFactory
should be built for.

**Kind**: instance method of [<code>AgentBuilder</code>](#AgentBuilder)  

| Param | Type |
| --- | --- |
| environmentFactory | <code>EnvironmentFactory</code> | 

<a name="AgentBuilder+setHyperparameters"></a>

### agentBuilder.setHyperparameters(hyperparameters)
The specific set of hyperparameters for
the agents constructed by the AgentFactory.

**Kind**: instance method of [<code>AgentBuilder</code>](#AgentBuilder)  

| Param | Type |
| --- | --- |
| hyperparameters | <code>Hyperparameters</code> | 

<a name="AgentBuilder+clone"></a>

### agentBuilder.clone() ⇒
Clone this AgentBuilder

**Kind**: instance method of [<code>AgentBuilder</code>](#AgentBuilder)  
**Returns**: AgentBuilder  
<a name="AgentSuite"></a>

## AgentSuite
**Kind**: global class  

* [AgentSuite](#AgentSuite)
    * [new AgentSuite()](#new_AgentSuite_new)
    * [.getName()](#AgentSuite+getName) ⇒ <code>string</code>
    * [.getId()](#AgentSuite+getId) ⇒ <code>string</code>
    * [.listAgents()](#AgentSuite+listAgents) ⇒ [<code>Array.&lt;AgentBuilder&gt;</code>](#AgentBuilder)
    * [.getAgentBuilder(id)](#AgentSuite+getAgentBuilder) ⇒ [<code>AgentBuilder</code>](#AgentBuilder)
    * [.getEnvironmentType()](#AgentSuite+getEnvironmentType) ⇒ <code>\*</code>

<a name="new_AgentSuite_new"></a>

### new AgentSuite()
Class representing a suite of similar or related agents.

<a name="AgentSuite+getName"></a>

### agentSuite.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>AgentSuite</code>](#AgentSuite)  
**Returns**: <code>string</code> - Display name of the agent suite  
<a name="AgentSuite+getId"></a>

### agentSuite.getId() ⇒ <code>string</code>
**Kind**: instance method of [<code>AgentSuite</code>](#AgentSuite)  
**Returns**: <code>string</code> - Unique ID of the agent suite  
<a name="AgentSuite+listAgents"></a>

### agentSuite.listAgents() ⇒ [<code>Array.&lt;AgentBuilder&gt;</code>](#AgentBuilder)
**Kind**: instance method of [<code>AgentSuite</code>](#AgentSuite)  
**Returns**: [<code>Array.&lt;AgentBuilder&gt;</code>](#AgentBuilder) - An array of AgentBuilders  
<a name="AgentSuite+getAgentBuilder"></a>

### agentSuite.getAgentBuilder(id) ⇒ [<code>AgentBuilder</code>](#AgentBuilder)
**Kind**: instance method of [<code>AgentSuite</code>](#AgentSuite)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The unique ID for the AgentBuilder |

<a name="AgentSuite+getEnvironmentType"></a>

### agentSuite.getEnvironmentType() ⇒ <code>\*</code>
Get the type of the environments that agents
in this suite can handle.
E.g. DiscreteEnvironmentFactory, TabularEnvironmentFactory, etc.

**Kind**: instance method of [<code>AgentSuite</code>](#AgentSuite)  
**Returns**: <code>\*</code> - An EnvironmentFactory type  
<a name="EnvironmentBuilder"></a>

## EnvironmentBuilder
**Kind**: global class  

* [EnvironmentBuilder](#EnvironmentBuilder)
    * [.getId()](#EnvironmentBuilder+getId) ⇒ <code>string</code>
    * [.getName()](#EnvironmentBuilder+getName) ⇒ <code>string</code>
    * [.buildFactory()](#EnvironmentBuilder+buildFactory) ⇒ <code>EnvironmentFactory</code>
    * [.getHyperparameterDefinitions()](#EnvironmentBuilder+getHyperparameterDefinitions) ⇒ <code>object</code>
    * [.setHyperparameters(hyperparameters)](#EnvironmentBuilder+setHyperparameters)
    * [.buildEnvironment()](#EnvironmentBuilder+buildEnvironment) ⇒ <code>Environment</code>

<a name="EnvironmentBuilder+getId"></a>

### environmentBuilder.getId() ⇒ <code>string</code>
**Kind**: instance method of [<code>EnvironmentBuilder</code>](#EnvironmentBuilder)  
**Returns**: <code>string</code> - The unique ID of the EnvironmentBuilder  
<a name="EnvironmentBuilder+getName"></a>

### environmentBuilder.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>EnvironmentBuilder</code>](#EnvironmentBuilder)  
**Returns**: <code>string</code> - Display name of the EnvironmentBuilder  
<a name="EnvironmentBuilder+buildFactory"></a>

### environmentBuilder.buildFactory() ⇒ <code>EnvironmentFactory</code>
**Kind**: instance method of [<code>EnvironmentBuilder</code>](#EnvironmentBuilder)  
**Returns**: <code>EnvironmentFactory</code> - Get an instance of EnvironmentFactory  
<a name="EnvironmentBuilder+getHyperparameterDefinitions"></a>

### environmentBuilder.getHyperparameterDefinitions() ⇒ <code>object</code>
**Kind**: instance method of [<code>EnvironmentBuilder</code>](#EnvironmentBuilder)  
**Returns**: <code>object</code> - The hyperparameter definitions and ranges for the Environment  
<a name="EnvironmentBuilder+setHyperparameters"></a>

### environmentBuilder.setHyperparameters(hyperparameters)
The specific set of hyperparameters for
the agents constructed by the EnvironmentFactory.

**Kind**: instance method of [<code>EnvironmentBuilder</code>](#EnvironmentBuilder)  

| Param | Type |
| --- | --- |
| hyperparameters | <code>Hyperparameters</code> | 

<a name="EnvironmentBuilder+buildEnvironment"></a>

### environmentBuilder.buildEnvironment() ⇒ <code>Environment</code>
**Kind**: instance method of [<code>EnvironmentBuilder</code>](#EnvironmentBuilder)  
**Returns**: <code>Environment</code> - Build an instance of the Environment  
<a name="EnvironmentSuite"></a>

## EnvironmentSuite
**Kind**: global class  

* [EnvironmentSuite](#EnvironmentSuite)
    * [new EnvironmentSuite()](#new_EnvironmentSuite_new)
    * [.getName()](#EnvironmentSuite+getName) ⇒ <code>string</code>
    * [.getId()](#EnvironmentSuite+getId) ⇒ <code>string</code>
    * [.getType()](#EnvironmentSuite+getType) ⇒ <code>\*</code>
    * [.listEnvironments()](#EnvironmentSuite+listEnvironments) ⇒ [<code>Array.&lt;EnvironmentBuilder&gt;</code>](#EnvironmentBuilder)
    * [.getEnvironmentBuilder(environmentName)](#EnvironmentSuite+getEnvironmentBuilder) ⇒

<a name="new_EnvironmentSuite_new"></a>

### new EnvironmentSuite()
Class representing a set of similar or related Environments

<a name="EnvironmentSuite+getName"></a>

### environmentSuite.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>EnvironmentSuite</code>](#EnvironmentSuite)  
**Returns**: <code>string</code> - The display name of the EnvironmentSuite  
<a name="EnvironmentSuite+getId"></a>

### environmentSuite.getId() ⇒ <code>string</code>
**Kind**: instance method of [<code>EnvironmentSuite</code>](#EnvironmentSuite)  
**Returns**: <code>string</code> - The unique ID of the EnvironmentSuite  
<a name="EnvironmentSuite+getType"></a>

### environmentSuite.getType() ⇒ <code>\*</code>
**Kind**: instance method of [<code>EnvironmentSuite</code>](#EnvironmentSuite)  
**Returns**: <code>\*</code> - A subclass of EnvironmentFactory corresponding to the EnvironmentType  
<a name="EnvironmentSuite+listEnvironments"></a>

### environmentSuite.listEnvironments() ⇒ [<code>Array.&lt;EnvironmentBuilder&gt;</code>](#EnvironmentBuilder)
**Kind**: instance method of [<code>EnvironmentSuite</code>](#EnvironmentSuite)  
**Returns**: [<code>Array.&lt;EnvironmentBuilder&gt;</code>](#EnvironmentBuilder) - An array of the EnvironmentBuilders  
<a name="EnvironmentSuite+getEnvironmentBuilder"></a>

### environmentSuite.getEnvironmentBuilder(environmentName) ⇒
**Kind**: instance method of [<code>EnvironmentSuite</code>](#EnvironmentSuite)  
**Returns**: EnvironmentFactory  

| Param |
| --- |
| environmentName | 

<a name="Discrete"></a>

## Discrete ⇐ [<code>Hyperparameter</code>](#Hyperparameter)
Class representing a hyperparameter with a discrete
set of possible values

**Kind**: global class  
**Extends**: [<code>Hyperparameter</code>](#Hyperparameter)  

* [Discrete](#Discrete) ⇐ [<code>Hyperparameter</code>](#Hyperparameter)
    * [.getName()](#Hyperparameter+getName) ⇒ <code>string</code>
    * [.defaultValue()](#Hyperparameter+defaultValue) ⇒ <code>\*</code>
    * [.randomValue()](#Hyperparameter+randomValue) ⇒ <code>\*</code>
    * [.discretize(steps)](#Hyperparameter+discretize) ⇒ <code>array</code>

<a name="Hyperparameter+getName"></a>

### discrete.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>Discrete</code>](#Discrete)  
**Overrides**: [<code>getName</code>](#Hyperparameter+getName)  
**Returns**: <code>string</code> - the name of the hyperparameter  
<a name="Hyperparameter+defaultValue"></a>

### discrete.defaultValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Discrete</code>](#Discrete)  
**Overrides**: [<code>defaultValue</code>](#Hyperparameter+defaultValue)  
**Returns**: <code>\*</code> - the default value for the hyperparameter  
<a name="Hyperparameter+randomValue"></a>

### discrete.randomValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Discrete</code>](#Discrete)  
**Overrides**: [<code>randomValue</code>](#Hyperparameter+randomValue)  
**Returns**: <code>\*</code> - a randomly chosen value for the hyperparameter  
<a name="Hyperparameter+discretize"></a>

### discrete.discretize(steps) ⇒ <code>array</code>
Discretize the range into evenly spaced values

**Kind**: instance method of [<code>Discrete</code>](#Discrete)  
**Overrides**: [<code>discretize</code>](#Hyperparameter+discretize)  
**Returns**: <code>array</code> - an array of hyperparameter values  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>number</code> | an integer number of steps to discretize the range into |

<a name="Exponential"></a>

## Exponential ⇐ [<code>Hyperparameter</code>](#Hyperparameter)
Class representing a hyperparameter in logarithmic space

**Kind**: global class  
**Extends**: [<code>Hyperparameter</code>](#Hyperparameter)  

* [Exponential](#Exponential) ⇐ [<code>Hyperparameter</code>](#Hyperparameter)
    * [.getName()](#Hyperparameter+getName) ⇒ <code>string</code>
    * [.defaultValue()](#Hyperparameter+defaultValue) ⇒ <code>\*</code>
    * [.randomValue()](#Hyperparameter+randomValue) ⇒ <code>\*</code>
    * [.discretize(steps)](#Hyperparameter+discretize) ⇒ <code>array</code>

<a name="Hyperparameter+getName"></a>

### exponential.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>Exponential</code>](#Exponential)  
**Overrides**: [<code>getName</code>](#Hyperparameter+getName)  
**Returns**: <code>string</code> - the name of the hyperparameter  
<a name="Hyperparameter+defaultValue"></a>

### exponential.defaultValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Exponential</code>](#Exponential)  
**Overrides**: [<code>defaultValue</code>](#Hyperparameter+defaultValue)  
**Returns**: <code>\*</code> - the default value for the hyperparameter  
<a name="Hyperparameter+randomValue"></a>

### exponential.randomValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Exponential</code>](#Exponential)  
**Overrides**: [<code>randomValue</code>](#Hyperparameter+randomValue)  
**Returns**: <code>\*</code> - a randomly chosen value for the hyperparameter  
<a name="Hyperparameter+discretize"></a>

### exponential.discretize(steps) ⇒ <code>array</code>
Discretize the range into evenly spaced values

**Kind**: instance method of [<code>Exponential</code>](#Exponential)  
**Overrides**: [<code>discretize</code>](#Hyperparameter+discretize)  
**Returns**: <code>array</code> - an array of hyperparameter values  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>number</code> | an integer number of steps to discretize the range into |

<a name="Fixed"></a>

## Fixed ⇐ [<code>Hyperparameter</code>](#Hyperparameter)
Class representing a Fixed hyperparameter

**Kind**: global class  
**Extends**: [<code>Hyperparameter</code>](#Hyperparameter)  

* [Fixed](#Fixed) ⇐ [<code>Hyperparameter</code>](#Hyperparameter)
    * [.getName()](#Hyperparameter+getName) ⇒ <code>string</code>
    * [.defaultValue()](#Hyperparameter+defaultValue) ⇒ <code>\*</code>
    * [.randomValue()](#Hyperparameter+randomValue) ⇒ <code>\*</code>
    * [.discretize(steps)](#Hyperparameter+discretize) ⇒ <code>array</code>

<a name="Hyperparameter+getName"></a>

### fixed.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>Fixed</code>](#Fixed)  
**Overrides**: [<code>getName</code>](#Hyperparameter+getName)  
**Returns**: <code>string</code> - the name of the hyperparameter  
<a name="Hyperparameter+defaultValue"></a>

### fixed.defaultValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Fixed</code>](#Fixed)  
**Overrides**: [<code>defaultValue</code>](#Hyperparameter+defaultValue)  
**Returns**: <code>\*</code> - the default value for the hyperparameter  
<a name="Hyperparameter+randomValue"></a>

### fixed.randomValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Fixed</code>](#Fixed)  
**Overrides**: [<code>randomValue</code>](#Hyperparameter+randomValue)  
**Returns**: <code>\*</code> - a randomly chosen value for the hyperparameter  
<a name="Hyperparameter+discretize"></a>

### fixed.discretize(steps) ⇒ <code>array</code>
Discretize the range into evenly spaced values

**Kind**: instance method of [<code>Fixed</code>](#Fixed)  
**Overrides**: [<code>discretize</code>](#Hyperparameter+discretize)  
**Returns**: <code>array</code> - an array of hyperparameter values  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>number</code> | an integer number of steps to discretize the range into |

<a name="Linear"></a>

## Linear ⇐ [<code>Hyperparameter</code>](#Hyperparameter)
Class reperesenting a hyperparameter in linear space

**Kind**: global class  
**Extends**: [<code>Hyperparameter</code>](#Hyperparameter)  

* [Linear](#Linear) ⇐ [<code>Hyperparameter</code>](#Hyperparameter)
    * [.getName()](#Hyperparameter+getName) ⇒ <code>string</code>
    * [.defaultValue()](#Hyperparameter+defaultValue) ⇒ <code>\*</code>
    * [.randomValue()](#Hyperparameter+randomValue) ⇒ <code>\*</code>
    * [.discretize(steps)](#Hyperparameter+discretize) ⇒ <code>array</code>

<a name="Hyperparameter+getName"></a>

### linear.getName() ⇒ <code>string</code>
**Kind**: instance method of [<code>Linear</code>](#Linear)  
**Overrides**: [<code>getName</code>](#Hyperparameter+getName)  
**Returns**: <code>string</code> - the name of the hyperparameter  
<a name="Hyperparameter+defaultValue"></a>

### linear.defaultValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Linear</code>](#Linear)  
**Overrides**: [<code>defaultValue</code>](#Hyperparameter+defaultValue)  
**Returns**: <code>\*</code> - the default value for the hyperparameter  
<a name="Hyperparameter+randomValue"></a>

### linear.randomValue() ⇒ <code>\*</code>
**Kind**: instance method of [<code>Linear</code>](#Linear)  
**Overrides**: [<code>randomValue</code>](#Hyperparameter+randomValue)  
**Returns**: <code>\*</code> - a randomly chosen value for the hyperparameter  
<a name="Hyperparameter+discretize"></a>

### linear.discretize(steps) ⇒ <code>array</code>
Discretize the range into evenly spaced values

**Kind**: instance method of [<code>Linear</code>](#Linear)  
**Overrides**: [<code>discretize</code>](#Hyperparameter+discretize)  
**Returns**: <code>array</code> - an array of hyperparameter values  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>number</code> | an integer number of steps to discretize the range into |

