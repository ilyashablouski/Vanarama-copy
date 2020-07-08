import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import BusinessAboutForm from '../../components/BusinessAboutForm/BusinessAboutForm';

import { useAboutPageDataQuery, useSaveAboutYouMutation } from './gql';
import { IBusinessAboutFormContainerProps } from './interfaces';

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  onCompleted,
  onError,
}) => {
  const { data, loading, error } = useAboutPageDataQuery();

  const [saveDetails] = useSaveAboutYouMutation(onCompleted, onError);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error || !data?.allDropDowns) {
    return (
      <Text tag="p" color="danger" size="lead">
        Sorry, an unexpected error occurred. Please try again!
      </Text>
    );
  }

  return (
    <BusinessAboutForm
      dropDownData={data.allDropDowns}
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
