import Close from 'core/assets/icons/Close';
import { useCallback, useMemo } from 'react';
import { IFiltersData, ISelectedTags } from './interfaces';
import {
  handleUnlistedValue,
  renderBudgetValue,
  renderDoorsValue,
  renderPowerEngineValue,
  renderSeatsValue,
} from '../../components/GlobalSearchPageFilters/helpers';

interface IProps {
  tags: ISelectedTags[];
  clearAllFilters: () => void;
  removeFilterValue: (value: string, key: string) => void;
}
const FiltersTags = ({ tags, clearAllFilters, removeFilterValue }: IProps) => {
  const renderFunction = useCallback(
    (value: string, key: keyof IFiltersData) => {
      switch (key) {
        case 'from':
        case 'to':
          return renderBudgetValue(value);
        case 'fromEnginePower':
        case 'toEnginePower':
          return renderPowerEngineValue(value);
        case 'noOfSeats':
          return renderSeatsValue(handleUnlistedValue(value));
        case 'doors':
          return renderDoorsValue(handleUnlistedValue(value));
        default:
          return value;
      }
    },
    [],
  );

  const isShowClearAllBtn = useMemo(
    () => tags.map(filterTags => filterTags.tags).flat().length > 1,
    [tags],
  );

  return (
    <div className="srp-f-tags">
      {tags.map(filterTags =>
        filterTags.tags.map(tag => (
          <button
            type="button"
            key={`${filterTags.filterKey}-${tag}`}
            onClick={() => removeFilterValue(tag, filterTags.filterKey)}
          >
            {renderFunction(tag, filterTags.filterKey)}
            <Close />
          </button>
        )),
      )}
      {isShowClearAllBtn && (
        <button type="button" className="clear-all" onClick={clearAllFilters}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default FiltersTags;
