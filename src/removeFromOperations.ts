import { Flow, Operation } from './types'

export default function removeFromOperations (props: {
  flow: Flow
  itemUid: string
}): Flow {
  // Check if the item exists in the flow
  if (props.flow.items[props.itemUid] == null) {
    throw new Error(`There is no item ${props.itemUid}`)
  }

  // Remove the item from all operations
  const updatedOperations = Object.entries(props.flow.operations).reduce<Record<string, Operation>>((acc, [operationUid, operation]) => {
    // Remove the item from catalog, queue, and output arrays
    const updatedOperation = {
      ...operation,
      catalog: operation.catalog.filter(uid => uid !== props.itemUid),
      queue: operation.queue.filter(uid => uid !== props.itemUid),
      output: operation.output.filter(uid => uid !== props.itemUid)
    }

    acc[operationUid] = updatedOperation
    return acc
  }, {})

  // Remove the item from the items collection
  const updatedItems = Object.entries(props.flow.items).reduce<typeof props.flow.items>((acc, [itemUid, item]) => {
    if (itemUid !== props.itemUid) {
      acc[itemUid] = item
    }
    return acc
  }, {})

  return {
    ...props.flow,
    items: updatedItems,
    operations: updatedOperations
  }
}
