/* eslint-disable @typescript-eslint/camelcase */
import ChevronDownSharp from 'core/assets/icons/ChevronDownSharp';
import ChevronUpSharp from 'core/assets/icons/ChevronUpSharp';
import Button from 'core/atoms/button';
import OlafCard from 'core/molecules/cards/OlafCard/OlafCard';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import BusinessProgressIndicator from '../../components/BusinessProgressIndicator/BusinessProgressIndicator';
import ConsumerProgressIndicator from '../../components/ConsumerProgressIndicator/ConsumerProgressIndicator';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { useCarDerivativeData } from '../../gql/order';
import { createOlafDetails, useFunderTerm, OlafContext } from './helpers';
import {
  GetDerivative_derivative,
  GetDerivative_vehicleImages as VehicleImages,
} from '../../../generated/GetDerivative';
import useGetOrder from '../../hooks/useGetOrder';
import { OrderInputObject } from '../../../generated/globalTypes';

interface IProps {
  setDetailsData?: React.Dispatch<
    React.SetStateAction<OrderInputObject | null>
  >;
  setDerivativeData?: React.Dispatch<
    React.SetStateAction<GetDerivative_derivative | null>
  >;
  children?: ReactNode;
}

const OLAFLayout: React.FC<IProps> = ({
  children,
  setDetailsData,
  setDerivativeData,
}) => {
  const order = useGetOrder();

  const isMobile = useMobileViewport();
  const [asideOpen, setAsideOpen] = useState(false);
  const showAside = !isMobile || asideOpen;

  const vehicleProduct = order?.lineItems?.[0]?.vehicleProduct;

  const [getDerivativeData, derivativeData] = useCarDerivativeData(
    vehicleProduct?.derivativeCapId || '',
    vehicleProduct?.vehicleType,
  );
  const derivative = derivativeData && derivativeData.data?.derivative;
  const mainImage =
    derivativeData &&
    derivativeData.data?.vehicleImages &&
    (derivativeData.data?.vehicleImages as VehicleImages[])[0]?.mainImageUrl;

  useEffect(() => {
    if (vehicleProduct) {
      getDerivativeData();
    }
  }, [vehicleProduct, getDerivativeData]);

  useEffect(() => {
    if (order && derivativeData.data && setDetailsData && setDerivativeData) {
      setDetailsData(order);
      setDerivativeData(derivativeData.data.derivative);
    }
  }, [order, setDerivativeData, setDetailsData, derivativeData]);

  const term = useFunderTerm(order);

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
        {showAside && order && derivative && (
          <div className="olaf-aside">
            <OlafCard
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              header={{ text: '14-21 Days Delivery' }}
              olafDetails={createOlafDetails(
                order.leaseType,
                vehicleProduct!,
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

type QueryParams = {
  isSoleTraderJourney: boolean;
};

function ProgressSection() {
  const { pathname, query } = useRouter();
  const { isSoleTraderJourney } = (query as unknown) as QueryParams;
  const hideProgress = pathname === '/olaf/thank-you/[orderId]';
  if (hideProgress) {
    return null;
  }
  const soleTraderPathMatchResult = pathname.match(
    /^\/b2b\/olaf\/sole-trader\/.+/,
  );
  const isSoleTrader =
    (soleTraderPathMatchResult || []).length > 0 || isSoleTraderJourney;
  const isB2BJourney = pathname.match(/^\/b2b\/.+/);

  return (
    <div className="row:progress">
      {isB2BJourney ? (
        <BusinessProgressIndicator isSoleTraderJourney={isSoleTrader} />
      ) : (
        <ConsumerProgressIndicator />
      )}
    </div>
  );
}

export default OLAFLayout;
