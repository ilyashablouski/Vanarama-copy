import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import EligibilityCheckerButton from './EligibilityCheckerButton';

const WhyEligibilityChecker: FC = () => (
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
                Find out if you&apos;ll be accepted for credit with no impact on
                on your credit score
              </IconListItem>
              <IconListItem iconColor="dark">
                Get an instant answer
              </IconListItem>
              <IconListItem iconColor="dark">
                It&apos;s free and easy
              </IconListItem>
              <IconListItem iconColor="dark">
                We won&apos;t ever use or share your data
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
