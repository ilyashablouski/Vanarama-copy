import { useEffect, useState } from 'react';
import GlobalSearchCard from './GlobalSearchCard';
import { fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles as ISuggestion } from '../../../generated/fullTextSearchVehicleList';
import { useLazyModelImages } from '../SearchPageContainer/gql';
import { ModelImages_vehicleImages as IVehiclesImage } from '../../../generated/ModelImages';
import RouterLink from '../../components/RouterLink/RouterLink';

interface IProps {
  suggestions: ISuggestion[];
  searchQuery: string;
}

const GlobalSearchRightSideContainer = ({
  suggestions,
  searchQuery,
}: IProps) => {
  const [imagesUrl, setImagesUrl] = useState<IVehiclesImage[]>([]);
  const [capIds, setCapIds] = useState<string[]>([]);
  const [getModelImages] = useLazyModelImages(capIds, async images => {
    return setImagesUrl(prevState => [
      ...((prevState || []) as IVehiclesImage[]),
      ...((images?.vehicleImages || []) as IVehiclesImage[]),
    ]);
  });

  useEffect(() => {
    if (suggestions.length) {
      const responseCapIds = suggestions
        ?.map(vehicle => vehicle.derivativeId)
        .filter(vehicle => vehicle) as string[];
      setCapIds(responseCapIds || []);
    }
  }, [suggestions]);

  useEffect(() => {
    if (capIds.length) {
      getModelImages();
    }
  }, [capIds, getModelImages]);

  const getImgUrl = (capId: string): string => {
    return (
      imagesUrl?.find(x => x?.capId === parseInt(capId || '', 10))
        ?.mainImageUrl || `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
    );
  };

  return (
    <div className="header-search-results">
      <span className="heading -small -dark">Vehicle Deals</span>

      <div className="card-two-columns -animate">
        {suggestions.map((data, idx) => {
          return (
            <GlobalSearchCard
              data={data}
              imgUrl={getImgUrl(data.derivativeId || '')}
              key={data?.derivativeId || `${data?.derivativeName}` || idx}
            />
          );
        })}
      </div>
      <RouterLink
        className="view-all"
        link={{
          href: '/search',
          label: '',
          query: {
            searchTerm: searchQuery,
          },
        }}
      >
        View All
      </RouterLink>
    </div>
  );
};

export default GlobalSearchRightSideContainer;
