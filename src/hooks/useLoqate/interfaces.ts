export interface ILoqateQuery {
  /**
   * The text to filter addresses by
   */
  text?: string;
  /**
   * The postcode to look within
   */
  postcode?: string;
}

export interface ILoqateConfig {
  apiKey: string;
  country: 'GB';
  limit: number;
}

type TResultType = 'Address' | 'Postcode';

export interface ILoqateSuggestion {
  id: string;
  type: TResultType;
  text: string;
  description: string;
}

export interface ILoqateAPIResponse {
  Items: {
    Id: string;
    Type: TResultType;
    Text: string;
    Description: string;
  }[];
}
