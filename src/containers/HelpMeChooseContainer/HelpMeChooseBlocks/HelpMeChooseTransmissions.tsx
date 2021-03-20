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

const HelpMeChooseTransmissions: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getHelpMeChoose,
    helpMeChooseData,
    setLoadingStatus,
  } = props;
  const router = useRouter();
  const [transmissionsValue, setTransmissionsValue] = useState<string[]>(
    steps.transmissions.value as string[],
  );

  const transmissionsData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'transmission'],
    helpMeChooseData?.data,
  );

  const getNextSteps = (searchParams: URLSearchParams) => {
    const nextSteps = {
      step: {
        ...steps,
        transmissions: {
          active: false,
          value: transmissionsValue,
          title: steps.transmissions.title,
        },
        terms: {
          active: true,
          value: steps.terms.value,
          title: steps.terms.title,
        },
      },
      query: {
        ...initialSteps,
        bodyStyles: {
          active: false,
          value: steps.bodyStyles.value as any,
          title: steps.bodyStyles.title,
        },
        financeTypes: {
          active: false,
          value: steps.financeTypes.value as any,
          title: steps.financeTypes.title,
        },
        fuelTypes: {
          active: false,
          value: steps.fuelTypes.value,
          title: steps.fuelTypes.title,
        },
        transmissions: {
          active: false,
          value: transmissionsValue,
          title: steps.transmissions.title,
        },
        terms: {
          active: true,
          value: initialSteps.terms.value,
          title: steps.terms.title,
        },
      },
      isEdit: null as string | null,
    };
    const searchParamsValue = searchParams
      .getAll('transmissions')[0]
      ?.split(',')
      .slice()
      .sort();
    const array2Sorted = transmissionsValue.slice().sort();
    if (
      !(
        searchParamsValue?.length === transmissionsValue.length &&
        searchParamsValue?.every((value, index) => {
          return value === array2Sorted[index];
        })
      )
    ) {
      nextSteps.step = nextSteps.query;
    } else {
      nextSteps.isEdit = searchParams.get('isEdit');
    }
    return nextSteps;
  };

  return (
    <HelpMeChooseContainer
      title="Which Gearbox Do You Prefer?"
      choicesValues={getBuckets(transmissionsData, transmissionsValue)}
      setChoice={setTransmissionsValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const searchParams = new URLSearchParams(window.location.search);
        const nextSteps = getNextSteps(searchParams);
        getHelpMeChoose({
          variables: {
            ...buildAnObjectFromAQuery(searchParams, nextSteps.query),
          },
        });
        setSteps(nextSteps.step);
        onReplace(router, nextSteps.step, '', nextSteps.isEdit);
      }}
      multiSelect
      currentValue={transmissionsValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseTransmissions;
