export default function getFloorHalf (props: {
  value: number
}): number {
  if (typeof props.value !== 'number') {
    throw new Error('Value must be a number')
  }
  const half = props.value / 2
  const floored = Math.floor(half)
  return floored
}
