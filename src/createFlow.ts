import { Flow } from './types'

export default function createFlow (props: { uid: string }): Flow {
  if (props.uid == null) {
    throw new Error('UID is required')
  }

  return {
    count: 0,
    items: {},
    operations: {},
    uid: props.uid
  }
}
