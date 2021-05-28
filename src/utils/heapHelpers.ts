import { Nullish } from '../types/common';
import { VehicleProductInputObject } from '../../generated/globalTypes';

declare global {
  interface Window {
    heap?: {
      track: (event: string, properties?: Object) => void;
    };
  }
}

// eslint-disable-next-line import/prefer-default-export
export function pushAddToCartHeap(
  vehicleProduct: Nullish<VehicleProductInputObject>,
) {
  if (vehicleProduct)
    window.heap?.track('addToCart', {
      maintenance: vehicleProduct.maintenance ?? false,
      mileage: vehicleProduct.annualMileage,
      upfront: vehicleProduct.depositMonths,
      colour: vehicleProduct.colour,
      trim: vehicleProduct.trim,
      term: vehicleProduct.term,
    });
}
