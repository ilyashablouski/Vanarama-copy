import { IFiltersData } from '../../containers/GlobalSearchPageContainer/interfaces';
import { IInnerSelect } from './interfaces';

export const getInnerConfigKeys = (innerSelects: IInnerSelect[]) =>
  innerSelects.map(select => select.key as keyof IFiltersData);

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
    .reduce((acc, item) => [...(acc || []), ...(item || [])], []);
