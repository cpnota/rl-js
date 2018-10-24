/* eslint-disable camelcase */
const math = require('mathjs')
const t_inv = require('./t-inv')

module.exports = class OneStepSeldonian {
  constructor({ f_min = 0, f, g, delta, dataRatio = 0.2 }) {
    this.f_min = f_min
    this.f = f
    this.g = g
    this.delta = delta
    this.dataRatio = 0.2
  }

  run(candidates, D) {
    const [D_c, D_s] = this.splitData(D)
    const candidate = this.chooseCandidate({
      candidates,
      D_c,
      D_s
    })
    this.safetyTest(candidate, D_s)
    return candidate
  }

  splitData(D) {
    const cutoff = Math.floor(D.length * this.dataRatio)
    return [D.slice(0, cutoff), D.slice(cutoff)]
  }

  chooseCandidate({ candidates, D_c, D_s }) {
    const candidateScores = candidates.map(
      this.scoreCandidate({ D_c, m: D_s.length })
    )
    const indexOfBest = indexOfMax(candidateScores)
    return candidates[indexOfBest]
  }

  safetyTest(candidate, D_s) {
    const { g, delta } = this
    const m = D_s.length
    const results = D_s.map(data => g(candidate, data))
    const mean = math.mean(results)
    const std = math.std(results)
    const t = t_inv(1 - delta, m - 1)
    const score = mean + std / math.sqrt(m) * t
    if (score > 0) throw new Error('No Solution Found')
  }

  scoreCandidate({ D_c, m }) {
    return candidate => {
      const u = this.u({ candidate, D_c, m })
      return u <= 0 ? this.f(candidate, D_c) : this.f_min - u
    }
  }

  u({ candidate, D_c, m }) {
    const { g, delta } = this
    const results = D_c.map(data => g(candidate, data))
    const mean = math.mean(results)
    const std = math.std(results)
    const t = t_inv(1 - delta, m - 1)
    return mean + 2 * std / math.sqrt(m) * t
  }
}

const indexOfMax = arr => {
  if (arr.length === 0) return -1

  var max = arr[0]
  var maxIndex = 0

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i
      max = arr[i]
    }
  }

  return maxIndex
}
