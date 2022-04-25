import dynamic from 'next/dynamic';
import Checkbox from 'core/atoms/checkbox';
import NumericInput from 'core/atoms/numeric-input';
import TextInput from 'core/atoms/textinput';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'core/atoms/select';
import AddressFormField from '../AddressFormField/AddressFormField';
import { ICompanyDetailsFormValues, InputMode } from './interfaces';
import { genMonths, genYears } from '../../utils/helpers';
import { validateCompanyAddress } from '../../utils/validation';
import { diffInYear } from '../../utils/dates';
import {
  COMPANY_REGISTRATION_NUMBER,
  WORLDWIDE_MOBILE_REGEX,
  EMAIL_REGEX,
} from '../../utils/regex';
import Skeleton from '../Skeleton';
import NatureTypeahead from './NatureTypehead';
import PreviouslySoleTrader from './PreviouslySoleTrader';

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
const Formgroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={5} />,
});

interface IProps {
  inputMode: InputMode;
  isEdited: boolean;
  natureOfBusinessValue: string[];
  setNatureValue: (values: string[]) => void;
}

const MIN_TRADING_YEARS = 3;

export default function CompanyDetailsFormFields({
  inputMode,
  isEdited,
  natureOfBusinessValue,
  setNatureValue,
}: IProps) {
  const { formState, errors, register, watch } = useFormContext<
    ICompanyDetailsFormValues
  >();

  const selectLabel = useMemo(() => {
    if (isEdited) {
      return 'Save & Return';
    }
    return formState.isSubmitting ? 'Saving...' : 'Continue';
  }, [isEdited, formState.isSubmitting]);

  const tradingDifferent = watch('tradingDifferent');
  const companySearchResult = watch('companySearchResult');
  const previouslyTradingSoleTrader = watch('previouslyTradingSoletrader');
  const tradingSinceMonth = watch('tradingSinceMonth');
  const tradingSinceYear = watch('tradingSinceYear');

  const isPreviouslySoleTrader = useMemo(() => {
    if (companySearchResult) {
      const date = new Date(companySearchResult.dateOfCreation);
      const tradingYears = diffInYear(date.getFullYear(), date.getMonth(), 1);
      return tradingYears < MIN_TRADING_YEARS;
    }

    if (tradingSinceYear && tradingSinceMonth) {
      const tradingYears = diffInYear(+tradingSinceYear, +tradingSinceMonth, 1);
      return tradingYears < MIN_TRADING_YEARS;
    }

    return false;
  }, [companySearchResult, tradingSinceMonth, tradingSinceYear]);

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
              {genMonths().map((month, index) => (
                <option key={month} value={index + 1}>
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
      {isPreviouslySoleTrader && <PreviouslySoleTrader />}
      {previouslyTradingSoleTrader === undefined &&
      isPreviouslySoleTrader &&
      companySearchResult ? null : (
        <>
          <NatureTypeahead
            value={natureOfBusinessValue}
            setNatureValue={setNatureValue}
          />
          <hr className="-mv-400" />
          <AddressFormField
            dataTestId="company-details_registered-address"
            id="registeredAddress"
            label="Registered Address"
            rules={{
              required: 'Please enter the registered business address',
              validate: (value: ICompanyDetailsFormValues['tradingAddress']) =>
                validateCompanyAddress(value?.label),
            }}
            hint="Enter Postcode Or Just Start Typing Address"
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
                required: 'Please enter the trading address',
                validate: (
                  value: ICompanyDetailsFormValues['tradingAddress'],
                ) => validateCompanyAddress(value?.label),
              }}
              hint="Enter Postcode Or Just Start Typing Address"
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
            hint="Please provide a company email address"
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
            label={selectLabel}
            size="large"
            type="submit"
          />
        </>
      )}
    </>
  );
}
