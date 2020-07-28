import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import BusinessAboutForm from '../../components/BusinessAboutForm/BusinessAboutForm';
import { useEmailCheck } from '../RegisterFormContainer/gql';
import { useAboutYouData } from '../AboutFormContainer/gql';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';

import { useAboutPageDataQuery, useSaveAboutYouMutation } from './gql';
import { IBusinessAboutFormContainerProps, SubmitResult } from './interfaces';

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  personUuid,
  orderId,
  onCompleted,
  onError,
  onLogInCLick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const aboutYouData = useAboutYouData(personUuid);
  const [saveDetails] = useSaveAboutYouMutation();
  const [emailAlreadyExists] = useEmailCheck();
  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );

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
              profilingConsent: values.consent,
              emailConsent: values.marketing,
              smsConsent: values.marketing,
              termsAndConditions: values.termsAndConditions,
            },
          },
        })
          .then(({ data }) =>
            createUpdateApplication({
              variables: {
                input: {
                  ...creditApplication.data?.creditApplicationByOrderUuid,
                  orderUuid: orderId,
                },
              },
            }).then(() => {
              console.log({ data });
              const result = {
                companyUuid: data?.createUpdateBusinessPerson?.uuid,
                companyType: values.companyType,
              } as SubmitResult;
              onCompleted?.(result);
            }),
          )
          .catch(onError);
      }}
    />
  );
};

export default BusinessAboutPageContainer;
