import React from 'react';
import { connect } from 'react-redux';
import { Container, Divider } from 'semantic-ui-react';

const styles = {
  container: {
    borderLeft: '1px solid #ddd',
    boxSizing: 'border-box',
    margin: 0,
    minHeight: 150,
    paddingLeft: 28,
    textAlign: 'left',
    width: 220,
  },
  label: {
    color: '#555',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  action: {
    color: '#222',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '36px',
    minHeight: 36,
  },
  value: {
    color: '#222',
    fontSize: 44,
    fontWeight: 500,
    lineHeight: '48px',
  },
};

const formatAction = (action) => {
  if (!action || !action.type) {
    return 'None';
  }

  return action.type;
};

const Statistics = ({ returns, lastAction }) => (
  <Container style={styles.container}>
    <div>
      <div style={styles.label}>Last Action</div>
      <div style={styles.action}>{formatAction(lastAction)}</div>
    </div>
    <Divider />
    <div>
      <div style={styles.label}>Returns</div>
      <div style={styles.value}>{returns}</div>
    </div>
  </Container>
);

const mapStateToProps = state => ({
  returns: state.returns,
  lastAction: state.lastAction,
});

export default connect(mapStateToProps)(Statistics);
