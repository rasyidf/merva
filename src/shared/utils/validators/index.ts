import {
  isEmpty,
  isNotEmpty,
  isFunction,
  isDeepEqual,
  requiredValidation,
  minLengthValidation,
  maxLengthValidation,
  numberValidation,
  emailValidation,
  phoneNumberValidation,
  matchValidation,
  composeValidators
} from "../converters/validators";

// Re-export with better organization
export const validators = {
  // Core validation functions
  is: {
    empty: isEmpty,
    notEmpty: isNotEmpty,
    function: isFunction,
    deepEqual: isDeepEqual,
  },

  // Field validators
  fields: {
    required: requiredValidation,
    minLength: minLengthValidation,
    maxLength: maxLengthValidation,
    number: numberValidation,
    email: emailValidation,
    phone: phoneNumberValidation,
    match: matchValidation,
  },

  // Utilities
  compose: composeValidators,
} as const;