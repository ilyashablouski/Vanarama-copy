import Image from '@vanarama/uibook/lib/components/atoms/image';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import { useCallback } from 'react';
import getTitleTag from '../../../utils/getTitleTag';
import { GetFleetLandingPage_fleetLandingPage_sections_featured2 as ILeftMediaFeature } from '../../../../generated/GetFleetLandingPage';

export enum Side {
    left = 'left',
    right = 'right',
}

export interface ISideMediaFeatureProps extends ILeftMediaFeature {
    side: Side;
}

const SideMediaFeature = ({ image, side, titleTag, title, body }: ISideMediaFeatureProps) => {
    const renderImage = useCallback(
        () =>
            image?.file?.url ? (
                <Image src={image.file.url} alt={image?.title || ''} />
            ) : null,
        [],
    );

    return (
        <div className={`row:featured-${side.toString()}`}>
            {side === Side.left && renderImage()}
            <div>
                <Heading
                    size="large"
                    color="black"
                    tag={getTitleTag(titleTag) as any}
                >
                    {title}
                </Heading>
                <Text tag="p" size="regular" color="darker">
                    <ReactMarkdown source={body || ''} />
                </Text>
            </div>
            {side === Side.right && renderImage()}
        </div>
    );
};

export default SideMediaFeature;
