import { CryptoHelper } from "@/shared/services/crypto";
import type { StateStorage } from "zustand/middleware";

export const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const encrypted = localStorage.getItem(name) ?? "";
    if (CryptoHelper.isEncrypted(encrypted)) {
      return (await CryptoHelper.decrypt(encrypted)) || null;
    }
    return null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const data = await CryptoHelper.encrypt(value);
    localStorage.setItem(name, data);
  },
  removeItem: async (name: string): Promise<void> => {
    localStorage.removeItem(name);
  },
};
