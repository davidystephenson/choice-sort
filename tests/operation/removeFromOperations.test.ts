import removeFromOperations from '../../src/removeFromOperations'

describe('removeFromOperations', () => {
  it('should throw an error if the item is not in any operation', () => {
    const flow = {
      uid: 'test-flow',
      items: {},
      operations: {},
      count: 0
    }
    expect(() => removeFromOperations({ flow, itemUid: 'non-existent-item' }))
      .toThrow('There is no item non-existent-item')
  })
})