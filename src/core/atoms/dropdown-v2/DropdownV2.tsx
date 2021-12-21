import cx from 'classnames';
import React, { useRef, useEffect } from 'react';
import ChevronDownSharp from '../../assets/icons/ChevronDownSharp';

import { IDropdownV2Props } from './interfaces';

function DropdownV2({
  type,
  label,
  open,
  children,
  options,
  selectedOptions,
  onLabelClick,
  renderSummary,
  multiselect,
}: IDropdownV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const getElementsHeight = () => ({
    optionsHeight: optionsRef.current?.offsetHeight || 0,
    summaryHeight: summaryRef.current?.offsetHeight || 0,
    labelHeight: labelRef.current?.offsetHeight || 45,
  });

  useEffect(() => {
    if (open) {
      const { optionsHeight, labelHeight } = getElementsHeight();
      containerRef.current!.style.height = `${labelHeight + optionsHeight}px`;
      setTimeout(() => {
        containerRef.current!.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 500);
    } else {
      containerRef.current!.removeAttribute('style');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const { summaryHeight, optionsHeight, labelHeight } = getElementsHeight();
    const currentLabelHeight = !selectedOptions?.length ? labelHeight : 0;
    const currentOptionsHeight = open ? optionsHeight : 0;

    containerRef.current!.style.height = `${currentLabelHeight +
      currentOptionsHeight +
      summaryHeight}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.length, selectedOptions?.length]);

  return (
    <div
      role="button"
      ref={containerRef}
      className={cx({
        'drop-down': type === 'drop-down',
        'drop-select': type === 'drop-select',
        'dynamic-label': !multiselect,
        open,
      })}
    >
      <span
        role="button"
        className="label"
        ref={labelRef}
        onClick={onLabelClick}
      >
        <span>{label}</span>
        <ChevronDownSharp />
      </span>
      <div ref={optionsRef} className="options">
        {renderSummary?.(summaryRef)}
        {children}
      </div>
    </div>
  );
}

export default DropdownV2;
