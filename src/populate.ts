import { Flow, Item } from './types'
import createOperation from './createOperation'
import addOperation from './addOperation'

export default function populate (props: {
  flow: Flow
  items: Item[]
}): Flow {
  const uids = props.items.map(item => item.uid)
  const uniqueUids = new Set(uids)
  if (uniqueUids.size !== props.items.length) {
    throw new Error('Item UIDs must be unique')
  }

  const newItems = props.items.filter(item => {
    return props.flow.items[item.uid] == null
  })

  if (newItems.length === 0) {
    return props.flow
  }

  const itemsRecord: Record<string, Item> = { ...props.flow.items }
  for (const item of newItems) {
    itemsRecord[item.uid] = item
  }

  const baseFlow: Flow = {
    ...props.flow,
    items: itemsRecord
  }

  if (newItems.length === 1) {
    const operation = createOperation({
      queue: [],
      catalog: [],
      flow: baseFlow,
      output: [newItems[0].uid]
    })

    return addOperation({
      flow: baseFlow,
      operation
    })
  }

  const pairCount = Math.floor(newItems.length / 2)
  const pairs = Array.from({ length: pairCount }, (_, i) => {
    const firstIndex = i * 2
    const secondIndex = i * 2 + 1
    const firstItem = newItems[firstIndex]
    const secondItem = newItems[secondIndex]
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

  const hasRemainingItem = newItems.length % 2 === 1

  if (!hasRemainingItem) {
    return flowWithPairs
  }

  const lastIndex = newItems.length - 1
  const remainingItem = newItems[lastIndex]

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
