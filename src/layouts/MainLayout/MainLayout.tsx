import Container from '@vanarama/uibook/packages/ui-components/src/components/container/Container';
import Section from '@vanarama/uibook/packages/ui-components/src/components/container/Section';

const MainLayout: React.FC = ({ children }) => (
  <Section>
    <Container>{children}</Container>
  </Section>
);

export default MainLayout;
