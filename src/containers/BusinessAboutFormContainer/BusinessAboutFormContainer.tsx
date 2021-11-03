import Cookies from 'js-cookie';
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import localForage from 'localforage';
import {
  useStoredOrderQuery,
  useSaveOrderMutation,
} from '../../gql/storedOrder';
import BusinessAboutForm from '../../components/BusinessAboutForm/BusinessAboutForm';
import { IBusinessAboutFormValues } from '../../components/BusinessAboutForm/interfaces';
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
import { useSavePersonEmailMutation } from '../../gql/storedPersonEmail';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

export const BusinessAboutPageContainer: React.FC<IBusinessAboutFormContainerProps> = ({
  personUuid,
  onCompleted,
  onError,
  onLogInCLick,
  onRegistrationClick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const aboutYouData = useAboutYouData(personUuid);
  const [savePersonEmailMutation] = useSavePersonEmailMutation();

  const savePersonDataInLocalStorage = async (data: SaveBusinessAboutYou) => {
    await Promise.all([
      localForage.setItem('personUuid', data.createUpdateBusinessPerson?.uuid),
      savePersonEmailMutation({
        variables: {
          email: data.createUpdateBusinessPerson?.emailAddresses[0].value,
        },
      }),
    ]);
  };

  const [saveDetails] = useSaveAboutYouMutation(savePersonDataInLocalStorage);
  const [createUpdateOrder] = useCreateUpdateOrder(() => {});
  const [createUpdateApplication] = useCreateUpdateCreditApplication();
  const [saveOrderMutation] = useSaveOrderMutation();
  const { data: orderData } = useStoredOrderQuery();
  const order = orderData?.storedOrder?.order;

  const getCreditApplicationByOrderUuidQuery = useGetCreditApplicationByOrderUuid(
    order?.uuid || '',
  );
  const [registerTemporary] = useRegistrationForTemporaryAccessMutation();

  const creditApplication =
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid;
  const isEdit = !!creditApplication?.aboutDetailsV2;
  const personByUuid = aboutYouData.data?.personByUuid;

  const person = useMemo(() => {
    // after the first filling (during the edit) data should be taken from CA
    if (isEdit) {
      return responseToInitialFormValues(creditApplication?.aboutDetailsV2);
    }

    // at the first filling there is not credit application data
    // take data from personByUuid to prefill form for logged in users
    if (personByUuid) {
      return mapAboutPersonData(personByUuid);
    }

    // anonymous user that came first time to the about form
    return null;
  }, [creditApplication, personByUuid, isEdit]);

  const email =
    personByUuid?.emailAddresses?.[0] ||
    creditApplication?.aboutDetailsV2?.emailAddresses?.[0] ||
    null;
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
          uuid: order?.uuid,
          personUuid: businessPersonUuid,
        },
      },
    }).then(response =>
      saveOrderMutation({
        variables: {
          order: {
            ...(order! || {}),
            uuid: response?.data?.createUpdateOrder?.uuid,
          },
          rating: orderData?.storedOrder?.rating,
        },
      }),
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
    return <Loading dataTestId="about-you_loading" size="large" />;
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
              .then(orderUpdateResult =>
                handleCreateUpdateCreditApplication(
                  values,
                  data,
                  orderUpdateResult.data?.saveOrder?.order?.uuid,
                ),
              )
              .then(() => {
                const result = {
                  businessPersonUuid: data?.createUpdateBusinessPerson?.uuid,
                  companyType: values.companyType,
                } as SubmitResult;
                onCompleted?.(result);
              })
              .then(() => {
                addHeapUserIdentity(values.email);
                addHeapUserProperties({
                  uuid: data?.createUpdateBusinessPerson?.uuid,
                  bcuid: Cookies.get('BCSessionID') || 'undefined',
                });
              }),
          )
          .catch(onError);
      }}
    />
  );
};

export default BusinessAboutPageContainer;
