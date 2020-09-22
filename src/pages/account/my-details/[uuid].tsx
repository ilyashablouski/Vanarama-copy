import Heading from '@vanarama/uibook/lib/components/atoms/heading';
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
import { MyDetailsQueryParams } from '../../../utils/url';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

interface IProps {
  query: ParsedUrlQuery;
}

const handleNetworkError = () =>
  toast.error(
    'Sorry there seems to be an issue with your password reset request. Pleaser try again in a few moments',
    'Dolor ut tempor eiusmod enim consequat laboris dolore ut pariatur labore sunt incididunt dolore veniam mollit excepteur dolor aliqua minim nostrud adipisicing culpa aliquip ex',
  );

const MyDetailsPage: NextPage<IProps> = () => {
  const router = useRouter();
  const { uuid } = router.query as MyDetailsQueryParams;

  const [resetPassword, setResetPassword] = useState(false);

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataTestId="my-details-heading"
        >
          My Details
        </Heading>
      </div>
      <OrderInformationContainer />
      <div className="row:my-details">
        <div className="my-details--form">
          <PersonalInformationFormContainer personUuid={uuid} />
        </div>
        <div className="my-details--form ">
          <Heading tag="span" size="large" color="black" className="-mb-300">
            Password
          </Heading>
          {!resetPassword ? (
            <div className="form">
              <Text>
                It’s important that you choose a strong password for your
                account and don&#39;t re-use it for other accounts. If you need
                to change your password, simply hit the button below.
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
            <PasswordChangeContainer
              uuid={uuid}
              onCompleted={() => {
                toast.success(
                  'Your New Password Has Been Saved',
                  'Ipsum duis aute cupidatat occaecat nisi aute dolore do non ex incididunt do consectetur excepteur',
                );
                setResetPassword(false);
              }}
              onNetworkError={handleNetworkError}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withApollo(MyDetailsPage);
