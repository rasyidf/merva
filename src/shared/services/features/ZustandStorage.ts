import { FeatureMetadata } from "@/shared/types/FeatureMetadata";
import { createStore } from "zustand";
import { Storage } from "./Storage";

type State = {
  features: FeatureMetadata[];
  setFeatures: (features: FeatureMetadata[]) => void;
};

export class ZustandStorage implements Storage {
  private store = createStore<State>((set) => ({
    features: [],
    setFeatures: (features: FeatureMetadata[]) => set(() => ({ features })),
  }));

  getFeatures = (): FeatureMetadata[] => {
    return this.store.getState().features;
  };

  setFeatures = (features: FeatureMetadata[]): void => {
    const { setFeatures } = this.store.getState();
    setFeatures(features);
  };
}
