import { Box, Button, Group, Paper, Stepper, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { useFormWizard } from "../hooks/use-form-wizard";
import { FieldsLayout } from "./fields-layout";
import { WizardStep } from "../form-builder.types";

interface FormWizardProps {
  steps: WizardStep[];
  initialStep?: string;
  onStepChange?: (from: string, to: string) => void;
  onComplete?: (data: Record<string, any>) => void;
  loading?: boolean;
  submitLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  readOnly?: boolean;
  children?: ReactNode;
}

export const FormWizard = ({
  steps,
  initialStep,
  onStepChange,
  onComplete,
  loading = false,
  submitLabel = "Submit",
  backLabel = "Back",
  nextLabel = "Next",
  readOnly = false,
  children,
}: FormWizardProps) => {
  const form = useFormContext();
  const {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    isSubmitting,
    visitedSteps,
    nextStep,
    previousStep,
    handleSubmit,
  } = useFormWizard(form, {
    steps,
    initialStep,
    onStepChange,
    onComplete,
  });

  return (
    <Box>
      <Stepper
        active={currentStepIndex}
        allowNextStepsSelect={false}
        mb="xl"
      >
        {steps.map((step, index) => (
          <Stepper.Step
            key={step.id}
            label={step.title}
            description={step.description}
            loading={loading && currentStepIndex === index}
          // completed={visitedSteps.has(step.id)}
          />
        ))}
      </Stepper>

      <Paper withBorder p="md" radius="sm">
        <Title order={4} mb="md">
          {currentStep?.title}
        </Title>

        {currentStep?.description && (
          <Box mb="lg" c="dimmed">
            {currentStep.description}
          </Box>
        )}

        <FieldsLayout
          fields={currentStep?.fields || []}
          readonly={readOnly}
        />

        {children}

        <Group mt="xl" justify="flex-end">
          {!isFirstStep && (
            <Button
              variant="default"
              onClick={previousStep}
              disabled={loading || isSubmitting}
            >
              {backLabel}
            </Button>
          )}

          {!isLastStep ? (
            <Button
              onClick={nextStep}
              loading={loading}
              disabled={isSubmitting}
            >
              {nextLabel}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={loading || isSubmitting}
              disabled={readOnly}
            >
              {submitLabel}
            </Button>
          )}
        </Group>
      </Paper>
    </Box>
  );
};