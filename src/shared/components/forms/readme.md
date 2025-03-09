# Form Builder Component

A powerful and flexible form building system built on top of React Hook Form, Mantine UI, and Zod validation. This module provides a comprehensive solution for creating dynamic forms with advanced features like field dependencies, validation, masking, and more.

## Features

- 🎯 **Dynamic Form Generation**: Build forms dynamically using a declarative configuration
- 🔍 **Field Types**: Rich set of field types including text, number, date, select, multiselect, checkbox, radio, and more
- ✨ **Form Wizard**: Multi-step form support with progress tracking
- 🔄 **Repeatable Fields**: Support for array/repeatable field groups with drag-and-drop reordering
- 🎭 **Field Dependencies**: Complex field relationships and conditional rendering
- ✅ **Validation**: Built-in validation using Zod with support for custom validation rules
- 📝 **Field Masking**: Input masking for formatted data entry
- 💾 **Form Persistence**: Automatic form state persistence with localStorage
- 🎨 **Flexible Layouts**: Grid, stack, and section-based layouts with customizable styling
- 🔌 **Extensible**: Easy to add custom field types and behaviors

## Installation

```bash
npm install @mantine/core @mantine/hooks @hookform/resolvers react-hook-form zod @hello-pangea/dnd
```

## Basic Usage

```tsx
import { FormBuilder } from './components/forms';
import { z } from 'zod';

// Define your form schema
const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old')
});

// Define your form fields
const fields = [
  { 
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your name'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email'
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age'
  }
];

// Use the FormBuilder
const MyForm = () => {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormBuilder
      schema={schema}
      onSubmit={handleSubmit}
    >
      <FormFields
        fields={fields}
        layout="grid"
        columns={2}
      />
    </FormBuilder>
  );
};
```

## Advanced Features

### Form Wizard

Create multi-step forms with progress tracking:

```tsx
const steps = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Basic information',
    fields: [
      { name: 'name', type: 'text', label: 'Name' },
      { name: 'email', type: 'email', label: 'Email' }
    ]
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

Create dynamic field arrays with drag-and-drop support:

```tsx
const fields = [
  {
    name: 'items',
    type: 'repeatable',
    fields: [
      { name: 'name', type: 'text', label: 'Item Name' },
      { name: 'quantity', type: 'number', label: 'Quantity' }
    ],
    min: 1,
    max: 5
  }
];
```

### Field Dependencies

Create dynamic form behavior based on field values:

```tsx
const dependencies = [
  {
    sourceField: 'hasAddress',
    targetField: 'address',
    rule: value => value === true,
    effect: 'show'
  }
];

<FormBuilder
  schema={schema}
  fields={fields}
  dependencies={dependencies}
/>
```

### Field Masking

Apply input masks for formatted data entry:

```tsx
const fields = [
  {
    name: 'phone',
    type: 'text',
    label: 'Phone',
    mask: '(###) ###-####'
  },
  {
    name: 'creditCard',
    type: 'text',
    label: 'Credit Card',
    mask: '#### #### #### ####'
  }
];
```

## Customization

### Adding Custom Field Types

1. Create your custom field component
2. Add it to the fields registry
3. Update the field type definitions

```tsx
// Custom field component
const MyCustomField = (props) => {
  // Your implementation
};

// Add to fields registry
fields.custom = {
  editor: MyCustomField,
  view: MyCustomField,
  parse: value => value,
  format: value => value
};

// Update type definitions
type FieldType = 
  | 'text'
  | 'number'
  // ... other types
  | 'custom';
```

### Styling

The form components use Mantine's theming system. You can customize the appearance by:

1. Using Mantine's theme provider
2. Passing style props to individual components
3. Using CSS modules or styled-components

```tsx
<MantineProvider theme={{
  components: {
    FormBuilder: {
      styles: {
        // Your custom styles
      }
    }
  }
}}>
  <FormBuilder {...props} />
</MantineProvider>
```

## Best Practices

1. **Validation**: Define comprehensive validation rules using Zod schemas
2. **Field Dependencies**: Keep dependency rules simple and maintainable
3. **Performance**: Use memoization for complex computed values
4. **Accessibility**: Ensure proper ARIA attributes and keyboard navigation
5. **Error Handling**: Implement proper error boundaries and user feedback

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT