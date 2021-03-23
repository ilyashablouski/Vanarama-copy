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
  getHelpMeChoose: any;
  helpMeChooseData: any;
  setLoadingStatus: Dispatch<SetStateAction<boolean>>;
}

const HelpMeChooseAboutYou: FC<HelpMeChooseStep> = props => {
  const { setSteps, steps, getHelpMeChoose, setLoadingStatus } = props;
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
          title: steps.financeTypes.title,
        },
        bodyStyles: {
          active: true,
          value: steps.bodyStyles.value,
          title: steps.bodyStyles.title,
        },
      },
      query: {
        ...initialSteps,
        financeTypes: {
          active: false,
          value: financeTypesValue,
          title: steps.financeTypes.title,
        },
        bodyStyles: {
          active: true,
          value: initialSteps.bodyStyles.value,
          title: steps.bodyStyles.title,
        },
      },
      isEdit: null as string | null,
    };
    if (searchParams.getAll('financeTypes')[0] !== financeTypesValue[0]) {
      nextSteps.step = nextSteps.query;
    } else {
      nextSteps.isEdit = searchParams.get('isEdit');
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
        getHelpMeChoose({
          variables: {
            ...buildAnObjectFromAQuery(searchParams, nextSteps.query),
          },
        });
        setSteps(nextSteps.step);
        onReplace(router, nextSteps.step, '', nextSteps.isEdit);
      }}
      currentValue={financeTypesValue}
    />
  );
};

export default HelpMeChooseAboutYou;
