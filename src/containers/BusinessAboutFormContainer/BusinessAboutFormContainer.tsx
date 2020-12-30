import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import localForage from 'localforage';
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
import {
  CreditApplicationTypeEnum as CATypeEnum,
  LeaseTypeEnum,
} from '../../../generated/globalTypes';
import {
  useRegistrationForTemporaryAccessMutation,
  handlerMock,
} from '../../gql/temporaryRegistration';
import { RegisterForTemporaryAccess_registerForTemporaryAccess as IRegistrationResult } from '../../../generated/RegisterForTemporaryAccess';
import Skeleton from '../../components/Skeleton';
import { useCreateUpdateOrder } from '../../gql/order';
import useGetOrder from '../../hooks/useGetOrder';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

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
  const order = useGetOrder();
  const aboutPageDataQuery = useAboutPageDataQuery();
  const aboutYouData = useAboutYouData(personUuid);
  const [saveDetails] = useSaveAboutYouMutation(savePersonUuid);
  const [emailAlreadyExists] = useEmailCheck();
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
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
    const results = await emailAlreadyExists({
      variables: { email },
    });
    return Boolean(results?.data?.emailAlreadyExists);
  };

  const email =
    personByUuid?.emailAddresses[0] ||
    creditApplication?.aboutDetails.email_addresses[0];
  const handleTemporaryRegistrationIfGuest = (
    username: string,
    firstName: string,
    lastName: string,
  ) =>
    person
      ? handlerMock(personUuid || null, email)
      : registerTemporary({
          variables: {
            username,
            firstName,
            lastName,
          },
        });

  const handleDetailsSave = (
    values: IBusinessAboutFormValues,
    data?: IRegistrationResult | null,
  ) => {
    return saveDetails({
      variables: {
        input: {
          uuid: data?.uuid,
          emailAddress: {
            value: values.email,
            uuid: data?.emailAddress?.uuid,
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
          privacyPolicy: values.privacyPolicy,
        },
      },
    });
  };

  const handleOrderUpdate = (businessPersonUuid?: string | null) =>
    createUpdateOrder({
      variables: {
        input: {
          lineItems: order?.lineItems || [],
          leaseType: order?.leaseType || LeaseTypeEnum.BUSINESS,
          uuid: orderId,
          personUuid: businessPersonUuid,
        },
      },
    }).then(response =>
      localForage.setItem('orderId', response.data?.createUpdateOrder?.uuid),
    );

  const handleCreateUpdateCreditApplication = (
    values: IBusinessAboutFormValues,
    data?: SaveBusinessAboutYou | null,
    orderUuid?: string | null,
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
          orderUuid: orderUuid || '',
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
          .then(query =>
            handleDetailsSave(values, query.data?.registerForTemporaryAccess),
          )
          .then(({ data }) =>
            handleOrderUpdate(data?.createUpdateBusinessPerson?.uuid)
              .then(orderUuid =>
                handleCreateUpdateCreditApplication(values, data, orderUuid),
              )
              .then(() => {
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
