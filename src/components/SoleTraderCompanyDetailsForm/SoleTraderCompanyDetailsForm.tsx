import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { gql } from '@apollo/client';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import AddressFormField from '../AddressFormField/AddressFormField';
import FCWithFragments from '../../utils/FCWithFragments';
import { genMonths, genYears } from '../../utils/helpers';
import {
  emailValidator,
  phoneNumberValidator,
  annualValidator,
  requiredTextFieldValidator,
  vehicleRegistrationNumberValidator,
} from '../../utils/inputValidators';
import {
  ISoleTraderCompanyDetailsFormValues,
  ISoleTraderCompanyDetailsFormProps,
} from './interfaces';

const isMonthInFuture = (month: string, year: string) => {
  const selectedMonth = parseInt(month, 10);
  const selectedYear = parseInt(year, 10);
  const currentDate = new Date();

  const result =
    selectedYear >= currentDate.getFullYear() &&
    selectedMonth > currentDate.getMonth() + 1;

  return result;
};

const SoleTraderCompanyDetailsForm: FCWithFragments<ISoleTraderCompanyDetailsFormProps> = ({
  onSubmit,
}) => {
  const methods = useForm<ISoleTraderCompanyDetailsFormValues>({
    mode: 'onBlur',
  });
  const { formState, errors, register, watch } = methods;
  const existingVehicle = watch('existingVehicle');
  const tradingSinceYear = watch('tradingSinceYear');
  const tradingSinceMonth = watch('tradingSinceMonth');

  return (
    <Form onSubmit={methods.handleSubmit(onSubmit)}>
      <Heading
        color="black"
        dataTestId="company-details_heading"
        size="xlarge"
        className="-mb-500"
      >
        Company Details
      </Heading>
      <Formgroup
        controlId="tradingName"
        label="Trading Name"
        error={errors.tradingName?.message?.toString()}
      >
        <TextInput
          id="trading-name"
          name="tradingName"
          dataTestId="sole-trader-company-details_trading-name"
          ref={register(
            requiredTextFieldValidator('Please enter trading name', 160),
          )}
        />
      </Formgroup>
      <FormContext {...methods}>
        <AddressFormField
          dataTestId="sole-trader-company-details_trading-address"
          id="tradingAddress"
          label="Trading Address"
          rules={{
            required: 'Please enter the registered business address',
          }}
        />
      </FormContext>
      <Formgroup
        controlId="natureOfBusiness"
        label="Nature of Business"
        hint="e.g. building firm/marketing agency"
        error={errors.natureofBusiness?.message?.toString()}
      >
        <TextInput
          id="nature-of-business"
          name="natureOfBusiness"
          dataTestId="sole-trader-company-details_nature-of-business"
          ref={register(
            requiredTextFieldValidator('Please enter nature of business', 254),
          )}
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
          id="trading-since-month"
          name="tradingSinceMonth"
          placeholder="Month"
          ref={register({
            required: 'Please enter the trading since date',
            validate: month =>
              tradingSinceYear && isMonthInFuture(month, tradingSinceYear)
                ? 'Please enter valid the trading since date'
                : undefined,
          })}
        >
          {genMonths().map((month, i) => (
            <option
              key={month}
              value={i + 1}
              disabled={isMonthInFuture((i + 1).toString(), tradingSinceYear)}
            >
              {month}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="sole-trader-company-details_trading-since-year"
          id="trading-since-year"
          name="tradingSinceYear"
          placeholder="Year"
          ref={register({
            required: 'Please enter the trading since date',
            validate: year =>
              isMonthInFuture(tradingSinceMonth, year)
                ? 'Please enter valid the trading since date'
                : undefined,
          })}
        >
          {genYears(100).map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Formgroup>

      <Formgroup
        className="-mt-500"
        controlId="businessTelephoneNumber"
        label="Business Telephone Number"
        error={errors.businessTelephoneNumber?.message?.toString()}
      >
        <TextInput
          id="business-telephone-number"
          name="businessTelephoneNumber"
          dataTestId="sole-trader-company-details_business-telephone-number"
          ref={register(phoneNumberValidator)}
        />
      </Formgroup>
      <Formgroup
        controlId="email"
        label="Email"
        error={errors.email?.message?.toString()}
        hint="Please provide a general company email address only"
      >
        <TextInput
          id="email"
          name="email"
          dataTestId="sole-trader-company-details_email"
          ref={register(emailValidator)}
        />
      </Formgroup>

      <Heading color="black" size="regular" className="-mt-500">
        Please ensure these figures are accurate, as the finance company may ask
        to see evidence of this in the form of company accounts or tax returns.
      </Heading>
      <Formgroup
        controlId="annualTurnover"
        label="Annual Turnover"
        error={errors.annualTurnover?.message?.toString()}
      >
        <TextInput
          prefix="£"
          id="annualTurnover"
          name="annualTurnover"
          dataTestId="sole-trader-company-details_annual-turnover"
          ref={register(annualValidator('Please enter annual turnover '))}
        />
      </Formgroup>
      <Formgroup
        controlId="annualCostOfSales"
        label="Annual Cost of Sales"
        error={errors.annualCostOfSales?.message?.toString()}
      >
        <TextInput
          prefix="£"
          id="annualCostOfSales"
          name="annualCostOfSales"
          dataTestId="sole-trader-company-details_annual-cost-of-sales"
          ref={register(annualValidator('Please enter annual cost of sales'))}
        />
      </Formgroup>
      <Formgroup
        controlId="annualExpenses"
        label="Annual Expenses"
        error={errors.annualExpenses?.message?.toString()}
      >
        <TextInput
          prefix="£"
          id="annualExpenses"
          name="annualExpenses"
          dataTestId="sole-trader-company-details_annual-expenses"
          ref={register(annualValidator('Please enter annual expenses'))}
        />
      </Formgroup>

      <Formgroup className="-mt-500">
        <Checkbox
          dataTestId="sole-trader-company-details_existing-vehicle"
          id="existing-vehicle"
          name="existingVehicle"
          label="Existing Vehicle Finance to be Replaced?"
          ref={register}
        />
      </Formgroup>
      {existingVehicle && (
        <>
          <Formgroup
            controlId="vehicleRegistrationNumber"
            hint="Vehicle Registration Number"
            error={errors.vehicleRegistrationNumber?.message?.toString()}
          >
            <TextInput
              dataTestId="sole-trader-company-details_vehicle-egistration-number"
              id="vehicle-registration-number"
              name="vehicleRegistrationNumber"
              ref={register(vehicleRegistrationNumberValidator)}
            />
          </Formgroup>
          <Formgroup
            controlId="monthlyAmountBeingReplaced"
            hint="Monthly Amount Being Replaced"
            error={errors.monthlyAmountBeingReplaced?.message?.toString()}
          >
            <TextInput
              prefix="£"
              dataTestId="sole-trader-company-details_monthly-amount-being-replaced"
              id="monthly-amount-being-replaced"
              name="monthlyAmountBeingReplaced"
              ref={register(
                annualValidator('Please fill in monthly amount being replaced'),
              )}
            />
          </Formgroup>
        </>
      )}

      <Button
        color="primary"
        className="-mb-500"
        dataTestId="sole-trader-company-details_continue"
        disabled={formState.isSubmitting}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        label={formState.isSubmitting ? 'Saving...' : 'Continue'}
        size="large"
        type="submit"
      />
    </Form>
  );
};

SoleTraderCompanyDetailsForm.fragments = {
  company: gql`
    fragment CompanyDetails on CompanyType {
      __typename
      uuid
      person {
        uuid
      }
      tradingName
      address {
        __typename
        startedOn
        endedOn
        propertyStatus
        serviceId
        kind
      }
      companyNature
      tradingSince
      telephone {
        __typename
        kind
        primary
        value
      }
      emailAddress
      annualTurnover
      annualSalesCost
      annualExpenses
      replaceExistingVehicleFinance
      vehicleRegistrationNumber
      monthlyAmountBeingReplaced
    }
  `,
};

export default SoleTraderCompanyDetailsForm;
