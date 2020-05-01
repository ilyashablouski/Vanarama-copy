import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import OlafContainer from '../../../components/OlafContainer';
import EmploymentFormContainer from '../../../containers/EmploymentFormContainer/EmploymentFormContainer';
import withApollo from '../../../hocs/withApollo';

const EmploymentHistoryPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OlafContainer activeStep={3}>
      <EmploymentFormContainer
        onCompleted={() => {
          const url = `/olaf/expenses/[uuid]`;
          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OlafContainer>
  );
};

export default withApollo(EmploymentHistoryPage, { getDataFromTree });
