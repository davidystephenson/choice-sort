import addOperation from '../../src/addOperation'
import combineOperations from '../../src/combineOperations'
import createFlow from '../../src/createFlow'
import createOperation from '../../src/createOperation'
import insertOperation from './insertOperation'

it('should throw an error if the flow has more than two output operations', () => {
  const flow = createFlow({ uid: 'test' })
  const flow1 = insertOperation({
    flow,
    queue: [],
    catalog: [],
    output: ['item3']
  })
  const flow2 = insertOperation({
    flow: flow1,
    queue: [],
    catalog: [],
    output: ['item4']
  })
  const flow3 = insertOperation({
    flow: flow2,
    queue: [],
    catalog: [],
    output: ['item5']
  })
  expect(() => combineOperations({ flow: flow3 })).toThrow()
})

it('should do nothing if there is only one output operation', () => {
  const flow = createFlow({ uid: 'test' })
  const flow1 = insertOperation({
    flow,
    queue: [],
    catalog: [],
    output: ['item1']
  })
  const flow2 = combineOperations({ flow: flow1 })
  expect(flow2).toEqual(flow1)
})

it('should do nothing if there are no output operations', () => {
  const flow = createFlow({ uid: 'test' })
  const flow1 = insertOperation({
    catalog: ['item2'],
    flow,
    output: [],
    queue: ['item1']
  })
  const flow2 = combineOperations({ flow: flow1 })
  expect(flow2).toEqual(flow1)
})

describe('if there are two output operations', () => {
  it('should combine them into one input operation', () => {
    const flow = createFlow({ uid: 'test' })
    const flow1 = insertOperation({
      flow,
      queue: [],
      catalog: [],
      output: ['item1', 'item2']
    })
    const flow2 = insertOperation({
      flow: flow1,
      queue: [],
      catalog: [],
      output: ['item3']
    })
    const flow3 = combineOperations({ flow: flow2 })
    const flow3Operations = Object.values(flow3.operations)
    expect(flow3Operations.length).toBe(1)
  })

  describe('if the operations have the same length', () => {
    it('should put the operation with the earlier UID in the catalog and the other in the queue', () => {
      const flow = createFlow({ uid: 'matrix' })
      const operationA = createOperation({
        queue: [],
        catalog: [],
        flow,
        output: ['original', 'reloaded']
      })
      operationA.uid = 'a'
      const addedFlowA = addOperation({ flow, operation: operationA })
      const operationB = createOperation({
        queue: [],
        catalog: [],
        flow: addedFlowA,
        output: ['revolutions', 'resurrections']
      })
      operationB.uid = 'b'
      const addedFlowB = addOperation({ flow: addedFlowA, operation: operationB })
      const sameLength = operationA.output.length === operationB.output.length
      expect(sameLength).toBe(true)
      const aEarlier = operationA.uid < operationB.uid
      expect(aEarlier).toBe(true)
      const flow3 = combineOperations({ flow: addedFlowB })
      const flow3Operations = Object.values(flow3.operations)
      expect(flow3Operations.length).toBe(1)
      expect(flow3Operations[0].catalog).toEqual(['original', 'reloaded'])
      expect(flow3Operations[0].queue).toEqual(['revolutions', 'resurrections'])
      expect(flow3Operations[0].output).toEqual([])
    })
  })
  describe('if the operations have different lengths', () => {
    it('should put the longer operation in the catalog and the shorter in the queue', () => {
      const flow = createFlow({ uid: 'matrix' })
      const operation1 = createOperation({
        queue: [],
        catalog: [],
        flow,
        output: ['original', 'reloaded']
      })
      const addedFlow1 = addOperation({ flow, operation: operation1 })
      const operation2 = createOperation({
        queue: [],
        catalog: [],
        flow: addedFlow1,
        output: ['revolutions']
      })
      const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })
      const oneLonger = operation1.output.length > operation2.output.length
      expect(oneLonger).toBe(true)
      const flow3 = combineOperations({ flow: addedFlow2 })
      const flow3Operations = Object.values(flow3.operations)
      expect(flow3Operations.length).toBe(1)
      expect(flow3Operations[0].catalog).toEqual(['original', 'reloaded'])
      expect(flow3Operations[0].queue).toEqual(['revolutions'])
      expect(flow3Operations[0].output).toEqual([])
    })
  })
})
