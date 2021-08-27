import { IQueryKeyMapper } from './interfaces';

export const queryParameterKeyMapper: IQueryKeyMapper = {
  make: 'manufacturer',
};

export function mapQueryParameterKey(queryKey: string) {
  return queryParameterKeyMapper[queryKey] ?? queryKey;
}
