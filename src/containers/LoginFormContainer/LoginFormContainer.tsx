import { useCallback } from 'react';
import { gql, ApolloQueryResult } from '@apollo/client';
import localForage from 'localforage';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ILogInFormContainerProps } from './interfaces';
import { useLoginUserMutation } from './gql';
import { MyOrdersTypeEnum } from '../../../generated/globalTypes';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { GET_MY_ORDERS_DATA } from '../OrdersInformation/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../gql/companies';
import {
  GetMyOrders,
  GetMyOrdersVariables,
} from '../../../generated/GetMyOrders';
import { GetPerson } from '../../../generated/GetPerson';
import {
  GetCompaniesByPersonUuid,
  GetCompaniesByPersonUuidVariables,
} from '../../../generated/GetCompaniesByPersonUuid';
import { ILoginFormValues } from '../../components/LoginForm/interfaces';

const filterExistingUuids = (personUuid: string | undefined = '') => (
  uuids: string[] | undefined = [],
): string[] => [...uuids, personUuid].filter(uuid => !!uuid);

const getPartyUuidsFromCompanies = (
  getCompaniesQuery: ApolloQueryResult<GetCompaniesByPersonUuid>,
) =>
  getCompaniesQuery.data?.companiesByPersonUuid?.map(
    companies => companies.partyUuid,
  );

export const GET_PERSON_QUERY = gql`
  query GetPerson {
    getPerson {
      uuid
      firstName
      lastName
      partyUuid
      emailAddresses {
        value
        partyId
      }
    }
  }
`;

const LoginFormContainer = ({
  onCompleted,
  onError,
}: ILogInFormContainerProps) => {
  const [login, { loading, error }] = useLoginUserMutation();
  const getOrdersData = useImperativeQuery<GetMyOrders, GetMyOrdersVariables>(
    GET_MY_ORDERS_DATA,
  );
  const getCompaniesData = useImperativeQuery<
    GetCompaniesByPersonUuid,
    GetCompaniesByPersonUuidVariables
  >(GET_COMPANIES_BY_PERSON_UUID);
  const getPerson = useImperativeQuery<GetPerson>(GET_PERSON_QUERY);

  const requestLogin = (values: ILoginFormValues) =>
    login({
      variables: {
        username: values.email,
        password: values.password,
      },
    });

  const requestPerson = () => getPerson({});

  const savePerson = (getPersonQuery: ApolloQueryResult<GetPerson>) =>
    localForage.setItem<GetPerson | undefined>('person', getPersonQuery.data);

  const requestCompanies = (data?: GetPerson) =>
    getCompaniesData({
      personUuid: data?.getPerson?.uuid || '',
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

  const saveOrders = ([ordersQuery, quotesQuery]: ApolloQueryResult<
    GetMyOrders
  >[]) =>
    Promise.all([
      localForage.setItem<number | undefined>(
        'ordersLength',
        ordersQuery.data?.myOrders.length,
      ),
      localForage.setItem<number | undefined>(
        'quotesLength',
        quotesQuery.data?.myOrders.length,
      ),
    ]);

  const handleLoginComplete = useCallback(
    values =>
      requestLogin(values)
        .then(requestPerson)
        .then(personQuery =>
          savePerson(personQuery)
            .then(requestCompanies)
            .then(getPartyUuidsFromCompanies)
            .then(filterExistingUuids(personQuery.data?.getPerson?.partyUuid))
            .then(requestOrders)
            .then(saveOrders)
            .then(() => onCompleted?.(personQuery?.data?.getPerson)),
        )
        .then(() => {})
        .catch(onError),
    [],
  );

  return (
    <LoginForm
      hasError={Boolean(error)}
      isSubmitting={loading}
      onSubmit={handleLoginComplete}
    />
  );
};

export default LoginFormContainer;
