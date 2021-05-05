import React from 'react';
import { useForm } from 'react-hook-form';
import { useAddressFinderContext } from 'core/molecules/address-finder/context';

import TextInput from 'core/atoms/textinput';
import Button from 'core/atoms/button';
import Formgroup from 'core/molecules/formgroup';
import Icon from 'core/atoms/icon';
import ChevronBack from 'core/assets/icons/ChevronBack';

import {
  IManualAddressFormProps,
  IManualAddressFormValues,
} from '../interfaces';
import RouterLink from '../../../../components/RouterLink/RouterLink';

const ManualAddressForm: React.FC<IManualAddressFormProps> = ({
  defaultValues,
}) => {
  const {
    showManualForm,
    onManualSubmit,
    onBackToSearch,
  } = useAddressFinderContext();
  const { formState, handleSubmit, errors, register } = useForm<
    IManualAddressFormValues
  >({
    defaultValues,
    mode: 'onBlur',
  });

  if (!showManualForm) {
    return null;
  }

  return (
    <>
      <Formgroup
        controlId="addressLine1"
        label="Address Line 1"
        error={errors.addressLine1?.message?.toString()}
      >
        <TextInput
          id="addressLine1"
          name="addressLine1"
          dataTestId="manual_address_form-address_line_1"
          ref={register({
            required: 'Please enter your Address Line 1',
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="addressLine2"
        label="Address Line 2 (Optional)"
        error={errors.addressLine2?.message?.toString()}
      >
        <TextInput
          id="addressLine2"
          name="addressLine2"
          dataTestId="manual_address_form-address_line_2"
          ref={register}
        />
      </Formgroup>
      <Formgroup
        controlId="townOrCity"
        label="Town Or City"
        error={errors.townOrCity?.message?.toString()}
      >
        <TextInput
          id="townOrCity"
          name="townOrCity"
          dataTestId="manual_address_form-town_or_city"
          ref={register({
            required: 'Please enter your Town Or City',
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="country"
        label="Country (Optional)"
        error={errors.country?.message?.toString()}
      >
        <TextInput
          id="country"
          name="country"
          dataTestId="country"
          ref={register}
        />
      </Formgroup>
      <Formgroup
        controlId="postcode"
        label="Postcode"
        error={errors.postcode?.message?.toString()}
      >
        <TextInput
          id="postcode"
          name="postcode"
          dataTestId="manual_address_form-postcode"
          ref={register({
            required: 'Please enter your Postcode',
          })}
        />
      </Formgroup>
      <Button
        className="-mt-400 -fullwidth"
        color="teal"
        disabled={formState.isSubmitting}
        fill="outline"
        label="Add Address"
        size="lead"
        type="submit"
        onClick={handleSubmit(onManualSubmit)}
      />
      <div className="-justify-content-row -mt-400">
        <RouterLink
          classNames={{ color: 'teal', size: 'small' }}
          link={{ label: '', href: '' }}
          onClick={onBackToSearch}
        >
          <Icon icon={<ChevronBack />} color="teal" />
          Back To Search
        </RouterLink>
      </div>
    </>
  );
};

export default ManualAddressForm;
