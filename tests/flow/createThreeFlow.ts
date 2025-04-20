import { createFlow, importItems, Flow } from '../../src'

export default function createThreeFlow (): Flow {
  const flow = createFlow({ uid: 'test' })
  const items = [
    { label: 'The Matrix', uid: 'original', seed: 90 },
    { label: 'The Matrix Reloaded', uid: 'reloaded', seed: 30 },
    { label: 'The Matrix Revolutions', uid: 'revolutions', seed: 40 }
  ]
  const importedFlow = importItems({ flow, items })
  return importedFlow
}
