import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import OlafContainer from '../../../components/OlafContainer';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import withApollo from '../../../hocs/withApollo';

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OlafContainer activeStep={2}>
      <AddressFormContainer
        onCompleted={() => {
          const url = `/olaf/employment-history/[uuid]`;
          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OlafContainer>
  );
};

export default withApollo(AddressHistoryPage, { getDataFromTree });
