import React, { useState } from 'react';
import { NextRouter } from 'next/router';
import { ApolloError, gql, useApolloClient } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import DownloadSharp from '@vanarama/uibook/lib/assets/icons/DownloadSharp';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import MediaGallery from '@vanarama/uibook/lib/components/organisms/media-gallery';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../generated/globalTypes';
import VehicleTechDetails from '../VehicleTechDetails/VehicleTechDetails';
import IndependentReview from '../../components/IndependentReview/IndependentReview';
import CustomiseLeaseContainer from '../CustomiseLeaseContainer/CustomiseLeaseContainer';
import { GetVehicleDetails } from '../../../generated/GetVehicleDetails';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import WhyChooseLeasing from '../../components/WhyChooseLeasing/WhyChooseLeasing';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import WhyChooseVanarama from '../../components/WhyChooseVanarama/WhyChooseVanarama';
import CustomerAlsoViewedContainer from '../CustomerAlsoViewedContainer/CustomerAlsoViewedContainer';
import GoldrushFormContainer from '../GoldrushFormContainer';
import { replaceReview } from '../../components/CustomerReviews/helpers';
import { useCreateOrder } from '../../gql/order';
import { GetCachedOrderInformation } from '../../../generated/GetCachedOrderInformation';

interface IDetailsPageProps {
  capId: number;
  router: NextRouter;
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
  router,
  cars,
  vans,
  pickups,
  data,
  loading,
  error,
}) => {
  const client = useApolloClient();
  const [leaseType, setLeaseType] = useState<string>('Personal');
  const [leadTime, setLeadTime] = useState<string>('');
  const isMobile = useMobileViewport();

  const onCompleted = () => {
    const url =
      leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL
        ? `/olaf/about`
        : `/b2b/olaf/about`;

    router.push(url);
  };

  const [createOrderHandle] = useCreateOrder(onCompleted);

  const onSubmitClick = (values: OrderInputObject) => {
    return createOrderHandle({
      variables: {
        input: values,
      },
    }).then(response => {
      // we need write data to apollo client cache with orderCapId
      client.writeQuery<GetCachedOrderInformation>({
        query: gql`
          query GetCachedOrderInformation {
            selectedOrderUuid
            selectedDerivativeId
          }
        `,
        data: {
          selectedOrderUuid: response.data?.createOrder?.uuid || null,
          selectedDerivativeId: capId.toString(),
        },
      });
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

  const vehicleType = cars ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV;

  return (
    <>
      <div className="pdp--content">
        <Breadcrumb items={PATH.items} />
        <Heading className="-pt-100" tag="span" size="xlarge" color="black">
          {vehicleConfigurationByCapId?.capManufacturerDescription}{' '}
          {vehicleConfigurationByCapId?.capRangeDescription}
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
            <Link href={vehicleDetails?.brochureUrl} color="teal" size="xsmall">
              Download Brochure{' '}
              <Icon color="teal" size="xsmall" icon={<DownloadSharp />} />
            </Link>
          )}
        </div>
        <MediaGallery
          flag={{
            accentIcon: <Icon icon={<Flame />} color="white" />,
            accentText: 'Hot Deal',
            text: leadTime,
            incomplete: true,
          }}
          images={[
            'https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/PeugeotRifter0718_7_lqteyc.jpg',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
            'https://source.unsplash.com/collection/2102317/1000x650?sig=403425',
          ]}
          videoSrc="https://player.vimeo.com/video/263419265"
        />
        <VehicleTechDetails
          vehicleDetails={vehicleDetails}
          derivativeInfo={derivativeInfo}
        />
        {(vans || pickups) && !!independentReview && (
          <IndependentReview review={independentReview || ''} />
        )}
        {isMobile && (
          <CustomiseLeaseContainer
            capId={capId}
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
      </div>
      {vehicleConfigurationByCapId?.financeProfile ? (
        <CustomiseLeaseContainer
          capId={capId}
          vehicleType={vehicleType}
          derivativeInfo={derivativeInfo}
          leaseAdjustParams={leaseAdjustParams}
          leaseType={leaseType}
          setLeaseType={setLeaseType}
          setLeadTime={setLeadTime}
          onCompleted={values => onSubmitClick(values)}
        />
      ) : (
        <GoldrushFormContainer
          termsAndConditions
          isPostcodeVisible={!cars}
          capId={capId}
          kind="quote"
          vehicleType={vehicleType}
        />
      )}
      <CustomerAlsoViewedContainer
        capsId={capsId || []}
        vehicleType={vehicleType}
        leaseType={leaseType.toUpperCase() || ''}
        router={router}
      />
    </>
  );
};

export default DetailsPage;
