export function truncate(str?: string, maxLength = 25, inclusive = true): string {
  if (!str) {
    return "";
  }
  return str.length > maxLength ? `${str.slice(0, inclusive ? maxLength : maxLength - 3)}...` : str;
}
/**
 * Advanced truncate function that allows you to beautify address truncation. try to truncate based on pattern
 * the usual address pattern is RoadName, City, State, Country, ZipCode?
 * truncate into truncate(RoadName, 20), City
 * Truncates a string to a maximum length, adding an ellipsis at the end.
 * @param str string to truncate
 * @param maxLength maximum length of the string
 * @param inclusive if true, the maxLength is inclusive of the ellipsis
 * @returns
 */
export function addressTruncate(str?: string, maxLength = 25, inclusive = true): string {
  if (!str) {
    return "";
  }
  const addressPattern = /([^,]+,){2}[^,]+/;
  const cityPattern = /(Kota|Kabupaten)\s[A-Za-z]+/;
  const match = str.match(addressPattern);
  const cityMatch = str.match(cityPattern);
  if (match) {
    const truncatedAddress = truncate(match[0], maxLength, inclusive);
    const remainingAddress = str.substring(match[0].length).trim();
    if (cityMatch) {
      const truncatedCity = truncate(cityMatch[0], maxLength, inclusive);
      const remainingCity = remainingAddress.substring(cityMatch[0].length).trim();
      return `${truncatedAddress}, ${truncatedCity} `;
    }
    return `${truncatedAddress}, ${remainingAddress}`;
  }
  return truncate(str, maxLength, inclusive);
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

export function toSentenceCase(str: string): string {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}
