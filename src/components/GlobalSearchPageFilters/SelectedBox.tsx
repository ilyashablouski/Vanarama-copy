import { forwardRef } from 'react';

interface IProps {
  selected: string[];
  onClearFilterBlock: () => void;
}

const SelectedBox = forwardRef<HTMLDivElement, IProps>(
  ({ selected, onClearFilterBlock }, ref) => {
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
          <span>{selected.join(', ')}</span>
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
