import React, { FC, memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import Input from '@vanarama/uibook/lib/components/atoms/textinput/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import {
  IIncomeCalculatorProps,
  IIncomeCalculatorFormValues,
} from './interfaces';

import validationSchema from './IncomeCalculator.validation';

const IncomeCalculator: FC<IIncomeCalculatorProps> = memo(props => {
  const { className, data, onSubmit } = props;
  const { handleSubmit, control, getValues, watch, setValue, errors } = useForm<
    IIncomeCalculatorFormValues
  >({
    mode: 'onBlur',
    validationSchema,
    defaultValues: {
      partyId: (data && data.partyId) || 1,
      averageMonthlyIncome: (data && data.averageMonthlyIncome) || '',
      monthlyHouseholdIncome: (data && data.monthlyHouseholdIncome) || '',
      futureMonthlyIncome: (data && data.futureMonthlyIncome) || '',
      isFutureMonthlyIncome: (data && data.isFutureMonthlyIncome) || false,
      mortgageOrRent: (data && data.mortgageOrRent) || '',
      phoneAndInternet: (data && data.phoneAndInternet) || '',
      creditCardPayments: (data && data.creditCardPayments) || '',
      insurance: (data && data.insurance) || '',
      foodAndClothes: (data && data.foodAndClothes) || '',
      studentLoans: (data && data.studentLoans) || '',
      utilities: (data && data.utilities) || '',
      carFinance: (data && data.carFinance) || '',
      fuel: (data && data.fuel) || '',
      otherCredit: (data && data.otherCredit) || '',
    },
  });

  let totalCalculatedExpenseValue;
  let netIncomeValue;

  const totalCalculatedExpense = (values: IIncomeCalculatorFormValues) => {
    const netCalculatedExpense =
      Number(values.mortgageOrRent) +
      Number(values.phoneAndInternet) +
      Number(values.creditCardPayments) +
      Number(values.insurance) +
      Number(values.foodAndClothes) +
      Number(values.studentLoans) +
      Number(values.utilities) +
      Number(values.carFinance) +
      Number(values.fuel) +
      Number(values.otherCredit);

    return netCalculatedExpense;
  };

  const netIncome = (values: IIncomeCalculatorFormValues) => {
    return Number(values.averageMonthlyIncome) - totalCalculatedExpense(values);
  };

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e[0].target;
    const inputValue = type === 'checkbox' ? checked : value;
    setValue(name, inputValue);

    const values = getValues();
    totalCalculatedExpenseValue = totalCalculatedExpense(values);
    setValue('totalMonthlyExpenses', totalCalculatedExpenseValue);

    netIncomeValue = netIncome(values);
    setValue('netDisposableIncome', netIncomeValue);

    return inputValue;
  };

  const isFutureMonthlyIncome = watch('isFutureMonthlyIncome');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="incomeCalculatorForm"
      className="form"
    >
      <Heading color="black" size="xlarge" dataTestId="expenses">
        Expenses
      </Heading>
      <Text color="darker" size="lead">
        Excellent, now we just need to know your outgoings so we can make sure
        your new car is affordable.
      </Text>
      <div id="incomeCalculator" className={className}>
        <Grid lg={2} md={2} sm={1}>
          <Column>
            <FormGroup
              controlId="averageMonthlyIncome"
              label="Average Monthly Income"
              error={errors?.averageMonthlyIncome?.message?.toString()}
            >
              <Controller
                id="averageMonthlyIncome"
                name="averageMonthlyIncome"
                prefix="£"
                type="number"
                as={Input}
                control={control}
                onChange={handleChange}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup
              controlId="monthlyHouseholdIncome"
              label="Monthly Household Income"
            >
              <Controller
                id="monthlyHouseholdIncome"
                name="monthlyHouseholdIncome"
                prefix="£"
                type="number"
                as={Input}
                control={control}
                onChange={handleChange}
              />
            </FormGroup>
          </Column>
          <Column md="row">
            <FormGroup label="Do You Anticipate Your Monthly Income Will Change?">
              <Controller
                id="isFutureMonthlyIncome"
                name="isFutureMonthlyIncome"
                as={CheckBox}
                control={control}
                label="Yes"
                checked={isFutureMonthlyIncome}
                onChange={handleChange}
                dataTestId="futureMonthlyIncome"
              />
              {isFutureMonthlyIncome ? (
                <FormGroup
                  controlId="futureMonthlyIncome"
                  label="Future Monthly Income"
                >
                  <Controller
                    id="futureMonthlyIncome"
                    name="futureMonthlyIncome"
                    prefix="£"
                    type="number"
                    as={Input}
                    control={control}
                    onChange={handleChange}
                  />
                </FormGroup>
              ) : null}
            </FormGroup>
          </Column>
        </Grid>

        <Tile color="lighter">
          <Grid lg={2} md={2} sm={1}>
            <Column>
              <FormGroup controlId="mortgageOrRent" label="Mortgage or Rent">
                <Controller
                  id="mortgageOrRent"
                  name="mortgageOrRent"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup
                controlId="phoneAndInternet"
                label="Phone and Internet"
              >
                <Controller
                  id="phoneAndInternet"
                  name="phoneAndInternet"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup
                controlId="creditCardPayments"
                label="Credit Card Payments"
              >
                <Controller
                  id="creditCardPayments"
                  name="creditCardPayments"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup controlId="utilities" label="Utilities">
                <Controller
                  id="utilities"
                  name="utilities"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup controlId="insurance" label="Insurance">
                <Controller
                  id="insurance"
                  name="insurance"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup controlId="carFinance" label="Car Finance">
                <Controller
                  id="carFinance"
                  name="carFinance"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup controlId="foodAndClothes" label="Food and Clothes">
                <Controller
                  id="foodAndClothes"
                  name="foodAndClothes"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup controlId="fuel" label="Fuel">
                <Controller
                  id="fuel"
                  name="fuel"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup controlId="studentLoans" label="Student Loan">
                <Controller
                  id="studentLoans"
                  name="studentLoans"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
            <Column>
              <FormGroup controlId="otherCredit" label="Other Credit">
                <Controller
                  id="otherCredit"
                  name="otherCredit"
                  prefix="£"
                  type="number"
                  as={Input}
                  control={control}
                  onChange={handleChange}
                />
              </FormGroup>
            </Column>
          </Grid>
        </Tile>

        <Grid lg={2} md={2} sm={1}>
          <Column>
            <FormGroup
              controlId="totalMonthlyExpenses"
              label="Total Monthly Expenses"
            >
              <Controller
                id="totalMonthlyExpenses"
                name="totalMonthlyExpenses"
                prefix="£"
                type="number"
                as={Input}
                control={control}
                value={totalCalculatedExpenseValue}
                onChange={handleChange}
                calculated
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup
              controlId="netDisposableIncome"
              label="Net Disposable Income"
            >
              <Controller
                id="netDisposableIncome"
                name="netDisposableIncome"
                prefix="£"
                type="number"
                as={Input}
                control={control}
                value={netIncomeValue}
                onChange={handleChange}
                calculated
              />
            </FormGroup>
          </Column>
        </Grid>
        <FormGroup>
          <Button
            type="submit"
            label="Continue"
            color="primary"
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            dataTestId="continue"
          />
        </FormGroup>
      </div>
    </form>
  );
});

export default IncomeCalculator;
