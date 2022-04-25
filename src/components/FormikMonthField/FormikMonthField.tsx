import Select from 'core/atoms/select';
import Formgroup from 'core/molecules/formgroup';
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
    <Formgroup
      error={error}
      controlId={monthName}
      label={label}
      className="-inline-preserved"
    >
      <Select
        id={monthName}
        dataTestId={monthName}
        placeholder="Month"
        {...monthField}
      >
        {genMonths().map((month, index) => (
          <option key={month} value={index + 1}>
            {month}
          </option>
        ))}
      </Select>
      <Select
        id={yearName}
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
