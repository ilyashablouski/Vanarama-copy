import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import Radio from 'core/atoms/radio';
import FormGroup from 'core/molecules/formgroup';
import ChevronDown from 'core/assets/icons/ChevronDown';
import Icon from 'core/atoms/icon';

interface SelectOptionList {
  optionId: number | null;
  label: string | null;
}

interface CustomSelectInterface {
  label: string;
  selectedValue: string;
  placeholder: string;
  isDisabled: boolean;
  optionList: (SelectOptionList | null)[] | null | undefined;
  radioName: string;
  className: string;
  invalid?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dataTestId?: string;
  dataUiTestId?: string;
}

const CustomNewSelect: React.FC<CustomSelectInterface> = ({
  label,
  selectedValue,
  isDisabled,
  placeholder,
  optionList,
  className,
  radioName,
  onChange,
  invalid,
  dataTestId,
  dataUiTestId,
}) => {
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  const [showOptionList, setShowOptionList] = useState<boolean>(false);

  const handleListDisplay = () => {
    if (!isDisabled) {
      setShowOptionList(!showOptionList);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      event.target instanceof Element &&
      !wrapperRef.current.contains(event.target as Element)
    ) {
      setShowOptionList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    onChange((event as unknown) as React.ChangeEvent<HTMLSelectElement>);
    setShowOptionList(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      data-testid={dataTestId}
      data-uitestid={dataUiTestId}
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
        {showOptionList ? placeholder : label}
      </div>

      {showOptionList && (
        <ul className="select-options">
          {!!optionList &&
            optionList.map((option: SelectOptionList | null) => (
              <li
                data-name={option?.label ?? ''}
                data-id={option?.optionId ?? 0}
                key={option?.optionId ?? 0}
                onClick={handleOptionClick}
                data-uitestid={`${dataUiTestId}_${option?.label ?? ''}`}
              >
                <FormGroup>
                  <Radio
                    className="custom-select-option"
                    name={`customSelect${radioName}`}
                    id={`${option?.optionId ?? 0}`}
                    label={option?.label ?? ''}
                    value={`${option?.optionId ?? 0}`}
                    onChange={() => {}}
                    checked={
                      option ? selectedValue === `${option.optionId}` : false
                    }
                    disabled={isDisabled}
                    dataUiTestId={dataUiTestId}
                  />
                </FormGroup>
              </li>
            ))}
        </ul>
      )}
      <span className="icon select--chevron">
        <Icon icon={<ChevronDown />} className="-stroke -dark" />
      </span>
    </div>
  );
};

export default React.memo(CustomNewSelect);
