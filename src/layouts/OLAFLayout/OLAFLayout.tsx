import OlafAside from '@vanarama/uibook/lib/components/organisms/olaf-aside/OlafAside';
import OLAFProgressIndicator from '../../components/OLAFProgressIndicator/OLAFProgressIndicator';
import OlafAsideToggle from '../../components/OlafAsideToggle/OlafAsideToggle';

interface IProps {
  /**
   * Whether to hide the progress indicator at the top of the page
   */
  hideProgress?: boolean;
}

const OLAFLayout: React.FC<IProps> = ({ children, hideProgress }) => (
  <>
    {!hideProgress && (
      <div className="row:progress">
        <OLAFProgressIndicator />
        <OlafAsideToggle>
          <OLAFAsideWrapper />
        </OlafAsideToggle>
      </div>
    )}
    <div className="row:olaf">
      {children}
      <OLAFAsideWrapper className="-vp-min:small" />
    </div>
  </>
);

function OLAFAsideWrapper({ className }: { className?: string }) {
  return (
    <OlafAside
      annualMileage="6000 miles"
      className={className}
      color="Solid - Polar white"
      contractLength="60 months"
      fuel="Petrol"
      imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/KiaeNiro0219_j7on5z.jpg"
      initailRental="£815.70 (inc VAT)"
      price={209}
      rating={4.5}
      subtitle="1.4T ecoTEC Elite Nav 5dr"
      title="FIAT 500 Hatchback"
      transmission="Manual"
      trim="Cloth - Black"
    />
  );
}

export default OLAFLayout;
