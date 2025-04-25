import createActiveChoice from './createActiveChoice'
import removeFromOperations from './removeFromOperations'
import setupChoice from './setupChoice'
import { Item, State, ItemId } from './mergeChoiceTypes'
import calculateItem from './calculateItem'
import addEpisode from './addEpisode'

export default function removeItem<ListItem extends Item> (props: {
  itemId: ItemId
  silent?: boolean
  state: State<ListItem>
}): State<ListItem> {
  const existingItem = props.state.items[props.itemId]
  if (existingItem != null) {
    const { [props.itemId]: removedItem, ...newItems } = props.state.items
    const calculatedItem = calculateItem({
      item: removedItem,
      state: props.state
    })
    props.state.items = newItems
    props.state.activeIds = props.state.activeIds.filter(activeId => activeId !== props.itemId)
    props.state.reserveIds = props.state.reserveIds.filter(reserveId => reserveId !== props.itemId)
    props.state.betterIds = props.state.betterIds.filter(betterId => betterId !== props.itemId)
    props.state.worseIds = props.state.worseIds.filter(worseId => worseId !== props.itemId)
    const activeRemoval = removeFromOperations({
      itemId: props.itemId,
      operations: props.state.activeOperations
    })
    props.state.activeOperations = activeRemoval.operations
    props.state.betterOperations = removeFromOperations({ itemId: props.itemId, operations: props.state.betterOperations }).operations
    props.state.worseOperations = removeFromOperations({ itemId: props.itemId, operations: props.state.worseOperations }).operations
    if (props.silent !== true) {
      const data = {
        remove: {
          item: calculatedItem
        }
      }
      addEpisode({
        data,
        state: props.state
      })
    }

    const emptiedCurrentOperation = activeRemoval.emptiedOperationId === props.state.choice?.operationMergeChoiceId
    if (emptiedCurrentOperation) {
      const setupChoiceState = setupChoice({
        state: props.state
      })
      return setupChoiceState
    } else if (props.state.choice?.options.includes(props.itemId) === true) {
      const activeChoiceState = createActiveChoice({
        state: props.state
      })
      return activeChoiceState
    }
    return props.state
  }
  const existingArchive = props.state.archive[props.itemId]
  if (existingArchive != null) {
    const { [props.itemId]: removedArchive, ...newArchive } = props.state.archive
    void removedArchive
    props.state.archive = newArchive
    return props.state
  }
  throw new Error(`There is no item or archive ${props.itemId}`)
}
