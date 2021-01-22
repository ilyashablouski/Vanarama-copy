import { useEffect, useState } from 'react';
import localForage from 'localforage';
import { OrderInputObject } from '../../generated/globalTypes';

interface IOrderStorageData extends OrderInputObject {
  rating?: number;
}

export default function useGetOrder(): IOrderStorageData | null {
  const [order, setOrder] = useState<IOrderStorageData | null>(null);
  useEffect(() => {
    const getOrder = async () => {
      const storedOrder = await localForage.getItem<IOrderStorageData>('order');

      if (storedOrder) {
        setOrder(storedOrder);
      }
    };

    getOrder();
  }, []);
  return order;
}
