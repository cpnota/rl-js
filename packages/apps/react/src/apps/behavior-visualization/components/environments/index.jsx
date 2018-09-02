import React from 'react';

import {
  Container, Header, Divider, Progress,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import GridWorld from '../../../../components/environments/classic-control/grid-world/3x3';

const Environment = ({
  state,
}) => (
  <Container>
    {state && <GridWorld state={state} />}
  </Container>
);

const mapStateToProps = state => ({
  state: state.environmentState,
});

export default connect(mapStateToProps)(Environment);
