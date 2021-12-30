import React, { FC, memo } from 'react';

import Link from '../../atoms/link';
import Text from '../../atoms/text';
import Heading from '../../atoms/heading';
import Image from '../../atoms/image';

import { ILeagueProps } from './interfaces';

const League: FC<ILeagueProps> = memo(props => {
  const { altText, link } = props;

  return (
    <>
      <div>
        <Image
          plain
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          src={`${process.env.HOST_DOMAIN}/Assets/images-optimised/home/national-league.png`}
          size="expand"
          alt={altText}
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
          >
            Here
          </Link>
        </Text>
        <Image
          plain
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          src={`${process.env.HOST_DOMAIN}/Assets/images-optimised/home/league-cup.png`}
          size="expand"
          alt={altText}
        />
      </div>
    </>
  );
});

League.displayName = 'League';

export default React.memo(League);
