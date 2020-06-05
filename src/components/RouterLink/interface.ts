import { ILink } from '@vanarama/uibook/lib/interfaces/link';

export interface ILinkProps extends ILink {
  linkType?: string;
  childrenLinks?: ILinkProps[];
  target?: string;
}
