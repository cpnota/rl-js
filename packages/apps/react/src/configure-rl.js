const configuration = require('@rl-js/configuration');
configuration.registerAgentSuite(require('@rl-js/baseline-agent-suites'));
configuration.registerEnvironmentSuite(require('@rl-js/environments-classic-control'));
configuration.registerAgentSuite(require('@rl-js/coagents/suite'));
