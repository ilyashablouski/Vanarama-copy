import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, getBuckets, onReplace } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseMiles: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
    setLoadingStatus,
  } = props;
  const router = useRouter();
  const [mileagesValue, setMileagesValue] = useState<string[]>(
    steps.mileages.value as string[],
  );

  const mileagesData = getSectionsData(
    ['productVehicleList', 'aggs', 'mileage'],
    productVehicleListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="How Many Miles Do You Normally Drive In A Year?"
      choicesValues={getBuckets(mileagesData, mileagesValue, 'mileages')}
      setChoice={setMileagesValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        getProductVehicleList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams, {
                ...steps,
                mileages: { active: false, value: mileagesValue },
              }),
            },
          },
        });
        setSteps({
          ...steps,
          mileages: { active: false, value: mileagesValue },
          availability: { active: true, value: steps.availability.value },
        });
        onReplace(router, {
          ...steps,
          mileages: { active: false, value: mileagesValue },
        });
      }}
      currentValue={mileagesValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseMiles;
