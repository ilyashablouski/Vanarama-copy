import Select from '@vanarama/uibook/lib/components/atoms/select';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { genMonths, genYears } from '../../utils/helpers';

interface IProps {
  error?: string;
  monthId: string;
  yearId: string;
  label: string;
}

/**
 * A helper component that encapsulates all of the boilerplate for putting a
 * month and year select field in a form with RHF
 */
const MonthField: React.FC<IProps> = ({ error, monthId, yearId, label }) => {
  const { register } = useFormContext();
  return (
    <Formgroup error={error} controlId={monthId} label={label} inline>
      <Select
        id={monthId}
        name={monthId}
        dataTestId={monthId}
        placeholder="Month"
        ref={register()}
      >
        {genMonths().map((month, i) => (
          <option key={month} value={i + 1}>
            {month}
          </option>
        ))}
      </Select>
      <Select
        id={yearId}
        name={yearId}
        dataTestId={yearId}
        placeholder="Year"
        ref={register()}
      >
        {genYears(100).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </Formgroup>
  );
};

export default MonthField;
