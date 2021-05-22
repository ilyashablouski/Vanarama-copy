import RouterLink from '../../components/RouterLink/RouterLink';

interface IProps {
  suggestions: string[];
}
const GlobalSearchLeftSideContainer = ({ suggestions }: IProps) => {
  return (
    <div>
      <span className="heading -small -dark">Suggestions</span>
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
