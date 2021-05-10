import React, { FC } from 'react';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import Image from 'core/atoms/image';
import LeadText from 'components/LeadText/LeadText';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { HeroEv as Hero, HeroHeading } from '../../components/Hero';
import FeaturedSection from '../../components/FeaturedSection';
import Head from '../../components/Head/Head';
import JumpMenu from '../../components/JumpMenu/JumpMenu';
import EvArticlesCarousel from './EvArticlesCarousel';

interface IProps {
  data: GenericPageQuery;
}

export const EVContentHub: FC<IProps> = ({ data }) => {
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const sections = data?.genericPage.sectionsAsArray;
  return (
    <>
      <Hero>
        <div className="hero--left">
          <Image
            loadImage
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            optimisationOptions={optimisationOptions}
            className="hero--image"
            plain
            size="expand"
            src={
              sections?.hero?.[0]?.image?.file?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
        <div className="hero--right">
          <HeroHeading
            text={sections?.hero?.[0]?.title || ''}
            titleTag="h1"
            color="orange"
          />
        </div>
      </Hero>

      {sections?.featured?.map((section, index) => {
        const idx = index + 1;
        let leadTextIdx = 0;
        let stepsIdx = 0;

        const leadTextPos = sections?.leadText?.[leadTextIdx]?.position;
        if (leadTextPos === idx) leadTextIdx += 1;

        const stepsPos = sections?.steps?.[stepsIdx]?.position;
        if (stepsPos === idx) stepsIdx += 1;

        const jumpMenuPos = sections?.jumpMenu?.[0]?.position;

        return (
          <>
            {jumpMenuPos === idx && (
              <section className="row">
                <JumpMenu
                  title={sections?.jumpMenu?.[0]?.title}
                  links={sections?.jumpMenu?.[0]?.links}
                />
              </section>
            )}
            {leadTextPos === idx && (
              <LeadText leadText={sections?.leadText?.[leadTextIdx - 1]} />
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

      {sections?.carousel?.[0] && (
        <EvArticlesCarousel data={sections?.carousel?.[0]} />
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

export default EVContentHub;
