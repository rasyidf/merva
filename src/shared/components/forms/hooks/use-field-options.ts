import { useEffect, useState } from 'react';
import type { SelectOption } from '../form-builder.types';

export interface OptionsConfig {
  field: string;
  loadOptions: () => Promise<SelectOption[]> | SelectOption[];
  dependencies?: string[];
  filter?: (options: SelectOption[], dependencyValues: any[]) => SelectOption[];
  transform?: (options: SelectOption[]) => SelectOption[];
}

export const useFieldOptions = (configs: OptionsConfig[]) => {
  const [optionsMap, setOptionsMap] = useState<Record<string, SelectOption[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, Error | null>>({});

  const loadFieldOptions = async (config: OptionsConfig, dependencyValues?: any[]) => {
    const { field, loadOptions, filter, transform } = config;
    
    try {
      setLoading(prev => ({ ...prev, [field]: true }));
      setError(prev => ({ ...prev, [field]: null }));

      let options = await loadOptions();

      if (filter && dependencyValues) {
        options = filter(options, dependencyValues);
      }

      if (transform) {
        options = transform(options);
      }

      setOptionsMap(prev => ({ ...prev, [field]: options }));
    } catch (err) {
      setError(prev => ({ 
        ...prev, 
        [field]: err instanceof Error ? err : new Error('Failed to load options') 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [field]: false }));
    }
  };

  useEffect(() => {
    configs.forEach(config => {
      if (!config.dependencies) {
        loadFieldOptions(config);
      }
    });
  }, []);

  return {
    options: optionsMap,
    loading,
    error,
    loadFieldOptions
  };
};