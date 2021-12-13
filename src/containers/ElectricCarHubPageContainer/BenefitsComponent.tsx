import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';
import ShieldFreeInsurance from 'core/assets/icons/ShieldFreeInsurance';

const BenefitsComponent = () => {
  return (
    <div className="electric-benefits">
      <div className="benefit-wrapper">
        <Icon icon={<FreeHomeCharger />} />
        <div>
          <Text tag="p" size="large" color="black">
            <Text color="success" size="large">
              FREE{' '}
            </Text>
            Electric Home Charger
          </Text>
          <Text tag="p" color="black" className="-mt-200">
            Worth £1049 + FREE Installation On Electric Vehicles
          </Text>
        </div>
      </div>
      <div className="benefit-wrapper">
        <Icon icon={<ShieldFreeInsurance />} />
        <div>
          <Text tag="p" size="large" color="black">
            1 Year’s{' '}
            <Text color="success" size="large">
              FREE{' '}
            </Text>
            Insurance
          </Text>
          <Text tag="p" color="black" className="-mt-200">
            Included With Every Electric Hot Offer Car
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BenefitsComponent;
