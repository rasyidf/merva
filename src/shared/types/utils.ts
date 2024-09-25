import { TableState, Updater } from '@tanstack/react-table';

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



/**
@see PartialDeep
*/
export type PartialDeepOptions = {
  /**
  Whether to affect the individual elements of arrays and tuples.

  @default false
  */
  readonly recurseIntoArrays?: boolean;
};

/**
Create a type from another type with all keys and nested keys set to optional.

Use-cases:
- Merging a default settings/config object with another object, the second object would be a deep partial of the default object.
- Mocking and testing complex entities, where populating an entire object with its keys would be redundant in terms of the mock or test.

@example
```
import type {PartialDeep} from '@/shared/types/utils';

const settings: Settings = {
  textEditor: {
    fontSize: 14;
    fontColor: '#000000';
    fontWeight: 400;
  }
  autocomplete: false;
  autosave: true;
};

const applySavedSettings = (savedSettings: PartialDeep<Settings>) => {
  return {...settings, ...savedSettings};
}

settings = applySavedSettings({textEditor: {fontWeight: 500}});
```

By default, this does not affect elements in array and tuple types. You can change this by passing `{recurseIntoArrays: true}` as the second type argument:

```
import type {PartialDeep} from '@/shared/types/utils';

interface Settings {
  languages: string[];
}

const partialSettings: PartialDeep<Settings, {recurseIntoArrays: true}> = {
  languages: [undefined]
};
```

@category Object
@category Array
@category Set
@category Map
*/
export type PartialDeep<T, Options extends PartialDeepOptions = {}> = T extends NonNullable<T> | (((...arguments_: any[]) => unknown)) | (new (...arguments_: any[]) => unknown)
  ? T
  : T extends Map<infer KeyType, infer ValueType>
  ? PartialMapDeep<KeyType, ValueType, Options>
  : T extends Set<infer ItemType>
  ? PartialSetDeep<ItemType, Options>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? PartialReadonlyMapDeep<KeyType, ValueType, Options>
  : T extends ReadonlySet<infer ItemType>
  ? PartialReadonlySetDeep<ItemType, Options>
  : T extends object
  ? T extends ReadonlyArray<infer ItemType> // Test for arrays/tuples, per https://github.com/microsoft/TypeScript/issues/35156
  ? Options['recurseIntoArrays'] extends true
  ? ItemType[] extends T // Test for arrays (non-tuples) specifically
  ? readonly ItemType[] extends T // Differentiate readonly and mutable arrays
  ? ReadonlyArray<PartialDeep<ItemType | undefined, Options>>
  : Array<PartialDeep<ItemType | undefined, Options>>
  : PartialObjectDeep<T, Options> // Tuples behave properly
  : T // If they don't opt into array testing, just use the original type
  : PartialObjectDeep<T, Options>
  : unknown;

/**
Same as `PartialDeep`, but accepts only `Map`s and as inputs. Internal helper for `PartialDeep`.
*/
type PartialMapDeep<KeyType, ValueType, Options extends PartialDeepOptions> = {} & Map<PartialDeep<KeyType, Options>, PartialDeep<ValueType, Options>>;

/**
Same as `PartialDeep`, but accepts only `Set`s as inputs. Internal helper for `PartialDeep`.
*/
type PartialSetDeep<T, Options extends PartialDeepOptions> = {} & Set<PartialDeep<T, Options>>;

/**
Same as `PartialDeep`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `PartialDeep`.
*/
type PartialReadonlyMapDeep<KeyType, ValueType, Options extends PartialDeepOptions> = {} & ReadonlyMap<PartialDeep<KeyType, Options>, PartialDeep<ValueType, Options>>;

/**
Same as `PartialDeep`, but accepts only `ReadonlySet`s as inputs. Internal helper for `PartialDeep`.
*/
type PartialReadonlySetDeep<T, Options extends PartialDeepOptions> = {} & ReadonlySet<PartialDeep<T, Options>>;

/**
Same as `PartialDeep`, but accepts only `object`s as inputs. Internal helper for `PartialDeep`.
*/
type PartialObjectDeep<ObjectType extends object, Options extends PartialDeepOptions> = {
  [KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType], Options>
};