import React from 'react';

import Text from 'core/atoms/text';
import Image from 'core/atoms/image';

import SearchPodContainer from '../../containers/SearchPodContainer';

import { IHeroProps } from './interface';

const HeroJanSale: React.FC<IHeroProps> = ({
  searchPodCarsData,
  searchPodVansData,
  activeSearchIndex,
  searchType,
}) => (
  <div className="row:bg-js-hero">
    <div className="decoration">
      <div className="decoration__circle -left" />
      <div className="decoration__circle -center" />
      <div className="decoration__circle -right" />
    </div>
    <div className="row:hero">
      <div className="hero--left">
        <div className="js-hero">
          <Image src="/Assets/images/jan-sale/car.png" size="expand" plain />
          <div className="js-hero__inner">
            <Text className="-cashback">
              £250
              <br />
              Cashback
            </Text>
            <Text className="-vehicle-type">On Every Vehicle</Text>
            <Text className="-insurance">+1 Year’s FREE Insurance</Text>
            <Text className="-date">Ends 31st January</Text>
          </div>
        </div>
        <Text className="terms-and-conditions">
          * T&Cs apply. Free insurance available on selected car hot offers
          only.
        </Text>
      </div>
      <div className="hero--right">
        <SearchPodContainer
          searchPodCarsData={searchPodCarsData}
          searchPodVansData={searchPodVansData}
          activeSearchIndex={activeSearchIndex}
          searchType={searchType}
        />
      </div>
    </div>
  </div>
);

export default HeroJanSale;
