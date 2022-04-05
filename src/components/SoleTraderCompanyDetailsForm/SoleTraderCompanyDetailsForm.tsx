import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useForm, FormContext } from 'react-hook-form';
import TextInput from 'core/atoms/textinput';
import Select from 'core/atoms/select';
import AddressFormField from '../AddressFormField/AddressFormField';
import { genMonths, genYears } from '../../utils/helpers';
import { validateCompanyAddress } from '../../utils/validation';
import {
  emailValidator,
  phoneNumberValidator,
  annualValidator,
  requiredTextFieldValidator,
} from '../../utils/inputValidators';
import {
  ISoleTraderCompanyDetailsFormValues,
  ISoleTraderCompanyDetailsFormProps,
} from './interfaces';
import NatureTypeahead from '../CompanyDetailsForm/NatureTypehead';
import Skeleton from '../Skeleton';
import { calculateDisposableIncome } from './utils';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
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
const Formgroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={5} />,
});

const isMonthInFuture = (month: string, year: string) => {
  const selectedMonth = parseInt(month, 10);
  const selectedYear = parseInt(year, 10);
  const currentDate = new Date();

  const result =
    selectedYear >= currentDate.getFullYear() &&
    selectedMonth > currentDate.getMonth() + 1;

  return result;
};

const SoleTraderCompanyDetailsForm: React.FC<ISoleTraderCompanyDetailsFormProps> = ({
  onSubmit,
  companyDetails,
  natureOfBusiness,
  setNatureOfBusiness,
}) => {
  const defaultValues = companyDetails;
  const methods = useForm<ISoleTraderCompanyDetailsFormValues>({
    mode: 'onBlur',
    defaultValues,
  });
  const { formState, errors, register, watch, reset } = methods;
  const existingVehicle: boolean = watch('existingVehicle');
  const tradingSinceYear = watch('tradingSinceYear');
  const tradingSinceMonth = watch('tradingSinceMonth');
  const annualTurnover = watch('annualTurnover');
  const annualCostOfSales = watch('annualCostOfSales');
  const annualExpenses = watch('annualExpenses');
  const monthlyAmountBeingReplaced = watch('monthlyAmountBeingReplaced');

  React.useEffect(() => {
    reset(defaultValues);
  }, [companyDetails, defaultValues, reset]);

  const disposableIncome: number = calculateDisposableIncome({
    annualTurnover,
    existingVehicle,
    annualCostOfSales,
    annualExpenses,
    monthlyAmountBeingReplaced,
  });

  const disposableIncomeError = useMemo(
    () =>
      disposableIncome < 0
        ? 'Based on your outgoings, it looks like you won’t be able to afford the monthly rentals on this lease.'
        : '',
    [disposableIncome],
  );

  return (
    <Form onSubmit={methods.handleSubmit(onSubmit)}>
      <Heading
        color="black"
        dataTestId="company-details_heading"
        size="xlarge"
        className="-mb-500"
        tag="h1"
      >
        Company Details
      </Heading>
      <Formgroup
        label="Trading Name"
        controlId="tradingName"
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
          label="Company Address"
          rules={{
            required: 'Please enter the registered business address',
            validate: (
              value: ISoleTraderCompanyDetailsFormValues['tradingAddress'],
            ) => validateCompanyAddress(value?.label),
          }}
          hint="Enter Postcode Or Just Start Typing Address"
        />
        <NatureTypeahead
          setNatureValue={setNatureOfBusiness}
          value={natureOfBusiness}
        />
      </FormContext>

      <Formgroup
        controlId="tradingSinceMonth"
        label="Trading Since"
        error={(
          errors.tradingSinceMonth || errors.tradingSinceYear
        )?.message?.toString()}
        className="-inline-preserved"
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
      <Formgroup error={disposableIncomeError}>
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
      </Formgroup>

      <Button
        color="primary"
        className="-mb-500"
        dataTestId="sole-trader-company-details_continue"
        disabled={formState.isSubmitting || Boolean(disposableIncomeError)}
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

export default SoleTraderCompanyDetailsForm;
