import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { gql } from 'apollo-boost';
import { FieldArrayRenderProps } from 'formik';
import React from 'react';
import { AddressFormFieldArrayDownData } from '../../../generated/AddressFormFieldArrayDownData';
import useHistory from '../../hooks/useHistory';
import FCWithFragments from '../../utils/FCWithFragments';
import FormikAddressField from '../FormikAddressField/FormikAddressField';
import FormikMonthField from '../FormikMonthField/FormikMonthField';
import FormikSelectField from '../FormikSelectField/FormikSelectField';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import RemainingMonthsMessage from '../RemainingMonthsMessage/RemainingMonthsMessage';
import { EMPTY_ADDRESS_ENTRY, IAddressFormValues } from './interfaces';

interface IProps {
  arrayHelpers: FieldArrayRenderProps;
  dropDownData: AddressFormFieldArrayDownData;
  values: IAddressFormValues;
}

const AddressFormFieldArray: FCWithFragments<IProps> = ({
  arrayHelpers,
  dropDownData,
  values,
}) => {
  const { remainingMonths } = useHistory(values.history, 36, {
    onAppend: () => {
      arrayHelpers.push(EMPTY_ADDRESS_ENTRY);
    },
    onRemove: arrayHelpers.remove,
    onSwap: arrayHelpers.swap,
  });

  return (
    <>
      {values.history.map((_, index) => (
        <RemainingMonthsMessage
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          entries={values.history}
          formatString="We need another %s of address history."
          index={index}
          remainingMonths={remainingMonths}
        >
          <Tile>
            <FormikAddressField
              name={`history[${index}].address`}
              label="Your Postcode or Address"
            />
            <FormikSelectField
              name={`history[${index}].status`}
              label="Your Property Status"
            >
              <OptionsWithFavourites options={dropDownData.propertyStatuses} />
            </FormikSelectField>
            <FormikMonthField
              label="Date Moved In"
              monthName={`history[${index}].month`}
              yearName={`history[${index}].year`}
            />
          </Tile>
        </RemainingMonthsMessage>
      ))}
    </>
  );
};

AddressFormFieldArray.fragments = {
  dropDownData: gql`
    fragment AddressFormFieldArrayDownData on DropDownType {
      __typename
      propertyStatuses {
        __typename
        data
        favourites
      }
    }
  `,
};

export default AddressFormFieldArray;
