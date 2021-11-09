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
  buildAnObjectFromAQuery, getPathName,
  HELP_ME_CHOSE_STEPS,
  IInitStep
} from "../../containers/HelpMeChooseContainer/helpers";
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { scrollingSteps } from '../ConsumerProgressIndicator/helpers';

interface IProps {
  steps: IInitStep;
  getHelpMeChoose: any;
  setLoadingStatus: Dispatch<SetStateAction<boolean>>;
  setPageOffset: Dispatch<SetStateAction<number>>;
}

const ContextualProgressIndicator: React.FC<IProps> = ({
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
      step: HELP_ME_CHOSE_STEPS.financeTypes,
    },
    {
      active: steps.bodyStyles.active,
      key: 'bodyStyles',
      label: 'Style',
      step: HELP_ME_CHOSE_STEPS.bodyStyles,
    },
    {
      active: steps.fuelTypes.active,
      key: 'fuelTypes',
      label: 'Fuel Types',
      step: HELP_ME_CHOSE_STEPS.fuelTypes,
    },
    {
      active: steps.transmissions.active,
      key: 'transmissions',
      label: 'Gearbox',
      step: HELP_ME_CHOSE_STEPS.transmissions,
    },
    {
      active: steps.terms.active,
      key: 'terms',
      label: 'Lease Length',
      step: HELP_ME_CHOSE_STEPS.terms,
    },
    {
      active: steps.mileages.active,
      key: 'mileages',
      label: 'Mileage',
      step: HELP_ME_CHOSE_STEPS.mileages,
    },
    {
      active: steps.availability.active,
      key: 'availability',
      label: 'Availability',
      step: HELP_ME_CHOSE_STEPS.availability,
    },
    {
      active: steps.rental.active,
      key: 'results',
      label: 'Results',
      step: HELP_ME_CHOSE_STEPS.rental,
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

                  let query = {};
                  if (el.key !== 'financeTypes') {
                    const indexClickedTab = router.asPath.indexOf(el.key);
                    const nextSearchParams = router.asPath
                      .slice(0, indexClickedTab - 1)
                      .replace('/help-me-choose?', '');
                    const arrNextSearchParams = nextSearchParams.split('&');
                    query = arrNextSearchParams.reduce((acc, item) => {
                      const foo = item.split('=');
                      const key = foo[0];
                      const value = foo[1];
                      return Object.assign(acc, { [key]: value });
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
