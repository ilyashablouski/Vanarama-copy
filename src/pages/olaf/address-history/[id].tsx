import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import OlafContainer from '../../../components/olaf/olaf-container';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import withApollo from '../../../hocs/withApollo';

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const partyId = router.query.id as string;
  return (
    <OlafContainer activeStep={2}>
      <AddressFormContainer
        onCompleted={() => {
          router.push(
            `/olaf/employment-history/[id]`,
            `/olaf/employment-history/${partyId}`,
          );
        }}
        partyId={partyId}
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
AddressHistoryPage.getInitialProps = () => {
  return {};
};

export default withApollo(AddressHistoryPage);
