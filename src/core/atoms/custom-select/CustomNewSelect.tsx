import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import Radio from 'core/atoms/radio';
import FormGroup from 'core/molecules/formgroup';
import ChevronDown from 'core/assets/icons/ChevronDown';
import Icon from 'core/atoms/icon';

interface SelectOptionList{
  optionId: number | null;
  label: string | null
}

interface CustomSelectInterface {
  defaultValue: string;
  placeholder: string;
  isDisabled: boolean;
  optionList:
    | (SelectOptionList |  null)[]
    | null
    | undefined;
  radioName: string;
  className: string;
  invalid?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomNewSelect: React.FC<CustomSelectInterface> = ({
  defaultValue,
  isDisabled,
  placeholder,
  optionList,
  className,
  radioName,
  onChange,
  invalid,
}) => {
  const wrapperRef = useRef(null);

  const [showOptionList, setShowOptionList] = useState<boolean>(false);

  const [defaultText, setDefaultText] = useState<string>('');

  const handleListDisplay = () => {
    if (!isDisabled) {
      setShowOptionList(!showOptionList);
    }
  };
  
  const selectRef = useRef(null) as any;

  function handleClickOutside(event: MouseEvent) {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setShowOptionList(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    let selectedOption:
      | SelectOptionList
      | null
      | undefined;
    if (optionList) {
      selectedOption = optionList.find(
        (item: SelectOptionList | null) =>
          item ? `${item.optionId}` === defaultValue : false,
      );
    }
    setDefaultText(selectedOption ? `${selectedOption.label}` : placeholder);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    setDefaultText(event.currentTarget.getAttribute('data-name') || '');
    onChange((event as unknown) as React.ChangeEvent<HTMLSelectElement>);
    setShowOptionList(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={wrapperRef}
      className={cx('custom-select-container', className, {
        'custom-select-container-border': showOptionList,
        'custom-select-container-disabled': isDisabled,
        '-invalid': invalid,
      })}
      onClick={handleListDisplay}
    >
      <div
        className={showOptionList ? 'selected-text active' : 'selected-text'}
      >
        {!showOptionList && (
          <div className="placeholder-top">{placeholder}</div>
        )}
        {showOptionList ? placeholder : defaultText}
      </div>

      {showOptionList && (
        <ul className="select-options">
          {!!optionList &&
            optionList.map(
              (
                option:
                  | SelectOptionList
                  | null,
              ) => {
                return (
                  <li
                    data-name={option ? option.label : ''}
                    data-id={option ? option.optionId || 0 : 0}
                    key={option ? option.optionId || 0 : 0}
                    onClick={handleOptionClick}
                  >
                    <FormGroup>
                      <Radio
                        className="custom-select-option"
                        name={`customSelect${radioName}`}
                        id={`${option ? option.optionId || 0 : 0}`}
                        label={option ? option.label || '' : ''}
                        value={`${option ? option.optionId || 0 : 0}`}
                        onChange={() => {}}
                        checked={
                          option ? defaultValue === `${option.optionId}` : false
                        }
                        disabled={isDisabled}
                      />
                    </FormGroup>
                  </li>
                );
              },
            )}
        </ul>
      )}
      <span className="icon select--chevron">
        <Icon icon={<ChevronDown />} className="-stroke -dark" />
      </span>
    </div>
  );
};

export default React.memo(CustomNewSelect);
