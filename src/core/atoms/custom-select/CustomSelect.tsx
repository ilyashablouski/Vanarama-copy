import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import Icon from 'core/atoms/icon';
import ChevronDown from 'core/assets/icons/ChevronDown';
import ChevronUp from 'core/assets/icons/ChevronUp';
import CustomColorsList from 'core/atoms/custom-select/components/CustomColorsList';
import { IOptionsList } from '../../../types/detailsPage';

interface CustomSelectInterface {
  label: string;
  selectedValue?: Nullable<string>;
  placeholder: string;
  isDisabled: boolean;
  items: IOptionsList[];
  radioName: string;
  className: string;
  invalid?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dataTestId?: string;
  dataUiTestId?: string;
}

const CustomSelect: React.FC<CustomSelectInterface> = ({
  label,
  selectedValue,
  isDisabled,
  placeholder,
  items,
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
        <CustomColorsList
          items={items}
          setShowOptionList={setShowOptionList}
          isDisabled={isDisabled}
          selectedValue={selectedValue}
          radioName={radioName}
          onChange={onChange}
        />
      )}
      <span className="icon select--chevron">
        {showOptionList ? (
          <Icon icon={<ChevronUp />} className="-stroke -dark" />
        ) : (
          <Icon icon={<ChevronDown />} className="-stroke -dark" />
        )}
      </span>
    </div>
  );
};

export default React.memo(CustomSelect);
