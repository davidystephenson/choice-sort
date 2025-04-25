import getRandom from './getRandom'
import { Item, ItemId, Operation, State } from './mergeChoiceTypes'

export default function createOperation <ListItem extends Item> (props: {
  input?: [ItemId[], ItemId[]]
  output?: ItemId[]
  state: State<ListItem>
}): Operation {
  const seed = `${props.state.seed}${props.state.operationCount}`
  const priority = getRandom({ seed })
  const operation = {
    input: props?.input ?? [[], []],
    mergeChoiceId: props.state.operationCount,
    output: props?.output ?? [],
    priority
  }
  props.state.operationCount += 1
  return operation
}
