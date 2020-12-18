import BluetoothSharp from 'core/assets/icons/BluetoothSharp';
import CompassSharp from 'core/assets/icons/CompassSharp';
import SnowSharp from 'core/assets/icons/SnowSharp';
import WifiSharp from 'core/assets/icons/WifiSharp';
import FuelEconomy from 'core/assets/icons/FuelEconomy';
import FuelType from 'core/assets/icons/FuelType';
import Emissions from 'core/assets/icons/Emissions';
import Transmission from 'core/assets/icons/Transmission';

const IconMap = new Map();

IconMap.set('FuelType', <FuelType />)
  .set('FuelEconomy', <FuelEconomy />)
  .set('Bluetooth', <BluetoothSharp />)
  .set('Wifi', <WifiSharp />)
  .set('Snow', <SnowSharp />)
  .set('SatelliteNavigation', <CompassSharp />)
  .set('Transmission', <Transmission />)
  .set('Emissions', <Emissions />);

export default IconMap;
