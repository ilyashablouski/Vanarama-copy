import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import CompanyBankDetails from '../../components/CompanyBankDetails';
import { useUpdateBankDetails, useBankDetails } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';
import { CompanyBankDetailsAccount } from '../../../generated/CompanyBankDetailsAccount';

const CompanyBankDetailsFormContainer: React.FC<IProps> = ({
  companyUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useBankDetails(companyUuid);
  const [updateBankDetails] = useUpdateBankDetails(companyUuid, onCompleted);
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.companyByUuid) {
    return null;
  }

  const { bankAccounts } = data.companyByUuid;
  const firstAccount = bankAccounts?.[0] as CompanyBankDetailsAccount;
  return (
    <CompanyBankDetails
      account={firstAccount}
      onSubmit={values =>
        updateBankDetails({
          variables: {
            input: formValuesToInput(companyUuid, values),
          },
        })
      }
    />
  );
};

export default CompanyBankDetailsFormContainer;
