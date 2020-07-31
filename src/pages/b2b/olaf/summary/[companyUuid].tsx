import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import BusinessSummaryFormContainer from '../../../../containers/BusinessSummaryFormContainer/BusinessSummaryFormContainer';
import withApollo from '../../../../hocs/withApollo';
import { OLAFQueryParams } from 'utils/url';
import { useState, useEffect } from 'react';
import localForage from 'localforage'

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

const BusinessSummaryPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, derivativeId, orderId } = router.query as QueryParams;
  const [personUuid, setPersonUuid] = useState('');

  useEffect(() => {
    const getPersonUuid = async () => {
      const personUuid = await localForage.getItem('personUuid') as string;
      if (personUuid) { setPersonUuid(personUuid); }
    }
    getPersonUuid();
  }, []);
  return (
    <OLAFLayout>
      <BusinessSummaryFormContainer personUuid={personUuid} orderId={orderId} companyUuid={companyUuid} />
    </OLAFLayout>
  );
};

export default withApollo(BusinessSummaryPage, { getDataFromTree });
