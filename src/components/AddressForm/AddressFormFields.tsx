import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { gql } from 'apollo-boost';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AddressFormFieldsDropDownData } from '../../../generated/AddressFormFieldsDropDownData';
import FCWithFragments from '../../utils/FCWithFragments';
import AddressFinderField from '../AddressFinderField/AddressFinderField';
import HistoryFieldArray from '../HistoryFieldArray/HistoryFieldArray';
import MonthField from '../MonthField/MonthField';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import SelectField from '../SelectField/SelectField';
import { IAddressFormValues } from './interfaces';

interface IProps {
  dropDownData: AddressFormFieldsDropDownData;
}

const AddressFormFields: FCWithFragments<IProps> = ({ dropDownData }) => {
  const { errors } = useFormContext();
  return (
    <HistoryFieldArray<IAddressFormValues>
      initialState={{ address: '', year: '', month: '', status: '' }}
      messageFormat="We need another %s months of address history."
      requiredMonths={36}
    >
      {(_, index) => (
        <Tile>
          <AddressFinderField
            id={`history[${index}].address`}
            error={errors.history?.[index]?.address?.message?.toString()}
            label="Your Postcode or Address"
          />
          <SelectField
            error={errors.history?.[index]?.status?.message?.toString()}
            id={`history[${index}].status`}
            label="Your Property Status"
          >
            <OptionsWithFavourites options={dropDownData.propertyStatuses} />
          </SelectField>
          <MonthField
            error={
              errors.history?.[index]?.month?.message?.toString() ||
              errors.history?.[index]?.year?.message?.toString()
            }
            label="Date Moved In"
            monthId={`history[${index}].month`}
            yearId={`history[${index}].year`}
          />
        </Tile>
      )}
    </HistoryFieldArray>
  );
};

AddressFormFields.fragments = {
  dropDownData: gql`
    fragment AddressFormFieldsDropDownData on DropDownType {
      __typename
      propertyStatuses {
        __typename
        data
        favourites
      }
    }
  `,
};

export default AddressFormFields;
