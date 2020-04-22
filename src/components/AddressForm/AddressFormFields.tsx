import Select from '@vanarama/uibook/lib/components/atoms/select';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { gql } from 'apollo-boost';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AddressFormFieldsDropDownData } from '../../../generated/AddressFormFieldsDropDownData';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears } from '../../utils/helpers';
import AddressField from '../AddressField/AddressField';
import HistoryFieldArray from '../HistoryFieldArray/HistoryFieldArray';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { IAddressFormValues } from './interfaces';

interface IProps {
  dropDownData: AddressFormFieldsDropDownData;
}

const AddressFormFields: FCWithFragments<IProps> = ({ dropDownData }) => {
  const { errors, register } = useFormContext();
  return (
    <HistoryFieldArray<IAddressFormValues>
      initialState={{ address: undefined, year: '', month: '', status: '' }}
      messageFormat="We need another %s of address history."
      requiredMonths={36}
    >
      {(_, index) => (
        <Tile>
          <AddressField
            error={errors.history?.[index]?.address?.message?.toString()}
            label="Your Postcode or Address"
            name={`history[${index}].address`}
          />
          <Formgroup
            error={errors.history?.[index]?.status?.message?.toString()}
            controlId={`history[${index}].status`}
            label="Your Property Status"
          >
            <Select
              id={`history[${index}].status`}
              name={`history[${index}].status`}
              dataTestId={`history[${index}].status`}
              ref={register()}
            >
              <OptionsWithFavourites options={dropDownData.propertyStatuses} />
            </Select>
          </Formgroup>
          <Formgroup
            error={
              errors.history?.[index]?.month?.message?.toString() ||
              errors.history?.[index]?.year?.message?.toString()
            }
            controlId={`history[${index}].month`}
            label="Date Moved In"
            inline
          >
            <Select
              id={`history[${index}].month`}
              name={`history[${index}].month`}
              dataTestId={`history[${index}].month`}
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
              id={`history[${index}].year`}
              name={`history[${index}].year`}
              dataTestId={`history[${index}].year`}
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
