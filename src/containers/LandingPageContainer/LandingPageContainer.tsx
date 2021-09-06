import React, { Fragment, useMemo } from 'react';
import Heading from 'core/atoms/heading';
import SchemaJSON from 'core/atoms/schema-json';
import Breadcrumb from 'core/atoms/breadcrumb-v2';
import { buildRenderArray } from './helpers';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sectionsAsArray,
  GenericPageQuery_genericPage_sectionsAsArray_featured as IFeatured,
  GenericPageQuery_genericPage_sectionsAsArray_jumpMenu as IJumpMenu,
  GenericPageQuery_genericPage_sectionsAsArray_jumpMenu_links,
  GenericPageQuery_genericPage_sectionsAsArray_leadText as ILeadText,
} from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import JumpMenu from '../../components/JumpMenu/JumpMenu';
import FeaturedSection from '../../components/FeaturedSection';
import Head from '../../components/Head/Head';
import LeadTextComponent from './LeadTextComponent';

interface IProps {
  data?: GenericPageQuery;
  title: string;
}

const LandingPageContainer = ({ data, title }: IProps) => {
  const sectionsAsArray = useMemo(() => {
    // @ts-ignore
    const { __typename: typeName, ...rest } = getSectionsData(
      ['sectionsAsArray'],
      data?.genericPage,
    ) as GenericPageQuery_genericPage_sectionsAsArray;
    return rest;
  }, [data]);

  const renderArray = useMemo(() => buildRenderArray(sectionsAsArray), [
    sectionsAsArray,
  ]);

  const metaData = useMemo(
    () => getSectionsData(['metaData'], data?.genericPage),
    [data],
  );
  const breadcrumbsItems = useMemo(
    () =>
      metaData?.breadcrumbs?.map((el: any) => ({
        link: { href: el.href || '', label: el.label },
      })),
    [metaData?.breadcrumbs],
  );
  return (
    <>
      <div className="row:title">
        {breadcrumbsItems && (
          <div className="row:title">
            <Breadcrumb items={breadcrumbsItems} />
          </div>
        )}
        <Heading tag="h1" size="xlarge" color="black" className="-mb-300">
          {title}
        </Heading>
      </div>

      {renderArray.map((block, index) => (
        <Fragment
          key={`${block.blockName}_${(block as any)?.position ||
            (block as any)?.title ||
            index}`}
        >
          {block.blockName === 'featured' && (
            <FeaturedSection featured={block as IFeatured} />
          )}
          {block.blockName === 'leadText' && (
            <LeadTextComponent leadText={block as ILeadText} />
          )}
          {block.blockName === 'jumpMenu' && (
            <JumpMenu
              title={(block as IJumpMenu).title}
              links={
                (block as IJumpMenu).links?.filter(
                  link => link !== null,
                ) as GenericPageQuery_genericPage_sectionsAsArray_jumpMenu_links[]
              }
            />
          )}
        </Fragment>
      ))}
      {metaData && (
        <>
          <Head
            metaData={metaData}
            featuredImage={data?.genericPage.featuredImage}
          />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default LandingPageContainer;
