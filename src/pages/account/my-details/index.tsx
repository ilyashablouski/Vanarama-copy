import dynamic from 'next/dynamic';
import * as toast from 'core/atoms/toast/Toast';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react';
import localForage from 'localforage';
import withApollo from '../../../hocs/withApollo';
import PasswordChangeContainer from '../../../containers/PasswordChangeContainer';
import PersonalInformationFormContainer from '../../../containers/PersonalInformationContainer/PersonalInformation';
import OrderInformationContainer from '../../../containers/OrdersInformation/OrderInformationContainer';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';
import {
  GetPerson,
  GetPerson_getPerson as Person,
} from '../../../../generated/GetPerson';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
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
    '',
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
  const [person, setPerson] = useState<Person | null>(null);
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    localForage
      .getItem<GetPerson>('person')
      .then(value => setPerson(value.getPerson))
      // if value is null exception will be thrown
      // and user should be redirected to authentication
      .catch(() =>
        router.replace(
          `/account/login-register?redirect=${router.pathname}`,
          '/account/login-register',
        ),
      );
  }, [person]);

  if (!person) {
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
      <OrderInformationContainer person={person} />
      <div className="row:my-details">
        <div className="my-details--form">
          <PersonalInformationFormContainer person={person} />
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
              uuid={person?.uuid}
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
