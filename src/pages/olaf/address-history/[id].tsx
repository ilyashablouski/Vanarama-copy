import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import OlafContainer from '../../../components/OlafContainer';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import withApollo from '../../../hocs/withApollo';

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const personUuid = router.query.id as string;
  return (
    <OlafContainer activeStep={2}>
      <AddressFormContainer
        onCompleted={() => {
          router.push(
            `/olaf/employment-history/[id]`,
            `/olaf/employment-history/${personUuid}`,
          );
        }}
        personUuid={personUuid}
      />
    </OlafContainer>
  );
};

export default withApollo(AddressHistoryPage, { getDataFromTree });
