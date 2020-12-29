import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
import Checkbox from 'core/atoms/checkbox';
import NumericInput from 'core/atoms/numeric-input';
import Select from 'core/atoms/select';
import TextInput from 'core/atoms/textinput';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import { EMAIL_REGEX, WORLDWIDE_MOBILE_REGEX } from '../../utils/regex';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { IBusinessAboutFormValues, IProps } from './interfaces';
import {
  mapEmailErrorMessage,
  createEmailErrorMessage,
} from '../AboutForm/mapEmailErrorMessage';
import { companyTypesList } from '../../models/enum/CompanyTypes';
import Skeleton from '../Skeleton';

const ChevronForwardSharp = dynamic(
  () => import('core/assets/icons/ChevronForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Formgroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={1} />,
});

const BusinessAboutForm: FCWithFragments<IProps> = ({
  dropDownData,
  onSubmit,
  person,
  personLoggedIn,
  onEmailExistenceCheck,
  onLogInCLick,
  onRegistrationClick,
  isEdited,
}) => {
  const defaultValues = person || {};
  const { formState, handleSubmit, errors, register, reset } = useForm<
    IBusinessAboutFormValues
  >({
    defaultValues,
    mode: 'onBlur',
  });
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

  const selectLabel = useMemo(() => {
    if (isEdited) {
      return 'Save & Return';
    }
    return formState.isSubmitting ? 'Saving...' : 'Continue';
  }, [isEdited, formState.isSubmitting]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Formgroup
        controlId="title"
        label="Title"
        error={errors.title?.message?.toString()}
      >
        <Select
          id="title"
          name="title"
          dataTestId="about-you_title"
          ref={register({ required: 'Please select a title' })}
        >
          <OptionsWithFavourites options={dropDownData.titles} />
        </Select>
      </Formgroup>
      <Formgroup
        controlId="firstName"
        hint="As displayed on your driving licence"
        label="First Name"
        error={errors.firstName?.message?.toString()}
      >
        <TextInput
          id="firstName"
          name="firstName"
          dataTestId="about_you_first-name"
          ref={register({
            required: 'Please enter your first name',
            pattern: {
              value: /^[a-zA-Z'-\s]+$/,
              message: 'Please use only letters, apostrophes and dashes',
            },
            minLength: {
              value: 2,
              message:
                'Oops, your first name’s too short. Please make it 2 characters or longer',
            },
            maxLength: {
              value: 50,
              message:
                'Oops, your first name’s too long. Please keep it to 50 characters',
            },
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="lastName"
        hint="As displayed on your driving license"
        label="Last Name"
        error={errors.lastName?.message?.toString()}
      >
        <TextInput
          id="lastName"
          name="lastName"
          dataTestId="about-you_last-name"
          ref={register({
            required: 'Please enter your last name',
            pattern: {
              value: /^[a-zA-Z'-\s]+$/,
              message: 'Please use only letters, apostrophes and dashes',
            },
            minLength: {
              value: 2,
              message:
                'Oops, your last name’s too short. Please make it 2 characters or longer',
            },
            maxLength: {
              value: 50,
              message:
                'Oops, your last name’s too long. Please keep it to 50 characters',
            },
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="mobile"
        hint="Please provide your phone number"
        label="Telephone Number"
        error={errors.mobile?.message?.toString()}
      >
        <NumericInput
          id="mobile"
          type="tel"
          name="mobile"
          dataTestId="about-you_mobile"
          ref={register({
            required: 'Please enter your telephone number',
            minLength: {
              value: 11,
              message:
                'Oops, this mobile number is too short. Please enter 11 characters or more',
            },
            maxLength: {
              value: 16,
              message:
                'Oops, this mobile number is too long. Please enter 16 characters or less',
            },
            pattern: {
              value: WORLDWIDE_MOBILE_REGEX,
              message: 'Please enter mobile number without spaces or hyphens',
            },
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="email"
        hint="Please provide your email address"
        label="Email Address"
        error={mapEmailErrorMessage(
          onLogInCLick,
          onRegistrationClick,
          errors.email?.message?.toString(),
        )}
      >
        <TextInput
          disabled={!!person?.email && personLoggedIn}
          id="email"
          name="email"
          dataTestId="about-you_email"
          ref={register({
            required: 'Please enter your email address',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Oops, this email address is invalid',
            },
            maxLength: {
              value: 254,
              message:
                'Oops, this email is too long. Please keep it to 254 characters',
            },
            validate: async email => {
              if (person) {
                return undefined;
              }

              const result = await onEmailExistenceCheck?.(email);

              return createEmailErrorMessage(result);
            },
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="company_type"
        label="Type Of Company"
        error={errors.companyType?.message?.toString()}
      >
        <Select
          id="company_type"
          name="companyType"
          dataTestId="about-you_company-type"
          ref={register({ required: 'Please select a type of company' })}
        >
          {companyTypesList.map(companyType => (
            <option value={companyType.value} key={companyType.label}>
              {companyType.label}
            </option>
          ))}
        </Select>
      </Formgroup>
      <hr className="-mv-400" />
      <Formgroup
        label="Please Confirm The Below"
        error={
          errors.consent?.message?.toString() ||
          errors.termsAndConditions?.message?.toString()
        }
      >
        <Checkbox
          id="consent"
          name="consent"
          dataTestId="about-you_consent"
          ref={register({
            validate: value =>
              value ? undefined : 'You must be authorised to apply for credit',
          })}
          label="I am authorised to apply for credit on behalf of the company"
        />
        <Checkbox
          id="marketing"
          name="marketing"
          dataTestId="about-you_marketing"
          ref={register}
          label="I wish to receive email and SMS messages for updates on the latest deals, offers and promotions"
        />
        <Checkbox
          id="terms_and_conditions"
          name="termsAndConditions"
          dataTestId="about-you_terms-and-conditions"
          ref={register({
            validate: value =>
              value ? undefined : 'The terms and conditions must be accepted',
          })}
          label={[
            'I agree to the ',
            <a
              key="a"
              className="link -teal"
              href="/legal/terms-and-conditions/"
              target="_blank"
            >
              Terms and Conditions
            </a>,
          ]}
        />
      </Formgroup>
      <Formgroup label="" error={errors?.privacyPolicy?.message?.toString()}>
        <Checkbox
          id="privacyPolicy"
          dataTestId="aboutPrivacyPolicy"
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
      </Formgroup>
      <Button
        className="-mt-400"
        color="teal"
        dataTestId="about-you_continue-button"
        disabled={formState.isSubmitting}
        fill="solid"
        iconColor="white"
        icon={<ChevronForwardSharp />}
        iconPosition="after"
        label={selectLabel}
        size="large"
        type="submit"
      />
    </Form>
  );
};

BusinessAboutForm.fragments = {
  dropDownData: gql`
    fragment BusinessAboutFormDropDownData on DropDownType {
      __typename
      titles {
        __typename
        data
        favourites
      }
    }
  `,
};

export default BusinessAboutForm;
