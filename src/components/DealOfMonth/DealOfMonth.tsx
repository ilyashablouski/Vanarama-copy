import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={3} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Rating = dynamic(() => import('core/atoms/rating'), {
  loading: () => <Skeleton count={1} />,
});
const Price = dynamic(() => import('core/atoms/price'), {
  loading: () => <Skeleton count={1} />,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});
const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    ssr: false,
  },
);

interface IDealOfMonthProps {
  vehicle: string;
  specification: string;
  rating?: number;
  price: number;
  imageSrc: string;
  flagText?: string;
  isPersonal: boolean;
  viewOfferClick: () => void;
  link: {
    href: string;
    url: string;
  };
}

const DealOfMonth: React.FC<IDealOfMonthProps> = ({
  vehicle,
  specification,
  rating,
  price,
  viewOfferClick,
  imageSrc,
  isPersonal,
  flagText = 'DEAL OF THE MONTH',
  link,
}) => (
  <>
    <Card
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      header={{
        accentIcon: <Icon icon={<Flame />} color="white" />,
        accentText: 'Hot Deal',
        text: flagText,
      }}
      imageSrc={imageSrc}
    />
    <div>
      <Heading size="xlarge" color="black">
        {vehicle}
      </Heading>
      <Text tag="p" size="lead" color="darker">
        {specification}
      </Text>
      {rating && <Rating score={rating} color="orange" />}
      <br />
      <Price size="xlarge" price={price} />
      <Text tag="p" size="small" color="dark">
        {isPersonal ? 'Per Month Inc VAT' : 'Per Month Excluding VAT'}
      </Text>
      <RouterLink
        link={{
          href: link.url,
          label: 'View Offer',
        }}
        onClick={viewOfferClick}
        classNames={{ color: 'teal', solid: true, size: 'regular' }}
        className="button"
        dataTestId="deal-of-month__view-offer"
        withoutDefaultClassName
      >
        <div className="button--inner">
          View Offer
          <Icon color="white" icon={<ArrowForwardSharp />} />
        </div>
      </RouterLink>
    </div>
  </>
);

export default DealOfMonth;
