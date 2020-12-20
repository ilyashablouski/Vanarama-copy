import { createContext, useContext } from 'react';

const ProgressContext = createContext<{ activeStep: number } | undefined>(
  undefined,
);

export const ProgressProvider = ProgressContext.Provider;
export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error(
      'useProgressContext must be used in scope of ProgressProvider',
    );
  }

  return ctx;
}

export type StepStatus = 'complete' | 'incomplete' | 'current' | 'editing';
const StepContext = createContext<
  { status: StepStatus; step: number } | undefined
>(undefined);

export const StepProvider = StepContext.Provider;
export function useStepContext() {
  const ctx = useContext(StepContext);
  if (!ctx) {
    throw new Error('useStepContext must be used in scope of StepProvider');
  }

  return ctx;
}
