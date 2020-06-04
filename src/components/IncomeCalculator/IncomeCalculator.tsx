import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Input from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
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
      <Heading color="black" size="xlarge" dataTestId="expenses">
        Expenses
      </Heading>
      <Text color="darker" size="lead">
        Excellent, now we just need to know your outgoings so we can make sure
        your new car is affordable.
      </Text>
      <div id="incomeCalculator">
        <div>
          <div>
            <FormGroup
              controlId="averageMonthlyIncome"
              label="Average Monthly Income"
              error={errors?.averageMonthlyIncome?.message?.toString()}
            >
              <Controller
                id="averageMonthlyIncome"
                name="averageMonthlyIncome"
                prefix="£"
                as={NumericInput}
                control={control}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              controlId="monthlyHouseholdIncome"
              label="Monthly Household Income"
            >
              <Controller
                id="monthlyHouseholdIncome"
                name="monthlyHouseholdIncome"
                prefix="£"
                as={NumericInput}
                control={control}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              controlId="isFutureMonthlyIncome"
              label="Do You Anticipate Your Monthly Income Will Change?"
            >
              <Controller
                id="isFutureMonthlyIncome"
                name="isFutureMonthlyIncome"
                as={CheckBox}
                control={control}
                label="Yes"
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
          </div>
        </div>

        <Tile color="lighter">
          <div>
            <div>
              <FormGroup controlId="mortgageOrRent" label="Mortgage or Rent">
                <Controller
                  id="mortgageOrRent"
                  name="mortgageOrRent"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup
                controlId="phoneAndInternet"
                label="Phone and Internet"
              >
                <Controller
                  id="phoneAndInternet"
                  name="phoneAndInternet"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup
                controlId="creditCardPayments"
                label="Credit Card Payments"
              >
                <Controller
                  id="creditCardPayments"
                  name="creditCardPayments"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup controlId="utilities" label="Utilities">
                <Controller
                  id="utilities"
                  name="utilities"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup controlId="insurance" label="Insurance">
                <Controller
                  id="insurance"
                  name="insurance"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup controlId="carFinance" label="Car Finance">
                <Controller
                  id="carFinance"
                  name="carFinance"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup controlId="foodAndClothes" label="Food and Clothes">
                <Controller
                  id="foodAndClothes"
                  name="foodAndClothes"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup controlId="fuel" label="Fuel">
                <Controller
                  id="fuel"
                  name="fuel"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup controlId="studentLoans" label="Student Loan">
                <Controller
                  id="studentLoans"
                  name="studentLoans"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup controlId="otherCredit" label="Other Credit">
                <Controller
                  id="otherCredit"
                  name="otherCredit"
                  prefix="£"
                  as={NumericInput}
                  control={control}
                />
              </FormGroup>
            </div>
          </div>
        </Tile>

        <div>
          <div>
            <FormGroup
              controlId="totalMonthlyExpenses"
              label="Total Monthly Expenses"
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
          </div>
          <div>
            <FormGroup
              controlId="netDisposableIncome"
              label="Net Disposable Income"
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
          </div>
        </div>
        <FormGroup>
          <Button
            type="submit"
            label={formState.isSubmitting ? 'Saving...' : 'Continue'}
            disabled={formState.isSubmitting}
            color="primary"
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            dataTestId="continue"
          />
        </FormGroup>
      </div>
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
