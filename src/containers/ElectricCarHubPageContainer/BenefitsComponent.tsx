import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text';
import ShieldFreeInsurance from 'core/assets/icons/ShieldFreeInsurance';

interface IBenefitsComponent {
  dataUiTestId?: string;
}

const BenefitsComponent = ({ dataUiTestId }: IBenefitsComponent) => {
  return (
    <section className="row:bg-white">
      <div className="electric-benefits">
        <div className="benefit-wrapper">
          <Icon icon={<FreeHomeCharger autoSize />} />
          <div>
            <Text
              tag="p"
              size="large"
              color="black"
              dataUiTestId={
                dataUiTestId
                  ? `${dataUiTestId}_electric-home-charger-title`
                  : undefined
              }
            >
              <Text color="success" size="large">
                FREE{' '}
              </Text>
              Electric Home Charger
            </Text>
            <Text
              tag="p"
              color="black"
              className="-mt-200"
              dataUiTestId={
                dataUiTestId
                  ? `${dataUiTestId}_electric-home-charger-description`
                  : undefined
              }
            >
              Worth £1049 + FREE Installation On Electric Vehicles
            </Text>
          </div>
        </div>
        <div className="benefit-wrapper">
          <Icon icon={<ShieldFreeInsurance />} />
          <div>
            <Text
              tag="p"
              size="large"
              color="black"
              dataUiTestId={
                dataUiTestId
                  ? `${dataUiTestId}_free-insurance-title`
                  : undefined
              }
            >
              1 Year’s{' '}
              <Text color="orange" size="large">
                FREE{' '}
              </Text>
              Insurance
            </Text>
            <Text
              tag="p"
              color="black"
              className="-mt-200"
              dataUiTestId={
                dataUiTestId
                  ? `${dataUiTestId}_free-insurance-description`
                  : undefined
              }
            >
              Included with Electric Car Hot offers
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsComponent;
