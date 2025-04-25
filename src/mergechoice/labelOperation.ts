import cloneOperation from './cloneOperation'
import labelItem from './labelItem'
import { Item, Operation } from './mergeChoiceTypes'

export default function labelOperation <ListItem extends Item> (props: {
  items: Record<string, ListItem>
  operation: Operation
}): unknown {
  const clone = cloneOperation({ operation: props.operation })
  const input1Names = clone.input[0].map(itemId => labelItem({ itemId, items: props.items }))
  const input2Names = clone.input[1].map(itemId => labelItem({ itemId, items: props.items }))
  const outputNames = clone.output.map(itemId => labelItem({ itemId, items: props.items }))
  return {
    input: [input1Names, input2Names],
    mergeChoiceId: clone.mergeChoiceId,
    output: outputNames,
    priority: clone.priority
  }
}
