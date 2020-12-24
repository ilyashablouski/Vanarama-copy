import { IIconProps } from 'core/atoms/icon/interfaces';
import { TIcon } from 'core/molecules/cards/CardIcons';
import { ComponentType } from 'react';
import { features } from '../components/ProductCarousel/helpers';

const useFeatures = (
  keyInfo: any[],
  capId: string,
  Icon?: ComponentType<IIconProps>,
): TIcon[] => {
  /* const [feature, setFeature] = useState<TIcon[]>([]);

  useEffect(() => {
    const f = features(keyInfo || [], capId || '', Icon);
    setFeature(f);
  }, [Icon, capId, keyInfo]);

  return feature; */

  return features(keyInfo || [], capId || '', Icon);
};

export default useFeatures;
