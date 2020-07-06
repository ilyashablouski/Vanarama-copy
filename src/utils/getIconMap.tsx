import dynamic from 'next/dynamic';
import { HubCarProductCards_productCarousel_keyInformation as IKeyInfo } from '../../generated/HubCarProductCards';

function getIconMap(keyInfo: (IKeyInfo | null)[]) {
  const iconMap = new Map();
  keyInfo.forEach(async key => {
    const iconRef = key?.name?.replace(/\s+/g, '');
    const Icon = dynamic(() =>
      import(`@vanarama/uibook/lib/assets/icons/${iconRef}`),
    );
    iconMap.set(iconRef, <Icon />);
  });
  return iconMap;
}

export default getIconMap;
