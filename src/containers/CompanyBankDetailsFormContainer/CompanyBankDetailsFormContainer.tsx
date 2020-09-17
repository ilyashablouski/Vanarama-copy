import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import { ICompanyBankDetails } from '../../components/CompanyBankDetails/interfaces';
import CompanyBankDetails from '../../components/CompanyBankDetails';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import {
  useUpdateLimitedBankDetails,
  useUpdateSoleTraderBankDetails,
} from './gql';
import { IProps } from './interfaces';
import {
  formValuesToInput,
  mapDefaultValues,
  mapBankAccountsForCreditApplication,
} from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';

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

  const handleUpdateBankDetails = (values: ICompanyBankDetails) => {
    const input = {
      variables: { input: formValuesToInput(companyUuid, values) },
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
