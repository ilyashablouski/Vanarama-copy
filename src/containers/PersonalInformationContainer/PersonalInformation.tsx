import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import { MyAccount_myAccountMaskedDetailsByPersonUuid as IPerson } from '../../../generated/MyAccount';

import { useCreatePerson } from './gql';
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
  isEditPersonalInformationEnabled?: boolean;
}

const PersonalInformationContainer: React.FC<IProps> = props => {
  const { person, uuid: personUuid, isEditPersonalInformationEnabled } = props;
  const [personData, setPersonData] = useState<IPerson | null>(person);

  const [createDetailsHandle, { loading, error }] = useCreatePerson(data => {
    setPersonData(data.updateMyAccountDetails);
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
      isEditPersonalInformationEnabled={isEditPersonalInformationEnabled}
    />
  );
};

export default PersonalInformationContainer;
