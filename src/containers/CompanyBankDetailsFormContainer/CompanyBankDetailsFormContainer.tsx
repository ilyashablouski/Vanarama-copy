import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import CompanyBankDetails from '../../components/CompanyBankDetails';
import { useBankDetails, useUpdateBankDetails } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const CompanyBankDetailsFormContainer: React.FC<IProps> = ({
  companyUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useBankDetails(companyUuid);
  console.log('loading', loading);
  console.log('error', error);
  console.log('data', data);
  // const [updateBankDetails] = useUpdateBankDetails(personUuid, onCompleted);
  // if (loading) {
  //   return <Loading size="large" />;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // if (!data || !data.personByUuid) {
  //   return null;
  // }

  // const { bankAccounts, partyId } = data.personByUuid;
  // const firstAccount = bankAccounts?.[0];
  return (
    <h1>Test</h1>
    // <CompanyBankDetails
    //   // `PersonType.bankAccount`s is an array, so just take the first one???
    //   account={firstAccount}
    //   onSubmit={values =>
    //     updateBankDetails({
    //       variables: {
    //         input: formValuesToInput(partyId, values),
    //       },
    //     })
    //   }
    // />
  );
};

export default CompanyBankDetailsFormContainer;
