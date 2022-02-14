import React from 'react';
import dynamic from 'next/dynamic';
import Icon from 'core/atoms/icon';
import IconMap from '../../utils/cardIconMap';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

export interface IKeyInformationItem {
  name: string | null;
  value: string | null;
}

interface IKeyInformationProps {
  keysInformation: IKeyInformationItem[];
}

const KeyInformation: React.FC<IKeyInformationProps> = ({
  keysInformation,
}) => {
  return (
    <div className="pdp--feature-grid tabs--active">
      {keysInformation.slice(0, 12).map((info: IKeyInformationItem) => (
        <div className="pdp--feature-grid--item" key={info.name || ''}>
          <Icon
            name={info.name?.replace(' ', '')}
            icon={IconMap.get(info.name?.replace(/\s/g, ''))}
            color="orange"
            className="icon-custom"
            size="large"
          />
          <div>
            <Heading color="black" size="regular" tag="div">
              {info.name}
            </Heading>
            {info.value && (
              <Text color="dark" size="small" tag="div">
                {info.value}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyInformation;
