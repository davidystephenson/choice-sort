import { Item } from './mergeChoiceTypes'

export default function sortOutputs <ListItem extends Item> (props: {
  items: ListItem[]
}): ListItem[][] {
  const bySeed: Record<number, ListItem[]> = {}
  const seeds = new Set<number>()
  const seedingItems: ListItem[] = []
  const nonSeedingItems: ListItem[] = []
  props.items.forEach(item => {
    if (item.seeding && item.seed != null) {
      seeds.add(item.seed)
      seedingItems.push(item)
      const seedItems = bySeed[item.seed]
      if (seedItems == null) {
        bySeed[item.seed] = [item]
      } else {
        seedItems.push(item)
      }
    } else {
      nonSeedingItems.push(item)
    }
  })
  const sortedItems: ListItem[] = []
  const entries = Object.entries(bySeed)
  entries.sort((a, b) => {
    const seedA = Number(a[0])
    const seedB = Number(b[0])
    return seedA - seedB
  })
  const outputs: ListItem[][] = []
  while (sortedItems.length < seedingItems.length) {
    const output: ListItem[] = []
    entries.forEach(entry => {
      const seedItems = entry[1]
      const item = seedItems.shift()
      if (item != null) {
        output.push(item)
        sortedItems.push(item)
      }
    })
    outputs.push(output)
  }
  nonSeedingItems.forEach(item => {
    outputs.push([item])
  })
  return outputs
}
