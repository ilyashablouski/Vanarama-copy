import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import {
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_iconList as IconListType,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image as ImageType,
} from '../../../../generated/EligibilityCheckerPageData';
import Skeleton from '../../Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const IconList = dynamic(() => import('core/organisms/icon-list'), {
  loading: () => <Skeleton count={3} />,
});
// @ts-ignore
const IconListItem = dynamic(() =>
  import('core/organisms/icon-list').then(mod => mod.IconListItem),
);

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
          {iconList.map((el, index) => (
            <IconListItem iconColor="orange" key={index.toString()}>
              {el?.text}
            </IconListItem>
          ))}
        </IconList>
      )}
    </div>
    <ImageV2
      quality={60}
      width={image?.file?.details.image.width}
      height={image?.file?.details.image.height}
      src={image?.file?.url || ''}
      alt={image?.title || ''}
    />
  </div>
);

export default WhyEligibilityChecker;
