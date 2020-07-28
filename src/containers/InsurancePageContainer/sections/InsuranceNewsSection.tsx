import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';

import {
    GetInsuranceLandingPage_insuranceLandingPage_sections_carousel as ICarouselData,
    GetInsuranceLandingPage_insuranceLandingPage_sections_carousel_cards as ICard
} from '../../../../generated/GetInsuranceLandingPage';
import getTitleTag from '../../../utils/getTitleTag';
import ReactMarkdown from 'react-markdown';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Button from '@vanarama/uibook/lib/components/atoms/button';

const renderButton = (button: any[]) => (
    <Link
        href={`tel:${button[1].props.value
            .split('')
            .filter((item: string) => !isNaN(+item) && item !== ' ')
            .join('')
            .trim()}`}>
        <Button
            label={button[0].props.children[0].props.value}
            color="teal"
            size="large"
            fill="solid"
            className="-fullwidth"
        />
    </Link>
);

const renderCarouselCards = (cards: (ICard | null)[]) =>
    cards.map(card =>
        card?.title && card.body && card.name ? (
            <Card
                // TODO: remove width when Carousel component is fixed
                // now its slider is wider than carousel itself, and cards adapts and its right border is hidden
                // style={{ width: '362px' }}
                key={card.name}
                title={{ title: card.title }}
                // description={card.body}
                imageSrc={card.image?.file?.url}
            >
                <ReactMarkdown
                    source={card.body || ''}
                    // disallowedTypes={['paragraph']}
                    // unwrapDisallowed
                    renderers={{
                        link: props => {
                            return <Link
                                href={props.href}>
                                <Button
                                    label={props.children[0].props.value}
                                    {...props}
                                    color="teal"
                                    fill="clear"
                                    size="regular" />
                            </Link>
                        }
                    }}
                />
            </Card>
        ) : null,
    );

const InsuranceNewsSection = ({ cards }: ICarouselData) => (
    <div className="row:bg-lighter">
        {cards && <Carousel countItems={3}>{renderCarouselCards(cards)}</Carousel>}
    </div>
);

export default InsuranceNewsSection;
