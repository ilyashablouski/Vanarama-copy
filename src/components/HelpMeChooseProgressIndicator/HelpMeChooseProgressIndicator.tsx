/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import ProgressIndicator from 'core/molecules/progress-indicator';
import Step from 'core/molecules/progress-indicator/Step';
import StepLink from 'core/molecules/progress-indicator/StepLink';
import {
  buildAnObjectFromAQuery,
  IInitStep,
  onReplace,
} from '../../containers/HelpMeChooseContainer/helpers';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { scrollingSteps } from '../ConsumerProgressIndicator/helpers';

interface IProps {
  steps: IInitStep;
  setSteps: (step: IInitStep) => void;
  getHelpMeChoose: any;
  setLoadingStatus: Dispatch<SetStateAction<boolean>>;
  setPageOffset: Dispatch<SetStateAction<number>>;
}

const ContextualProgressIndicator: React.FC<IProps> = ({
  setSteps,
  steps,
  getHelpMeChoose,
  setLoadingStatus,
  setPageOffset,
}) => {
  const router = useRouter();
  const isMobile = useMobileViewport();
  const [cachedLastStep, setCachedLastStep] = useState(0);
  const [isClickBack, setClickBack] = useState(false);

  const progressSteps = [
    {
      active: steps.financeTypes.active,
      key: 'financeTypes',
      label: 'About You',
      step: 1,
    },
    {
      active: steps.bodyStyles.active,
      key: 'bodyStyles',
      label: 'Style',
      step: 2,
    },
    {
      active: steps.fuelTypes.active,
      key: 'fuelTypes',
      label: 'Fuel Types',
      step: 3,
    },
    {
      active: steps.transmissions.active,
      key: 'transmissions',
      label: 'Gearbox',
      step: 4,
    },
    {
      active: steps.terms.active,
      key: 'terms',
      label: 'Lease Length',
      step: 5,
    },
    {
      active: steps.mileages.active,
      key: 'mileages',
      label: 'Mileage',
      step: 6,
    },
    {
      active: steps.availability.active,
      key: 'availability',
      label: 'Availability',
      step: 7,
    },
    {
      active: steps.rental.active,
      key: 'results',
      label: 'Results',
      step: 8,
    },
  ];

  const latestStep = cachedLastStep;

  // Work out the current step based on the URL
  const currentStep = progressSteps.find(x => x.active);
  // If the querystring contains `isEdit` then the current step is being edited
  const editingStep = router.query.isEdit ? currentStep?.step : 0;
  // If the current step is being edited then mark the summary step as the active step
  const activeStep: number = editingStep
    ? progressSteps[progressSteps.length - 1]?.step || 1
    : latestStep || 1;

  useEffect(() => {
    if (currentStep!.step > latestStep) {
      setClickBack(false);
      setCachedLastStep(currentStep!.step);
    }
    if (isClickBack) {
      setCachedLastStep(currentStep!.step);
    }
  }, [currentStep]);

  const getBackData = useCallback(() => {
    setClickBack(true);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', getBackData);
    return () => {
      window.removeEventListener('popstate', getBackData);
    };
  }, [getBackData]);

  useEffect(() => {
    if (isMobile && !!document) {
      scrollingSteps(currentStep?.step || 0);
    }
  }, [isMobile]);

  return (
    <div className="row:progress">
      <ProgressIndicator activeStep={activeStep || 1} id="progress-indicator">
        {progressSteps.map(el => (
          <Step
            key={el.key}
            editing={editingStep === el.step}
            step={el.step}
            id={`step_${el.step}`}
          >
            <StepLink
              onClick={() => {
                if (activeStep > el.step) {
                  setLoadingStatus(true);
                  setPageOffset(0);
                  const searchParams = new URLSearchParams(
                    window.location.search,
                  );
                  const currentStepObject =
                    currentStep?.key === 'results'
                      ? {
                          rental: {
                            active: false,
                            value: steps.rental.value,
                            title: el.label,
                          },
                          initialPeriods: {
                            active: false,
                            value: steps.initialPeriods.value,
                            title: el.label,
                          },
                        }
                      : { [currentStep?.key || '']: { active: false } };
                  getHelpMeChoose({
                    variables: {
                      ...buildAnObjectFromAQuery(
                        searchParams,
                        {
                          ...steps,
                          [el.key]: {
                            active: true,
                            value: router.query[el.key],
                            title: el.label,
                          },
                          ...currentStepObject,
                        },
                        el.step,
                      ),
                    },
                  });
                  setSteps({
                    ...steps,
                    [el.key]: {
                      active: true,
                      value:
                        typeof router.query[el.key] !== 'object'
                          ? [router.query[el.key]]
                          : router.query[el.key],
                      title: el.label,
                    },
                    ...currentStepObject,
                  });
                  onReplace(
                    router,
                    { ...steps },
                    '',
                    activeStep === 8 ? el.key : undefined,
                  );
                }
              }}
              label={el.label}
            />
          </Step>
        ))}
      </ProgressIndicator>
    </div>
  );
};

export default ContextualProgressIndicator;
