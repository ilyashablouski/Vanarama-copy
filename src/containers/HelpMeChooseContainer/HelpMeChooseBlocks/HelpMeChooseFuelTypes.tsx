import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { getBuckets, setQuery } from '../helpers';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseFuelTypes: FC<HelpMeChooseStep> = props => {
  const { steps, helpMeChooseData, setLoadingStatus, dataUiTestId } = props;
  const router = useRouter();
  const [fuelTypesValue, setFuelTypesValue] = useState<string[]>(
    steps.fuelTypes.value as string[],
  );

  const fuelTypesData = getSectionsData(
    ['helpMeChoose', 'aggregation', 'fuelType'],
    helpMeChooseData?.data,
  );

  return (
    <HelpMeChooseContainer
      title="Which Fuel Type Do You Prefer?"
      choicesValues={getBuckets(fuelTypesData, fuelTypesValue)}
      setChoice={setFuelTypesValue}
      onClickContinue={() => {
        setLoadingStatus(true);
        const query = {
          fuelTypes: fuelTypesValue,
        };
        setQuery(router, query);
      }}
      multiSelect
      currentValue={fuelTypesValue}
      clearMultiSelectTitle="I Don't Mind"
      dataUiTestId={dataUiTestId}
    />
  );
};

export default HelpMeChooseFuelTypes;
