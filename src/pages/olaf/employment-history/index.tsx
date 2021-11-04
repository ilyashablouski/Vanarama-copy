import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import EmploymentFormContainer from '../../../containers/EmploymentFormContainer/EmploymentFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { SaveEmploymentHistoryMutation_createUpdateEmploymentHistory as IEmploymentHistory } from '../../../../generated/SaveEmploymentHistoryMutation';
import { useStoredOrderQuery } from '../../../gql/storedOrder';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const EmploymentHistoryPage: NextPage = () => {
  const router = useRouter();
  const { uuid, redirect } = router.query as QueryParams;

  const [createUpdateCA] = useCreateUpdateCreditApplication();

  const { data: orderData } = useStoredOrderQuery();
  const order = orderData?.storedOrder?.order;

  const personUuid = uuid || orderData?.storedOrder?.order?.personUuid || '';

  const onCompleteClick = (
    createUpdateEmploymentHistory: IEmploymentHistory[] | null,
  ) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: order?.uuid || '',
          employmentHistories: createUpdateEmploymentHistory,
        },
      },
    })
      .then(() => getUrlParam({ uuid: personUuid }))
      .then(params => redirect || `/olaf/expenses${params}`)
      .then(url => router.push(url, url));
  };

  return (
    <OLAFLayout>
      <EmploymentFormContainer
        personUuid={personUuid}
        onCompleted={({ createUpdateEmploymentHistory }) =>
          onCompleteClick(createUpdateEmploymentHistory)
        }
      />
    </OLAFLayout>
  );
};

export default EmploymentHistoryPage;
