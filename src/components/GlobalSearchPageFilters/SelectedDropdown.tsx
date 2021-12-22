import React, { forwardRef, useMemo } from 'react';

interface IProps {
  renderFunction?: (values: (string | null)[]) => string;
  selected: (string | null)[];
  onClear: () => void;
  dataUiTestId?: string;
}

const SelectedDropdown = forwardRef<HTMLDivElement, IProps>(
  ({ renderFunction, selected, onClear, dataUiTestId }, ref) => {
    const visibleItems = useMemo(() => selected?.filter(item => !!item), [
      selected,
    ]);

    return (
      <div
        ref={ref}
        className="selection-summary"
        style={{ display: visibleItems?.length > 0 ? 'flex' : 'none' }}
      >
        <div className="overview">
          <span
            data-uitestid={`${dataUiTestId}_span_selected-data_${
              renderFunction
                ? renderFunction(selected)
                : selected?.filter(value => value).join(' ')
            }`}
          >
            {renderFunction
              ? renderFunction(selected)
              : selected?.filter(value => value).join(' ')}
          </span>
        </div>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    );
  },
);

export default SelectedDropdown;
