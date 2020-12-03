import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, onReplace } from '../helpers';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

const HelpMeChoosePreferToPay: FC<HelpMeChooseStep> = props => {
  const { setSteps, steps, getProductsFilterList } = props;
  const router = useRouter();
  const [preferToPayValue, setPreferToPayValue] = useState<string[]>(
    steps.preferToPay.value as string[],
  );

  const preferToPayTypes = [
    {
      label: 'Pay Little Upfront',
      value: 'upfront',
      active: preferToPayValue.includes('upfront'),
    },
    {
      label: 'Keep Monthly Payments Low',
      value: 'monthly',
      active: preferToPayValue.includes('monthly'),
    },
  ];

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const isPreferToPayActive = searchParams.has('preferToPay');
      const preferToPayQuery = searchParams.getAll('preferToPay');
      const preferToPayQueryValue = preferToPayQuery.length
        ? preferToPayQuery[0].split(',')
        : [];
      setSteps({
        ...steps,
        preferToPay: {
          active: steps.preferToPay.active || isPreferToPayActive,
          value: preferToPayQueryValue,
        },
      });
      setPreferToPayValue(preferToPayQueryValue);
      getProductsFilterList({
        variables: {
          filter: {
            ...buildAnObjectFromAQuery(searchParams),
            vehicleTypes: [VehicleTypeEnum.CAR],
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HelpMeChooseContainer
      title="Would You Prefer To Pay Less Upfront Or Less Monthly?"
      choicesValues={preferToPayTypes}
      setChoice={setPreferToPayValue}
      onClickContinue={() => {
        setSteps({
          ...steps,
          preferToPay: { active: false, value: preferToPayValue as any },
        });
        onReplace(router, {
          ...steps,
          preferToPay: { active: false, value: preferToPayValue as any },
        });
      }}
      currentValue={preferToPayValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChoosePreferToPay;
