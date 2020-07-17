import React from "react";
import ReactMarkdown from "react-markdown";

import Loading from "@vanarama/uibook/lib/components/atoms/loading";
import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Image from "@vanarama/uibook/lib/components/atoms/image";
import Breadcrumb from "@vanarama/uibook/lib/components/atoms/breadcrumb";
import Carousel from "@vanarama/uibook/lib/components/organisms/carousel";
import Card from "@vanarama/uibook/lib/components/molecules/cards";
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { ILink } from "@vanarama/uibook/lib/interfaces/link";
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import TrophySharp from '@vanarama/uibook/lib/assets/icons/TrophySharp';

import { useAboutUsPageData } from "./gql";
import { ABOUT_US_NAV_ITEM, ABOUT_US_MEET_SECTION_NAMES, ABOUT_US_STRINGS } from "./config";
import { GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards as ICard } from "../../../generated/GetAboutUsPageData";
import Link from "@vanarama/uibook/lib/components/atoms/link";


const AboutUs: React.FC = () => {
    const renderCarouselCards = () => sections.carousel?.cards?.map((card: ICard | null) => (
            card/* ?.title && card.body */ ? <div className="card">
                <div className="title">
                    <Heading size="lead" color="black"><Icon icon={<TrophySharp />} color="black" /> {card.title || 'TODO: Award title'}</Heading>
                </div>
                <Text size="regular" color="dark">{card.body || 'TODO: add text instead Award description Award description Award description Award description Award description Award description Award description'}</Text>
            </div> : null));

    const renderMeetCard = (card: ICard | null) => card?.title
        && card.body
        && <Card title={{ title: card.title }}>
            <ReactMarkdown source={card.body}
                renderers={{ "link": props => <Link {...props} /> }} />
        </Card>
        || null;

    const { data, error, loading } = useAboutUsPageData();

    if (loading) {
        return <Loading size="large" />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!data) {
        return null;
    }

    const { metaData, sections } = data.aboutUsLandingPage;

    const navigation: ILink[] = metaData.schema.itemListElement.map((nav: any) => ({
        href: nav.item,
        label: nav.name
    }))

    const directorsCard = sections.cards?.cards?.find(card => card.name === ABOUT_US_MEET_SECTION_NAMES.directors) || null;
    const teamCard = sections.cards?.cards?.find(card => card.name === ABOUT_US_MEET_SECTION_NAMES.team) || null;

    return <React.Fragment>
        <div className="row:title">
            <nav>
                <Breadcrumb
                    items={navigation.concat(ABOUT_US_NAV_ITEM)} />
            </nav>
            <Heading size="xlarge" color="black">
                {metaData.name}
            </Heading>
        </div>
        <div className="row:bg-black -compact">
            <div className="row:featured-image">
                <Image
                    //TODO: from contentful
                    src="https://source.unsplash.com/collection/2102317/1800x800?sig=40341"
                />
                <Text tag="span" size="regular" color="inherit" className="-caption">
                    {ABOUT_US_STRINGS.imageCredit.replace('{{PERSON}}', "TODO: get name and image from contentful")}
                </Text>
            </div>
        </div>
        <div className="row:article">
            <article className="markdown"><ReactMarkdown source={metaData.body || ''} /></article>
            <div>
                <div className="-pb-400">
                    <Carousel className="carousel -col1" countItems={1}>{renderCarouselCards()}</Carousel>
                </div>
            </div>
        </div>
        <div className="row:cards-2col">
            {renderMeetCard(directorsCard)}
            {renderMeetCard(teamCard)}
        </div>
    </React.Fragment>
}

export default AboutUs