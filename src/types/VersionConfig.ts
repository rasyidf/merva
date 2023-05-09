export interface VersionConfig {
    version: string;
    components: {
        [key: string]: boolean;
    };
}
