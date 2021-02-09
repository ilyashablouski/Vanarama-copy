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
import { createEmailErrorMessage } from '../../components/AboutForm/mapEmailErrorMessage';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const AboutFormContainer: React.FC<IProps> = ({
  onCompleted,
  personUuid,
  onLogInClick,
  onRegistrationClick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const [createPerson] = useCreatePerson(onCompleted);
  const aboutYouData = useAboutYouData(personUuid);
  const [emailAlreadyExists] = useEmailCheck();
  const [registerTemporary] = useRegistrationForTemporaryAccessMutation();

  const emailValidator = async (email: string) => {
    if (!email) {
      return undefined;
    }

    const result = await emailAlreadyExists({
      variables: { email },
    });

    const checkResult = result.data?.emailAlreadyExists;

    if (!checkResult?.isSuccessfull || !!aboutYouData.data?.personByUuid) {
      return undefined;
    }

    return createEmailErrorMessage(checkResult);
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

  if (!aboutPageDataQuery.data?.allDropDowns) {
    return null;
  }

  return (
    <AboutForm
      dropdownData={aboutPageDataQuery.data!.allDropDowns}
      person={aboutYouData.data?.personByUuid}
      emailValidator={emailValidator}
      isEmailDisabled={!!aboutYouData.data?.personByUuid}
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
