import { RouteObject } from './RouteConfig';
import { VersionConfig } from './VersionConfig';

export interface FeatureMetadata {
  id: string;
  name: string;
  enabled: boolean;
  routes?: RouteObject[];
  versions: VersionConfig[];
  activeVersion: string;
}
