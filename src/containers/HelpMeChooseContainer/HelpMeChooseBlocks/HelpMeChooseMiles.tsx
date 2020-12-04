import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, getBuckets, onReplace } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseMiles: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductsFilterList,
    productsFilterListData,
  } = props;
  const router = useRouter();
  const [mileagesValue, setMileagesValue] = useState<string[]>(
    steps.mileages.value as string[],
  );

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const mileagesQuery = searchParams.getAll('mileages');
      const mileagesQueryValue = mileagesQuery.length
        ? mileagesQuery[0].split(',')
        : [];
      const isMileagesActive =
        searchParams.has('mileages') && !searchParams.has('availability');
      setSteps({
        ...steps,
        mileages: {
          active: steps.mileages.active || isMileagesActive,
          value: mileagesQueryValue,
        },
      });
      setMileagesValue(mileagesQueryValue);
      getProductsFilterList({
        variables: {
          filter: {
            ...buildAnObjectFromAQuery(searchParams),
            vehicleTypes: [VehicleTypeEnum.CAR],
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mileagesData = getSectionsData(
    ['productsFilterList', 'mileages', 'buckets'],
    productsFilterListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="How Many Miles Do You Normally Drive In A Year?"
      choicesValues={getBuckets(mileagesData, mileagesValue, 'mileages')}
      setChoice={setMileagesValue}
      onClickContinue={() => {
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
