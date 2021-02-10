import { useRouter } from 'next/router';
import { FC, useState } from 'react';
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
    setLoadingStatus,
  } = props;
  const router = useRouter();
  const [bodyStylesValue, setBodyStylesValue] = useState<string[]>(
    steps.bodyStyles.value as string[],
  );

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
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        getProductVehicleList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams, {
                ...steps,
                bodyStyles: { active: false, value: bodyStylesValue },
              }),
            },
          },
        });
        setSteps({
          ...steps,
          bodyStyles: { active: false, value: bodyStylesValue },
          fuelTypes: { active: true, value: steps.fuelTypes.value },
        });
        onReplace(
          router,
          {
            ...steps,
            fuelTypes: { active: true, value: steps.fuelTypes.value },
            bodyStyles: { active: false, value: bodyStylesValue },
          },
          '',
          router.query.isEdit as string,
        );
      }}
      multiSelect
      withIcons
      currentValue={bodyStylesValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseBodyStyle;
