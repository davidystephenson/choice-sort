import { Choice, Item } from './flowTypes'

export default function debugChoice (props: {
  choice?: Choice
  items: Record<string, Item>
  label: string
}): void {
  if (props.choice == null) {
    console.debug(`There is no ${props.label} choice`)
    return
  }
  const catalogItem = props.items[props.choice.catalog]
  const queueItem = props.items[props.choice.queue]
  const named = {
    ...props.choice,
    catalog: catalogItem,
    queue: queueItem
  }
  console.debug(props.label, 'choice', named)
}
