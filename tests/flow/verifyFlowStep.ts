import { Flow, getChoice, getRanking, isFlowComplete } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import chooseOptions from '../option/chooseOptions'
import { OptionsTest } from '../option/optionTypes'
import { RankingTest } from '../ranking/rankingTypes'
import verifyRankingItems from '../ranking/verifyRankingItems'

export default function verifyFlowStep (props: {
  debugChosenOperations?: boolean
  choice: OptionsTest | undefined
  createInitialFlow: () => Flow
  ranking: RankingTest[]
  queues: boolean[]
}): void {
  function setupFlow (): Flow {
    const initialFlow = props.createInitialFlow()
    const chosenFlow = chooseOptions({
      flow: initialFlow, queues: props.queues
    })
    return chosenFlow
  }

  if (props.choice == null) {
    it('should be completed', () => {
      const flow = setupFlow()
      const completed = isFlowComplete({ flow })
      expect(completed).toBe(true)
    })
  } else {
    it('should not be completed', () => {
      const flow = setupFlow()
      const completed = isFlowComplete({ flow })
      expect(completed).toBe(false)
    })
  }

  const flow = setupFlow()
  if (props.debugChosenOperations === true) {
    for (const operationUid in flow.operations) {
      const operation = flow.operations[operationUid]
      console.debug(operation)
    }
  }
  const ranking = getRanking({ flow })
  verifyRankingItems({ ranking, items: props.ranking })

  if (props.choice == null) {
    it('should not create a choice', () => {
      const flow = setupFlow()
      const choice = getChoice({ flow })
      expect(choice).toBeUndefined()
    })
  } else {
    it(`should include ${props.choice.queue} as an option`, () => {
      if (props.choice == null) {
        throw new Error('Choice is null')
      }
      const flow = setupFlow()
      const choice = getVerifiedChoice({ flow })
      const options = new Set([choice.queue, choice.catalog])
      expect(options).toContain(props.choice.queue)
    })
    it(`should include ${props.choice.catalog} as an option`, () => {
      if (props.choice == null) {
        throw new Error('Choice is null')
      }
      const flow = setupFlow()
      const choice = getVerifiedChoice({ flow })
      const options = new Set([choice.queue, choice.catalog])
      expect(options).toContain(props.choice.catalog)
    })
    it(`should make ${props.choice.queue} A`, () => {
      if (props.choice == null) {
        throw new Error('Choice is null')
      }
      const flow = setupFlow()
      const choice = getVerifiedChoice({ flow })
      expect(choice.queue).toBe(props.choice.queue)
    })
    it(`should make ${props.choice.catalog} B`, () => {
      if (props.choice == null) {
        throw new Error('Choice is null')
      }
      const flow = setupFlow()
      const choice = getVerifiedChoice({ flow })
      expect(choice.catalog).toBe(props.choice.catalog)
    })
  }
}
