import React, { useEffect, useState } from 'react';
import Radio from "core/atoms/radio";
import Formgroup from 'core/molecules/formgroup';

interface CustomSelectInterface {
  defaultValue: string;
  optionList: Item;
}

interface Item {
  id: number;
  name: string;
}

const CustomNewSelect: React.FC<CustomSelectInterface> = ({
  defaultValue,
  optionList,
}) => {
  const [showOptionList, setShowOptionList] = useState<boolean>(false);

  const [defaultText, setDefaultText] = useState<string>('');

  const handleListDisplay = () => {
    setShowOptionList(true);
  };

  const handleClickOutside = (e: any) => {
    if (
      !e.target.classList.contains('custom-select-option') &&
      !e.target.classList.contains('selected-text')
    ) {
      setShowOptionList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    setDefaultText(defaultValue);
    return document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (event: any) => {
    setDefaultText(event.currentTarget.getAttribute('data-name'));
    setShowOptionList(false);
  };

  return (
    <div className="custom-select-container">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={showOptionList ? 'selected-text active' : 'selected-text'}
        onClick={handleListDisplay}
      >
        {defaultText}
      </div>

      {showOptionList && (
        <ul className="select-options">
          {optionList.map((option: any) => {
            return (
              <li
                className="custom-select-option"
                data-name={option.label}
                data-id={option.optionId || 0}
                key={option.optionId || 0}
                onClick={handleOptionClick}
              >
                <Formgroup>
                  <Radio
                    name="maintenance"
                    id="maintenanceCost"
                    label={option.name}
                    onChange={() => console.log('')}
                    defaultChecked={true}
                    disabled={false}
                  />
                </Formgroup>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default React.memo(CustomNewSelect);
