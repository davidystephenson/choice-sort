import { createFlow, getChoice, isFlowComplete } from '../../src'
import addOperation from '../../src/addOperation'
import createOperation from '../../src/createOperation'
import getChoiceOperation from '../../src/getChoiceOperation'
import getOptionIndex from '../../src/getOptionIndex'
import insertOperation from '../operation/insertOperation'
import getVerifiedChoice from './getVerifiedChoice'

describe('if the flow is complete', () => {
  it('should return undefined', () => {
    const flow = createFlow({ uid: 'matrix' })
    const insertedFlow = insertOperation({
      queue: [],
      catalog: [],
      flow,
      output: ['original']
    })
    const completed = isFlowComplete({ flow: insertedFlow })
    expect(completed).toBe(true)
    const choice = getChoice({ flow: insertedFlow })
    expect(choice).toBeUndefined()
  })
})

describe('if the flow is not complete', () => {
  it('should select from the choice operation', () => {
    const flow = createFlow({ uid: 'bond' })
    const operationA = createOperation({
      catalog: ['no', 'russia', 'goldfinger'],
      flow,
      output: [],
      queue: ['thunderball', 'twice']
    })
    const addedFlowA = addOperation({ flow, operation: operationA })
    const operationB = createOperation({
      catalog: ['casino1', 'service'],
      flow: addedFlowA,
      output: [],
      queue: ['diamonds', 'live']
    })
    const addedFlowB = addOperation({ flow: addedFlowA, operation: operationB })
    const choiceOperation = getChoiceOperation({ flow: addedFlowB })
    expect(choiceOperation.uid).toBe(operationB.uid)
    const choice = getVerifiedChoice({ flow: addedFlowB })
    expect(choice.operation).toBe(operationB.uid)
  })

  it('should select the catalog item at the option index', () => {
    const flow = createFlow({ uid: 'matrix' })
    const operation = createOperation({
      catalog: ['original', 'reloaded', 'revolutions'],
      flow,
      output: ['resurrections'],
      queue: ['revisited', 'animatrix']
    })
    const optionIndex = getOptionIndex({ operation })
    expect(optionIndex).toBe(1)
    const item = operation.catalog[optionIndex]
    expect(item).toBe('reloaded')
    const addedFlow = addOperation({ flow, operation })
    const choice = getVerifiedChoice({ flow: addedFlow })
    expect(choice.operation).toBe(operation.uid)
    expect(choice.catalog).toBe(item)
  })

  it('should select the first queue item', () => {
    const flow = createFlow({ uid: 'matrix' })
    const operation = createOperation({
      catalog: ['original', 'reloaded'],
      flow,
      output: ['revolutions'],
      queue: ['resurrections', 'animatrix']
    })
    const addedFlow = addOperation({ flow, operation })
    const choice = getVerifiedChoice({ flow: addedFlow })
    expect(choice.operation).toBe(operation.uid)
    expect(choice.queue).toBe('resurrections')
  })
})
