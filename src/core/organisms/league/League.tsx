import React, { FC, memo } from 'react';

import Link from 'core/atoms/link';
import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';
import ImageV2 from 'core/atoms/image/ImageV2';

import { ILeagueProps } from './interfaces';

const baseImageUrl = `${process.env.HOST_DOMAIN}/Assets/images-optimised/home`;

const League: FC<ILeagueProps> = memo(props => {
  const { altText, link, dataUiTestId } = props;

  return (
    <>
      <div>
        <ImageV2
          sizes="50vw"
          quality={60}
          width={290}
          height={86}
          src={`${baseImageUrl}/national-league.png`}
          alt={altText}
          size="expand"
          plain
        />
      </div>
      <div>
        <Heading color="black" size="large" tag="span">
          The Vanarama National League
        </Heading>
        <Text color="darker" size="lead" tag="span">
          Read About Our Sponsorship{' '}
          <Link
            color="teal"
            href={link}
            dataUiTestId={
              dataUiTestId ? `${dataUiTestId}_link_here` : undefined
            }
          >
            Here
          </Link>
        </Text>
        <ImageV2
          sizes="30vw"
          quality={60}
          width={206}
          height={206}
          src={`${baseImageUrl}/league-cup.png`}
          alt={altText}
          size="expand"
          plain
        />
      </div>
    </>
  );
});

League.displayName = 'League';

export default React.memo(League);
