import { Operation } from '../../src'
import isMixedOperation from '../../src/isMixedOperation'

describe('isMixedOperation', () => {
  it('should return true for mixed operations', () => {
    const operation: Operation = {
      uid: '1',
      queue: ['a'],
      catalog: ['b'],
      output: ['c', 'd'],
      better: undefined
    }
    const result = isMixedOperation({ operation })
    expect(result).toBe(true)
  })

  it('should return false for output operations', () => {
    const operation: Operation = {
      uid: '1',
      queue: [],
      catalog: [],
      output: ['a', 'b'],
      better: undefined
    }
    const result = isMixedOperation({ operation })
    expect(result).toBe(false)
  })

  it('should return false for input operations', () => {
    const operation: Operation = {
      uid: '1',
      queue: ['a'],
      catalog: ['b'],
      output: [],
      better: undefined
    }
    const result = isMixedOperation({ operation })
    expect(result).toBe(false)
  })
})
