import { createFlow, isFlowComplete } from '../../src'
import addOperation from '../../src/addOperation'
import createOperation from '../../src/createOperation'
import getChoiceOperation from '../../src/getChoiceOperation'
import getOptionIndex from '../../src/getOptionIndex'
import insertOperation from './insertOperation'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import isOutputOperation from '../../src/isOutputOperation'

describe('if the flow is complete', () => {
  it('should throw an error', () => {
    const flow = createFlow({ uid: 'matrix' })
    const insertedFlow = insertOperation({
      queue: [],
      catalog: [],
      flow,
      output: ['original']
    })
    const completed = isFlowComplete({ flow: insertedFlow })
    expect(completed).toBe(true)
    expect(() => getChoiceOperation({ flow: insertedFlow })).toThrow()
  })
})

describe('if the flow is not complete', () => {
  describe('if there are non-output operations with an option index of 0', () => {
    it('should select the non-output 0 option index operation with the earliest uid', () => {
      const flow = createFlow({ uid: 'matrix' })
      const operationA = createOperation({
        catalog: [],
        flow,
        output: ['original', 'reloaded'],
        queue: []
      })
      operationA.uid = 'a'
      const output = isOutputOperation({ operation: operationA })
      expect(output).toBe(true)
      const operationB = createOperation({
        catalog: ['revolutions', 'resurrections'],
        flow,
        output: ['animatrix'],
        queue: ['revisited']
      })
      operationB.uid = 'b'
      const optionIndexB = getOptionIndex({ operation: operationB })
      expect(optionIndexB).toBe(0)
      const operationC = createOperation({
        catalog: ['enter', 'path'],
        flow,
        output: ['online'],
        queue: ['awakens']
      })
      operationC.uid = 'c'
      const optionIndexC = getOptionIndex({ operation: operationC })
      expect(optionIndexC).toBe(0)
      const addedFlow = addOperation({ flow, operation: operationB })
      const addedFlow2 = addOperation({ flow: addedFlow, operation: operationC })
      const choice = getVerifiedChoice({ flow: addedFlow2 })
      expect(choice.operation).toBe(operationB.uid)
    })
  })

  describe('if there are no non-output operations with an option index of 0', () => {
    describe('if there is tie for the highest option index among the non-output operations', () => {
      it('should select the tied operation with the earliest uid', () => {
        const flow = createFlow({ uid: 'star-wars' })
        const operationA = createOperation({
          catalog: ['hope', 'empire', 'return'],
          flow,
          output: [],
          queue: ['phantom', 'attack', 'sith']
        })
        operationA.uid = 'a'
        const optionIndexA = getOptionIndex({ operation: operationA })
        expect(optionIndexA).toBe(1)
        const addedFlowA = addOperation({ flow, operation: operationA })
        const operationB = createOperation({
          catalog: ['awakens', 'last', 'rise'],
          flow,
          output: [],
          queue: ['rogue', 'solo']
        })
        operationB.uid = 'b'
        const optionIndexB = getOptionIndex({ operation: operationB })
        expect(optionIndexB).toBe(1)
        const addedFlowB = addOperation({ flow: addedFlowA, operation: operationB })
        const choice = getVerifiedChoice({ flow: addedFlowB })
        expect(choice.operation).toBe(operationA.uid)
      })
    })
    describe('if there is no tie for the highest option index', () => {
      it('should select the non-output operation with the highest option index', () => {
        const flow = createFlow({ uid: 'bond' })
        const operation1 = createOperation({
          catalog: ['no', 'russia', 'goldfinger'],
          flow,
          output: ['thunderball'],
          queue: ['twice', 'casino1']
        })
        const optionIndex1 = getOptionIndex({ operation: operation1 })
        expect(optionIndex1).toBe(1)
        const addedFlow1 = addOperation({ flow, operation: operation1 })
        const operation2 = createOperation({
          catalog: ['h', 'i', 'j', 'k', 'l'],
          flow: addedFlow1,
          output: [],
          queue: ['f', 'g']
        })
        const optionIndex2 = getOptionIndex({ operation: operation2 })
        expect(optionIndex2).toBe(2)
        const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })
        const operation3 = createOperation({
          catalog: ['r', 's', 't', 'u', 'v', 'w'],
          flow: addedFlow2,
          output: [],
          queue: ['n', 'o', 'p']
        })
        operation3.better = 2
        const optionIndex3 = getOptionIndex({ operation: operation3 })
        expect(optionIndex3).toBe(1)
        const addedFlow3 = addOperation({ flow: addedFlow2, operation: operation3 })
        const choice = getVerifiedChoice({ flow: addedFlow3 })
        expect(choice.operation).toBe(operation2.uid)
      })
    })
  })
})
