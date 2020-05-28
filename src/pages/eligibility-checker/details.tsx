import { NextPage } from 'next';
import YourEligibilityChecker from '../../components/EligibilityChecker/YourEligibilityChecker';

const EligibilityCheckerDetails: NextPage = () => (
  <main>
    <section className="section">
      <div className="container">
        <YourEligibilityChecker submit={() => {}} />
      </div>
    </section>
  </main>
);

export default EligibilityCheckerDetails;
