import Convertible from '../core/assets/icons/custom/Convertible';
import Coupe from '../core/assets/icons/custom/Coupe';
import Eco from '../core/assets/icons/custom/Eco';
import Estate from '../core/assets/icons/custom/Estate';
import Family from '../core/assets/icons/custom/Family';
import Hatchback from '../core/assets/icons/custom/Hatchback';
import PeopleCarrier from '../core/assets/icons/custom/PeopleCarrier';
import Pickups from '../core/assets/icons/custom/Pickups';
import Prestige from '../core/assets/icons/custom/Prestige';
import Saloon from '../core/assets/icons/custom/Saloon';
import Small from '../core/assets/icons/custom/Small';
import SUV from '../core/assets/icons/custom/SUV';
import Vans from '../core/assets/icons/custom/Vans';

const BodyStyleIconMap = new Map();

BodyStyleIconMap.set('Convertible', <Convertible />)
  .set('Coupe', <Coupe />)
  .set('Eco', <Eco />)
  .set('Estate', <Estate />)
  .set('Family', <Family />)
  .set('Hatchback', <Hatchback />)
  .set('PeopleCarrier', <PeopleCarrier />)
  .set('Pickups', <Pickups />)
  .set('Prestige', <Prestige />)
  .set('Saloon', <Saloon />)
  .set('Small', <Small />)
  .set('4x4', <SUV />)
  .set('Vans', <Vans />);

export default BodyStyleIconMap;
