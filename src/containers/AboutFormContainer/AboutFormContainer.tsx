import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
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

const AboutFormContainer: React.FC<IProps> = ({
  onCompleted,
  personLoggedIn,
  personUuid,
  onLogInClick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const [createPerson] = useCreatePerson(onCompleted);
  const aboutYouData = useAboutYouData(personUuid);
  const [emailAlreadyExists] = useEmailCheck();
  const [registerTemporary] = useRegistrationForTemporaryAccessMutation();

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

  const handlePersonCreation = (values: IAboutFormValues) =>
    createPerson({
      variables: {
        input: formValuesToInput(values, aboutYouData.data?.personByUuid),
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
      submit={values =>
        handleTemporaryRegistrationIfGuest(
          values.email,
          values.firstName,
          values.lastName,
        ).then(() => handlePersonCreation(values))
      }
    />
  );
};

export default AboutFormContainer;
