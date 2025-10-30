import { createFlow } from '../src/index'
import populate from '../src/populate'
import getImportInputsOperation from './item/getImportInputsOperation'
import verifyItemInOperations from './item/verifyItemInOperations'

describe('populate', () => {
  it('should throw an error if the new items UIDs are not unique', () => {
    expect(() => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { label: 'The Matrix Leaked', uid: '1', seed: 90 }
      const populatedFlow = populate({ flow, items: [item1, item2] })
      populate({ flow: populatedFlow, items: [item1] })
    }).toThrow()
  })

  it('should ignore existing uids', () => {
    const flow1 = createFlow({ uid: 'matrix' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const populatedFlow1 = populate({ flow: flow1, items: [item1] })
    const item2 = { label: 'The Matrix Reloaded', uid: '1', seed: 30 }
    const populatedFlow2 = populate({ flow: populatedFlow1, items: [item2] })
    expect(populatedFlow2).toEqual(populatedFlow1)
    const item3 = { label: 'The Matrix Resurrections', uid: '3', seed: 40 }
    const populatedFlow3 = populate({ flow: populatedFlow2, items: [item2, item3] })
    const items = Object.values(populatedFlow3.items)
    const someMatrix = items.some(item => item.label === 'The Matrix')
    expect(someMatrix).toBe(true)
    const someMatrixReloaded = items.some(item => item.label === 'The Matrix Reloaded')
    expect(someMatrixReloaded).toBe(false)
    const someMatrixResurrections = items.some(item => item.label === 'The Matrix Resurrections')
    expect(someMatrixResurrections).toBe(true)
  })

  it('should include the items indexed by uid', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const populatedFlow = populate({ flow, items: [item1, item2, item3] })
    expect(populatedFlow.items[item1.uid]).toEqual(item1)
    expect(populatedFlow.items[item2.uid]).toEqual(item2)
    expect(populatedFlow.items[item3.uid]).toEqual(item3)
  })

  it('should include the items in operations', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const populatedFlow = populate({ flow, items: [item1, item2, item3] })
    expect(populatedFlow.items[item1.uid]).toEqual(item1)
    expect(populatedFlow.items[item2.uid]).toEqual(item2)
    expect(populatedFlow.items[item3.uid]).toEqual(item3)
    verifyItemInOperations({ flow: populatedFlow, item: item1 })
    verifyItemInOperations({ flow: populatedFlow, item: item2 })
    verifyItemInOperations({ flow: populatedFlow, item: item3 })
  })

  it('should return the same operation UIDs with the same flow UID', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
    const item5 = { label: 'The Animatrix', uid: '5', seed: 80 }
    const items = [item1, item2, item3, item4, item5]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const duplicateFlow = createFlow({ uid: 'test' })
    const duplicatepopulatedFlow = populate({ flow: duplicateFlow, items })
    const duplicateOperations = Object.values(duplicatepopulatedFlow.operations)
    const same = operations.every((operation, index) => {
      const sameOperation = duplicateOperations[index]
      return sameOperation.uid === operation.uid
    })
    expect(same).toBe(true)
  })

  it('should return the same inputs with the same flow UID', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
    const item5 = { label: 'The Animatrix', uid: '5', seed: 80 }
    const items = [item1, item2, item3, item4, item5]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const duplicateFlow = createFlow({ uid: 'test' })
    const duplicatepopulatedFlow = populate({ flow: duplicateFlow, items })
    const duplicateOperations = Object.values(duplicatepopulatedFlow.operations)
    const same = operations.every((operation, index) => {
      const sameOperation = duplicateOperations[index]
      const sameA = sameOperation.queue[0] === operation.queue[0]
      if (!sameA) {
        return false
      }
      const sameB = sameOperation.catalog[0] === operation.catalog[0]
      return sameB
    })
    expect(same).toBe(true)
  })

  it('should return the same outputs with the same flow UID', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
    const item5 = { label: 'The Animatrix', uid: '5', seed: 80 }
    const items = [item1, item2, item3, item4, item5]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const duplicateFlow = createFlow({ uid: 'test' })
    const duplicatepopulatedFlow = populate({ flow: duplicateFlow, items })
    const duplicateOperations = Object.values(duplicatepopulatedFlow.operations)
    const same = operations.every((operation, index) => {
      const sameOperation = duplicateOperations[index]
      const sameOutput = sameOperation.output[0] === operation.output[0]
      return sameOutput
    })
    expect(same).toBe(true)
  })

  it('should return the same number of operations with a different flow UID', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
    const item5 = { label: 'The Animatrix', uid: '5', seed: 80 }
    const items = [item1, item2, item3, item4, item5]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const differentFlow = createFlow({ uid: 'different' })
    const differentpopulatedFlow = populate({ flow: differentFlow, items })
    const differentOperations = Object.values(differentpopulatedFlow.operations)
    expect(operations.length).toBe(differentOperations.length)
  })

  it('should return different operation UIDs with a different flow UID', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
    const item5 = { label: 'The Animatrix', uid: '5', seed: 80 }
    const items = [item1, item2, item3, item4, item5]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const differentFlow = createFlow({ uid: 'different' })
    const differentpopulatedFlow = populate({ flow: differentFlow, items })
    const differentOperations = Object.values(differentpopulatedFlow.operations)
    const differentIds = operations.every((operation) => {
      const differentIds = differentOperations.every((duplicate) => {
        return operation.uid !== duplicate.uid
      })
      return differentIds
    })
    expect(differentIds).toBe(true)
  })

  it('should index operations by uid', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const items = [item1, item2, item3]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const every = operations.every((operation) => {
      return populatedFlow.operations[operation.uid] === operation
    })
    expect(every).toBe(true)
  })

  it('should give operations unique UIDs distinct from item UIDs', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
    const items = [item1, item2, item3, item4]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const operationIds = operations.map((operation) => operation.uid)
    const itemIds = items.map((item) => item.uid)
    const everyOperationIdIsNotItemId = operationIds.every((id) => !itemIds.includes(id))
    expect(everyOperationIdIsNotItemId).toBe(true)
    const uniqueOperationIds = new Set(operationIds)
    expect(uniqueOperationIds.size).toBe(operationIds.length)
  })

  it('should create the same operations items with different flow UIDs', () => {
    const flow = createFlow({ uid: 'matrix1' })
    const item1 = { label: 'original', uid: '1', seed: 90 }
    const item2 = { label: 'resurrections', uid: '2', seed: 30 }
    const item3 = { label: 'revolutions', uid: '3', seed: 40 }
    const items = [item1, item2, item3]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const duplicateFlow = createFlow({ uid: 'matrix2' })
    const duplicatepopulatedFlow = populate({ flow: duplicateFlow, items })
    const duplicates = Object.values(duplicatepopulatedFlow.operations)
    operations.forEach((operation, index) => {
      const duplicate = duplicates[index]
      expect(duplicate.catalog).toEqual(operation.catalog)
      expect(duplicate.output).toEqual(operation.output)
      expect(duplicate.queue).toEqual(operation.queue)
    })
  })

  it('should include each item only once in the operations', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const items = [item1, item2, item3]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    const everyItemIsOnlyInOneOperation = items.every((item) => {
      const itemOperations = operations.filter((operation) => {
        if (operation.queue.includes(item.uid)) {
          return true
        }
        if (operation.catalog.includes(item.uid)) {
          return true
        }
        if (operation.output.includes(item.uid)) {
          return true
        }
        return false
      })
      return itemOperations.length === 1
    })
    expect(everyItemIsOnlyInOneOperation).toBe(true)
  })

  it('should create as many input operations as possible, with at most one output operation', () => {
    const flow = createFlow({ uid: 'test' })
    const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
    const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
    const item5 = { label: 'The Animatrix', uid: '5', seed: 80 }
    const items = [item1, item2, item3, item4, item5]
    const populatedFlow = populate({ flow, items })
    const operations = Object.values(populatedFlow.operations)
    expect(operations.length).toBe(3)
    const inputOperations = operations.filter((operation) => {
      if (operation.output.length > 0) {
        return false
      }
      return operation.queue.length > 0 || operation.catalog.length > 0
    })
    const outputOperations = operations.filter((operation) => {
      if (operation.queue.length > 0 || operation.catalog.length > 0) {
        return false
      }
      return operation.output.length > 0
    })
    expect(inputOperations.length).toBe(2)
    expect(outputOperations.length).toBe(1)
  })

  describe('if only one item is populated', () => {
    it('should not include an operation with two new items in the inputs', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [{ label: 'The Matrix', uid: '1', seed: 90 }]
      const populatedFlow = populate({ flow, items })
      const operation = getImportInputsOperation({ flow: populatedFlow, items })
      expect(operation).toBeUndefined()
    })

    it('should create an output operation with the new item', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [{ label: 'The Matrix', uid: '1', seed: 90 }]
      const populatedFlow = populate({ flow, items })
      const operations = Object.values(populatedFlow.operations)
      const operation = operations.find((operation) => {
        if (operation.output.length !== 1) {
          return false
        }
        return operation.output[0] === items[0].uid
      })
      expect(operation).toBeDefined()
    })
  })

  describe('if at least two items are populated', () => {
    it('should include an operation with only two of the new items in the inputs', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
      const populatedFlow = populate({ flow, items: [item1, item2] })
      const operation = getImportInputsOperation({ flow: populatedFlow, items: [item1, item2] })
      expect(operation).toBeDefined()
    })
  })

  describe('if only two items are populated', () => {
    it('should create only one operation', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { label: 'The Matrix', uid: '1', seed: 90 },
        { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
      ]
      const populatedFlow = populate({ flow, items })
      const operations = Object.values(populatedFlow.operations)
      expect(operations.length).toBe(1)
    })

    it('should create an input operation with the two new items', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { label: 'The Matrix', uid: '1', seed: 90 },
        { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
      ]
      const populatedFlow = populate({ flow, items })
      const operation = getImportInputsOperation({ flow: populatedFlow, items })
      expect(operation).toBeDefined()
    })
  })

  describe('if an even number of items are populated', () => {
    it('should not include an operation no inputs and a new item in the output', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
      const itemIds = [item1.uid, item2.uid]
      const populatedFlow = populate({ flow, items: [item1, item2] })
      const operations = Object.values(populatedFlow.operations)
      const some = operations.some((operation) => {
        const newOutput = itemIds.includes(operation.output[0])
        return newOutput
      })
      expect(some).toBe(false)
    })

    it('should create half as many operations as there are items', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
      const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const populatedFlow = populate({ flow, items: [item1, item2, item3, item4] })
      const operations = Object.values(populatedFlow.operations)
      expect(operations.length).toBe(2)
    })
  })

  describe('if an odd number of items are populated', () => {
    it('should include an operation no inputs and only one of the new items in the output', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { label: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { label: 'The Matrix Reloaded', uid: '2', seed: 30 }
      const item3 = { label: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { label: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { label: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const itemIds = items.map((item) => item.uid)
      const populatedFlow = populate({ flow, items })
      const operations = Object.values(populatedFlow.operations)
      const some = operations.some((operation) => {
        const single = operation.output.length === 1
        if (!single) {
          return false
        }
        const newOutput = itemIds.includes(operation.output[0])
        return newOutput
      })
      expect(some).toBe(true)
    })
  })
})
