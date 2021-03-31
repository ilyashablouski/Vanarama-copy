import CityCar from '../core/assets/icons/custom/CityCar';
import Convertible from '../core/assets/icons/custom/Convertible';
import Coupe from '../core/assets/icons/custom/Coupe';
import Estate from '../core/assets/icons/custom/Estate';
import Hatchback from '../core/assets/icons/custom/Hatchback';
import PeopleCarrier from '../core/assets/icons/custom/PeopleCarrier';
import Saloon from '../core/assets/icons/custom/Saloon';
import Small from '../core/assets/icons/custom/Small';
import SUV from '../core/assets/icons/custom/SUV';
// import Pickups from '../core/assets/icons/custom/Pickups';
// import Vans from '../core/assets/icons/custom/Vans';

const BodyStyleIconMap = new Map();

BodyStyleIconMap.set('Convertible', <Convertible />)
  .set('4x4/SUV', <SUV />)
  .set('City-Car', <CityCar />)
  .set('Coupe', <Coupe />)
  .set('Estate', <Estate />)
  .set('Hatchback', <Hatchback />)
  .set('PeopleCarrier', <PeopleCarrier />)
  .set('Saloon', <Saloon />)
  .set('Small', <Small />);
// .set('Pickups', <Pickups />)
// .set('Vans', <Vans />)

export default BodyStyleIconMap;
