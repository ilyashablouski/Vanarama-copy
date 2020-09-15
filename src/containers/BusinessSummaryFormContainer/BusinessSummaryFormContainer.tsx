import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React, { useEffect } from 'react';
import { useLazyQuery, ApolloError } from '@apollo/client';
import BusinessSummaryForm from '../../components/BusinessSummaryForm/BusinessSummaryForm';
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

interface IProps {
  personUuid: string;
  companyUuid: string;
  orderId: string;
  onCompleted: () => void;
  onError?: (error: ApolloError) => void;
}

const BusinessSummaryFormContainer: React.FC<IProps> = ({
  companyUuid,
  orderId,
  personUuid,
  onCompleted,
  onError,
}) => {
  const [getDataSummary, { data, error, loading }] = useLazyQuery<
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

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  if (
    loading ||
    (!data?.companyByUuid && !data?.personByUuid) ||
    getCreditApplication.loading
  ) {
    return <Loading size="large" />;
  }

  const hanldeCredutApplicationSubmit = () =>
    createUpdateCA({
      variables: {
        input: {
          orderUuid: orderId,
          submittedAt: new Date(),
        },
      },
    });

  const hanldeCreditCheckerSubmit = () =>
    submitFullCreditChecker({
      variables: {
        input: mapCreditApplicationToCreditChecker(
          getCreditApplication.data?.creditApplicationByOrderUuid,
        ),
      },
    });

  const handleSubmit = () => {
    hanldeCredutApplicationSubmit()
      .then(() => hanldeCreditCheckerSubmit())
      .then(onCompleted)
      .catch(onError);
  };

  return (
    <BusinessSummaryForm
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      creditApplication={
        getCreditApplication.data?.creditApplicationByOrderUuid
      }
      person={data.personByUuid as PersonByUuid}
      company={data.companyByUuid as CompanyByUuid}
      orderId={orderId}
    />
  );
};

export default BusinessSummaryFormContainer;
