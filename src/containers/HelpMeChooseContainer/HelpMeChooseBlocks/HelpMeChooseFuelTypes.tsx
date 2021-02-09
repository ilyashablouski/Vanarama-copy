import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, getBuckets, onReplace } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseFuelTypes: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
  } = props;
  const router = useRouter();
  const [fuelTypesValue, setFuelTypesValue] = useState<string[]>(
    steps.fuelTypes.value as string[],
  );

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const fuelTypesQuery = searchParams.getAll('fuelTypes');
      const fuelTypesQueryValue = fuelTypesQuery.length
        ? fuelTypesQuery[0].split(',')
        : [];
      const isFuelTypesActive =
        searchParams.has('fuelTypes') && !searchParams.has('transmissions');
      setSteps({
        ...steps,
        fuelTypes: {
          active: steps.fuelTypes.active || isFuelTypesActive,
          value: fuelTypesQueryValue,
        },
      });
      setFuelTypesValue(fuelTypesQueryValue);
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

  const fuelTypesData = getSectionsData(
    ['productVehicleList', 'aggs', 'fuelType'],
    productVehicleListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="Which Fuel Type Do You Prefer?"
      choicesValues={getBuckets(fuelTypesData, fuelTypesValue)}
      setChoice={setFuelTypesValue}
      onClickContinue={() => {
        setSteps({
          ...steps,
          fuelTypes: { active: false, value: fuelTypesValue },
          transmissions: { active: true, value: steps.transmissions.value },
        });
        onReplace(router, {
          ...steps,
          fuelTypes: { active: false, value: fuelTypesValue },
        });
      }}
      multiSelect
      currentValue={fuelTypesValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseFuelTypes;
