import { Choice, ChoiceData, Item, State } from './mergeChoiceTypes'

export default function createChoice <ListItem extends Item> (props: {
  choice: ChoiceData
  state: State<ListItem>
}): Choice {
  const newChoice: Choice = {
    ...props.choice,
    mergeChoiceId: props.state.choiceCount
  }
  props.state.choiceCount += 1
  return newChoice
}
