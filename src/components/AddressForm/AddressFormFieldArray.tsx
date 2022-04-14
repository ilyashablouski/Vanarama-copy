import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
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
import Skeleton from '../Skeleton';

const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  arrayHelpers: FieldArrayRenderProps;
  dropDownData: AddressFormFieldArrayDownData;
  idPrefix?: string;
  requiredMonths?: number;
  values: IAddressFormValues;
}

const AddressFormFieldArray: FCWithFragments<IProps> = ({
  arrayHelpers,
  dropDownData,
  idPrefix,
  requiredMonths = 36,
  values,
}) => {
  const { remainingMonths } = useHistory(values.history, requiredMonths, {
    onAppend: () => {
      arrayHelpers.push(EMPTY_ADDRESS_ENTRY);
    },
    onRemove: arrayHelpers.remove,
    onSwap: arrayHelpers.swap,
  });

  return (
    <>
      {values.history.map((_, index) => {
        const nameGenerator = createNameGenerator(index, idPrefix);
        return (
          <RemainingMonthsMessage
            key={index} // eslint-disable-line react/no-array-index-key
            entries={values.history}
            formatString="We need another %s of address history."
            index={index}
            remainingMonths={remainingMonths}
          >
            <Tile>
              <Heading color="dark" size="small">
                {index === 0 ? 'Current' : 'Past'} Address
              </Heading>
              <FormikAddressField
                name={nameGenerator('address')}
                label="Start typing your address"
              />
              <FormikSelectField
                name={nameGenerator('status')}
                label="Your Property Status"
              >
                <OptionsWithFavourites
                  options={dropDownData.propertyStatuses}
                />
              </FormikSelectField>
              <FormikMonthField
                label="Date Moved In"
                monthName={nameGenerator('month')}
                yearName={nameGenerator('year')}
              />
            </Tile>
          </RemainingMonthsMessage>
        );
      })}
    </>
  );
};

function createNameGenerator(index: number, prefix: string = '') {
  return (field: string) => `${prefix}history[${index}].${field}`;
}

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
