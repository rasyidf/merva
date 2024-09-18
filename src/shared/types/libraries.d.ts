declare module "webcryptobox" {
  export function decodeBase64(input: string): Uint8Array;
  export function encodeBase64(input: string): string;
  export function decodeText(input: string): string;
  export function encodeText(input: string): string;
  export function isBox(input: string): boolean;
  export function generateKey(): Promise<CryptoKey>;
  export function exportKeyToBase64(key: CryptoKey): Promise<string>;
  export function importKeyFromBase64(key: CryptoKey | string): Promise<CryptoKey>;
  export function importKey(password: string, salt: CryptoKey | string): Promise<CryptoKey>;
  export function encryptTo(options: {
    message: string;
    privateKey: CryptoKey;
  }): Promise<string>;
  export function decryptFrom(options: {
    box: string;
    privateKey: CryptoKey;
  }): Promise<string>;
}
