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

const HelpMeChooseTerms: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
    setLoadingStatus,
  } = props;
  const router = useRouter();
  const [termsValue, setTermsValue] = useState<string[]>(
    steps.terms.value as string[],
  );

  const termsData = getSectionsData(
    ['productVehicleList', 'aggs', 'term'],
    productVehicleListData?.data,
  );

  const getNextSteps = (searchParams: URLSearchParams) => {
    let nextSteps = {
      ...steps,
      terms: { active: false, value: termsValue },
      mileages: { active: true, value: steps.mileages.value },
    };
    if (searchParams.getAll('terms')[0] !== termsValue[0]) {
      nextSteps = {
        ...steps,
        terms: { active: false, value: termsValue },
        mileages: { active: true, value: initialSteps.mileages.value },
        availability: {
          active: false,
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
      };
    }
    return nextSteps;
  };

  return (
    <HelpMeChooseContainer
      title="How Often Do You Want To Change Your Vehicle?"
      choicesValues={getBuckets(termsData, termsValue, 'terms')}
      setChoice={setTermsValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        const nextSteps = getNextSteps(searchParams);
        getProductVehicleList({
          variables: {
            filter: {
              ...buildAnObjectFromAQuery(searchParams, nextSteps),
            },
          },
        });
        setSteps(nextSteps);
        onReplace(router, nextSteps);
      }}
      currentValue={termsValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseTerms;
