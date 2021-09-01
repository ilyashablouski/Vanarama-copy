import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { GET_PERSON_INFORMATION } from '../address-history';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { CreateUpdateBankAccountMutation_createUpdateBankAccount as IBankAccount } from '../../../../generated/CreateUpdateBankAccountMutation';
import useGetOrderId from '../../../hooks/useGetOrderId';

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
  const orderId = useGetOrderId();

  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  const onCompleteClick = (createUpdateBankAccount: IBankAccount | null) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: orderId,
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
        personUuid={uuid}
        onCompleted={({ createUpdateBankAccount }) =>
          onCompleteClick(createUpdateBankAccount)
        }
      />
    </OLAFLayout>
  );
};

export default withApollo(BankDetailsPage, { getDataFromTree });
