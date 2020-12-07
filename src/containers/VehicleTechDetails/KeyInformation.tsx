import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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
            name={`${
              info.name === '0-62mph'
                ? 'Overclocking'
                : info.name?.replace(' ', '')
            }`}
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
