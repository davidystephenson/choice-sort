import { Choice, Flow, importItems, createFlow, getChoice } from '../src/index'
import addOperation from '../src/addOperation'
import combineOperations from '../src/combineOperations'
import createOperation from '../src/createOperation'
import isOutputOperation from '../src/isOutputOperation'
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
function allComplete (flow: Flow): boolean {
  const operations = Object.values(flow.operations)
  const outputOperations = operations.filter(operation => isOutputOperation({ operation }))
  return operations.length === outputOperations.length
}
function combineMoreOperations (flow: Flow): Flow {
  const operations = Object.values(flow.operations)
  const finishedOperations = operations.filter(operation => {
    return operation.catalog.length === 0 && operation.queue.length === 0
  })
  const unfinishedOperations = operations.filter(operation => {
    return operation.catalog.length > 0 || operation.queue.length > 0
  })
  const operationsToKeep = [...unfinishedOperations]
  const operationsToCombine = [...finishedOperations]
  if (operationsToCombine.length % 2 === 1) {
    const extraFinishedOperation = operationsToCombine.pop()
    if (extraFinishedOperation != null) {
      operationsToKeep.push(extraFinishedOperation)
    }
  }
  const operationsObject = Object.fromEntries(operationsToKeep.map(x => [x.uid, x]))
  let newFlow: Flow = {
    ...flow,
    operations: operationsObject
  }
  const clone = [...operationsToCombine]
  const sorted = clone.sort((a, b) => {
    const aLength = a.output.length
    const bLength = b.output.length
    if (aLength === bLength) {
      return a.uid < b.uid ? -1 : 1
    }
    return aLength < bLength ? -1 : 1
  })
  range(sorted.length / 2).forEach(i => {
    const operation1 = sorted[i * 2]
    const operation2 = sorted[i * 2 + 1]
    const firstShorter = operation1.output.length < operation2.output.length
    const shortOperation = firstShorter ? operation1 : operation2
    const longOperation = firstShorter ? operation2 : operation1
    const newOperation = createOperation({
      flow: newFlow,
      catalog: longOperation.output,
      queue: shortOperation.output,
      output: []
    })
    newFlow = addOperation({
      flow: newFlow,
      operation: newOperation
    })
  })
  return newFlow
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
const DOUBLE = true
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
    flow = operate({ flow, option: decide(choice) })
    if (DOUBLE) {
      flow = combineOperations({ flow })
    } else if (allComplete(flow)) {
      const combined = combineMoreOperations(flow)
      flow = combined
    }
    choice = getChoice({ flow })
    steps += 1
  }
  return steps
}
function getMeanSteps (samples: number, itemCount: number): number {
  const stepArray = range(samples).map(s => getSteps(itemCount))
  return mean(stepArray)
}

const SIZE = 40

console.info('steps', getSteps(SIZE))
console.info('steps', getSteps(SIZE))
console.info('steps', getSteps(SIZE))
console.info('steps', getSteps(SIZE))
console.info('steps', getSteps(SIZE))

console.info('meanSteps', getMeanSteps(1000, SIZE))
// console.info('meanSteps', getMeanSteps(1000, SIZE))
// console.info('meanSteps', getMeanSteps(1000, SIZE))
// console.info('meanSteps', getMeanSteps(1000, SIZE))
// console.info('meanSteps', getMeanSteps(1000, SIZE))

// originalMeanSteps = 68.2
