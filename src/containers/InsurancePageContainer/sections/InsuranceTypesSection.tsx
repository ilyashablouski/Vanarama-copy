import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from "react-markdown";

import { GetInsuranceLandingPage_insuranceLandingPage_sections_cards as ITypesSection, GetInsuranceLandingPage_insuranceLandingPage_sections_cards_cards as TypeCard } from "../../../../generated/GetInsuranceLandingPage";
import Card from "@vanarama/uibook/lib/components/molecules/cards";
import getTitleTag from "../../../utils/getTitleTag";

//Category Card
const renderCard = (card: TypeCard) => (
  <Card
    key={card.name || undefined}
    imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg"
    title={{
      className: "-flex-h",
      link: <Heading
        size="lead"
        color="black"
        tag={getTitleTag(card.titleTag) as any || 'a'} >{card.title}</Heading>,
      title: card.title || '',
      withBtn: true
    }}
    description={card.body || ''}
  />
)

const InsuranceTypesSection = ({ name, description, cards }: ITypesSection) => (
  <>
    <div className="row:lead-text">
      <Heading size="xlarge" color="black">{name}</Heading>
      <Text size="regular" color="darker" tag="p">
        <ReactMarkdown
          source={description || ''}
          disallowedTypes={['paragraph']}
          unwrapDisallowed
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
