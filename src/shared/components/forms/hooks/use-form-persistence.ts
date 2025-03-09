import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export interface UseFormPersistenceOptions {
  enabled?: boolean;
  key: string;
  exclude?: string[];
}

export const useFormPersistence = (
  form: UseFormReturn<any>,
  options: UseFormPersistenceOptions
) => {
  const { enabled = true, key, exclude = [] } = options;

  useEffect(() => {
    if (!enabled) return;

    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Filter out excluded fields
        const filteredData = Object.fromEntries(
          Object.entries(parsedData).filter(([key]) => !exclude.includes(key))
        );
        form.reset(filteredData);
      } catch (error) {
        console.error('Error restoring form data:', error);
        localStorage.removeItem(key);
      }
    }

    const subscription = form.watch((value) => {
      if (!value) return;
      
      // Filter out excluded fields
      const filteredValue = Object.fromEntries(
        Object.entries(value).filter(([key]) => !exclude.includes(key))
      );
      
      localStorage.setItem(key, JSON.stringify(filteredValue));
    });

    return () => {
      subscription.unsubscribe();
      if (form.formState.isSubmitSuccessful) {
        localStorage.removeItem(key);
      }
    };
  }, [form, enabled, key, exclude]);

  const clearPersistedData = () => {
    localStorage.removeItem(key);
  };

  return { clearPersistedData };
};