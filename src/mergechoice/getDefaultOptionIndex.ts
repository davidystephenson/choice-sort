import { Choice, Item, ItemDictionary } from './mergeChoiceTypes'

export default function getDefaultOptionIndex ({
  choice,
  movies
}: {
  choice: Choice | undefined
  movies: ItemDictionary<Item>
}): number | undefined {
  if (choice == null || choice.options.length === 0 || choice.random) {
    return undefined
  }
  const choices = choice.options.map(option => {
    return movies[option]
  })
  const [firstItem, secondItem] = choices
  const defaultItem = firstItem.seed === secondItem.seed || firstItem.seed == null || secondItem.seed == null
    ? undefined
    : firstItem.seed > secondItem.seed
      ? firstItem
      : secondItem
  const defaultOptionIndex = choice.options.findIndex(option => {
    return option === defaultItem?.id
  })
  if (defaultOptionIndex === -1) {
    return undefined
  }
  return defaultOptionIndex
}
