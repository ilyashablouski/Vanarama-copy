import dynamic from 'next/dynamic';
import RouterLink from '../../components/RouterLink/RouterLink';
import { Nullable } from '../../types/common';
import { fullTextSearchVehicleList_fullTextSearchVehicleList_aggregation as IFullTextSearchAggregation } from '../../../generated/fullTextSearchVehicleList';
import Skeleton from '../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  suggestions: string[];
  aggregation: Nullable<IFullTextSearchAggregation>;
}
const GlobalSearchLeftSideContainer = ({
  suggestions,
  aggregation,
}: IProps) => {
  return (
    <div>
      <span className="heading -small -dark">Suggestions</span>
      {aggregation?.totalVehicles === 0 && (
        <Text className="-small -dark" tag="p">
          No suggestions
        </Text>
      )}
      <ul>
        {suggestions.map((suggestion: string) => (
          <li>
            <RouterLink
              link={{
                href: `/search?searchTerm=${suggestion}`,
                label: suggestion,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalSearchLeftSideContainer;
