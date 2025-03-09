import { useCallback, useMemo, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { MetaField } from '../form-builder.types';

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  fields: MetaField[];
  dependencies?: string[];
  validate?: (data: Record<string, any>) => Promise<boolean> | boolean;
  canSkip?: boolean;
}

export interface FormWizardOptions {
  steps: WizardStep[];
  initialStep?: string;
  onStepChange?: (from: string, to: string) => void;
  onComplete?: (data: Record<string, any>) => void;
}

export const useFormWizard = (
  form: UseFormReturn<any>,
  options: FormWizardOptions
) => {
  const { steps, initialStep, onStepChange, onComplete } = options;
  const [currentStepId, setCurrentStepId] = useState(initialStep || steps?.[0]?.id);
  const [visitedSteps, setVisitedSteps] = useState<Set<string>>(new Set([currentStepId ?? '']));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepIndex = useMemo(() =>
    steps.findIndex(step => step.id === currentStepId),
    [steps, currentStepId]
  );

  const currentStep = useMemo(() =>
    steps[currentStepIndex],
    [steps, currentStepIndex]
  );

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const validateCurrentStep = useCallback(async () => {
    const stepFields = currentStep?.fields.map(field => field.name);
    const isValid = await form.trigger(stepFields);

    if (!isValid) return false;

    if (currentStep?.validate) {
      return currentStep?.validate(form.getValues());
    }

    return true;
  }, [currentStep, form]);

  const canMoveToStep = useCallback((stepId: string) => {
    const targetIndex = steps.findIndex(step => step.id === stepId);
    if (targetIndex === -1) return false;

    // Can always move backwards
    if (targetIndex < currentStepIndex) return true;

    // Can only move forward to the next unvisited step or revisit a previously completed step
    return targetIndex === currentStepIndex + 1 || visitedSteps.has(stepId);
  }, [steps, currentStepIndex, visitedSteps]);

  const goToStep = useCallback(async (stepId: string) => {
    if (!canMoveToStep(stepId)) return false;

    // Validate current step before moving forward
    if (stepId !== currentStepId) {
      const targetIndex = steps.findIndex(step => step.id === stepId);
      if (targetIndex > currentStepIndex) {
        const isValid = await validateCurrentStep();
        if (!isValid) return false;
      }
    }

    const previousStepId = currentStepId;
    setCurrentStepId(stepId);
    setVisitedSteps(prev => new Set([...prev, stepId]));
    onStepChange?.(previousStepId ?? '', stepId);
    return true;
  }, [currentStepId, currentStepIndex, validateCurrentStep, steps, canMoveToStep, onStepChange]);

  const nextStep = useCallback(async () => {
    if (isLastStep) return false;

    const isValid = await validateCurrentStep();
    if (!isValid) return false;

    const nextStepId = steps[currentStepIndex + 1]?.id ?? '';
    return goToStep(nextStepId);
  }, [isLastStep, validateCurrentStep, steps, currentStepIndex, goToStep]);

  const previousStep = useCallback(() => {
    if (isFirstStep) return false;
    const previousStepId = steps[currentStepIndex - 1]?.id ?? '';
    return goToStep(previousStepId);
  }, [isFirstStep, steps, currentStepIndex, goToStep]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      // Validate all steps
      for (const step of steps) {
        const stepFields = step.fields.map(field => field.name);
        const isValid = await form.trigger(stepFields);

        if (!isValid) {
          goToStep(step.id);
          return false;
        }

        if (step.validate) {
          const isStepValid = await step.validate(form.getValues());
          if (!isStepValid) {
            goToStep(step.id);
            return false;
          }
        }
      }

      const data = form.getValues();
      await onComplete?.(data);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [steps, form, goToStep, onComplete]);

  return {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    isSubmitting,
    visitedSteps,
    goToStep,
    nextStep,
    previousStep,
    canMoveToStep,
    validateCurrentStep,
    handleSubmit,
  };
};