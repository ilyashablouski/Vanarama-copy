import { useState } from 'react';
import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import withApollo from '../../hocs/withApollo';
import EligibilityCheckerContainer from '../../containers/EligibilityCheckerContainer/EligibilityCheckerContainer';
import ErrorMessage from './error-message';

const EligibilityCheckerDetails: NextPage = () => {
  const [
    eligibilityCheckerScoreError,
    setEligibilityCheckerScoreError,
  ] = useState(false);
  const router = useRouter();

  const breadcrumbProps = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Eligibility Checker', href: '/eligibility-checker' },
      { label: 'Enter Details', href: '/eligibility-checker/details' },
    ],
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          {eligibilityCheckerScoreError && <ErrorMessage />}
          <div style={{ marginBottom: '1rem' }}>
            <Breadcrumb items={breadcrumbProps.items} />
          </div>
          <EligibilityCheckerContainer
            onCompleted={({ quickCreditChecker }) => {
              if (
                quickCreditChecker?.score === 0 &&
                quickCreditChecker?.status &&
                quickCreditChecker?.status > 1
              ) {
                setEligibilityCheckerScoreError(true);
              } else {
                const url = `/credit-checker?score=${quickCreditChecker?.score}`;
                router.push(url);
              }
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default withApollo(EligibilityCheckerDetails, { getDataFromTree });
