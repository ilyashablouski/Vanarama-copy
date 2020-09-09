import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';

import Card from '@vanarama/uibook/lib/components/molecules/cards';
import {
  GetInsuranceLandingPage_insuranceLandingPage_sections_cards as ITypesSection,
  GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards as TypeCard,
} from '../../../../generated/GetInsuranceLandingPage';
import getTitleTag from '../../../utils/getTitleTag';
import RouterLink from '../../../components/RouterLink/RouterLink';

const renderCard = (card: TypeCard) => (
  <Card
    key={card.name || undefined}
    imageSrc={card.image?.file?.url}
    title={{
      className: '-flex-h',
      link: (
        <Heading
          size="lead"
          color="black"
          tag={
            (getTitleTag(card.titleTag) as keyof JSX.IntrinsicElements) || 'a'
          }
          href={card.link?.url || ''}
        >
          {card.title}
        </Heading>
      ),
      title: card.title || '',
      withBtn: true,
    }}
    description={card.body || ''}
  />
);

const InsuranceTypesSection = ({ name, description, cards }: ITypesSection) => (
  <>
    <div className="row:lead-text">
      <Heading size="xlarge" color="black">
        {name}
      </Heading>
      <ReactMarkdown
        source={description || ''}
        disallowedTypes={['paragraph']}
        unwrapDisallowed
        renderers={{
          link: props => {
            const { href, children } = props;
            return <RouterLink link={{ href, label: children }} />;
          },
          heading: props => (
            <Text {...props} size="lead" color="darker" className="-mt-100" />
          ),
          paragraph: props => <Text {...props} tag="p" color="darker" />,
        }}
      />
    </div>
    <div className="row:bg-lighter">
      <div className="row:cards-3col">
        {cards?.map(card => renderCard(card))}
      </div>
    </div>
  </>
);

export default InsuranceTypesSection;
