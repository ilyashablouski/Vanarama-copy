import Text from '@vanarama/uibook/lib/components/atoms/text';

const HeroTitle: React.FC<{}> = ({ children }) => {
  return (
    <Text size="large" color="white">
      {children}
    </Text>
  );
};

export default HeroTitle;
