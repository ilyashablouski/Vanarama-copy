import { IBaseProps } from '../../interfaces/base';

export interface ILeagueProps extends IBaseProps {
  clickReadMore: () => void;
  link: string;
  altText?: string;
}
