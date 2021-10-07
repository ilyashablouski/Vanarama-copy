import React, { FC } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import SchemaJSON from 'core/atoms/schema-json';

import RouterLink from 'components/RouterLink';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sectionsAsArray as ISections,
  GenericPageQuery_genericPage_sectionsAsArray_jumpMenu_links as ILink,
} from '../../../generated/GenericPageQuery';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { Nullable } from '../../types/common';

import Head from '../../components/Head/Head';
import LeadText from '../../components/LeadText';
import JumpMenu from '../../components/JumpMenu';
import FeaturedSection from '../../components/FeaturedSection';
import { HeroBackground as Hero, HeroHeading } from '../../components/Hero';

interface IProps {
  data: GenericPageQuery;
}

const renderSections = (sections: Nullable<ISections>) =>
  sections?.featured?.map((section, index) => {
    const resultIndex = index + 1;

    const stepsPos = sections?.steps?.[0]?.position;
    const jumpMenuPos = sections?.jumpMenu?.[0]?.position;
    const leadTextPos = sections?.leadText?.[0]?.position;

    return (
      <React.Fragment key={section?.title}>
        {jumpMenuPos === resultIndex && (
          <JumpMenu
            title={sections?.jumpMenu?.[0]?.title}
            links={
              sections?.jumpMenu?.[0]?.links?.filter(
                link => link !== null,
              ) as ILink[]
            }
          />
        )}
        {leadTextPos === resultIndex && (
          <LeadText className="-a-center" leadText={sections?.leadText?.[0]} />
        )}
        {stepsPos === resultIndex && (
          <section className="row:bg-default">
            <ul className="four-stats">
              {sections?.steps?.[0]?.steps?.map(step => (
                <li>
                  <div className="heading -large -orange">{step.title}</div>
                  <p className="heading -regular -darker">{step.body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        <FeaturedSection featured={section} />
      </React.Fragment>
    );
  });

export const CareersPageContainer: FC<IProps> = ({ data }) => {
  const sections = data?.genericPage.sectionsAsArray;

  const hero = sections?.hero?.[0];

  return (
    <>
      {hero && (
        <Hero expand backgroundUrl={hero.image?.file?.url}>
          <HeroHeading
            className="-a-center"
            text={hero.title ?? ''}
            titleTag="h1"
            color="white"
          />
        </Hero>
      )}

      {renderSections(sections)}

      <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
        <div className="-justify-content-row -pt-500">
          <RouterLink
            className="button"
            withoutDefaultClassName
            classNames={{
              color: 'teal',
              size: 'regular',
              solid: true,
            }}
            link={{
              label: 'See Vacancies',
              href: 'https://vanarama.careers.adp.com/',
            }}
          >
            <div className="button--inner">See Vacancies</div>
          </RouterLink>
        </div>
      </LazyLoadComponent>

      {data?.genericPage.metaData && (
        <>
          <Head
            metaData={data?.genericPage.metaData}
            featuredImage={data?.genericPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.genericPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export default CareersPageContainer;
