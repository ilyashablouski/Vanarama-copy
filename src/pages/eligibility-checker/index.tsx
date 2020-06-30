import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Lease from '../../components/EligibilityChecker/Landing/Lease';
import WhyEligibilityChecker from '../../components/EligibilityChecker/Landing/WhyEligibilityChecker';
import CustomersReviews from '../../components/EligibilityChecker/Landing/CustomersReviews';
import CustomerThink from '../../components/EligibilityChecker/Landing/CustomerThing';

const EligibilityChecker: NextPage = () => (
  <>
    <div className="row:title">
      <Heading size="xlarge" color="white">
        Your Result
      </Heading>
    </div>
    <Lease />
    <WhyEligibilityChecker />
    <CustomerThink />
    <CustomersReviews />
  </>
);

export default EligibilityChecker;
