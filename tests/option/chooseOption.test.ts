import { chooseOption, createFlow } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import * as operate from '../../src/operate'
import * as combineOperations from '../../src/combineOperations'

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
    const operatedFlow = operate.default({ flow, option: choice.queue })
    const operateSpy = jest.spyOn(operate, 'default')
    const chosenFlow = chooseOption({ flow, option: choice.queue })
    expect(chosenFlow).toEqual(operatedFlow)
    expect(operateSpy).toHaveBeenCalledWith({ flow, option: choice.queue })
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
    const operationChosenFlow = operate.default({ flow, option: choice.queue })
    const combinedFlow = combineOperations.default({ flow: operationChosenFlow })
    const combineSpy = jest.spyOn(combineOperations, 'default')
    const chosenFlow = chooseOption({ flow, option: choice.queue })
    expect(chosenFlow).toEqual(combinedFlow)
    expect(combineSpy).toHaveBeenCalledWith({ flow: operationChosenFlow })
  })
})
