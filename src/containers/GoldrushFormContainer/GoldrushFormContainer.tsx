import React, { useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import GoldrushForm from '../../components/GoldrushForm';
import { GoldrushFormContainerProps } from './interfaces';

const GoldrushFormContainer: React.FC<GoldrushFormContainerProps> = ({
  isPostcodeVisible,
}) => {
  const [isGratitudeVisible, toggleGratitude] = useState(false);

  return (
    <div className="pdp--sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Heading tag="span" size="small" color="black">
            FACTORY ORDER
          </Heading>
          <Text size="small" color="darker">
            Availability: 12 Weeks (Avg)
          </Text>
        </div>
        <div>
          <Price size="xlarge" />
        </div>
      </div>
      {isGratitudeVisible ? (
        <div>
          <Heading size="large" color="black">
            Thank You
          </Heading>
          <Text size="regular" color="darker">
            Et culpa aliquip mollit fugiat sunt irure sunt amet ea pariatur
            exercitation fugiat reprehenderit culpa ipsum dolore incididunt
            incididunt dolor cillum amet officia nulla pariatur consectetur aute
            aute et irure et
          </Text>
        </div>
      ) : (
        <>
          <GoldrushForm
            heading="Get Your Quote Now"
            isPostcodeVisible={isPostcodeVisible}
            onSubmit={() => toggleGratitude(true)}
          />
          <div className="pdp--sidebar-promise">
            <Text size="regular" color="black" tag="span">
              {
                "Lorem ipsum dolor. We’ll beat any lease quote or we'll give you £100. "
              }
            </Text>
            <Link href="#" color="success" size="small">
              Terms and Conditions apply.
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default GoldrushFormContainer;
