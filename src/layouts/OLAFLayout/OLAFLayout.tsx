import ChevronDownSharp from '@vanarama/uibook/lib/assets/icons/ChevronDownSharp';
import ChevronUpSharp from '@vanarama/uibook/lib/assets/icons/ChevronUpSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import OlafCard from '@vanarama/uibook/lib/components/molecules/cards/OlafCard/OlafCard';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import BusinessProgressIndicator from '../../components/BusinessProgressIndicator/BusinessProgressIndicator';
import ConsumerProgressIndicator from '../../components/ConsumerProgressIndicator/ConsumerProgressIndicator';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { useOlafData } from '../../gql/order';
import { createOlafDetails } from './helpers';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { GetOrderInformation } from '../../../generated/GetOrderInformation';
import { OLAFQueryParams } from '../../utils/url';

export const GET_ORDER_INFORMATION = gql`
  query GetOrderInformation {
    selectedOrderUuid @client
    selectedDerivativeId @client
    selectedVehicleType @client
  }
`;

const OLAFLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { derivativeId, orderId, type } = router.query as OLAFQueryParams;

  const isMobile = useMobileViewport();
  const [asideOpen, setAsideOpen] = useState(false);
  const showAside = !isMobile || asideOpen;

  let selectedOrderUuid = orderId || '';
  let selectedDerivativeId = derivativeId || '';
  let selectedVehicleType = type || '';

  // get order information from apollo client cache
  const { data } = useQuery<GetOrderInformation>(GET_ORDER_INFORMATION);
  if (
    data?.selectedOrderUuid &&
    data?.selectedDerivativeId &&
    data?.selectedVehicleType
  ) {
    selectedOrderUuid = data.selectedOrderUuid;
    selectedDerivativeId = data.selectedDerivativeId;
    selectedVehicleType = data.selectedVehicleType;
  }

  // get Order data and Derivative data for order car
  const olafData = useOlafData(
    selectedOrderUuid,
    selectedDerivativeId,
    selectedVehicleType.toUpperCase() as VehicleTypeEnum,
  );
  const orderByUuid = olafData && olafData.data?.orderByUuid;
  const derivative = olafData && olafData.data?.derivative;

  return (
    <>
      <ProgressSection />
      {isMobile && (
        <Button
          className="-fullwidth -mv-400"
          dataTestId="olaf-aside-toggle"
          icon={asideOpen ? <ChevronUpSharp /> : <ChevronDownSharp />}
          iconColor="white"
          iconPosition="after"
          label={asideOpen ? 'Hide Your Order' : 'View Your Order'}
          onClick={() => setAsideOpen(prev => !prev)}
        />
      )}
      <div className="row:olaf">
        {children}
        {showAside && orderByUuid && derivative && (
          <div className="olaf-aside">
            <OlafCard
              header={{ text: '14-21 Days Delivery' }}
              olafDetails={createOlafDetails(
                orderByUuid.leaseType,
                orderByUuid.lineItems[0].vehicleProduct!,
                derivative,
              )}
              initialRentalDataTestId="about_intial-rental-testID"
              controlLengthDataTestId="about_control-length-testID"
              annualMileageDataTestId="about_annual-mileage-testID"
              annualMileageBoosterDataTestId="about_annual-milage-booster-testID"
              damageCoverDataTestId="about_damage-cover-testID"
              maintenanceDataTestId="about_maintenance-testID"
              fuelDataTestId="about_fuel-testID"
              transmissionDataTestId="about_transmission-testID"
              colorDataTestId="about_color-testID"
              trimDataTestId="about_trim-testID"
              descriptionDataTestId="about_description-testID"
              imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/KiaeNiro0219_j7on5z.jpg"
              title={{
                title: `${derivative?.manufacturerName ||
                  ''} ${derivative?.modelName || ''}`,
                description: derivative?.name || '',
                score: 4.5,
                dataTestId: 'olaf_about_title_derivative',
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

function ProgressSection() {
  const { pathname } = useRouter();
  const hideProgress = pathname === '/olaf/thank-you';
  if (hideProgress) {
    return null;
  }

  const isB2BJourney = pathname.match(/^\/b2b\/.+/);
  return (
    <div className="row:progress">
      {isB2BJourney ? (
        <BusinessProgressIndicator />
      ) : (
        <ConsumerProgressIndicator />
      )}
    </div>
  );
}

export default OLAFLayout;
