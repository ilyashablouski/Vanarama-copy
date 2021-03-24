import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import EmploymentFormContainer from '../../../containers/EmploymentFormContainer/EmploymentFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { GET_PERSON_INFORMATION } from '../address-history';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { SaveEmploymentHistoryMutation_createUpdateEmploymentHistory as IEmploymentHistory } from '../../../../generated/SaveEmploymentHistoryMutation';
import useGetOrderId from '../../../hooks/useGetOrderId';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const EmploymentHistoryPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;
  const orderId = useGetOrderId();

  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  const onCompleteClick = (
    createUpdateEmploymentHistory: IEmploymentHistory[] | null,
  ) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: orderId,
          employmentHistories: createUpdateEmploymentHistory,
        },
      },
    })
      .then(() => getUrlParam({ uuid: personUuid }))
      .then(params =>
        router.query.redirect === 'summary'
          ? `/olaf/summary${params}`
          : `/olaf/expenses${params}`,
      )
      .then(url => router.push(url, url));
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
