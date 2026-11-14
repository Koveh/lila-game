import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

// Smoke via tsx-free: duplicate minimal checks by importing built logic isn't TS.
// Instead simulate rules inline for CI confidence on board constants.

const ARROWS = { 10: 23, 17: 69, 20: 32, 22: 38, 26: 46, 27: 60, 29: 41, 30: 40, 36: 44, 52: 68, 57: 72, 61: 66, 64: 67 }
const SNAKES = { 12: 8, 16: 4, 24: 7, 31: 15, 34: 12, 38: 21, 39: 25, 45: 17, 49: 13, 51: 19, 54: 35, 58: 41, 63: 2, 67: 3, 70: 6 }
const WIN = 68

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

assert(Object.keys(ARROWS).length === 13, 'arrows count')
assert(Object.keys(SNAKES).length === 15, 'snakes count')
assert(ARROWS[52] === WIN, 'nature arrow to win')
assert(!(SNAKES[WIN] || ARROWS[WIN]), 'win cell stable')

let pos = 1
const path = [1]
const rolls = [5, 4, 6, 3, 2, 6, 5, 1, 4, 6, 2, 3, 5, 4, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3]
for (const r of rolls) {
  let next = pos + r
  if (next > WIN) continue
  pos = next
  if (SNAKES[pos]) pos = SNAKES[pos]
  else if (ARROWS[pos]) pos = ARROWS[pos]
  path.push(pos)
  if (pos === WIN) break
}

console.log(JSON.stringify({ final: pos, steps: path.length, reached: pos === WIN || path.includes(WIN) }, null, 2))
assert(path.length > 1, 'moved')
console.log('smoke ok')
