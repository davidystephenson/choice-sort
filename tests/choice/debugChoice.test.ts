import { createFlow, getChoice, importItems, Item } from '../../src'
import debugChoice from '../../src/debugChoice'

const debugSpy = jest.spyOn(console, 'debug').mockImplementation()
afterEach(() => {
  debugSpy.mockClear()
})

describe('if there is no choice', () => {
  it('should debug that there is no choice', () => {
    const flow = createFlow({ uid: 'test' })
    debugChoice({
      items: flow.items,
      label: 'test'
    })
    expect(debugSpy).toHaveBeenCalledWith('There is no test choice')
  })
})

describe('if there is a choice', () => {
  it('should debug that the choice with names', () => {
    const flow = createFlow({ uid: 'matrix' })
    const original: Item = { label: 'The Matrix', uid: 'original' }
    const reloaded: Item = { label: 'The Matrix Reloaded', uid: 'reloaded' }
    const items = [original, reloaded]
    const importedFlow = importItems({ flow, items })
    const choice = getChoice({ flow: importedFlow })
    debugChoice({
      choice,
      items: importedFlow.items,
      label: 'test'
    })
    expect(debugSpy).toHaveBeenCalledWith(
      'test',
      'choice',
      { catalog: { label: 'The Matrix Reloaded', uid: 'reloaded' }, operation: 'e5fc5d71-5280-4925-9d36-42e5ba7b4eaa', queue: { label: 'The Matrix', uid: 'original' } }
    )
  })
})
