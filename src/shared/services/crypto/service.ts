import {
  decodeText,
  decryptFrom,
  encodeText,
  encryptTo,
  exportKeyToBase64,
  generateKey,
  importKey,
  importKeyFromBase64,
  isBox,
} from "webcryptobox";

const KEY_STORAGE_KEY = "garem";
let encryptionKey: CryptoKey | undefined;

async function getEncryptionKey(password?: string): Promise<CryptoKey> {
  if (password) {
    const salt = await getEncryptionKey();
    const importedKey = await importKey(password, salt);
    return importedKey;
  }

  if (encryptionKey) {
    return encryptionKey;
  }

  const key = localStorage.getItem(KEY_STORAGE_KEY) ?? "";

  if (key) {
    const importedKey = await importKeyFromBase64(key);
    encryptionKey = importedKey ?? undefined;
    return importedKey;
  }

  const newKey = await generateKey();
  const exportedKey = await exportKeyToBase64(newKey);
  localStorage.setItem(KEY_STORAGE_KEY, exportedKey ?? "");
  encryptionKey = newKey ?? undefined;

  return newKey;
}

async function encrypt(input: string, password?: string): Promise<string> {
  const key = await getEncryptionKey(password);
  const message = decodeText(input);
  const box = await encryptTo({ message, privateKey: key });
  return encodeText(box);
}

async function decrypt(input: string, password?: string): Promise<string> {
  const key = await getEncryptionKey(password);
  const box = decodeText(input);
  const decryptedBox = await decryptFrom({ box, privateKey: key });
  return encodeText(decryptedBox);
}

function isEncrypted(input: string): boolean {
  return isBox(input);
}

async function rotateEncryptionKey(): Promise<void> {
  encryptionKey = undefined;

  const newKey = await generateKey();
  const exportedKey = await exportKeyToBase64(newKey);
  localStorage.setItem(KEY_STORAGE_KEY, exportedKey);
}

export default { encrypt, decrypt, isEncrypted, rotateEncryptionKey };
