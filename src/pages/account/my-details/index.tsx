import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Card from '@vanarama/uibook/lib/components/molecules/card';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import RouterLink from '../../../components/RouterLink/RouterLink';
import withApollo from '../../../hocs/withApollo';
import PasswordResetContainer from '../../../containers/PasswordResetContainer/PasswordResetContainer';
import PersonalInformationFormContainer from '../../../containers/PersonalInformationContainer/PersonalInformation';

interface IProps {
  query: ParsedUrlQuery;
}

const PATH = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'My Details', href: '/' },
  ],
};

export const MyDetailsPage: NextPage<IProps> = () => {
  const [resetPassword, setResetPassword] = useState(false);

  const router = useRouter();
  const uuid = router.query.uuid as string;

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={PATH.items} />
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
          <Card
            title={{
              title: 'My Orders',
            }}
          >
            <Text tag="span" size="regular" color="dark">
              You have <b>(0)</b> orders.
            </Text>
            <RouterLink
              classNames={{
                color: 'teal',
              }}
              link={{ href: '/', label: '' }}
            >
              View Orders
            </RouterLink>
          </Card>

          <Card
            title={{
              title: 'My Quotes',
            }}
          >
            <Text tag="span" size="regular" color="dark">
              You have <b>(0)</b> quotes.
            </Text>
            <RouterLink
              classNames={{
                color: 'teal',
              }}
              link={{ href: '/', label: '' }}
            >
              View Quotes
            </RouterLink>
          </Card>
        </div>
      </div>
      <div className="row:my-details personalInformation">
        <div className="my-details--form">
          <PersonalInformationFormContainer
            personUuid={uuid || 'eef3eade-3110-4e77-8330-a313e6647cb3'}
          />
        </div>
        <div className="my-details--form">
          <Heading tag="span" size="large" color="black" className="-mb-300">
            Password
          </Heading>
          {!resetPassword ? (
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
          ) : (
            <PasswordResetContainer
              oldPassword
              code={'123'!}
              username="aasdf@gmail.com"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withApollo(MyDetailsPage);
