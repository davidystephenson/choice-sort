import { ItemId, OperationDictionary } from './mergeChoiceTypes'

export default function getItemIdsFromOperations (props: {
  operations: OperationDictionary
}): ItemId[] {
  const values = Object.values(props.operations)
  const itemIds = values.reduce<ItemId[]>((itemIds, operation) => {
    operation.input.forEach(input => {
      itemIds.push(...input)
    })
    itemIds.push(...operation.output)
    return itemIds
  }, [])
  return itemIds
}
