const sum = (sample) => {
  let result = 0;
  for (let i = 0; i < sample.length; i += 1) {
    result += sample[i];
  }
  return result / sample.length;
};

const mean = (sample) => {
  let result = 0;
  for (let i = 0; i < sample.length; i += 1) {
    result += sample[i];
  }
  return result / sample.length;
};

const std = (sample) => {
  const mu = mean(sample);
  const N = sample.length;
  let s = 0;
  for (let i = 0; i < N; i += 1) {
    s += (sample[i] - mu) ** 2;
  }
  return Math.sqrt(s / N);
};

// compute the mean and std
const gaussian = (sample) => {
  const mu = mean(sample);
  const N = sample.length;
  let s = 0;
  for (let i = 0; i < N; i += 1) {
    s += (sample[i] - mu) ** 2;
  }
  const stdev = Math.sqrt(s / N);
  return [mu, stdev];
};

const max = (sample) => {
  let m = -Infinity;
  for (let i = 0; i < sample.length; i += 1) {
    const v = sample[i];
    if (v > m) m = v;
  }
  return m;
};

module.exports = {
  sum,
  mean,
  std,
  gaussian,
  max,
};
