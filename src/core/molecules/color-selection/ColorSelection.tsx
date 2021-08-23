import React from 'react';
import cs from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';

import Flame from 'core/assets/icons/Flame';

import { IColor } from './interface';

const baseClass = 'color-selection';

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
    <div className={baseClass}>
      <div className={`${baseClass}__header`}>
        <Text className={`${baseClass}__selected-color`} color="dark">
          <span>Colour:</span>
          {selectedColor.label}
        </Text>
        <Text className={`${baseClass}__price`} color="orange">
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
      <div className={`${baseClass}__group`}>
        <Text className={`${baseClass}__group-label`} size="small" color="dark">
          <span className="hot-offer">
            <Icon icon={<Flame />} size="regular" />
            Hot Offer
          </span>
          Fast Delivery
        </Text>
        <ul className={`${baseClass}__color-list`}>
          {hotOfferColorList.map(color => (
            <li className={`${baseClass}__color-item`} key={color.label}>
              <input
                type="radio"
                id={color.label}
                name="hot-offers"
                className="visually-hidden"
                onChange={() => onChange(color)}
              />
              <label
                htmlFor={color.label}
                title={color.label}
                style={{ backgroundColor: color.style }}
                className={cs(`${baseClass}__color`, {
                  '-selected': selectedColor.label === color.label,
                })}
              >
                <Icon icon={<Flame />} />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${baseClass}__group`}>
        <Text className={`${baseClass}__group-label`} size="small" color="dark">
          <span className="factory">Factory Order</span>Long Lead Time
        </Text>
        <ul className={`${baseClass}__color-list`}>
          {factoryColorList.map(color => (
            <li className={`${baseClass}__color-item`} key={color.label}>
              <input
                type="radio"
                id={color.label}
                name="factory"
                className="visually-hidden"
                onChange={() => onChange(color)}
              />
              <label
                htmlFor={color.label}
                title={color.label}
                style={{ backgroundColor: color.style }}
                className={cs(`${baseClass}__color`, {
                  '-selected': selectedColor.label === color.label,
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ColorSelection;
