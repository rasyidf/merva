import * as wcb from "webcryptobox";

const KEY_STORAGE_KEY = "garem";
let encryptionKey: CryptoKey | undefined;

async function getEncryptionKey(password?: string): Promise<CryptoKey> {
  if (password) {
    const salt = await getEncryptionKey();
    const importedKey = await wcb.importKey(password, salt);
    return importedKey;
  }

  if (encryptionKey) {
    return encryptionKey;
  }

  const key = localStorage.getItem(KEY_STORAGE_KEY) ?? "";

  if (key) {
    const importedKey = await wcb.importKeyFromBase64(key);
    encryptionKey = importedKey ?? undefined;
    return importedKey;
  }

  const newKey = await wcb.generateKey();
  const exportedKey = await wcb.exportKeyToBase64(newKey);
  localStorage.setItem(KEY_STORAGE_KEY, exportedKey ?? "");
  encryptionKey = newKey ?? undefined;

  return newKey;
}

async function encrypt(input: string, password?: string): Promise<string> {
  const key = await getEncryptionKey(password);
  const message = wcb.decodeText(input);
  const box = await wcb.encryptTo({ message, privateKey: key });
  return wcb.encodeText(box);
}

async function decrypt(input: string, password?: string): Promise<string> {
  const key = await getEncryptionKey(password);
  const box = wcb.decodeText(input);
  const decryptedBox = await wcb.decryptFrom({ box, privateKey: key });
  return wcb.encodeText(decryptedBox);
}

function isEncrypted(input: string): boolean {
  return wcb.isBox(input);
}

async function rotateEncryptionKey(): Promise<void> {
  encryptionKey = undefined;

  const newKey = await wcb.generateKey();
  const exportedKey = await wcb.exportKeyToBase64(newKey);
  localStorage.setItem(KEY_STORAGE_KEY, exportedKey);
}

export default { encrypt, decrypt, isEncrypted, rotateEncryptionKey };
