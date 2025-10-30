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

  it('should remove the operation', () => {
  })

  describe('if the item is in the output', () => {
    describe('if there are more items in the output after the removed item than before', () => {
      it('should create a new operation with the items after in the catalog and the items before in the queue', () => {
      })
    })

    describe('if there are not more items in the output after the remove item than before', () => {
      it('should create a new operation with the items before in the catalog and the items after in the queue', () => {
      })
    })
  })

  describe('if the item is in a catalog', () => {
    it('should create a new completed operation that combines the queue and the output into the output', () => {

    })

    describe('if there are more items in the catalog after the removed item than before', () => {
      it('should create a new operation with the items after the removed item in the catalog and the items before in the queue', () => {
      })
    })

    describe('if there are not more items in the catalog after the removed item than before', () => {
      it('should create a new operation with the items before the removed item in the catalog and the items after in the queue', () => {
      })
    })
  })

  describe('if the item is in a queue', () => {
    it('should create a new completed operation that combines the catalog and the output into the output', () => {
    })

    describe('if there are more items in the queue after the removed item than before', () => {
      it('should create a new operation with the items after the removed item in the catalog and the items before in the queue', () => {
      })
    })

    describe('if there are not more items in the queue after the removed item than before', () => {
      it('should create a new operation with the items before the removed item in the catalog and the items after in the queue', () => {
      })
    })
  })
})
