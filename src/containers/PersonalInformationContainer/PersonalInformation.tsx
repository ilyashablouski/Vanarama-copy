import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import { useCreatePerson, usePersonalInformationData } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const PersonalInformationContainer: React.FC<IProps> = ({ onCompleted, personUuid }) => {
  const [createDetailsHandle] = useCreatePerson(onCompleted);
  const { data, loading, error } = usePersonalInformationData(personUuid);
  console.log('data', data)
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <PersonalInformation
      dropdownData={data ? data.allDropDowns : []}
      person={data.partyByUuid}
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

export default PersonalInformationContainer;
