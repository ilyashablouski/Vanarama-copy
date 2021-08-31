import { CreateExpenseMutation as Mutation } from '../../../generated/CreateExpenseMutation';
import { IOrderStorageData } from '../../hooks/useGetOrder';

export interface IProps {
  orderId: string;
  personUuid: string;
  onCompleted: (data: Mutation) => void;
  order?: IOrderStorageData | null;
}
