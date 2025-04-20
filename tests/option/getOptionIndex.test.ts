import { Operation } from '../../src'
import getFloorHalf from '../../src/getFloorHalf'
import getInitialOptionIndex from '../../src/getInitialOptionIndex'
import getOptionIndex from '../../src/getOptionIndex'

describe('getOptionIndex', () => {
  describe('if better is defined', () => {
    it('should throw an error if better is not a number', () => {
      const operation: Operation = {
        queue: ['original', 'reloaded'],
        // @ts-expect-error
        better: 'not a number',
        catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
        output: [],
        uid: '123'
      }
      expect(() => getOptionIndex({ operation })).toThrow()
    })

    it('should throw an error if better is less than 1', () => {
      const zero: Operation = {
        queue: ['original', 'reloaded'],
        better: 0,
        catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
        output: [],
        uid: '123'
      }
      expect(() => getOptionIndex({ operation: zero })).toThrow()
      const negative: Operation = {
        queue: ['original', 'reloaded'],
        better: -1,
        catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
        output: [],
        uid: '123'
      }
      expect(() => getOptionIndex({ operation: negative })).toThrow()
    })

    it('should throw an error if better is greater than the initial option index', () => {
      const operation: Operation = {
        queue: ['original', 'reloaded'],
        better: 2,
        catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
        output: [],
        uid: '123'
      }
      const initialOptionIndex = getInitialOptionIndex({ operation })
      expect(initialOptionIndex).toBe(1)
      expect(() => getOptionIndex({ operation })).toThrow()
    })

    it('should return the floor half of better', () => {
      const operation: Operation = {
        queue: ['original'],
        better: 3,
        catalog: ['reloaded', 'revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'path', 'comics'],
        output: [],
        uid: '123'
      }
      if (operation.better == null) {
        throw new Error('better must be a number')
      }
      const floorHalf = getFloorHalf({ value: operation.better })
      expect(floorHalf).toBe(1)
      const index = getOptionIndex({ operation })
      expect(index).toBe(floorHalf)
    })
  })

  describe('if better is undefined', () => {
    it('should return the initial option index', () => {
      const operation: Operation = {
        queue: ['original', 'reloaded'],
        catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
        output: [],
        uid: '123'
      }
      const initialOptionIndex = getInitialOptionIndex({ operation })
      expect(initialOptionIndex).toBe(1)
      const index = getOptionIndex({ operation })
      expect(index).toBe(initialOptionIndex)
    })
  })
})
