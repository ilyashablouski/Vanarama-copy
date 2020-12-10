import dynamic from 'next/dynamic';
import { FC } from 'react';
import {
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_iconList as IconListType,
  EligibilityCheckerPageData_eligibilityCheckerLandingPage_sections_featured2_image as ImageType,
} from '../../../../generated/EligibilityCheckerPageData';
import Skeleton from '../../Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const IconList = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/icon-list'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
// @ts-ignore
const IconListItem = dynamic(() =>
  import('@vanarama/uibook/lib/components/organisms/icon-list').then(
    mod => mod.IconListItem,
  ),
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
