import React, { useState } from 'react';
import { ApolloError } from '@apollo/client';
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
import Price from '@vanarama/uibook/lib/components/atoms/price';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import VehicleTechDetails from '../VehicleTechDetails/VehicleTechDetails';
import IndependentReview from '../../components/IndependentReview/IndependentReview';
import CustomiseLeaseContainer from '../CustomiseLeaseContainer/CustomiseLeaseContainer';
import { GetVehicleDetails } from '../../../generated/GetVehicleDetails';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import WhyChooseLeasing from '../../components/WhyChooseLeasing/WhyChooseLeasing';
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews';
import WhyChooseVanarama from '../../components/WhyChooseVanarama/WhyChooseVanarama';
import GoldrushFormContainer from '../GoldrushFormContainer';
import { replaceReview } from '../../components/CustomerReviews/helpers';

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
  const [isGratitudeVisible, toggleGratitude] = useState(false);
  const isMobile = useMobileViewport();

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
  const reviews = data?.vehicleDetails?.customerReviews?.map(review => ({
    text: review?.review ? replaceReview(review.review) : '',
    author: review?.name || '',
    score: review?.rating || 0,
  }));

  return (
    <>
      <div className="pdp--content">
        <Breadcrumb items={PATH.items} />
        <Heading className="-pt-100" tag="span" size="xlarge" color="black">
          {vehicleConfigurationByCapId?.capManufacturerDescription}
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
            text: '14 - 21 Days Delivery',
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
        {(vans || pickups) && (
          <IndependentReview review={independentReview || ''} />
        )}
        {isMobile && (
          <CustomiseLeaseContainer
            capId={capId}
            vehicleType={cars ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV}
            derivativeInfo={derivativeInfo}
            leaseAdjustParams={leaseAdjustParams}
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
          vehicleType={cars ? VehicleTypeEnum.CAR : VehicleTypeEnum.LCV}
          derivativeInfo={derivativeInfo}
          leaseAdjustParams={leaseAdjustParams}
        />
      ) : (
        <div className="pdp--sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Heading tag="span" size="small" color="black">
                FACTORY ORDER
              </Heading>
              <Text size="small" color="darker">
                Availability: 12 Weeks (Avg)
              </Text>
            </div>
            <div>
              <Price size="xlarge" />
            </div>
          </div>
          {isGratitudeVisible ? (
            <div>
              <Heading size="large" color="black">
                Thank You
              </Heading>
              <Text size="regular" color="darker">
                Et culpa aliquip mollit fugiat sunt irure sunt amet ea pariatur
                qui exercitation fugiat reprehenderit culpa ipsum dolore
                incididunt dolor cillum amet officia nulla pariatur consectetur
                aute et irure et
              </Text>
            </div>
          ) : (
            <>
              <GoldrushFormContainer
                heading="Get Your Quote Now"
                isPostcodeVisible={!cars}
                onCompleted={() => toggleGratitude(true)}
              />
              <div className="pdp--sidebar-promise">
                <Text size="regular" color="black" tag="span">
                  {
                    "Lorem ipsum dolor. We’ll beat any lease quote or we'll give you £100. "
                  }
                </Text>
                <Link href="#" color="success" size="small">
                  Terms and Conditions apply.
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default DetailsPage;
