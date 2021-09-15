import React, { useMemo } from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';

import Flame from 'core/assets/icons/Flame';
import { IBaseProps } from 'core/interfaces/base';

import { Nullable } from '../../../types/common';
import { baseClassName, getClassName } from './helpers';
import { IColor } from './interface';

interface IProps extends IBaseProps {
  selectedColorId: Nullable<IColor['capId']>;
  onChange: (colorId: IColor['capId']) => void;
  hotOfferColorList: IColor[];
  factoryColorList: IColor[];
}

function ColorSelection({
  className,
  selectedColorId,
  hotOfferColorList,
  factoryColorList,
  onChange,
}: IProps) {
  const selectedColor = useMemo(
    () =>
      ([...hotOfferColorList, ...factoryColorList] as IColor[]).find(
        color => selectedColorId === color.capId,
      ),
    [factoryColorList, hotOfferColorList, selectedColorId],
  );

  return (
    <div className={cx(baseClassName, className)}>
      <div className={getClassName('header')}>
        <Text className={getClassName('selected-color')} color="dark">
          <span>Colour:</span>
          {selectedColor?.name}
        </Text>
        <Text className={getClassName('price')} color="orange">
          {selectedColor?.price ? (
            <>
              <Icon icon={<Flame />} size="regular" />
              <span>£{selectedColor.price} Per Months ext. VAT</span>
            </>
          ) : (
            'Included'
          )}
        </Text>
      </div>
      <div className={getClassName('group')}>
        <Text className={getClassName('group-label')} size="small" color="dark">
          <span className="hot-offer">
            <Icon icon={<Flame />} size="regular" />
            Hot Offer
          </span>
          Fast Delivery
        </Text>
        <ul className={getClassName('color-list')}>
          {hotOfferColorList.map(color => (
            <li className={getClassName('color-item')} key={color.name}>
              <input
                type="radio"
                id={color.name}
                name="hot-offers"
                className="visually-hidden"
                checked={selectedColorId === color.capId}
                onChange={() => onChange(color.capId)}
              />
              <label
                htmlFor={color.name}
                title={color.name}
                style={{ backgroundColor: color.hex }}
                className={getClassName('color')}
              >
                <Icon icon={<Flame />} />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={getClassName('group')}>
        <Text className={getClassName('group-label')} size="small" color="dark">
          <span className="factory">Factory Order</span>Long Lead Time
        </Text>
        <ul className={getClassName('color-list')}>
          {factoryColorList.map(color => (
            <li className={getClassName('color-item')} key={color.name}>
              <input
                type="radio"
                id={color.name}
                name="factory"
                className="visually-hidden"
                checked={selectedColorId === color.capId}
                onChange={() => onChange(color.capId)}
              />
              <label
                htmlFor={color.name}
                title={color.name}
                style={{ backgroundColor: color.hex }}
                className={getClassName('color')}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ColorSelection;
