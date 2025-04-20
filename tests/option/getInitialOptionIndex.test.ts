import { Operation } from '../../src'
import getInitialOptionIndex from '../../src/getInitialOptionIndex'

describe('getInitialOptionIndex', () => {
  it('should return the floor half of the catalog length minus 1', () => {
    const operation10: Operation = {
      catalog: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      output: [],
      queue: [],
      uid: 'ten'
    }
    const index10 = getInitialOptionIndex({ operation: operation10 })
    expect(index10).toBe(4)
    const operation11: Operation = {
      catalog: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      output: [],
      queue: [],
      uid: 'eleven'
    }
    const index11 = getInitialOptionIndex({ operation: operation11 })
    expect(index11).toBe(5)
    const operation12: Operation = {
      catalog: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      output: [],
      queue: [],
      uid: 'twelve'
    }
    const index12 = getInitialOptionIndex({ operation: operation12 })
    expect(index12).toBe(5)
    const operation13: Operation = {
      catalog: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
      output: [],
      queue: [],
      uid: 'thirteen'
    }
    const index13 = getInitialOptionIndex({ operation: operation13 })
    expect(index13).toBe(6)
  })
})
