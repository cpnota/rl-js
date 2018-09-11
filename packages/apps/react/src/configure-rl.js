const configuration = require('@rl-js/configuration');
configuration.registerAgentSuite(require('@rl-js/coagents/suite'));
configuration.registerAgentSuite(require('@rl-js/baseline-agent-suites'));
configuration.registerEnvironmentSuite(require('@rl-js/environments-classic-control'));
