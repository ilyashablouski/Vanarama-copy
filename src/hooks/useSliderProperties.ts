import { useMediaQuery } from 'react-responsive';

export default function useSliderProperties() {
  const isMediumScreen = useMediaQuery({ minWidth: 861, maxWidth: 1139 });
  const isSmallScreen = useMediaQuery({ maxWidth: 860 });

  if (isSmallScreen) {
    return { slidesToShow: 1 };
  }

  if (isMediumScreen) {
    return { slidesToShow: 2 };
  }

  return { slidesToShow: 3 };
}
