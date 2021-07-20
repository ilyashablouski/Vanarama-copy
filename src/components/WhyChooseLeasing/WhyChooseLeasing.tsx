import React from 'react';
import dynamic from 'next/dynamic';
import Icon from 'core/atoms/icon';
import Skeleton from '../Skeleton';
import IconMap from '../../utils/cardIconMap';
import { GetVehicleDetails_vehicleDetails_warrantyDetails } from '../../../generated/GetVehicleDetails';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IWhyChooseLeasingProps {
  warrantyDetails:
    | GetVehicleDetails_vehicleDetails_warrantyDetails
    | null
    | undefined;
}

const WhyChooseLeasing: React.FC<IWhyChooseLeasingProps> = ({
  warrantyDetails,
}) => {
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
    switch (warrantyDetails?.years) {
      case null:
        return renderGridItem(
          'Full Manufacturer Warranty',
          <Icon
            name="WarrentyRossetaFull"
            icon={IconMap.get('WarrantyRosetteFull')}
            color="orange"
            size="xlarge"
          />,
        );
      case 2:
      case 3:
      case 4:
      case 5:
        return renderGridItem(
          `Full ${warrantyDetails?.years} Year Warranty`,
          <Icon
            name={`WarrantyRosette${warrantyDetails?.years}`}
            icon={IconMap.get(`WarrantyRosette${warrantyDetails?.years}`)}
            color="orange"
            size="xlarge"
          />,
        );
      default:
        return null;
    }
  };

  return (
    <section className="pdp--feature-grid -col2">
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
        'No MOT Costs For 3 Years',
        <Icon
          name="NoMOT"
          icon={IconMap.get('NoMOT')}
          color="orange"
          size="xlarge"
        />,
      )}
    </section>
  );
};

export default WhyChooseLeasing;
