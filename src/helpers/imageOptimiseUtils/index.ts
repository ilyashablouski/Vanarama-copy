import { ICloudflareOptimisation } from './interfaces';

const DEFAULT_OPTIMISATION: ICloudflareOptimisation = {
  fit: 'scale-down',
  height: 1920,
  width: 1920,
  quality: 75,
  sharpness: 0,
  metadata: 'none',
  format: 'auto',
};

function setProtocol(url: string, protocol: string) {
  if (url.search(/^http[s]?:\/\//) === -1) {
    return `${protocol}:${url}`;
  }
  return url;
}

// Optimise image through Cloudflare.
const optimiseImage = (
  host: string,
  src: string,
  confuguration: ICloudflareOptimisation,
): string => {
  const {
    fit,
    height,
    width,
    quality,
    sharpness,
    metadata,
    format,
  } = confuguration;

  // Extract protocol from host.
  const protocol = host.split(':')[0];

  // Add protocol to url if not there.
  const imgSrc = setProtocol(src, protocol);

  // Formatted url for optimisation.
  return `${host.replace(
    /\/$/,
    '',
  )}/cdn-cgi/image/fit=${fit},height=${height},width=${width},quality=${quality},sharpness=${sharpness},metadata=${metadata},format=${format}/${imgSrc}`;
};

export { DEFAULT_OPTIMISATION, optimiseImage };
