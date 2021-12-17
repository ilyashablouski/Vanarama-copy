import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Confetti from 'react-confetti';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import Skeleton from '../../../components/Skeleton';
import ThankYouOrderContainer from '../../../containers/ThankYouOrderContainer';
import { isBrowser } from '../../../utils/deviceType';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={3} />,
});

const confettiSettings = {
  colors: ['#FFE4D3', '#F5AB7B', '#FF8536', '#EB6209'],
  recycle: false,
  numberOfPieces: 1500,
  initialVelocityX: 69,
  initialVelocityY: -20,
};

const ThankYouPage: NextPage = () => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const { isB2b } = router.query;

  // if it will have empty list of dependencies, confetti will render wrong when user restart the page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isBrowser()) {
      setWindowWidth(window.innerWidth);
      setWindowHeight(document.body.scrollHeight);
    }
  });

  return (
    <>
      <OLAFLayout>
        <ThankYouOrderContainer isB2b={!!isB2b} />
      </OLAFLayout>
      {isB2b && (
        <div className="row:features-4col">
          <Tile plain className="-align-center">
            <span>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src="https://source.unsplash.com/collection/2102317/500x325?sig=40347"
                inline
                round
                size="large"
              />
            </span>
            <span className="tile--link">
              <Heading color="black" size="regular">
                Free, Safe & Contactless Delivery Direct To Your Door
              </Heading>
            </span>
          </Tile>
          <Tile plain className="-align-center">
            <span>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src="https://source.unsplash.com/collection/2102317/500x325?sig=403419"
                inline
                round
                size="large"
              />
            </span>
            <span className="tile--link">
              <Heading color="black" size="regular">
                Rated Excellent On TrustPilot
              </Heading>
            </span>
          </Tile>
          <Tile plain className="-align-center">
            <span>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src="https://source.unsplash.com/collection/2102317/500x325?sig=403430"
                inline
                round
                size="large"
              />
            </span>
            <span className="tile--link">
              <Heading color="black" size="regular">
                Free 30-Day Returns
              </Heading>
            </span>
          </Tile>
          <Tile plain className="-align-center">
            <span>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src="https://source.unsplash.com/collection/2102317/500x325?sig=40347"
                inline
                round
                size="large"
              />
            </span>
            <span className="tile--link">
              <Heading color="black" size="regular">
                The Best Price Or We&apos;ll Give You £100*
              </Heading>
            </span>
          </Tile>
        </div>
      )}
      <Confetti
        width={windowWidth}
        height={windowHeight}
        {...confettiSettings}
      />
    </>
  );
};

export default ThankYouPage;
