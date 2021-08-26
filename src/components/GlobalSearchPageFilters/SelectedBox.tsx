import { forwardRef } from 'react';

interface IProps {
  selected: string[];
  onClearFilterBlock: () => void;
  renderFunction?: (values: string[]) => string[];
}

const SelectedBox = forwardRef<HTMLDivElement, IProps>(
  ({ selected, onClearFilterBlock, renderFunction }, ref) => {
    return (
      <div
        className="selection-summary"
        ref={ref}
        style={{
          display: selected.length > 0 ? 'flex' : 'none',
        }}
      >
        <div className="overview">
          <span>{selected.length} Selected</span>
          <span>
            {renderFunction
              ? renderFunction(selected).join(', ')
              : selected.join(', ')}
          </span>
        </div>
        <button
          type="button"
          onClick={event => {
            event.stopPropagation();
            onClearFilterBlock();
          }}
        >
          Clear
        </button>
      </div>
    );
  },
);

export default SelectedBox;
