# rl-js

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

rl-js is a framework for creating, training, and evaluating reinforcement learning agents in JavaScript. 

## ...why?

Python is the scripting language currently preferred by the machine learning community, but here are a few of reasons to consider JavaScript:

* JavaScript is *much* faster than Python.
* The ES2015+ spec is not your father's JavaScript.
* JavaScript runs on the web.

The latter point is the most important to me.
The web is the ultimate platform for sharing, and JavaScript is the *lingua franca*.

## Installation

npm and Node are prerequisites.
The preferred manner for installing node is through [nvm](https://github.com/creationix/nvm).

Once npm is installed, you'll need to install [Lerna](https://lernajs.io).

```bash
npm install --global lerna
```

Finally, you can clone this repo, and "bootstrap" the project using lerna:

```bash
git clone git@github.com:cpnota/rl-js.git
cd rl-js
lerna bootstrap
```

## Launching the App

You can run the `rl-js` app locally in your browser, allowing you to instantly try out changes.
After installing, simply run:

```
cd packages/apps/react
npm start
```

Then open [http://localhost:3000](http://localhost:30000) in your browser.


The app can also be installed as an external dependency in your own project, allowing you to inject your own agents, enviornments, and `rl-js` apps (instructions not provided yet).

## Design Philosophy

rl-js has two primary design goals:

1. The agents should be as easy to understand as possible. Their implementation should resemble the psuedo-code of their respective algorithms.
2. The framework should be as modular possible.

The first goal relates to the incomprehensibility of much of the reinforcement learning code currently available on the web.
This partially due to the widespread tendency to include deep-learning specific code directly into agent definitions.
To understand the code, you must understand not only the underlying reinforcement learning algorithm, but the deep-learning framework means as well!

There is a broader issue at play, however, which is the widespread disinterest in software engineering fundamentals within the machine learning community.
Ugly code often leads to the tragic result of code not being shared at all, hurting reproducibility.
When code is shared, it is often hard to extend or modify, making follow-up work more difficult.

The second goal, modularity, assists in the first, but there is another reason for it: modularity has a strong relationship with experimental design.
Many machine learning experiments involve replacing some component of an algorithm with a new proposed component, thereby establishing a causal relationship between the proposed component and the change in the performance of the algorithm.
Therefore, good research code should allow the easy swapping of components. 
This is the very definition of modularity!

We hope that we have achieved these goals at least partially, and that as a result, this framework will be useful to both new practitioners and experienced researchers.

## Usage

The code for rl-js is hosted on GitHub. 
Most of the time, however, you should install the packages directly [from npm](https://www.npmjs.com/search?q=%40rl-js) as needed, and build on top of them as needed.
