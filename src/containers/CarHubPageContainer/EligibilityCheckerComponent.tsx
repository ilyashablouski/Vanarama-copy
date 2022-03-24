import ImageV2 from 'core/atoms/image/ImageV2';
import Heading from 'core/atoms/heading';
import dynamic from 'next/dynamic';
import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const EligibilityCheckerComponent = () => (
  <>
    <div>
      <ImageV2
        width="800"
        height="400"
        quality={60}
        src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Eligibility-Checker-Arc+(2).jpg"
        size="expand"
        plain
      />
      <Heading size="large" color="black">
        Check Your Eligibility For A New Car Lease
      </Heading>
      <RouterLink
        className="button"
        classNames={{ color: 'teal', solid: true, size: 'regular' }}
        link={{
          label: 'Check My Eligibility',
          href: '/lease-eligibility-checker',
        }}
        dataUiTestId="eligibility-Checker-btn"
        withoutDefaultClassName
      >
        <div className="button--inner">Check My Eligibility</div>
      </RouterLink>
      <Text tag="p" color="dark" size="xsmall">
        This will not affect your credit score.
      </Text>
    </div>
    <div>
      <ImageV2
        width="800"
        height="400"
        quality={60}
        src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Help-Me-Choose2.jpg"
        size="expand"
        plain
      />
      <Heading size="large" color="black">
        Not Sure Which Vehicle Is Best For You?
      </Heading>
      <RouterLink
        className="button"
        classNames={{ color: 'teal', solid: true, size: 'regular' }}
        dataUiTestId="car-leasing-page_help-me-choose-button"
        link={{
          label: 'Help Me Choose',
          href: '/help-me-choose',
        }}
        withoutDefaultClassName
      >
        <div className="button--inner">Help Me Choose</div>
      </RouterLink>
    </div>
  </>
);

export default EligibilityCheckerComponent;
