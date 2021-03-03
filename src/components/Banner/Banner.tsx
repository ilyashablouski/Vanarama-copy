import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const Redundancy = dynamic(() => import('core/assets/icons/Redundancy'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const Icon = dynamic(() => import('core/atoms/icon/'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IBanner {
  vans?: boolean;
}

const Banner: React.FC<IBanner> = ({ vans }) => {
  return (
    <div className="pdp--banner">
      <Icon
        style={{ height: '90%' }}
        size="large"
        className="-inherit md hydrated"
        icon={<Redundancy />}
      />
      <div>
        <Heading color="white" size="large">
          {vans
            ? 'Free Loss Of Earnings & Life Event Cover'
            : 'Free Redundancy & Life Event Cover'}
        </Heading>
        <Text className="-pr-100" color="white" size="small">
          If the worst happens, return your vehicle, no charge.
        </Text>
        <RouterLink
          link={{
            href: '/redundancy-and-life-event-cover.html',
            label: '',
          }}
          classNames={{
            color: 'white',
            size: 'small',
          }}
        >
          <b>Find Out More</b>
        </RouterLink>
      </div>
    </div>
  );
};

export default Banner;
