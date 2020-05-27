import { NextPage } from 'next';
import { HeroHeading } from '../../components/Hero';
import Lease from '../../components/EligibilityChecker/Landing/Lease';
import WhyEligibilityChecker from '../../components/EligibilityChecker/Landing/WhyEligibilityChecker';
import CustomersReviews from '../../components/EligibilityChecker/Landing/CustomersReviews';
import CustomerThink from '../../components/EligibilityChecker/Landing/CustomerThing';

const EligibilityChecker: NextPage = () => (
  <main>
    <section className="section">
      <div className="container">
        <HeroHeading>Eligibility Checker</HeroHeading>
      </div>
      <Lease />
      <WhyEligibilityChecker />
      <CustomerThink />
      <CustomersReviews />
    </section>
  </main>
);

export default EligibilityChecker;
