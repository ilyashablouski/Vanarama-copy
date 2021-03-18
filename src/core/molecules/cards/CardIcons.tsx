import cx from 'classnames';
import React from 'react';
import Icon from '../../atoms/icon';
import Text from '../../atoms/text';

export type TIcon = {
  icon: React.ReactNode;
  label: string;
  index: string;
  name: string;
};
interface ICardIconsProps {
  className?: string;
  icons: TIcon[];
  featuredProduct?: boolean;
}

const shortName = (name: string) => {
  if (name === 'Fuel Economy') {
    return name.split(' ')[1];
  }
  if (name === 'Electric Driving Range (WLTP)') {
    return name.split(' ')[2];
  }
  return name;
};

const CardIcons: React.FC<ICardIconsProps> = ({
  className,
  icons,
  featuredProduct = false,
}) => (
  <div
    className={cx(
      { features: !featuredProduct, 'card--features': featuredProduct },
      className,
    )}
  >
    {/* At most only ever show 4 */}
    {icons.slice(0, 4).map(item => (
      <div key={`${item.label}_${item.index}`}>
        <Icon icon={item.icon} />
        {item.name && (
          <Text size="xsmall" color="darker">
            {shortName(item.name)}
          </Text>
        )}
        <Text size="xsmall" color="dark">
          {item.label}
        </Text>
      </div>
    ))}
  </div>
);

export default React.memo(CardIcons);
