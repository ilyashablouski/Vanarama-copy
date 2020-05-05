import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import AboutForm from '../../components/AboutForm';
import { useCreatePerson, useAboutYouData } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const AboutFormContainer: React.FC<IProps> = ({ onCompleted, personUuid }) => {
  const [createDetailsHandle] = useCreatePerson(onCompleted);
  const { data, loading, error } = useAboutYouData(personUuid);
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
