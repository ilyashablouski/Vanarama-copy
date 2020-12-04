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
  const [leaseTypeValue, setLeaseTypeValue] = useState<string>(
    steps.leaseType.value as any,
  );

  const leaseTypes = [
    {
      label: 'Personal',
      value: 'Personal',
      active: leaseTypeValue === 'Personal',
    },
    {
      label: 'Business',
      value: 'Business',
      active: leaseTypeValue === 'Business',
    },
  ];

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const leaseTypeQueryValue = searchParams.get('leaseType');
      const isLeaseTypeActive =
        searchParams.has('leaseType') && !searchParams.has('bodyStyles');
      setSteps({
        ...steps,
        leaseType: {
          active: isLeaseTypeActive,
          value: leaseTypeQueryValue as any,
        },
      });
      setLeaseTypeValue(leaseTypeQueryValue as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HelpMeChooseContainer
      title="Are you looking for a lease for you personally or for your business?"
      choicesValues={leaseTypes}
      setChoice={setLeaseTypeValue}
      onClickContinue={() => {
        getProductsFilterList({
          variables: {
            filter: {
              vehicleTypes: [VehicleTypeEnum.CAR],
            },
          },
        });
        setSteps({
          ...steps,
          leaseType: { active: false, value: leaseTypeValue as any },
          bodyStyles: { active: true, value: steps.bodyStyles.value },
        });
        onReplace(router, {
          ...steps,
          leaseType: { active: false, value: leaseTypeValue as any },
        });
      }}
      currentValue={leaseTypeValue}
    />
  );
};

export default HelpMeChooseAboutYou;
