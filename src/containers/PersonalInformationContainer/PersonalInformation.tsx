import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import { useCreatePerson, usePersonalInformationData } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const PersonalInformationContainer: React.FC<IProps> = ({ personUuid }) => {
  const [createDetailsHandle] = useCreatePerson(() => console.log("hi"));
  const { data, loading, error } = usePersonalInformationData(personUuid);

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
      person={data.partyByUuid}
      submit={(values, address) =>
        createDetailsHandle({
          variables: {
            input: formValuesToInput(
              values, 
              data.partyByUuid,
              address
              ),
          },
        })
      }
    />
  );
};

export default PersonalInformationContainer;
