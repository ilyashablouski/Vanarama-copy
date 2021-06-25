interface IProps {
  renderFunction?: (values: string[]) => string;
  selected: string[];
  onClear: () => void;
}

const SelectedDropdown = ({ renderFunction, selected, onClear }: IProps) => {
  return selected.length ? (
    <div className="selection-summary">
      <div className="overview">
        <span>
          {renderFunction ? renderFunction(selected) : selected.join(' ')}
        </span>
      </div>
      <button type="button" onClick={onClear}>
        Clear
      </button>
    </div>
  ) : null;
};

export default SelectedDropdown;
