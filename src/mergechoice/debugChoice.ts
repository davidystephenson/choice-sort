import getItem from './getItem'
import { Choice, Item } from './mergeChoiceTypes'

export default function debugChoice <ListItem extends Item> (props: {
  choice?: Choice
  label: string
  items: Record<string, ListItem>
}): void {
  if (props.choice == null) {
    console.debug(`There is no ${props.label} choice`)
    return
  }
  const choiceNames = props.choice.options.map(itemId => {
    const item = getItem({ itemId, items: props.items })
    return item.name
  })
  console.debug(props.label, 'choice items', choiceNames)
}
