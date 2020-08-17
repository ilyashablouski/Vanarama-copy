import React, { memo, useEffect } from 'react';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import { useAllMakePage } from './gql';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import getTitleTag from 'utils/getTitleTag';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';

interface ITopInfoBlockProps {
  isAllMakesPage?: boolean;
  setTitle: (title: string) => void;
}
// It should common component for all search pages which contain info block on the top of page
//TODO: after adding missing content in CMS change data routes to valid
const TopInfoBlock = memo(
    ({ isAllMakesPage, setTitle }: ITopInfoBlockProps) => {
    // skip request in others page
    const {data, error} = useAllMakePage(!isAllMakesPage)
    
    useEffect(() => {
        if(data?.manufacturerPage) {
            // should pass a title value from CMS
            setTitle('test')
        }
    },[data.manufacturerPage])

    return (
        data.manufacturerPage && isAllMakesPage ? (
        <section className="row:featured-left">
            <Image src="https://source.unsplash.com/collection/2102317/900x500?sig=403422" />
            <div>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                data?.manufacturerPage || 'p',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {/* {data?.manufacturerPage?.sections?} */}
          </Heading>
          <Text className="markdown" tag="div" size="regular" color="darker">
            <ReactMarkdown
              escapeHtml={false}
              source={data?.manufacturerPage?.sections?.featured?.body || ''}
            />
          </Text>
        </div>
        </section>
        ) : <></>
    );
  },
);

export default TopInfoBlock;
