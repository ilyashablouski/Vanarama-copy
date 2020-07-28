import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Link from '@vanarama/uibook/lib/components/atoms/link';

import getTitleTag from '../../../utils/getTitleTag';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_featured2 as FAQSection } from "../../../../generated/GetInsuranceLandingPage";

const InsuranceFAQSection = ({ title, titleTag, body }: FAQSection) => (
    <div className="row:lead-text">
        <Heading size="large" color="black" tag={getTitleTag(titleTag) as any}>{title}</Heading>
        <ReactMarkdown
            source={body || ''}
            renderers={{
                heading: props => <Text {...props} size="lead" color="darker" className="-mt-100" />,
                paragraph: props => <Text {...props} tag="p" color="darker" />,
                link: props => {
                    return <Link
                        href={props.href}>
                        <Button
                            label={props.title}
                            {...props}
                            color="teal"
                            fill="solid"
                            size="lead" />
                    </Link>
                }
            }}
        />
    </div>);

export default InsuranceFAQSection;