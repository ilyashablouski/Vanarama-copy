import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';

export interface KeyInformationItem {
  title: string;
  icon?: string;
  description?: string;
}

interface IKeyInformationProps {
  keysInformation: KeyInformationItem[];
}

const KeyInformation: React.FC<IKeyInformationProps> = ({
  keysInformation,
}) => {
  return (
    <div className="pdp--feature-grid tabs--active">
      {keysInformation.map((info: KeyInformationItem) => (
        <div className="pdp--feature-grid--item">
          {info.icon && (
            <Icon
              icon={info.icon}
              color="orange"
              size="large"
              className="md hydrated"
            />
          )}
          <div>
            <Heading color="black" size="regular" tag="div">
              {info.title}
            </Heading>
            {info.description && (
              <Text color="dark" size="small" tag="div">
                {info.description}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyInformation;
