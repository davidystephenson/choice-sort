import { Choice, importItems, createFlow, getChoice } from '../src/index'
import combineOperations from '../src/combineOperations'
import operate from '../src/operate'

function decide (choice: Choice): string {
  const options = [choice.catalog, choice.queue]
  const numbers = options.map(s => Number(s))
  return numbers[0] > numbers[1] ? options[0] : options[1]
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
function getSteps (itemCount: number): number {
  const labels = shuffle(range(itemCount).map(i => String(i)))
  const items = labels.map(s => ({
    label: s,
    uid: s
  }))
  let flow = importItems({
    flow: createFlow({ uid: '0' }),
    items
  })
  let choice = getChoice({ flow })
  let steps = 0
  while (choice != null) {
    const option = decide(choice)
    flow = operate({ flow, option })
    flow = combineOperations({ flow })
    choice = getChoice({ flow })
    steps += 1
  }
  return steps
}
function getMeanSteps (samples: number, itemCount: number): number {
  const stepArray = range(samples).map(s => getSteps(itemCount))
  return mean(stepArray)
}

console.log('steps', getSteps(20))
console.log('steps', getSteps(20))
console.log('steps', getSteps(20))
console.log('steps', getSteps(20))
console.log('steps', getSteps(20))

console.log('meanSteps', getMeanSteps(1000, 20))
console.log('meanSteps', getMeanSteps(1000, 20))
console.log('meanSteps', getMeanSteps(1000, 20))
console.log('meanSteps', getMeanSteps(1000, 20))
console.log('meanSteps', getMeanSteps(1000, 20))

// originalMeanSteps = 68.2
