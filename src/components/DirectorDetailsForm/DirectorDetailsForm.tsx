import { gql, useQuery } from '@apollo/client';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { FieldArray, Formik } from 'formik';
import React from 'react';
import { DirectorFieldsOfficer } from '../../../generated/DirectorFieldsOfficer';
import {
  GetDirectorDetailsQuery,
  GetDirectorDetailsQueryVariables,
} from '../../../generated/GetDirectorDetailsQuery';
import DirectorFields from './DirectorFields';
import {
  initialValuesWithSingleDirector,
  validationSchema,
  initialValues,
  validate,
} from './helpers';
import { DirectorDetailsFormValues } from './interfaces';

export const GET_DIRECTOR_DETAILS = gql`
  query GetDirectorDetailsQuery($companyNumber: String!) {
    allDropDowns {
      ...DirectorFieldsDropDownData
    }
    companyOfficers(companyNumber: $companyNumber) {
      nodes {
        ...DirectorFieldsOfficer
      }
    }
  }
  ${DirectorFields.fragments.dropDownData}
  ${DirectorFields.fragments.allOfficers}
`;

type Props = {
  companyNumber: string;
};

const DirectorDetailsForm = ({ companyNumber }: Props) => {
  const { data, loading, error } = useCompanyOfficers(companyNumber);
  if (loading) {
    return <Loading />;
  }

  if (
    error ||
    !data ||
    !data.allDropDowns ||
    !data.companyOfficers ||
    !data.companyOfficers.nodes
  ) {
    return <p>Error: Could not load director details!</p>;
  }

  const validOfficers = data.companyOfficers.nodes.filter(
    (_): _ is DirectorFieldsOfficer => Boolean(_),
  );

  const formInitialValues =
    validOfficers.length === 1
      ? initialValuesWithSingleDirector(validOfficers[0])
      : initialValues;

  return (
    <Formik<DirectorDetailsFormValues>
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={console.log} // eslint-disable-line no-console
    >
      {({ handleSubmit, isSubmitting, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Heading color="black" size="xlarge">
            Director Details
          </Heading>
          <Text color="black" size="regular">
            Select Directors that combined represent at least 25% of company
            ownership:
          </Text>
          <FieldArray name="directors">
            {() =>
              values.directors.map((_, index) => (
                <DirectorFields
                  key={index} // eslint-disable-line react/no-array-index-key
                  allOfficers={validOfficers}
                  dropDownData={data.allDropDowns!}
                  hideSelection={validOfficers.length === 1}
                  index={index}
                />
              ))
            }
          </FieldArray>
          {errors.totalPercentage &&
            touched.directors?.some(_ => _.shareOfBusiness) && (
              <Text tag="span" color="darker" size="regular">
                We require details of a director(s) with a combined shareholding
                of over 25%. Please add another director.
              </Text>
            )}
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
};

function useCompanyOfficers(companyNumber: string) {
  return useQuery<GetDirectorDetailsQuery, GetDirectorDetailsQueryVariables>(
    GET_DIRECTOR_DETAILS,
    {
      variables: {
        companyNumber,
      },
    },
  );
}

export default DirectorDetailsForm;
