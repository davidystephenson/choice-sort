import { ItemId, Identity, ItemDictionary } from './mergeChoiceTypes'

export default function arrayToDictionary <Element extends Identity> (props: {
  array: Element[]
}): ItemDictionary<Element> {
  const dictionary = props.array.reduce<Record<ItemId, Element>>((dictionary, element) => {
    dictionary[element.mergeChoiceId] = element
    return dictionary
  }, {})
  return dictionary
}
