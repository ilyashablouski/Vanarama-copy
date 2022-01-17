import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import HelpMeChooseContainer from '../HelpMeChooseContainer';
import { setQuery } from '../helpers';
import { HelpMeChooseStep } from './HelpMeChooseAboutYou';

const HelpMeChooseAvailability: FC<HelpMeChooseStep> = props => {
  const { steps, setLoadingStatus, dataUiTestId } = props;
  const router = useRouter();
  const [availabilityValue, setAvailabilityValue] = useState<string[]>(
    (steps.availability.value as string[]) || [''],
  );

  const availabilityTypes = [
    {
      label: 'ASAP',
      value: '14',
      active: availabilityValue.includes('14'),
    },
    {
      label: 'Within A Month',
      value: '21',
      active: availabilityValue.includes('21'),
    },
    {
      label: 'Within A Few Months',
      value: '28',
      active: availabilityValue.includes('28'),
    },
    {
      label: 'I Am Happy To Wait For The Right Vehicle',
      value: '',
      active: availabilityValue.includes(''),
    },
  ];

  return (
    <HelpMeChooseContainer
      title="How quickly do you need the vehicle?"
      choicesValues={availabilityTypes}
      setChoice={setAvailabilityValue}
      onClickContinue={async () => {
        setLoadingStatus(true);
        const query = {
          availability: availabilityValue,
          rental: '350',
          initialPeriods: '6',
        };
        setQuery(router, query);
      }}
      currentValue={availabilityValue}
      submitBtnText="View Results"
      dataUiTestId={dataUiTestId}
    />
  );
};

export default HelpMeChooseAvailability;
