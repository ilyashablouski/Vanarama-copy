import cx from 'classnames';
import React from 'react';
import Icon from '../../atoms/icon';
import Text from '../../atoms/text';
import { normalizeString } from '../../../utils/data';

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
  isPdpPage?: boolean;
  dataUiTestId?: string;
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
  dataUiTestId,
  isPdpPage,
}) => (
  <div
    className={cx(
      { features: !featuredProduct, 'card--features': featuredProduct },
      className,
    )}
    data-uitestid={dataUiTestId ? `${dataUiTestId}_features` : undefined}
  >
    {/* At most only ever show 4 */}
    {icons.slice(0, 4).map(item => (
      <div
        key={`${item.label}_${item.index}`}
        data-uitestid={
          dataUiTestId
            ? `${dataUiTestId}_features_${normalizeString(
                shortName(item.name),
              )}`
            : undefined
        }
      >
        <Icon icon={item.icon} />
        {item.name && (
          <Text size={isPdpPage ? 'small' : 'xsmall'} color="darker">
            {shortName(item.name)}
          </Text>
        )}
        <Text
          size={isPdpPage ? 'regular' : 'xsmall'}
          color={isPdpPage ? 'black' : 'dark'}
          dataUiTestId={
            dataUiTestId
              ? `${dataUiTestId}_card-icon_${item.name ? item.label : 'N/A'}`
              : undefined
          }
        >
          {item.name ? item.label : 'N/A'}
        </Text>
      </div>
    ))}
  </div>
);

export default React.memo(CardIcons);
