import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, onReplace } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

const HelpMeChooseRental: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductsFilterList,
    productsFilterListData,
  } = props;
  const router = useRouter();
  const [rentalValue, setRentalValue] = useState<string[]>(
    steps.rental.value as string[],
  );

  const rentalTypes = [
    {
      label: '£0–£150',
      value: '0-150',
      active: rentalValue.includes('0-150'),
    },
    {
      label: '£150–£250',
      value: '150-250',
      active: rentalValue.includes('150-250'),
    },
    {
      label: '£250–£350',
      value: '250-350',
      active: rentalValue.includes('250-350'),
    },
    {
      label: '£350–£450',
      value: '350-450',
      active: rentalValue.includes('350-450'),
    },
    {
      label: '£450–£550',
      value: '450-550',
      active: rentalValue.includes('450-550'),
    },
    {
      label: '£550+',
      value: '550',
      active: rentalValue.includes('550'),
    },
  ];

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const isRentalActive =
        searchParams.has('rental') && !searchParams.has('preferToPay');
      const rentalQuery = searchParams.getAll('rental');
      const rentalQueryValue = rentalQuery.length
        ? rentalQuery[0].split(',')
        : [];
      setSteps({
        ...steps,
        rental: {
          active: steps.rental.active || isRentalActive,
          value: rentalQueryValue,
        },
      });
      setRentalValue(rentalQueryValue);
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

  const rentalData = getSectionsData(
    ['productsFilterList', 'rental', 'stats'],
    productsFilterListData?.data,
  );

  const rentalTypesData = rentalTypes.filter(el =>
    el.value.includes(rentalData.max),
  );

  return (
    <HelpMeChooseContainer
      title="What’s Your Monthly Budget?"
      choicesValues={rentalTypesData}
      setChoice={setRentalValue}
      onClickContinue={() => {
        setSteps({
          ...steps,
          rental: { active: false, value: rentalValue as any },
          preferToPay: { active: true, value: steps.preferToPay.value },
        });
        onReplace(router, {
          ...steps,
          rental: { active: false, value: rentalValue as any },
        });
      }}
      currentValue={rentalValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseRental;
