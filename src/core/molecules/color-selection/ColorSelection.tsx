import React from 'react';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';

import Flame from 'core/assets/icons/Flame';

import { IColor } from './interface';
import { baseClassName, getClassName } from './helpers';

interface IProps {
  selectedColor: IColor;
  hotOfferColorList: IColor[];
  factoryColorList: IColor[];
  onChange: (color: IColor) => void;
}

function ColorSelection({
  selectedColor,
  hotOfferColorList,
  factoryColorList,
  onChange,
}: IProps) {
  return (
    <div className={baseClassName}>
      <div className={getClassName('header')}>
        <Text className={getClassName('selected-color')} color="dark">
          <span>Colour:</span>
          {selectedColor.label}
        </Text>
        <Text className={getClassName('price')} color="orange">
          {selectedColor.price ? (
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
            <li className={getClassName('color-item')} key={color.label}>
              <input
                type="radio"
                id={color.label}
                name="hot-offers"
                className="visually-hidden"
                checked={selectedColor.label === color.label}
                onChange={() => onChange(color)}
              />
              <label
                htmlFor={color.label}
                title={color.label}
                style={{ backgroundColor: color.style }}
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
            <li className={getClassName('color-item')} key={color.label}>
              <input
                type="radio"
                id={color.label}
                name="factory"
                className="visually-hidden"
                checked={selectedColor.label === color.label}
                onChange={() => onChange(color)}
              />
              <label
                htmlFor={color.label}
                title={color.label}
                style={{ backgroundColor: color.style }}
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
