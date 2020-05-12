import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Van News', href: '/' },
];

const BreadCrumbContainer: React.FC = () => <BreadCrumb items={crumbs} />;

export default BreadCrumbContainer;
