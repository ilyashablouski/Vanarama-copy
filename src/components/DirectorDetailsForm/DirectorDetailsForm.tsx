import { gql, useQuery } from '@apollo/client';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { Formik } from 'formik';
import React from 'react';
import {
  GetDirectorDetailsQuery,
  GetDirectorDetailsQueryVariables,
} from '../../../generated/GetDirectorDetailsQuery';
import { isTruthy } from '../../utils/array';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import DirectorFieldArray from './DirectorFieldArray';
import DirectorFields from './DirectorFields';
import { initialFormValues, validate, validationSchema } from './helpers';
import { DirectorDetailsFormValues } from './interfaces';

export const GET_DIRECTOR_DETAILS = gql`
  query GetDirectorDetailsQuery($companyNumber: String!) {
    allDropDowns {
      ...DirectorFieldsDropDownData
    }
    companyOfficers(companyNumber: $companyNumber) {
      nodes {
        name
      }
    }
  }
  ${DirectorFields.fragments.dropDownData}
`;

type Props = {
  companyNumber: string;
};

export default function DirectorDetailsForm({ companyNumber }: Props) {
  const { data, loading, error } = useCompanyOfficers(companyNumber);
  if (loading) {
    return <Loading />;
  }

  if (error || !data || !data.allDropDowns || !data.companyOfficers.nodes) {
    return <ErrorMessage message="Could not load director details!" />;
  }

  const dropdownData = data.allDropDowns;
  const officers = data.companyOfficers.nodes.filter(isTruthy);
  return (
    <Formik<DirectorDetailsFormValues>
      initialValues={initialFormValues(officers)}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={console.log} // eslint-disable-line no-console
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Heading color="black" size="xlarge">
            Director Details
          </Heading>
          <Text color="black" size="regular">
            Select Directors that combined represent at least 25% of company
            ownership:
          </Text>
          <DirectorFieldArray dropdownData={dropdownData} officers={officers} />
          <Button
            color="primary"
            dataTestId="vat-details_continue"
            disabled={isSubmitting}
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            label={isSubmitting ? 'Saving...' : 'Continue'}
            size="large"
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
}

function useCompanyOfficers(companyNumber: string) {
  return useQuery<GetDirectorDetailsQuery, GetDirectorDetailsQueryVariables>(
    GET_DIRECTOR_DETAILS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        companyNumber,
      },
    },
  );
}
