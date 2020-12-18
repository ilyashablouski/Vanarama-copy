import { ILoqateSuggestion } from '../../../hooks/useLoqate/interfaces';

// eslint-disable-next-line import/prefer-default-export
export const suggestionToDisplay = (suggestion: ILoqateSuggestion) =>
  `${suggestion.text} - ${suggestion.description}`;
