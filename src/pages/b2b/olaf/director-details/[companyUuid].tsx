import { gql, useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import {
  GetCompanyDirectorDetailsQuery as Query,
  GetCompanyDirectorDetailsQueryVariables as QueryVariables,
} from '../../../../../generated/GetCompanyDirectorDetailsQuery';
import DirectorDetailsForm from '../../../../components/DirectorDetailsForm/DirectorDetailsForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

type QueryParams = {
  companyUuid: string;
};

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
  }
`;

export const DirectorDetailsPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid } = router.query as QueryParams;

  const { data, loading, error } = useQuery<Query, QueryVariables>(
    GET_COMPANY_DIRECTOR_DETAILS,
    { variables: { uuid: companyUuid } },
  );

  if (loading) {
    return <Loading size="xlarge" />;
  }

  if (
    error ||
    !data ||
    !data.companyByUuid ||
    !data.companyByUuid.companyNumber
  ) {
    return <p>Error: Could not load company data!</p>;
  }

  return (
    <OLAFLayout>
      <DirectorDetailsForm companyNumber={data.companyByUuid.companyNumber} />
    </OLAFLayout>
  );
};

export default withApollo(DirectorDetailsPage, { getDataFromTree });
