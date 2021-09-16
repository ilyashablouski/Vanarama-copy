import React from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';

import Flame from 'core/assets/icons/Flame';
import { IBaseProps } from 'core/interfaces/base';

import { Nullish } from '../../../types/common';
import { GetImacaAssets_getImacaAssets_colours as IColour } from '../../../../generated/GetImacaAssets';
import { baseClassName, getClassName } from './helpers';

interface IProps extends IBaseProps {
  selectedColor: Nullish<IColour>;
  onChange: (color: IColour) => void;
  hotOfferColorList: Nullish<IColour[]>;
  factoryColorList: Nullish<IColour[]>;
}

function ColorSelection({
  className,
  selectedColor,
  hotOfferColorList,
  factoryColorList,
  onChange,
}: IProps) {
  return (
    <div className={cx(baseClassName, className)}>
      <div className={getClassName('header')}>
        <Text className={getClassName('selected-color')} color="dark">
          <span>Colour:</span>
          {selectedColor?.imacaName}
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
          <ul className={getClassName('color-list')}>
            {hotOfferColorList.map(color => (
              <li className={getClassName('color-item')} key={color.imacaName}>
                <input
                  type="radio"
                  name="hot-offers"
                  id={color.imacaName ?? ''}
                  className="visually-hidden"
                  checked={selectedColor?.capId === color.capId}
                  onChange={() => onChange(color)}
                />
                <label
                  title={color.imacaName ?? ''}
                  htmlFor={color.imacaName ?? ''}
                  style={{ backgroundColor: color.hex ?? '' }}
                  className={getClassName('color')}
                >
                  <Icon icon={<Flame />} />
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {factoryColorList?.length ? (
        <div className={getClassName('group')}>
          <Text
            className={getClassName('group-label')}
            size="small"
            color="dark"
          >
            <span className="factory">Factory Order</span>Long Lead Time
          </Text>
          <ul className={getClassName('color-list')}>
            {factoryColorList.map(color => (
              <li className={getClassName('color-item')} key={color.imacaName}>
                <input
                  type="radio"
                  name="factory"
                  id={color.imacaName ?? ''}
                  className="visually-hidden"
                  checked={selectedColor?.capId === color.capId}
                  onChange={() => onChange(color)}
                />
                <label
                  title={color.imacaName ?? ''}
                  htmlFor={color.imacaName ?? ''}
                  style={{ backgroundColor: color.hex ?? '' }}
                  className={getClassName('color')}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default ColorSelection;
