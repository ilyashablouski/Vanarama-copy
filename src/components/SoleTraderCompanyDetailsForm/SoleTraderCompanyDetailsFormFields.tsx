import React from 'react';
import { useForm } from 'react-hook-form';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Select from '@vanarama/uibook/lib/components/atoms/select';
// import AddressFormField from '../AddressFormField/AddressFormField';
import {
  ISoleTraderCompanyDetailsFormValues,
  ISoleTraderCompanyDetailsFormProps,
} from './interfaces';
import { genMonths, genYears } from '../../utils/helpers';

const SoleTraderCompanyDetailsFormFields: React.FC<ISoleTraderCompanyDetailsFormProps> = () => {
  const { formState, errors, register } = useForm<
    ISoleTraderCompanyDetailsFormValues
  >();

  return (
    <>
      <Formgroup
        controlId="tradingName"
        label="Trading Name"
        error={errors.tradingName?.message?.toString()}
      >
        <TextInput
          id="trading-name"
          name="tradingName"
          dataTestId="sole-trader-company-details_trading-name"
          ref={register()}
        />
      </Formgroup>
      <Formgroup
        controlId="tradingAddress"
        label="Trading Address"
        error={errors.tradingAddress?.message?.toString()}
      >
        <TextInput
          id="trading-address"
          name="tradingAddress"
          dataTestId="sole-trader-company-details_trading-address"
          ref={register()}
        />
      </Formgroup>
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
          ref={register()}
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
          })}
        >
          {genMonths().map((month, i) => (
            <option key={month} value={i + 1}>
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
        controlId="businessTelephoneNumber"
        label="Business Telephone Number"
        error={errors.businessTelephoneNumber?.message?.toString()}
      >
        <TextInput
          id="business-telephone-number"
          name="businessTelephoneNumber"
          dataTestId="sole-trader-company-details_business-telephone-number"
          ref={register()}
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
          ref={register()}
        />
      </Formgroup>

      <Heading color="black" size="regular">
        Please ensure these figures are accurate, as the finance company may ask
        to see evidence of this in the form of company accounts or tax returns.
      </Heading>
      <Formgroup
        controlId="annualTurnover"
        label="Annual Turnover"
        error={errors.annualTurnover?.message?.toString()}
      >
        <TextInput
          id="annualTurnover"
          name="annualTurnover"
          dataTestId="sole-trader-company-details_annual-turnover"
          ref={register()}
        />
      </Formgroup>
      <Formgroup
        controlId="annualCostOfSales"
        label="Annual Cost of Sales"
        error={errors.annualCostOfSales?.message?.toString()}
      >
        <TextInput
          id="annualCostOfSales"
          name="annualCostOfSales"
          dataTestId="sole-trader-company-details_annual-cost-of-sales"
          ref={register()}
        />
      </Formgroup>
      <Formgroup
        controlId="annualExpenses"
        label="Annual Expenses"
        error={errors.annualExpenses?.message?.toString()}
      >
        <TextInput
          id="annualExpenses"
          name="annualExpenses"
          dataTestId="sole-trader-company-details_annual-expenses"
          ref={register()}
        />
      </Formgroup>

      {/* <AddressFormField
        dataTestId="company-details_registered-address"
        id="registeredAddress"
        label="Registered Address"
        rules={{
          required: 'Please enter the registered business address',
        }}
      /> */}

      <Formgroup>
        <Checkbox
          dataTestId="sole-trader-company-details_existing-vehicle"
          id="existing-vehicle"
          name="ExistingVehicle"
          label="Existing Vehicle Finance to be Replaced?"
          ref={register}
        />
      </Formgroup>
      <Formgroup
        controlId="vehicleRegistrationNumber"
        hint="Vehicle Registration Number"
        error={errors.vehicleRegistrationNumber?.message?.toString()}
      >
        <NumericInput
          dataTestId="sole-trader-company-details_vehicle-egistration-umber"
          id="vehicle-registration-number"
          type="tel"
          name="vehicleRegistrationNumber"
          ref={register()}
        />
      </Formgroup>
      <Formgroup
        controlId="monthlyAmountBeingReplaced"
        hint="Monthly Amount Being Replaced"
        error={errors.monthlyAmountBeingReplaced?.message?.toString()}
      >
        <TextInput
          dataTestId="sole-trader-company-details_monthly-amount-being-replaced"
          id="monthly-amount-being-replaced"
          name="monthlyAmountBeingReplaced"
          ref={register()}
        />
      </Formgroup>
      <Button
        color="primary"
        dataTestId="sole-trader-company-details_continue"
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
};

export default SoleTraderCompanyDetailsFormFields;
