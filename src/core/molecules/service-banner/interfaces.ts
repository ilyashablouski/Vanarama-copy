export interface IServiceBannerLink {
  url?: string | null;
  text?: string | null;
}

export interface IServiceBanner {
  enable?: boolean | null;
  message?: string | null;
  link?: IServiceBannerLink | null;
  className?: string;
}
