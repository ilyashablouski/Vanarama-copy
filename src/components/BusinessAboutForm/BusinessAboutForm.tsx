import { gql } from '@apollo/client';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import React from 'react';
import { OnSubmit, useForm } from 'react-hook-form';
import { BusinessAboutFormDropDownData } from '../../../generated/BusinessAboutFormDropDownData';
import FCWithFragments from '../../utils/FCWithFragments';
import { EMAIL_REGEX, WORLDWIDE_MOBILE_REGEX } from '../../utils/regex';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { IBusinessAboutFormValues } from './interfaces';

interface IProps {
  dropDownData: BusinessAboutFormDropDownData;
  onSubmit: OnSubmit<IBusinessAboutFormValues>;
}

const BusinessAboutForm: FCWithFragments<IProps> = ({
  dropDownData,
  onSubmit,
}) => {
  const { formState, handleSubmit, errors, register } = useForm<
    IBusinessAboutFormValues
  >({
    mode: 'onBlur',
    defaultValues: {
      telephone: '',
    },
  });

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
        hint="As displayed on your driving license"
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
        controlId="telephone"
        hint="Please provide your phone number"
        label="Telephone Number"
        error={errors.telephone?.message?.toString()}
      >
        <NumericInput
          id="telephone"
          type="tel"
          name="telephone"
          dataTestId="about-you_telephone"
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
        error={errors.email?.message?.toString()}
      >
        <TextInput
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
          <option value="Limited">Limited</option>
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
          label="I agree to the Terms and Conditions"
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
        label={formState.isSubmitting ? 'Saving...' : 'Continue'}
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
