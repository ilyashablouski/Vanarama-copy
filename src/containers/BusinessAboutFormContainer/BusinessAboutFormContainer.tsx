import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import BusinessAboutForm from '../../components/BusinessAboutForm/BusinessAboutForm';
import { useEmailCheck } from '../RegisterFormContainer/gql';
import { useAboutYouData } from '../AboutFormContainer/gql';

import { useAboutPageDataQuery, useSaveAboutYouMutation } from './gql';
import { IBusinessAboutFormContainerProps } from './interfaces';

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  onCompleted,
  onError,
  personUuid,
  onLogInCLick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const aboutYouData = useAboutYouData(personUuid);
  const [saveDetails] = useSaveAboutYouMutation(onCompleted, onError);
  const [emailAlreadyExists] = useEmailCheck();

  if (aboutPageDataQuery?.loading) {
    return <Loading size="large" />;
  }

  if (aboutPageDataQuery?.error || !aboutPageDataQuery?.data?.allDropDowns) {
    return (
      <Text tag="p" color="danger" size="lead">
        Sorry, an unexpected error occurred. Please try again!
      </Text>
    );
  }

  return (
    <BusinessAboutForm
      dropDownData={aboutPageDataQuery.data?.allDropDowns}
      person={aboutYouData.data?.personByUuid}
      onLogInCLick={onLogInCLick}
      onEmailExistenceCheck={async email => {
        const results = await emailAlreadyExists({
          variables: { email },
        });

        return Boolean(results?.data?.emailAlreadyExists);
      }}
      onSubmit={async values => {
        await saveDetails({
          variables: {
            input: {
              title: values.title,
              firstName: values.firstName,
              lastName: values.lastName,
              telephoneNumbers: [
                {
                  value: values.telephone,
                },
              ],
              emailAddress: {
                value: values.email,
              },
              company: {
                companyType: values.companyType,
              },
              profilingConsent: values.consent,
              emailConsent: values.marketing,
              smsConsent: values.marketing,
              termsAndConditions: values.termsAndConditions,
              role: {
                position: 'Account owner',
                primaryContact: true,
              },
            },
          },
        });
      }}
    />
  );
};

export default BusinessAboutPageContainer;
