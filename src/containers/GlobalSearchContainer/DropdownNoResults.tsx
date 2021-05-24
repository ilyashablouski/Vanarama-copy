import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  searchQuery: string;
}
const DropdownNoResults = ({ searchQuery }: IProps) => {
  return (
    <div className="suggested -only-visible">
      <Text size="large" color="black" tag="p">
        0 results for your search ‘{searchQuery}’
      </Text>
      <Text size="large" color="black" tag="p" className="-mt-000">
        Please try another search.
      </Text>
    </div>
  );
};

export default DropdownNoResults;
