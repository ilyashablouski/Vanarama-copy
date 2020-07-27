import Image from '@vanarama/uibook/lib/components/atoms/image';

import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero as IHero } from "../../../../generated/GetInsuranceLandingPage";
import Hero, { HeroHeading, HeroTitle } from "../../../components/Hero";

import config from '../config';

const InsuranceHeroSection = ({ title, body }: IHero) => (
    <Hero withWorkingHours>
        <HeroHeading text={title || ''} />
        <HeroTitle text={body || ''} />
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
