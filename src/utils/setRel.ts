import { ILink } from '@vanarama/uibook/lib/interfaces/link';

const setRel = (link: ILink) => {
  const domain = process?.env?.HOSTNAME?.split('//');

  return domain?.length &&
    link.href.match(/^(https?:)?\/\//) &&
    !link.href.includes(domain[1])
    ? 'noopener noreferrer'
    : undefined;
};

export default setRel;
