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
import { RegisterForTemporaryAccess_registerForTemporaryAccess_emailAddress as IEmailAddress } from '../../../generated/RegisterForTemporaryAccess';

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
    const results = await emailAlreadyExists({
      variables: { email },
    });
    return Boolean(results?.data?.emailAlreadyExists);
  };

  const handleTemporaryRegistrationIfGuest = (
    username: string,
    firstName: string,
    lastName: string,
  ) =>
    personUuid
      ? handlerMock(aboutYouData.data?.personByUuid?.emailAddresses[0])
      : registerTemporary({
          variables: {
            username,
            firstName,
            lastName,
          },
        });

  const handlePersonCreation = (
    values: IAboutFormValues,
    emailAddress?: IEmailAddress | null,
  ) =>
    createPerson({
      variables: {
        input: formValuesToInput(values, emailAddress),
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
        ).then(query =>
          handlePersonCreation(
            values,
            query.data?.registerForTemporaryAccess.emailAddress,
          ),
        )
      }
    />
  );
};

export default AboutFormContainer;
