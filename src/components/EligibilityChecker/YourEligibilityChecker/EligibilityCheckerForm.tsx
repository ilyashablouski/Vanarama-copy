import dynamic from 'next/dynamic';
import Select from 'core/atoms/select/';
import TextInput from 'core/atoms/textinput/';
import React, { FC } from 'react';
import CheckBox from 'core/atoms/checkbox';
import { genMonths, genYears, genDays } from '../../../utils/helpers';
import { IFormProps } from './interface';
import useDateOfBirthValidation from './useDateOfBirthValidation';
import Skeleton from '../../Skeleton';
import AddressFormField from '../../AddressFormField/AddressFormField';

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

const EligibilityCheckerForm: FC<IFormProps> = ({
  submit,
  errors,
  handleSubmit,
  register,
  triggerValidation,
  watch,
  formState,
}) => {
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
      <AddressFormField
        skipManualInput
        label="Your Postcode or Address"
        dataTestId="eligibilityCheckerAddress"
        id="addressFinder"
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
          {months.map((value: string, index: number) => (
            <option key={value} value={index + 1}>
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
        error={
          errors?.termsAndCons?.message?.toString() ||
          errors?.privacyPolicy?.message?.toString()
        }
      >
        <CheckBox
          id="termsAndCons"
          dataTestId="eligibilityTermsAndCons"
          name="termsAndCons"
          label={[
            'I agree to the ',
            <a
              key="a"
              className="link -teal"
              href="/legal/terms-and-conditions"
              target="_blank"
            >
              Terms and Conditions
            </a>,
          ]}
          ref={register}
        />
        <CheckBox
          id="privacyPolicy"
          dataTestId="eligibilityPrivacyPolicy"
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
          id="consent"
          dataTestId="eligibilityCheckoutConsent"
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
