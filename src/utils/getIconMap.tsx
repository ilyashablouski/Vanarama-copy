/* eslint-disable global-require */
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { ProductCardData_productCarousel_keyInformation as IKeyInfo } from '../../generated/ProductCardData';
import SyncCircleOutline from '../core/assets/icons/SyncCircleOutline';
/* import AirCondition from '../core/assets/icons/AirConditioning';
import Alloys from '../core/assets/icons/Alloys';
import Bluetooth from '../core/assets/icons/Bluetooth';
import BrandNewCar from '../core/assets/icons/BrandNewCar';
import CruiseControl from '../core/assets/icons/CruiseControl';
import DABRadio from '../core/assets/icons/DABRadio';
import DamageCover from '../core/assets/icons/DamageCover';
import Emissions from '../core/assets/icons/Emissions';
import FuelEconomy from '../core/assets/icons/FuelEconomy';
import FuelType from '../core/assets/icons/FuelType';
import HeatedSeats from '../core/assets/icons/HeatedSeats';
import Leather from '../core/assets/icons/Leather';
import LoadHeight from '../core/assets/icons/LoadHeight';
import LoadLength from '../core/assets/icons/LoadLength';
import LoadWidth from '../core/assets/icons/LoadWidth';
import MileageBooster from '../core/assets/icons/MileageBooster';
import NoMot from '../core/assets/icons/NoMOT';
import PlyLining from '../core/assets/icons/PlyLining';
import SatNav from '../core/assets/icons/SatNav';
import Transmission from '../core/assets/icons/Transmission';
import WarrantyRosette2 from '../core/assets/icons/WarrantyRosette2';
import WarrantyRosette3 from '../core/assets/icons/WarrantyRosette3';
import WarrantyRosette4 from '../core/assets/icons/WarrantyRosette4';
import WarrantyRosette5 from '../core/assets/icons/WarrantyRosette5'; */

const options = {
  loading: () => <SyncCircleOutline />,
  ssr: false,
};

const AirCondition = dynamic(
  () => import('core/assets/icons/AirConditioning'),
  {
    ...options,
  },
);

const Alloys = dynamic(() => import('core/assets/icons/Alloys'), {
  ...options,
});

const Bluetooth = dynamic(() => import('core/assets/icons/Bluetooth'), {
  ...options,
});

const BrandNewCar = dynamic(() => import('core/assets/icons/BrandNewCar'), {
  ...options,
});

const CruiseControl = dynamic(() => import('core/assets/icons/CruiseControl'), {
  ...options,
});

const DABRadio = dynamic(() => import('core/assets/icons/DABRadio'), {
  ...options,
});

const DamageCover = dynamic(() => import('core/assets/icons/DamageCover'), {
  ...options,
});

const Emissions = dynamic(() => import('core/assets/icons/Emissions'), {
  ...options,
});

const FuelEconomy = dynamic(() => import('core/assets/icons/FuelEconomy'), {
  ...options,
});

const FuelType = dynamic(() => import('core/assets/icons/FuelType'), {
  ...options,
});

const HeatedSeats = dynamic(() => import('core/assets/icons/HeatedSeats'), {
  ...options,
});

const Leather = dynamic(() => import('core/assets/icons/Leather'), {
  ...options,
});

const LoadHeight = dynamic(() => import('core/assets/icons/LoadHeight'), {
  ...options,
});

const LoadLength = dynamic(() => import('core/assets/icons/LoadLength'), {
  ...options,
});

const LoadWidth = dynamic(() => import('core/assets/icons/LoadWidth'), {
  ...options,
});

const MileageBooster = dynamic(
  () => import('core/assets/icons/MileageBooster'),
  {
    ...options,
  },
);

const NoMot = dynamic(() => import('core/assets/icons/NoMOT'), {
  ...options,
});

const PlyLining = dynamic(() => import('core/assets/icons/PlyLining'), {
  ...options,
});

const SatNav = dynamic(() => import('core/assets/icons/SatNav'), {
  ...options,
});

const Transmission = dynamic(() => import('core/assets/icons/Transmission'), {
  ...options,
});

const WarrantyRosette2 = dynamic(
  () => import('core/assets/icons/WarrantyRosette2'),
  {
    ...options,
  },
);

const WarrantyRosette3 = dynamic(
  () => import('core/assets/icons/WarrantyRosette3'),
  {
    ...options,
  },
);

const WarrantyRosette4 = dynamic(
  () => import('core/assets/icons/WarrantyRosette4'),
  {
    ...options,
  },
);

const WarrantyRosette5 = dynamic(
  () => import('core/assets/icons/WarrantyRosette5'),
  {
    ...options,
  },
);

export function getFeatureIcon3(name: string = 'fallback') {
  const iconMap = new Map();
  iconMap.set('AirConditioning', <AirCondition />);
  iconMap.set('Alloys', <Alloys />);
  iconMap.set('Bluetooth', <Bluetooth />);
  iconMap.set('BrandNewCar', <BrandNewCar />);
  iconMap.set('CruiseControl', <CruiseControl />);
  iconMap.set('DABRadio', <DABRadio />);
  iconMap.set('DamageCover', <DamageCover />);
  iconMap.set('Emissions', <Emissions />);
  iconMap.set('FuelEconomy', <FuelEconomy />);
  iconMap.set('FuelType', <FuelType />);
  iconMap.set('HeatedSeats', <HeatedSeats />);
  iconMap.set('Leather', <Leather />);
  iconMap.set('LoadHeight', <LoadHeight />);
  iconMap.set('LoadLength', <LoadLength />);
  iconMap.set('LoadWidth', <LoadWidth />);
  iconMap.set('MileageBooster', <MileageBooster />);
  iconMap.set('NoMot', <NoMot />);
  iconMap.set('PlyLining', <PlyLining />);
  iconMap.set('SatNav', <SatNav />);
  iconMap.set('Transmission', <Transmission />);
  iconMap.set('WarrantyRosette2', <WarrantyRosette2 />);
  iconMap.set('WarrantyRosette3', <WarrantyRosette3 />);
  iconMap.set('WarrantyRosette4', <WarrantyRosette4 />);
  iconMap.set('WarrantyRosette5', <WarrantyRosette5 />);
  iconMap.set('fallback', <SyncCircleOutline />);
  return iconMap.get(name);
}

export function getFeatureIcon2(name: string = 'default') {
  switch (name) {
    case 'AiConditioning':
      return import('core/assets/icons/AirConditioning');
    case 'Alloys':
      return import('core/assets/icons/Alloys');
    case 'BlueTooth':
      return import('core/assets/icons/Bluetooth');
    case 'BrandNewCar':
      return import('core/assets/icons/BrandNewCar');
    case 'CruiseControl':
      return import('core/assets/icons/CruiseControl');
    case 'DABRadio':
      return import('core/assets/icons/DABRadio');
    case 'DamageCover':
      return import('core/assets/icons/DamageCover');
    case 'Emissions':
      return import('core/assets/icons/Emissions');
    case 'FuelEconomy':
      return import('core/assets/icons/FuelEconomy');
    case 'FuelType':
      return import('core/assets/icons/FuelType');
    case 'HeatedSeats':
      return import('core/assets/icons/HeatedSeats');
    case 'Leather':
      return import('core/assets/icons/Leather');
    case 'LoadHeight':
      return import('core/assets/icons/LoadHeight');
    case 'LoadLength':
      return import('core/assets/icons/LoadHeight');
    case 'LoadWidth':
      return import('core/assets/icons/LoadWidth');
    case 'MileageBooster':
      return import('core/assets/icons/MileageBooster');
    case 'NoMot':
      return import('core/assets/icons/NoMOT');
    case 'PlyLining':
      return import('core/assets/icons/PlyLining');
    case 'SatNav':
      return import('core/assets/icons/SatNav');
    case 'Transmission':
      return import('core/assets/icons/Transmission');
    case 'WarrantyRosette2':
      return import('core/assets/icons/WarrantyRosette2');
    case 'WarrantyRosette3':
      return import('core/assets/icons/WarrantyRosette3');
    case 'WarrantyRosette4':
      return import('core/assets/icons/WarrantyRosette4');
    case 'WarrantyRosette5':
      return import('core/assets/icons/WarrantyRosette5');
    default:
      return <SyncCircleOutline />;
  }
}

type TIconMap = { [key: string]: ReactNode };
export function getFeatureIcon1(name: string) {
  const iconMap: TIconMap = {
    AirConditioning: require('core/assets/icons/AirConditioning').default,
    Alloys: require('core/assets/icons/Alloys').default,
    Bluetooth: require('core/assets/icons/Bluetooth').default,
    BrandNewCar: require('core/assets/icons/BrandNewCar').default,
    CruiseControl: require('core/assets/icons/CruiseControl').default,
    DABRadio: require('core/assets/icons/DABRadio').default,
    DamageCover: require('core/assets/icons/DamageCover').default,
    Emissions: require('core/assets/icons/Emissions').default,
    FuelEconomy: require('core/assets/icons/FuelEconomy').default,
    FuelType: require('core/assets/icons/FuelType').default,
    HeatedSeats: require('core/assets/icons/HeatedSeats').default,
    Leather: require('core/assets/icons/Leather').default,
    LoadHeight: require('core/assets/icons/LoadHeight').default,
    LoadLength: require('core/assets/icons/LoadLength').default,
    LoadWidth: require('core/assets/icons/LoadWidth').default,
    MileageBooster: require('core/assets/icons/MileageBooster').default,
    NoMot: require('core/assets/icons/NoMOT').default,
    PlyLining: require('core/assets/icons/PlyLining').default,
    SatNav: require('core/assets/icons/SatNav').default,
    Transmission: require('core/assets/icons/Transmission').default,
    WarrantyRosette2: require('core/assets/icons/WarrantyRosette2').default,
    WarrantyRosette3: require('core/assets/icons/WarrantyRosette3').default,
    WarrantyRosette4: require('core/assets/icons/WarrantyRosette4').default,
    WarrantyRosette5: require('core/assets/icons/WarrantyRosette5').default,
  };
  return iconMap[name];
}

// leave as reference incase dynamic import with expression solution is found
export default function getIconMap(keyInfo: (IKeyInfo | null)[]) {
  const iconMap = new Map();
  keyInfo.forEach(async key => {
    const iconRef = key?.name?.replace(/\s+/g, '');
    const Icon = dynamic(() => import(`core/assets/icons/${iconRef}`), {
      loading: () => <SyncCircleOutline />,
      ssr: false,
    });
    iconMap.set(iconRef, <Icon />);
  });
  return iconMap;
}
