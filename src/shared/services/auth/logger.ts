import { StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(f: StateCreator<T, [], []>, name?: string) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name?: string) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...a);
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const loggerset = loggerImpl as unknown as Logger;