import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, getBuckets, onReplace } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseTerms: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductVehicleList,
    productVehicleListData,
  } = props;
  const router = useRouter();
  const [termsValue, setTermsValue] = useState<string[]>(
    steps.terms.value as string[],
  );

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const termsQuery = searchParams.getAll('terms');
      const termsQueryValue = termsQuery.length ? termsQuery[0].split(',') : [];
      const isTermsActive =
        searchParams.has('terms') && !searchParams.has('mileages');
      setSteps({
        ...steps,
        terms: {
          active: steps.terms.active || isTermsActive,
          value: termsQueryValue,
        },
      });
      setTermsValue(termsQueryValue);
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

  const termsData = getSectionsData(
    ['productVehicleList', 'aggs', 'term'],
    productVehicleListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="How Often Do You Want To Change Your Vehicle?"
      choicesValues={getBuckets(termsData, termsValue, 'terms')}
      setChoice={setTermsValue}
      onClickContinue={() => {
        setSteps({
          ...steps,
          terms: { active: false, value: termsValue },
          mileages: { active: true, value: steps.mileages.value },
        });
        onReplace(router, {
          ...steps,
          terms: { active: false, value: termsValue },
        });
      }}
      currentValue={termsValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseTerms;
