import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { gql } from 'apollo-boost';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { EmploymentFormFieldsDropDownData } from '../../../generated/EmploymentFormFieldsDropDownData';
import FCWithFragments from '../../utils/FCWithFragments';
import HistoryFieldArray from '../HistoryFieldArray/HistoryFieldArray';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import SelectField from '../SelectField/SelectField';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  dropDownData: EmploymentFormFieldsDropDownData;
}

const EmploymentFormFields: FCWithFragments<IProps> = ({ dropDownData }) => {
  const { errors } = useFormContext();
  return (
    <HistoryFieldArray<IEmploymentFormValues>
      initialState={{ status: '', month: '', year: '' }}
      messageFormat="We need another %s months of employment history."
      requiredMonths={36}
    >
      {(_, index) => (
        <Tile>
          <SelectField
            error={errors.history?.[index]?.status?.message}
            id={`history[${index}].status`}
            label="Your Current Employment Status"
          >
            <OptionsWithFavourites options={dropDownData.employmentStatuses} />
          </SelectField>
        </Tile>
      )}
    </HistoryFieldArray>
  );
};

EmploymentFormFields.fragments = {
  dropDownData: gql`
    fragment EmploymentFormFieldsDropDownData on DropDownType {
      __typename
      employmentStatuses {
        __typename
        data
        favourites
      }
    }
  `,
};

export default EmploymentFormFields;
