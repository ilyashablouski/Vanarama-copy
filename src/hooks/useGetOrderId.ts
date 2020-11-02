import { useEffect, useState } from 'react';
import localForage from 'localforage';

export default function useGetOrderId(): string {
  const [orderId, setOrderId] = useState('');
  useEffect(() => {
    const getOrderID = async () => {
      const orderIdStorage = (await localForage.getItem('orderId')) as string;
      if (orderIdStorage) {
        setOrderId(orderIdStorage);
      }
    };
    getOrderID();
  }, []);
  return orderId;
}
