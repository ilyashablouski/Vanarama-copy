import { useRouter } from 'next/router';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';

const BreadCrumbContainer: React.FC = () => {
  const router = useRouter();
  const crumbs = router.asPath.split('/').map(path => {
    return {
      label: path
        .split('-')
        .join(' ')
        .replace(/\b[a-z]/g, match => match.toUpperCase()),
      href: path,
    };
  });
  return <BreadCrumb items={crumbs} />;
};

export default BreadCrumbContainer;
