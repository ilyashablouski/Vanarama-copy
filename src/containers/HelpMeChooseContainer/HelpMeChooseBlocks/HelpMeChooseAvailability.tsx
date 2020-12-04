import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, onReplace } from '../helpers';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

const HelpMeChooseAvailability: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductsFilterList,
    productsFilterListData,
  } = props;
  const router = useRouter();
  const [availabilityValue, setAvailabilityValue] = useState<string[]>(
    steps.availability.value as string[],
  );

  const availabilityTypes = [
    {
      label: 'Within 2 Weeks',
      value: '2',
      active: availabilityValue.includes('2'),
    },
    {
      label: 'Within 4 Weeks',
      value: '4',
      active: availabilityValue.includes('4'),
    },
    {
      label: 'Within 6 Weeks',
      value: '6',
      active: availabilityValue.includes('6'),
    },
  ];

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const isAvailabilityActive = searchParams.has('availability');
      const availabilityQuery = searchParams.getAll('availability');
      const availabilityQueryValue = availabilityQuery.length
        ? availabilityQuery[0].split(',')
        : [];
      setSteps({
        ...steps,
        availability: {
          active: steps.availability.active || isAvailabilityActive,
          value: availabilityQueryValue,
        },
      });
      setAvailabilityValue(availabilityQueryValue);
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
      title="How quickly do you need the vehicle?"
      choicesValues={availabilityTypes}
      setChoice={(value: string[]) => {
        setAvailabilityValue(value);
        const searchParams = new URLSearchParams(window.location.search);
        getProductsFilterList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams),
              vehicleTypes: [VehicleTypeEnum.CAR],
            },
          },
        });
      }}
      onClickContinue={() => {
        setSteps({
          ...steps,
          availability: { active: false, value: availabilityValue as any },
        });
        onReplace(router, {
          ...steps,
          availability: { active: false, value: availabilityValue as any },
        });
      }}
      currentValue={availabilityValue}
      clearMultiSelectTitle="I Don't Mind"
      submitBtnText={`View Results ${
        availabilityValue.length
          ? `(${productsFilterListData.data.productsFilterList.manufacturers.docCount})`
          : ''
      }`}
    />
  );
};

export default HelpMeChooseAvailability;
