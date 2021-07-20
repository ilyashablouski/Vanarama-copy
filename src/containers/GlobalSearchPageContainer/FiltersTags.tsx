import Close from 'core/assets/icons/Close';
import { useMemo } from 'react';
import { ISelectedTags } from './interfaces';

interface IProps {
  tags: ISelectedTags[];
  clearAllFilters: () => void;
  removeFilterValue: (value: string, key: string) => void;
}
const FiltersTags = ({ tags, clearAllFilters, removeFilterValue }: IProps) => {
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
            {filterTags.filterKey === 'from' || filterTags.filterKey === 'to'
              ? `£${tag}`
              : tag}
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
