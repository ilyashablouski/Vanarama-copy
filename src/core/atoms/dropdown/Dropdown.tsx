import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import ChevronDownSharp from '../../assets/icons/ChevronDownSharp';
import Icon from '../icon';
import { ChildrenCallback, IDropdownProps } from './interfaces';

const Dropdown = ({
  children,
  className,
  dataTestId,
  defaultOpen = false,
  label,
  renderProps,
}: IDropdownProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen(prev => !prev);
  const dropdownRef = useRef(null) as any;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className={cx('dropdown', { '-open': open }, className)}
      data-testid={dataTestId}
      ref={dropdownRef}
    >
      <button className="dropdown--toggle" onClick={toggle} type="button">
        <span>{label}</span>
        <Icon icon={<ChevronDownSharp />} color="dark" />
      </button>
      <div className="dropdown--content">
        {renderProps && children
          ? (children as ChildrenCallback)(toggle)
          : children}
      </div>
    </div>
  );
};

export default Dropdown;
