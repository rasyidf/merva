export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type Overwrite<
  T,
  U extends {
    [TKey in keyof T]?: unknown;
  },
> = Omit<T, keyof U> & U;
export type UnionToIntersection<T> = (T extends unknown ? (x: T) => unknown : never) extends (x: infer R) => any
  ? R
  : never;
export type IsAny<T, Y, N> = 1 extends 0 & T ? Y : N;
export type IsKnown<T, Y, N> = unknown extends T ? N : Y;
type ComputeRange<N extends number, Result extends unknown[] = []> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;
type Index40 = ComputeRange<40>[number];
type IsTuple<T> = T extends readonly any[] & {
  length: infer Length;
}
  ? Length extends Index40
    ? T
    : never
  : never;
type AllowedIndexes<Tuple extends readonly any[], Keys extends number = never> = Tuple extends readonly []
  ? Keys
  : Tuple extends readonly [infer _, ...infer Tail]
    ? AllowedIndexes<Tail, Keys | Tail["length"]>
    : Keys;
export type DeepKeys<T> = unknown extends T
  ? keyof T
  : object extends T
    ? string
    : T extends readonly any[] & IsTuple<T>
      ? AllowedIndexes<T> | DeepKeysPrefix<T, AllowedIndexes<T>>
      : T extends any[]
        ? never & "Dynamic length array indexing is not supported"
        : T extends Date
          ? never
          : T extends object
            ? (keyof T & string) | DeepKeysPrefix<T, keyof T>
            : never;
type DeepKeysPrefix<T, TPrefix> = TPrefix extends keyof T & (number | string)
  ? `${TPrefix}.${DeepKeys<T[TPrefix]> & string}`
  : never;
export type DeepValue<T, TProp> = T extends Record<string | number, any>
  ? TProp extends `${infer TBranch}.${infer TDeepProp}`
    ? DeepValue<T[TBranch], TDeepProp>
    : T[TProp & string]
  : never;
export type NoInfer<T> = [T][T extends any ? 0 : never];
export type Getter<TValue> = <TTValue = TValue>() => NoInfer<TTValue>;
export declare function functionalUpdate<T>(updater: Updater<T>, input: T): T;
export declare function noop(): void;
export declare function makeStateUpdater<K extends keyof TableState>(
  key: K,
  instance: unknown,
): (updater: Updater<TableState[K]>) => void;
type AnyFunction = (...args: any) => any;
export declare function isFunction<T extends AnyFunction>(d: any): d is T;
export declare function flattenBy<TNode>(arr: TNode[], getChildren: (item: TNode) => TNode[]): TNode[];
export declare function memo<TDeps extends readonly any[], TResult>(
  getDeps: () => [...TDeps],
  fn: (...args: NoInfer<[...TDeps]>) => TResult,
  opts: {
    key: any;
    debug?: () => any;
    onChange?: (result: TResult) => void;
  },
): () => TResult;
