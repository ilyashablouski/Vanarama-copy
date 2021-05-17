import React, { useEffect } from 'react';
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

const ManualAddressForm: React.FC<IManualAddressFormProps> = () => {
  const {
    value,
    showManualForm,
    onManualSubmit,
    onBackToSearch,
  } = useAddressFinderContext();
  const { formState, handleSubmit, errors, register, reset } = useForm<
    IManualAddressFormValues
  >({
    defaultValues: value,
    mode: 'onBlur',
  });

  useEffect(() => reset(value), [value]);

  if (!showManualForm) {
    return null;
  }

  return (
    <>
      <Formgroup
        controlId="lineOne"
        label="Address Line 1"
        error={errors.lineOne?.message?.toString()}
      >
        <TextInput
          id="lineOne"
          name="lineOne"
          dataTestId="manual_address_form-line_one"
          ref={register({
            required: 'Please enter your Address Line 1',
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="lineTwo"
        label="Address Line 2 (Optional)"
        error={errors.lineTwo?.message?.toString()}
      >
        <TextInput
          id="lineTwo"
          name="lineTwo"
          dataTestId="manual_address_form-line_two"
          ref={register}
        />
      </Formgroup>
      <Formgroup
        controlId="city"
        label="Town Or City"
        error={errors.city?.message?.toString()}
      >
        <TextInput
          id="city"
          name="city"
          dataTestId="manual_address_form-city"
          ref={register({
            required: 'Please enter your Town Or City',
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="county"
        label="County (Optional)"
        error={errors.county?.message?.toString()}
      >
        <TextInput
          id="county"
          name="county"
          dataTestId="county"
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
