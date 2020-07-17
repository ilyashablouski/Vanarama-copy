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

const PATH = {
    items: [
        { label: 'Home', href: '/' },
        { label: 'About us', href: '/' },
    ],
};

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

    return <React.Fragment>
        <div className="row:title">
            <nav>
                <Breadcrumb
                    items={PATH.items} />
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
    </React.Fragment>
}

export default AboutUs