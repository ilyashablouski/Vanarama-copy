import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Text from "@vanarama/uibook/lib/components/atoms/text";
import { GetFleetLandingPage_fleetLandingPage_sections_hero as IHeroData } from "../../../generated/GetFleetLandingPage";

const HeroSection = (props: IHeroData) => (
    <div className="row:hero" /* "--src:url(https://source.unsplash.com/random?sig=1);" */>
        <div className="hero">
            <div className="hero-slides">
                <div className="slide -open">
                    <Heading size="xlarge" color="white">{props.title}</Heading>
                    <Text size="large" color="white">{props.body || ''}</Text>
                </div>
                <div className="slide"></div>
                <div className="slide"></div>
            </div>
            <div className="hero-fixed"></div>
        </div>
    </div>
)
export default HeroSection;