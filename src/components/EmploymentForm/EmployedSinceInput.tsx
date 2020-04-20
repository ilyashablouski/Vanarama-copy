import Select from '@vanarama/uibook/lib/components/atoms/select';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { genMonths, genYears } from '../../utils/helpers';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  index: number;
}

const EmployedSinceInput: React.FC<IProps> = ({ index }) => {
  const { errors, register } = useFormContext<IEmploymentFormValues>();
  const error =
    errors.history?.[index]?.month?.message?.toString() ||
    errors.history?.[index]?.year?.message?.toString();

  const monthName = `history[${index}].month`;
  const yearName = `history[${index}].year`;
  return (
    <Formgroup error={error} controlId={monthName} label="Since" inline>
      <Select
        id={monthName}
        name={monthName}
        dataTestId={monthName}
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
        id={yearName}
        name={yearName}
        dataTestId={yearName}
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

export default EmployedSinceInput;
