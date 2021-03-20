import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';
import Select from 'core/atoms/select/';
import TextInput from 'core/atoms/textinput/';
import AddressFinder from 'core/molecules/address-finder';
import { IAddressSuggestion } from 'core/molecules/address-finder/interfaces';
import React, { FC, useState } from 'react';
import { genMonths, genYears, genDays } from '../../../utils/helpers';
import { IFormProps } from './interface';
import useDateOfBirthValidation from './useDateOfBirthValidation';
import Skeleton from '../../Skeleton';

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const LockClosed = dynamic(() => import('core/assets/icons/LockClosed'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={5} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const CheckBox = dynamic(() => import('core/atoms/checkbox'), {
  loading: () => <Skeleton count={5} />,
});

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
        error={
          errors?.termsAndCons?.message?.toString() ||
          errors?.privacyPolicy?.message?.toString()
        }
      >
        <CheckBox
          id="register-form-terms"
          dataTestId="aboutTermsAndCons"
          name="termsAndCons"
          label={[
            'I agree to the ',
            <a
              key="a"
              className="link -teal"
              href="/legal/terms-and-conditions.html"
              target="_blank"
            >
              Terms and Conditions
            </a>,
          ]}
          ref={register}
        />
        <CheckBox
          id="register-form-privacy-policy"
          dataTestId="aboutPrivacyPolicy"
          name="privacyPolicy"
          label={[
            'I have read and understood the ',
            <a
              key="a-privacy"
              className="link -teal"
              href="/legal/privacy-policy.html"
              target="_blank"
            >
              Privacy Policy
            </a>,
          ]}
          ref={register}
        />
        <CheckBox
          id="register-form-consent"
          dataTestId="aboutConsent"
          name="consent"
          label="Keep me updated on the latest deals & offers"
          ref={register}
        />
      </FormGroup>
      <Text tag="p" color="darker" size="regular">
        By checking your eligibility, you agree to a soft credit check.
      </Text>
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
