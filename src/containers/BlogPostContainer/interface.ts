export interface IHeading {
  level: number;
  children: Array<any>;
}

export interface IParagraph {
  children: Array<any>;
}

export interface ILink {
  href: string;
  children: string;
}

export interface IImage {
  src: string;
  alt: string;
}
