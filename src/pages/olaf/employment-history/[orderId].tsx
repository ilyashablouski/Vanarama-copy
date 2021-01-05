/* eslint-disable @typescript-eslint/camelcase */
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import EmploymentFormContainer from '../../../containers/EmploymentFormContainer/EmploymentFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { GET_PERSON_INFORMATION } from '../address-history/[orderId]';
import { formValuesToInputCreditApplication } from '../../../mappers/mappersCreditApplication';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../gql/creditApplication';
import { SaveEmploymentHistoryMutation_createUpdateEmploymentHistory } from '../../../../generated/SaveEmploymentHistoryMutation';
import useGetOrderId from '../../../hooks/useGetOrderId';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const EmploymentHistoryPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;
  const orderId = useGetOrderId();

  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const { data: caData } = useGetCreditApplicationByOrderUuid(orderId);

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  const onCompleteClick = (
    createUpdateEmploymentHistory:
      | SaveEmploymentHistoryMutation_createUpdateEmploymentHistory[]
      | null,
  ) => {
    createUpdateCA({
      variables: {
        input: formValuesToInputCreditApplication({
          ...caData?.creditApplicationByOrderUuid,
          orderUuid: orderId,
          employmentHistories: createUpdateEmploymentHistory,
        }),
      },
    });
    const params = getUrlParam({ uuid: personUuid });
    const url =
      router.query.redirect === 'summary'
        ? `/olaf/summary/[orderId]${params}`
        : `/olaf/expenses/[orderId]${params}`;

    router.push(url, url.replace('[orderId]', orderId));
  };

  return (
    <OLAFLayout>
      <EmploymentFormContainer
        onCompleted={({ createUpdateEmploymentHistory }) =>
          onCompleteClick(createUpdateEmploymentHistory)
        }
        personUuid={personUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(EmploymentHistoryPage, { getDataFromTree });
