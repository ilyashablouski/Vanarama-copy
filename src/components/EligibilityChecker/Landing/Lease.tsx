import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import EligibilityCheckerButton from './EligibilityCheckerButton';

interface ILease {
  body: string | null;
  title: string | null;
  video: string | null;
}

const Lease: FC<ILease> = ({ body, title, video }) => (
  <div className="row:featured-right">
    <div>
      <Heading size="large" color="black">
        {title}
      </Heading>
      <Text tag="p" size="regular" color="darker">
        {body}
      </Text>
      <EligibilityCheckerButton path="https://beta.vanarama.com/credit-checker.html" />
    </div>
    {video && (
      <div className="media">
        <Media
          responsive
          src={video || ''}
          vimeoConfig={{ color: 'EC6408', portrait: false }}
          className="media-player"
          controls
          width="100%"
          height="100%"
        />
      </div>
    )}
  </div>
);

export default Lease;
