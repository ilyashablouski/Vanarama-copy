import { ILink } from 'core/interfaces/link';
import { ParsedUrlQueryInput } from 'querystring';

export interface ILinkProps extends ILink {
  linkType?: string;
  childrenLinks?: ILinkProps[];
  target?: string;
  query?: string | ParsedUrlQueryInput | null | undefined;
}
