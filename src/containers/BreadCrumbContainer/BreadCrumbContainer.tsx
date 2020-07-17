import { useRouter } from 'next/router';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';

export function buildCrumbs(path: string) {
  return path
    .slice(1)
    .split('/')
    .map(segment => {
      return {
        label: segment
          .split('-')
          .join(' ')
          .replace(/\b[a-z]/g, match => match.toUpperCase()),
        href: segment,
      };
    });
}

const BreadCrumbContainer: React.FC = () => {
  const router = useRouter();
  const crumbs = buildCrumbs(router.asPath);
  return <BreadCrumb items={crumbs} />;
};

export default BreadCrumbContainer;
