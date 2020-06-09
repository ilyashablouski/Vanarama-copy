import { NextPage } from 'next';
import { HeroHeading } from '../../components/Hero';
import Lease from '../../components/EligibilityChecker/Landing/Lease';
import WhyEligibilityChecker from '../../components/EligibilityChecker/Landing/WhyEligibilityChecker';
import CustomersReviews from '../../components/EligibilityChecker/Landing/CustomersReviews';
import CustomerThink from '../../components/EligibilityChecker/Landing/CustomerThing';

const EligibilityChecker: NextPage = () => (
  <>
    <div className="row:title">
      <HeroHeading>Your Result</HeroHeading>
    </div>
    <Lease />
    <WhyEligibilityChecker />
    <CustomerThink />
    <CustomersReviews />
  </>
);

export default EligibilityChecker;
