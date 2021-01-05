/* eslint-disable @typescript-eslint/camelcase */
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { GET_PERSON_INFORMATION } from '../address-history/[orderId]';
import { formValuesToInputCreditApplication } from '../../../mappers/mappersCreditApplication';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../gql/creditApplication';
import { CreateUpdateBankAccountMutation_createUpdateBankAccount } from '../../../../generated/CreateUpdateBankAccountMutation';
import useGetOrderId from '../../../hooks/useGetOrderId';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;
  const orderId = useGetOrderId();

  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  const onCompleteClick = (
    createUpdateBankAccount: CreateUpdateBankAccountMutation_createUpdateBankAccount | null,
  ) => {
    createUpdateCA({
      variables: {
        input: formValuesToInputCreditApplication({
          ...creditApplication.data?.creditApplicationByOrderUuid,
          orderUuid: orderId,
          bankAccounts: [createUpdateBankAccount],
        }),
      },
    });
    const params = getUrlParam({ uuid: personUuid });
    const url = `/olaf/summary/[orderId]${params}`;
    router.push(url, url.replace('[orderId]', orderId));
  };

  return (
    <OLAFLayout>
      <BankDetailsFormContainer
        onCompleted={({ createUpdateBankAccount }) =>
          onCompleteClick(createUpdateBankAccount)
        }
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(BankDetailsPage, { getDataFromTree });
