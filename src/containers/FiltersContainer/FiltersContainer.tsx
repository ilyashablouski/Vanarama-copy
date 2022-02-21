import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { IChoice } from 'core/atoms/choiceboxes/interfaces';
import { useDesktopViewport } from '../../hooks/useMediaQuery';
import { getPartnerProperties } from '../../utils/partnerProperties';
import {
  IChoiceBoxesData,
  IFilterContainerProps,
  IFiltersMapper,
  ISelectedFiltersState,
  ISelectedWithOrder,
} from './interfaces';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import Skeleton from '../../components/Skeleton';
import { getValueKey } from './helpers';
import { arraysAreEqual } from '../../utils/helpers';
import { createInitialFiltersState } from '../SearchPageContainer/helpers';

const SearchFilters = dynamic(() => import('core/organisms/search-filters'), {
  loading: () => <Skeleton count={1} />,
});
const SearchFiltersHead = dynamic(
  () => import('core/organisms/search-filters/SearchFiltersHead'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const SearchFilterTags = dynamic(
  () => import('core/organisms/search-filters/SearchFilterTags'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Toggle = dynamic(() => import('core/atoms/toggle'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});
const OptionsIcon = dynamic(() => import('core/assets/icons/Options'));
const ChevronUp = dynamic(() => import('core/assets/icons/ChevronUp'));
const ChevronDown = dynamic(() => import('core/assets/icons/ChevronDown'));

const FiltersContainer = ({
  isPersonal,
  setType,
  preLoadFilters,
  tagArrayBuilderHelper,
  renderFilters,
  dataUiTestId,
}: IFilterContainerProps) => {
  const [filtersData, setFiltersData] = useState(
    preLoadFilters || ({} as IFilterList),
  );

  const [
    shouldMakeChoiceboxesForceUpdate,
    setShouldMakeChoiceboxesForceUpdate,
  ] = useState(false);

  const [tempFilterName, setTempFilterName] = useState('');

  const [choiceBoxesData, setChoiceBoxesData] = useState(
    {} as IChoiceBoxesData,
  );
  const isDesktop = useDesktopViewport();
  const initialState = useMemo(
    () => createInitialFiltersState(getPartnerProperties()?.fuelTypes || []),
    [],
  );
  const [isOpenFilter, setFilterExpandStatus] = useState(false);
  const [customCTAColor, setCustomCTAColor] = useState<string | undefined>(
    undefined,
  );

  const [selectedFiltersState, setSelectedFiltersState] = useState<
    ISelectedFiltersState
  >(initialState);
  const [selectedFilterTags, setSelectedFilterTags] = useState(
    [] as ISelectedWithOrder[],
  );

  useEffect(() => {
    if (getPartnerProperties()) {
      setCustomCTAColor(getPartnerProperties()?.color);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const choiseBoxReference = {} as any;

  /** create ref object for every multiselect dropdown. For call Choiseboxes component update method */
  const getOrCreateRef = (id: keyof typeof choiceBoxesData) => {
    if (!Object.prototype.hasOwnProperty.call(choiseBoxReference, id)) {
      choiseBoxReference[id] = React.createRef();
    }
    return choiseBoxReference[id];
  };

  /** build correct data for choiseboxes component */
  const buildChoiseBoxData = useCallback(
    (state = selectedFiltersState) => {
      const filters = {
        bodyStyles: filtersData.bodyStyles,
        transmissions: filtersData.transmissions,
        fuelTypes: filtersData.fuelTypes,
      };
      const choisesObject = {} as IChoiceBoxesData;
      Object.keys(filters).forEach(key => {
        choisesObject[key] =
          filters[key as keyof typeof filters]?.map(value => ({
            label: value,
            value,
            active: state[key].includes(value),
          })) || [];
      });
      return choisesObject;
    },
    [filtersData, selectedFiltersState],
  );

  /** changing data for choiseboxes component */
  const choiseBoxBuilder = (
    choices: IChoice[],
    filterAccessor: keyof IFiltersMapper,
    actualState = selectedFiltersState,
  ) =>
    choices?.map((value: IChoice) => ({
      ...value,
      active: actualState[filterAccessor].includes(value.label),
    }));

  useEffect(() => {
    if (filtersData?.bodyStyles) {
      setChoiceBoxesData(buildChoiseBoxData());
    }
  }, [filtersData, buildChoiseBoxData]);

  useEffect(() => {
    if (!isDesktop) {
      setFilterExpandStatus(false);
    } else {
      setFilterExpandStatus(true);
    }
  }, [isDesktop]);

  // hack for subscribe multiselects changes and update Choiceboxes state
  useEffect(() => {
    if (tempFilterName === 'all') {
      Object.keys(choiseBoxReference).forEach((e: string) =>
        choiseBoxReference[e]?.current?.updateState(),
      );
      setTempFilterName('');
    } else if (tempFilterName) {
      choiseBoxReference[tempFilterName].current.updateState();
      setTempFilterName('');
    }
  }, [tempFilterName, setTempFilterName, choiseBoxReference]);

  // toogle personal/bussiness prices
  const toggleHandler = (value: React.ChangeEvent<HTMLInputElement>) =>
    setType(value.target.checked);

  /** check budget rules for valid value */
  const isInvalidBudget = (value: string, type: string) => {
    return !(
      (type === 'from' &&
        (value < selectedFiltersState.to[0] || !selectedFiltersState.to[0])) ||
      (type === 'to' &&
        (value > selectedFiltersState.from[0] || !selectedFiltersState.from[0]))
    );
  };

  // subscribe for change applied filters value for manage tags state
  useEffect(() => {
    const selected: ISelectedWithOrder[] = Object.entries(selectedFiltersState)
      .map(entry => tagArrayBuilderHelper(entry, filtersData))
      .flat()
      .filter(({ order, value }) => value?.length > 0 && order !== undefined);
    // prevented useless updates
    // check for empty array used for prevent cases when initial render don't call a request
    if (
      !arraysAreEqual(selected, selectedFilterTags, 'order') ||
      !selected.length
    ) {
      setSelectedFilterTags(selected);
    }
    // can't to add selectedFilterTags to deps, because it have circular dependency with selectedFiltersState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiltersState]);

  // made force update for choiseboxes state
  useEffect(() => {
    if (shouldMakeChoiceboxesForceUpdate) {
      Object.keys(choiseBoxReference).forEach((e: string) =>
        choiseBoxReference[e]?.current?.updateState(),
      );
      setShouldMakeChoiceboxesForceUpdate(false);
    }
  }, [shouldMakeChoiceboxesForceUpdate, choiseBoxReference]);

  /** handle for dropdowns */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setSelectedFiltersState({ ...selectedFiltersState, [name]: [value] });
  };

  /** handler for multiselect */
  const handleChecked = (value: IChoice, filterName: keyof IFiltersMapper) => {
    const newSelectedFilters = { ...selectedFiltersState };
    if (!newSelectedFilters[filterName]) {
      newSelectedFilters[filterName] = [];
    }

    // Add.
    if (value.active) {
      newSelectedFilters[filterName] = [
        ...selectedFiltersState[filterName],
        value.label,
      ];
    }
    // Remove.
    else {
      newSelectedFilters[filterName] = selectedFiltersState[filterName].filter(
        (filter: string | number) => value.label !== filter,
      );
    }
    setSelectedFiltersState({ ...newSelectedFilters });
    setChoiceBoxesData({
      ...choiceBoxesData,
      [filterName]: choiseBoxBuilder(
        choiceBoxesData[filterName],
        filterName,
        newSelectedFilters,
      ),
    });
  };

  /**
   * clear all filters
   */
  const handleClearAll = () => {
    let newSelectedFiltersState = selectedFiltersState;
    selectedFilterTags.forEach(({ value }) => {
      const formatedValue = value
        .replace('£', '')
        .split(' ')
        .join('-')
        .toLowerCase();
      const filter = getValueKey(
        formatedValue,
        selectedFiltersState,
      ) as keyof IFiltersMapper;
      newSelectedFiltersState = {
        ...newSelectedFiltersState,
        [filter]: newSelectedFiltersState[filter]?.filter(
          selectedValue =>
            selectedValue
              .split(' ')
              .join('-')
              .toLowerCase() !== formatedValue,
        ),
      };
    });
    setSelectedFiltersState(newSelectedFiltersState);
    setChoiceBoxesData(buildChoiseBoxData(newSelectedFiltersState));
    setTempFilterName('all');
  };

  /**
   * remove value from filter after deleting tag
   */
  const handleRemoveTag = (value: string) => {
    const formatedValue = value.replace('£', '').toLowerCase();

    const filter = getValueKey(
      formatedValue,
      selectedFiltersState,
    ) as keyof IFiltersMapper;
    const newSelectedFiltersState = {
      ...selectedFiltersState,
      [filter]: selectedFiltersState[filter].filter(
        selectedValue => selectedValue.toLowerCase() !== formatedValue,
      ),
    };

    setSelectedFiltersState({
      ...newSelectedFiltersState,
    });
    if (choiseBoxReference[filter]) {
      setChoiceBoxesData(() => ({
        ...choiceBoxesData,
        [filter]: choiseBoxBuilder(
          choiceBoxesData[filter],
          filter,
          newSelectedFiltersState,
        ),
      }));
      setTempFilterName(filter as string);
    }
  };

  /**
   * clear opened filter
   */
  const clearFilter = (filterName: keyof IFiltersMapper) => {
    const newSelectedFiltersState = {
      ...selectedFiltersState,
      [filterName]: [],
    };
    setSelectedFiltersState({ ...newSelectedFiltersState });
    setChoiceBoxesData(() => ({
      ...choiceBoxesData,
      [filterName]: choiseBoxBuilder(
        choiceBoxesData[filterName],
        filterName,
        newSelectedFiltersState,
      ),
    }));
    setTempFilterName(filterName as string);
  };

  /** handle filter expand status */
  const handleFilterExpand = () => {
    if (!isDesktop) {
      setFilterExpandStatus(prevValue => !prevValue);
    }
  };

  return (
    <SearchFilters isOpen={isOpenFilter} dataUiTestId={dataUiTestId}>
      <SearchFiltersHead onClick={handleFilterExpand}>
        <Icon icon={<OptionsIcon />} className="search-filters--title-icon" />
        <span
          data-uitestid={
            dataUiTestId ? `${dataUiTestId}_span_filters` : undefined
          }
        >
          Filters
        </span>
        <Icon
          icon={isOpenFilter ? <ChevronUp /> : <ChevronDown />}
          className="search-filters--title-icon"
          color="white"
        />
      </SearchFiltersHead>
      <Toggle
        offLabel="Business"
        onLabel="Personal"
        id="contractType"
        onChange={toggleHandler}
        checked={isPersonal}
        className="search-filters--toggle"
        customCTAColor={customCTAColor}
        dataUiTestId={dataUiTestId}
      />
      {renderFilters({
        setSelectedFiltersState,
        selectedFiltersState,
        handleChecked,
        handleSelect,
        filtersData,
        setFiltersData,
        getOrCreateRef,
        choiceBoxesData,
        initialState,
        setShouldMakeChoiceboxesForceUpdate,
        clearFilter,
        isInvalidBudget,
        selectedFilterTags,
      })}
      <SearchFilterTags
        selectedFilters={selectedFilterTags}
        onClearAll={handleClearAll}
        onRemove={e => handleRemoveTag(e.currentTarget.id)}
        dataUiTestId={dataUiTestId}
      />
    </SearchFilters>
  );
};

export default FiltersContainer;
