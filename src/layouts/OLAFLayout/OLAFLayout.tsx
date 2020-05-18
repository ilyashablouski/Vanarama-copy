import Container from '@vanarama/uibook/lib/components/container/Container';
import Section from '@vanarama/uibook/lib/components/container/Section';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import OlafAside from '@vanarama/uibook/lib/components/organisms/olaf-aside/OlafAside';
import OLAFProgressIndicator from '../../components/OLAFProgressIndicator/OLAFProgressIndicator';
import MainLayout from '../MainLayout/MainLayout';
import OlafAsideToggle from '../../components/OlafAsideToggle/OlafAsideToggle';

interface IProps {
  /**
   * Whether to hide the progress indicator at the top of the page
   */
  hideProgress?: boolean;
}

const OlafAsideComponent = () => (
  <OlafAside
    price={209}
    imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/KiaeNiro0219_j7on5z.jpg"
    rating={4.5}
    subtitle="1.4T ecoTEC Elite Nav 5dr"
    title="FIAT 500 Hatchback"
    initailRental="£815.70 (inc VAT)"
    contractLength="60 months"
    annualMileage="6000 miles"
    fuel="Petrol"
    transmission="Manual"
    color="Solid - Polar white"
    trim="Cloth - Black"
  />
);

const OLAFLayout: React.FC<IProps> = ({ children, hideProgress }) => (
  <MainLayout>
    {!hideProgress && (
      <Container>
        <OLAFProgressIndicator />
        <OlafAsideToggle>
          <OlafAsideComponent />
        </OlafAsideToggle>
      </Container>
    )}
    <Section>
      <Container>
        <Grid lg="6" md="2" sm="2">
          <Column md="1" sm="row" lg="1-3">
            {children}
          </Column>
          <Column md="1" sm="row" lg="4-6">
            <div className="-vp-min:small">
              <OlafAsideComponent />
            </div>
          </Column>
        </Grid>
      </Container>
    </Section>
    {/* TODO: Remove this once the section styles have been updated */}
    <style jsx global>{`
      .section {
        background-color: white !important;
      }
    `}</style>
  </MainLayout>
);

export default OLAFLayout;
