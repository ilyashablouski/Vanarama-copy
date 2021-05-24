export interface ILink {
  id?: string;
  label: string;
  href: string;
  children?: ILink[];
}
