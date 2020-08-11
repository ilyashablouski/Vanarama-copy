import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';

interface IWhyEligibilityChecker {
  body: string | null;
  title: string | null;
  image: {
    title: string | null;
    file: {
      url: string | null;
    } | null;
  } | null;
}

const WhyEligibilityChecker: FC<IWhyEligibilityChecker> = ({
  body,
  title,
  image,
}) => (
  <div className="row:featured-right">
    <div>
      <Heading size="large" color="black">
        {title}
      </Heading>
      <Text tag="p" size="regular" color="darker">
        {body}
      </Text>
      {/* <IconList>
        <IconListItem iconColor="orange">
          Choose your contract length & agreed mileage
        </IconListItem>
        <IconListItem iconColor="orange">Pay an initial payment</IconListItem>
        <IconListItem iconColor="orange">
          Set up your agreed fixed monthly rental
        </IconListItem>
      </IconList> */}
    </div>
    <Image
      width="900"
      height="500"
      src={image?.file?.url || ''}
      alt={image?.title || ''}
    />
  </div>
);

export default WhyEligibilityChecker;
