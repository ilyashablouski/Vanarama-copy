import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import ReactMarkdown from 'react-markdown';
import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { IList } from '@vanarama/uibook/lib/components/organisms/structured-list/interfaces';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard as HeroCard } from '../../../../generated/GetInsuranceLandingPage';
import { ParsedLink } from '../ParsedLink';

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
  <Card className="hero-card">
    <div className="hero-card--inner">
      <Heading size="lead" color="black">
        {title}
      </Heading>
      <ReactMarkdown
        source={body || ''}
        renderers={{
          paragraph: props => {
            const { children } = props;
            const href = `tel:${children[1].props.value
              .split('')
              .filter((item: string) => item === '0' || +item > 0)
              .join('')}`;
            return (
              <ParsedLink
                title={children[0].props.children[0].props.value}
                color="teal"
                size="large"
                fill="solid"
                className="-fullwidth"
                href={href}
              />
            );
          },
          table: props => renderTable(props),
        }}
      />
    </div>
  </Card>
);

export default WorkingHoursTable;
