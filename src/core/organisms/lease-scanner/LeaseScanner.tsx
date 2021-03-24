import React, { FC, useState, useEffect, useRef } from 'react';
import { ILeaseScannerProps } from './interfaces';
import Icon from '../../atoms/icon';

import Price from '../../atoms/price';
import Heading from '../../atoms/heading';
import Button from '../../atoms/button';
import Text from '../../atoms/text';
import Checkbox from '../../atoms/checkbox';
import Link from '../../atoms/link';
import Loading from '../../atoms/loading';
import CheckmarkSharp from '../../assets/icons/CheckmarkSharp';
import CheckmarkCircleOutline from '../../assets/icons/CheckmarkCircleOutline';

const LeaseScanner: FC<ILeaseScannerProps> = props => {
  const {
    price,
    headingText,
    withCheckBox = false,
    leasingProviders,
    startLoading,
    orderNowClick,
    nextBestPrice,
    classNameHeading,
    priceLabel,
    endAnimation,
    requestCallBack,
  } = props;
  const positionStyle = {
    '--lease-scanner-height': withCheckBox ? '9rem' : '6.75rem',
  } as React.CSSProperties;
  const [isLoading, setLoadingStatus] = useState(false);
  const [isInitialLoading, setInitialLoadingStatus] = useState(true);
  const [isLeasingProviderChecked, setLeasingProviderChecked] = useState(false);
  const [isCompetitorsChecked, setCompetitorsChecked] = useState(false);
  const [currentLisingProvider, setCurrentLisingProvider] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [animationClass, setAnimationClass] = useState('slideInUp');
  const [isInitialSuccess, setInitialSuccess] = useState(false);

  const providersTimer = useRef(false) as any;

  // calculate animation duration it shoulde be (5-8 sec)
  const getAnimationDuration = () =>
    parseFloat((Math.random() * (8000 - 5000) + 5000).toFixed(2));

  useEffect(() => {
    if (isLoading && currentLisingProvider === 0) {
      providersTimer.current = setInterval(() => {
        setCurrentLisingProvider(currentIndex => currentIndex + 1);
      }, (animationDuration - 1000) / leasingProviders.length);
    }
    return () => clearInterval(providersTimer);
  }, [
    isLoading,
    animationDuration,
    currentLisingProvider,
    leasingProviders.length,
    providersTimer,
  ]);

  // useEffect for initial animation control
  useEffect(() => {
    let competitorsCheckedTimer: any;
    let initialSuccessFinishedTimer: any;
    let slideDownAnimationTimer: any;
    let closeLoadingWrapperTimer: any;
    if (currentLisingProvider === leasingProviders.length - 1) {
      // clear interval for changing providers, when we select the last one
      clearInterval(providersTimer.current);
      // set flag that all providers checked
      setLeasingProviderChecked(true);
      // timeout for set competitors flag
      competitorsCheckedTimer = setTimeout(() => {
        // set competitros to checked status
        setCompetitorsChecked(true);
        initialSuccessFinishedTimer = setTimeout(() => {
          // set that providers and competitors has been checked
          setInitialSuccess(true);
        }, 300);
        slideDownAnimationTimer = setTimeout(() => {
          // change animation class for close slide animation
          setAnimationClass('slideOutDown');
        }, 1000);
        // delay for transition duration
        closeLoadingWrapperTimer = setTimeout(() => {
          // set initial loading status to false for close popup
          setInitialLoadingStatus(false);
          // return initial animation class for new pop calls
          setAnimationClass('slideInUp');
          endAnimation();
          setLoadingStatus(false);
          setInitialLoadingStatus(false);
        }, 1500);
      }, 700);
    }
    return () => {
      clearTimeout(competitorsCheckedTimer);
      clearTimeout(initialSuccessFinishedTimer);
      clearTimeout(slideDownAnimationTimer);
      clearTimeout(closeLoadingWrapperTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLisingProvider, leasingProviders.length, providersTimer]);

  useEffect(() => {
    setAnimationDuration(getAnimationDuration());
  }, []);

  useEffect(() => {
    let startLoadingTimer: any;
    if (startLoading) {
      setAnimationClass('slideInUp');
      setLoadingStatus(true);
    } else if (!startLoading && !isInitialLoading) {
      setAnimationClass('slideOutDown');
      // delay for transition duration
      startLoadingTimer = setTimeout(() => {
        endAnimation();
        setLoadingStatus(startLoading);
      }, 500);
    }
    return () => clearTimeout(startLoadingTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLoading, isInitialLoading]);

  return (
    <>
      {!isInitialLoading && nextBestPrice && !isLoading && (
        <div className="card-header lease-card-header">
          <Text size="small">Next Best Price {nextBestPrice}</Text>
        </div>
      )}
      <div className="lease-scanner" style={positionStyle}>
        <div className="content-wrapper">
          <Price price={price} size="xlarge" />
          {priceLabel && (
            <Heading
              className={`${classNameHeading} -pt-100`}
              tag="span"
              color="orange"
              size="small"
            >
              {priceLabel}
            </Heading>
          )}
          <Heading
            tag="div"
            size="small"
            color="darker"
            className={`${classNameHeading} -pt-100`}
          >
            {headingText}
          </Heading>
        </div>
        <div className="button-wrapper">
          <Button
            className="-fullwidth"
            label="Order Now"
            color="teal"
            onClick={orderNowClick}
          />
        </div>
        <div>
          {withCheckBox && (
            <Checkbox
              id="leasing"
              label="Buy Now, Pay Later Pricing"
              color="orange"
              outline
            />
          )}
        </div>
        <div style={{ height: '1rem' }}>
          <Text tag="div" size="small">
            <Link href="tel:+441442838195" size="small">Call 01442 838 195</Link> |{' '}
            <Link onClick={requestCallBack} size="small">Request a Call Back</Link>
          </Text>
        </div>
        {isLoading && (
          <div
            className={`loading-wrapper animated ${animationClass}`}
            style={{ height: `${isInitialLoading ? '12rem' : positionStyle}` }}
          >
            {isInitialLoading ? (
              <div className="initial-loading--wrapper">
                <Heading
                  tag="h2"
                  size="large"
                  color="black"
                  dataTestId="login-register-heading"
                  className="mb-3"
                >
                  LeaseScanner<small>™</small>
                </Heading>
                <Text tag="div" size="small" className="mb-3">
                  {!isInitialSuccess &&
                    (!isLeasingProviderChecked
                      ? `We're checking our panel of ${leasingProviders.length} Leasing Providers`
                      : 'We’re checking against our competitors')}
                </Text>
                <div className="loading-bar mb-3">
                  <div
                    className="inner-loading-bar"
                    style={{ animationDuration: `${animationDuration}ms` }}
                  />
                </div>
                <div className="sources-checked--wrapper">
                  {isInitialSuccess ? (
                    <Icon
                      icon={<CheckmarkCircleOutline />}
                      size="xlarge"
                      color="success"
                      className="animated fadeIn"
                    />
                  ) : (
                    <>
                      <Text tag="div" size="small">
                        Leasing Providers
                        <Icon
                          icon={<CheckmarkSharp />}
                          size="regular"
                          className="ml-3"
                          color={
                            isLeasingProviderChecked ? 'success' : 'medium'
                          }
                        />
                      </Text>
                      <Text tag="div" size="small">
                        Competitors
                        <Icon
                          icon={<CheckmarkSharp />}
                          size="regular"
                          className="ml-3"
                          color={isCompetitorsChecked ? 'success' : 'medium'}
                        />
                      </Text>
                    </>
                  )}
                </div>
                {!isInitialSuccess && (
                  <Text
                    tag="div"
                    className="animated fade-in--up leasing-provider"
                    key={currentLisingProvider}
                  >
                    {leasingProviders[currentLisingProvider]}
                  </Text>
                )}
              </div>
            ) : (
              <div className="update-loading--wrapper">
                <Loading className="ml-3" size="large" />
                <Text color="light" className="ml-3" tag="span">
                  Scanning for best price
                </Text>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LeaseScanner;
