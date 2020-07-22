import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Text from "@vanarama/uibook/lib/components/atoms/text";
import { GetFleetLandingPage_fleetLandingPage_sections_hero as IHeroData } from "../../../generated/GetFleetLandingPage";
import Hero, { HeroHeading, HeroTitle } from "components/Hero";
import Image from "@vanarama/uibook/lib/components/atoms/image";
import config from "./config";

const HeroSection = (props: IHeroData) => (
    <Hero>
        <HeroHeading text={props.title || ''} />
        <HeroTitle text={props.body || ''} />
        <Image width={config.heroImage.width} height={config.heroImage.height} src={config.heroImage.src} />
    </Hero>
)
export default HeroSection;