import { useState } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import withApollo from '../../hocs/withApollo';
import EligibilityCheckerContainer from '../../containers/EligibilityCheckerContainer/EligibilityCheckerContainer';
import { useGenericPage } from '../../gql/genericPage';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const ErrorMessage = dynamic(() => import('./error-message'), {
  loading: () => <Skeleton count={1} />,
});

const EligibilityCheckerDetails: NextPage = () => {
  const [
    eligibilityCheckerScoreError,
    setEligibilityCheckerScoreError,
  ] = useState(false);
  const router = useRouter();
  const { data } = useGenericPage(router.asPath.slice(1));

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading
          color="black"
          size="xlarge"
          dataTestId="eligibilityCheckerHeading"
          tag="h1"
        >
          Enter Details
        </Heading>
      </div>
      <div className="eligibility-checker">
        {eligibilityCheckerScoreError && <ErrorMessage />}
        <EligibilityCheckerContainer
          onCompleted={({ quickCreditChecker }) => {
            if (
              quickCreditChecker?.score === 0 &&
              quickCreditChecker?.status &&
              quickCreditChecker?.status > 1
            ) {
              setEligibilityCheckerScoreError(true);
            } else {
              const url = `/lease-eligibility-checker/credit-checker?score=${quickCreditChecker?.score}`;
              router.push(url);
            }
          }}
        />
      </div>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default withApollo(EligibilityCheckerDetails, { getDataFromTree });
