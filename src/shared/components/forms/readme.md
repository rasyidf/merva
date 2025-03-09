# Form Builder Component

A powerful and flexible form building system built on top of React Hook Form, Mantine UI, and Zod validation. This module provides a comprehensive solution for creating dynamic forms with advanced features like field dependencies, validation, masking, and more.

## Features

- 🎯 **Dynamic Form Generation**: Build forms declaratively with a simple schema-based configuration
- 🔍 **Rich Field Types**: Built-in support for common field types with consistent behavior
- ✨ **Form Wizard**: Multi-step forms with validation and navigation
- 🔄 **Repeatable Fields**: Array fields with drag-and-drop reordering
- 🎭 **Field Dependencies**: Declarative field relationships and conditional rendering
- ✅ **Validation**: First-class Zod integration with custom validation support
- 📝 **Field Masking**: Built-in masks for common formats (phone, currency, etc.)
- 💾 **Form Persistence**: Auto-save form state with customizable storage
- 🎨 **Flexible Layouts**: Grid, stack, and section-based layouts
- 🔌 **Extensible**: Register custom field types with full TypeScript support

## Installation

```bash
npm install @mantine/core @mantine/hooks @hookform/resolvers react-hook-form zod @hello-pangea/dnd
```

## Basic Usage

```tsx
import { FormBuilder, FormFields } from './components/forms';
import { z } from 'zod';

// Define your validation schema
const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old')
});

// Define your form fields
const fields = [
  { 
    name: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your name',
    // Optional: Add client-side validation
    validation: {
      required: 'Name is required'
    }
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email'
  },
  {
    name: 'age',
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
    // Optional: Transform value before submission
    transform: (value: string) => parseInt(value, 10)
  }
];

const MyForm = () => {
  const handleSubmit = async (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormBuilder
      schema={schema}
      onSubmit={handleSubmit}
      // Optional: Enable form state persistence
      persistData
      id="my-form"
    >
      <FormFields
        fields={fields}
        layout="grid"
        columns={{ base: 12, md: 6 }}
      />
    </FormBuilder>
  );
};
```

## Advanced Features

### Custom Field Types

Register custom field types with full type safety:

```tsx
import { registry } from './utils/field-registry';

// Create your custom field component
const MyCustomField = (props: EditorProps) => {
  // Your implementation
};

// Register the field type
registry.register('custom-field', {
  editor: MyCustomField,
  view: MyCustomField,
  parse: (value) => value,
  format: (value) => value
});

// Update type definitions
declare module './form-builder.types' {
  interface FieldType {
    'custom-field': typeof MyCustomField;
  }
}
```

### Field Dependencies

Create dynamic form behavior:

```tsx
const fields = [
  {
    name: 'hasAddress',
    type: 'checkbox',
    label: 'Do you have a different mailing address?'
  },
  {
    name: 'address',
    type: 'textarea',
    label: 'Mailing Address',
    dependencies: ['hasAddress'],
    validate: ([hasAddress]) => hasAddress === true
  }
];
```

### Form Wizard

Create multi-step forms:

```tsx
const steps = [
  {
    id: 'personal',
    title: 'Personal Info',
    fields: [
      { name: 'name', type: 'text', label: 'Name' },
      { name: 'email', type: 'email', label: 'Email' }
    ],
    // Optional: Add step validation
    validate: async (data) => {
      // Validate step data
      return true;
    }
  },
  {
    id: 'address',
    title: 'Address',
    fields: [
      { name: 'street', type: 'text', label: 'Street' },
      { name: 'city', type: 'text', label: 'City' }
    ]
  }
];

<FormBuilder schema={schema}>
  <FormWizard
    steps={steps}
    onComplete={handleComplete}
  />
</FormBuilder>
```

### Repeatable Fields

Create dynamic field arrays:

```tsx
const fields = [
  {
    name: 'items',
    type: 'repeatable',
    label: 'Line Items',
    min: 1,
    max: 10,
    fields: [
      { name: 'description', type: 'text', label: 'Description' },
      { name: 'quantity', type: 'number', label: 'Quantity' },
      { name: 'price', type: 'number', label: 'Price' }
    ]
  }
];
```

### Field Masking

Apply input masks:

```tsx
const fields = [
  {
    name: 'phone',
    type: 'phone',
    label: 'Phone Number',
    // Built-in phone mask will be applied
  },
  {
    name: 'amount',
    type: 'number',
    label: 'Amount',
    // Custom mask
    mask: {
      parse: (value: string) => Number(value.replace(/[^0-9.-]/g, '')),
      format: (value: number) => value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    }
  }
];
```

### Validation Composition

Use the validation composer for clean, chainable validation rules:

```tsx
import { validate } from './components/forms';

const fields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    validation: validate()
      .required('Email is required')
      .email()
      .toRules()
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    validation: validate()
      .required('Password is required')
      .minLength(8, 'Password must be at least 8 characters')
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        'Password must contain uppercase, lowercase and numbers'
      )
      .toRules()
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    validation: validate()
      .required('Please confirm your password')
      .dependsOn('password')
      .custom((value, form) => value === form.password || 'Passwords must match')
      .toRules()
  }
];
```

## Best Practices

1. **Schema Validation**
   - Define comprehensive Zod schemas for type-safe validation
   - Use schema transformations for data formatting

2. **Field Dependencies**
   - Keep dependency rules simple and declarative
   - Use the validate function for complex conditions

3. **Performance**
   - Fields are automatically memoized for optimal rendering
   - Use section groups for better organization

4. **Type Safety**
   - Leverage TypeScript for better developer experience
   - Register custom field types with proper typing

5. **Error Handling**
   - Implement form-level error handling
   - Use field-level error messages for better UX

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT