import Hero, { HeroHeading, HeroTitle } from '../../../../components/Hero';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import { GetFleetLandingPage_fleetLandingPage_sections_hero as IHeroData } from '../../../../../generated/GetFleetLandingPage';
import config from '../../config';

const HeroSection = ({ title, body }: IHeroData) => (
    <Hero withRequestCallbackform>
        <HeroHeading text={title || ''} />
        <HeroTitle text={body || ''} />
        <Image
            size="expand"
            src={config.heroImage.src}
            plain
            className="hero--image"
        />
    </Hero>
);

export default HeroSection;
