import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, onReplace } from '../helpers';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import { getSectionsData } from '../../../utils/getSectionsData';

const HelpMeChooseAvailability: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
  } = props;
  const router = useRouter();
  const [availabilityValue, setAvailabilityValue] = useState<string[]>(
    steps.availability.value as string[],
  );

  const availabilityData: [{ docCount: number; key: string }] = getSectionsData(
    ['productVehicleList', 'aggs', 'availability'],
    productVehicleListData?.data,
  );

  const availabilityTypes = [
    {
      label: 'Within 1 Week',
      value: '7',
      active: availabilityValue.includes('7'),
    },
    {
      label: 'Within 2 Weeks',
      value: '14',
      active: availabilityValue.includes('14'),
    },
    {
      label: 'Within 3 Weeks',
      value: '21',
      active: availabilityValue.includes('21'),
    },
    {
      label: 'Within 4 Weeks',
      value: '28',
      active: availabilityValue.includes('28'),
    },
    {
      label: 'Within 6 Weeks',
      value: '45',
      active: availabilityValue.includes('45'),
    },
    {
      label: 'Within 8 Weeks',
      value: '80',
      active: availabilityValue.includes('80'),
    },
    {
      label: 'Within 12 Weeks',
      value: '90',
      active: availabilityValue.includes('90'),
    },
    {
      label: 'Over 16 Weeks',
      value: '95',
      active: availabilityValue.includes('95'),
    },
    {
      label: 'Subject To Stock',
      value: '100',
      active: availabilityValue.includes('100'),
    },
  ];

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const isAvailabilityActive =
        searchParams.has('availability') &&
        !(searchParams.has('initialPeriods') || searchParams.has('rental'));
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
      getProductVehicleList({
        variables: {
          filter: {
            ...buildAnObjectFromAQuery(searchParams, steps),
            vehicleTypes: [VehicleTypeEnum.CAR],
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vehiclesResultNumber = getSectionsData(
    ['productVehicleList', 'totalCount'],
    productVehicleListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="How quickly do you need the vehicle?"
      choicesValues={availabilityTypes.filter(el =>
        availabilityData.find(x => x.key === el.value),
      )}
      setChoice={(value: string[]) => {
        setAvailabilityValue(value);
        const searchParams = new URLSearchParams(window.location.search);
        getProductVehicleList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams, steps),
              vehicleTypes: [VehicleTypeEnum.CAR],
            },
          },
        });
      }}
      onClickContinue={() => {
        setSteps({
          ...steps,
          availability: { active: false, value: availabilityValue as any },
          rental: {
            active: true,
            value: steps.rental.value as any,
          },
          initialPeriods: {
            active: true,
            value: steps.initialPeriods.value ?? '6',
          },
        });
        onReplace(router, {
          ...steps,
          availability: { active: false, value: availabilityValue as any },
        });
      }}
      currentValue={availabilityValue}
      clearMultiSelectTitle="I Don't Mind"
      submitBtnText={`View Results ${
        availabilityValue.length ? `(${vehiclesResultNumber || 0})` : ''
      }`}
    />
  );
};

export default HelpMeChooseAvailability;
