import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import EligibilityCheckerButton from './EligibilityCheckerButton';

const CustomerThing: FC = () => (
  <section className="section">
    <div className="container">
      <Grid lg="6" md="2" sm="2">
        <Column className="-col-400 -a-center" lg="2-5">
          <Heading size="large" color="black">
            What Do Our Customers Think?
          </Heading>
          <Text tag="p" size="regular" color="darker">
            More than 1000 people use our eligibility check each week to find
            out their likelihood of getting accepted for credit on a new car
            lease.
          </Text>
          <EligibilityCheckerButton />
        </Column>
      </Grid>
    </div>
  </section>
);

export default CustomerThing;
