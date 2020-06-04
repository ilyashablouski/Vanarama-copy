import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';

const WhyEligibilityChecker: FC = () => (
  <div className="row:featured-right">
    <div>
      <Heading size="large" color="black">
        Why Use Our Eligibility Checker?
      </Heading>
      <Text tag="p" size="regular" color="darker">
        If you&apos;re looking to drive a brand new car, van or truck without
        any of the hassle - leasing might just be for you! It&apos;s affordable,
        simple and you&apos;re not left with a depreciating asset at the end of
        your contract.
      </Text>
      <IconList>
        <IconListItem iconColor="orange">
          Choose your contract length & agreed mileage
        </IconListItem>
        <IconListItem iconColor="orange">Pay an initial payment</IconListItem>
        <IconListItem iconColor="orange">
          Set up your agreed fixed monthly rental
        </IconListItem>
      </IconList>
    </div>
    <Image
      width="900"
      height="500"
      src="https://source.unsplash.com/collection/2102317/1000x650?sig=40344"
    />
  </div>
);

export default WhyEligibilityChecker;
