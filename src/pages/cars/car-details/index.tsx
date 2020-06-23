import { NextPage } from 'next';
import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { ParsedUrlQuery } from 'querystring';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import DownloadSharp from '@vanarama/uibook/lib/assets/icons/DownloadSharp';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import MediaGallery from '@vanarama/uibook/lib/components/organisms/media-gallery';
import { useCarData } from '../../../gql/carpage';
import withApollo from '../../../hocs/withApollo';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';
import VehicleTechDetails from '../../../containers/VehicleTechDetails/VehicleTechDetails';
import CustomiseLeaseContainer from '../../../containers/CustomiseLeaseContainer/CustomiseLeaseContainer';

interface IProps {
  query: ParsedUrlQuery;
}

const PATH = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Mercedes', href: '/' },
    { label: 'Benz', href: '/' },
  ],
};

const CarDetailsPage: NextPage<IProps> = () => {
  const { data, loading, error } = useCarData(84429, VehicleTypeEnum.CAR);

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
  const vehicleConfigurationByCapId = data?.vehicleConfigurationByCapId;

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
      </div>
      <CustomiseLeaseContainer
        capId={84429}
        vehicleType={VehicleTypeEnum.CAR}
        derivativeInfo={derivativeInfo}
      />
    </>
  );
};

export default withApollo(CarDetailsPage);
