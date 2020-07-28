import Card from "@vanarama/uibook/lib/components/molecules/cards";
import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import ReactMarkdown from "react-markdown";
import { GetInsuranceLandingPage_insuranceLandingPage_sections_hero_heroCard as HeroCard } from "../../../../generated/GetInsuranceLandingPage";
import StructuredList from "@vanarama/uibook/lib/components/organisms/structured-list";
import { IList } from "@vanarama/uibook/lib/components/organisms/structured-list/interfaces";
import Button from "@vanarama/uibook/lib/components/atoms/button";
import Link from "@vanarama/uibook/lib/components/atoms/link";
import Router from 'next/router';

//TODO: add horizontal lines
const parseTable = (table: any[]): IList[] => table.map((row: any): IList => ({
    label: row.props.children[0].props.children[0].props.value,
    value: row.props.children[1].props.children[0].props.value
}));

const renderButton = (button: any[]) => (
    <Link
        href={`tel:${button[1].props.value
            .split('')
            .filter((item: string) => !isNaN(+item) && item !== ' ')
            .join('')
            .trim()}`}>
        <Button
            label={button[0].props.children[0].props.value}
            color="teal"
            size="large"
            fill="solid"
            className="-fullwidth"
        />
    </Link>
);

const WorkingHoursTable = ({ body, title }: HeroCard) => (
    <Card className="hero-card">
        <div className="hero-card--inner">
            <Heading size="lead" color="black">{title}</Heading>
            <ReactMarkdown
                source={body || ''}
                renderers={{
                    paragraph: props => renderButton(props.children),
                    table: props => <StructuredList {...props}
                        list={parseTable(props.children[1].props.children)}
                        className="-styled-headers -small -opening-times" />
                }}
            />
        </div>
    </Card>
);

export default WorkingHoursTable;
