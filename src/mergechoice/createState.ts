import { Item, State } from './mergeChoiceTypes'

export default function createState <ListItem extends Item> (props: {
  seed: string
}): State<ListItem> {
  return {
    activeIds: [],
    activeOperations: {},
    archive: {},
    betterIds: [],
    betterOperations: {},
    choice: {
      aIndex: 0,
      bIndex: 1,
      mergeChoiceId: 0,
      options: [],
      random: false
    },
    choiceCount: 0,
    complete: false,
    history: [],
    items: {},
    operationCount: 0,
    reserveIds: [],
    seed: props.seed,
    worseIds: [],
    worseOperations: {}
  }
}
