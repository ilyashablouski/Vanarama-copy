import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import withApollo from '../../../hocs/withApollo';
import PasswordResetContainer from '../../../containers/PasswordResetContainer/PasswordResetContainer';
import PersonalInformationFormContainer from '../../../containers/PersonalInformationContainer/PersonalInformation';
import OrderInformationContainer from '../../../containers/OrdersInformation/OrderInformationContainer';

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
      <OrderInformationContainer
        uuid="df9b082f-bb2e-4699-9849-d09379cb5de6"
        partyByUuid="894096e9-7536-4ee7-aac3-2f209681d904"
      />
      <div className="row:my-details">
        <div className="my-details--form" style={{ gridColumnEnd: 6 }}>
          <PersonalInformationFormContainer personUuid="eef3eade-3110-4e77-8330-a313e6647cb3" />
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
