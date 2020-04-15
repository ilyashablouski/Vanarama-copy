import Container from '@vanarama/uibook/lib/components/container/Container';
import Section from '@vanarama/uibook/lib/components/container/Section';

/**
 * This is a helper component for the common layout container used on most pages.
 * We may find that some pages need a fluid layout so there could be multiple layouts in the future.
 */
const MainLayout: React.FC = ({ children }) => (
  <Section>
    <Container>{children}</Container>
  </Section>
);

export default MainLayout;
