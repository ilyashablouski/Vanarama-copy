import { useCallback, useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import localForage from 'localforage';
import { useRouter } from 'next/router';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ILogInFormContainerProps } from './interfaces';
import { useLoginUserMutation, usePersonImperativeQuery } from './gql';
import { MyOrdersTypeEnum } from '../../../generated/globalTypes';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { GET_MY_ORDERS_DATA } from '../OrdersInformation/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../gql/companies';
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
import {
  GetMyOrders,
  GetMyOrdersVariables,
  GetMyOrders_myOrders,
} from '../../../generated/GetMyOrders';
import { GetPerson } from '../../../generated/GetPerson';
import {
  GetCompaniesByPersonUuid,
  GetCompaniesByPersonUuidVariables,
} from '../../../generated/GetCompaniesByPersonUuid';
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

export const filterExistingUuids = (personUuid: string | undefined = '') => (
  uuids: string[] | undefined = [],
): string[] => [...uuids, personUuid].filter(uuid => !!uuid);

export const getPartyUuidsFromCompanies = (
  getCompaniesQuery: ApolloQueryResult<GetCompaniesByPersonUuid>,
) =>
  getCompaniesQuery.data?.companiesByPersonUuid?.map(
    companies => companies.partyUuid,
  );

export const saveOrders = (
  orders: GetMyOrders_myOrders[],
  quotes: GetMyOrders_myOrders[],
) =>
  Promise.all([
    localForage.setItem<number | undefined>('ordersLength', orders?.length),
    localForage.setItem<number | undefined>('quotesLength', quotes?.length),
  ]);

const LoginFormContainer = ({
  onCompleted,
  onError,
}: ILogInFormContainerProps) => {
  const router = useRouter();
  const { redirect } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [login, { error }] = useLoginUserMutation();
  const [addVehiclesToWishlist] = useAddVehicleToWishlistMutation();
  const [savePerson] = useSavePersonMutation();
  const getOrdersData = useImperativeQuery<GetMyOrders, GetMyOrdersVariables>(
    GET_MY_ORDERS_DATA,
  );
  const getCompaniesData = useImperativeQuery<
    GetCompaniesByPersonUuid,
    GetCompaniesByPersonUuidVariables
  >(GET_COMPANIES_BY_PERSON_UUID);
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

  const requestCompanies = (person?: GetPerson['getPerson']) =>
    getCompaniesData({
      personUuid: person?.uuid || '',
    });

  const requestOrders = (partyUuid: string[]) =>
    Promise.all([
      getOrdersData({
        partyUuid,
        filter: MyOrdersTypeEnum.ALL_ORDERS,
      }),
      getOrdersData({
        partyUuid,
        filter: MyOrdersTypeEnum.ALL_QUOTES,
      }),
    ]);

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
        .then(requestPerson)
        .then(personQuery => {
          Promise.all([
            savePerson({
              variables: {
                person: personQuery.data?.getPerson,
              },
            })
              .then(async () => {
                const [companies] = await Promise.all([
                  requestCompanies(personQuery.data?.getPerson),
                  setPersonLoggedIn(personQuery.data?.getPerson),
                ]);
                return companies;
              })
              .then(getPartyUuidsFromCompanies)
              .then(filterExistingUuids(personQuery.data?.getPerson?.partyUuid))
              .then(requestOrders)
              .then(([{ data: orders }, { data: quotes }]) =>
                saveOrders(orders?.myOrders, quotes?.myOrders),
              ),
            router.prefetch((redirect as string) || '/'),
            getLocalWishlistState()
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
