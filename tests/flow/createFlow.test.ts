import { createFlow } from '../../src'

describe('createFlow', () => {
  it('should require a uid and return an object with a uid, 0 item and operation counts, and empty history, items, and operations', () => {
    const flow = createFlow({ uid: 'abc' })
    expect(typeof flow).toBe('object')
    expect(flow.uid).toBe('abc')
    expect(flow.items).toBeDefined()
    expect(typeof flow.items).toBe('object')
    const itemKeys = Object.keys(flow.items)
    expect(itemKeys.length).toBe(0)
    expect(flow.operations).toBeDefined()
    expect(typeof flow.operations).toBe('object')
    const operationKeys = Object.keys(flow.operations)
    expect(operationKeys.length).toBe(0)
    expect(flow.count).toBe(0)
  })

  it('should throw an error if no uid is supplied', () => {
    // @ts-expect-error
    expect(() => createFlow({ uid: null })).toThrow('UID is required')
  })
})
