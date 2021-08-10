import Cookies from 'js-cookie';
import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';
import { IInnerSelect } from './interfaces';

export const getInnerConfigKeys = (innerSelects: IInnerSelect[]) =>
  innerSelects.map(select => select.key as keyof IFiltersData);

export const renderPowerEngineValue = (value: string) => `${value}bhp`;

export const renderPowerEngineSelected = (values: (string | null)[]) => {
  const text = `${values[0] ? `From ${values[0]}bhp` : ''}${
    values[1] ? ` to ${values[1]}bhp` : ''
  }`.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const renderBudgetValue = (value: string) => `£${value}`;

export const renderBudgetSelected = (values: (string | null)[]) => {
  const text = `${values[0] ? `From £${values[0]}` : ''}${
    values[1] ? ` to £${values[1]}` : ''
  }`.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getSelectedValues = (
  innerSelects?: IInnerSelect[],
  activeFilters?: IFiltersData,
) =>
  innerSelects
    ?.map(item => activeFilters?.[item.key as keyof IFiltersData])
    .reduce(
      (acc, item) => [...(acc || []), ...(item || [])] as (string | number)[],
      [] as (string | number)[],
    );

export const ENGINE_POWER_FILTERS_DEFAULT = [
  0,
  100,
  120,
  140,
  160,
  180,
  200,
  220,
  240,
  260,
  280,
  300,
  320,
  340,
  360,
  380,
  400,
  450,
  500,
  550,
  600,
  650,
  700,
  750,
  800,
  900,
  1000,
];

export const buildEnginePowerValues = (min: number, max: number) =>
  ENGINE_POWER_FILTERS_DEFAULT.filter(value => min <= value && value <= max);

export const isAdvancedFiltersEnabled = Cookies.get('DIG-6365') === '1';
