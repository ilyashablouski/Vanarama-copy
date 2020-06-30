import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Lease from '../../components/EligibilityChecker/Landing/Lease';
import WhyEligibilityChecker from '../../components/EligibilityChecker/Landing/WhyEligibilityChecker';
import CustomerThink from '../../components/EligibilityChecker/Landing/CustomerThing';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';

const REVIEW_TILES = [
  {
    author: 'John Smith',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    score: 4,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
  {
    author: 'John Smith',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    score: 2.5,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
  {
    author: 'John Smith',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    score: 4.5,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
];

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
    <div className="row:bg-lighter ">
      <div className="row:carousel">
        <CustomerReviews
          reviews={REVIEW_TILES}
          headingClassName="-mb-400 -a-center"
          sliderClassName="-mh-000"
        />
      </div>
    </div>
  </>
);

export default EligibilityChecker;
