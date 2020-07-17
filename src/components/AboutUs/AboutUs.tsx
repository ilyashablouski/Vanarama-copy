import React from "react";
import { useAboutUsPageData } from "./gql";
import Loading from "@vanarama/uibook/lib/components/atoms/loading";
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Image from "@vanarama/uibook/lib/components/atoms/image";
import ReactMarkdown from "react-markdown";
import Breadcrumb from "@vanarama/uibook/lib/components/atoms/breadcrumb";
import Carousel from "@vanarama/uibook/lib/components/organisms/carousel";
import Card from "@vanarama/uibook/lib/components/molecules/cards";
import { ABOUT_US_NAV, ABOUT_US_MEET_SECTION_NAMES } from "./consts";


const AboutUs: React.FC = () => {
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

    console.log(data);
    const directorsCard = data.aboutUsLandingPage.sections.cards?.cards?.find(card => card.name === ABOUT_US_MEET_SECTION_NAMES.directors);
    const teamCard = data.aboutUsLandingPage.sections.cards?.cards?.find(card => card.name === ABOUT_US_MEET_SECTION_NAMES.team);

    return <React.Fragment>
        <div className="row:title">
            <nav>
                <Breadcrumb
                    items={ABOUT_US_NAV.items} />
            </nav>
            <Heading size="xlarge" color="black">
                {data.aboutUsLandingPage.metaData.name}
            </Heading>
        </div>
        <div className="row:bg-black -compact">
            <div className="row:featured-image">
                <Image
                    size="expand"
                    //TODO: from contentful
                    src="https://source.unsplash.com/collection/2102317/1800x800?sig=40341"
                />
            </div>
        </div>
        <div className="row:article">
            <article className="markdown"><ReactMarkdown source={data.aboutUsLandingPage.metaData.body || ''} /></article>
            <div>
                <div className="-pb-400">
                    <Carousel className="carousel -col1" countItems={1}>
                        <Card title={{ title: "test" }} description="test descr" />
                        <Card title={{ title: "test" }} description="test descr" />
                        <Card title={{ title: "test" }} description="test descr" />
                        <Card title={{ title: "test" }} description="test descr" />
                    </Carousel>
                </div>
            </div>
        </div>
        <div className="row:cards-2col">
            {directorsCard?.title
                && directorsCard.body
                && <Card title={{ title: directorsCard.title }}><ReactMarkdown source={directorsCard.body} /></Card>}
            {teamCard?.title
                && teamCard.body
                && <Card title={{ title: teamCard.title }}><ReactMarkdown source={teamCard.body} /></Card>}
        </div>
    </React.Fragment>
}

export default AboutUs