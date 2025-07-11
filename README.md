# Choice Sort

Sort by choice.

## Installation

```bash
npm install choice-sort
```

## Usage

```typescript
import { chooseOption, createFlow, createUid, getChoice, getRanking, importItems, isFlowComplete } from 'choice-sort'

const flow = createFlow({ uid: '0' })
const items = importItems({
  flow,
  items: [{ label: 'a', uid: 'a' }, { label: 'b', uid: 'b' }]
})
const choice = getChoice({ flow })
let chosen = chooseOption({ flow, option: choice.catalog })
let complete = isFlowComplete({ flow })
while (!complete) {
  chosen = chooseOption({ flow, option: chosen })
  complete = isFlowComplete({ flow })
}
const ranking = getRanking({ flow })
console.log(ranking)
```
