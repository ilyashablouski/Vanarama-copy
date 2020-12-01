import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import {
  MyAccount,
  MyAccountVariables,
  MyAccount_myAccountDetailsByPersonUuid as IPerson,
} from '../../../generated/MyAccount';

import { GET_PERSON_INFORMATION_DATA, useCreatePerson } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const getKey = (person: IPerson | null): string => {
  return `${person?.firstName}${person?.lastName}${person?.address?.serviceId}${person?.telephoneNumber}${person?.emailConsent}`;
};

const PersonalInformationContainer: React.FC<IProps> = ({ personUuid }) => {
  const [getPersonInformation, { loading, data, error }] = useLazyQuery<
    MyAccount,
    MyAccountVariables
  >(GET_PERSON_INFORMATION_DATA, {
    variables: {
      personUuid: personUuid || '',
    },
  });
  const [createDetailsHandle] = useCreatePerson(() => {
    getPersonInformation();
  });

  useEffect(() => {
    if (personUuid && !data) {
      getPersonInformation();
    }
  }, [personUuid, getPersonInformation, data]);

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
              data?.myAccountDetailsByPersonUuid,
              serviceId,
            ),
          },
        })
      }
    />
  );
};

export default PersonalInformationContainer;
