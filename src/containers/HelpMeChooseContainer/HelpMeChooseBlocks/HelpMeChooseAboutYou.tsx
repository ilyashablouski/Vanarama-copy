import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { onReplace, IInitStep } from '../helpers';

export interface HelpMeChooseStep {
  steps: IInitStep;
  setSteps: (step: IInitStep) => void;
  getProductsFilterList: any;
  productsFilterListData: any;
}

const HelpMeChooseAboutYou: FC<HelpMeChooseStep> = props => {
  const { setSteps, steps, getProductsFilterList } = props;
  const router = useRouter();
  const [financeTypesValue, setFinanceTypesValue] = useState<string>(
    steps.financeTypes.value as any,
  );

  const financeTypes = [
    { label: 'Personal', value: 'PCH', active: financeTypesValue === 'PCH' },
    { label: 'Business', value: 'BCH', active: financeTypesValue === 'BCH' },
  ];

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const financeTypesQueryValue = searchParams.get('financeTypes');
      const isFinanceTypesActive =
        searchParams.has('financeTypes') && !searchParams.has('bodyStyles');
      setSteps({
        ...steps,
        financeTypes: {
          active: steps.financeTypes.active || isFinanceTypesActive,
          value: financeTypesQueryValue as any,
        },
      });
      setFinanceTypesValue(financeTypesQueryValue as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HelpMeChooseContainer
      title="Are you looking for a lease for you personally or for your business?"
      choicesValues={financeTypes}
      setChoice={setFinanceTypesValue}
      onClickContinue={() => {
        getProductsFilterList({
          variables: {
            filter: {
              vehicleTypes: [VehicleTypeEnum.CAR],
              financeTypes: financeTypesValue,
            },
          },
        });
        setSteps({
          ...steps,
          financeTypes: { active: false, value: financeTypesValue as any },
          bodyStyles: { active: true, value: steps.bodyStyles.value },
        });
        onReplace(router, {
          ...steps,
          financeTypes: { active: false, value: financeTypesValue as any },
        });
      }}
      currentValue={financeTypesValue}
    />
  );
};

export default HelpMeChooseAboutYou;
