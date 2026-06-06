import React from 'react';
import PropTypes from 'prop-types';

const width = 500;
const height = 220;
const cartWidth = 70;
const cartHeight = 34;
const trackWidth = 420;
const trackLimit = 2.4;
const poleLength = 105;

export default class CartPole extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const context = this.canvas.getContext('2d');
    const { state } = this.props;
    const cartY = 155;
    const cartX = width / 2 + (state.x / trackLimit) * (trackWidth / 2);
    const pivotY = cartY - cartHeight / 2;
    const poleTipX = cartX + Math.sin(state.theta) * poleLength;
    const poleTipY = pivotY - Math.cos(state.theta) * poleLength;

    context.clearRect(0, 0, width, height);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = '#111';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo((width - trackWidth) / 2, cartY + cartHeight / 2 + 8);
    context.lineTo((width + trackWidth) / 2, cartY + cartHeight / 2 + 8);
    context.stroke();

    context.fillStyle = '#777';
    context.fillRect(cartX - cartWidth / 2, cartY - cartHeight / 2, cartWidth, cartHeight);
    context.strokeStyle = '#111';
    context.strokeRect(cartX - cartWidth / 2, cartY - cartHeight / 2, cartWidth, cartHeight);

    context.strokeStyle = '#b22222';
    context.lineWidth = 8;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(cartX, pivotY);
    context.lineTo(poleTipX, poleTipY);
    context.stroke();

    context.fillStyle = '#111';
    context.beginPath();
    context.arc(cartX, pivotY, 8, 0, 2 * Math.PI, false);
    context.fill();

    context.fillStyle = '#333';
    context.beginPath();
    context.arc(cartX - 22, cartY + cartHeight / 2, 8, 0, 2 * Math.PI, false);
    context.arc(cartX + 22, cartY + cartHeight / 2, 8, 0, 2 * Math.PI, false);
    context.fill();
  }

  render() {
    return (
      <canvas
        ref={(canvas) => { this.canvas = canvas; }}
        style={{ display: 'block' }}
        width={width}
        height={height}
      />
    );
  }
}

CartPole.propTypes = {
  state: PropTypes.shape({
    x: PropTypes.number.isRequired,
    theta: PropTypes.number.isRequired,
  }).isRequired,
};
