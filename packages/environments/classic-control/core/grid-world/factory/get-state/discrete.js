module.exports = (layout) => {
  const height = layout.length;
  const width = Math.max(...layout.map(row => row.length));
  return state => [state.x / (width - 1), state.y / (height - 1)];
};
