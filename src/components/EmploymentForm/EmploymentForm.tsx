import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
import { FieldArray, Formik } from 'formik';
import React, { useContext } from 'react';
import { OlafContext } from '../../layouts/OLAFLayout/helpers';
import FCWithFragments from '../../utils/FCWithFragments';
import EmploymentFormFieldArray from './EmploymentFormFieldArray';
import {
  IEmploymentFormProps,
  IEmploymentFormValues as IFormValues,
} from './interfaces';
import { responseToInitialFormValues } from './mappers';
import validationSchema from './validationSchema';
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
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const EmploymentForm: FCWithFragments<IEmploymentFormProps> = ({
  dropDownData,
  employments,
  onSubmit,
}) => {
  const context = useContext(OlafContext);
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
            tag="h1"
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
            {`Thanks, we also need your employment history for the past ${context.requiredMonths /
              12} years so the funder can check your status.`}
          </Text>
          <FieldArray name="history">
            {arrayHelpers => (
              <EmploymentFormFieldArray
                arrayHelpers={arrayHelpers}
                dropDownData={dropDownData}
                values={formikProps.values}
                requiredMonths={context.requiredMonths}
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
