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

  const getNextSteps = (searchParams: URLSearchParams) => {
    const nextSteps = {
      step: {
        ...steps,
        bodyStyles: {
          active: false,
          value: bodyStylesValue as any,
        },
        fuelTypes: { active: true, value: steps.fuelTypes.value },
      },
      query: {
        ...initialSteps,
        bodyStyles: {
          active: false,
          value: bodyStylesValue as any,
        },
        financeTypes: {
          active: false,
          value: steps.financeTypes.value as any,
        },
        fuelTypes: { active: true, value: initialSteps.fuelTypes.value },
      }
    };
    const searchParamsValue = searchParams
      .getAll('bodyStyles')[0]
      ?.split(',')
      .slice()
      .sort();
    const array2Sorted = bodyStylesValue?.slice().sort();
    if (
      searchParamsValue?.length === bodyStylesValue?.length &&
      searchParamsValue?.every((value, index) => {
        return value !== array2Sorted[index];
      })
    ) {
      nextSteps.step = nextSteps.query;
    }
    return nextSteps;
  };

  return (
    <HelpMeChooseContainer
      title="What Type Of Vehicle Suits You Best?"
      choicesValues={getBuckets(bodyStyleData, bodyStylesValue)}
      setChoice={setBodyStylesValue}
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
      multiSelect
      withIcons
      currentValue={bodyStylesValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseBodyStyle;
