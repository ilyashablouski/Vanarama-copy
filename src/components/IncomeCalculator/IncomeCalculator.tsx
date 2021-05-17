import dynamic from 'next/dynamic';
import CheckBox from 'core/atoms/checkbox/';
import NumericInput from 'core/atoms/numeric-input';
import Input from 'core/atoms/textinput/';
import { gql } from '@apollo/client';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import validationSchema from './IncomeCalculator.validation';
import {
  IIncomeCalculatorFormValues as IFormValues,
  IIncomeCalculatorProps,
} from './interfaces';
import { responseToInitialFormValues } from './mappers';
import { calculateIncome } from './utils';
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
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={1} />,
});

const IncomeCalculator: FCWithFragments<IIncomeCalculatorProps> = ({
  expenditure,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    watch,
    errors,
    formState,
    triggerValidation,
  } = useForm<IFormValues>({
    mode: 'onBlur',
    validationSchema,
    defaultValues: responseToInitialFormValues(expenditure),
  });

  const values = watch();
  const { disposableIncome, monthlyExpenses } = calculateIncome(values);
  const disposableIncomeError = useMemo(
    () =>
      disposableIncome < 0
        ? 'Based on your outgoings, it looks like you won’t be able to afford the monthly rentals on this lease.'
        : '',
    [disposableIncome],
  );

  useEffect(() => {
    triggerValidation([]);
  }, [values.suitabilityConsent]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading color="black" size="xlarge" dataTestId="expenses" tag="h1">
        Expenses
      </Heading>
      <Text color="darker" size="lead">
        Excellent, now we just need to know your outgoings so we can make sure
        your new car is affordable.
      </Text>
      <FormGroup
        controlId="averageMonthlyIncome"
        label="Average Monthly Income"
        error={errors?.averageMonthlyIncome?.message?.toString()}
        className="olaf--expenses-input"
      >
        <Controller
          id="averageMonthlyIncome"
          name="averageMonthlyIncome"
          prefix="£"
          as={NumericInput}
          control={control}
        />
      </FormGroup>
      <FormGroup
        controlId="monthlyHouseholdIncome"
        label="Monthly Household Income"
        className="olaf--expenses-input"
      >
        <Controller
          id="monthlyHouseholdIncome"
          name="monthlyHouseholdIncome"
          prefix="£"
          as={NumericInput}
          control={control}
        />
      </FormGroup>
      <FormGroup
        controlId="isFutureMonthlyIncome"
        label="Do You Anticipate Your Monthly Income Will Change?"
      >
        <Controller
          id="isFutureMonthlyIncome"
          name="isFutureMonthlyIncome"
          as={CheckBox}
          control={control}
          label="I am anticipating a change in my monthly income"
          checked={values.isFutureMonthlyIncome}
          dataTestId="futureMonthlyIncome"
        />
        {values.isFutureMonthlyIncome && (
          <FormGroup
            controlId="futureMonthlyIncome"
            label="Future Monthly Income"
          >
            <Controller
              id="futureMonthlyIncome"
              name="futureMonthlyIncome"
              prefix="£"
              as={NumericInput}
              control={control}
            />
          </FormGroup>
        )}
      </FormGroup>

      <div className="olaf--expenses-tile">
        <FormGroup
          controlId="mortgageOrRent"
          label="Mortgage or Rent"
          className="olaf--expenses-input"
          error={errors?.mortgageOrRent?.message?.toString()}
        >
          <Controller
            id="mortgageOrRent"
            name="mortgageOrRent"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="phoneAndInternet"
          label="Phone and Internet"
          className="olaf--expenses-input"
          error={errors?.phoneAndInternet?.message?.toString()}
        >
          <Controller
            id="phoneAndInternet"
            name="phoneAndInternet"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="creditCardPayments"
          label="Credit Card Payments"
          className="olaf--expenses-input"
          error={errors?.creditCardPayments?.message?.toString()}
        >
          <Controller
            id="creditCardPayments"
            name="creditCardPayments"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="utilities"
          label="Utilities"
          className="olaf--expenses-input"
          error={errors?.utilities?.message?.toString()}
        >
          <Controller
            id="utilities"
            name="utilities"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="insurance"
          label="Insurance"
          className="olaf--expenses-input"
          error={errors?.insurance?.message?.toString()}
        >
          <Controller
            id="insurance"
            name="insurance"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="carFinance"
          label="Car Finance"
          className="olaf--expenses-input"
          error={errors?.carFinance?.message?.toString()}
        >
          <Controller
            id="carFinance"
            name="carFinance"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="foodAndClothes"
          label="Food and Clothes"
          className="olaf--expenses-input"
          error={errors?.foodAndClothes?.message?.toString()}
        >
          <Controller
            id="foodAndClothes"
            name="foodAndClothes"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="fuel"
          label="Fuel"
          className="olaf--expenses-input"
          error={errors?.fuel?.message?.toString()}
        >
          <Controller
            id="fuel"
            name="fuel"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="studentLoans"
          label="Student Loan"
          className="olaf--expenses-input"
          error={errors?.studentLoans?.message?.toString()}
        >
          <Controller
            id="studentLoans"
            name="studentLoans"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
        <FormGroup
          controlId="otherCredit"
          label="Other Credit"
          className="olaf--expenses-input"
          error={errors?.otherCredit?.message?.toString()}
        >
          <Controller
            id="otherCredit"
            name="otherCredit"
            prefix="£"
            as={NumericInput}
            control={control}
          />
        </FormGroup>
      </div>
      <FormGroup
        controlId="totalMonthlyExpenses"
        label="Total Monthly Expenses"
        className="olaf--expenses-input -calculated"
      >
        <Input
          id="totalMonthlyExpenses"
          name="totalMonthlyExpenses"
          prefix="£"
          type="number"
          value={String(monthlyExpenses)}
          // Need as there is currently no `readOnly` prop
          onChange={() => {}}
          calculated
        />
      </FormGroup>

      <FormGroup
        controlId="netDisposableIncome"
        label="Net Disposable Income"
        className="olaf--expenses-input -calculated"
        error={disposableIncomeError}
      >
        <Input
          id="netDisposableIncome"
          name="netDisposableIncome"
          prefix="£"
          type="number"
          value={String(disposableIncome)}
          // Need as there is currently no `readOnly` prop
          onChange={() => {}}
          calculated
        />
      </FormGroup>
      <FormGroup
        controlId="suitabilityConsent"
        label=""
        error={errors?.suitabilityConsent?.message?.toString()}
      >
        <Controller
          id="suitabilityConsent"
          name="suitabilityConsent"
          as={CheckBox}
          control={control}
          label="Given the level of finance being proposed, I am happy that I will be able to afford to make repayments without creating undue hardship now and into the future."
          checked={values.suitabilityConsent}
          dataTestId="suitabilityConsent"
        />
        (Before answering this you should consider the consequences of changes
        in your personal circumstances e.g. the end of a work contract,
        retirement, redundancy and or a significant increase in mortgage
        interest rates during the term of the agreement)
      </FormGroup>
      <FormGroup>
        <Button
          type="submit"
          label={formState.isSubmitting ? 'Saving...' : 'Continue'}
          disabled={
            formState.isSubmitting ||
            !formState.isValid ||
            Boolean(disposableIncomeError)
          }
          color="teal"
          icon={<ChevronForwardSharp />}
          iconColor="white"
          iconPosition="after"
          dataTestId="continue"
          size="large"
        />
      </FormGroup>
    </Form>
  );
};

IncomeCalculator.fragments = {
  expenditure: gql`
    fragment IncomeCalculatorExpenditure on IncomeAndExpenseType {
      __typename
      uuid
      anticipateMonthlyIncomeChange
      averageMonthlyIncome
      householdIncome
      futureMonthlyIncome
      mortgageOrRent
      utilities
      insurance
      phoneAndInternet
      creditCardPayments
      carFinance
      foodAndClothes
      fuel
      studentLoan
      otherCredit
      suitabilityConsent
    }
  `,
};

export default IncomeCalculator;
