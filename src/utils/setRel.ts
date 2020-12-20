import { ILink } from 'core/interfaces/link';

function checker(value: string) {
  const allowed = ['vanarama.com', 'vanarama-nonprod.com'];

  for (let i = 0; i < allowed.length; i += 1) {
    if (value.indexOf(allowed[i]) > -1) {
      return true;
    }
  }
  return false;
}

const setRel = (link: ILink) => {
  return link.href.match(/^(https?:)?\/\//) && !checker(link.href)
    ? 'noopener noreferrer'
    : undefined;
};

export default setRel;
