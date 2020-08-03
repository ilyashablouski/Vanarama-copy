import { gql, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import React from 'react';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import {
  GetDirectorDetailsQuery,
  GetDirectorDetailsQueryVariables,
} from '../../../generated/GetDirectorDetailsQuery';
import { isTruthy } from '../../utils/array';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import DirectorFieldArray from './DirectorFieldArray';
import {
  initialFormValues,
  validate,
  validationSchema,
  combineDirectorsData,
} from './helpers';
import { DirectorDetailsFormValues } from './interfaces';
import FCWithFragments from '../../utils/FCWithFragments';
import { CompanyAssociate } from '../../../generated/CompanyAssociate';
import { GetCompanyDirectorDetailsQuery_allDropDowns as CompanyDirectorDetails } from '../../../generated/GetCompanyDirectorDetailsQuery';

export const GET_DIRECTOR_DETAILS = gql`
  query GetDirectorDetailsQuery($companyNumber: String!) {
    companyOfficers(companyNumber: $companyNumber) {
      nodes {
        name
      }
    }
  }
`;

type IDirectorDetailsFormProps = {
  associates: CompanyAssociate[];
  dropdownData: CompanyDirectorDetails;
  companyNumber: string;
  onSubmit: (values: DirectorDetailsFormValues) => Promise<void>;
  directorUuid?: string;
};

const DirectorDetailsForm: FCWithFragments<IDirectorDetailsFormProps> = ({
  associates,
  companyNumber,
  onSubmit,
  dropdownData,
  directorUuid,
}) => {
  const { data, loading, error } = useCompanyOfficers(companyNumber);
  if (loading) {
    return <Loading />;
  }

  if (
    associates.length === 0 &&
    (error || !data || !data.companyOfficers.nodes)
  ) {
    return <ErrorMessage message="Could not load director details!" />;
  }

  const officers = data?.companyOfficers?.nodes?.filter(isTruthy) || [];
  const directors = combineDirectorsData(officers, associates);
  return (
    <Formik<DirectorDetailsFormValues>
      initialValues={initialFormValues(directors, directorUuid)}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={onSubmit}
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
          <DirectorFieldArray
            directors={directors}
            dropdownData={dropdownData}
          />
          <Button
            color="primary"
            dataTestId="vat-details_continue"
            disabled={isSubmitting}
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            label={isSubmitting ?
              'Saving...'
              : directorUuid ?
                'Save & Return'
                : 'Continue'}
            size="large"
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
};

DirectorDetailsForm.fragments = {
  associates: gql`
    fragment CompanyAssociate on PersonType {
      uuid
      title
      firstName
      lastName
      gender
      dateOfBirth
      noOfDependants
      businessShare
      roles {
        position
      }
      addresses {
        serviceId
        propertyStatus
        startedOn
        city
        lineOne
        lineTwo
        postcode
      }
    }
  `,
};

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

export default DirectorDetailsForm;
