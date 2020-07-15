import { gql, useQuery, useMutation } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import {
  GetCompanyDirectorDetailsQuery as Query,
  GetCompanyDirectorDetailsQueryVariables as QueryVariables,
} from '../../../../../generated/GetCompanyDirectorDetailsQuery';
import DirectorDetailsForm from '../../../../components/DirectorDetailsForm/DirectorDetailsForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import {
  SaveDirectorDetailsMutation as Mutation,
  SaveDirectorDetailsMutationVariables as MutationVariables,
} from '../../../../../generated/SaveDirectorDetailsMutation';
import { historyToMoment, parseDate } from '../../../../utils/dates';
import { LimitedCompanyInputObject } from '../../../../../generated/globalTypes';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';

type QueryParams = OLAFQueryParams & {
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
      associates {        
        ...CompanyAssociates
      }
    }
  }
  ${DirectorDetailsForm.fragments.associates}
`;

export const SAVE_DIRECTOR_DETAILS = gql`
  mutation SaveDirectorDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateCompanyDirector(input: $input) {
      uuid
    }
  }
`;

export const DirectorDetailsPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, derivativeId, orderId } = router.query as QueryParams;

  const [saveDirectorDetails] = useMutation<Mutation, MutationVariables>(
    SAVE_DIRECTOR_DETAILS,
    {
      onCompleted: () => {
        const params = getUrlParam({ derivativeId, orderId });
        const url = `/b2b/olaf/company-bank-details/[companyUuid]${params}`;
        router.push(url, url.replace('[companyUuid]', companyUuid));
      },
      onError: () => {
        toast.error(
          'Oops, an unexpected error occurred',
          'Your details could not be saved. Please try submitting the form again.',
        );
      },
    },
  );

  const { data, loading, error } = useQuery<Query, QueryVariables>(
    GET_COMPANY_DIRECTOR_DETAILS,
    { variables: { uuid: companyUuid } },
  );

  if (loading) {
    return <Loading size="xlarge" />;
  }

  console.log(data);

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
      <DirectorDetailsForm
        associates={data.companyByUuid.associates || []}
        companyNumber={data.companyByUuid.companyNumber}
        onSubmit={async values => {
          const input: LimitedCompanyInputObject = {
            uuid: companyUuid,
            associates: values.directors.map(director => ({
              firstName: director.firstName,
              lastName: director.lastName,
              businessShare: parseInt(director.shareOfBusiness, 10),
              addresses: director.history.map(_ => ({
                serviceId: _.address!.id,
                propertyStatus: _.status,
                startedOn: historyToMoment(_).format('YYYY-MM-DD'),
              })),
              gender: director.gender,
              title: director.title,
              dateOfBirth: parseDate(
                director.dayOfBirth,
                director.monthOfBirth,
                director.yearOfBirth,
              ).format('YYYY-MM-DD'),
              role: { position: 'director' },
              noOfDependants: director.numberOfDependants,
            })),
          };

          await saveDirectorDetails({
            variables: {
              input,
            },
          });
        }}
      />
    </OLAFLayout>
  );
};

export default withApollo(DirectorDetailsPage, { getDataFromTree });
