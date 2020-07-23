import { GetFleetLandingPage_fleetLandingPage_sections_featured2 as ILeftMediaFeature } from "../../../../generated/GetFleetLandingPage";
import Image from "@vanarama/uibook/lib/components/atoms/image";
import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from "react-markdown";
import { useCallback } from "react";
import { getTitleTag } from "utils/getTitleTag";

export enum Side {
    left = "left",
    right = "right"
};

export interface ISideMediaFeatureProps extends ILeftMediaFeature {
    side: Side;
}

const SideMediaFeature = (props: ISideMediaFeatureProps) => {
    const renderImage = useCallback(() => props.image?.file?.url ? <Image
        src={props.image.file.url}
        alt={props.image?.title || ''} /> : null, []);

    return (
        <div className={`row:featured-${props.side.toString()}`}>
            {props.side === Side.left && renderImage()}
            <div>
                <Heading size="large" color="black" tag={getTitleTag(props.titleTag) as any}>{props.title}</Heading>
                <Text tag="p" size="regular" color="darker">
                    <ReactMarkdown source={props.body || ''} />
                </Text>
            </div>
            {props.side === Side.right && renderImage()}
        </div>)
};

export default SideMediaFeature;
