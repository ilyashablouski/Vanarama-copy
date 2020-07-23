import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { FieldArray, Formik } from 'formik';
import React from 'react';
import FCWithFragments from '../../utils/FCWithFragments';
import EmploymentFormFieldArray from './EmploymentFormFieldArray';
import {
  IEmploymentFormProps,
  IEmploymentFormValues as IFormValues,
} from './interfaces';
import { responseToInitialFormValues } from './mappers';
import validationSchema from './validationSchema';

const EmploymentForm: FCWithFragments<IEmploymentFormProps> = ({
  dropDownData,
  employments,
  onSubmit,
}) => {
  return (
    <Formik<IFormValues>
      initialValues={responseToInitialFormValues(employments)}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formikProps => ( 
        <Form onSubmit={formikProps.handleSubmit}>
          <Heading
            dataTestId="employment-history-heading"
            tag="span"
            size="xlarge"
            color="black"
          >
            Employment History
          </Heading>
          <Text
            dataTestId="employment-history-lead"
            size="lead"
            color="darker"
            tag="span"
          >
            Thanks, we also need your employment history for the past 3 years so
            the funder can check your status.
          </Text>
          <FieldArray name="history">
            {arrayHelpers => (
              <EmploymentFormFieldArray
                arrayHelpers={arrayHelpers}
                dropDownData={dropDownData}
                values={formikProps.values}
              />
            )}
          </FieldArray>
          <Button
            color="primary"
            dataTestId="employment-history-submit"
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            disabled={formikProps.isSubmitting}
            label={formikProps.isSubmitting ? 'Saving...' : 'Continue'}
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
};

EmploymentForm.fragments = {
  dropDownData: gql`
    fragment EmploymentFormDropDownData on DropDownType {
      ...EmploymentFormFieldArrayDownData
    }
    ${EmploymentFormFieldArray.fragments.dropDownData}
  `,
  employments: gql`
    fragment EmploymentFormEmployment on EmploymentHistoryType {
      __typename
      uuid
      companyAddressServiceId
      companyAddressCity
      companyAddressLineOne
      companyAddressLineTwo
      companyAddressPostcode
      companyName
      contract
      employedSinceDate
      employmentStatus
      grossAnnualIncome
      jobTitle
      workPhoneNumber
    }
  `,
};

export default EmploymentForm;
