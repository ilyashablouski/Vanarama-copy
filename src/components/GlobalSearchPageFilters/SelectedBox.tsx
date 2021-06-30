interface IProps {
  selected: string[];
  onClearFilterBlock: () => void;
}
const SelectedBox = ({ selected, onClearFilterBlock }: IProps) => {
  return selected.length ? (
    <div className="selection-summary">
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
  ) : null;
};

export default SelectedBox;
