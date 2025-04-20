import Rand from 'rand-seed'

export default function createUid (props: {
  uid: string
  count: number
}): string {
  const seedString = `${props.uid}-${props.count}`
  const rand = new Rand(seedString)

  const hexDigits = Array.from({ length: 32 }, () => {
    const randomValue = Math.floor(rand.next() * 16)
    return randomValue.toString(16)
  })

  const uuidSection1 = hexDigits.slice(0, 8).join('')
  const uuidSection2 = hexDigits.slice(8, 12).join('')

  const versionSection = `4${hexDigits.slice(13, 16).join('')}`

  const variantBase = 8
  const variantRandomOffset = Math.floor(rand.next() * 4)
  const variantNumber = variantBase + variantRandomOffset
  const variantValue = variantNumber.toString(16)
  const variantSection = `${variantValue}${hexDigits.slice(17, 20).join('')}`

  const uuidSection5 = hexDigits.slice(20, 32).join('')

  return `${uuidSection1}-${uuidSection2}-${versionSection}-${variantSection}-${uuidSection5}`
}
