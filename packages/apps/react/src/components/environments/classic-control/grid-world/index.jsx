import React from 'react';
import { s, g, w } from '@rl-js/environments-classic-control/core/grid-world/factory/features';

const tileSize = 100;
const borderWidth = 2;

export default layout => class GridWorld extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  drawRow = (row, y) => row.forEach(this.drawTile(y))

  drawTile = y => (type, x) => {
    switch (type) {
      case s: return this.drawGround(x, y);
      case 0: return this.drawGround(x, y);
      case w: return this.drawWater(x, y);
      case g: return this.drawGoal(x, y);
      default: return undefined;
    }
  }

  drawGrid() {
    layout.forEach(this.drawRow);
  }

  updateCanvas() {
    this.drawGrid();
    this.drawRobot();
  }

  drawGround(x, y) {
    this.drawColoredTile(x, y, 'white');
  }


  drawWater(x, y) {
    this.drawColoredTile(x, y, 'blue');
  }

  drawGoal(x, y) {
    this.drawColoredTile(x, y, 'red');
  }

  drawColoredTile(x, y, color) {
    this.drawBorder(x, y);
    const context = this.canvas.getContext('2d');
    context.fillStyle = color;
    context.fillRect(
      x * tileSize + borderWidth,
      y * tileSize + borderWidth,
      tileSize - 2 * borderWidth,
      tileSize - 2 * borderWidth,
    );
  }

  drawBorder(x, y) {
    const context = this.canvas.getContext('2d');
    context.fillStyle = '#000';
    context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  }

  drawRobot() {
    const context = this.canvas.getContext('2d');
    const { state } = this.props;
    const { x, y } = state;
    const centerX = (x + 1 / 2) * (tileSize);
    const centerY = (y + 1 / 2) * (tileSize);
    const radius = tileSize / 3;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'grey';
    context.fill();
    context.lineWidth = borderWidth;
    context.strokeStyle = 'black';
    context.stroke();
  }

  render() {
    return (
      <canvas ref={(canvas) => { this.canvas = canvas; }} style={{ display: 'block' }} width={layout[0].length * tileSize} height={layout.length * tileSize} />
    ); 
  }
};
