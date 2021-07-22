import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import SchemaJSON from 'core/atoms/schema-json';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import SectionCards from '../../components/SectionCards';
import LeasingQuestionsCarousel from './LeasingQuestionsCarousel';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

interface IProps {
  data: GenericPageQuery;
}

const LeasingExplainedContainer: FC<IProps> = ({ data }) => {
  const body = getSectionsData(['body'], data?.genericPage);
  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const carousel = getSectionsData(['sections', 'carousel'], data?.genericPage);

  // const carousel = {
  //   cards: [
  //     {
  //       body: 'Find out why leasing a van is an ideal option for Sole Traders.',
  //       image: {
  //         description: 'Can Sole Traders Lease a Van?',
  //         file: {
  //           url:
  //             '//images.ctfassets.net/3xid768u5joa/1MKn8EL3noYIa3…452d6e92acb56f549806cf8/sole-trader-van-lease.jpg',
  //           fileName: 'sole-trader-van-lease.jpg',
  //         },
  //         title: 'Sole Trader Van Lease',
  //       },
  //       link: {
  //         legacyUrl: null,
  //         text: 'Read More',
  //         url: '/ask-the-expert/sole-trader-van-leasing.html',
  //       },
  //       name: 'Can Sole Traders Lease a Van?',
  //       title: 'Can Sole Traders Lease a Van?',
  //     },
  //     {
  //       body: 'Find out why leasing a van is an ideal option for Sole Traders.',
  //       image: {
  //         description: 'Can Sole Traders Lease a Van?',
  //         file: {
  //           url:
  //             '//images.ctfassets.net/3xid768u5joa/1MKn8EL3noYIa3…452d6e92acb56f549806cf8/sole-trader-van-lease.jpg',
  //           fileName: 'sole-trader-van-lease.jpg',
  //         },
  //         title: 'Sole Trader Van Lease',
  //       },
  //       link: {
  //         legacyUrl: null,
  //         text: 'Read More',
  //         url: '/ask-the-expert/sole-trader-van-leasing.html',
  //       },
  //       name: 'Can Sole Traders Lease a Van?',
  //       title: 'Can Sole Traders Lease a Van?',
  //     },
  //     {
  //       body: 'Find out why leasing a van is an ideal option for Sole Traders.',
  //       image: {
  //         description: 'Can Sole Traders Lease a Van?',
  //         file: {
  //           url:
  //             '//images.ctfassets.net/3xid768u5joa/1MKn8EL3noYIa3…452d6e92acb56f549806cf8/sole-trader-van-lease.jpg',
  //           fileName: 'sole-trader-van-lease.jpg',
  //         },
  //         title: 'Sole Trader Van Lease',
  //       },
  //       link: {
  //         legacyUrl: null,
  //         text: 'Read More',
  //         url: '/ask-the-expert/sole-trader-van-leasing.html',
  //       },
  //       name: 'Can Sole Traders Lease a Van?',
  //       title: 'Can Sole Traders Lease a Van?',
  //     },
  //     {
  //       body: 'Find out why leasing a van is an ideal option for Sole Traders.',
  //       image: {
  //         description: 'Can Sole Traders Lease a Van?',
  //         file: {
  //           url:
  //             '//images.ctfassets.net/3xid768u5joa/1MKn8EL3noYIa3…452d6e92acb56f549806cf8/sole-trader-van-lease.jpg',
  //           fileName: 'sole-trader-van-lease.jpg',
  //         },
  //         title: 'Sole Trader Van Lease',
  //       },
  //       link: {
  //         legacyUrl: null,
  //         text: 'Read More',
  //         url: '/ask-the-expert/sole-trader-van-leasing.html',
  //       },
  //       name: 'Can Sole Traders Lease a Van?',
  //       title: 'Can Sole Traders Lease a Van?',
  //     },
  //   ],
  //   name: 'Most Popular Questions',
  //   title: 'Most Popular Questions',
  // };
  const cards = getSectionsData(['sections', 'cards'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
        <ReactMarkdown
          allowDangerousHtml
          source={body || ''}
          renderers={{
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
      <div className="row:bg-lighter">
        <div className="row:carousel">
          <Heading size="large" color="black">
            {carousel?.title || ''}
          </Heading>
          <LeasingQuestionsCarousel carousel={carousel} />
        </div>
      </div>
      <div className="row:bg-lighter">
        <div className="row:cards-3col">
          <Heading size="large" color="black">
            {cards?.name || ''}
          </Heading>
          {cards?.cards && <SectionCards cards={cards.cards} />}
        </div>
      </div>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default LeasingExplainedContainer;
