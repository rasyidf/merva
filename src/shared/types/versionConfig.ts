export interface VersionConfig {
  version: string;
  description?: string; // Optional description for the version
  components: {
    [key: string]: boolean;
  };
}
