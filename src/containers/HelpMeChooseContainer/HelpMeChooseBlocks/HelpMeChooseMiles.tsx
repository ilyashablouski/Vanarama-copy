import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { getBuckets, setQuery } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseMiles: FC<HelpMeChooseStep> = props => {
  const { steps, helpMeChooseData, setLoadingStatus } = props;
  const router = useRouter();
  const [mileagesValue, setMileagesValue] = useState<string[]>(
    steps.mileages.value as string[],
  );

  const mileagesData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'mileage'],
    helpMeChooseData?.data,
  );

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
