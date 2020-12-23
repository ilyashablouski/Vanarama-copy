import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { ProductCardData_productCarousel_keyInformation as IKeyInfo } from '../../generated/ProductCardData';
import SyncCircleOutline from '../../public/assets/icons/SyncCircleOutline';

const options = {
  loading: () => <SyncCircleOutline />,
  ssr: false,
};

type TIconMap = { [key: string]: ComponentType<{}> };

export function getFeatureIcon(name: string) {
  const iconMap: TIconMap = {
    AirConditioning: dynamic(
      () => import('../../public/assets/icons/AirConditioning'),
      {
        ...options,
      },
    ),
    Alloys: dynamic(() => import('../../public/assets/icons/Alloys'), {
      ...options,
    }),
    Bluetooth: dynamic(() => import('../../public/assets/icons/Bluetooth'), {
      ...options,
    }),
    BrandNewCar: dynamic(
      () => import('../../public/assets/icons/BrandNewCar'),
      {
        ...options,
      },
    ),
    CruiseControl: dynamic(
      () => import('../../public/assets/icons/CruiseControl'),
      {
        ...options,
      },
    ),
    DABRadio: dynamic(() => import('../../public/assets/icons/DABRadio'), {
      ...options,
    }),
    DamageCover: dynamic(
      () => import('../../public/assets/icons/DamageCover'),
      {
        ...options,
      },
    ),
    Emissions: dynamic(() => import('../../public/assets/icons/Emissions'), {
      ...options,
    }),
    FuelEconomy: dynamic(
      () => import('../../public/assets/icons/FuelEconomy'),
      {
        ...options,
      },
    ),
    FuelType: dynamic(() => import('../../public/assets/icons/FuelType'), {
      ...options,
    }),
    HeatedSeats: dynamic(
      () => import('../../public/assets/icons/HeatedSeats'),
      {
        ...options,
      },
    ),
    Leather: dynamic(() => import('../../public/assets/icons/Leather'), {
      ...options,
    }),
    LoadHeight: dynamic(() => import('../../public/assets/icons/LoadHeight'), {
      ...options,
    }),
    LoadLength: dynamic(() => import('../../public/assets/icons/LoadLength'), {
      ...options,
    }),
    LoadWidth: dynamic(() => import('../../public/assets/icons/LoadWidth'), {
      ...options,
    }),
    MileageBooster: dynamic(
      () => import('../../public/assets/icons/MileageBooster'),
      {
        ...options,
      },
    ),
    NoMot: dynamic(() => import('../../public/assets/icons/NoMOT'), {
      ...options,
    }),
    PlyLining: dynamic(() => import('../../public/assets/icons/PlyLining'), {
      ...options,
    }),
    SatNav: dynamic(() => import('../../public/assets/icons/SatNav'), {
      ...options,
    }),
    Transmission: dynamic(
      () => import('../../public/assets/icons/Transmission'),
      { ...options },
    ),
    WarrantyRosette2: dynamic(
      () => import('../../public/assets/icons/WarrantyRosette2'),
      {
        ...options,
      },
    ),
    WarrantyRosette3: dynamic(
      () => import('../../public/assets/icons/WarrantyRosette3'),
      {
        ...options,
      },
    ),
    WarrantyRosette4: dynamic(
      () => import('../../public/assets/icons/WarrantyRosette4'),
      {
        ...options,
      },
    ),
    WarrantyRosette5: dynamic(
      () => import('../../public/assets/icons/WarrantyRosette5'),
      {
        ...options,
      },
    ),
  };
  return iconMap[name];
}

// leave as reference incase dynamic import with expression solution is found
export function getIconMap(keyInfo: (IKeyInfo | null)[]) {
  const iconMap = new Map();
  keyInfo.forEach(async key => {
    const iconRef = key?.name?.replace(/\s+/g, '');
    const Icon = dynamic(() => import(`../../public/assets/icons/${iconRef}`), {
      loading: () => <SyncCircleOutline />,
      ssr: false,
    });
    iconMap.set(iconRef, <Icon />);
  });
  return iconMap;
}
