import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Container from '@vanarama/uibook/lib/components/container/Container';
import Section from '@vanarama/uibook/lib/components/container/Section';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Card, {
  CardContent,
} from '@vanarama/uibook/lib/components/molecules/card';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import withApollo from '../../../hocs/withApollo';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import PersonalInformationFormContainer from '../../../containers/PersonalInformationContainer/PersonalInformation';

interface IProps {
  query: ParsedUrlQuery;
}

export const MyDetailsPage: NextPage<IProps> = () => {
  const [resetPassword, setResetPassword] = useState(false);

  const path = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'My Details', href: '/' },
    ],
  };

  return (
    <MainLayout>
      <section className="sectionn -pb-400 -pt-400">
        <Container>
          <Breadcrumb items={path.items} />
        </Container>
      </section>
      <section className="section -pb-500 -pt-000">
        <Container>
          <Heading
            tag="h1"
            size="xlarge"
            color="black"
            dataTestId="my-details-heading"
          >
            My Details
          </Heading>
        </Container>
      </section>
      <section className="section -bg-lighter">
        <Container>
          <Grid sm="1" md="2" lg="3">
            <Column sm="row" md="1" lg="1">
              <Card>
                <CardContent>
                  <Heading tag="span" size="regular" color="black">
                    My Orders
                  </Heading>
                  <div className="-pt-300 -pb-300">
                    <Text>
                      You have <b>(0)</b> orders.
                    </Text>
                  </div>
                  <Link color="teal" href="#">
                    View Orders
                  </Link>
                </CardContent>
              </Card>
            </Column>
            <Column sm="row" md="1" lg="1">
              <Card>
                <CardContent>
                  <Heading tag="h3" size="regular">
                    My Quotes
                  </Heading>
                  <div className="-pt-300 -pb-300">
                    <Text>
                      You have <b>(0)</b> quotes.
                    </Text>
                  </div>
                  <Link color="teal" href="#">
                    View Quotes
                  </Link>
                </CardContent>
              </Card>
            </Column>
          </Grid>
        </Container>
      </section>
      <Section>
        <Container>
          <Grid sm="1" md="1" lg="5">
            <Column sm="row" md="1" lg="1-2">
              <PersonalInformationFormContainer onCompleted={() => {}} />
            </Column>
            <Column sm="row" md="1" lg="4-5">
              <Heading
                tag="h2"
                size="large"
                color="black"
                dataTestId="my-details-heading"
                className="-pt-400 -pb-400"
              >
                Password
              </Heading>
              {!resetPassword && (
                <>
                  <Text>
                    Ex sunt tempor pariatur nulla ea Lorem excepteur et occaecat
                    consequat nisi fugiat pariatur ut veniam ea sint occaecat sit
                    laborum anim esse amet fugiat
                  </Text>
                  <div className="-pt-300 -pb-300">
                    <Button
                      label="Change Password"
                      color="teal"
                      onClick={() => setResetPassword(true)}
                    />
                  </div>
                </>
              )}
            </Column>
          </Grid>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default withApollo(MyDetailsPage);
