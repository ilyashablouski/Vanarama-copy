import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import AboutForm from '../../components/AboutForm';
import { useEmailCheck } from '../RegisterFormContainer/gql';
import { useCreatePerson, useAboutYouData, useAboutPageDataQuery } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const AboutFormContainer: React.FC<IProps> = ({
  onCompleted,
  personUuid,
  onLogInClick,
}) => {
  const aboutPageDataQuery = useAboutPageDataQuery();
  const [createDetailsHandle] = useCreatePerson(onCompleted);
  const aboutYouData = useAboutYouData(personUuid);
  const [emailAlreadyExists] = useEmailCheck();

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
