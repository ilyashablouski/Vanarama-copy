import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, onReplace } from '../helpers';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';
import { getSectionsData } from '../../../utils/getSectionsData';
import { PRODUCTS_FILTER_LIST } from '../../../gql/help-me-choose';
import { useImperativeQuery } from '../../../hooks/useImperativeQuery';

const HelpMeChooseAvailability: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
    setLoadingStatus,
  } = props;
  const router = useRouter();
  const [availabilityValue, setAvailabilityValue] = useState<string[]>(
    (steps.availability.value as string[]) || [''],
  );
  const getProducts = useImperativeQuery(PRODUCTS_FILTER_LIST);

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

  const getNextSteps = async (searchParams: URLSearchParams) => {
    const isValueChanges =
      searchParams.getAll('availability')[0] !== availabilityValue[0];
    const defRentalValue = await getProducts({
      filter: {
        ...buildAnObjectFromAQuery(searchParams, {
          ...steps,
          availability: { active: false, value: availabilityValue as any },
          rental: {
            active: true,
            value: isValueChanges ? ('350' as any) : steps.rental.value,
          },
          initialPeriods: {
            active: true,
            value: isValueChanges ? ('6' as any) : steps.initialPeriods.value,
          },
        }),
      },
    }).then(result => {
      if (result.data?.productVehicleList.totalVehicles) {
        return '350';
      }
      return getProducts({
        filter: {
          ...buildAnObjectFromAQuery(searchParams, {
            ...steps,
            availability: { active: false, value: availabilityValue as any },
            rental: {
              active: true,
              value: isValueChanges ? ('450' as any) : steps.rental.value,
            },
            initialPeriods: {
              active: true,
              value: isValueChanges ? ('6' as any) : steps.initialPeriods.value,
            },
          }),
        },
      }).then(res => {
        if (res.data?.productVehicleList.totalVehicles) {
          return '450';
        }
        return '550';
      });
    });
    return {
      ...steps,
      availability: { active: false, value: availabilityValue as any },
      rental: {
        active: true,
        value: isValueChanges ? (defRentalValue as any) : steps.rental.value,
      },
      initialPeriods: {
        active: true,
        value: isValueChanges ? ('6' as any) : steps.initialPeriods.value,
      },
    };
  };

  return (
    <HelpMeChooseContainer
      title="How quickly do you need the vehicle?"
      choicesValues={availabilityTypes.filter(el =>
        availabilityData.find(x => x.key === el.value),
      )}
      setChoice={setAvailabilityValue}
      onClickContinue={async () => {
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        const nextSteps = await getNextSteps(searchParams);
        getProductVehicleList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams, nextSteps),
            },
          },
        });
        setSteps(nextSteps);
        onReplace(router, nextSteps);
      }}
      currentValue={availabilityValue}
      clearMultiSelectTitle="I Don't Mind"
      submitBtnText="View Results"
    />
  );
};

export default HelpMeChooseAvailability;
