import { createFlow } from '../../src'
import addOperation from '../../src/addOperation'
import createOperation from '../../src/createOperation'

describe('addOperation', () => {
  it('should return a new flow with the operation added and an incremented operation count', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({ queue: ['1'], catalog: ['2'], flow, output: [] })
    const addedFlow = addOperation({ flow, operation })
    expect(flow.operations[operation.uid]).toBeUndefined()
    expect(flow.count).toBe(0)
    expect(addedFlow.operations[operation.uid]).toBe(operation)
    expect(addedFlow.count).toBe(1)
  })

  it('should throw an error if the operation is not provided', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      // @ts-expect-error
      addOperation({ flow })
    }).toThrow('Operation is required')
  })

  it('should throw an error if the flow is not provided', () => {
    const operation = createOperation({ queue: ['1'], catalog: ['2'], flow: createFlow({ uid: 'test' }), output: [] })
    expect(() => {
      // @ts-expect-error
      addOperation({ operation })
    }).toThrow('Flow is required')
  })

  it('should throw an error if the operation UID is duplicate', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({ queue: ['1'], catalog: ['2'], flow, output: [] })
    const addedFlow = addOperation({ flow, operation })
    expect(() => addOperation({ flow: addedFlow, operation })).toThrow('Operation UID is not unique')
  })
})
