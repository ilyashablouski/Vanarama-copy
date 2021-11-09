import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import {
  buildAnObjectFromAQuery,
  getBuckets,
  initialSteps,
  setQuery,
} from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseMiles: FC<HelpMeChooseStep> = props => {
  const { steps, getHelpMeChoose, helpMeChooseData, setLoadingStatus } = props;
  const router = useRouter();
  const [mileagesValue, setMileagesValue] = useState<string[]>(
    steps.mileages.value as string[],
  );

  const mileagesData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'mileage'],
    helpMeChooseData?.data,
  );

  const getNextSteps = (searchParams: URLSearchParams) => {
    const nextSteps = {
      step: {
        ...steps,
        mileages: {
          active: false,
          value: mileagesValue,
          title: steps.mileages.title,
        },
        availability: {
          active: true,
          value: steps.availability.value,
          title: steps.availability.title,
        },
      },
      query: {
        ...steps,
        mileages: {
          active: false,
          value: mileagesValue,
          title: steps.mileages.title,
        },
        availability: {
          active: true,
          value: initialSteps.availability.value,
          title: steps.availability.title,
        },
        rental: {
          active: false,
          value: initialSteps.rental.value,
          title: steps.rental.title,
        },
        initialPeriods: {
          active: false,
          value: initialSteps.initialPeriods.value,
          title: steps.initialPeriods.title,
        },
      },
      isEdit: null as string | null,
    };
    if (searchParams.getAll('mileages')[0] !== mileagesValue[0]) {
      nextSteps.step = nextSteps.query;
    } else {
      nextSteps.isEdit = searchParams.get('isEdit');
    }
    return nextSteps;
  };

  const choicesValues = getBuckets(
    mileagesData,
    mileagesValue,
    'mileages',
  ).sort((a, b) => (+a.value || 0) - (+b.value || 0));

  return (
    <HelpMeChooseContainer
      title="How Many Miles Do You Normally Drive In A Year?"
      choicesValues={choicesValues}
      setChoice={setMileagesValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        const nextSteps = getNextSteps(searchParams);
        getHelpMeChoose({
          variables: {
            ...buildAnObjectFromAQuery(searchParams, nextSteps.query),
          },
        });
        const query = {
          mileages: mileagesValue,
        };
        setQuery(router, query);
      }}
      currentValue={mileagesValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseMiles;
