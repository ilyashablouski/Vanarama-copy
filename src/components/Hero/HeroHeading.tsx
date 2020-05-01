import Heading from '@vanarama/uibook/lib/components/atoms/heading';

const HeroHeading: React.FC<{}> = ({ children }) => {
  return (
    <Heading size="xlarge" color="black">
      {children}
    </Heading>
  );
};

export default HeroHeading;
