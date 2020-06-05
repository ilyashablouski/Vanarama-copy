import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Card, {
  CardContent,
} from '@vanarama/uibook/lib/components/molecules/card';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import withApollo from '../../../hocs/withApollo';
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
    <>
      <section className="sectionn -pb-400 -pt-400">
        <div className="row:title">
          <Breadcrumb items={path.items} />
        </div>
      </section>
      <section className="section -pb-500 -pt-000">
        <div className="row:title">
          <Heading
            tag="h1"
            size="xlarge"
            color="black"
            dataTestId="my-details-heading"
          >
            My Details
          </Heading>
        </div>
      </section>
      <section className="row:bg-light">
        <div className="row:cards-3col">
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
        </div>
      </section>
      <div className="row:my-details row\:my-details">
        <PersonalInformationFormContainer
          personUuid="eef3eade-3110-4e77-8330-a313e6647cb3"
        />
        <div className="my-details--form " style={{ gridColumnStart: 6 }}>
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
                Excepteur fugiat pariatur officia aliquip ex enim culpa voluptate eu
                deserunt labore sit dolore sit proident velit esse adipisicing
                deserunt velit elit sunt mollit Lorem
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
        </div>
      </div>
    </>
  );
};

export default withApollo(MyDetailsPage);
