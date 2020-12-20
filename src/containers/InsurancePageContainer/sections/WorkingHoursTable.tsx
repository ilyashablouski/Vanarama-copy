import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import StructuredList from 'core/organisms/structured-list';
import { IList } from 'core/organisms/structured-list/interfaces';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard as HeroCard } from '../../../../generated/GetInsuranceLandingPage';
import { ParsedLink } from '../ParsedLink';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={4} />,
});

const gfm = require('remark-gfm');

const parseTable = (table: any[]): IList[] =>
  table.map(
    (row: any): IList => ({
      label: row.props.children[0].props.children[0].props.value,
      value: row.props.children[1].props.children[0].props.value,
    }),
  );

const renderTable = (props: any) => {
  const { children } = props;
  return (
    <StructuredList
      {...props}
      list={parseTable(children[1].props.children)}
      className="-styled-headers -small -opening-times"
    />
  );
};

const WorkingHoursTable = ({ body, title }: HeroCard) => (
  <Card optimisedHost={process.env.IMG_OPTIMISATION_HOST} className="hero-card">
    <div className="hero-card--inner">
      <Heading size="lead" color="black">
        {title}
      </Heading>
      <ReactMarkdown
        allowDangerousHtml
        source={body || ''}
        renderers={{
          paragraph: props => {
            const { children } = props;
            const href = `tel:${children[0]?.props.value
              .split('')
              .filter((item: string) => item === '0' || +item > 0)
              .join('')}`;
            return children[0].props?.value ? (
              <ParsedLink
                title={children[0].props?.value.split('"')[1]}
                color="teal"
                size="large"
                fill="solid"
                className="-fullwidth"
                href={href}
              />
            ) : (
              <></>
            );
          },
          table: props => renderTable(props),
        }}
        plugins={[gfm]}
      />
    </div>
  </Card>
);

export default React.memo(WorkingHoursTable);
