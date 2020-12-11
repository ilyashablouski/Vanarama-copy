import dynamic from 'next/dynamic';
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
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Breadcrumb = dynamic(
  () => import('../../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  query: ParsedUrlQuery;
}

const handleNetworkError = () =>
  toast.error(
    'Sorry there seems to be an issue with your password reset request. Pleaser try again in a few moments',
    'Dolor ut tempor eiusmod enim consequat laboris dolore ut pariatur labore sunt incididunt dolore veniam mollit excepteur dolor aliqua minim nostrud adipisicing culpa aliquip ex',
  );

const breadcrumbItems = [
  {
    link: {
      href: '/',
      label: 'home',
    },
  },
  {
    link: {
      href: '',
      label: 'my details',
    },
  },
];

const metaData = {
  canonicalUrl: null,
  legacyUrl: null,
  metaDescription: null,
  metaRobots: null,
  name: null,
  pageType: null,
  publishedOn: null,
  slug: null,
  title: 'My Account Details | Vanarama',
  schema: null,
  breadcrumbs: null,
};

const MyDetailsPage: NextPage<IProps> = () => {
  const router = useRouter();
  const { uuid } = router.query as MyDetailsQueryParams;

  const [resetPassword, setResetPassword] = useState(false);

  if (!uuid) {
    return <Loading size="large" />;
  }

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbItems} />
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
                toast.success('Your New Password Has Been Saved', '');
                setResetPassword(false);
              }}
              onNetworkError={handleNetworkError}
            />
          )}
        </div>
      </div>
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export default withApollo(MyDetailsPage);
