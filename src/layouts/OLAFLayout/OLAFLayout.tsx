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
import { useGetOrder, useCarDerivativesData } from '../../gql/order';
import { createOlafDetails } from './helpers';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

export const GET_ORDER_INFORMATION = gql`
  query GetOrder {
    order @client {
      uuid
    }
    derivative @client {
      id
    }
  }
`;

const OLAFLayout: React.FC = ({ children }) => {
  const isMobile = useMobileViewport();
  const [asideOpen, setAsideOpen] = useState(false);
  const showAside = !isMobile || asideOpen;

  let order = { uuid: '' };
  let derivative = { id: '' };

  // get order information from apollo client cache
  const { data } = useQuery(GET_ORDER_INFORMATION);
  if (data) {
    order = data.order;
    derivative = data.derivative;
  }

  // get Order data
  const dataOrder = useGetOrder(order.uuid);

  // get Derivative data for order car
  const dataDerivative = useCarDerivativesData(
    derivative.id,
    VehicleTypeEnum.CAR,
  );

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
        {showAside && dataOrder?.data && dataDerivative?.data && (
          <div className="olaf-aside">
            <OlafCard
              header={{ text: '14-21 Days Delivery' }}
              olafDetails={createOlafDetails(
                dataOrder.data.orderByUuid.leasType,
                dataOrder.data.orderByUuid.lineItems[0].vehicleProduct,
                dataDerivative.data.derivative,
              )}
              imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/KiaeNiro0219_j7on5z.jpg"
              title={{
                title: `${dataDerivative.data.derivative?.manufacturerName ||
                  ''} ${dataDerivative.data.derivative?.modelName || ''}`,
                description: dataDerivative.data.derivative?.name || '',
                score: 4.5,
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
