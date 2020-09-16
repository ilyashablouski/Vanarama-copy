import React from 'react';
import { FieldArray, Formik } from 'formik';
import { gql } from '@apollo/client';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Form from '@vanarama/uibook/lib/components/organisms/form';
// import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import FCWithFragments from '../../utils/FCWithFragments';
import FormikTextField from '../FormikTextField/FormikTextField';
import FormikCheckBoxField from '../FormikCheckboxField/FormikCheckboxField';
import FormikSelectField from '../FormikSelectField/FormikSelectField';
import FormikDateField from '../FormikDateField/FormikDateField';
import FormikNumericField from '../FormikNumericField/FormikNumericField';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import AddressFormFieldArray from '../AddressForm/AddressFormFieldArray';
import { responseToInitialFormValues } from './mappers';
import {
  ISoleTraderDetailsProps,
  ISoleTraderDetailsFormValues,
} from './interfaces';
import { validationSchema } from './helpers';

const selectButtonLabel = (isSubmitting: boolean, isEdited: boolean) => {
  if (isSubmitting) {
    return 'Saving...';
  }
  return isEdited ? 'Save & Return' : 'Continue';
};

const SoleTraderDetailsForm: FCWithFragments<ISoleTraderDetailsProps> = ({
  person,
  soleTrader,
  addresses,
  onSubmit,
  isEdited,
  dropdownData,
}) => {
  return (
    <Formik<ISoleTraderDetailsFormValues>
      initialValues={responseToInitialFormValues(person, soleTrader, addresses)}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <Form onSubmit={formikProps.handleSubmit}>
          <Heading color="black" size="xlarge" tag="h1">
            SoleTrader Details
          </Heading>

          <FormikSelectField name="title" label="Title">
            <OptionsWithFavourites options={dropdownData.titles} />
          </FormikSelectField>

          <FormikTextField
            name="firstName"
            label="First Name"
            dataTestId="first-name"
          />

          <FormikTextField
            name="lastName"
            label="Last Name"
            dataTestId="last-name"
          />

          <FormikSelectField name="gender" label="Gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer Not To Say">Prefer Not To Say</option>
          </FormikSelectField>

          <FormikDateField
            label="Date Of Birth"
            fieldNames={['dayOfBirth', 'monthOfBirth', 'yearOfBirth']}
          />

          <FormikTextField
            name="placeOfBirth"
            label="Place Of Birth"
            dataTestId="place-of-birth"
          />

          <FormikSelectField name="maritalStatus" label="Marital Status">
            <OptionsWithFavourites options={dropdownData.maritalStatuses} />
          </FormikSelectField>

          <FormikSelectField name="nationality" label="Nationality">
            <OptionsWithFavourites options={dropdownData.nationalities} />
          </FormikSelectField>

          <FormikTextField
            name="email"
            label="Email"
            dataTestId="email-addr"
            disabled
          />

          <FormikSelectField
            name="adultsInHousehold"
            label="Adults Living in Household"
          >
            <OptionsWithFavourites
              options={dropdownData.noOfAdultsInHousehold}
            />
          </FormikSelectField>

          <FormikSelectField name="dependants" label="Number of Dependants">
            <OptionsWithFavourites options={dropdownData.noOfDependants} />
          </FormikSelectField>

          <FieldArray name="history">
            {arrayHelpers => (
              <AddressFormFieldArray
                arrayHelpers={arrayHelpers}
                dropDownData={dropdownData}
                values={formikProps.values}
              />
            )}
          </FieldArray>

          <FormikSelectField name="occupation" label="Occupation">
            <OptionsWithFavourites options={dropdownData.occupations} />
          </FormikSelectField>

          <FormikNumericField
            name="annualIncome"
            label="Annual Income"
            dataTestId="annual-income"
            prefix="£"
          />

          <FormikNumericField
            name="avgMonthlyIncome"
            label="Average Monthly Income"
            dataTestId="avg-monthly-income"
            prefix="£"
          />

          <FormikNumericField
            name="monthlyMortgagePayments"
            label="Monthly Mortgage Payments"
            dataTestId="monthly-Mortgage-payments"
            prefix="£"
          />

          <FormikNumericField
            name="monthlyStudentPayments"
            label="£ Monthly Student Payments"
            dataTestId="monthly-student-payments"
            prefix="£"
          />

          <FormikCheckBoxField
            label="Does you expect your monthly income to decrease?"
            id="monthlyIncomeChange"
            name="monthlyIncomeChange"
            checkboxLabel="I am anticipating a change in my monthly income"
            dataTestId="income-change"
          />

          {formikProps.values.monthlyIncomeChange && (
            <FormikNumericField
              name="futureMonthlyIncome"
              label="Future Monthly Income"
              dataTestId="future-monthly-income"
              prefix="£"
            />
          )}

          <Button
            color="primary"
            dataTestId="sole-trader-details"
            disabled={formikProps.isSubmitting}
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            label={selectButtonLabel(formikProps.isSubmitting, isEdited)}
            size="large"
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
};

SoleTraderDetailsForm.fragments = {
  dropdownData: gql`
    fragment SoleTraderDetailsDropDownData on DropDownType {
      __typename
      titles {
        __typename
        data
        favourites
      }
      countries {
        __typename
        data
        favourites
      }
      nationalities {
        __typename
        data
        favourites
      }
      maritalStatuses {
        __typename
        data
        favourites
      }
      noOfDependants {
        __typename
        data
        favourites
      }
      noOfAdultsInHousehold {
        __typename
        data
        favourites
      }
      occupations {
        __typename
        data
        favourites
      }
      ...AddressFormFieldArrayDownData
    }
    ${AddressFormFieldArray.fragments.dropDownData}
  `,
  soleTrader: gql`
    fragment SoleTraderAssociate on CompanyType {
      __typename
      uuid
      associates {
        __typename
        title
        firstName
        lastName
        emailAddresses {
          __typename
          primary
          value
        }
        dateOfBirth
        countryOfBirth
        nationality
        maritalStatus
        noOfAdultsInHousehold
        noOfDependants
        occupation
        incomeAndExpense {
          __typename
          averageMonthlyIncome
          annualIncome
          totalMonthlyExpenses
          mortgageOrRent
          studentLoan
          anticipateMonthlyIncomeChange
          futureMonthlyIncome
        }
        uuid
      }
    }
    ${SoleTraderDetailsForm.fragments.addresses}
  `,
  addresses: gql`
    fragment SoleTraderDetailsFormAddresses on AddressType {
      __typename
      serviceId
      lineOne
      lineTwo
      postcode
      city
      propertyStatus
      startedOn
    }
  `,
  person: gql`
    fragment SoleTraderPerson on PersonType {
      __typename
      uuid
      title
      firstName
      lastName
      gender
      emailAddresses {
        __typename
        primary
        value
      }
      dateOfBirth
      countryOfBirth
      nationality
      maritalStatus
      noOfAdultsInHousehold
      noOfDependants
    }
  `,
};

export default SoleTraderDetailsForm;
