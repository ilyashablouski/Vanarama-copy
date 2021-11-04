import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import React from 'react';
import {
  addHeapUserIdentity,
  addHeapUserProperties,
} from '../../utils/addHeapProperties';
import AboutForm from '../../components/AboutForm';
import { IAboutFormValues } from '../../components/AboutForm/interface';
import { useCreatePerson, useAboutYouData, useAboutPageDataQuery } from './gql';
import { useGetCreditApplicationByOrderUuid } from '../../gql/creditApplication';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';
import {
  useRegistrationForTemporaryAccessMutation,
  handlerMock,
} from '../../gql/temporaryRegistration';
import { RegisterForTemporaryAccess_registerForTemporaryAccess as IRegistrationResult } from '../../../generated/RegisterForTemporaryAccess';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const AboutFormContainer: React.FC<IProps> = ({
  orderId,
  onCompleted,
  personUuid,
  onLogInClick,
  onRegistrationClick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const [createPerson] = useCreatePerson(onCompleted);
  const aboutYouData = useAboutYouData(personUuid);
  const [registerTemporary] = useRegistrationForTemporaryAccessMutation();

  const creditApplicationQuery = useGetCreditApplicationByOrderUuid(orderId);

  const handleTemporaryRegistrationIfGuest = (
    username: string,
    firstName: string,
    lastName: string,
  ) =>
    aboutYouData.data?.personByUuid
      ? handlerMock(
          personUuid || null,
          aboutYouData.data?.personByUuid?.emailAddresses[0],
        )
      : registerTemporary({
          variables: {
            username,
            firstName,
            lastName,
          },
        });

  const handlePersonCreation = (
    values: IAboutFormValues,
    data?: IRegistrationResult | null,
  ) =>
    createPerson({
      variables: {
        input: formValuesToInput(values, data),
      },
    });

  if (aboutPageDataQuery.loading || creditApplicationQuery.loading) {
    return <Loading size="large" />;
  }

  if (aboutPageDataQuery.error) {
    return <p>Error: {aboutPageDataQuery.error.message}</p>;
  }

  if (!aboutPageDataQuery.data?.allDropDowns) {
    return null;
  }

  return (
    <AboutForm
      dropdownData={aboutPageDataQuery.data!.allDropDowns}
      person={aboutYouData.data?.personByUuid}
      isEmailDisabled={!!aboutYouData.data?.personByUuid}
      onLogInClick={onLogInClick}
      onRegistrationClick={onRegistrationClick}
      submit={values =>
        handleTemporaryRegistrationIfGuest(
          values.email,
          values.firstName,
          values.lastName,
        ).then(query =>
          handlePersonCreation(
            values,
            query.data?.registerForTemporaryAccess,
          ).then(({ data }) => {
            addHeapUserIdentity(values.email);
            addHeapUserProperties({
              uuid: data?.createUpdatePerson?.uuid,
              bcuid: Cookies.get('BCSessionID') || 'undefined',
            });
          }),
        )
      }
    />
  );
};

export default AboutFormContainer;
