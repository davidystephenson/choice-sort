import { createFlow, OperationDef } from '../../src'
import createOperation from '../../src/createOperation'

describe('createOperation', () => {
  it('should throw an error if the operation is empty', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => createOperation({
      flow,
      queue: [],
      catalog: [],
      output: []
    })).toThrow()
  })

  it('should throw an error if the operation has a duplicate UID', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      createOperation({
        queue: ['1'],
        catalog: ['1'],
        flow,
        output: ['1']
      })
    }).toThrow()
  })

  it('should throw an error if the operation has an a input but no b input', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      createOperation({
        queue: ['1'],
        catalog: [],
        flow,
        output: []
      })
    }).toThrow()
  })

  it('should throw an error if the operation has a b input but no a input', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      createOperation({
        queue: [],
        catalog: ['1'],
        flow,
        output: []
      })
    }).toThrow()
  })

  it('should throw an error if a is longer than b', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      createOperation({
        queue: ['1', '2'],
        catalog: ['3'],
        flow,
        output: []
      })
    }).toThrow()
  })

  it('should require an operation def', () => {
    const flow = createFlow({ uid: 'test' })
    // @ts-expect-error
    expect(() => createOperation({ flow })).toThrow()
    // @ts-expect-error
    expect(() => createOperation({ flow, queue: ['1'], catalog: ['2'], output: null })).toThrow()
    // @ts-expect-error
    expect(() => createOperation({ flow, output: ['3'] })).toThrow()
    expect(() => {
      const operationDef: OperationDef = {
        queue: ['1'],
        catalog: ['2'],
        output: []
      }
      createOperation({ flow, ...operationDef })
    }).not.toThrow()
  })

  it('should create an operation with better undefined', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      queue: ['1'],
      catalog: ['2', '3', '4'],
      flow,
      output: []
    })
    expect(operation.better).toBe(undefined)
  })

  it('should create an operation with specified inputs', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      queue: ['1'],
      catalog: ['2'],
      flow,
      output: []
    })
    expect(operation.uid).toBeDefined()
    expect(operation.queue).toEqual(['1'])
    expect(operation.catalog).toEqual(['2'])
    expect(operation.output).toEqual([])
  })

  it('should create an operation with specified output', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      queue: [],
      catalog: [],
      flow,
      output: ['1']
    })
    expect(operation.uid).toBeDefined()
    expect(operation.queue).toEqual([])
    expect(operation.catalog).toEqual([])
    expect(operation.output).toEqual(['1'])
  })

  it('should have a predictably random UID based on the flow UID and the current operation count', () => {
    const flow = createFlow({ uid: 'test' })
    const sameUidSameCount = createFlow({ uid: 'test' })
    const differentUidSameCount = createFlow({ uid: 'different' })
    const sameUidDifferentCount = createFlow({ uid: 'test' })
    sameUidDifferentCount.count = 1
    const differentUidDifferentCount = createFlow({ uid: 'different' })
    differentUidDifferentCount.count = 1
    const operation = createOperation({
      queue: ['1'],
      catalog: ['2'],
      flow,
      output: []
    })
    expect(operation.uid).toBeDefined()
    const sameUidSameCountOperation = createOperation({
      queue: ['1'],
      catalog: ['2'],
      flow: sameUidSameCount,
      output: []
    })
    expect(sameUidSameCountOperation.uid).toEqual(operation.uid)
    const differentUidSameCountOperation = createOperation({
      queue: ['1'],
      catalog: ['2'],
      flow: differentUidSameCount,
      output: []
    })
    expect(differentUidSameCountOperation.uid).not.toEqual(operation.uid)
    const sameUidDifferentCountOperation = createOperation({
      queue: ['1'],
      catalog: ['2'],
      flow: sameUidDifferentCount,
      output: []
    })
    expect(sameUidDifferentCountOperation.uid).not.toEqual(operation.uid)
    const differentUidDifferentCountOperation = createOperation({
      queue: ['1'],
      catalog: ['2'],
      flow: differentUidDifferentCount,
      output: []
    })
    expect(differentUidDifferentCountOperation.uid).not.toEqual(operation.uid)
  })
})
