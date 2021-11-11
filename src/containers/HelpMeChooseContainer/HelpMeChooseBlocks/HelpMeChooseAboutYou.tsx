import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { IInitStep, setQuery } from '../helpers';

export interface HelpMeChooseStep {
  steps: IInitStep;
  helpMeChooseData: any;
  setLoadingStatus: Dispatch<SetStateAction<boolean>>;
}

const HelpMeChooseAboutYou: FC<HelpMeChooseStep> = props => {
  const { steps, setLoadingStatus } = props;
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

  return (
    <HelpMeChooseContainer
      title="Are you looking for a lease for you personally or for your business?"
      choicesValues={financeTypes}
      setChoice={setFinanceTypesValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const query = {
          financeTypes: financeTypesValue,
        };
        setQuery(router, query);
      }}
      currentValue={financeTypesValue}
    />
  );
};

export default HelpMeChooseAboutYou;
