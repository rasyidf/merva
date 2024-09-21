/**
 * convert imported url to react-router-dom object
 * @param param0 
 * @returns 
 * @example
 * compose(import('../item.tsx'))
 */
export const compose = <T>({ default: C }: { default: T }) => ({
  Component: C,
});

export const isDefaultTrue = (value: unknown) => typeof value === "undefined" || value;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

/**
 * Compares two records based on a key and returns -1, 0, or 1
 * @param recordA - First record to be compared
 * @param recordB - Second record to be compared
 * @param key - The key to be used for comparison
 * @returns -1 if recordA is less than recordB, 0 if they are equal, and 1 if recordA is greater than recordB
 */
export const compareRecords = <T = unknown>(recordA: T, recordB: T, key: keyof T): -1 | 0 | 1 => {
  const lowerCaseA = recordA[key]?.toString().toLowerCase() ?? "";
  const lowerCaseB = recordB[key]?.toString().toLowerCase() ?? "";
  return lowerCaseA < lowerCaseB ? -1 : lowerCaseA > lowerCaseB ? 1 : 0;
};

export function getObjectByString(obj: Record<string, any>, path: string) {
  if (!path) {
    return undefined;
  }
  const keys = path.split(".");
  let value = obj;
  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      return undefined;
    }
  }
  return value;
}

export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "ORDER_STATUS_WAITING_FOR_PAYMENT":
      return "yellow";
    case "ORDER_STATUS_WAITING_FOR_APPROVAL":
      return "orange";
    case "ORDER_STATUS_PROCESSED":
      return "";
    case "ORDER_STATUS_PENDING":
      return "";
    case "ORDER_STATUS_FINISHED":
      return "green";
    case "ORDER_STATUS_CANCELLED":
      return "red";
    default:
      return "";
  }
};

export const getStatusCopy = (status: string, desc?: string) => {
  switch (status) {
    case "WAITING_FOR_PAYMENT":
      return "Menunggu Pembayaran";
    case "WAITING_FOR_APPROVAL":
      return "Menunggu Persetujuan";
    case "PROCESSED":
      return "Diproses";
    case "PENDING":
      return "Pending";
    case "FINISHED":
      return "Selesai";
    case "CANCELLED":
      return "Dibatalkan";
    case "APPROVED":
      return "Disetujui";
    case "REJECTED":
      return "Ditolak";
    default:
      return desc || "";
  }
};

export const getUserType = (userType: string) => {
  switch (userType) {
    case "INTERNAL_ADMIN":
      return "internal";
    case "MEMBER_ADMIN":
      return "b2b";
    default:
      return "b2c";
  }
};
