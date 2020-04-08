import React, { FC, memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardCircleSharp';
import FormGroup from '@vanarama/uibook/packages/ui-components/src/components/molecules/formgroup';
import Tile from '@vanarama/uibook/packages/ui-components/src/components/molecules/tile';
import Input from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput/';
import CheckBox from '@vanarama/uibook/packages/ui-components/src/components/atoms/checkbox/';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button/';
import Text from '@vanarama/uibook/packages/ui-components/src/components/atoms/text';
import Heading from '@vanarama/uibook/packages/ui-components/src/components/atoms/heading';
import {
  Grid,
  Column,
} from '@vanarama/uibook/packages/ui-components/src/components/molecules/grid';
import { IIncomeCalculatorProps, IIncomeCalculatorObject } from './interfaces';

const IncomeCalculator: FC<IIncomeCalculatorProps> = memo(props => {
  const { id, className, data, onSubmit } = props;
  const { handleSubmit, control, getValues, watch, setValue } = useForm<
    IIncomeCalculatorObject
  >({
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

  const totalCalculatedExpense = (
    phoneAndInternet: string,
    mortgageOrRent: string,
    creditCardPayments: string,
    insurance: string,
    foodAndClothes: string,
    studentLoans: string,
    utilities: string,
    carFinance: string,
    fuel: string,
    otherCredit: string,
  ) => {
    const netCalculatedExpense: number =
      Number(mortgageOrRent) +
      Number(phoneAndInternet) +
      Number(creditCardPayments) +
      Number(insurance) +
      Number(foodAndClothes) +
      Number(studentLoans) +
      Number(utilities) +
      Number(carFinance) +
      Number(fuel) +
      Number(otherCredit);

    return netCalculatedExpense;
  };

  const netIncome = (
    averageMonthlyIncome: string,
    phoneAndInternet: string,
    mortgageOrRent: string,
    creditCardPayments: string,
    insurance: string,
    foodAndClothes: string,
    studentLoans: string,
    utilities: string,
    carFinance: string,
    fuel: string,
    otherCredit: string,
  ) => {
    return (
      Number(averageMonthlyIncome) -
      totalCalculatedExpense(
        phoneAndInternet,
        mortgageOrRent,
        creditCardPayments,
        insurance,
        foodAndClothes,
        studentLoans,
        utilities,
        carFinance,
        fuel,
        otherCredit,
      )
    );
  };

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e[0].target;
    const inputValue = type === 'checkbox' ? checked : value;
    setValue(name, inputValue);

    const {
      averageMonthlyIncome,
      phoneAndInternet,
      mortgageOrRent,
      creditCardPayments,
      insurance,
      foodAndClothes,
      studentLoans,
      utilities,
      carFinance,
      fuel,
      otherCredit,
    } = getValues();

    totalCalculatedExpenseValue = totalCalculatedExpense(
      phoneAndInternet,
      mortgageOrRent,
      creditCardPayments,
      insurance,
      foodAndClothes,
      studentLoans,
      utilities,
      carFinance,
      fuel,
      otherCredit,
    );
    setValue('totalMonthlyExpenses', totalCalculatedExpenseValue);

    netIncomeValue = netIncome(
      averageMonthlyIncome,
      phoneAndInternet,
      mortgageOrRent,
      creditCardPayments,
      insurance,
      foodAndClothes,
      studentLoans,
      utilities,
      carFinance,
      fuel,
      otherCredit,
    );
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
      <Heading color="black" size="xlarge">
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
            >
              <Controller
                id="averageMonthlyIncome"
                name="averageMonthlyIncome"
                prefix="£"
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
                as={Input}
                control={control}
                value={totalCalculatedExpenseValue}
                onChange={handleChange}
                disabled
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
                as={Input}
                control={control}
                value={netIncomeValue}
                onChange={handleChange}
                disabled
              />
            </FormGroup>
          </Column>
        </Grid>
        <FormGroup>
          <Button
            type="submit"
            label="Continue"
            color="primary"
            icon={<ChevronForwardSharpIcon />}
            iconPosition="after"
          />
        </FormGroup>
      </div>
    </form>
  );
});

export default IncomeCalculator;
