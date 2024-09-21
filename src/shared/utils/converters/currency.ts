import { formatNumber } from "./numbers";

export const convertCurrency = (value: number, currencySymbol: string, rate: number) => {
  return `${currencySymbol || "Rp"}${formatNumber(Math.ceil((value / (rate || 1)) * 100) / 100)}`;
};
