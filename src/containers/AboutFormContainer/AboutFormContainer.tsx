import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import AboutForm from '../../components/AboutForm';
import { useCreatePerson, useDropdowns } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const AboutFormContainer: React.FC<IProps> = ({ onCompleted }) => {
  const [createDetailsHandle] = useCreatePerson(onCompleted);
  const { data, loading, error } = useDropdowns();
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
      submit={values => {
        createDetailsHandle({
          variables: {
            input: formValuesToInput(values),
          },
        });
      }}
    />
  );
};

export default AboutFormContainer;
