import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
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
import {
  mapCreateUpdteApplicationData,
  mapFormValues,
  prelodedValuesToInput,
} from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';
import { UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany as Company } from '../../../generated/UpdateSoleTraderCompanyMutation';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const SoleTraderCompanyDetailsFormContainer: React.FC<ISoleTraderCompanyDetailsFormContainerProps> = ({
  orderId,
  personUuid,
  companyUuid,
  onCompleted,
  onError,
}) => {
  const [mappedCompanyDetails, setMappedCompanyDetails] = React.useState<
    ISoleTraderCompanyDetailsFormValues
  >();
  const [updateSoleTraderCompanyDetails] = useUpdateSoleTraderCompanyMutation();
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );
  const { data, loading } = useGetCreditApplicationByOrderUuid(orderId);

  const [natureOfBusiness, setNatureOfBusiness] = useState<string[]>([]);

  const initialCompanyDetails =
    data?.creditApplicationByOrderUuid?.companyDetails;

  React.useMemo(() => {
    if (initialCompanyDetails) {
      setMappedCompanyDetails(prelodedValuesToInput(initialCompanyDetails));
    }
  }, [initialCompanyDetails]);

  useEffect(() => {
    if (mappedCompanyDetails) {
      setNatureOfBusiness(mappedCompanyDetails?.nature.split('.'));
    }
  }, [mappedCompanyDetails]);

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

  const handleNatureSelect = (selectedNature: string | string[]) => {
    const isArray = Array.isArray(selectedNature);
    setNatureOfBusiness(
      (isArray ? selectedNature : [selectedNature]) as string[],
    );
  };

  const handleCreditApplicationUpdate = (
    values: ISoleTraderCompanyDetailsFormValues,
    companyData: Company | null,
  ) =>
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...data?.creditApplicationByOrderUuid,
          companyDetails: mapCreateUpdteApplicationData(values, companyData),
          orderUuid: orderId,
        }),
      },
    });

  if (loading) {
    return <Loading />;
  }

  return (
    <CompanyDetailsForm
      setNatureOfBusiness={handleNatureSelect}
      natureOfBusiness={natureOfBusiness}
      companyDetails={mappedCompanyDetails}
      onSubmit={async values => {
        handleSoleTraderCompanyDetailsSave({
          ...values,
          nature: natureOfBusiness.join('.'),
        })
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
