import Container from '@vanarama/uibook/lib/components/container/Container';
import Section from '@vanarama/uibook/lib/components/container/Section';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import OLAFAside from '../../components/OLAFAside/OLAFAside';
import OLAFProgressIndicator from '../../components/OLAFProgressIndicator/OLAFProgressIndicator';
import MainLayout from '../MainLayout/MainLayout';

interface IProps {
  /**
   * Whether to hide the progress indicator at the top of the page
   */
  hideProgress?: boolean;
}

const OLAFLayout: React.FC<IProps> = ({ children, hideProgress }) => (
  <MainLayout>
    {!hideProgress && (
      <Container>
        <OLAFProgressIndicator />
      </Container>
    )}
    <Section>
      <Container>
        <Grid lg="6" md="2" sm="2">
          <Column md="2" sm="2" lg="1-3">
            {children}
          </Column>
          <Column md="2" sm="2" lg="4-6">
            <OLAFAside />
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
