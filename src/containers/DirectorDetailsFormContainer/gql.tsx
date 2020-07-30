import { gql, useQuery, useMutation } from '@apollo/client';
import {
  GetCompanyDirectorDetailsQuery as Query,
  GetCompanyDirectorDetailsQueryVariables as QueryVariables,
} from '../../../generated/GetCompanyDirectorDetailsQuery';
import {
  UpdateVatDetailsMutation as Mutation,
  UpdateVatDetailsMutationVariables as MutationVariables,
} from '../../../generated/UpdateVatDetailsMutation';
import DirectorDetailsForm from '../../components/DirectorDetailsForm/DirectorDetailsForm';
import DirectorFields from '../../components/DirectorDetailsForm/DirectorFields';

/**
 * NOTE: Unfotunately, it is not possible to get the officers for a company using only
 * its uuid. Instead, we have to do two queries on this page to fetch the data we need
 * i.e. `Query.companyByUuid` to get the `companyNumber`, then a subsequent `Query.companyOfficers`
 * query to get the officers.
 *
 * In an ideal world, the officers and company should be linked in the graph and fetchable
 * from a single request e.g.
 *
 *    query {
 *      companyByUuid(uuid: $uuid) {
 *        uuid
 *        officers(first: 10) {
 *          id
 *          name
 *        }
 *      }
 *    }
 */
export const GET_COMPANY_DIRECTOR_DETAILS = gql`
  query GetCompanyDirectorDetailsQuery($uuid: ID!) {
    companyByUuid(uuid: $uuid) {
      uuid
      companyNumber
      associates {        
        ...CompanyAssociate
      }
    }
      allDropDowns {
        ...DirectorFieldsDropDownData
      }
    }    
    ${DirectorDetailsForm.fragments.associates}
    ${DirectorFields.fragments.dropDownData}
`;

export const SAVE_DIRECTOR_DETAILS = gql`
  mutation SaveDirectorDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateCompanyDirector(input: $input) {
      uuid
    }
  }
`;

export function useSaveDirectorDetailsMutation() {
  return useMutation<Mutation, MutationVariables>(SAVE_DIRECTOR_DETAILS);
}

export function useGetDirectorDetailsQuery(companyUuid: string) {
  return useQuery<Query, QueryVariables>(GET_COMPANY_DIRECTOR_DETAILS, {
    variables: { uuid: companyUuid },
  });
}
