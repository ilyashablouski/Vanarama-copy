import React from 'react';
// import { gql } from '@apollo/client';
import CompanyDetailsForm from '../../components/SoleTraderCompanyDetailsForm';
import { ISoleTraderCompanyDetailsFormValues } from '../../components/SoleTraderCompanyDetailsForm/interfaces';
import { ISoleTraderCompanyDetailsFormContainerProps } from './interfaces';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import { useUpdateSoleTraderCompanyMutation } from './gql';
import { useCreateUpdateOrder } from '../../gql/order';
import { mapFormValues } from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';
import { UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany as Company } from '../../../generated/UpdateSoleTraderCompanyMutation';

const SoleTraderCompanyDetailsFormContainer: React.FC<ISoleTraderCompanyDetailsFormContainerProps> = ({
  orderId,
  personUuid,
  companyUuid,
  onCompleted,
  onError,
}) => {
  const [updateSoleTraderCompanyDetails] = useUpdateSoleTraderCompanyMutation();
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );
  const getCreditApplicationByOrderUuidQuery = useGetCreditApplicationByOrderUuid(
    orderId,
  );

  const defaultCompanyDetails =
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid
      ?.companyDetails;

  const handleSoleTraderCompanyDetailsSave = (
    values: ISoleTraderCompanyDetailsFormValues,
  ) =>
    updateSoleTraderCompanyDetails({
      variables: {
        input: {
          uuid: companyUuid,
          person: { uuid: personUuid },
          ...mapFormValues(values),
        },
      },
    });

  const handleOrderUpdate = (partyUuid: string) =>
    createUpdateOrder({
      variables: {
        input: {
          partyUuid,
          leaseType: LeaseTypeEnum.BUSINESS,
          lineItems: [],
          uuid: orderId,
        },
      },
    });

  const handleCreditApplicationUpdate = (
    values: ISoleTraderCompanyDetailsFormValues,
    companyData: Company | null,
  ) => {
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...getCreditApplicationByOrderUuidQuery.data
            ?.creditApplicationByOrderUuid,
          companyDetails: { uuid: companyData?.uuid, ...mapFormValues(values) },
          orderUuid: orderId,
        }),
      },
    });
  };

  return (
    <CompanyDetailsForm
      companyDetails={defaultCompanyDetails}
      onSubmit={async values => {
        handleSoleTraderCompanyDetailsSave(values)
          .then(response =>
            handleOrderUpdate(
              response.data!.createUpdateSoleTraderCompany!.partyUuid,
            )
              .then(() =>
                handleCreditApplicationUpdate(
                  values,
                  response.data!.createUpdateSoleTraderCompany,
                ),
              )
              .then(() =>
                onCompleted(response.data!.createUpdateSoleTraderCompany!.uuid),
              ),
          )
          .catch(onError);
      }}
    />
  );
};

export default SoleTraderCompanyDetailsFormContainer;
