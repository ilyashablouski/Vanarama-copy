/* eslint-disable @typescript-eslint/camelcase */
import ChevronDownSharp from '@vanarama/uibook/lib/assets/icons/ChevronDownSharp';
import ChevronUpSharp from '@vanarama/uibook/lib/assets/icons/ChevronUpSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import OlafCard from '@vanarama/uibook/lib/components/molecules/cards/OlafCard/OlafCard';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import BusinessProgressIndicator from '../../components/BusinessProgressIndicator/BusinessProgressIndicator';
import ConsumerProgressIndicator from '../../components/ConsumerProgressIndicator/ConsumerProgressIndicator';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { useOlafData, useCarDerivativeData } from '../../gql/order';
import { createOlafDetails, useFunderTerm, OlafContext } from './helpers';
import { OLAFQueryParams } from '../../utils/url';
import {
  GetDerivative_derivative,
  GetDerivative_vehicleImages as VehicleImages,
} from '../../../generated/GetDerivative';
import { GetOlafData_orderByUuid } from '../../../generated/GetOlafData';

interface IProps {
  setDetailsData: React.Dispatch<
    React.SetStateAction<GetOlafData_orderByUuid | null>
  >;
  setDerivativeData: React.Dispatch<
    React.SetStateAction<GetDerivative_derivative | null>
  >;
  children?: ReactNode;
}

const OLAFLayout: React.FC<IProps> = ({
  children,
  setDetailsData,
  setDerivativeData,
}) => {
  const router = useRouter();
  const { orderId } = router.query as OLAFQueryParams;

  const isMobile = useMobileViewport();
  const [asideOpen, setAsideOpen] = useState(false);
  const showAside = !isMobile || asideOpen;

  // get Order data and Derivative data for order car
  const olafData = useOlafData(orderId);
  const orderByUuid = olafData && olafData.data?.orderByUuid;

  const [getDerivativeData, derivativeData] = useCarDerivativeData(
    orderByUuid?.lineItems[0].vehicleProduct?.derivativeCapId || '',
    orderByUuid?.lineItems[0].vehicleProduct?.vehicleType,
  );
  const derivative = derivativeData && derivativeData.data?.derivative;
  const mainImage =
    derivativeData &&
    derivativeData.data?.vehicleImages &&
    (derivativeData.data?.vehicleImages as VehicleImages[])[0]?.mainImageUrl;

  useEffect(() => {
    if (orderByUuid) {
      getDerivativeData();
    }
  }, [orderByUuid, getDerivativeData]);

  useEffect(() => {
    if (
      orderByUuid &&
      derivativeData.data &&
      setDetailsData &&
      setDerivativeData
    ) {
      setDetailsData(orderByUuid);
      setDerivativeData(derivativeData.data.derivative);
    }
  }, [orderByUuid, setDerivativeData, setDetailsData, derivativeData]);

  const term = useFunderTerm(olafData.data?.orderByUuid);

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
        <OlafContext.Provider value={{ requiredMonths: term }}>
          {children}
        </OlafContext.Provider>
        {showAside && orderByUuid && derivative && (
          <div className="olaf-aside">
            <OlafCard
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
              imageSrc={mainImage || ''}
              title={{
                title: `${derivative?.manufacturer.name || ''} ${derivative
                  ?.model.name || ''}`,
                description: derivative?.name || '',
                score: 4.5,
                dataTestId: 'olaf_about_title_derivative',
                size: 'large',
                ratingSize: 'lead',
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
  const hideProgress = pathname === '/olaf/thank-you/[orderId]';
  if (hideProgress) {
    return null;
  }
  const soleTraderPathMatchResult = pathname.match(
    /^\/b2b\/olaf\/sole-trader\/.+/,
  );
  const isSoleTraderJourney = (soleTraderPathMatchResult || []).length > 0;
  const isB2BJourney = pathname.match(/^\/b2b\/.+/);

  return (
    <div className="row:progress">
      {isB2BJourney ? (
        <BusinessProgressIndicator isSoleTraderJouney={isSoleTraderJourney} />
      ) : (
        <ConsumerProgressIndicator />
      )}
    </div>
  );
}

export default OLAFLayout;
