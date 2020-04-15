import Select from '@vanarama/uibook/lib/components/atoms/select';
import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import { gql } from 'apollo-boost';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { AddressSubFormDropDownData } from '../../../generated/AddressSubFormDropDownData';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears } from '../../utils/helpers';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { IAddressFormValues as IFormValues } from './interfaces';

interface IAddressSubFormProps {
  dropDownData: AddressSubFormDropDownData;
  index: number;
}

const AddressSubForm: FCWithFragments<IAddressSubFormProps> = ({
  dropDownData,
  index,
}) => {
  const {
    control,
    errors,
    register,
    formState,
    triggerValidation,
    watch,
  } = useFormContext<IFormValues>();

  const touched = formState.touched.history?.[index];
  const watched = watch({ nest: true }).history?.[index];

  // Everytime the month or year is touched, revalidate the other field
  useDeepCompareEffect(() => {
    if (touched?.month && watched?.year) {
      triggerValidation(`history[${index}].month`);
    }

    if (touched?.year && watched?.month) {
      triggerValidation(`history[${index}].year`);
    }
  }, [index, touched, triggerValidation, watched]);

  return (
    <Tile>
      <Formgroup
        error={errors.history?.[index]?.address?.message}
        controlId={`history[${index}].address`}
        label="Your Postcode or Address"
      >
        <Controller
          id={`history[${index}].address`}
          name={`history[${index}].address`}
          as={AddressFinder}
          control={control}
          dataTestId={`address-history.[${index}]-address-field`}
          loqateApiKey={process.env.LOQATE_KEY!}
          onChange={([suggestion]) => suggestion?.id || ''}
        />
      </Formgroup>
      <Formgroup
        error={errors.history?.[index]?.status?.message}
        controlId={`history[${index}].status`}
        label="Your Property Status"
      >
        <Select
          id={`history[${index}].status`}
          name={`history[${index}].status`}
          dataTestId={`address-history.[${index}]-status-field`}
          ref={register}
        >
          <OptionsWithFavourites options={dropDownData.propertyStatuses} />
        </Select>
      </Formgroup>
      <Formgroup
        error={
          errors.history?.[index]?.month?.message ||
          errors.history?.[index]?.year?.message
        }
        controlId={`history[${index}].month`}
        label="Date Moved In"
        inline
      >
        <Select
          id={`history[${index}].month`}
          name={`history[${index}].month`}
          dataTestId={`address-history.[${index}]-month-field`}
          placeholder="Month"
          ref={register}
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
          dataTestId={`address-history.[${index}]-year-field`}
          placeholder="Year"
          ref={register}
        >
          {genYears(100).map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Formgroup>
    </Tile>
  );
};

AddressSubForm.fragments = {
  dropDownData: gql`
    fragment AddressSubFormDropDownData on DropDownType {
      __typename
      propertyStatuses {
        __typename
        data
        favourites
      }
    }
  `,
};

export default AddressSubForm;
