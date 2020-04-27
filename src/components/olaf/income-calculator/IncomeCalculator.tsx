import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Input from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import React, { FC, memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import validationSchema from './IncomeCalculator.validation';
import {
  IIncomeCalculatorFormValues as IFormValues,
  IIncomeCalculatorProps,
} from './interfaces';
import { calculateIncome } from './utils';

const IncomeCalculator: FC<IIncomeCalculatorProps> = memo(({ onSubmit }) => {
  const { handleSubmit, control, watch, errors } = useForm<IFormValues>({
    mode: 'onBlur',
    validationSchema,
    defaultValues: {
      averageMonthlyIncome: '',
      carFinance: '',
      creditCardPayments: '',
      foodAndClothes: '',
      fuel: '',
      futureMonthlyIncome: '',
      insurance: '',
      isFutureMonthlyIncome: false,
      monthlyHouseholdIncome: '',
      mortgageOrRent: '',
      otherCredit: '',
      phoneAndInternet: '',
      studentLoans: '',
      utilities: '',
    },
  });

  const values = watch();
  const { disposableIncome, monthlyExpenses } = calculateIncome(values);

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
      <div id="incomeCalculator">
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
                    type="number"
                    as={Input}
                    control={control}
                  />
                </FormGroup>
              )}
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
          </Column>
          <Column>
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
