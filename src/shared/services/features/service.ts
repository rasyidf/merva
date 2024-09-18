
import { FeatureMetadata } from "@/shared/types/FeatureMetadata";
import { Storage, ZustandStorage } from "./store";

type FeatureService = {
  getActiveFeatures: () => FeatureMetadata[];
  getFeatureList: () => FeatureMetadata[];
  editFeatureMetadata: (id: string, data: Partial<FeatureMetadata>) => boolean;
};

let instance: FeatureService | null = null;
let storage: Storage;

export function getFeatureService(storageInstance: Storage): FeatureService {
  if (!instance) {
    instance = createFeatureService(storageInstance);
  }

  return instance;
}

function createFeatureService(storageInstance: Storage): FeatureService {
  storage = storageInstance;

  return {
    getActiveFeatures: () => storage.getFeatures().filter((feature) => feature.enabled),
    getFeatureList: () => storage.getFeatures(),
    editFeatureMetadata: (id: string, data: Partial<FeatureMetadata>): boolean => {
      const featureList = storage.getFeatures();
      const featureIndex = featureList.findIndex((feature) => feature.id === id);

      if (featureIndex === -1 || featureList[featureIndex] === undefined) {
        return false; // Feature not found
      }

      const dataRecord = data as Record<string, any>;

      for (const key of Object.keys(dataRecord)) {
        if (dataRecord[key] !== undefined) {
          delete dataRecord[key];
        }
      }

      Object.assign(featureList[featureIndex] as FeatureMetadata, dataRecord);

      storage.setFeatures(featureList);

      return true;
    },
  };
}

const zustandStorage = new ZustandStorage();
export const featureService = getFeatureService(zustandStorage);
