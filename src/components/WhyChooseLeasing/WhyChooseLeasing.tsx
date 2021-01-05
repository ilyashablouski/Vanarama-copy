import React from 'react';
import dynamic from 'next/dynamic';
import Icon from 'core/atoms/icon';
import Skeleton from '../Skeleton';
import IconMap from '../../utils/cardIconMap';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IWhyChooseLeasingProps {
  warranty: string;
}

const WhyChooseLeasing: React.FC<IWhyChooseLeasingProps> = ({ warranty }) => {
  const renderGridItem = (title: string, icon: JSX.Element) => (
    <div className="pdp--feature-grid--item">
      {icon}
      <div>
        <Heading tag="div" size="regular" color="black">
          {title}
        </Heading>
      </div>
    </div>
  );

  const warrantyRender = () => {
    switch (warranty) {
      case 'N/A':
        return renderGridItem(
          'Full Manufacturer Warranty',
          <Icon
            name="WarrentyRossetaFull"
            icon={IconMap.get('WarrantyRosetteFull')}
            color="orange"
            size="xlarge"
          />,
        );
      case '2':
      case '3':
      case '4':
      case '5':
        return renderGridItem(
          `Full ${warranty} Year Warranty`,
          <Icon
            name={`WarrantyRosette${warranty}`}
            icon={IconMap.get(`WarrantyRosette${warranty}`)}
            color="orange"
            size="xlarge"
          />,
        );
      default:
        return null;
    }
  };

  return (
    <div className="pdp--feature-grid -col2">
      <Heading tag="h2" color="black" size="lead">
        Why Choose Leasing?
      </Heading>
      {renderGridItem(
        'Brand New Vehicles',
        <Icon
          name="BrandNewCar"
          icon={IconMap.get('BrandNewCar')}
          color="orange"
          size="xlarge"
        />,
      )}
      {warrantyRender()}
      {renderGridItem(
        'Fixed Monthly Payments',
        <Icon
          name="FixedMonthlyPayments"
          icon={IconMap.get('FixedMonthlyPayments')}
          color="orange"
          size="xlarge"
        />,
      )}
      {renderGridItem(
        'No MOT Costs',
        <Icon
          name="NoMOT"
          icon={IconMap.get('NoMOT')}
          color="orange"
          size="xlarge"
        />,
      )}
    </div>
  );
};

export default WhyChooseLeasing;
