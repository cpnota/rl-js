const add = (v1, v2) => {
  const result = new Array(v1.length);
  for (let i = 0; i < v1.length; i += 1) {
    result[i] = v1[i] + v2[i];
  }
  return result;
};

const subtract = (v1, v2) => {
  const result = new Array(v1.length);
  for (let i = 0; i < v1.length; i += 1) {
    result[i] = v1[i] - v2[i];
  }
  return result;
};

const dot = (v1, v2) => {
  let result = 0;
  for (let i = 0; i < v1.length; i += 1) {
    result += v1[i] * v2[i];
  }
  return result;
};

const scale = (scalar, vector) => {
  const result = new Array(vector.length);
  for (let i = 0; i < vector.length; i += 1) {
    result[i] = scalar * vector[i];
  }
  return result;
};

/* eslint-disable no-param-reassign */
const inplace = {
  scale: (scalar, vector) => {
    for (let i = 0; i < vector.length; i += 1) {
      vector[i] *= scalar;
    }
    return vector;
  },
  add: (vector, v2) => {
    for (let i = 0; i < vector.length; i += 1) {
      vector[i] += v2[i];
    }
    return vector;
  },
  subtract: (vector, v2) => {
    for (let i = 0; i < vector.length; i += 1) {
      vector[i] -= v2[i];
    }
    return vector;
  },
  update: (alpha, vector, direction) => {
    for (let i = 0; i < vector.length; i += 1) {
      vector[i] += alpha * direction[i];
    }
    return vector;
  },
};

module.exports = {
  add,
  dot,
  scale,
  subtract,
  inplace,
};
