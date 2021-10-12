import { useStoredOrderQuery } from '../gql/storedOrder';

export default function useGetOrderId(): string {
  const { data } = useStoredOrderQuery();

  return data?.storedOrder?.order?.uuid || '';
}
