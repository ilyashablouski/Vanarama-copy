import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { FieldArray, Formik, useFormikContext } from 'formik';
import { gql } from '@apollo/client';
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
import { OlafContext } from '../../layouts/OLAFLayout/helpers';
import Skeleton from '../Skeleton';
import FormikTypeAheadField from '../FormikTypeAhead/FormikTypeAheadField';

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
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const selectButtonLabel = (isSubmitting: boolean, isEdited: boolean) => {
  if (isSubmitting) {
    return 'Saving...';
  }
  return isEdited ? 'Save & Return' : 'Continue';
};

const AnnualIncomeField: React.FC = () => {
  const {
    values: { annualIncome },
    touched,
    setFieldValue,
  } = useFormikContext<ISoleTraderDetailsFormValues>();

  React.useEffect(() => {
    if (touched.annualIncome) {
      setFieldValue('avgMonthlyIncome', Math.round((annualIncome || 0) / 12));
    }
  }, [annualIncome, touched.annualIncome, setFieldValue]);
  return (
    <FormikNumericField
      name="annualIncome"
      label="Annual Income"
      dataTestId="annual-income"
      prefix="£"
    />
  );
};

const SoleTraderDetailsForm: FCWithFragments<ISoleTraderDetailsProps> = ({
  person,
  soleTrader,
  onSubmit,
  isEdited,
  dropdownData,
}) => {
  const { requiredMonths } = useContext(OlafContext);

  return (
    <Formik<ISoleTraderDetailsFormValues>
      initialValues={responseToInitialFormValues(person, soleTrader)}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <Form onSubmit={formikProps.handleSubmit}>
          <Heading
            color="black"
            size="xlarge"
            tag="h1"
            dataTestId="soleTrader-details-heading"
          >
            Sole Trader Details
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
            className="-inline-preserved"
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
          <hr className="mv-400" />
          <Heading color="dark" size="small">
            Address History
          </Heading>
          <Text color="dark" size="small">
            Please provide your personal address history for the past{' '}
            {requiredMonths / 12} years.
          </Text>
          <FieldArray name="history">
            {arrayHelpers => (
              <AddressFormFieldArray
                arrayHelpers={arrayHelpers}
                dropDownData={dropdownData}
                values={formikProps.values}
                requiredMonths={requiredMonths}
              />
            )}
          </FieldArray>
          <FormikTypeAheadField
            name="occupation"
            label="Occupation"
            hint="Start typing your job title & then select from the list"
          />
          <AnnualIncomeField />
          <FormikNumericField
            name="avgMonthlyIncome"
            label="Average Monthly Income"
            dataTestId="avg-monthly-income"
            prefix="£"
            disabled
          />
          <FormikNumericField
            name="monthlyMortgagePayments"
            label="Monthly Mortgage Payments"
            dataTestId="monthly-Mortgage-payments"
            prefix="£"
          />
          <FormikNumericField
            name="monthlyStudentPayments"
            label="Monthly Student Loan Payments"
            dataTestId="monthly-student-payments"
            prefix="£"
          />
          <FormikCheckBoxField
            label="Do you expect your monthly income to decrease?"
            id="monthlyIncomeChange"
            name="monthlyIncomeChange"
            checkboxLabel="I am anticipating a change in my monthly income"
            dataTestId="income-change"
            isChecked={formikProps.values.monthlyIncomeChange}
          />
          {formikProps.values.monthlyIncomeChange && (
            <FormikNumericField
              name="futureMonthlyIncome"
              label="Future Monthly Income"
              dataTestId="future-monthly-income"
              prefix="£"
            />
          )}
          <FormikCheckBoxField
            label=""
            id="suitabilityConsent"
            name="suitabilityConsent"
            checkboxLabel="Given the level of finance being proposed, I am happy that I will be able to afford to make repayments without creating undue hardship now and into the future."
            dataTestId="suitabilityConsent"
            isChecked={formikProps.values.suitabilityConsent}
          />
          <Text tag="p">
            (Before answering this you should consider the consequences of
            changes in your personal circumstances e.g. the end of a work
            contract, retirement, redundancy and or a significant increase in
            mortgage interest rates during the term of the agreement)
          </Text>
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
        gender
        dateOfBirth
        countryOfBirth
        nationality
        addresses {
          __typename
          serviceId
          lineOne
          lineTwo
          postcode
          city
          propertyStatus
          startedOn
        }
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
          suitabilityConsent
        }
        uuid
      }
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
      dateOfBirth
      countryOfBirth
      nationality
      addresses {
        __typename
        serviceId
        lineOne
        lineTwo
        postcode
        city
        propertyStatus
        startedOn
      }
      maritalStatus
      noOfAdultsInHousehold
      noOfDependants
    }
  `,
};

export default SoleTraderDetailsForm;
