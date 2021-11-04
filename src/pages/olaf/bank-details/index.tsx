import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { CreateUpdateBankAccountMutation_createUpdateBankAccount as IBankAccount } from '../../../../generated/CreateUpdateBankAccountMutation';
import { useStoredOrderQuery } from '../../../gql/storedOrder';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const mapBankAccountToCreditApplication = (
  createUpdateBankAccount: IBankAccount | null,
) => {
  const [joinedAtYear, joinedAtMonth] = (
    createUpdateBankAccount?.joinedAt ?? '-'
  ).split('-');

  return {
    ...(createUpdateBankAccount || {}),
    joinedAtYear,
    joinedAtMonth,
    joinedAt: undefined,
  };
};

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;

  const { data: orderData } = useStoredOrderQuery();
  const [createUpdateCA] = useCreateUpdateCreditApplication();

  const order = orderData?.storedOrder?.order;

  const personUuid = uuid || orderData?.storedOrder?.order?.personUuid || '';

  const onCompleteClick = (createUpdateBankAccount: IBankAccount | null) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: order?.uuid || '',
          bankAccounts: [
            mapBankAccountToCreditApplication(createUpdateBankAccount),
          ],
        },
      },
    })
      .then(() => getUrlParam({ uuid: personUuid }))
      .then(params => `/olaf/summary${params}`)
      .then(url => router.push(url, url));
  };

  return (
    <OLAFLayout>
      <BankDetailsFormContainer
        personUuid={personUuid}
        onCompleted={({ createUpdateBankAccount }) =>
          onCompleteClick(createUpdateBankAccount)
        }
      />
    </OLAFLayout>
  );
};

export default BankDetailsPage;
