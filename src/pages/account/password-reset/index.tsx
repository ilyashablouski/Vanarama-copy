import React, { useState, useEffect } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Container from '@vanarama/uibook/lib/components/container/Container';
import Section from '@vanarama/uibook/lib/components/container/Section';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import PasswordResetContainer from '../../../containers/PasswordResetContainer';
import withApollo from '../../../hocs/withApollo';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

interface IProps {
  query: ParsedUrlQuery;
}

export const PasswordResetPage: NextPage<IProps> = ({ query }) => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(
      Array.isArray(query?.username) ? query.username[0] : query?.username,
    );
  }, [query]);
  return (
    <MainLayout>
      <Section>
        <Container>
          <Grid sm="2" md="2" lg="5">
            <Column sm="row" md="row" lg="2-4">
              <Heading
                tag="h2"
                size="xlarge"
                color="black"
                dataTestId="reset-password"
              >
                Create New Password
              </Heading>
            </Column>
            <Column sm="row" md="row" lg="2-4">
              <PasswordResetContainer username={username} />
            </Column>
          </Grid>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default withApollo(PasswordResetPage);
