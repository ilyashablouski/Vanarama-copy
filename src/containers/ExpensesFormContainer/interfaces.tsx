import { CreateExpenseMutation as Mutation } from '../../../generated/CreateExpenseMutation';
import { IOrderStorageData } from '../../hooks/useGetOrder';

export interface IProps {
  personUuid: string;
  onCompleted: (data: Mutation) => void;
  order?: IOrderStorageData | null;
}
