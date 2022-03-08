import React, { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CheckBox from 'core/atoms/checkbox/';
import NumericInput from 'core/atoms/numeric-input';
import Select from 'core/atoms/select/';
import TextInput from 'core/atoms/textinput/';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears, genDays } from '../../utils/helpers';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { createValidationSchema } from './AboutForm.validation';
import { IAboutFormValues, IProps } from './interface';
import { responseToInitialFormValues } from './mappers';
import { mapEmailErrorMessage } from './mapEmailErrorMessage';
import useDateOfBirthValidation from './useDateOfBirthValidation';
import useEmailValidation from './useEmailValidation';
import Skeleton from '../Skeleton';

const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const ChevronForwardSharp = dynamic(
  () => import('core/assets/icons/ChevronForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={5} />,
});

const AboutForm: FCWithFragments<IProps> = ({
  dropdownData,
  person,
  submit,
  emailValidator,
  isEmailDisabled,
  onLogInClick,
  onRegistrationClick,
  isSubmit,
}) => {
  const defaultValues = useMemo(() => responseToInitialFormValues(person), [
    person,
  ]);
  const validationSchema = useMemo(
    () =>
      emailValidator
        ? createValidationSchema(emailValidator)
        : createValidationSchema(() => Promise.resolve(undefined)),
    [emailValidator],
  );
  const months = genMonths();
  const years = genYears(100);
  const {
    errors,
    handleSubmit,
    register,
    triggerValidation,
    watch,
    reset,
  } = useForm<IAboutFormValues>({
    mode: 'onBlur',
    validationSchema,
    defaultValues,
  });

  useEmailValidation(watch, triggerValidation);
  useDateOfBirthValidation(watch, triggerValidation);
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormGroup
        controlId="title"
        label="Title"
        error={errors?.title?.message?.toString()}
        dataUiTestId="olaf_about_error-title"
      >
        <Select id="title" name="title" dataTestId="aboutTitle" ref={register}>
          <OptionsWithFavourites options={dropdownData.titles} />
        </Select>
      </FormGroup>

      <FormGroup
        controlId="firstName"
        label="First Name"
        error={errors?.firstName?.message?.toString()}
        dataUiTestId="olaf_about_error-first-name"
      >
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          dataTestId="aboutFirstName"
          dataUiTestId="olaf_about_first-name"
          ref={register}
          width="45ch"
        />
      </FormGroup>

      <FormGroup
        controlId="lastName"
        label="Last Name"
        error={errors?.lastName?.message?.toString()}
        dataUiTestId="olaf_about_error-last-name"
      >
        <TextInput
          id="lastName"
          type="text"
          name="lastName"
          dataTestId="aboutLastName"
          dataUiTestId="olaf_about_last-name"
          ref={register}
          width="45ch"
        />
      </FormGroup>
      <FormGroup
        controlId="email"
        label="Email"
        error={mapEmailErrorMessage(
          errors?.email?.message?.toString(),
          onLogInClick,
          onRegistrationClick,
        )}
        dataUiTestId="olaf_about_error-email"
      >
        <TextInput
          disabled={isEmailDisabled && errors.email?.message === undefined}
          id="email"
          type="email"
          name="email"
          dataTestId="aboutEmail"
          dataUiTestId="olaf_about_email"
          ref={register}
          width="35ch"
        />
      </FormGroup>
      <FormGroup>
        <FormGroup
          controlId="telephone"
          label="Telephone"
          error={errors?.telephone?.message?.toString()}
          dataUiTestId="olaf_about_error-telephone"
        >
          <NumericInput
            id="telephone"
            type="tel"
            name="telephone"
            dataTestId="aboutTelephone"
            dataUiTestId="olaf_about_telephone"
            width="45ch"
            ref={register}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup
        controlId="dayOfBirth"
        label="Date of Birth"
        className="-inline-preserved -date-picker"
        error={
          errors?.dayOfBirth?.message?.toString() ||
          errors?.monthOfBirth?.message?.toString() ||
          errors?.yearOfBirth?.message?.toString()
        }
        dataUiTestId="olaf_about_error-date-of-birth"
      >
        <Select
          id="dayOfBirth"
          dataTestId="aboutSelectDOB"
          dataUiTestId="olaf_about_day-of-birth"
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
          dataTestId="aboutSelectMOB"
          dataUiTestId="olaf_about_month-of-birth"
          name="monthOfBirth"
          ref={register}
          placeholder="Month"
        >
          {months.map((value, index) => (
            <option key={value} value={index + 1}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="aboutSelectYOB"
          dataUiTestId="olaf_about_year-of-birth"
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
        controlId="countryOfBirth"
        label="Country of Birth"
        error={errors?.countryOfBirth?.message?.toString()}
        dataUiTestId="olaf_about_error-country-of-birth"
      >
        <Select
          id="countryOfBirth"
          name="countryOfBirth"
          dataTestId="aboutSelectCOB"
          dataUiTestId="olaf_about_country-of-birth"
          ref={register}
          style={{ maxWidth: '295px' }}
        >
          <OptionsWithFavourites options={dropdownData.countries} />
        </Select>
      </FormGroup>
      <FormGroup
        controlId="nationality"
        label="Nationality"
        error={errors?.nationality?.message?.toString()}
        dataUiTestId="olaf_about_error-nationality"
      >
        <Select
          id="nationality"
          name="nationality"
          dataTestId="aboutNationality"
          dataUiTestId="olaf_about_nationality-dropdown"
          ref={register}
          style={{ maxWidth: '220px' }}
        >
          <OptionsWithFavourites options={dropdownData.nationalities} />
        </Select>
      </FormGroup>
      <FormGroup
        controlId="maritalStatus"
        label="Marital Status"
        error={errors?.maritalStatus?.message?.toString()}
        dataUiTestId="olaf_about_error-marital-status"
      >
        <Select
          id="maritalStatus"
          name="maritalStatus"
          dataTestId="aboutMaritalStatus"
          dataUiTestId="olaf_about_marital-status-dropdown"
          ref={register}
        >
          {dropdownData?.maritalStatuses?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="dependants"
        label="No. of Dependants"
        error={errors?.dependants?.message?.toString()}
        dataUiTestId="olaf_about_error-no-of-dependants"
      >
        <Select
          id="dependants"
          name="dependants"
          dataTestId="aboutDependants"
          dataUiTestId="olaf_about_no-of-dependants-dropdown"
          ref={register}
        >
          {dropdownData?.noOfDependants?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="adultsInHousehold"
        label="No. of Adults in Household"
        error={errors?.adultsInHousehold?.message?.toString()}
        dataUiTestId="olaf_about_error-no-of-adults"
      >
        <Select
          id="adultsInHousehold"
          name="adultsInHousehold"
          dataTestId="aboutAdultsInHouse"
          dataUiTestId="olaf_about_no-of-adults-dropdown"
          ref={register}
        >
          {dropdownData?.noOfAdultsInHousehold?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        label="Please Confirm"
        error={errors?.termsAndCons?.message?.toString()}
        dataUiTestId="olaf_about_error-tncs"
      >
        <CheckBox
          id="marketing"
          dataTestId="aboutMarketingB2C"
          dataUiTestId="olaf_about_marketing-consent-checkbox"
          name="marketing"
          label="I want to be kept updated about exclusive deals & offers."
          ref={register}
        />
        <CheckBox
          id="termsAndCons"
          dataTestId="aboutTermsAndConditionsB2C"
          dataUiTestId="olaf_about_tncs-consent-checkbox-b2c"
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
      </FormGroup>
      <FormGroup
        label=""
        error={errors?.privacyPolicy?.message?.toString()}
        dataUiTestId="olaf_about_error-privacy-policy"
      >
        <CheckBox
          id="privacyPolicy"
          dataTestId="aboutPrivacyPolicy"
          dataUiTestId="olaf_about_privacy-policy-consent-checkbox"
          name="privacyPolicy"
          label={[
            'I have read and understood the ',
            <a
              key="a"
              className="link -teal"
              href="/legal/privacy-policy.html"
              target="_blank"
            >
              Privacy Policy
            </a>,
          ]}
          ref={register}
        />
      </FormGroup>
      <Button
        type="submit"
        label={isSubmit ? 'Saving...' : 'Continue'}
        color="primary"
        disabled={isSubmit}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        dataTestId="aboutSubmit"
        dataUiTestId="olaf_about_continue-button"
      />
    </Form>
  );
};

AboutForm.fragments = {
  dropdownData: gql`
    fragment AboutFormDropdownData on DropDownType {
      __typename
      titles {
        __typename
        data
        favourites
      }
      countries {
        __typename
        data
        favourites
      }
      nationalities {
        __typename
        data
        favourites
      }
      maritalStatuses {
        __typename
        data
      }
      noOfDependants {
        __typename
        data
      }
      noOfAdultsInHousehold {
        __typename
        data
      }
    }
  `,
  person: gql`
    fragment AboutFormPerson on PersonType {
      __typename
      uuid
      partyUuid
      title
      firstName
      lastName
      emailAddresses {
        __typename
        uuid
        primary
        value
        kind
        partyId
      }
      telephoneNumbers {
        __typename
        uuid
        kind
        value
      }
      dateOfBirth
      countryOfBirth
      nationality
      maritalStatus
      noOfAdultsInHousehold
      noOfDependants
      emailConsent
      profilingConsent
      smsConsent
      termsAndConditions
      companies {
        companyType
      }
      privacyPolicy
    }
  `,
};

export default AboutForm;
