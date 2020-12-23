import dynamic from 'next/dynamic';
import { ProductCardData_productCarousel_keyInformation as IKeyInfo } from '../../generated/ProductCardData';
import SyncCircleOutline from '../core/assets/icons/SyncCircleOutline';
import AirCondition from '../core/assets/icons/AirConditioning';
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
import WarrantyRosette5 from '../core/assets/icons/WarrantyRosette5';

export function getFeatureIcon(name: string) {
  /* switch (name) {
    case 'Transmission':
      return <Transmission />
    default:
      return <SyncCircleOutline />;
  } */
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
  return iconMap.get(name);
}

// leave as reference incase dynamic import with expression solution is found
export function getIconMap(keyInfo: (IKeyInfo | null)[]) {
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
