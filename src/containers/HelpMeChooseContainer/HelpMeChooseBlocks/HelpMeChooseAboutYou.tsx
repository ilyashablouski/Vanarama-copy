import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import {
  onReplace,
  IInitStep,
  buildAnObjectFromAQuery,
  initialSteps,
} from '../helpers';

export interface HelpMeChooseStep {
  steps: IInitStep;
  setSteps: (step: IInitStep) => void;
  getProductVehicleList: any;
  productVehicleListData: any;
  setLoadingStatus: Dispatch<SetStateAction<boolean>>;
}

const HelpMeChooseAboutYou: FC<HelpMeChooseStep> = props => {
  const { setSteps, steps, getProductVehicleList, setLoadingStatus } = props;
  const router = useRouter();
  const [financeTypesValue, setFinanceTypesValue] = useState<string[]>(
    steps.financeTypes.value as string[],
  );

  const financeTypes = [
    {
      label: 'Personal',
      value: 'PCH',
      active: financeTypesValue.includes('PCH'),
    },
    {
      label: 'Business',
      value: 'BCH',
      active: financeTypesValue.includes('BCH'),
    },
  ];

  const getNextSteps = (searchParams: URLSearchParams) => {
    const nextSteps = {
      step: {
        ...steps,
        financeTypes: {
          active: false,
          value: financeTypesValue,
        },
        bodyStyles: { active: true, value: steps.bodyStyles.value },
      },
      query: {
        ...initialSteps,
        financeTypes: {
          active: false,
          value: financeTypesValue,
        },
        bodyStyles: { active: true, value: initialSteps.bodyStyles.value },
      }
    };
    if (searchParams.getAll('financeTypes')[0] !== financeTypesValue[0]) {
      nextSteps.step = nextSteps.query;
    }
    return nextSteps;
  };

  return (
    <HelpMeChooseContainer
      title="Are you looking for a lease for you personally or for your business?"
      choicesValues={financeTypes}
      setChoice={setFinanceTypesValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        const nextSteps = getNextSteps(searchParams);
        getProductVehicleList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams, nextSteps.query),
            },
          },
        });
        setSteps(nextSteps.step);
        onReplace(router, nextSteps.step);
      }}
      currentValue={financeTypesValue}
    />
  );
};

export default HelpMeChooseAboutYou;
