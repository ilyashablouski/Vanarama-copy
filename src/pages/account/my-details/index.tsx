import { gql } from '@apollo/client';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Container from '@vanarama/uibook/lib/components/container/Container';
import Section from '@vanarama/uibook/lib/components/container/Section';
import Card, {
  CardContent,
  CardIcons,
} from '@vanarama/uibook/lib/components/molecules/card';
import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import withApollo from '../../../hocs/withApollo';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import ResetPasswordForm from '../../../components/ResetPasswordForm';
import PersonalInformationFormContainer from '../../../containers/PersonalInformationFormContainer/PersonalInformationContainer';

interface IProps {
  query: ParsedUrlQuery;
}

export const PASSWORD_REQUEST_MUTATION = gql`
  mutation PasswordRequestMutation($username: String!) {
    passwordReset(username: $username)
  }
`;

export const PasswordRequestPage: NextPage<IProps> = () => {

  const [resetPassword, setResetPassword] = useState(false);

  const props = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'My Details', href: '/' },
    ],
  };

  const editableList = [
    {
      textEdit: true,
      label: 'First Name',
      value: '',
      name: 'First Name',
      id: 'firstName',
    },
    {
      textEdit: true,
      label: 'Last Name',
      value: '',
      name: 'Last Name',
      id: 'lastName',
    },
    {
      selectEdit: true,
      label: 'Address',
      value: '012100000',
      name: 'Address',
      options: {
        data: ['Unitied Kingdom', 'Canada', 'Unitied States'],
        favourites: ['United Kingdom'],
      },
      id: 'address',
    },
    {
      textEdit: true,
      label: 'Telephone',
      value: 'Telephone',
      name: 'telephone',
      id: 'telephone',
    },
    {
      textEdit: false,
      label: 'Email',
      value: 'Email',
      name: 'email',
      id: 'email',
    },
  ];

  return (
    <MainLayout>
      <section className="sectionn -pb-400 -pt-400">
        <Container>
          <Breadcrumb items={props.items} />
        </Container>
      </section>
      <section className="section -pb-400 -pt-100">
        <Container>
          <Heading
            tag="h2"
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
                  <Heading tag="h3" size="regular">
                    My Orders
                  </Heading>
                  <div className=" -pt-500 -pb-500">
                    <Text>You have <b>(0)</b> orders.</Text>
                  </div>
                </CardContent>
                <CardContent flex>
                  <Text color="teal">View Orders</Text>
                </CardContent>
              </Card>
            </Column>
            <Column sm="row" md="1" lg="1">
              <Card>
                <CardContent>
                  <Heading tag="h3" size="regular">
                    My Quotes
                  </Heading>
                  <div className="-pt-500 -pb-500">
                    <Text>You have <b>(0)</b> quotes.</Text>
                  </div>
                </CardContent>
                <CardContent>
                  <Button label="View Quotes" color="teal" />
                </CardContent>
              </Card>
            </Column>
            <Column sm="row" md="1" lg="1">
              <Card>
                <CardContent>
                  <Heading tag="h3" size="regular">
                    My Wishlist
                  </Heading>
                  <div className="-pt-500 -pb-500">
                    <Text>You have <b>(0)</b> items in your wishlist.</Text>
                  </div>
                </CardContent>
                <CardContent>
                  <Button label="View Wishlist" color="teal" />
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
              <PersonalInformationFormContainer onCompleted={() => {}}/>
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
              {resetPassword && (
                <ResetPasswordForm
                  username="username"
                  // hasError={Boolean(error)}
                  onSubmit={async values => {setResetPassword(false)}}
                />
              )}
            </Column>
          </Grid>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default withApollo(PasswordRequestPage);
