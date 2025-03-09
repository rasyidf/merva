import { useEffect, useCallback } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export interface FieldCondition {
  field: string;
  when: string[];
  is: (values: any[]) => boolean;
  then?: (form: UseFormReturn<any>) => void;
  else?: (form: UseFormReturn<any>) => void;
}

export const useFieldConditions = (
  form: UseFormReturn<any>,
  conditions: FieldCondition[]
) => {
  const watch = form.watch;

  const evaluateCondition = useCallback((condition: FieldCondition) => {
    const { when, is, then, else: otherwise } = condition;
    const values = when.map(field => watch(field));
    const result = is(values);

    if (result && then) {
      then(form);
    } else if (!result && otherwise) {
      otherwise(form);
    }
  }, [form, watch]);

  useEffect(() => {
    const subscriptions = conditions.map(condition => {
      const subscription = watch(condition.when, () => evaluateCondition(condition));
      return subscription;
    });

    return () => {
      subscriptions.forEach(subscription => {
        subscription.forEach(
          ({ unsubscribe }) => unsubscribe()
        );
      });
    };
  }, [conditions, evaluateCondition, watch]);

  // Initial evaluation
  useEffect(() => {
    conditions.forEach(evaluateCondition);
  }, [conditions, evaluateCondition]);

  return {
    evaluateCondition
  };
};