const configuration = require('@rl-js/configuration');
configuration.registerAgentSuite(require('@rl-js/baseline-agent-suites/discrete'));
configuration.registerEnvironmentSuite(require('@rl-js/environments-classic-control/suites/discrete'));
