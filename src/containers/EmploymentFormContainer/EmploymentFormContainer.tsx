import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import {
  GetEmploymentContainerDataQuery as Query,
  GetEmploymentContainerDataQueryVariables as QueryVariables,
} from '../../../generated/GetEmploymentContainerDataQuery';
import EmploymentForm from '../../components/EmploymentForm/EmploymentForm';

interface IProps {
  partyId: string;
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

const EmploymentFormContainer: React.FC<IProps> = ({ partyId }) => {
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_EMPLOYMENT_CONTAINER_DATA,
    { variables: { id: partyId } },
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

  return <EmploymentForm dropDownData={data.allDropDowns} />;
};

export default EmploymentFormContainer;
