import React from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { THistoryEntry, toYearsAndMonthsDisplay } from '../../utils/dates';

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
