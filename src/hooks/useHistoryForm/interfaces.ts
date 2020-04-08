import { UseFormOptions } from 'react-hook-form';
import { THistoryEntry } from '../../utils/dates';

export type Options<V> = UseFormOptions<V> & {
  /**
   * The number of months worth of history that is required in this form.
   * This controls when new fields are added/removed.
   */
  requiredMonths: number;
  /**
   * The key of the field in the form values where the history entries are stored
   */
  fieldArrayKey: keyof V & string;
};

export interface WithHistory {
  history: THistoryEntry[];
}
