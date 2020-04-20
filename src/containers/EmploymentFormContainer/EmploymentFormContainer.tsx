import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import {
  GetEmploymentContainerDataQuery as Query,
  GetEmploymentContainerDataQueryVariables as QueryVariables,
} from '../../../generated/GetEmploymentContainerDataQuery';
import EmploymentForm from '../../components/EmploymentForm/EmploymentForm';

interface IProps {
  personId: string;
}

const GET_EMPLOYMENT_CONTAINER_DATA = gql`
  query GetEmploymentContainerDataQuery($id: ID!) {
    personById(id: $id) {
      id
      partyId
    }
    allDropDowns {
      ...EmploymentFormDropDownData
    }
  }
  ${EmploymentForm.fragments.dropDownData}
`;

const EmploymentFormContainer: React.FC<IProps> = ({ personId }) => {
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_EMPLOYMENT_CONTAINER_DATA,
    { variables: { id: personId } },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if (!data || !data.allDropDowns) {
    return null;
  }

  return (
    <EmploymentForm
      dropDownData={data.allDropDowns}
      onSubmit={async values => {
        // eslint-disable-next-line no-console
        console.log(values);
      }}
    />
  );
};

export default EmploymentFormContainer;
