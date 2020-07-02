import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import AboutForm from '../../components/AboutForm';
import { useEmailCheck } from '../RegisterFormContainer/gql';
import { useCreatePerson, useAboutYouData } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const AboutFormContainer: React.FC<IProps> = ({
  onCompleted,
  personUuid,
  onLogInClick,
}) => {
  const [createDetailsHandle] = useCreatePerson(onCompleted);
  const { data, loading, error } = useAboutYouData(personUuid);
  const [emailAlreadyExists] = useEmailCheck();

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns) {
    return null;
  }

  return (
    <AboutForm
      dropdownData={data.allDropDowns}
      person={data.personByUuid}
      onEmailExistenceCheck={async email => {
        const results = await emailAlreadyExists({
          variables: { email },
        });

        return Boolean(results?.data?.emailAlreadyExists);
      }}
      onLogInClick={onLogInClick}
      submit={values =>
        createDetailsHandle({
          variables: {
            input: formValuesToInput(values),
          },
        })
      }
    />
  );
};

export default AboutFormContainer;


