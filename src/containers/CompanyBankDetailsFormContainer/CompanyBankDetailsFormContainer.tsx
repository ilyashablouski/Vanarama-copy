import React from 'react';
import dynamic from 'next/dynamic';
import { ICompanyBankDetails } from '../../components/CompanyBankDetails/interfaces';
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
  mapFormValues,
  mapDefaultValues,
  mapBankAccountsForCreditApplication,
} from './mappers';
import Skeleton from '../../components/Skeleton';
import {
  useStoredBankUuidQuery,
  useSaveStoredBankUuidMutation,
} from '../../gql/storedBankUuid';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const CompanyBankDetails = dynamic(() =>
  import('../../components/CompanyBankDetails'),
);

const CompanyBankDetailsFormContainer: React.FC<IProps> = ({
  companyUuid,
  orderUuid,
  personUuid,
  onCompleted,
  onError,
  isEdited,
  isSoleTrader,
}) => {
  const [updateLimitedBankDetails] = useUpdateLimitedBankDetails();
  const [updateSoleTraderBankDetails] = useUpdateSoleTraderBankDetails();
  const [createUpdateApplication] = useCreateUpdateCreditApplication();
  const { loading, error, data } = useGetCreditApplicationByOrderUuid(
    orderUuid,
  );
  const account = mapDefaultValues(data?.creditApplicationByOrderUuid);
  const [saveStoredBankUuidMutation] = useSaveStoredBankUuidMutation();
  const { data: bankUuidData } = useStoredBankUuidQuery();
  const accountUuid = bankUuidData?.storedPersonBankUuid?.bankUuid || undefined;

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
    const input = {
      variables: {
        input: {
          ...mapFormValues(companyUuid, values, accountUuid, personUuid),
          companyNature:
            data?.creditApplicationByOrderUuid?.companyDetailsV2
              ?.natureOfBusiness ?? '',
        },
      },
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
      saveStoredBankUuidMutation({
        variables: {
          bankUuid: pluckBankAccountData(res)?.[0]?.uuid,
        },
      });
      await createUpdateApplication({
        variables: {
          input: {
            bankAccounts: mapBankAccountsForCreditApplication(
              values,
              pluckBankAccountData(res),
            ),
            orderUuid,
          },
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
