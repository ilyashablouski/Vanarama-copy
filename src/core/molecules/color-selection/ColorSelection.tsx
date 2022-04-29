import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';

import Flame from 'core/assets/icons/Flame';
import { IBaseProps } from 'core/interfaces/base';

import { Nullable, Nullish } from '../../../types/common';
import { GetImacaAssets_getImacaAssets_colours as IColour } from '../../../../generated/GetImacaAssets';
import { baseClassName, getClassName } from './helpers';

interface IProps extends IBaseProps {
  selectedColor: Nullish<IColour>;
  changeColour: (
    colorId: Nullable<number>,
    isFactoryColour: boolean | undefined,
    isHotOfferColour: Nullish<boolean>,
  ) => void;
  hotOfferColorList: Nullish<IColour[]>;
  factoryColorList: Nullish<IColour[]>;
}

function ColorSelection({
  className,
  selectedColor,
  hotOfferColorList,
  factoryColorList,
  changeColour,
}: IProps) {
  return (
    <div className={cx(baseClassName, className)}>
      <div className={getClassName('header')}>
        <Text
          className={getClassName('selected-color')}
          color="dark"
          dataUiTestId={`details-page_color-selection_${selectedColor?.lqName ??
            'Not Selected'}`}
        >
          <span>Colour:</span>
          {selectedColor?.lqName ?? 'Not Selected'}
        </Text>
        {/* <Text className={getClassName('price')} color="orange"> */}
        {/*  {selectedColor?.price ? ( */}
        {/*    <> */}
        {/*      <Icon icon={<Flame />} size="regular" /> */}
        {/*      <span>£{selectedColor.price} Per Months ext. VAT</span> */}
        {/*    </> */}
        {/*  ) : ( */}
        {/*    'Included' */}
        {/*  )} */}
        {/* </Text> */}
      </div>
      {hotOfferColorList?.length ? (
        <div className={getClassName('group')}>
          <Text
            className={getClassName('group-label')}
            size="small"
            color="dark"
          >
            <span className="hot-offer">
              <Icon icon={<Flame />} size="regular" />
              Hot Offer
            </span>
            Fast Delivery
          </Text>
          <Swiper
            watchOverflow
            wrapperTag="ul"
            slidesPerView="auto"
            resistanceRatio={0.5}
            className={getClassName('color-list')}
          >
            {hotOfferColorList.map(color => (
              <SwiperSlide
                tag="li"
                key={color.capId}
                className={getClassName('color-item')}
              >
                <input
                  type="radio"
                  name="hot-offers"
                  id={color.lqName ?? ''}
                  className="visually-hidden"
                  checked={selectedColor?.capId === color.capId}
                  onChange={() =>
                    changeColour(color.capId, false, color.onOffer)
                  }
                />
                <label
                  title={color.lqName ?? ''}
                  htmlFor={color.lqName ?? ''}
                  style={{ backgroundColor: `#${color.hex}` }}
                  className={getClassName('color')}
                  data-uitestid={`details-page_swiper-slide_${color.lqName ??
                    ''}`}
                >
                  <Icon icon={<Flame />} />
                </label>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
      {factoryColorList?.length ? (
        <div className={getClassName('group')}>
          <Text
            className={getClassName('group-label')}
            size="small"
            color="dark"
          >
            <span className="factory">Factory Order</span>
          </Text>
          <Swiper
            watchOverflow
            wrapperTag="ul"
            slidesPerView="auto"
            resistanceRatio={0.5}
            className={getClassName('color-list')}
          >
            {factoryColorList.map(color => (
              <SwiperSlide
                tag="li"
                key={color.capId}
                className={getClassName('color-item')}
              >
                <input
                  type="radio"
                  name="factory"
                  id={color.lqName ?? ''}
                  className="visually-hidden"
                  checked={selectedColor?.capId === color.capId}
                  onChange={() =>
                    changeColour(color.capId, true, color.onOffer)
                  }
                />
                <label
                  title={color.lqName ?? ''}
                  htmlFor={color.lqName ?? ''}
                  style={{ backgroundColor: `#${color.hex}` }}
                  className={getClassName('color')}
                  data-uitestid={`details-page_swiper-slide_${color.lqName ??
                    ''}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </div>
  );
}

export default ColorSelection;
