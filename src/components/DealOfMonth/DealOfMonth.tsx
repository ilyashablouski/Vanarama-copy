import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';
import { ProductCardData_productCarousel_keyInformation as IKeyInfo } from '../../../generated/ProductCardData';
import { features } from '../ProductCarousel/helpers';

const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

const CardIcons = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards/CardIcons'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Rating = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/rating'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Price = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/price'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Flame = dynamic(() => import('@vanarama/uibook/lib/assets/icons/Flame'), {
  ssr: false,
});
const CarSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/CarSharp'),
  {
    ssr: false,
  },
);
const ArrowForwardSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ArrowForwardSharp'),
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
  keyInfo: (IKeyInfo | null)[];
  capId: string;
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
  keyInfo,
  capId,
  price,
  viewOfferClick,
  imageSrc,
  isPersonal,
  flagText = 'DEAL OF THE MONTH',
  link,
}) => (
  <>
    <div>
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        header={{
          accentIcon: <Icon icon={<Flame />} color="white" />,
          accentText: 'Hot Deal',
          text: flagText,
        }}
        imageSrc={imageSrc}
      />
    </div>
    <div className="-col">
      <div>
        <Heading size="xlarge" color="black">
          {vehicle}
        </Heading>
        <Text tag="p" size="lead" color="darker">
          {specification}
        </Text>
        {rating && <Rating score={rating} color="orange" />}
      </div>
      {!!keyInfo?.length && (
        <CardIcons icons={features(keyInfo || [], capId || '', Icon)} />
      )}
      <div className="-flex-h">
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
      <div className="card-footer">
        <Button
          label="Compare"
          fill="clear"
          iconPosition="before"
          icon={<CarSharp />}
        />
      </div>
    </div>
  </>
);

export default DealOfMonth;
