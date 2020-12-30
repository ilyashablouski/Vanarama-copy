import { useEffect, useState } from 'react';
import localForage from 'localforage';
import { OrderInputObject } from '../../generated/globalTypes';

export default function useGetOrder(): OrderInputObject | null {
  const [order, setOrder] = useState<OrderInputObject | null>(null);
  useEffect(() => {
    const getOrder = async () => {
      const storedOrder = await localForage.getItem<OrderInputObject>('order');

      if (storedOrder) {
        setOrder(storedOrder);
      }
    };

    getOrder();
  }, []);
  return order;
}
