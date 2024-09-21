import dayjs from "dayjs";

/**
 * Initalize number formatter, default locale is id-ID
 * @param locale
 * @param options
 * @returns
 * @example
 * const formatter = format();
 * const formatted = formatter.format(1000000);  // 1.000.000
 * const formatted = formatter.format(1000000.123);  // 1.000.000,12
 * const small = format("id-ID", { notation : "compact" });
 * const formatted = small.format(1000000);  // 1 Jt
 */
export function formatter(locale = "id-ID", options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    maximumFractionDigits: 2,
    notation: "standard",
    ...options,
  });
}

export function formatterCompact(locale = "id-ID", options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    maximumFractionDigits: 2,
    notation: "compact",
    ...options,
  });
}

export function formatterCurrency(locale = "id-ID", options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    useGrouping: true,
    maximumFractionDigits: 2,
    ...options,
  });
}

export function formatterCurrencyCompact(locale = "id-ID", options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    useGrouping: true,
    maximumFractionDigits: 2,
    notation: "compact",
    ...options,
  });
}

export function formatCurrencyCompactWithoutSymbol(locale = "id-ID", options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    useGrouping: true,
    maximumFractionDigits: 2,
    notation: "compact",
    currencyDisplay: "code",
    ...options,
  });
}

export function formatNumber(number: number, locale = "id-ID", options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    maximumFractionDigits: 2,

    ...options,
  }).format(number);
}

export function formatDate(date: Date | string | number | undefined, format = "DD MMMM YYYY", locale = "id-ID") {
  if (!date) {
    return "";
  }
  return dayjs(date).locale(locale).format(format);
}
