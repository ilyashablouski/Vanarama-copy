import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Redundancy from '@vanarama/uibook/lib/assets/icons/Redundancy';
import RouterLink from '../RouterLink/RouterLink';

const Banner: React.FC = () => {
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
          Redundancy &amp; Life Event Cover
        </Heading>
        <Text className="-pr-100" color="white" size="small">
          If the worst happens, return your vehicle, no charge.
        </Text>
        <RouterLink
          link={{
            href: '',
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
