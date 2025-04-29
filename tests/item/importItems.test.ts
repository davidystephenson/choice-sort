import combineOperations from '../../src/combineOperations'
import { chooseOption, createFlow, importItems } from '../../src/index'
import isOutputOperation from '../../src/isOutputOperation'
import populate from '../../src/populate'
import getVerifiedChoice from '../choice/getVerifiedChoice'

describe('importItems', () => {
  it('should populate items and operations', () => {
    const flow1 = createFlow({ uid: 'matrix' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const items = [item1, item2, item3]
    const populatedFlow = populate({ flow: flow1, items })
    const flow2 = createFlow({ uid: 'matrix' })
    const importedFlow = importItems({ flow: flow2, items })
    expect(importedFlow).toEqual(populatedFlow)
  })

  it('should combine operations after populating', () => {
    const flow1 = createFlow({ uid: 'matrix' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const items = [item1, item2, item3]
    const populatedFlow = populate({ flow: flow1, items })
    const combinedFlow = combineOperations({ flow: populatedFlow })
    const flow2 = createFlow({ uid: 'matrix' })
    const importedFlow = importItems({ flow: flow2, items })
    expect(importedFlow).toEqual(combinedFlow)
  })

  it('should combine new output operations with completed flows', () => {
    const flow = createFlow({ uid: 'matrix' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const importedFlow = importItems({ flow, items: [item1, item2] })
    const choice = getVerifiedChoice({ flow: importedFlow })
    const chosenFlow = chooseOption({ flow: importedFlow, option: choice?.catalog })
    const chosenOperations = Object.values(chosenFlow.operations)
    expect(chosenOperations.length).toBe(1)
    const chosenOperation = chosenOperations[0]
    const output = isOutputOperation({ operation: chosenOperation })
    expect(output).toBe(true)
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const importedFlow2 = importItems({ flow: chosenFlow, items: [item3] })
    const operations2 = Object.values(importedFlow2.operations)
    expect(operations2.length).toBe(1)
    const operation2 = operations2[0]
    const output2 = isOutputOperation({ operation: operation2 })
    expect(output2).toBe(false)
  })
})
