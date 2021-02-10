import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { onReplace, IInitStep, buildAnObjectFromAQuery } from '../helpers';

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
  const [financeTypesValue, setFinanceTypesValue] = useState<string>(
    steps.financeTypes.value as any,
  );

  const financeTypes = [
    { label: 'Personal', value: 'PCH', active: financeTypesValue === 'PCH' },
    { label: 'Business', value: 'BCH', active: financeTypesValue === 'BCH' },
  ];

  return (
    <HelpMeChooseContainer
      title="Are you looking for a lease for you personally or for your business?"
      choicesValues={financeTypes}
      setChoice={setFinanceTypesValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        getProductVehicleList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams, {
                ...steps,
                financeTypes: {
                  active: false,
                  value: financeTypesValue as any,
                },
                bodyStyles: { active: true, value: steps.bodyStyles.value },
              }),
            },
          },
        });
        setSteps({
          ...steps,
          financeTypes: { active: false, value: financeTypesValue as any },
          bodyStyles: { active: true, value: steps.bodyStyles.value },
        });
        onReplace(
          router,
          {
            ...steps,
            financeTypes: { active: false, value: financeTypesValue as any },
          },
          '',
          router.query.isEdit as string,
        );
      }}
      currentValue={financeTypesValue}
    />
  );
};

export default HelpMeChooseAboutYou;
