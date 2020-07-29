/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import Router from 'next/router';
import { ApolloError } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import DownloadSharp from '@vanarama/uibook/lib/assets/icons/DownloadSharp';
import MediaGallery from '@vanarama/uibook/lib/components/organisms/media-gallery';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../generated/globalTypes';
import VehicleTechDetails from '../VehicleTechDetails/VehicleTechDetails';
import IndependentReview from '../../components/IndependentReview/IndependentReview';
import CustomiseLeaseContainer from '../CustomiseLeaseContainer/CustomiseLeaseContainer';
import {
  GetVehicleDetails,
  GetVehicleDetails_vehicleDetails_rangeFaqs,
  GetVehicleDetails_vehicleImages,
} from '../../../generated/GetVehicleDetails';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import WhyChooseLeasing from '../../components/WhyChooseLeasing/WhyChooseLeasing';
import Banner from '../../components/Banner/Banner';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import WhyChooseVanarama from '../../components/WhyChooseVanarama/WhyChooseVanarama';
import CustomerAlsoViewedContainer from '../CustomerAlsoViewedContainer/CustomerAlsoViewedContainer';
import { replaceReview } from '../../components/CustomerReviews/helpers';
import FrequentlyAskedQuestions from '../../components/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import { useCreateUpdateOrder } from '../../gql/order';
import RouterLink from '../../components/RouterLink/RouterLink';

interface IDetailsPageProps {
  capId: number;
  cars?: boolean;
  vans?: boolean;
  pickups?: boolean;
  data?: GetVehicleDetails;
  loading?: boolean;
  error?: ApolloError;
}

const PATH = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Mercedes', href: '/' },
    { label: 'Benz', href: '/' },
  ],
};

const DetailsPage: React.FC<IDetailsPageProps> = ({
  capId,
  cars,
  vans,
  pickups,
  data,
  loading,
  error,
}) => {
  const [leaseType, setLeaseType] = useState<string>('Personal');
  const [leadTime, setLeadTime] = useState<string>('');
  const isMobile = useMobileViewport();

  const [createOrderHandle] = useCreateUpdateOrder(() => {});

  const onSubmitClick = (values: OrderInputObject) => {
    return createOrderHandle({
      variables: {
        input: values,
      },
    }).then(response => {
      const url =
        leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL
          ? '/olaf/about/[orderId]'
          : '/b2b/olaf/about/[orderId]';

      Router.push(
        url,
        url.replace('[orderId]', response.data?.createUpdateOrder?.uuid || ''),
      );
    });
  };

  if (loading) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        <Loading size="xlarge" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="pdp--content"
        style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
      >
        {error?.message}
      </div>
    );
  }

  const vehicleDetails = data?.vehicleDetails;
  const derivativeInfo = data?.derivativeInfo;
  const leaseAdjustParams = data?.leaseAdjustParams;
  const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;
  const financeProfile = data?.vehicleConfigurationByCapId?.financeProfile;
  const independentReview = data?.vehicleDetails?.independentReview;
  const warranty = data?.vehicleDetails?.warranty;
  const capsId = data?.vehicleDetails?.relatedVehicles?.map(
    el => el?.capId || '',
  );
  const reviews = data?.vehicleDetails?.customerReviews?.map(review => ({
    text: review?.review ? replaceReview(review.review) : '',
    author: review?.name || '',
    score: review?.rating || 0,
  }));
  const rangeFAQs = data?.vehicleDetails
    ?.rangeFaqs as GetVehicleDetails_vehicleDetails_rangeFaqs[];

  const vehicleImages =
    (data?.vehicleImages?.length &&
      ((data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0]
        .imageUrls as string[])) ||
    [];

  const video =
    (data?.vehicleImages?.length &&
      (data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0].videoUrl) ||
    undefined;

  const threeSixtyVideo =
    (data?.vehicleImages?.length &&
      (data?.vehicleImages as GetVehicleDetails_vehicleImages[])[0]
        .threeSixtyVideoUrl) ||
    undefined;

  const vehicleType = cars ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV;
  const pageTitle = `${vehicleConfigurationByCapId?.capManufacturerDescription} ${vehicleConfigurationByCapId?.capRangeDescription}`;

  return (
    <>
      <div className="pdp--content">
        <Breadcrumb items={PATH.items} />
        <Heading className="-pt-100" tag="span" size="xlarge" color="black">
          {pageTitle}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {vehicleConfigurationByCapId?.capDerivativeDescription}
        </Text>
        <div
          className="-mt-500 -mb-200"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Rating size="regular" score={vehicleDetails?.averageRating || 0} />
          {vehicleDetails?.brochureUrl && (
            <RouterLink
              link={{
                href: vehicleDetails?.brochureUrl,
                label: '',
                target: '_blank',
              }}
              classNames={{ color: 'teal', size: 'xsmall' }}
            >
              Download Brochure{' '}
              <Icon color="teal" size="xsmall" icon={<DownloadSharp />} />
            </RouterLink>
          )}
        </div>
        <MediaGallery
          flag={{
            accentIcon: <Icon icon={<Flame />} color="white" />,
            accentText: 'Hot Deal',
            text: leadTime,
            incomplete: true,
          }}
          images={vehicleImages}
          videoSrc={video}
          threeSixtyVideoSrc={threeSixtyVideo}
          videoIframe
        />
        <VehicleTechDetails
          vehicleDetails={vehicleDetails}
          derivativeInfo={derivativeInfo}
        />
        <Banner />
        {(vans || pickups) && !!independentReview && (
          <IndependentReview review={independentReview || ''} />
        )}
        {isMobile && (
          <CustomiseLeaseContainer
            capId={capId}
            financeProfile={financeProfile}
            vehicleType={vehicleType}
            derivativeInfo={derivativeInfo}
            leaseAdjustParams={leaseAdjustParams}
            leaseType={leaseType}
            setLeaseType={setLeaseType}
            setLeadTime={setLeadTime}
            onCompleted={values => onSubmitClick(values)}
          />
        )}
        <WhyChooseLeasing warranty={warranty || ''} />
        <WhyChooseVanarama />
        <div className="pdp--reviews">
          <CustomerReviews reviews={reviews || []} />
        </div>
        <FrequentlyAskedQuestions
          rangeFAQ={rangeFAQs || []}
          rangeFAQTitle={pageTitle}
        />
      </div>
      <CustomiseLeaseContainer
        capId={capId}
        financeProfile={financeProfile}
        vehicleType={vehicleType}
        derivativeInfo={derivativeInfo}
        leaseAdjustParams={leaseAdjustParams}
        leaseType={leaseType}
        setLeaseType={setLeaseType}
        setLeadTime={setLeadTime}
        onCompleted={values => onSubmitClick(values)}
      />
      <CustomerAlsoViewedContainer
        capsId={capsId || []}
        vehicleType={vehicleType}
        leaseType={leaseType.toUpperCase() || ''}
      />
    </>
  );
};

export default DetailsPage;
