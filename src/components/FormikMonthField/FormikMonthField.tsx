import Select from '@vanarama/uibook/lib/components/atoms/select';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { useField } from 'formik';
import React from 'react';
import { genMonths, genYears } from '../../utils/helpers';

interface IProps {
  monthName: string;
  yearName: string;
  label: string;
}

const FormikMonthField: React.FC<IProps> = ({ monthName, yearName, label }) => {
  const [monthField, monthMeta] = useField(monthName);
  const [yearField, yearMeta] = useField(yearName);
  const touched = monthMeta.touched && yearMeta.touched;
  const error = (touched && (monthMeta.error || yearMeta.error)) || undefined;
  return (
    <Formgroup error={error} controlId={monthName} label={label} inline>
      <Select
        id={monthName}
        name={monthName}
        dataTestId={monthName}
        placeholder="Month"
        {...monthField}
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
        {...yearField}
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

export default FormikMonthField;
