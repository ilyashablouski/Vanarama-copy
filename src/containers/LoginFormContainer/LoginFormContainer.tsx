import React, { useCallback, useState } from 'react';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ILogInFormContainerProps } from './interfaces';
import { useLoginUserMutation, usePersonImperativeQuery } from './gql';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { useSavePersonMutation } from '../../gql/storedPerson';
import {
  GET_VEHICLE_CONFIG_LIST,
  getVehicleConfigListFromQuery,
  getVehicleConfigIdsFromConfigList,
} from '../../gql/vehicleConfigList';
import {
  GET_WISHLIST_VEHICLE_IDS,
  getWishlistVehicleIdsFromQuery,
  useAddVehicleToWishlistMutation,
} from '../../gql/wishlist';
import { GetCompaniesByPersonUuid } from '../../../generated/GetCompaniesByPersonUuid';
import {
  GetWishlistVehicleIds,
  GetWishlistVehicleIdsVariables,
} from '../../../generated/GetWishlistVehicleIds';
import {
  GetVehicleConfigList,
  GetVehicleConfigListVariables,
} from '../../../generated/GetVehicleConfigList';
import { ILoginFormValues } from '../../components/LoginForm/interfaces';
import { setPersonLoggedIn } from '../../utils/personHelpers';
import {
  updateWishlistState,
  getLocalWishlistState,
} from '../../utils/wishlistHelpers';
import { Nullish } from '../../types/common';
import { setLocalCookies } from '../../utils/authentication';

export const filterExistingUuids = (personUuid: string | undefined = '') => (
  uuids: string[] | undefined = [],
): string[] => [...uuids, personUuid].filter(uuid => !!uuid);

export const getPartyUuidsFromCompanies = (
  getCompaniesQuery: ApolloQueryResult<GetCompaniesByPersonUuid>,
) =>
  getCompaniesQuery.data?.companiesByPersonUuid?.map(
    companies => companies.partyUuid,
  );

const LoginFormContainer = ({
  onCompleted,
  onError,
}: ILogInFormContainerProps) => {
  const client = useApolloClient();
  const router = useRouter();
  const { redirect } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [login, { error }] = useLoginUserMutation();
  const [addVehiclesToWishlist] = useAddVehicleToWishlistMutation();
  const [savePerson] = useSavePersonMutation();
  const getPerson = usePersonImperativeQuery();
  const getWishlistVehicleIds = useImperativeQuery<
    GetWishlistVehicleIds,
    GetWishlistVehicleIdsVariables
  >(GET_WISHLIST_VEHICLE_IDS);
  const getVehicleConfigList = useImperativeQuery<
    GetVehicleConfigList,
    GetVehicleConfigListVariables
  >(GET_VEHICLE_CONFIG_LIST);

  const requestLogin = (values: ILoginFormValues) =>
    login({
      variables: {
        username: values.email,
        password: values.password,
      },
    });

  const requestPerson = () => getPerson({});

  const saveWishlist = (partyUuid: Nullish<string>) => (
    vehicleConfigurationIds: Array<string>,
  ) =>
    addVehiclesToWishlist({
      variables: {
        vehicleConfigurationIds,
        partyUuid: partyUuid ?? '',
      },
    });

  const requestWishlist = (partyUuid: Nullish<string>) =>
    getWishlistVehicleIds({
      partyUuid: partyUuid ?? '',
    });

  const requestVehicleConfigList = (configIds: string[]) =>
    getVehicleConfigList({
      configIds,
    });

  const handleLoginComplete = useCallback(
    values => {
      setIsLoading(true);
      return requestLogin(values)
        .then(operation => setLocalCookies(operation.data))
        .then(requestPerson)
        .then(personQuery => {
          Promise.all([
            savePerson({
              variables: {
                person: personQuery.data?.getPerson,
              },
            }),
            setPersonLoggedIn(personQuery.data?.getPerson),
            router.prefetch((redirect as string) || '/'),
            getLocalWishlistState(client)
              .then(saveWishlist(personQuery.data.getPerson?.partyUuid))
              .then(() =>
                requestWishlist(personQuery.data.getPerson?.partyUuid)
                  .then(getWishlistVehicleIdsFromQuery)
                  .then(requestVehicleConfigList)
                  .then(getVehicleConfigListFromQuery)
                  .then(getVehicleConfigIdsFromConfigList)
                  .then(updateWishlistState),
              ),
          ]);
          return personQuery;
        })
        .then(personQuery => onCompleted?.(personQuery?.data?.getPerson))
        .catch(onError)
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <LoginForm
      hasError={Boolean(error)}
      isSubmitting={isLoading}
      onSubmit={handleLoginComplete}
    />
  );
};

export default LoginFormContainer;
