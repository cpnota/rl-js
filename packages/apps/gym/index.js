const { Environment, EnvironmentFactory } = require('@rl-js/interfaces');
const { discrete } = require('@rl-js/baseline-agent-suites');

const { spawn } = require('child_process');
const readline = require('readline');

const gym = spawn('python', ['python/index.py', '-u']);


const reader = readline.createInterface({
  input: gym.stdout,
});

let ob;
let reward;
let done;

class GymEnvironment extends Environment {
  dispatch(action) {
    console.log(action);
    gym.stdin.write(`${JSON.stringify(action)}\n`);
  }

  getObservation() {
    return ob;
  }

  getReward() {
    return reward || 0;
  }

  isTerminated() {
    return done;
  }
}

const env = new GymEnvironment();

class GymEnvironmentFactory extends EnvironmentFactory {
  createEnvironment() {
    return env;
  }

  getObservationCount() {
    return 4;
  }

  getActions() {
    return [0, 1];
  }
}

const agent = discrete
  .getAgentBuilder('sarsa-lambda')
  .setEnvironmentFactory(new GymEnvironmentFactory())
  .setHyperparameters({
    order: 2,
    alpha: 0.001,
  })
  .buildFactory()
  .createAgent();

const initialized = false;

reader.on('line', (data) => {
  try {
    ({ ob, reward, done } = JSON.parse(data.toString()));
    console.log({ ob, reward, done });
    if (done || !initialized) agent.newEpisode(env);
    agent.act();
  } catch (err) {
    console.error(err);
  }
});

gym.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
