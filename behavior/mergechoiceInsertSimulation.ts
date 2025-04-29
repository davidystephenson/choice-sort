import createState from '../src/mergechoice/createState'
import importItems from '../src/mergechoice/importItems'
import { Item, State } from '../src/mergechoice/mergeChoiceTypes'
import chooseOption from '../src/mergechoice/chooseOption'
import debugOperations from '../src/mergechoice/debugOperations'

function decide (state: State<Item>): number {
  if (state.choice == null) {
    throw new Error('No choice')
  }
  const numbers = state.choice.options.map(s => Number(s))
  const index = numbers[0] > numbers[1] ? 0 : 1
  return index
}
function shuffle (strings: string[]): string[] {
  return strings
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
function range (length: number): number[] {
  return [...Array(length).keys()]
}

function sum (x: number[]): number {
  let total = 0
  x.forEach(i => { total += i })
  return total
}
function mean (x: number[]): number {
  if (x.length === 0) return 0
  return sum(x) / x.length
}
function getSteps (itemCount: number, debug: boolean = false): number {
  const labels = shuffle(range(itemCount).map(i => String(i)))
  const items = labels.map(s => {
    const item: Item = {
      id: s,
      seeding: false,
      name: s
    }
    return item
  })
  let state = createState({ seed: '0' })
  state = importItems({
    state,
    items
  })
  if (debug) {
    debugOperations({ label: 'imported', items: state.items, operations: state.activeOperations })
  }
  while (!state.complete) {
    const option = decide(state)
    state = chooseOption({ state, betterIndex: option })
  }
  const random = Math.random()
  const scaled = random * itemCount
  const item: Item = {
    id: String(scaled),
    seeding: false,
    name: String(scaled)
  }
  state = importItems({ state, items: [item] })
  let steps = 0
  while (!state.complete) {
    const option = decide(state)
    state = chooseOption({ state, betterIndex: option })
    steps += 1
  }
  if (debug) {
    debugOperations({ label: 'complete', items: state.items, operations: state.activeOperations })
  }
  return steps
}
function getMeanSteps (samples: number, itemCount: number, debug?: number): number {
  const stepArray = range(samples).map((s, index) => {
    const steps = getSteps(itemCount)
    if (debug != null && index % debug === 0) {
      console.info(index, 'steps', steps)
    }
    return steps
  })
  return mean(stepArray)
}

const SIZE = 40

console.info('steps', getSteps(SIZE))
console.info('steps', getSteps(SIZE))
console.info('steps', getSteps(SIZE))
console.info('steps', getSteps(SIZE))
console.info('steps', getSteps(SIZE))

const SAMPLES = 100
console.info('meanSteps', getMeanSteps(SAMPLES, SIZE))
// console.info('meanSteps', getMeanSteps(SAMPLES, SIZE))
// console.info('meanSteps', getMeanSteps(SAMPLES, SIZE))
// console.info('meanSteps', getMeanSteps(SAMPLES, SIZE))
// console.info('meanSteps', getMeanSteps(SAMPLES, SIZE))

// originalMeanSteps = 68.2
