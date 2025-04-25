export interface AllParts {
  archive: unknown
  choice: unknown
  import: unknown
  random: unknown
  remove: unknown
  reset: unknown
  unarchive: unknown
}
export interface UnknownParts {
  archive?: unknown
  choice?: unknown
  import?: unknown
  random?: unknown
  remove?: unknown
  reset?: unknown
  unarchive?: unknown
}
export type UnknownPartKey = keyof Required<UnknownParts>
export interface Parts<P extends UnknownParts> {
  archive?: P['archive']
  choice?: P['choice']
  import?: P['import']
  random?: P['random']
  remove?: P['remove']
  reset?: P['reset']
  unarchive?: P['unarchive']
}
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
export type Part<P extends Parts<P>,> = NonNullable<AtLeastOne<P>>
export type Input<P extends UnknownParts, K extends keyof P> = NonNullable<P[K]>
export type Actor<Complement, O, P extends UnknownParts, K extends keyof P> = (props: Complement & {
  input: Input<P, K>
}) => O
export type Actors<Complement, O, P extends UnknownParts> = {
  [K in keyof Required<UnknownParts>]: Actor<Complement, O, P, K>
}
export type OfromA<A extends Actors<any, any, any>> = A extends Actors<any, infer O, any> ? O : never
