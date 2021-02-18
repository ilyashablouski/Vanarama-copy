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

  const getNextSteps = (searchParams: URLSearchParams) => {
    const nextSteps = {
      step: {
        ...steps,
        mileages: { active: false, value: mileagesValue },
        availability: { active: true, value: steps.availability.value },
      },
      query:{
        ...steps,
        mileages: { active: false, value: mileagesValue },
        availability: {
          active: true,
          value: initialSteps.availability.value,
        },
        rental: {
          active: false,
          value: initialSteps.rental.value,
        },
        initialPeriods: {
          active: false,
          value: initialSteps.initialPeriods.value,
        },
      }
    };
    if (searchParams.getAll('mileages')[0] !== mileagesValue[0]) {
      nextSteps.step = nextSteps.query;
    }
    return nextSteps;
  };

  return (
    <HelpMeChooseContainer
      title="How Many Miles Do You Normally Drive In A Year?"
      choicesValues={getBuckets(mileagesData, mileagesValue, 'mileages')}
      setChoice={setMileagesValue}
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
      currentValue={mileagesValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseMiles;
