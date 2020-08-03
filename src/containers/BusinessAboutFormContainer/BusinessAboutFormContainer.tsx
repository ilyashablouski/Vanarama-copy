import React from 'react';
import localForage from 'localforage';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import BusinessAboutForm from '../../components/BusinessAboutForm/BusinessAboutForm';
import { useEmailCheck } from '../RegisterFormContainer/gql';
import { useAboutYouData } from '../AboutFormContainer/gql';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { useAboutPageDataQuery, useSaveAboutYouMutation } from './gql';
import { IBusinessAboutFormContainerProps, SubmitResult } from './interfaces';
import { SaveBusinessAboutYou } from '../../../generated/SaveBusinessAboutYou';

const savePersonUuid = async (data: SaveBusinessAboutYou) =>
  localForage.setItem('personUuid', data.createUpdateBusinessPerson?.uuid);

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  personUuid,
  orderId,
  onCompleted,
  onError,
  onLogInCLick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const aboutYouData = useAboutYouData(personUuid);
  const [saveDetails] = useSaveAboutYouMutation(savePersonUuid);
  const [emailAlreadyExists] = useEmailCheck();
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
        const emailAddress = {
          value: values.email,
        };
        const telephoneNumbers = [
          {
            value: values.mobile,
          },
        ];

        await saveDetails({
          variables: {
            input: {
              emailAddress,
              telephoneNumbers,
              title: values.title,
              firstName: values.firstName,
              lastName: values.lastName,
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
                  telephoneNumbers,
                  emailAddresses: [emailAddress],
                  orderUuid: orderId,
                },
              },
            }).then(() => {
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
