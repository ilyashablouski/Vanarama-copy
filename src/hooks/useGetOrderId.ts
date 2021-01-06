import { useEffect, useState } from 'react';
import localForage from 'localforage';

export default function useGetOrderId(): string {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const getOrderID = async () => {
      const orderIdStorage = await localForage.getItem<string>('orderId');

      if (orderIdStorage) {
        setOrderId(orderIdStorage);
      }
    };

    getOrderID();
  }, []);

  return orderId;
}
