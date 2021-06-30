import qs from 'qs';
import {
  ILoqateAPIResponse,
  ILoqateConfig,
  ILoqateQuery,
  ILoqateSuggestion,
} from './interfaces';

export const mapResponse = (
  response: ILoqateAPIResponse,
): ILoqateSuggestion[] =>
  response.Items.map(item => ({
    id: item.Id,
    type: item.Type,
    text: item.Text,
    description: item.Description,
  }));

export const createUrl = (query: ILoqateQuery, config: ILoqateConfig) => {
  const querystring = qs.stringify({
    Key: config.apiKey,
    Limit: config.limit,
    Countries: config.country,
    Text: query.text,
    Container: query.postcode,
  });

  return `https://api.addressy.com/Capture/Interactive/Find/v1.1/json3.ws?${querystring}`;
};

export const makeAddressResponseMock = () => ({
  data: [
    {
      id: 'GB|RM|A|54725860',
      description: 'Bournemouth, BH8 8ES',
      text: 'B001, Purbeck House 5-7, Oxford Road',
      type: 'Address',
    },
    {
      id: 'GB|RM|A|54725861',
      description: 'Bournemouth, BH8 8ES',
      text: 'B002, Purbeck House 5-7, Oxford Road',
      type: 'Address',
    },
    {
      id: 'GB|RM|A|56391338',
      description: 'Gosport, PO12 2FD',
      text: 'B003, Domville House, Sir John Richardson Avenue',
      type: 'Address',
    },
  ],
});
