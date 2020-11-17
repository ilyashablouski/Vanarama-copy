import { ILink } from '@vanarama/uibook/lib/interfaces/link';

const setRel = (link: ILink, hostname: string | undefined) => {
  // eslint-disable-next-line no-param-reassign
  if (!hostname) hostname = process?.env?.HOSTNAME;
  const domain = hostname?.split('//');

  return domain?.length &&
    link.href.match(/^(https?:)?\/\//) &&
    !link.href.includes(domain[1])
    ? 'noopener noreferrer'
    : undefined;
};

export default setRel;
