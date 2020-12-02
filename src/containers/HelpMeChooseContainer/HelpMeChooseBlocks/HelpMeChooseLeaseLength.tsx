import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { buildAnObjectFromAQuery, getBuckets, onReplace } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseLeaseLength: FC<HelpMeChooseStep> = props => {
  const {
    setSteps,
    steps,
    getProductsFilterList,
    productsFilterListData,
  } = props;
  const router = useRouter();
  const [leaseLengthValue, setLeaseLengthValue] = useState<string[]>(
    steps.leaseLength.value as string[],
  );

  useEffect(() => {
    if (window?.location.search.length) {
      const searchParams = new URLSearchParams(window.location.search);
      const leaseLengthQuery = searchParams.getAll('leaseLength');
      const leaseLengthQueryValue = leaseLengthQuery.length
        ? leaseLengthQuery[0].split(',')
        : [];
      const isLeaseLengthActive = searchParams.has('leaseLength');
      setSteps({
        ...steps,
        leaseLength: {
          active: steps.leaseLength.active || isLeaseLengthActive,
          value: leaseLengthQueryValue,
        },
      });
      setLeaseLengthValue(leaseLengthQueryValue);
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

  const leaseLengthData = getSectionsData(
    ['productsFilterList', 'terms', 'buckets'],
    productsFilterListData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="Which Gearbox Do You Prefer?"
      choicesValues={getBuckets(leaseLengthData, leaseLengthValue, 'terms')}
      setChoice={setLeaseLengthValue}
      onClickContinue={() => {
        setSteps({
          ...steps,
          transmissions: { active: false, value: steps.transmissions.value },
          leaseLength: { active: true, value: leaseLengthValue },
        });
        onReplace(router, {
          ...steps,
          leaseLength: { active: true, value: leaseLengthValue },
        });
      }}
      multiSelect
      currentValue={leaseLengthValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseLeaseLength;
