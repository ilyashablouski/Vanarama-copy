import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, getBuckets, onReplace } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseTransmissions: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
  } = props;
  const router = useRouter();
  const [transmissionsValue, setTransmissionsValue] = useState<string[]>(
    steps.transmissions.value as string[],
  );

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const transmissionsQuery = searchParams.getAll('transmissions');
      const transmissionsQueryValue = transmissionsQuery.length
        ? transmissionsQuery[0].split(',')
        : [];
      const isTransmissionsActive =
        searchParams.has('transmissions') && !searchParams.has('terms');
      setSteps({
        ...steps,
        transmissions: {
          active: steps.transmissions.active || isTransmissionsActive,
          value: transmissionsQueryValue,
        },
      });
      setTransmissionsValue(transmissionsQueryValue);
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

  const transmissionsData = getSectionsData(
    ['productVehicleList', 'aggs', 'transmission'],
    productVehicleListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="Which Gearbox Do You Prefer?"
      choicesValues={getBuckets(transmissionsData, transmissionsValue)}
      setChoice={setTransmissionsValue}
      onClickContinue={() => {
        setSteps({
          ...steps,
          transmissions: { active: false, value: transmissionsValue },
          terms: { active: true, value: steps.terms.value },
        });
        onReplace(router, {
          ...steps,
          transmissions: { active: true, value: transmissionsValue },
        });
      }}
      multiSelect
      currentValue={transmissionsValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseTransmissions;
