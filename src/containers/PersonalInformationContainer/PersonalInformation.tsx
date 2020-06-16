import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import { MyAccount_myAccountDetailsByPersonUuid as IPerson } from '../../../generated/MyAccount';

import { useCreatePerson, usePersonalInformationData } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const getKey = (person: IPerson | null): string => {
  return `${person?.firstName}${person?.lastName}${person?.address?.serviceId}${person?.telephoneNumber}`;
};

const PersonalInformationContainer: React.FC<IProps> = ({
  personUuid = 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f',
}) => {
  const [createDetailsHandle] = useCreatePerson();
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
      person={data.myAccountDetailsByPersonUuid}
      key={getKey(data.myAccountDetailsByPersonUuid)}
      submit={(values, serviceId) =>
        createDetailsHandle({
          variables: {
            input: formValuesToInput(
              values,
              data.myAccountDetailsByPersonUuid,
              serviceId,
            ),
          },
        })
      }
    />
  );
};

export default PersonalInformationContainer;
