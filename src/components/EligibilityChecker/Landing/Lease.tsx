import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import EligibilityCheckerButton from './EligibilityCheckerButton';

const Lease: FC<{}> = () => (
  <section className="section">
    <div className="container">
      <Grid lg="6" md="2" sm="2">
        <Column md="3">
          <Media
            responsive
            src="https://player.vimeo.com/video/263419265"
            vimeoConfig={{ color: 'EC6408', portrait: false }}
            className="media-wrapper"
            controls
            width="100%"
            height="100%"
          />
        </Column>
        <Column className="-inset -middle -col-400" md="3">
          <div>
            <Heading size="large" color="black">
              Can I Lease A Brand-New Car?
            </Heading>
            <Text tag="p" size="regular" color="darker">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
              assumenda tenetur cumque tempore sit commodi perferendis minima
              ipsam reiciendis rerum!
            </Text>
          </div>
          <EligibilityCheckerButton />
        </Column>
      </Grid>
    </div>
  </section>
);

export default Lease;
