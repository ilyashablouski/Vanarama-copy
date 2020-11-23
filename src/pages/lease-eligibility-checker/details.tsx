import { useState } from 'react';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import withApollo from '../../hocs/withApollo';
import EligibilityCheckerContainer from '../../containers/EligibilityCheckerContainer/EligibilityCheckerContainer';
import ErrorMessage from './error-message';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useGenericPage } from '../../gql/genericPage';
import { getSectionsData } from '../../utils/getSectionsData';

const EligibilityCheckerDetails: NextPage = () => {
  const [
    eligibilityCheckerScoreError,
    setEligibilityCheckerScoreError,
  ] = useState(false);
  const router = useRouter();
  const { data } = useGenericPage(router.asPath.slice(1));

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
      </div>
      <div className="row:title">
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
    </>
  );
};

export default withApollo(EligibilityCheckerDetails, { getDataFromTree });
