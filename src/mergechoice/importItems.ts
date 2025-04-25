import populate from './populate'
import { Item, State } from './mergeChoiceTypes'
import setupChoice from './setupChoice'
import seedChoice from './seedChoice'
import addEpisode from './addEpisode'

// TODO: Avoid mutating item seeds
export default function importItems <ListItem extends Item> (props: {
  items: ListItem[]
  silent?: boolean
  state: State<ListItem>
}): State<ListItem> {
  if (props.state.choice?.random === true && !props.state.complete) {
    throw new Error('You cannot import during a random choice')
  }
  const clones = structuredClone(props.items)
  const population = populate({
    items: props.items,
    state: props.state
  })
  const calculated = population.items.map(item => {
    const clone = clones.find(clone => clone.id === item.id)
    if (clone == null) {
      throw new Error('Could not find clone')
    }
    const calculated = {
      ...item,
      points: 0,
      seeding: clone.seeding
    }
    return calculated
  })
  const setupState = setupChoice({
    state: population.state
  })
  if (props.silent !== true) {
    const data = {
      import: {
        items: calculated
      }
    }
    addEpisode({
      data,
      state: setupState
    })
  }
  return seedChoice({ state: setupState })
}
