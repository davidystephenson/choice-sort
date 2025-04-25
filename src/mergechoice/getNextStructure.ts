import range from './range'

export default function getNextStructure ({
  structure
}: {
  structure: number[][]
}): number[][] {
  const blocks = structure.map(operation => operation[0] + operation[1] + operation[2])
  blocks.sort((a, b) => b - a)
  const pairsCount = Math.floor(blocks.length / 2)
  if (pairsCount === 0) return [[0, 0, blocks[0]]]
  const newStructure: number[][] = []
  range(pairsCount).forEach(() => {
    const blockA = blocks.pop()
    const blockB = blocks.pop()
    if (blockA == null) {
      throw new Error('blockA is null')
    } if (blockB == null) {
      throw new Error('blockB is null')
    }
    newStructure.push([blockA, blockB, 0])
  })
  if (blocks.length === 1) {
    const output = blocks.pop()
    if (output == null) {
      throw new Error('output is null')
    }
    newStructure.push([0, 0, output])
  }
  return newStructure
}
