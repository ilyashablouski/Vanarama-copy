import React, { useEffect, useState } from 'react';

interface CustomSelectInterface {
  defaultValue: any;
  placeholder: string;
  optionList: any;
  onChange: any;
}

const CustomSelect: React.FC<CustomSelectInterface> = ({
  defaultValue,
  placeholder,
  optionList,
  onChange,
}) => {
  const [showOptionList, setShowOptionList] = useState<boolean>(false);

  const [defaultText, setDefaultText] = useState<string>('');

  const handleListDisplay = () => {
    setShowOptionList(value => !value);
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
    setDefaultText(
      optionList.find(option => `${option.optionId}` === defaultValue).label,
    );
    return document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (event: any) => {
    setDefaultText(event.currentTarget.getAttribute('data-name'));
    onChange(event);
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
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default React.memo(CustomSelect);
