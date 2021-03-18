import Cookies from 'js-cookie';
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
import { responseToInitialFormValues, mapAboutPersonData } from './mappers';
import { CompanyTypes } from '../../models/enum/CompanyTypes';
import {
  addHeapUserIdentity,
  addHeapUserProperties,
} from '../../utils/addHeapProperties';
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
import { createEmailErrorMessage } from '../../components/AboutForm/mapEmailErrorMessage';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const savePersonUuid = async (data: SaveBusinessAboutYou) => {
  await Promise.all([
    localForage.setItem('personUuid', data.createUpdateBusinessPerson?.uuid),
    localForage.setItem(
      'personEmail',
      data.createUpdateBusinessPerson?.emailAddresses[0].value,
    ),
  ]);
};

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  orderId,
  personUuid,
  onCompleted,
  onError,
  onLogInCLick,
  onRegistrationClick,
  personLoggedIn,
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
  const isEdit =
    Object.values(creditApplication?.aboutDetails || {}).length > 0;
  const personByUuid = aboutYouData.data?.personByUuid;

  const person = useMemo(() => {
    // after the first filling (during the edit) data should be taken from CA
    if (isEdit) {
      return responseToInitialFormValues(creditApplication?.aboutDetails);
    }

    // at the first filling there is not credit application data
    // take data from personByUuid to prefill form for logged in users
    if (personByUuid) {
      return mapAboutPersonData(personByUuid);
    }

    // anonymous user that came first time to the about form
    return null;
  }, [creditApplication, personByUuid]);

  const emailValidator = async (email: string) => {
    const result = await emailAlreadyExists({
      variables: { email },
    });

    const checkResult = result.data?.emailAlreadyExists;

    if (!checkResult?.isSuccessful || isEdit || personLoggedIn) {
      return undefined;
    }

    return createEmailErrorMessage(checkResult);
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
    addHeapUserIdentity(values.email);
    addHeapUserProperties({
      uuid: data?.emailAddress?.uuid,
      bcuid: Cookies.get('BCSessionID') || 'undefined',
    });
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
        input: {
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
        },
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
      isEdit={isEdit}
      isEmailDisabled={person !== null}
      dropDownData={aboutPageDataQuery.data?.allDropDowns}
      person={person}
      onLogInCLick={onLogInCLick}
      onRegistrationClick={onRegistrationClick}
      emailValidator={emailValidator}
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
