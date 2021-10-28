import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import {
  MyAccount,
  MyAccountVariables,
  MyAccount_myAccountDetailsByPersonUuid as IPerson,
} from '../../../generated/MyAccount';

import { GET_PERSON_INFORMATION_DATA, useCreatePerson } from './gql';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const getKey = (person: IPerson | null): string => {
  return `${person?.firstName}${person?.lastName}${person?.address?.serviceId}${person?.telephoneNumber}${person?.emailConsent}`;
};

interface IProps {
  person: IPerson;
  uuid: string;
}

const PersonalInformationContainer: React.FC<IProps> = props => {
  const { person, uuid: personUuid } = props;
  const [personData, setPersonData] = useState<IPerson | null>(person);

  const onPersonDataLoad = (data: MyAccount) => {
    setPersonData(data.myAccountDetailsByPersonUuid);
  };

  const [loadPersonData, { loading, error }] = useLazyQuery<
    MyAccount,
    MyAccountVariables
  >(GET_PERSON_INFORMATION_DATA, {
    variables: {
      personUuid: personUuid || '',
    },
    onCompleted: onPersonDataLoad,
  });

  const [createDetailsHandle] = useCreatePerson(() => {
    loadPersonData();
  });

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <PersonalInformation
      person={personData}
      key={getKey(personData)}
      submit={(values, serviceId) =>
        createDetailsHandle({
          variables: {
            input: formValuesToInput(values, personUuid, serviceId),
          },
        })
      }
    />
  );
};

export default PersonalInformationContainer;
