import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import EligibilityCheckerButton from './EligibilityCheckerButton';

const Lease: FC = () => (
  <section className="section">
    <div className="container">
      <div>
        <div>
          <Media
            responsive
            src="https://player.vimeo.com/video/263419265"
            vimeoConfig={{ color: 'EC6408', portrait: false }}
            className="media-wrapper"
            controls
            width="100%"
            height="100%"
          />
        </div>
        <div className="-inset -middle -col-400">
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <Heading size="large" color="black">
                Check If You’re Eligible To Lease
              </Heading>
            </div>
            <Heading size="regular" color="black">
              Can I Lease A Brand New Car?
            </Heading>
            <Text tag="p" size="regular" color="darker">
              Check your likelihood of being accepted for credit, without
              affecting your credit score.
            </Text>
          </div>
          <EligibilityCheckerButton />
        </div>
      </div>
    </div>
  </section>
);

export default Lease;
