import { gql, useQuery, useMutation } from '@apollo/client';
import {
  GetCompanyDirectorDetailsQuery as Query,
  GetCompanyDirectorDetailsQueryVariables as QueryVariables,
} from '../../../generated/GetCompanyDirectorDetailsQuery';
import {
  SaveDirectorDetailsMutation as Mutation,
  SaveDirectorDetailsMutationVariables as MutationVariables,
} from '../../../generated/SaveDirectorDetailsMutation';
import DirectorFields from '../../components/DirectorDetailsForm/DirectorFields';
import {
  GetDirectorDetailsQuery,
  GetDirectorDetailsQueryVariables,
} from '../../../generated/GetDirectorDetailsQuery';
import { FunderCompanyTypeEnum } from '../../../generated/globalTypes';
import {
  FunderDirectors,
  FunderDirectorsVariables,
} from '../../../generated/FunderDirectors';

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
    }
    allDropDowns {
      ...DirectorFieldsDropDownData
    }
  }
  ${DirectorFields.fragments.dropDownData}
`;

export const SAVE_DIRECTOR_DETAILS = gql`
  mutation SaveDirectorDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateCompanyDirector(input: $input) {
      uuid
      associates {
        uuid
        lastName
        firstName
        addresses {
          city
          country
          county
          kind
          lineOne
          lineThree
          lineTwo
          postcode
          serviceId
          startedOn
        }
      }
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

export const GET_DIRECTOR_DETAILS = gql`
  query GetDirectorDetailsQuery($companyNumber: String!) {
    companyOfficers(companyNumber: $companyNumber) {
      nodes {
        name
      }
    }
  }
`;

export function useCompanyOfficers(companyNumber: string) {
  return useQuery<GetDirectorDetailsQuery, GetDirectorDetailsQueryVariables>(
    GET_DIRECTOR_DETAILS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        companyNumber,
      },
      skip: !companyNumber,
    },
  );
}

export const FUNDER_DIRECTORS_QUERY = gql`
  query FunderDirectors($input: FunderInputObject!) {
    funderDirectors(input: $input) {
      id
      funderData
    }
  }
`;

export function useFunderDirectors(
  id: string = '',
  companiesHouseDirectors: number = 0,
  companyType: FunderCompanyTypeEnum = FunderCompanyTypeEnum.limited,
) {
  return useQuery<FunderDirectors, FunderDirectorsVariables>(
    FUNDER_DIRECTORS_QUERY,
    {
      variables: {
        input: {
          companiesHouseDirectors,
          companyType,
          id,
        },
      },
      skip: Boolean(!companiesHouseDirectors || !companyType || !id),
    },
  );
}
