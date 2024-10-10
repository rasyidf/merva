/**
 * Filters the given data array based on the policy set.
 * @param data An array of objects with a 'value' property.
 * @param policy A set of values to filter 'data' array against.
 * @returns An array of objects from 'data' that have a 'value' property matching a value in 'policy'.
 */
export const checkPolicy = (data?: { value: string }[], policy?: Set<string>): { value: string }[] => {
  if (!data || !policy) {
    return [];
  }
  return data.filter(({ value }) => policy.has(value));
};
