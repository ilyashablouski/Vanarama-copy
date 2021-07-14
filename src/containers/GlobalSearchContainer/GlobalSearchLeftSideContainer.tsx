import dynamic from 'next/dynamic';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  suggestions: string[];
  totalCount: number;
}
const GlobalSearchLeftSideContainer = ({ suggestions, totalCount }: IProps) => {
  return (
    <div>
      <span className="heading -small -dark">Suggestions</span>
      {totalCount === 0 && (
        <Text className="-small -dark" tag="p">
          No suggestions
        </Text>
      )}
      <ul>
        {suggestions.map((suggestion: string) => (
          <li key={suggestion}>
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
