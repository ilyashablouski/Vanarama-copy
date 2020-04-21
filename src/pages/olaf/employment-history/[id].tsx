import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import OlafContainer from '../../../components/olaf/olaf-container';
import EmploymentFormContainer from '../../../containers/EmploymentFormContainer/EmploymentFormContainer';
import withApollo from '../../../hocs/withApollo';

const EmploymentHistoryPage: NextPage = () => {
  const router = useRouter();
  const personId = router.query.id as string;
  return (
    <OlafContainer activeStep={3}>
      <EmploymentFormContainer
        onCompleted={() => {
          router.push(`/olaf/expenses/[id]`, `/olaf/expenses/${personId}`);
        }}
        personId={personId}
      />
    </OlafContainer>
  );
};

/**
 * Had to define `getInitialProps` to turn off Static Optimization and get the query from the router
 * see:
 *  https://github.com/zeit/next.js/discussions/11484 &
 *  https://nextjs.org/docs/routing/dynamic-routes#caveats
 */
EmploymentHistoryPage.getInitialProps = () => {
  return {};
};

export default withApollo(EmploymentHistoryPage, {
  getDataFromTree,
});
