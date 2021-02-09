import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, getBuckets, onReplace } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseBodyStyle: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
  } = props;
  const router = useRouter();
  const [bodyStylesValue, setBodyStylesValue] = useState<string[]>(
    steps.bodyStyles.value as string[],
  );

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const bodyStylesQuery = searchParams.getAll('bodyStyles');
      const bodyStylesQueryValue = bodyStylesQuery.length
        ? bodyStylesQuery[0].split(',')
        : [];
      const isBodyStylesActive =
        searchParams.has('bodyStyles') && !searchParams.has('fuelTypes');
      setSteps({
        ...steps,
        bodyStyles: {
          active: steps.bodyStyles.active || isBodyStylesActive,
          value: bodyStylesQueryValue,
        },
      });
      setBodyStylesValue(bodyStylesQueryValue);
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

  const bodyStyleData = getSectionsData(
    ['productVehicleList', 'aggs', 'capBodyStyle'],
    productVehicleListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="What Type Of Vehicle Suits You Best?"
      choicesValues={getBuckets(bodyStyleData, bodyStylesValue)}
      setChoice={setBodyStylesValue}
      onClickContinue={() => {
        setSteps({
          ...steps,
          bodyStyles: { active: false, value: bodyStylesValue },
          fuelTypes: { active: true, value: steps.fuelTypes.value },
        });
        onReplace(router, {
          ...steps,
          fuelTypes: { active: true, value: steps.fuelTypes.value },
          bodyStyles: { active: false, value: bodyStylesValue },
        });
      }}
      multiSelect
      withIcons
      currentValue={bodyStylesValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseBodyStyle;
