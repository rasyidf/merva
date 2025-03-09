export const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  alphanumeric: /^[a-zA-Z0-9]*$/,
  numeric: /^\d*$/,
  integer: /^-?\d*$/,
  decimal: /^-?\d*\.?\d*$/,
};

export const masks = {
  phone: "#### ###-####",
  date: "##/##/####",
  datetime: "##/##/#### ##:##",
  time: "##:##",
  currency: "$#,##0.00",
  percentage: "#0.00%",
  ssn: "###-##-####",
  zip: "#####-####",
  creditCard: "#### #### #### ####",
  ipAddress: "###.###.###.###",
}

export const messages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  password: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
  min: (min: number) => `Must be at least ${min}`,
  max: (max: number) => `Must be at most ${max}`,
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be at most ${max} characters`,
  between: (min: number, max: number) => `Must be between ${min} and ${max}`,
  match: (field: string) => `Must match ${field}`,
  unique: (field: string) => `${field} must be unique`,
  date: 'Please enter a valid date',
  future: 'Date must be in the future',
  past: 'Date must be in the past',
};

export const validators = {
  required: (value: any) => {
    if (value === undefined || value === null || value === '') {
      return messages.required;
    }
    return true;
  },

  email: (value: string) => {
    if (!value) return true;
    return patterns.email.test(value) || messages.email;
  },

  phone: (value: string) => {
    if (!value) return true;
    return patterns.phone.test(value) || messages.phone;
  },

  url: (value: string) => {
    if (!value) return true;
    return patterns.url.test(value) || messages.url;
  },

  password: (value: string) => {
    if (!value) return true;
    return patterns.password.test(value) || messages.password;
  },

  min: (min: number) => (value: number) => {
    if (!value) return true;
    return value >= min || messages.min(min);
  },

  max: (max: number) => (value: number) => {
    if (!value) return true;
    return value <= max || messages.max(max);
  },

  minLength: (min: number) => (value: string) => {
    if (!value) return true;
    return value.length >= min || messages.minLength(min);
  },

  maxLength: (max: number) => (value: string) => {
    if (!value) return true;
    return value.length <= max || messages.maxLength(max);
  },

  between: (min: number, max: number) => (value: number) => {
    if (!value) return true;
    return (value >= min && value <= max) || messages.between(min, max);
  },

  match: (field: string) => (value: any, formValues: Record<string, any>) => {
    if (!value) return true;
    return value === formValues[field] || messages.match(field);
  },

  unique: (field: string, existingValues: any[]) => (value: any) => {
    if (!value) return true;
    return !existingValues.includes(value) || messages.unique(field);
  },

  date: (value: any) => {
    if (!value) return true;
    const date = new Date(value);
    return !isNaN(date.getTime()) || messages.date;
  },

  future: (value: any) => {
    if (!value) return true;
    const date = new Date(value);
    return date > new Date() || messages.future;
  },

  past: (value: any) => {
    if (!value) return true;
    const date = new Date(value);
    return date < new Date() || messages.past;
  },

  compose: (...validators: Array<(value: any, formValues: Record<string, any>) => string | boolean>) => 
    (value: any, formValues: Record<string, any>) => {
      for (const validator of validators) {
        const result = validator(value, formValues);
        if (result !== true) return result;
      }
      return true;
    },
};