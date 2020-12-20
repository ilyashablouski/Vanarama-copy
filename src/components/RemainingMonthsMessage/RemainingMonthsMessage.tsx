import React from 'react';
import dynamic from 'next/dynamic';
import { THistoryEntry, toYearsAndMonthsDisplay } from '../../utils/dates';
import Skeleton from '../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  entries: THistoryEntry[];
  formatString: string;
  index: number;
  remainingMonths: number;
}

const RemainingMonthsMessage: React.FC<IProps> = ({
  children,
  entries,
  formatString,
  index,
  remainingMonths,
}) => {
  const isLastEntry = index === entries.length - 1;
  const hasMultipleEntries = entries.length > 1;
  const showMessage = isLastEntry && hasMultipleEntries && remainingMonths > 0;

  return (
    <>
      {showMessage && (
        <Text tag="span" size="regular" color="darker">
          {formatString.replace('%s', toYearsAndMonthsDisplay(remainingMonths))}
        </Text>
      )}
      {children}
    </>
  );
};

export default RemainingMonthsMessage;
