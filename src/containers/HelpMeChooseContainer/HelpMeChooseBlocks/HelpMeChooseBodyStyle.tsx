import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { getBuckets, setQuery } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseBodyStyle: FC<HelpMeChooseStep> = props => {
  const { steps, helpMeChooseData, setLoadingStatus, dataUiTestId } = props;
  const router = useRouter();
  const [bodyStylesValue, setBodyStylesValue] = useState<string[]>(
    steps.bodyStyles.value as string[],
  );

  const bodyStyleData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'lqBodyStyle'],
    helpMeChooseData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="What Type Of Vehicle Suits You Best?"
      choicesValues={getBuckets(bodyStyleData, bodyStylesValue)}
      setChoice={setBodyStylesValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const query = {
          bodyStyles: bodyStylesValue,
        };
        setQuery(router, query);
      }}
      multiSelect
      withIcons
      currentValue={bodyStylesValue}
      clearMultiSelectTitle="I Don't Mind"
      dataUiTestId={dataUiTestId}
    />
  );
};

export default HelpMeChooseBodyStyle;
