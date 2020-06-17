import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import withApollo from '../../../hocs/withApollo';
import PasswordChangeContainer from '../../../containers/PasswordChangeContainer';
import PersonalInformationFormContainer from '../../../containers/PersonalInformationContainer/PersonalInformation';
import OrderInformationContainer from '../../../containers/OrdersInformation/OrderInformationContainer';

export const PARTY_BY_UUID = '7c53729d-7000-4268-8f6b-354ee8e999ce';
const personUuid = 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f'; // for test

interface IProps {
  query: ParsedUrlQuery;
}

const PATH = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'My Details', href: '/' },
  ],
};

const MyDetailsPage: NextPage<IProps> = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;

  const partyByUuid = PARTY_BY_UUID;
  const [resetPassword, setResetPassword] = useState(false);

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
      <OrderInformationContainer uuid={uuid} partyByUuid={partyByUuid} />
      <div className="row:my-details">
        <div className="my-details--form">
          <PersonalInformationFormContainer personUuid={uuid || personUuid} />
        </div>
        <div className="my-details--form ">
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
            <>
              <PasswordChangeContainer
                uuid={uuid || personUuid}
                onCompleted={() => {
                  toast.success(
                    'Your New Password Has Been Saved',
                    'Ipsum duis aute cupidatat occaecat nisi aute dolore do non ex incididunt do consectetur excepteur',
                  );
                  setResetPassword(false);
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default withApollo(MyDetailsPage);
