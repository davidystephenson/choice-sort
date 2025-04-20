import { createFlow, isFlowComplete } from '../../src'
import addOperation from '../../src/addOperation'
import createOperation from '../../src/createOperation'

describe('isFlowComplete', () => {
  it('should consider flows with no items complete ', () => {
    const flow = createFlow({ uid: 'test' })
    const complete = isFlowComplete({ flow })
    expect(complete).toBe(true)
  })

  it('should return false if there are multiple operations', () => {
    const flow = createFlow({ uid: 'test' })

    const operation1 = createOperation({
      queue: ['item1'],
      catalog: ['item2'],
      flow,
      output: []
    })
    const addedFlow1 = addOperation({
      flow,
      operation: operation1
    })

    const operation2 = createOperation({
      queue: [],
      catalog: [],
      flow: addedFlow1,
      output: ['item3']
    })
    const addedFlow2 = addOperation({
      flow: addedFlow1,
      operation: operation2
    })

    const complete = isFlowComplete({ flow: addedFlow2 })
    expect(complete).toBe(false)
  })

  it('should return false if there are no output operations', () => {
    const flow = createFlow({ uid: 'test' })

    const operation = createOperation({
      queue: ['item1'],
      catalog: ['item2'],
      flow,
      output: []
    })
    const addedFlow = addOperation({
      flow,
      operation
    })

    const complete = isFlowComplete({ flow: addedFlow })
    expect(complete).toBe(false)
  })

  it('should return true if there is only one operation and it is an output operation', () => {
    const flow = createFlow({ uid: 'test' })

    const operation = createOperation({
      queue: [],
      catalog: [],
      flow,
      output: ['item1']
    })
    const addedFlow = addOperation({
      flow,
      operation
    })

    const complete = isFlowComplete({ flow: addedFlow })
    expect(complete).toBe(true)
  })
})
