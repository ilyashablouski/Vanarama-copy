import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';

import Card from '@vanarama/uibook/lib/components/molecules/cards';
import {
  GetInsuranceLandingPage_insuranceLandingPage_sections_cards as ITypesSection,
  GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards as TypeCard,
} from '../../../../generated/GetInsuranceLandingPage';
import RouterLink from '../../../components/RouterLink/RouterLink';

const renderCard = (card: TypeCard) => (
  <Card
    optimisedHost={process.env.IMG_OPTIMISATION_HOST}
    key={card.name || undefined}
    imageSrc={card.image?.file?.url}
    title={{
      className: '-flex-h',
      link: (
        <RouterLink
          classNames={{ size: 'lead', color: 'black' }}
          className="heading"
          link={{
            href: card.link?.legacyUrl || card.link?.url || '',
            label: 'card.title',
          }}
        >
          {card.title}
        </RouterLink>
      ),
      title: '',
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
      <Text size="regular" color="darker" tag="p">
        <ReactMarkdown
          allowDangerousHtml
          source={description || ''}
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
      </Text>
    </div>
    <div className="row:bg-lighter">
      <div className="row:cards-3col">
        {cards?.map(card => renderCard(card))}
      </div>
    </div>
  </>
);

export default InsuranceTypesSection;
