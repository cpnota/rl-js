import React from 'react';
import {
  Container, Divider,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { LearningCurve } from '../../../components';
import Statistics from './statistics';
import Environment from './environments';

const getTitle = (type, agent, environment) => `${type} (${agent.id}, ${environment.id})`;

const styles = {
  container: {
    maxWidth: 960,
    margin: '0 auto',
  },
  divider: {
    margin: '24px 0 22px',
  },
  visualizer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: 920,
    margin: '0 auto',
  },
  environment: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: 60,
    width: 670,
  },
  chart: {
    marginTop: 4,
    overflowX: 'auto',
    textAlign: 'center',
  },
};

const Results = ({
  results, agent, environment,
}) => (
  <Container fluid style={styles.container}>
    <Divider style={styles.divider} />
    <div style={styles.visualizer}>
      <div style={styles.environment}>
        <Environment />
      </div>
      <Statistics />
    </div>
    <div style={styles.chart}>
      <LearningCurve
        trials={results}
        title={getTitle('Learning Curve', agent, environment)}
        width={920}
        height={320}
      />
    </div>
  </Container>
);

const mapStateToProps = state => ({
  results: state.results,
});

export default connect(mapStateToProps)(Results);
