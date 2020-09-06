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
import FormikSelectField from '../FormikSelectField/FormikSelectField';
import FormikDateField from '../FormikDateField/FormikDateField';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import AddressFormFieldArray from '../AddressForm/AddressFormFieldArray';
import { responseToInitialFormValues } from './mappers';
import {
  ISoleTraderDetailsProps,
  ISoleTraderDetailsFormValues,
} from './interfaces';

const selectButtonLabel = (isSubmitting: boolean, isEdited: boolean) => {
  if (isSubmitting) {
    return 'Saving...';
  }
  return isEdited ? 'Save & Return' : 'Continue';
};

const SoleTraderDetailsForm: FCWithFragments<ISoleTraderDetailsProps> = ({
  onSubmit,
  isEdited,
  dropDownData,
}) => {
  return (
    <Formik<ISoleTraderDetailsFormValues>
      initialValues={responseToInitialFormValues(addresses)}
      /* validationSchema={validationSchema}
      validate={validate} */
      onSubmit={onSubmit}
    >
      {formikProps => (
        <Form onSubmit={formikProps.handleSubmit}>
          <Heading color="black" size="xlarge">
            Director Details
          </Heading>

          <FormikSelectField name="title" label="Title">
            <OptionsWithFavourites options={dropDownData.titles} />
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
            <OptionsWithFavourites options={dropDownData.maritalStatus} />
          </FormikSelectField>

          <FormikSelectField name="nationality" label="Nationality">
            <OptionsWithFavourites options={dropDownData.nationality} />
          </FormikSelectField>

          <FormikSelectField
            name="numberOfDependants"
            label="Number of Dependants"
          >
            <OptionsWithFavourites options={dropDownData.adultsInHouse} />
          </FormikSelectField>

          <FormikSelectField
            name="numberOfDependants"
            label="Number of Dependants"
          >
            <OptionsWithFavourites options={dropDownData.noOfDependants} />
          </FormikSelectField>

          <FieldArray name="history">
            {arrayHelpers => (
              <AddressFormFieldArray
                arrayHelpers={arrayHelpers}
                dropDownData={dropDownData}
                values={formikProps.values}
              />
            )}
          </FieldArray>

          <FormikSelectField name="occupation" label="Occupation">
            <OptionsWithFavourites options={dropDownData.occupation} />
          </FormikSelectField>

          <FormikTextField
            name="annualIncome"
            label="Annual Income"
            dataTestId="annual-income"
          />

          <FormikTextField
            name="avgMonthlyIncome"
            label="Average Monthly Income"
            dataTestId="avg-monthly-income"
          />

          <FormikTextField
            name="monthlyMorgatgePayments"
            label="Monthly Mortgage Payments"
            dataTestId="monthly-Mortgage-payments"
          />

          <FormikTextField
            name="monthlyStudentPayments"
            label="Monthly Student Payments"
            dataTestId="monthly-student-payments"
          />

          <FormikTextField
            name="futureMonthlyIncome"
            label="Future Monthly Income"
            dataTestId="monthly-student-payments"
          />

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
  dropDownData: gql`
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
      }
      noOfDependants {
        __typename
        data
      }
      noOfAdultsInHousehold {
        __typename
        data
      }
      ...AddressFormFieldArrayDownData
    }
    ${AddressFormFieldArray.fragments.dropDownData}
  `,
};

export default SoleTraderDetailsForm;
