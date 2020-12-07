import React from 'react';
import dynamic from 'next/dynamic';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { ICompanyBankDetails } from '../../components/CompanyBankDetails/interfaces';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import {
  useUpdateLimitedBankDetails,
  useUpdateSoleTraderBankDetails,
} from './gql';
import useGetSetBankUuid from '../../hooks/useGetSetBankUuid';
import { IProps } from './interfaces';
import {
  formValuesToInput,
  mapDefaultValues,
  mapBankAccountsForCreditApplication,
} from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';

const CompanyBankDetails = dynamic(() =>
  import('../../components/CompanyBankDetails'),
);

const CompanyBankDetailsFormContainer: React.FC<IProps> = ({
  companyUuid,
  orderUuid,
  onCompleted,
  onError,
  isEdited,
  isSoleTrader,
}) => {
  const [updateLimitedBankDetails] = useUpdateLimitedBankDetails();
  const [updateSoleTraderBankDetails] = useUpdateSoleTraderBankDetails();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderUuid,
    () => {},
  );
  const { setBankUuid, getBankUuid } = useGetSetBankUuid();
  const { loading, error, data } = useGetCreditApplicationByOrderUuid(
    orderUuid,
  );
  const account = mapDefaultValues(data?.creditApplicationByOrderUuid);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return null;
  }

  const handleUpdateBankDetails = async (values: ICompanyBankDetails) => {
    const accountUuid = await getBankUuid();
    const input = {
      variables: { input: formValuesToInput(companyUuid, values, accountUuid) },
    };

    return isSoleTrader
      ? updateSoleTraderBankDetails(input)
      : updateLimitedBankDetails(input);
  };

  const pluckBankAccountData = (res: any) => {
    return isSoleTrader
      ? res.data?.createUpdateSoleTraderCompany?.bankAccounts
      : res.data?.createUpdateLimitedCompany?.bankAccounts;
  };

  const handleSubmit = async (values: ICompanyBankDetails) => {
    try {
      const res = await handleUpdateBankDetails(values);
      setBankUuid(pluckBankAccountData(res)?.[0].uuid);
      await createUpdateApplication({
        variables: {
          input: formValuesToInputCreditApplication({
            ...data?.creditApplicationByOrderUuid,
            bankAccounts: mapBankAccountsForCreditApplication(
              values,
              pluckBankAccountData(res),
            ),
            orderUuid,
          }),
        },
      });
      onCompleted();
    } catch (err) {
      onError(err);
    }
  };

  return (
    <CompanyBankDetails
      isEdited={isEdited}
      account={account}
      onSubmit={handleSubmit}
    />
  );
};

export default CompanyBankDetailsFormContainer;
