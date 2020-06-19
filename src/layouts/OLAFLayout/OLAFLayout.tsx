import ChevronDownSharp from '@vanarama/uibook/lib/assets/icons/ChevronDownSharp';
import ChevronUpSharp from '@vanarama/uibook/lib/assets/icons/ChevronUpSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import OlafCard from '@vanarama/uibook/lib/components/molecules/cards/OlafCard/OlafCard';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BusinessProgressIndicator from '../../components/BusinessProgressIndicator/BusinessProgressIndicator';
import ConsumerProgressIndicator from '../../components/ConsumerProgressIndicator/ConsumerProgressIndicator';
import { useMobileViewport } from '../../hooks/useMediaQuery';

const OLAFLayout: React.FC = ({ children }) => {
  const isMobile = useMobileViewport();
  const [asideOpen, setAsideOpen] = useState(false);
  const showAside = !isMobile || asideOpen;
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
        {showAside && (
          <div className="olaf-aside">
            <OlafCard
              header={{ text: '14-21 Days Delivery' }}
              olafDetails={{
                annualMileage: '6000 miles',
                color: 'Solid - Polar white',
                contractLength: '60 months',
                fuel: 'Petrol',
                initailRental: '£815.70 (inc VAT)',
                price: 209,
                transmission: 'Manual',
                trim: 'Cloth - Black',
                priceDescription: 'Per Month ex. VAT',
                description:
                  '59 month contact (inc VAT). Paid by Direct Debit. First due ≈ 10 days after delivery.',
                annualMileageBooster: 'Extra 600 miles FREE',
                damageCover: 'Included',
                maintenance: 'No',
              }}
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
                title: 'FIAT 500 Hatchback',
                description: '1.4T ecoTEC Elite Nav 5dr',
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
