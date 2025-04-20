import getFloorHalf from '../src/getFloorHalf'

describe('getFloorHalf', () => {
  it('should throw an error if value is not a number', () => {
    // @ts-expect-error
    expect(() => getFloorHalf({ value: 'not a number' })).toThrow()
    // @ts-expect-error
    expect(() => getFloorHalf({ value: null })).toThrow()
    // @ts-expect-error
    expect(() => getFloorHalf({ value: undefined })).toThrow()
  })
  it('should return half rounded down', () => {
    const five = getFloorHalf({ value: 10 })
    expect(five).toBe(5)
    const three = getFloorHalf({ value: 7 })
    expect(three).toBe(3)
  })
})
