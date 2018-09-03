import React from 'react';
import { connect } from 'react-redux';
import { Container, Statistic, Divider } from 'semantic-ui-react';

const StatisticExampleStatistic = ({ returns, lastAction }) => (
  <Container style={{width: 500}}>
    <Statistic>
      <Statistic.Value>{JSON.stringify(lastAction)}</Statistic.Value>
      <Statistic.Label>Last Action</Statistic.Label>
    </Statistic>
    <Divider />
    <Statistic>
      <Statistic.Value>{returns}</Statistic.Value>
      <Statistic.Label>returns</Statistic.Label>
    </Statistic>
  </Container>
);

const mapStateToProps = state => ({
  returns: state.returns,
  lastAction: state.lastAction,
});

export default connect(mapStateToProps)(StatisticExampleStatistic);
