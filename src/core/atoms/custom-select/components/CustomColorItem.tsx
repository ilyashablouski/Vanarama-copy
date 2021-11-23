import React from 'react';
import { IOption } from '../../../../types/detailsPage';

interface IProps {
  option: IOption;
  checked: boolean;
}

const CustomColorItem: React.FC<IProps> = ({ option, checked }) => {
  return (
    <div className="option__color-container">
      <input
        type="radio"
        name="hot-offers"
        id={`${option.optionId ?? 0}`}
        className="radio--native visually-hidden"
        checked={checked}
        onChange={() => {}}
      />
      <label
        htmlFor={`${option.optionId ?? 0}`}
        style={{ backgroundColor: `#${option.hex}` }}
        className="option__color-select"
        title={option.label || ''}
      />
      <span className="option__color-label">{option.label}</span>
    </div>
  );
};

export default CustomColorItem;
