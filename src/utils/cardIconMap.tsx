import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import FuelEconomy from '@vanarama/uibook/lib/assets/icons/FuelEconomy';
import FuelType from '@vanarama/uibook/lib/assets/icons/FuelType';

const IconMap = new Map();

IconMap.set('FuelType', <FuelType />)
  .set('FuelEconomy', <FuelEconomy />)
  .set('Bluetooth', <BluetoothSharp />)
  .set('Wifi', <WifiSharp />)
  .set('Snow', <SnowSharp />)
  .set('SatelliteNavigation', <CompassSharp />);

export default IconMap;
