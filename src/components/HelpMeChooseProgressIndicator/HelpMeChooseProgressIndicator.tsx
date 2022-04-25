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
  getPathName,
  HELP_ME_CHOOSE_STEPS,
  IInitStep,
} from '../../containers/HelpMeChooseContainer/helpers';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { scrollingSteps } from '../ConsumerProgressIndicator/helpers';

interface IProps {
  steps: IInitStep;
  setLoadingStatus: Dispatch<SetStateAction<boolean>>;
  setPageOffset: Dispatch<SetStateAction<number>>;
}

const ContextualProgressIndicator: React.FC<IProps> = ({
  steps,
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
      key: HELP_ME_CHOOSE_STEPS.FINANCE_TYPES,
      label: 'About You',
      step: 1,
    },
    {
      active: steps.bodyStyles.active,
      key: HELP_ME_CHOOSE_STEPS.BODY_STYLES,
      label: 'Style',
      step: 2,
    },
    {
      active: steps.fuelTypes.active,
      key: HELP_ME_CHOOSE_STEPS.FUEL_TYPES,
      label: 'Fuel Types',
      step: 3,
    },
    {
      active: steps.transmissions.active,
      key: HELP_ME_CHOOSE_STEPS.TRANSMISSIONS,
      label: 'Gearbox',
      step: 4,
    },
    {
      active: steps.terms.active,
      key: HELP_ME_CHOOSE_STEPS.TERMS,
      label: 'Lease Length',
      step: 5,
    },
    {
      active: steps.mileages.active,
      key: HELP_ME_CHOOSE_STEPS.MILEAGES,
      label: 'Mileage',
      step: 6,
    },
    {
      active: steps.availability.active,
      key: HELP_ME_CHOOSE_STEPS.AVAILABILITY,
      label: 'Availability',
      step: 7,
    },
    {
      active: steps.rental.active,
      key: HELP_ME_CHOOSE_STEPS.RESULTS,
      label: 'Results',
      step: 8,
    },
  ];

  const latestStep = cachedLastStep;

  // Work out the current step based on the URL
  const currentStep = progressSteps.find(step => step.active);
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

                  let query = {};
                  if (el.key !== HELP_ME_CHOOSE_STEPS.FINANCE_TYPES) {
                    const indexClickedTab = router.asPath.indexOf(el.key);
                    const nextSearchParams = router.asPath
                      .slice(0, indexClickedTab - 1)
                      .replace('/help-me-choose?', '');
                    const arrNextSearchParams = nextSearchParams.split('&');
                    query = arrNextSearchParams.reduce((acc, item) => {
                      const [key, value] = item.split('=');
                      return { ...acc, [key]: value };
                    }, {});
                  }
                  const pathname = getPathName(router, query);
                  router.push(
                    {
                      pathname: router.route,
                      query,
                    },
                    pathname,
                    { shallow: true },
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
