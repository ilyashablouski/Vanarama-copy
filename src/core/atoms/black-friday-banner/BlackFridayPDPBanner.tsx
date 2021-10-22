import React from 'react';

import Text from 'core/atoms/text';
import Icon from 'core/atoms/icon';

import LayerIcon from 'core/assets/icons/black-friday/Layer';
import EarLeftIcon from 'core/assets/icons/black-friday/EarLeft';
import EarRightIcon from 'core/assets/icons/black-friday/EarRight';

const BlackFridayPDPBanner = () => (
  <section className="bf-banner bf-banner--pdp">
    <Icon
      className="bf-banner__ear"
      icon={<EarLeftIcon />}
      size="initial-size"
    />
    <div className="bf-banner__inner">
      <Text className="bf-banner__text -before" size="large">
        £250 Cashback
      </Text>
      <div className="bf-banner__sticker">
        <Icon icon={<LayerIcon />} size="initial-size" />
        <Text size="xlarge" tag="span">
          Black Friday
        </Text>
      </div>
      <Text className="bf-banner__text -after" size="large">
        <span>£250 Cashback</span>
        Ends 26th November
      </Text>
    </div>
    <Icon
      className="bf-banner__ear"
      icon={<EarRightIcon />}
      size="initial-size"
    />
  </section>
);

export default BlackFridayPDPBanner;
