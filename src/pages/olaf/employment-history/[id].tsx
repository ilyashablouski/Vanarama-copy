import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import OlafContainer from '../../../components/olaf/olaf-container';
import EmploymentFormContainer from '../../../containers/EmploymentFormContainer/EmploymentFormContainer';
import withApollo from '../../../hocs/withApollo';

const EmploymentHistoryPage: NextPage = () => {
  const router = useRouter();
  const personUuid = router.query.id as string;
  return (
    <OlafContainer activeStep={3}>
      <EmploymentFormContainer
        onCompleted={() => {
          router.push(`/olaf/expenses/[id]`, `/olaf/expenses/${personUuid}`);
        }}
        personUuid={personUuid}
      />
    </OlafContainer>
  );
};

export default withApollo(EmploymentHistoryPage, { getDataFromTree });
