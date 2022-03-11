import { memo, FC } from 'react';
import SchemaJSON from 'core/atoms/schema-json';
import Heading from 'core/atoms/heading';
import Head from '../../components/Head/Head';
import { IPageWithData } from '../../types/common';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import CardsSectionCarousel from '../../components/CardsSectionCarousel';
import { normalizeString } from '../../utils/data';

type IProps = IPageWithData<{
  data: GenericPageQuery;
  dataUiTestId?: string;
}>;

const CarHubPageContainer: FC<IProps> = ({ data, dataUiTestId }) => {
  const { sectionsAsArray } = data?.genericPage;
  const cards = sectionsAsArray?.cards?.[0];

  return (
    <>
      {cards?.cards?.length && (
        <div className="row:bg-lighter">
          <Heading
            color="black"
            size="large"
            className="-a-center -mb-300"
            tag={
              getTitleTag(
                cards?.titleTag || null,
              ) as keyof JSX.IntrinsicElements
            }
            dataUiTestId={
              dataUiTestId
                ? `${dataUiTestId}_${normalizeString(cards?.name)}_title`
                : undefined
            }
          >
            {cards?.name}
          </Heading>
          <CardsSectionCarousel
            cards={cards?.cards || []}
            dataUiTestId={
              dataUiTestId
                ? `${dataUiTestId}_cards-section-carousel`
                : undefined
            }
          />
        </div>
      )}
      {data?.genericPage.metaData && (
        <>
          <Head
            metaData={data?.genericPage.metaData}
            featuredImage={data?.genericPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.genericPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export default memo(CarHubPageContainer);
