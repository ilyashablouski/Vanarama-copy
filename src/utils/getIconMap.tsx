import dynamic from 'next/dynamic';
import { ProductCardData_productCarousel_keyInformation as IKeyInfo } from '../../generated/ProductCardData';
import SyncCircleOutline from '../../public/assets/icons/SyncCircleOutline';

function getIconMap(keyInfo: (IKeyInfo | null)[]) {
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

export default getIconMap;
