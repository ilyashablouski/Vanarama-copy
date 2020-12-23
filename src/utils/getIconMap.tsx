import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { ProductCardData_productCarousel_keyInformation as IKeyInfo } from '../../generated/ProductCardData';
import SyncCircleOutline from '../../public/assets/icons/SyncCircleOutline';

const placeHolder = { loading: () => <SyncCircleOutline /> };

type TIconMap = { [key: string]: ComponentType<{}> };

export function getFeatureIcon(name: string) {
  const iconMap: TIconMap = {
    AirConditioning: dynamic(
      () => import('../../public/assets/icons/AirConditioning'),
      {
        ...placeHolder,
      },
    ),
    Alloys: dynamic(() => import('../../public/assets/icons/Alloys'), {
      ...placeHolder,
    }),
    Bluetooth: dynamic(() => import('../../public/assets/icons/Bluetooth'), {
      ...placeHolder,
    }),
    BrandNewCar: dynamic(
      () => import('../../public/assets/icons/BrandNewCar'),
      {
        ...placeHolder,
      },
    ),
    CruiseControl: dynamic(
      () => import('../../public/assets/icons/CruiseControl'),
      {
        ...placeHolder,
      },
    ),
    DABRadio: dynamic(() => import('../../public/assets/icons/DABRadio'), {
      ...placeHolder,
    }),
    DamageCover: dynamic(
      () => import('../../public/assets/icons/DamageCover'),
      {
        ...placeHolder,
      },
    ),
    Emissions: dynamic(() => import('../../public/assets/icons/Emissions'), {
      ...placeHolder,
    }),
    FuelEconomy: dynamic(
      () => import('../../public/assets/icons/FuelEconomy'),
      {
        ...placeHolder,
      },
    ),
    FuelType: dynamic(() => import('../../public/assets/icons/FuelType'), {
      ...placeHolder,
    }),
    HeatedSeats: dynamic(
      () => import('../../public/assets/icons/HeatedSeats'),
      {
        ...placeHolder,
      },
    ),
    Leather: dynamic(() => import('../../public/assets/icons/Leather'), {
      ...placeHolder,
    }),
    LoadHeight: dynamic(() => import('../../public/assets/icons/LoadHeight'), {
      ...placeHolder,
    }),
    LoadLength: dynamic(() => import('../../public/assets/icons/LoadLength'), {
      ...placeHolder,
    }),
    LoadWidth: dynamic(() => import('../../public/assets/icons/LoadWidth'), {
      ...placeHolder,
    }),
    MileageBooster: dynamic(
      () => import('../../public/assets/icons/MileageBooster'),
      {
        ...placeHolder,
      },
    ),
    NoMot: dynamic(() => import('../../public/assets/icons/NoMOT'), {
      ...placeHolder,
    }),
    PlyLining: dynamic(() => import('../../public/assets/icons/PlyLining'), {
      ...placeHolder,
    }),
    SatNav: dynamic(() => import('../../public/assets/icons/SatNav'), {
      ...placeHolder,
    }),
    Transmission: dynamic(
      () => import('../../public/assets/icons/Transmission'),
      { ...placeHolder },
    ),
    WarrantyRosette2: dynamic(
      () => import('../../public/assets/icons/WarrantyRosette2'),
      {
        ...placeHolder,
      },
    ),
    WarrantyRosette3: dynamic(
      () => import('../../public/assets/icons/WarrantyRosette3'),
      {
        ...placeHolder,
      },
    ),
    WarrantyRosette4: dynamic(
      () => import('../../public/assets/icons/WarrantyRosette4'),
      {
        ...placeHolder,
      },
    ),
    WarrantyRosette5: dynamic(
      () => import('../../public/assets/icons/WarrantyRosette5'),
      {
        ...placeHolder,
      },
    ),
  };
  return iconMap[name];
}

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
