import { carNumberMatch, emailMatch, mobilePhoneMatch, numberMatch, simCardMatch } from "./regex";

export function isEmpty(value: any): boolean {
  return (
    value == null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (!(value instanceof Date) && typeof value === "object" && Object.keys(value).length === 0)
  );
}

export function isDeepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  if (!a || !b || (typeof a !== "object" && typeof b !== "object")) {
    return a === b;
  }
  if (a.prototype !== b.prototype) {
    return false;
  }
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {
    return false;
  }

  return keys.every((k) => isDeepEqual(a[k], b[k]));
}

export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

export function isFunction(obj: any): boolean {
  return !!(obj?.constructor && obj.call && obj.apply);
}

export function setOrDefault(startDate: string | undefined, defaults: string): unknown {
  return isNotEmpty(startDate) ? startDate : defaults;
}

export function composeValidators(...validators: any[]) {
  return (value: any): string | undefined =>
    validators.reduce((error, validator) => error || validator(value), undefined);
}

export const requiredValidation =
  (message: string) =>
  (value: any): string | undefined => {
    return isEmpty(value) ? message : undefined;
  };

export const minLengthValidation =
  (minLength: number, message: string) =>
  (value: any): string | undefined => {
    return isNotEmpty(value) && value.length >= minLength ? undefined : message;
  };

export const maxLengthValidation =
  (maxLength: number, message: string) =>
  (value: any): string | undefined => {
    return isNotEmpty(value) && value.length <= maxLength ? undefined : message;
  };

export const minValueValidation =
  (minValue: number, message: string) =>
  (value: any): string | undefined => {
    return isNotEmpty(value) && value >= minValue ? undefined : message;
  };

export const numberValidation =
  (message: string) =>
  (value: string): string | undefined => {
    return isNotEmpty(value) && numberMatch(value.replace(/[-\s]/, "")) ? undefined : message;
  };

export const licenseNimberValidation =
  (message: string) =>
  (value: string): string | undefined => {
    return isNotEmpty(value) && simCardMatch(value) ? undefined : message;
  };

export const matchValidation =
  (match: string, message: string) =>
  (value: any): string | undefined => {
    return isNotEmpty(value) && value === match ? undefined : message;
  };

export const phoneNumberValidation =
  (message: string) =>
  (value: any): string | undefined => {
    return mobilePhoneMatch(value) ? undefined : message;
  };

export const emailValidation =
  (message: string) =>
  (value: any): string | undefined => {
    return emailMatch(value) ? undefined : message;
  };
export const plateNumberValidation =
  (message: string) =>
  (value: any): string | undefined => {
    return carNumberMatch(value) ? undefined : message;
  };

export const isGUID = (value: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
};
