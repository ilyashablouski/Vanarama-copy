import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React, { useEffect } from 'react';
import { useFormContext, useForm } from 'react-hook-form';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import AddressFormField from '../AddressFormField/AddressFormField';
import { ICompanyDetailsFormValues, InputMode } from './interfaces';
import { genMonths, genYears } from '../../utils/helpers';
import {
  COMPANY_REGISTRATION_NUMBER,
  WORLDWIDE_MOBILE_REGEX,
  EMAIL_REGEX,
} from '../../utils/regex';

interface IProps {
  inputMode: InputMode;
  defaultValues: Partial<ICompanyDetailsFormValues>;
}

export default function CompanyDetailsFormFields({ inputMode, defaultValues }: IProps) {
  const { formState, errors, register, watch, setValue } = useFormContext<
    ICompanyDetailsFormValues
  >();
  //pass default values
  useEffect(() => {
    setValue("tradingDifferent", defaultValues.tradingDifferent || false);
    Object.entries(defaultValues).forEach(([key, value]) => setValue(key, value));
  }, [defaultValues.companyName])
  const tradingDifferent = watch('tradingDifferent', defaultValues.tradingDifferent || false);
  return (
    <>
      {/* Only capture these fields in 'manual' mode. In 'search' they come from the backend API */}
      {inputMode === 'manual' && (
        <>
          <Formgroup
            controlId="companyName"
            label="Company Name"
            error={errors.companyName?.message?.toString()}
          >
            <TextInput
              id="companyName"
              name="companyName"
              dataTestId="company-details_name"
              ref={register({
                required: 'Please enter your company name',
                minLength: {
                  value: 2,
                  message:
                    'Oops, this name is too short. Please make it 2 characters or more',
                },
                maxLength: {
                  value: 160,
                  message:
                    'Oops, this name’s too long. Please keep it to 160 characters or less',
                },
              })}
            />
          </Formgroup>
          <Formgroup
            controlId="companyNumber"
            label="Company Registration Number"
            error={errors.companyNumber?.message?.toString()}
          >
            <TextInput
              id="companyNumber"
              name="companyNumber"
              dataTestId="company-details_registration-number"
              ref={register({
                required: 'Please enter your company registration number',
                pattern: {
                  value: COMPANY_REGISTRATION_NUMBER,
                  message:
                    'Your company registration number should be 8 characters long',
                },
              })}
            />
          </Formgroup>
          <Formgroup
            controlId="tradingSinceMonth"
            label="Trading Since"
            error={(
              errors.tradingSinceMonth || errors.tradingSinceYear
            )?.message?.toString()}
            inline
          >
            <Select
              dataTestId="company-details_trading-since-month"
              id="tradingSinceMonth"
              name="tradingSinceMonth"
              placeholder="Month"
              ref={register({
                required: 'Please enter the trading since date',
              })}
            >
              {genMonths().map((month, i) => (
                <option key={month} value={i + 1}>
                  {month}
                </option>
              ))}
            </Select>
            <Select
              dataTestId="company-details_trading-since-year"
              id="tradingSinceYear"
              name="tradingSinceYear"
              placeholder="Year"
              ref={register({
                required: 'Please enter the trading since date',
              })}
            >
              {genYears(100).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </Formgroup>
        </>
      )}
      <Formgroup
        controlId="nature"
        label="Nature of Business"
        hint="e.g. building firm/marketing agency"
        error={errors.nature?.message?.toString()}
      >
        <TextInput
          id="nature"
          name="nature"
          dataTestId="company-details_nature"
          ref={register({
            required: 'Please enter the nature of business',
          })}
        />
      </Formgroup>
      <hr className="-mv-400" />
      <AddressFormField
        dataTestId="company-details_registered-address"
        id="registeredAddress"
        label="Registered Address"
        rules={{
          required: 'Please enter the registered business address',
        }}
      />
      <Formgroup>
        <Checkbox
          dataTestId="company-details_trading-address-different"
          id="trading-different"
          name="tradingDifferent"
          label="Trading address is different to registered address"
          ref={register}
        />
      </Formgroup>
      {tradingDifferent && (
        <AddressFormField
          dataTestId="company-details_trading-address"
          id="tradingAddress"
          label="Trading Address"
          rules={{
            validate: value =>
              tradingDifferent && !value
                ? 'Please enter the trading address'
                : undefined,
          }}
        />
      )}
      <hr className="-mv-400" />
      <Formgroup
        controlId="telephone"
        label="Business Telephone Number"
        error={errors.telephone?.message?.toString()}
      >
        <NumericInput
          dataTestId="company-details_telephone"
          id="telephone"
          type="tel"
          name="telephone"
          ref={register({
            required: 'Please enter the business telephone number',
            minLength: {
              value: 11,
              message:
                'Oops, this telephone number is too short. Please enter 11 characters or more',
            },
            maxLength: {
              value: 16,
              message:
                'Oops, this telephone number is too long. Please enter 16 characters or less',
            },
            pattern: {
              value: WORLDWIDE_MOBILE_REGEX,
              message:
                'Please enter telephone number without spaces or hyphens',
            },
          })}
        />
      </Formgroup>
      <Formgroup
        controlId="email"
        hint="Please provide a general company email address only"
        label="Email Address"
        error={errors.email?.message?.toString()}
      >
        <TextInput
          dataTestId="company-details_email"
          id="email"
          name="email"
          ref={register({
            required: 'Please enter an email address',
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
      <Button
        color="primary"
        dataTestId="company-details_continue"
        disabled={formState.isSubmitting}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        label={formState.isSubmitting ? 'Saving...' : 'Continue'}
        size="large"
        type="submit"
      />
    </>
  );
}
