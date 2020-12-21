import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import {
  MyAccount,
  MyAccountVariables,
  MyAccount_myAccountDetailsByPersonUuid as IPerson,
} from '../../../generated/MyAccount';

import { GET_PERSON_INFORMATION_DATA, useCreatePerson } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const getKey = (person: IPerson | null): string => {
  return `${person?.firstName}${person?.lastName}${person?.address?.serviceId}${person?.telephoneNumber}${person?.emailConsent}`;
};

const PersonalInformationContainer: React.FC<IProps> = ({ personUuid }) => {
  const { loading, data, error, refetch } = useQuery<
    MyAccount,
    MyAccountVariables
  >(GET_PERSON_INFORMATION_DATA, {
    variables: {
      personUuid: personUuid || '',
    },
  });
  const [createDetailsHandle] = useCreatePerson(() => {
    refetch();
  });

  useEffect(() => {
    if (personUuid && !data) {
      refetch();
    }
  }, [personUuid, refetch, data]);

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
