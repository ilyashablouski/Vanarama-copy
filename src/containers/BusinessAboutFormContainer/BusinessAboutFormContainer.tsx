import React from 'react';
import localForage from 'localforage';
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
import { SaveBusinessAboutYou } from '../../../generated/SaveBusinessAboutYou';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';
import { responseToInitialFormValues } from './mappers';

const savePersonUuid = async (data: SaveBusinessAboutYou) =>
  localForage.setItem('personUuid', data.createUpdateBusinessPerson?.uuid);

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  orderId,
  onCompleted,
  onError,
  onLogInCLick,
  isEdited,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const [saveDetails] = useSaveAboutYouMutation(savePersonUuid);
  const [emailAlreadyExists] = useEmailCheck();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );
  const getCreditApplicationByOrderUuidQuery = useGetCreditApplicationByOrderUuid(
    orderId,
  );

  const person = responseToInitialFormValues(
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid
      ?.aboutDetails,
  );

  if (
    aboutPageDataQuery?.loading ||
    getCreditApplicationByOrderUuidQuery.loading
  ) {
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
      isEdited={isEdited}
      dropDownData={aboutPageDataQuery.data?.allDropDowns}
      person={person}
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
              emailAddress: {
                value: values.email,
              },
              telephoneNumbers: [
                {
                  value: values.mobile,
                  kind: 'Mobile',
                },
              ],
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
                input: formValuesToInputCreditApplication({
                  ...getCreditApplicationByOrderUuidQuery.data
                    ?.creditApplicationByOrderUuid,
                  aboutDetails: values,
                  orderUuid: orderId,
                }),
              },
            }).then(() => {
              const result = {
                businessPersonUuid: data?.createUpdateBusinessPerson?.uuid,
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
