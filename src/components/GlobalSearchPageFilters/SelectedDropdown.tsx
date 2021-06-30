import { useMemo } from 'react';

interface IProps {
  renderFunction?: (values: (string | null)[]) => string;
  selected: (string | null)[];
  onClear: () => void;
}

const SelectedDropdown = ({ renderFunction, selected, onClear }: IProps) => {
  const isNotEmpty = useMemo(() => !!selected.filter(value => value).length, [
    selected,
  ]);
  return isNotEmpty ? (
    <div className="selection-summary">
      <div className="overview">
        <span>
          {renderFunction
            ? renderFunction(selected)
            : selected.filter(value => value).join(' ')}
        </span>
      </div>
      <button type="button" onClick={onClear}>
        Clear
      </button>
    </div>
  ) : null;
};

export default SelectedDropdown;
