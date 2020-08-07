import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import localForage from 'localforage';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import BusinessSummaryFormContainer from '../../../../containers/BusinessSummaryFormContainer/BusinessSummaryFormContainer';
import withApollo from '../../../../hocs/withApollo';

type QueryParams = {
  companyUuid: string;
  orderId: string;
};

const BusinessSummaryPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, orderId } = router.query as QueryParams;
  const [personUuid, setPersonUuid] = useState('');

  useEffect(() => {
    const getPersonUuid = async () => {
      const personUuidStorage = (await localForage.getItem(
        'personUuid',
      )) as string;
      if (personUuidStorage) {
        setPersonUuid(personUuidStorage);
      }
    };
    getPersonUuid();
  }, []);

  return (
    <OLAFLayout>
      <BusinessSummaryFormContainer
        personUuid={personUuid}
        orderId={orderId}
        companyUuid={companyUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(BusinessSummaryPage, { getDataFromTree });
