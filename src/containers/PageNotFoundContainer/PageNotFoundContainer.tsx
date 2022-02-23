import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import ServiceBanner from 'core/molecules/service-banner';
import React from 'react';
import RouterLink from '../../components/RouterLink/RouterLink';
import {
  GenericPageQuery_genericPage_sections_cards_cards,
  GenericPageQuery_genericPage_sections_featured,
} from '../../../generated/GenericPageQuery';
import Skeleton from '../../components/Skeleton';
import SectionCards from '../../components/SectionCards';
import { Nullish } from '../../types/common';
import { IBreadcrumbLink } from '../../types/breadcrumbs';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={2} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  name: string | null | undefined;
  cards?:
    | (GenericPageQuery_genericPage_sections_cards_cards | null)[]
    | null
    | undefined;
  breadcrumbsItems?: Nullish<IBreadcrumbLink[]>;
  featured?: GenericPageQuery_genericPage_sections_featured | null | undefined;
  serviceBanner?: IServiceBanner;
}

const PageNotFoundContainer: NextPage<IProps> = ({
  name,
  featured,
  breadcrumbsItems,
  cards,
  serviceBanner,
}) => {
  return (
    <>
      <ServiceBanner
        enable={serviceBanner?.enable}
        message={serviceBanner?.message}
        link={serviceBanner?.link}
        className="-mb-500"
      />
      <div className="row:title">
        <Breadcrumbs items={breadcrumbsItems} />
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataUiTestId="not-found-page_heading"
        >
          {name || ''}
        </Heading>
      </div>
      <div className="row:featured-left">
        <ImageV2
          quality={60}
          optimisedHost
          lazyLoad={false}
          className="-white"
          width={featured?.image?.file?.details.image.width}
          height={featured?.image?.file?.details.image.height}
          src={featured?.image?.file?.url || ''}
          size="expand"
        />
        <div className="full-height">
          <ReactMarkdown
            allowDangerousHtml
            source={featured?.body || ''}
            renderers={{
              paragraph: props => (
                <Text {...props} size="lead" tag="p" color="darker" />
              ),
              link: props => {
                const { href, children } = props;
                return (
                  <RouterLink
                    link={{ href, label: children }}
                    classNames={{ color: 'teal' }}
                  />
                );
              },
            }}
          />
        </div>
      </div>
      <div className="row:bg-lighter -col-300">
        <div className="row:cards-3col">
          {cards && <SectionCards cards={cards} />}
        </div>
      </div>
    </>
  );
};

export default PageNotFoundContainer;
