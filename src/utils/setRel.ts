import { ILink } from 'core/interfaces/link';

function checker(value: string) {
  const allowed = ['vanarama.com', 'vanarama-nonprod.com'];

  for (let index = 0; index < allowed.length; index += 1) {
    if (value.indexOf(allowed[index]) > -1) {
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
