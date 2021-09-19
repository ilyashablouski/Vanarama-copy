import React, { FC } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import SchemaJSON from 'core/atoms/schema-json';

import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sectionsAsArray_jumpMenu_links,
} from '../../../generated/GenericPageQuery';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

import Head from '../../components/Head/Head';
import LeadText from '../../components/LeadText';
import JumpMenu from '../../components/JumpMenu';
import FeaturedSection from '../../components/FeaturedSection';
import { HeroBg as Hero, HeroHeading } from '../../components/Hero';

import CareersVacanciesCarousel from './CareersVacanciesCarousel';

interface IProps {
  data: GenericPageQuery;
}

export const CareersPageContainer: FC<IProps> = ({ data }) => {
  const sections = data?.genericPage.sectionsAsArray;

  const hero = sections?.hero?.[0];
  const vacanciesCarousel = sections?.carousel?.[0];

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

      {sections?.featured?.map((section, index) => {
        const idx = index + 1;
        let leadTextIdx = 0;
        let stepsIdx = 0;

        const jumpMenuPos = sections?.jumpMenu?.[0]?.position;

        const leadTextPos = sections?.leadText?.[leadTextIdx]?.position;
        if (leadTextPos === idx) {
          leadTextIdx += 1;
        }

        const stepsPos = sections?.steps?.[stepsIdx]?.position;
        if (stepsPos === idx) {
          stepsIdx += 1;
        }

        return (
          <>
            {jumpMenuPos === idx && (
              <JumpMenu
                title={sections?.jumpMenu?.[0]?.title}
                links={
                  sections?.jumpMenu?.[0]?.links?.filter(
                    link => link !== null,
                  ) as GenericPageQuery_genericPage_sectionsAsArray_jumpMenu_links[]
                }
              />
            )}
            {leadTextPos === idx && (
              <LeadText
                className="-a-center"
                leadText={sections?.leadText?.[leadTextIdx - 1]}
              />
            )}
            {stepsPos === idx && (
              <section className="row:bg-default">
                <ul className="four-stats">
                  {sections?.steps?.[stepsIdx - 1]?.steps?.map(step => (
                    <li>
                      <div className="heading -large -orange">{step.title}</div>
                      <p className="heading -regular -darker">{step.body}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <FeaturedSection featured={section} />
          </>
        );
      })}

      {vacanciesCarousel && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <CareersVacanciesCarousel {...vacanciesCarousel} />
        </LazyLoadComponent>
      )}

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
