import Router from 'next/router';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';

interface IDealOfMonthProps {
  vehicle: string;
  specification: string;
  rating?: number;
  price: number;
  imageSrc: string;
  flagText?: string;
  capIdPath: string;
}

const DealOfMonth: React.FC<IDealOfMonthProps> = ({
  vehicle,
  specification,
  rating,
  price,
  capIdPath,
  imageSrc,
  flagText = 'DEAL OF THE MONTH',
}) => (
  <>
    <Card
      header={{
        accentIcon: <Icon icon={<Flame />} color="white" />,
        accentText: 'Hot Deal',
        text: flagText,
      }}
      imageSrc={imageSrc}
    />
    <div className="-inset -middle -col-500">
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Heading size="xlarge" color="black">
          {vehicle}
        </Heading>
        <Text tag="p" size="lead" color="darker">
          {specification}
        </Text>
        {rating && <Rating score={rating} color="orange" />}
      </div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Price size="xlarge" price={price} />
        <Text tag="p" size="small" color="dark">
          Per Month Excluding VAT
        </Text>
        <br />
        <Button
          color="teal"
          label="Veiw Offer"
          icon={<ArrowForwardSharp />}
          iconPosition="after"
          iconColor="white"
          onClick={() => Router.push(capIdPath)}
        />
      </div>
    </div>
  </>
);

export default DealOfMonth;
