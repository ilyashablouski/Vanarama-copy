import React, { useState } from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import GoldrushForm from '../../components/GoldrushForm';
import { GoldrushFormContainerProps } from './interfaces';

const GoldrushFormContainer: React.FC<GoldrushFormContainerProps> = ({
  heading,
  isPostcodeVisible,
}) => {
  const [isGratitudeVisible, toggleGratitude] = useState(false);
  return isGratitudeVisible ? (
    <div>
      <Heading size="large" color="black">
        Thank You
      </Heading>
      <Text size="regular" color="darker">
        Et culpa aliquip mollit fugiat sunt irure sunt amet ea pariatur qui exercitation fugiat reprehenderit culpa ipsum dolore incididunt dolor cillum amet officia nulla pariatur consectetur aute et irure et
      </Text>
    </div>
  ) : (
    <GoldrushForm
      heading={heading}
      isPostcodeVisible={isPostcodeVisible}
      onSubmit={() => toggleGratitude(true)}
    />
  );
};

export default GoldrushFormContainer;
