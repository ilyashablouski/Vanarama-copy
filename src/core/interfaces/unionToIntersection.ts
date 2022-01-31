/**
 * Use it collect filter types for each entity described so as not to do it manually
 */
export type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;
