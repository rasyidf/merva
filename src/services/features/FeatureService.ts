import { FeatureMetadata } from "@/types/FeatureMetadata";
import { Storage } from "./Storage";
import { ZustandStorage } from "./ZustandStorage";

export class FeatureService {
  private static instance: FeatureService;
  private storage: Storage;

  private constructor(storage: Storage) {
    this.storage = storage;
  }

  public static getInstance(storage: Storage): FeatureService {
    if (!FeatureService.instance) {
      FeatureService.instance = new FeatureService(storage);
    }

    return FeatureService.instance;
  }

  public getActiveFeatures(): FeatureMetadata[] {
    return this.storage.getFeatures().filter((feature) => feature.enabled);
  }

  public getFeatureList(): FeatureMetadata[] {
    return this.storage.getFeatures();
  }
}

const zustandStorage = new ZustandStorage();
export const featureService = FeatureService.getInstance(zustandStorage);
