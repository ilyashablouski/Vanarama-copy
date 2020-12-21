import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLazyQuery, ApolloError } from '@apollo/client';
import {
  GetCompanySummaryQuery,
  GetCompanySummaryQueryVariables,
  GetCompanySummaryQuery_personByUuid as PersonByUuid,
  GetCompanySummaryQuery_companyByUuid as CompanyByUuid,
} from '../../../generated/GetCompanySummaryQuery';
import { GET_COMPANY_SUMMARY, useUseFullCreditCheckerB2BMutation } from './gql';
import {
  useGetCreditApplicationByOrderUuid,
  useCreateUpdateCreditApplication,
} from '../../gql/creditApplication';
import { mapCreditApplicationToCreditChecker } from './mappers';
import { GET_PARTY_BY_UUID } from '../../components/SummaryForm/gql';
import { GET_ABOUT_YOU_DATA } from '../AboutFormContainer/gql';
import { GetPartyByUuid_partyByUuid_person as IPerson } from '../../../generated/GetPartyByUuid';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import Skeleton from '../../components/Skeleton';

const BusinessSummaryForm = dynamic(() =>
  import('../../components/BusinessSummaryForm/BusinessSummaryForm'),
);
const SoleTraderSummaryForm = dynamic(() =>
  import('../../components/BusinessSummaryForm/SoleTraderSummaryForm'),
);
const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const getCompanyPartyIdFromPerson = (
  companyUuid: string,
  person?: IPerson | null,
) => person?.companies?.find(company => company.uuid === companyUuid)?.partyId;

interface IProps {
  personUuid: string;
  companyUuid: string;
  orderId: string;
  isSoleTrader: boolean;
  onCompleted?: (emailAddresses: string | undefined) => void;
  onError?: (error: ApolloError) => void;
}

const BusinessSummaryFormContainer: React.FC<IProps> = ({
  companyUuid,
  orderId,
  personUuid,
  onCompleted,
  onError,
  isSoleTrader,
}) => {
  const [getDataSummary, getDataSummaryQueryOptions] = useLazyQuery<
    GetCompanySummaryQuery,
    GetCompanySummaryQueryVariables
  >(GET_COMPANY_SUMMARY, { fetchPolicy: 'no-cache' });
  const getCreditApplication = useGetCreditApplicationByOrderUuid(orderId);
  const [
    createUpdateCA,
    creditApplicationMutationOptions,
  ] = useCreateUpdateCreditApplication(orderId, () => {});
  const [
    submitFullCreditChecker,
    creditCheckerMutationOptions,
  ] = useUseFullCreditCheckerB2BMutation();

  const getParty = useImperativeQuery(GET_PARTY_BY_UUID);
  const getPerson = useImperativeQuery(GET_ABOUT_YOU_DATA);

  const isSubmitting =
    creditApplicationMutationOptions.loading ||
    creditCheckerMutationOptions.loading;

  useEffect(() => {
    if (personUuid && companyUuid) {
      getDataSummary({
        variables: {
          uuid: companyUuid,
          personUuid,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personUuid, companyUuid]);

  if (getDataSummaryQueryOptions.error) {
    return <p>Error occurred: {getDataSummaryQueryOptions.error.message}</p>;
  }

  if (
    getDataSummaryQueryOptions.loading ||
    getCreditApplication.loading ||
    (!getDataSummaryQueryOptions.data?.companyByUuid &&
      !getDataSummaryQueryOptions.data?.personByUuid)
  ) {
    return <Loading size="large" />;
  }

  const handleCreditApplicationSubmit = () =>
    createUpdateCA({
      variables: {
        input: {
          orderUuid: orderId,
          submittedAt: new Date(),
        },
      },
    });

  const handleCreditCheckerSubmit = (
    creditApplication?: CreditApplication | null,
    partyId?: string | null,
  ) =>
    submitFullCreditChecker({
      variables: {
        input: mapCreditApplicationToCreditChecker(creditApplication, partyId),
      },
    });

  const handleSubmit = () => {
    const personByUuid = getDataSummaryQueryOptions?.data?.personByUuid;
    handleCreditApplicationSubmit()
      .then(creditApplicationQuery =>
        getPerson({ uuid: personUuid })
          .then(query => getParty({ uuid: query.data.personByUuid.partyUuid }))
          .then(partyQuery =>
            handleCreditCheckerSubmit(
              creditApplicationQuery.data?.createUpdateCreditApplication,
              getCompanyPartyIdFromPerson(
                companyUuid,
                partyQuery.data?.partyByUuid?.person,
              ),
            ),
          ),
      )
      .then(() => onCompleted?.(personByUuid?.emailAddresses[0].value))
      .catch(onError);
  };

  return (
    <>
      {isSoleTrader ? (
        <SoleTraderSummaryForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          creditApplication={
            getCreditApplication.data?.creditApplicationByOrderUuid
          }
          person={getDataSummaryQueryOptions.data.personByUuid as PersonByUuid}
          company={
            getDataSummaryQueryOptions.data.companyByUuid as CompanyByUuid
          }
        />
      ) : (
        <BusinessSummaryForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          creditApplication={
            getCreditApplication.data?.creditApplicationByOrderUuid
          }
          person={getDataSummaryQueryOptions.data.personByUuid as PersonByUuid}
          company={
            getDataSummaryQueryOptions.data.companyByUuid as CompanyByUuid
          }
        />
      )}
    </>
  );
};

export default BusinessSummaryFormContainer;
