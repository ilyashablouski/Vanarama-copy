import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import RouterLink from '../RouterLink/RouterLink';

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
