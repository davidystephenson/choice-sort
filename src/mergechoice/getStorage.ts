export default function getStorage<Stored> (props: {
  defaultValue: Stored
  key: string
}): Stored {
  const stateString = localStorage.getItem(props.key)
  if (stateString == null) {
    return props.defaultValue
  }
  const state = JSON.parse(stateString)
  return state
}
