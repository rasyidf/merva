

import { FeatureMetadata } from '@/types/FeatureMetadata';
import { Storage } from "./Storage";
import { ZustandStorage } from './ZustandStorage';

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
        return this.storage.getFeatures().filter(feature => feature.enabled);
    }

    public getFeatureList(): FeatureMetadata[] {
        return this.storage.getFeatures();
    }

    public editFeatureMetadata(id: string, data: Partial<FeatureMetadata>): boolean {
        const featureList = this.storage.getFeatures();
        const featureIndex = featureList.findIndex(feature => feature.id === id);

        if (featureIndex === -1) {
            return false; // Feature not found
        }

        featureList[featureIndex] = {
            ...featureList[featureIndex],
            ...data,
        };

        this.storage.setFeatures(featureList);

        return true; // Successfully updated
    }
}

const zustandStorage = new ZustandStorage();
export const featureService = FeatureService.getInstance(zustandStorage);
