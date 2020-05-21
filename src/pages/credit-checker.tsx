import React from 'react';

import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';

import Score from '@vanarama/uibook/lib/components/atoms/score';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import withApollo from '../hocs/withApollo';

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
          <Grid sm="6" md="2" lg="2">
            <Column sm="row" md="row" lg="row">
              <Breadcrumb items={breadcrumbProps.items} />
            </Column>
            <Column className="-col-400" sm="row" md="row" lg="row">
              <Heading color="black" size="xlarge">
                Your Result
              </Heading>
            </Column>
            <Column sm="row" md="row" lg="row">
              <Text size="regular" color="darker">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                odio blanditiis amet reiciendis cupiditate voluptas dolorum?
                Quidem nam ad debitis!
              </Text>
            </Column>
            <Column sm="row" md="row" lg="row">
              <Score score={75} />
            </Column>
            <Column className="-inset -col-400" sm="row" md="row" lg="row">
              <Heading>Choose Your Vehicle</Heading>
              <Text>
                Not sure?
                <Link>We can help you choose</Link>
              </Text>
              <Button
                color="teal"
                size="regular"
                fill="solid"
                label="Choose Your Vehicle"
              />
            </Column>
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default withApollo(CreditChecker, { getDataFromTree });
