import React, { useEffect } from 'react';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Select from '@vanarama/uibook/lib/components/atoms/select/';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears, genDays } from '../../utils/helpers';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import validationSchema from './AboutForm.validation';
import { IAboutFormValues, IProps } from './interface';
import { responseToInitialFormValues } from './mappers';
import useDateOfBirthValidation from './useDateOfBirthValidation';
import {
  mapEmailErrorMessage,
  EMAIL_ALREADY_EXISTS,
} from './mapEmailErrorMessage';

const AboutForm: FCWithFragments<IProps> = ({
  dropdownData,
  person,
  submit,
  onEmailExistenceCheck,
  onLogInClick,
}) => {
  const months = genMonths();
  const years = genYears(100);
  const defaultValues = responseToInitialFormValues(person);
  const {
    errors,
    handleSubmit,
    register,
    triggerValidation,
    watch,
    formState,
    setError,
    getValues,
    reset,
  } = useForm<IAboutFormValues>({
    mode: 'onBlur',
    validationSchema,
    defaultValues,
  });

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
      >
        <Select id="title" name="title" dataTestId="aboutTitle" ref={register}>
          <OptionsWithFavourites options={dropdownData.titles} />
        </Select>
      </FormGroup>

      <FormGroup
        controlId="firstName"
        label="First Name"
        error={errors?.firstName?.message?.toString()}
      >
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          dataTestId="aboutFirstName"
          ref={register}
          width="45ch"
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
          dataTestId="aboutLastName"
          ref={register}
          width="45ch"
        />
      </FormGroup>
      <FormGroup
        controlId="email"
        label="Email"
        error={mapEmailErrorMessage(
          onLogInClick,
          errors?.email?.message?.toString(),
        )}
      >
        <TextInput
          id="email"
          type="email"
          name="email"
          dataTestId="aboutEmail"
          ref={register}
          width="35ch"
          onBlur={async () => {
            const isEmailExists = await onEmailExistenceCheck?.(
              getValues('email'),
            );

            if (isEmailExists) {
              setError('email', 'required', EMAIL_ALREADY_EXISTS);
            }
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormGroup
          controlId="telephone"
          label="Telephone"
          error={errors?.telephone?.message?.toString()}
        >
          <NumericInput
            id="telephone"
            type="tel"
            name="telephone"
            dataTestId="aboutTelephone"
            width="45ch"
            ref={register}
          />
        </FormGroup>
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
          dataTestId="aboutSelectDOB"
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
          name="monthOfBirth"
          ref={register}
          placeholder="Month"
        >
          {months.map((value, i) => (
            <option key={value} value={i + 1}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="aboutSelectYOB"
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
      >
        <Select
          id="countryOfBirth"
          name="countryOfBirth"
          dataTestId="aboutSelectCOB"
          ref={register}
        >
          <OptionsWithFavourites options={dropdownData.countries} />
        </Select>
      </FormGroup>
      <FormGroup
        controlId="nationality"
        label="Nationality"
        error={errors?.nationality?.message?.toString()}
      >
        <Select
          id="nationality"
          name="nationality"
          dataTestId="aboutNationality"
          ref={register}
        >
          <OptionsWithFavourites options={dropdownData.nationalities} />
        </Select>
      </FormGroup>
      <FormGroup
        controlId="maritalStatus"
        label="Marital Status"
        error={errors?.maritalStatus?.message?.toString()}
      >
        <Select
          id="maritalStatus"
          name="maritalStatus"
          dataTestId="aboutMaritalStatus"
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
      >
        <Select
          id="dependants"
          name="dependants"
          dataTestId="aboutDependants"
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
      >
        <Select
          id="adultsInHousehold"
          name="adultsInHousehold"
          dataTestId="aboutAdultsInHouse"
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
      >
        <CheckBox
          id="consent"
          dataTestId="aboutConsent"
          name="consent"
          label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
          ref={register}
        />
        <CheckBox
          id="termsAndCons"
          dataTestId="aboutTermsAndCons"
          name="termsAndCons"
          label="I agree to the terms and conditions."
          ref={register}
        />
      </FormGroup>
      <Button
        type="submit"
        label={formState.isSubmitting ? 'Saving...' : 'Continue'}
        color="primary"
        disabled={formState.isSubmitting}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        dataTestId="aboutSubmit"
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
      title
      firstName
      lastName
      emailAddresses {
        __typename
        uuid
        primary
        value
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
    }
  `,
};

export default AboutForm;
