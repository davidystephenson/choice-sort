import { chooseOption, createFlow } from '../../src'
import combineOperations from '../../src/combineOperations'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import operate from '../../src/operate'

describe('chooseOption', () => {
  it('should operate', () => {
    const flow = createFlow({ uid: 'matrix' })
    flow.items = {
      original: { label: 'original', seed: 0, uid: 'original' },
      reloaded: { label: 'reloaded', seed: 1, uid: 'reloaded' },
      revolutions: { label: 'revolutions', seed: 2, uid: 'revolutions' }
    }
    flow.operations = {
      operation1: {
        uid: 'operation1',
        queue: ['original'],
        better: undefined,
        catalog: ['reloaded', 'revolutions'],
        output: []
      }
    }
    const choice = getVerifiedChoice({ flow })
    const operatedFlow = operate({ flow, option: choice.queue })
    const chosenFlow = chooseOption({ flow, option: choice.queue })
    expect(chosenFlow).toEqual(operatedFlow)
  })

  it('should combine chosen operations', () => {
    const flow = createFlow({ uid: 'matrix' })
    flow.items = {
      original: { label: 'original', seed: 0, uid: 'original' },
      reloaded: { label: 'reloaded', seed: 1, uid: 'reloaded' },
      revolutions: { label: 'revolutions', seed: 2, uid: 'revolutions' },
      animatrix: { label: 'animatrix', seed: 3, uid: 'animatrix' },
      revisited: { label: 'revisited', seed: 4, uid: 'revisited' }
    }
    flow.operations = {
      operation1: {
        uid: 'operation1',
        queue: ['original'],
        catalog: ['reloaded', 'revolutions'],
        output: []
      },
      operation2: {
        uid: 'operation2',
        queue: [],
        catalog: [],
        output: ['animatrix', 'revisited']
      }
    }
    const choice = getVerifiedChoice({ flow })
    const operationChosenFlow = operate({ flow, option: choice.queue })
    const combinedFlow = combineOperations({ flow: operationChosenFlow })
    const chosenFlow = chooseOption({ flow, option: choice.queue })
    expect(chosenFlow).toEqual(combinedFlow)
  })
})
