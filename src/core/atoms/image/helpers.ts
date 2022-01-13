import { ImageLoaderProps } from 'next/image';
import { trimStartSlash } from '../../../utils/url';

// eslint-disable-next-line import/prefer-default-export
export function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  const params = [`width=${width}`];

  if (quality) {
    params.push(`quality=${quality}`);
  }

  const paramsString = params.join(',');

  return `${
    process.env.IMG_OPTIMISATION_HOST
  }/cdn-cgi/image/${paramsString}/${trimStartSlash(src)}`;
}
