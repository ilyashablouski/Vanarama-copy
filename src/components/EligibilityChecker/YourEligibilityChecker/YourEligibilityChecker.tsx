import { useForm, Controller } from 'react-hook-form';
import { gql } from '@apollo/client';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Select from '@vanarama/uibook/lib/components/atoms/select/';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import LockClosed from '@vanarama/uibook/lib/assets/icons/LockClosed';
import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import { genMonths, genYears } from '../../../utils/helpers';
import validationSchema from './YourEligibilityChecker.validation';
import { IYourEligiblityCheckerValues, IProps } from './interface';
import useDateOfBirthValidation from './useDateOfBirthValidation';
import FCWithFragments from '../../../utils/FCWithFragments';

const YourEligibilityChecker: FCWithFragments<IProps> = ({ submit }) => {
  const months = genMonths();
  const years = genYears(100);
  const {
    errors,
    handleSubmit,
    register,
    triggerValidation,
    watch,
    formState,
    control,
  } = useForm<IYourEligiblityCheckerValues>({
    mode: 'onBlur',
    validationSchema,
    defaultValues: {
      firstName: '',
      lastName: '',
      addressFinder: undefined,
      promotions: false,
      dayOfBirth: '',
      monthOfBirth: '',
      yearOfBirth: '',
    },
  });

  useDateOfBirthValidation(watch, triggerValidation);

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Heading
        color="black"
        size="xlarge"
        dataTestId="eligibilityCheckerHeading"
      >
        Enter Details
      </Heading>
      <Text color="darker" size="lead">
        Please fill your details in the form below or scan your driving licence
        to help you.
      </Text>
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
          width={45}
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
          width={45}
        />
      </FormGroup>
      <FormGroup
        label="Address"
        error={errors?.addressFinder?.message?.toString()}
      >
        <Controller
          name="addressFinder"
          valueName="selected"
          width={45}
          onChangeName="onSuggestionChange"
          as={
            <AddressFinder
              apiKey={process.env.LOQATE_KEY!}
              onSuggestionChange={() => {}}
            >
              <AddressFinder.Input id="addressFinder" />
              <AddressFinder.Selected />
              <AddressFinder.Intermediate />
              <AddressFinder.Results />
            </AddressFinder>
          }
          control={control}
        />
      </FormGroup>
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
          {[...Array(31)]
            .map((_, i) => i + 1)
            .map(value => (
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
          width={45}
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

YourEligibilityChecker.fragments = {
  creditChecker: gql`
    fragment QuickCreditCheckerEligibility on QuickCreditCheckerType {
      __typename
      score
      status
      person {
        __typename
        uuid
        firstName
        lastName
        dateOfBirth
        emailAddresses {
          __typename
          uuid
          primary
          value
        }
        addresses {
          __typename
          serviceId
          city
          lineOne
          lineTwo
          postcode
        }
      }
    }
  `,
};
export default YourEligibilityChecker;
