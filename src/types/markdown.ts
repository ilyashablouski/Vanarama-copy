export interface IMarkdownLink {
  href: string;
  children: string;
}

export interface IMarkdownImage {
  src: string;
  alt: string;
}

export interface IMarkdownHeading {
  level: number;
  children: Array<any>;
}

export interface IMarkdownParagraph {
  children: Array<any>;
}
