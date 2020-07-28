import ReactMarkdown from 'react-markdown';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';

import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero as IHero } from "../../../../generated/GetInsuranceLandingPage";
import Hero, { HeroHeading, HeroTitle } from "../../../components/Hero";
import config from '../config';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';

const InsuranceHeroSection = ({ title, body, heroCard }: IHero) => (
    <Hero workingHoursCard={heroCard && heroCard[0] || undefined}>
        <HeroHeading text={title || ''} />
        <ReactMarkdown
            source={body}
            renderers={{
                heading: props => <Text
                    {...props}
                    tag="p"
                    size="large"
                    color="white" />,
                paragraph: props => <Text
                    {...props}
                    tag="p"
                    size="xsmall"
                    color="white"
                    className="hero--small-print" />,
            }}
        />
        <Image
            dataTestId="fleet_hero-image"
            size="expand"
            src={config.heroImage.src}
            plain
            className="hero--image"
        />
    </Hero>
);

export default InsuranceHeroSection;
