const Seldonian = require('./')
const math = require('mathjs')

// maximize the mean return value of the candidate
// but make sure it returns odd numbers 80% of the time, 
// with 95% probability
const SampleProblem = {
  f_min: -1,
  f: (candidate, D) => math.mean(...D.map(data => candidate(data))),
  g: (candidate, data) => (candidate(data) % 2 === 0 ? 1 : 0) - 0.2,
  delta: 0.05
}

generateSampleData = samples => {
  return new Array(samples).fill().map(() => math.randomInt(4))
}

test('splits data into candidate and test sets', () => {
  const seldonian = new Seldonian({})
  const [D_c, D_s] = seldonian.splitData([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  expect(D_c).toEqual([0, 1])
  expect(D_s).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('computes u for candidate that is not likely to pass', () => {
  const seldonian = new Seldonian(SampleProblem)
  const candidate = d => d
  const D_c = [0, 1, 2]
  const m = 10
  const score = seldonian.u({ candidate, D_c, m: 1000 })
  expect(score).toBeCloseTo(0.526, 2)
})

test('computes u for candidate more likely to pass', () => {
  const seldonian = new Seldonian(SampleProblem)
  const candidate = d => d
  const D_c = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2] // mostly odd, should pass test
  const m = 10
  const score = seldonian.u({ candidate, D_c, m: 1000 })
  expect(score).toBeCloseTo(-0.067, 2)
})

test('computes score for candidate that is likely to pass', () => {
  const seldonian = new Seldonian(SampleProblem)
  const candidate = d => d
  const D_c = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2] // mostly odd, should pass test
  const m = 10
  const score = seldonian.scoreCandidate({ D_c, m: 1000 })(candidate)
  expect(score).toEqual(math.mean(...D_c))
})

test('computes score for candidate that is not likely to pass', () => {
  const seldonian = new Seldonian(SampleProblem)
  const candidate = d => d
  const D_c = [0, 1, 2]
  const m = 10
  const u = seldonian.u({ candidate, D_c, m: 5 })
  const score = seldonian.scoreCandidate({ D_c, m: 5 })(candidate)
  expect(score).toEqual(SampleProblem.f_min - u)
})

test('selects the best candidate', () => {
  const candidates = [
    d => d, // not safe!
    d => d * 2 - 1, // good
    d => d * 2 + 1, // best
    d => d * 4 // not safe!
  ]

  const seldonian = new Seldonian(SampleProblem)
  const candidate = d => d
  const [D_c, D_s] = seldonian.splitData(generateSampleData(1000))

  const bestCandidate = seldonian.chooseCandidate({
    candidates,
    D_c,
    D_s
  })
  expect(bestCandidate).toEqual(candidates[2])
})

test('safety test fails because of insufficient data', () => {
  const seldonian = new Seldonian(SampleProblem)
  const candidate = d => d
  const D_s = [...new Array(12).fill().map(() => 1), 2]
  expect(() => seldonian.safetyTest(candidate, D_s)).toThrow('No Solution Found')
})

test('safety test passes', () => {
  const seldonian = new Seldonian(SampleProblem)
  const candidate = d => d
  const D_s = [...new Array(13).fill().map(() => 1), 2]
  seldonian.safetyTest(candidate, D_s)
})

test('safety test fails bad candidate', () => {
  const seldonian = new Seldonian(SampleProblem)
  const candidate = d => d * 2
  const D_s = [...new Array(1000).fill().map(() => 1), 2]
  expect(() => seldonian.safetyTest(candidate, D_s)).toThrow('No Solution Found')
})
