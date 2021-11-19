import dynamic from 'next/dynamic';
import { useState } from 'react';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';
import { isPartnerSessionActive } from '../../utils/partnerProperties';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  suggestions: string[];
  dataUiTestId?: string;
}

const GlobalSearchLeftSideContainer = ({
  suggestions,
  dataUiTestId,
}: IProps) => {
  const [isPartnerSession] = useState(isPartnerSessionActive());
  return (
    <div>
      {!isPartnerSession && (
        <>
          <span className="heading -small -dark">Suggestions</span>
          {suggestions.length === 0 && (
            <Text className="-small -dark" tag="p">
              No suggestions
            </Text>
          )}
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={suggestion}>
                <RouterLink
                  dataUiTestId={`${dataUiTestId}_suggestions-link-${index}`}
                  link={{
                    href: `/search?searchTerm=${suggestion}`,
                    label: suggestion,
                  }}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GlobalSearchLeftSideContainer;
