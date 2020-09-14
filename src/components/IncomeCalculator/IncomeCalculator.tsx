import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Input from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { gql } from '@apollo/client';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import FCWithFragments from '../../utils/FCWithFragments';
import validationSchema from './IncomeCalculator.validation';
import {
  IIncomeCalculatorFormValues as IFormValues,
  IIncomeCalculatorProps,
} from './interfaces';
import { responseToInitialFormValues } from './mappers';
import { calculateIncome } from './utils';

const IncomeCalculator: FCWithFragments<IIncomeCalculatorProps> = ({
  expenditure,
  onSubmit,
}) => {
  const { handleSubmit, control, watch, errors, formState } = useForm<
    IFormValues
  >({
    mode: 'onBlur',
    validationSchema,
    defaultValues: responseToInitialFormValues(expenditure),
  });

  const values = watch();
  const { disposableIncome, monthlyExpenses } = calculateIncome(values);
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
      <FormGroup>
        <Button
          type="submit"
          label={formState.isSubmitting ? 'Saving...' : 'Continue'}
          disabled={formState.isSubmitting}
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
    }
  `,
};

export default IncomeCalculator;
