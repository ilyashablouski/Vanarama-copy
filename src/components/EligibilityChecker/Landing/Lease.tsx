import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import EligibilityCheckerButton from './EligibilityCheckerButton';

const Lease: FC = () => (
  <div className="row:featured-right">
    <div>
      <Heading size="large" color="black">
        Find Out If You Can Lease A Brand-New Car
      </Heading>
      <Text tag="p" size="regular" color="darker">
        Et sunt irure sunt dolore laboris dolore mollit amet enim fugiat in qui
        sunt mollit magna sint consectetur cillum consequat excepteur nisi
        pariatur laborum aute minim voluptate dolor ex adipisicing aliqua sit
        ipsum reprehenderit amet ut nostrud sint do exercitation
      </Text>
      <Text tag="p" size="regular" color="darker">
        Veniam tempor ea officia velit ex et sint enim consectetur labore quis
        commodo ea ut esse duis incididunt eu ex
      </Text>
      <EligibilityCheckerButton />
    </div>
    <div className="media">
      <Media
        responsive
        src="https://player.vimeo.com/video/263419265"
        vimeoConfig={{ color: 'EC6408', portrait: false }}
        className="media-player"
        controls
        width="100%"
        height="100%"
      />
    </div>
  </div>
);

export default Lease;
