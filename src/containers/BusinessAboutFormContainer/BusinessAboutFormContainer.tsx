import React, { useMemo } from 'react';
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
import { responseToInitialFormValues, mapAboutPersonData } from './mappers';
import { CompanyTypes } from '../../models/enum/CompanyTypes';
import { CreditApplicationTypeEnum as CATypeEnum } from '../../../generated/globalTypes';

const savePersonUuid = async (data: SaveBusinessAboutYou) =>
  localForage.setItem('personUuid', data.createUpdateBusinessPerson?.uuid);

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  orderId,
  personUuid,
  onCompleted,
  onError,
  onLogInCLick,
  isEdited,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const aboutYouData = useAboutYouData(personUuid);
  const [saveDetails] = useSaveAboutYouMutation(savePersonUuid);
  const [emailAlreadyExists] = useEmailCheck();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );
  const getCreditApplicationByOrderUuidQuery = useGetCreditApplicationByOrderUuid(
    orderId,
  );

  const creditApplication =
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid;
  const personByUuid = aboutYouData.data?.personByUuid;
  const person = useMemo(() => {
    if (creditApplication?.aboutDetails) {
      return responseToInitialFormValues(creditApplication.aboutDetails);
    }

    if (personByUuid) {
      return mapAboutPersonData(personByUuid);
    }

    return null;
  }, [creditApplication, personByUuid]);

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
      onSubmit={values => {
        saveDetails({
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
                  creditApplicationType:
                    values.companyType === CompanyTypes.limited ||
                    values.companyType === CompanyTypes.partnership
                      ? CATypeEnum.B2B_LIMITED
                      : CATypeEnum.B2B_SOLE_TRADER,
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
