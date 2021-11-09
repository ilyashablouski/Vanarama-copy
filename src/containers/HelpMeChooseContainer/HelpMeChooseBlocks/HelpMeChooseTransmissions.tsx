import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { getBuckets, setQuery } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseTransmissions: FC<HelpMeChooseStep> = props => {
  const { steps, helpMeChooseData, setLoadingStatus } = props;
  const router = useRouter();
  const [transmissionsValue, setTransmissionsValue] = useState<string[]>(
    steps.transmissions.value as string[],
  );

  const transmissionsData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'transmission'],
    helpMeChooseData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="Which Gearbox Do You Prefer?"
      choicesValues={getBuckets(transmissionsData, transmissionsValue)}
      setChoice={setTransmissionsValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const query = {
          transmissions: transmissionsValue,
        };
        setQuery(router, query);
      }}
      multiSelect
      currentValue={transmissionsValue}
      clearMultiSelectTitle="I Don't Mind"
    />
  );
};

export default HelpMeChooseTransmissions;
