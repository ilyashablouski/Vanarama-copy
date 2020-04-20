import Select from '@vanarama/uibook/lib/components/atoms/select';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { EmploymentSubFormDropDownData } from '../../../generated/EmploymentSubFormDropDownData';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  dropDownData: EmploymentSubFormDropDownData;
  index: number;
}

const EmploymentStatusInput: React.FC<IProps> = ({ dropDownData, index }) => {
  const { errors, register } = useFormContext<IEmploymentFormValues>();
  const error = errors.history?.[index]?.status?.message?.toString();
  const name = `history[${index}].status`;

  return (
    <Formgroup
      error={error}
      controlId={name}
      label={
        index === 0
          ? 'Your Current Employment Status'
          : 'Your Previous Employment Status'
      }
    >
      <Select id={name} name={name} dataTestId={name} ref={register()}>
        <OptionsWithFavourites options={dropDownData.employmentStatuses} />
      </Select>
    </Formgroup>
  );
};

export default EmploymentStatusInput;
