import React from 'react';

import {
  Container,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import CartPole from '../../../../components/environments/classic-control/cart-pole';
import GridWorld3x3 from '../../../../components/environments/classic-control/grid-world/3x3';
import GridWorld5x5 from '../../../../components/environments/classic-control/grid-world/5x5';

const getRenderer = (environment) => {
  if (!environment) {
    return undefined;
  }

  switch (environment.id) {
    case 'cart-pole':
      return CartPole;
    case 'grid-world':
    case 'grid-world-5x5':
      return GridWorld5x5;
    case 'grid-world-3x3':
      return GridWorld3x3;
    default:
      return undefined;
  }
};

const Environment = ({
  state,
  environment,
}) => {
  const Renderer = getRenderer(environment);

  return (
    <Container style={{ width: 500 }}>
      {state && Renderer && <Renderer state={state} />}
    </Container>
  );
};

const mapStateToProps = state => ({
  state: state.environmentState,
  environment: state.environment,
});

export default connect(mapStateToProps)(Environment);
