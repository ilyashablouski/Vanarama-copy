import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';

export interface KeyInformationItem {
  name: string | null;
  value: string | null;
}

interface IKeyInformationProps {
  keysInformation: KeyInformationItem[];
}

const KeyInformation: React.FC<IKeyInformationProps> = ({
  keysInformation,
}) => {
  return (
    <div className="pdp--feature-grid tabs--active">
      {keysInformation.slice(0, 12).map((info: KeyInformationItem) => (
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
