import React, { FC } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import Media from 'core/atoms/media';
import Image from 'core/atoms/image/Image';
import Skeleton from '../../../components/Skeleton';
import getTitleTag from '../../../utils/getTitleTag';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HomePageData_homePage_sections_featured1_iconList as IIconList } from '../../../../generated/HomePageData';
import { GenericPageQuery_genericPage_sections as ISectionData } from '../../../../generated/GenericPageQuery';
import { isServerRenderOrAppleDevice } from '../../../utils/deviceType';
import { getFeaturedClassPartial } from '../../../utils/layout';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const RouterLink = dynamic(() =>
  import('../../../components/RouterLink/RouterLink'),
);

const IconList = dynamic(() => import('core/organisms/icon-list'), {
  loading: () => <Skeleton count={3} />,
});

// @ts-ignore
const IconListItem = dynamic(() =>
  import('core/organisms/icon-list').then(mod => mod.IconListItem),
);

interface IDerangedFeatureSection {
  featureNumber: string;
  sectionData: ISectionData;
}

const DerangedFeatureSection: FC<IDerangedFeatureSection> = ({
  featureNumber,
  sectionData,
}) => {
  const feature = getFeaturedClassPartial(
    sectionData[`featured${featureNumber}` as keyof ISectionData],
  );

  const titleTag = getTitleTag(
    getSectionsData([`featured${featureNumber}`, 'titleTag'], sectionData) ||
      'p',
  ) as keyof JSX.IntrinsicElements;

  return (
    <section className={`row:${feature}`}>
      <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
        <div className="-inset -middle -col-400">
          <Heading size="large" color="black" tag={titleTag}>
            {getSectionsData(
              [`featured${featureNumber}`, 'title'],
              sectionData,
            ) || ''}
          </Heading>
          <div className="markdown">
            <ReactMarkdown
              allowDangerousHtml
              source={
                getSectionsData(
                  [`featured${featureNumber}`, 'body'],
                  sectionData,
                ) || ''
              }
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return <RouterLink link={{ href, label: children }} />;
                },
              }}
            />
          </div>
          <IconList textColor="orange">
            {(getSectionsData(
              [`featured${featureNumber}`, 'iconList'],
              sectionData,
            ) as IIconList[])?.map((icon: IIconList, index) => (
              <IconListItem iconColor="orange" key={icon?.text || index}>
                {icon?.text}
              </IconListItem>
            ))}
          </IconList>
        </div>
        {getSectionsData([`featured${featureNumber}`, 'video'], sectionData) ? (
          <Media
            src={
              getSectionsData(
                [`featured${featureNumber}`, 'video'],
                sectionData,
              ) || ''
            }
            width="100%"
            height="360px"
          />
        ) : (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              getSectionsData(
                [`featured${featureNumber}`, 'image', 'file', 'url'],
                sectionData,
              ) ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        )}
      </LazyLoadComponent>
    </section>
  );
};

export default React.memo(DerangedFeatureSection);
