import { formatter, formatterCompact, formatterCurrency, formatterCurrencyCompact, formatNumber, formatDate } from "../converters/numbers";

// Re-export with better organization
export const formatters = {
  // Number formatters
  number: formatter,
  numberCompact: formatterCompact,
  
  // Currency formatters
  currency: formatterCurrency,
  currencyCompact: formatterCurrencyCompact,
  
  // Direct formatting functions
  format: {
    number: formatNumber,
    date: formatDate,
  }
} as const;