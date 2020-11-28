import React, { useMemo } from 'react';
import localForage from 'localforage';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import BusinessAboutForm from '../../components/BusinessAboutForm/BusinessAboutForm';
import { IBusinessAboutFormValues } from '../../components/BusinessAboutForm/interfaces';
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
import {
  useRegistrationForTemporaryAccessMutation,
  handlerMock,
} from '../../gql/temporaryRegistration';

const savePersonUuid = async (data: SaveBusinessAboutYou) =>
  localForage.setItem('personUuid', data.createUpdateBusinessPerson?.uuid);

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  orderId,
  personUuid,
  onCompleted,
  onError,
  personLoggedIn,
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
  const [registerTemporary] = useRegistrationForTemporaryAccessMutation();

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

  const onEmailCheck = async (email: string) => {
    try {
      const results = await emailAlreadyExists({
        variables: { email },
      });
      return Boolean(results?.data?.emailAlreadyExists);
    } catch {
      return false;
    }
  };

  const handleTemporaryRegistrationIfGuest = (
    username: string,
    firstName: string,
    lastName: string,
  ) =>
    personUuid
      ? handlerMock()
      : registerTemporary({
          variables: {
            username,
            firstName,
            lastName,
          },
        });

  const handleDetailsSave = (values: IBusinessAboutFormValues) => {
    return saveDetails({
      variables: {
        input: {
          emailAddress: {
            value: values.email,
            uuid:
              creditApplication?.aboutDetails.aboutDetails.email_addresses[0]
                .uuid || null,
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
    });
  };

  const handleCreateUpdateCreditApplication = (
    values: IBusinessAboutFormValues,
    data?: SaveBusinessAboutYou | null,
  ) =>
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...getCreditApplicationByOrderUuidQuery.data
            ?.creditApplicationByOrderUuid,
          aboutDetails: {
            ...values,
            emailAddress: undefined,
            email: undefined,
            mobile: undefined,
            emailAddresses: data?.createUpdateBusinessPerson?.emailAddresses,
            telephoneNumbers:
              data?.createUpdateBusinessPerson?.telephoneNumbers,
          },
          orderUuid: orderId,
          creditApplicationType:
            (values.companyType === CompanyTypes.limited &&
              CATypeEnum.B2B_LIMITED) ||
            (values.companyType === CompanyTypes.partnership &&
              CATypeEnum.B2B_REGISTERED_PARTNERSHIP) ||
            CATypeEnum.B2B_SOLE_TRADER,
        }),
      },
    });

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
      personLoggedIn={personLoggedIn}
      person={person}
      onLogInCLick={onLogInCLick}
      onEmailExistenceCheck={onEmailCheck}
      onSubmit={values => {
        handleTemporaryRegistrationIfGuest(
          values.email,
          values.firstName,
          values.lastName,
        )
          .then(() => handleDetailsSave(values))
          .then(({ data }) =>
            handleCreateUpdateCreditApplication(values, data).then(() => {
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
