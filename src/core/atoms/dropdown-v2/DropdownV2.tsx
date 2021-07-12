import cx from 'classnames';
import React, { useRef, useEffect } from 'react';
import ChevronDownSharp from '../../assets/icons/ChevronDownSharp';

import { IDropdownV2Props } from './interfaces';

function DropdownV2({
  type,
  label,
  open,
  children,
  onLabelClick,
  onContainerClick,
  renderSummary,
  multiselect,
  selected,
}: IDropdownV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isRefsReady = [
      containerRef.current,
      labelRef.current,
      optionsRef.current,
      summaryRef.current,
    ].every(item => !!item);

    if (isRefsReady) {
      const labelHeight = labelRef.current!.offsetHeight;
      const optionsHeight = optionsRef.current!.offsetHeight;
      const summaryHeight = summaryRef.current!.offsetHeight;

      if (open) {
        if (multiselect && selected.length > 0) {
          containerRef.current!.style.height = `${optionsHeight +
            summaryHeight}px`;
        } else {
          containerRef.current!.style.height = `${labelHeight +
            optionsHeight}px`;
        }

        setTimeout(() => {
          containerRef.current!.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 500);
      } else {
        containerRef.current!.removeAttribute('style');
      }
    }
  }, [
    open,
    selected,
    multiselect,
    containerRef,
    labelRef,
    optionsRef,
    summaryRef,
  ]);

  return (
    <div
      role="button"
      onClick={onContainerClick}
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
        {/* summaryData && (
          <div
            className={cx('selection-summary', {
              visible:
                (multiselect || type === 'drop-select') &&
                selectedItems.length > 0,
            })}
            ref={summaryRef}
          >
            <div className="overview">
              {summaryData.label && <span>{summaryData.label}</span>}
              {summaryData.description && (
                <span>{summaryData.description}</span>
              )}
            </div>
            <button type="button" onClick={handleSelectedCleaning}>
              Clear
            </button>
          </div>
        ) */}
        {children}
      </div>
    </div>
  );
}

export default DropdownV2;