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
      <div className="row:title">
        <Breadcrumb items={path.items} />
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataTestId="my-details-heading"
        >
          My Details
        </Heading>
      </div>
      <div className="row:bg-light">
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
      </div>
      <div className="row:my-details">
        <PersonalInformationFormContainer personUuid="eef3eade-3110-4e77-8330-a313e6647cb3" />
        <div className="my-details--form " style={{ gridColumnStart: 7 }}>
          <Heading tag="span" size="large" color="black" className="-mb-300">
            Password
          </Heading>
          {!resetPassword && (
            <div className="form">
              <Text>
                Excepteur fugiat pariatur officia aliquip ex enim culpa
                voluptate eu deserunt labore sit dolore sit proident velit esse
                adipisicing deserunt velit elit sunt mollit Lorem
              </Text>
              <div className="-pt-300 -pb-300">
                <Button
                  label="Change Password"
                  color="teal"
                  onClick={() => setResetPassword(true)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withApollo(MyDetailsPage);
