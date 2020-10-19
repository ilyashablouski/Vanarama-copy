import { Controller } from 'react-hook-form';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Select from '@vanarama/uibook/lib/components/atoms/select/';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import LockClosed from '@vanarama/uibook/lib/assets/icons/LockClosed';
import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import { IAddressSuggestion } from '@vanarama/uibook/lib/components/molecules/address-finder/interfaces';
import React, { FC, useState } from 'react';
import { genMonths, genYears, genDays } from '../../../utils/helpers';
import { IFormProps } from './interface';
import useDateOfBirthValidation from './useDateOfBirthValidation';

const EligibilityCheckerForm: FC<IFormProps> = ({
  submit,
  errors,
  handleSubmit,
  register,
  triggerValidation,
  watch,
  formState,
  control,
}) => {
  const [address, setAddress] = useState<IAddressSuggestion | undefined>(
    undefined,
  );

  const months = genMonths();
  const years = genYears(100);

  useDateOfBirthValidation(watch, triggerValidation);

  return (
    <Form onSubmit={handleSubmit(submit)} className="-mt-400">
      <FormGroup
        controlId="firstName"
        label="First Name"
        error={errors?.firstName?.message?.toString()}
      >
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          dataTestId="eligibilityCheckerFirstName"
          ref={register}
        />
      </FormGroup>
      <FormGroup
        controlId="lastName"
        label="Last Name"
        error={errors?.lastName?.message?.toString()}
      >
        <TextInput
          id="lastName"
          type="text"
          name="lastName"
          dataTestId="eligibilityCheckerLastName"
          ref={register}
        />
      </FormGroup>
      <Controller
        name="addressFinder"
        valueName="selected"
        onChangeName="onSuggestionChange"
        as={
          <AddressFinder
            apiKey={process.env.LOQATE_KEY!}
            onSuggestionChange={value => setAddress(value)}
            selected={address}
          >
            <FormGroup
              label="Your Postcode or Address"
              error={errors?.addressFinder?.message?.toString()}
              className="address-finder"
            >
              <AddressFinder.Input id="addressFinder" />
              <AddressFinder.Selected />
              <AddressFinder.Intermediate />
            </FormGroup>
            <AddressFinder.Results />
          </AddressFinder>
        }
        control={control}
      />
      <FormGroup
        controlId="dayOfBirth"
        label="Date of Birth"
        inline
        error={
          errors?.dayOfBirth?.message?.toString() ||
          errors?.monthOfBirth?.message?.toString() ||
          errors?.yearOfBirth?.message?.toString()
        }
      >
        <Select
          id="dayOfBirth"
          dataTestId="eligibilityCheckerSelectDOB"
          name="dayOfBirth"
          ref={register}
          placeholder="Day"
        >
          {genDays().map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="eligibilityCheckerSelectMOB"
          name="monthOfBirth"
          ref={register}
          placeholder="Month"
        >
          {months.map((value: any, i: number) => (
            <option key={value} value={i + 1}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="eligibilityCheckerSelectYOB"
          name="yearOfBirth"
          ref={register}
          placeholder="Year"
        >
          {years.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="email"
        label="Email"
        error={errors?.email?.message?.toString()}
      >
        <TextInput
          id="email"
          type="email"
          name="email"
          dataTestId="eligibilityCheckerEmail"
          ref={register}
        />
      </FormGroup>
      <FormGroup
        label="Please Confirm"
        error={errors?.promotions?.message?.toString()}
      >
        <CheckBox
          id="promotions"
          dataTestId="eligibilityCheckoutPromotions"
          name="promotions"
          label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
          ref={register}
        />
      </FormGroup>
      <FormGroup>
        <Text tag="p" color="darker" size="regular">
          By checking your eligibility, you agree to our{' '}
          <Link
            dataTestId="terms_and_conditions"
            href="https://www.motorama.com/terms-conditions"
            size="regular"
          >
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link
            dataTestId="privacy_policy"
            href="https://www.motorama.com/cookie-privacy-policy"
            size="regular"
          >
            Privacy Policy
          </Link>{' '}
          and a soft credit check.
        </Text>
      </FormGroup>
      <Button
        type="submit"
        label={formState.isSubmitting ? 'Saving...' : 'Check Your Eligibility'}
        color="primary"
        disabled={formState.isSubmitting}
        iconColor="white"
        iconPosition="after"
        dataTestId="eligibilityCheckerSubmit"
      />
      <Text tag="p" color="dark" size="small">
        <LockClosed /> Your credit score will not be affected.
      </Text>
    </Form>
  );
};
export default EligibilityCheckerForm;
