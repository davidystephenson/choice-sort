import { Flow, Item } from './flowTypes'
import createOperation from './createOperation'
import addOperation from './addOperation'

export default function importItems (props: {
  flow: Flow
  items: Item[]
}): Flow {
  if (props.items.length === 0) {
    throw new Error('Items cannot be empty')
  }

  const uids = props.items.map(item => item.uid)
  const uniqueUids = new Set(uids)
  if (uniqueUids.size !== props.items.length) {
    throw new Error('Item UIDs must be unique')
  }

  for (const item of props.items) {
    if (props.flow.items[item.uid] != null) {
      throw new Error('Item UIDs must be unique across the entire flow')
    }
  }

  const itemsRecord: Record<string, Item> = { ...props.flow.items }
  for (const item of props.items) {
    itemsRecord[item.uid] = item
  }

  const baseFlow: Flow = {
    ...props.flow,
    items: itemsRecord
  }

  if (props.items.length === 1) {
    const operation = createOperation({
      queue: [],
      catalog: [],
      flow: baseFlow,
      output: [props.items[0].uid]
    })

    return addOperation({
      flow: baseFlow,
      operation
    })
  }

  const items = Object.values(baseFlow.items)
  const pairCount = Math.floor(items.length / 2)
  const pairs = Array.from({ length: pairCount }, (_, i) => {
    const firstIndex = i * 2
    const secondIndex = i * 2 + 1
    const firstItem = items[firstIndex]
    const secondItem = items[secondIndex]
    return [firstItem, secondItem]
  })

  const flowWithPairs = pairs.reduce((currentFlow, pair) => {
    const operation = createOperation({
      queue: [pair[0].uid],
      catalog: [pair[1].uid],
      flow: currentFlow,
      output: []
    })

    return addOperation({
      flow: currentFlow,
      operation
    })
  }, baseFlow)

  const hasRemainingItem = items.length % 2 === 1

  if (!hasRemainingItem) {
    return flowWithPairs
  }

  const lastIndex = items.length - 1
  const remainingItem = items[lastIndex]

  const operation = createOperation({
    queue: [],
    catalog: [],
    flow: flowWithPairs,
    output: [remainingItem.uid]
  })

  return addOperation({
    flow: flowWithPairs,
    operation
  })
}
