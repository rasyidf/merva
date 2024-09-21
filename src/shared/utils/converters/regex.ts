// NOSONAR
export const emailRegex = /^([^<>()[\]\\.,;:\s@"]+[^<>()[\]\\,;:\s@"]+)@(([a-z\-0-9]+\.)+[a-z]{2,})$/i;
export const mobilePhoneRegex = /^(?:\+62|0)(?:[\d-]{9,12})$/;
export const officePhoneRegex = /^(?:\+62|0)(?:[\d-]{7,11})$/;
export const decimalRegex = /(\.\d*?)0+$/gi;
export const digitRegex2 = /(\d)(?=(\d\d\d)+(?!\d))/gi;
export const carNumberRegex = /^([A-Z]{1,2}[-\s]?){1,2}(\d{1,4})([-\s]?[A-Z]{1,3}){0,2}$/i;
export const zipCodeRegex = /^(?<provinsi>[1-9])(?<kabupaten>\d{2})(?<kecamatan>\d{2})/gim;
export const numberRegex = /^\d+$/;
export const simCardRegex = /^\d{4}-?\d{4}-?\d{4,8}$/;

export const emailMatch = (value: string): boolean => emailRegex.test(value);
export const mobilePhoneMatch = (value: string): boolean => mobilePhoneRegex.test(value);
export const officePhoneMatch = (value: string): boolean => officePhoneRegex.test(value);
export const decimalMatch = (value: string): boolean => decimalRegex.test(value);
export const digitMatch = (value: string): boolean => digitRegex2.test(value);
export const carNumberMatch = (value: string): boolean => carNumberRegex.test(value);
export const zipCodeMatch = (value: string): boolean => zipCodeRegex.test(value);
export const numberMatch = (value: string): boolean => numberRegex.test(value);
export const simCardMatch = (value: string): boolean => simCardRegex.test(value);
