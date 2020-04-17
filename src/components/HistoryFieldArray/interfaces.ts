import { ArrayField } from 'react-hook-form';
import { THistoryEntry } from '../../utils/dates';

type Field = Partial<ArrayField<Record<string, any>, 'id'>>;

// Gets the type of the elements in an array
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type WithHistory = {
  history: THistoryEntry[];
};

export interface IHistoryFieldArrayProps<V extends WithHistory> {
  children: (field: Field, index: number) => React.ReactNode;
  messageFormat: string;
  requiredMonths: number;
  initialState: ArrayElement<V['history']>;
}
