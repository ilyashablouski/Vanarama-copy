import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import {
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_iconList as IconListType,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image as ImageType,
} from '../../../../generated/EligibilityCheckerPageData';

interface IWhyEligibilityChecker {
  body: string | null;
  title: string | null;
  image: ImageType | null;
  iconList: (IconListType | null)[] | null;
}

const WhyEligibilityChecker: FC<IWhyEligibilityChecker> = ({
  body,
  title,
  image,
  iconList,
}) => (
  <div className="row:featured-right">
    <div>
      <Heading size="large" color="black">
        {title}
      </Heading>
      <Text tag="p" size="regular" color="darker">
        {body}
      </Text>
      {iconList?.length && (
        <IconList>
          {iconList.map((el, indx) => (
            <IconListItem iconColor="orange" key={indx.toString()}>
              {el?.text}
            </IconListItem>
          ))}
        </IconList>
      )}
    </div>
    <Image
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      width="900"
      height="500"
      src={image?.file?.url || ''}
      alt={image?.title || ''}
    />
  </div>
);

export default WhyEligibilityChecker;
