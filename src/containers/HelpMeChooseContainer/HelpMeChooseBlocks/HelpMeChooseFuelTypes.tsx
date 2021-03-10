import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import {
  buildAnObjectFromAQuery,
  getBuckets,
  initialSteps,
  onReplace,
} from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseFuelTypes: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
    setLoadingStatus,
  } = props;
  const router = useRouter();
  const [fuelTypesValue, setFuelTypesValue] = useState<string[]>(
    steps.fuelTypes.value as string[],
  );

  const fuelTypesData = getSectionsData(
    ['productVehicleList', 'aggs', 'fuelType'],
    productVehicleListData?.data,
  );

  const getNextSteps = (searchParams: URLSearchParams) => {
    const nextSteps = {
      step: {
        ...steps,
        fuelTypes: {
          active: false,
          value: fuelTypesValue,
          title: steps.fuelTypes.title,
        },
        transmissions: {
          active: true,
          value: steps.transmissions.value,
          title: steps.transmissions.title,
        },
      },
      query: {
        ...initialSteps,
        bodyStyles: {
          active: false,
          value: steps.bodyStyles.value as any,
          title: steps.bodyStyles.title,
        },
        financeTypes: {
          active: false,
          value: steps.financeTypes.value as any,
          title: steps.financeTypes.title,
        },
        fuelTypes: {
          active: false,
          value: fuelTypesValue,
          title: steps.fuelTypes.title,
        },
        transmissions: {
          active: true,
          value: initialSteps.transmissions.value,
          title: steps.transmissions.title,
        },
      },
    };
    const searchParamsValue = searchParams
      .getAll('fuelTypes')[0]
      ?.split(',')
      .slice()
      .sort();
    const array2Sorted = fuelTypesValue?.slice().sort();
    if (
      !(
        searchParamsValue?.length === fuelTypesValue?.length &&
        searchParamsValue?.every((value, index) => {
          return value === array2Sorted[index];
        })
      )
    ) {
      nextSteps.step = nextSteps.query;
    }
    return nextSteps;
  };

  return (
    <HelpMeChooseContainer
      title="Which Fuel Type Do You Prefer?"
      choicesValues={getBuckets(fuelTypesData, fuelTypesValue)}
      setChoice={setFuelTypesValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        const nextSteps = getNextSteps(searchParams);
        getProductVehicleList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams, nextSteps.query),
            },
          },
        });
        setSteps(nextSteps.step);
        onReplace(router, nextSteps.step);
      }}
      multiSelect
      currentValue={fuelTypesValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseFuelTypes;
