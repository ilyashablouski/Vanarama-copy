import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import CompanyDetailsForm from '../../components/SoleTraderCompanyDetailsForm';
import {
  EMPTY_SOLE_TRADER_ADDRESS_ENTRY,
  ISoleTraderCompanyAddressEntry,
  ISoleTraderCompanyDetailsFormValues,
} from '../../components/SoleTraderCompanyDetailsForm/interfaces';
import { ISoleTraderCompanyDetailsFormContainerProps } from './interfaces';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import { useUpdateSoleTraderCompanyMutation } from './gql';
import { useCreateUpdateOrder } from '../../gql/order';
import {
  mapFormValues,
  preloadedValuesToInput,
  mapCreateUpdateApplicationData,
} from './mappers';
import { UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany as Company } from '../../../generated/UpdateSoleTraderCompanyMutation';
import Skeleton from '../../components/Skeleton';
import { NATURE_OF_BUSINESS_SEPARATOR } from '../../models/enum/OlafVariables';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const SoleTraderCompanyDetailsFormContainer: React.FC<ISoleTraderCompanyDetailsFormContainerProps> = ({
  orderId,
  personUuid,
  companyUuid,
  onCompleted,
  onError,
}) => {
  const [mappedCompanyDetails, setMappedCompanyDetails] = React.useState<
    ISoleTraderCompanyDetailsFormValues | ISoleTraderCompanyAddressEntry
  >(EMPTY_SOLE_TRADER_ADDRESS_ENTRY);

  const [updateSoleTraderCompanyDetails] = useUpdateSoleTraderCompanyMutation();
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );
  const { data, loading } = useGetCreditApplicationByOrderUuid(orderId);

  const [natureOfBusiness, setNatureOfBusiness] = useState<string[]>([]);

  const initialCompanyDetails =
    data?.creditApplicationByOrderUuid?.companyDetailsV2;

  React.useMemo(() => {
    if (initialCompanyDetails) {
      const preloadedFormValues = preloadedValuesToInput(initialCompanyDetails);
      const initNatureOfBusiness = preloadedFormValues?.nature?.split(
        NATURE_OF_BUSINESS_SEPARATOR,
      );

      setNatureOfBusiness(initNatureOfBusiness ?? []);
      setMappedCompanyDetails(preloadedFormValues);
    }
  }, [initialCompanyDetails]);

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
        input: {
          companyDetailsV2: mapCreateUpdateApplicationData(values, companyData),
          orderUuid: orderId,
        },
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
          nature: natureOfBusiness.join(NATURE_OF_BUSINESS_SEPARATOR),
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
