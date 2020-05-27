import React from 'react';
import { NextPage } from 'next';
import Score from '@vanarama/uibook/lib/components/atoms/score';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';

const CreditChecker: NextPage = () => {
  const breadcrumbProps = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Leasing Guide', href: '/' },
      { label: 'Check Your Eligibility', href: '/' },
    ],
  };
  return (
    <div>
      <section className="section">
        <div className="container">
          <Grid lg="6" md="2" sm="2">
            <Column sm="row">
              <Breadcrumb items={breadcrumbProps.items} />
            </Column>
            <Column className="-col-400" md="row">
              <Heading color="black" size="xlarge">
                Your Result
              </Heading>
            </Column>
            <Column md="2">
              <Score score={75} />
            </Column>
            <Column className="column -inset -col-400" md="4">
              <Heading tag="span" size="large">
                Choose Your Vehicle
              </Heading>
              <Text tag="p" size="regular" color="darker">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                odio blanditiis amet reiciendis cupiditate voluptas dolorum?
                Quidem nam ad debitis!
              </Text>
              <Button
                color="teal"
                size="regular"
                fill="solid"
                label="Choose Your Vehicle "
                role="button"
              />
              <Text tag="p">
                Not sure? We can <Link>help you choose</Link>
              </Text>
            </Column>
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default CreditChecker;
