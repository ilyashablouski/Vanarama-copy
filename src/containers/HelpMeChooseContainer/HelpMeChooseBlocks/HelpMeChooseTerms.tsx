import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { getBuckets, setQuery } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseTerms: FC<HelpMeChooseStep> = props => {
  const { steps, helpMeChooseData, setLoadingStatus, dataUiTestId } = props;
  const router = useRouter();
  const [termsValue, setTermsValue] = useState<string[]>(
    steps.terms.value as string[],
  );

  const termsData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'term'],
    helpMeChooseData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="How Often Do You Want To Change Your Vehicle?"
      choicesValues={getBuckets(
        termsData
          .slice()
          .sort((a: any, b: any) => (+a.key || 0) - (+b.key || 0)),
        termsValue,
        'terms',
      )}
      setChoice={setTermsValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const query = {
          terms: termsValue,
        };
        setQuery(router, query);
      }}
      currentValue={termsValue}
      clearMultiSelectTitle="I Don't Mind"
      dataUiTestId={dataUiTestId}
    />
  );
};

export default HelpMeChooseTerms;
