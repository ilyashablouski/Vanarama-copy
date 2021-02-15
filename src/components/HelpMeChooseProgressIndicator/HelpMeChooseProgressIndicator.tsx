import React, { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import ProgressIndicator from 'core/molecules/progress-indicator';
import Step from 'core/molecules/progress-indicator/Step';
import StepLink from 'core/molecules/progress-indicator/StepLink';
import {
  buildAnObjectFromAQuery,
  IInitStep,
  onReplace,
} from '../../containers/HelpMeChooseContainer/helpers';

interface IProps {
  steps: IInitStep;
  setSteps: (step: IInitStep) => void;
  getProductVehicleList: any;
  setLoadingStatus: Dispatch<SetStateAction<boolean>>;
}

const ContextualProgressIndicator: React.FC<IProps> = ({
  setSteps,
  steps,
  getProductVehicleList,
  setLoadingStatus,
}) => {
  const router = useRouter();

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

  // Work out the current step based on the URL
  const currentStep = progressSteps.find(x => x.active);
  // If the querystring contains `redirect=summary` then the current step is being edited
  const editingStep = router.query.isEdit
    ? progressSteps.find(x => x.key === router.query.isEdit)
    : 0;
  // If the current step is being edited then mark the summary step as the active step
  const activeStep: number = editingStep
    ? progressSteps.find(x => x.active)?.step || 1
    : currentStep?.step || 1;

  return (
    <div className="row:progress">
      <ProgressIndicator activeStep={activeStep || 1}>
        {progressSteps.map(el => (
          <Step key={el.key} editing={editingStep === el.step} step={el.step}>
            <StepLink
              onClick={() => {
                if (activeStep > el.step) {
                  setLoadingStatus(true);
                  const searchParams = new URLSearchParams(
                    window.location.search,
                  );
                  const currentStepObject =
                    currentStep?.key === 'results'
                      ? {
                          rental: {
                            active: false,
                            value: steps.rental.value,
                          },
                          initialPeriods: {
                            active: false,
                            value: steps.initialPeriods.value,
                          },
                        }
                      : { [currentStep?.key || '']: { active: false } };
                  getProductVehicleList({
                    variables: {
                      filter: {
                        ...buildAnObjectFromAQuery(
                          searchParams,
                          {
                            ...steps,
                            [el.key]: {
                              active: true,
                              value: router.query[el.key],
                            },
                            ...currentStepObject,
                          },
                          el.step,
                        ),
                      },
                    },
                  });
                  setSteps({
                    ...steps,
                    [el.key]: {
                      active: true,
                      value: (router.query[el.key] as string).split(','),
                    },
                    ...currentStepObject,
                  });
                  onReplace(router, { ...steps }, '', el.key);
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
