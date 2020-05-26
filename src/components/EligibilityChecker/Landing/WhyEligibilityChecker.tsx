import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import EligibilityCheckerButton from './EligibilityCheckerButton';

const WhyEligibilityChecker: FC<{}> = () => (
  <section className="section -bg-lighter">
    <div className="container">
      <Grid lg="6" md="2" sm="2">
        <Column className="-inset -middle" md="3">
          <div style={{ padding: '1rem' }}>
            <Heading size="large" color="black">
              Why Use Our Eligibility Checker?
            </Heading>
            <IconList>
              <IconListItem iconColor="dark">
                &nbsp;&nbsp;Find out if you'll be accepted for credit with no
                impact on your credit score
              </IconListItem>
              <IconListItem iconColor="dark">
                &nbsp;&nbsp;Get an instant answer
              </IconListItem>
              <IconListItem iconColor="dark">
                &nbsp;&nbsp;It's free and easy
              </IconListItem>
              <IconListItem iconColor="dark">
                &nbsp;&nbsp;We won't use or share your data
              </IconListItem>
            </IconList>
            <EligibilityCheckerButton />
          </div>
        </Column>
        <Column md="3">
          <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40344" />
        </Column>
      </Grid>
    </div>
  </section>
);

export default WhyEligibilityChecker;
