import React from 'react';
import FrontParkingSensors from 'core/assets/icons/FrontParkingSensors';
import FrontRearParkingSensors from 'core/assets/icons/FrontRearParkingSensors';
import AirCondition from '../core/assets/icons/AirConditioning';
import Alloys from '../core/assets/icons/Alloys';
import Bluetooth from '../core/assets/icons/Bluetooth';
import BrandNewCar from '../core/assets/icons/BrandNewCar';
import CruiseControl from '../core/assets/icons/CruiseControl';
import Calendar from '../core/assets/icons/Calendar';
import DABRadio from '../core/assets/icons/DABRadio';
import DamageCover from '../core/assets/icons/DamageCover';
import Emissions from '../core/assets/icons/Emissions';
import ElectricRange from '../core/assets/icons/ElectricRange';
import ElectricRangeSmall from '../core/assets/icons/ElectricRangeSmall';
import FuelEconomy from '../core/assets/icons/FuelEconomy';
import FuelType from '../core/assets/icons/FuelType';
import HeatedSeats from '../core/assets/icons/HeatedSeats';
import Leather from '../core/assets/icons/Leather';
import ListPrice from '../core/assets/icons/ListPrice';
import LoadHeight from '../core/assets/icons/LoadHeight';
import LoadLength from '../core/assets/icons/LoadLength';
import LoadWidth from '../core/assets/icons/LoadWidth';
import MileageBooster from '../core/assets/icons/MileageBooster';
import NoMOT from '../core/assets/icons/NoMOT';
import OverClocking from '../core/assets/icons/Overclocking';
import ParkingSensors from '../core/assets/icons/ParkingSensors';
import Price from '../core/assets/icons/Price';
import Scale from '../core/assets/icons/Barbell';
import Speedometer from '../core/assets/icons/62mph';
import PlyLining from '../core/assets/icons/PlyLining';
import SatNav from '../core/assets/icons/SatNav';
import Transmission from '../core/assets/icons/Transmission';
import ReversingCamera from '../core/assets/icons/ReversingCamera';
import WarrantyRosetteFull from '../core/assets/icons/WarrantyRosetteFull';
import WarrantyRosette2 from '../core/assets/icons/WarrantyRosette2';
import WarrantyRosette3 from '../core/assets/icons/WarrantyRosette3';
import WarrantyRosette4 from '../core/assets/icons/WarrantyRosette4';
import WarrantyRosette5 from '../core/assets/icons/WarrantyRosette5';
import RearParkingSensors from '../core/assets/icons/RearParkingSensors';

const IconMap = new Map();

IconMap.set('AirConditioning', <AirCondition />)
  .set('AlloyWheels', <Alloys />)
  .set('Bluetooth', <Bluetooth />)
  .set('BrandNewCar', <BrandNewCar />)
  .set('CruiseControl', <CruiseControl />)
  .set('DABRadio', <DABRadio />)
  .set('DamageCover', <DamageCover />)
  .set('Emissions', <Emissions />)
  .set('ElectricDrivingRange(WLTP)', <ElectricRangeSmall />)
  .set('ElectricDriving Range(WLTP)', <ElectricRange />)
  .set('FixedMonthlyPayments', <Calendar />)
  .set('FuelEconomy', <FuelEconomy />)
  .set('FuelType', <FuelType />)
  .set('HeatedSeats', <HeatedSeats />)
  .set('Leather', <Leather />)
  .set('ListPrice', <ListPrice />)
  .set('LoadHeight', <LoadHeight />)
  .set('LoadLength', <LoadLength />)
  .set('LoadWidth', <LoadWidth />)
  .set('MileageBooster', <MileageBooster />)
  .set('NoMOT', <NoMOT />)
  .set('OverClocking', <OverClocking />)
  .set('ParkingSensors', <ParkingSensors />)
  .set('PlyLining', <PlyLining />)
  .set('Payload', <Scale />)
  .set('RRP', <Price />)
  .set('ReversingCamera', <ReversingCamera />)
  .set('SatNav', <SatNav />)
  .set('Transmission', <Transmission />)
  .set('WarrantyRosetteFull', <WarrantyRosetteFull />)
  .set('WarrantyRosette2', <WarrantyRosette2 />)
  .set('WarrantyRosette3', <WarrantyRosette3 />)
  .set('WarrantyRosette4', <WarrantyRosette4 />)
  .set('WarrantyRosette5', <WarrantyRosette5 />)
  .set('0-62mph', <Speedometer />)
  .set('FrontParkingSensors', <FrontParkingSensors />)
  .set('FrontandRearParkingSensors', <FrontRearParkingSensors />)
  .set('RearParkingSensors', <RearParkingSensors />);

export default IconMap;
