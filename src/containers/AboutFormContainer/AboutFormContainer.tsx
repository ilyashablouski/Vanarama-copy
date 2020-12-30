import dynamic from 'next/dynamic';
import React from 'react';
import AboutForm from '../../components/AboutForm';
import { IAboutFormValues } from '../../components/AboutForm/interface';
import { useEmailCheck } from '../RegisterFormContainer/gql';
import { useCreatePerson, useAboutYouData, useAboutPageDataQuery } from './gql';
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
  onCompleted,
  personLoggedIn,
  personUuid,
  onLogInClick,
  onRegistrationClick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const [createPerson] = useCreatePerson(onCompleted);
  const aboutYouData = useAboutYouData(personUuid);
  const [emailAlreadyExists] = useEmailCheck();
  const [registerTemporary] = useRegistrationForTemporaryAccessMutation();

  const onEmailCheck = async (email: string) => {
    const result = await emailAlreadyExists({
      variables: { email },
    });

    const checkResult = result.data?.emailAlreadyExists;

    if (!checkResult?.isSuccessfull) {
      return null;
    }

    return checkResult;
  };

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

  if (aboutPageDataQuery.loading) {
    return <Loading size="large" />;
  }

  if (aboutPageDataQuery.error) {
    return <p>Error: {aboutPageDataQuery.error.message}</p>;
  }

  if (
    !aboutPageDataQuery.data?.allDropDowns ||
    aboutPageDataQuery.data?.allDropDowns === null
  ) {
    return null;
  }

  return (
    <AboutForm
      dropdownData={aboutPageDataQuery.data!.allDropDowns}
      person={aboutYouData.data?.personByUuid}
      personLoggedIn={personLoggedIn}
      onEmailExistenceCheck={
        aboutYouData.data?.personByUuid ? undefined : onEmailCheck
      }
      onLogInClick={onLogInClick}
      onRegistrationClick={onRegistrationClick}
      submit={values =>
        handleTemporaryRegistrationIfGuest(
          values.email,
          values.firstName,
          values.lastName,
        ).then(query =>
          handlePersonCreation(values, query.data?.registerForTemporaryAccess),
        )
      }
    />
  );
};

export default AboutFormContainer;
