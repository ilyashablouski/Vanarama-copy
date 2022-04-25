import Select from 'core/atoms/select';
import Formgroup from 'core/molecules/formgroup';
import { useField } from 'formik';
import React from 'react';
import { genDays, genMonths, genYears } from '../../utils/helpers';

type Props = {
  label?: string;
  fieldNames: [string, string, string];
  className?: string;
};

const FormikDateField: React.FC<Props> = ({ label, fieldNames, className }) => {
  const [dayId, monthId, yearId] = fieldNames;

  const [dayField, dayMeta] = useField(dayId);
  const [monthField, monthMeta] = useField(monthId);
  const [yearField, yearMeta] = useField(yearId);

  const touched = dayMeta.touched && monthMeta.touched && yearMeta.touched;
  const error = dayMeta.error || monthMeta.error || yearMeta.error;
  return (
    <Formgroup
      label={label}
      error={(touched && error) || undefined}
      className={className}
    >
      <Select id={dayId} dataTestId={dayId} placeholder="Day" {...dayField}>
        {genDays().map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
      <Select
        id={monthId}
        dataTestId={monthId}
        placeholder="Month"
        {...monthField}
      >
        {genMonths().map((month, index) => (
          <option key={month} value={index + 1}>
            {month}
          </option>
        ))}
      </Select>
      <Select id={yearId} dataTestId={yearId} placeholder="Year" {...yearField}>
        {genYears(100).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </Formgroup>
  );
};

export default FormikDateField;
