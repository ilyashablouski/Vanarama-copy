import { useMediaQuery } from 'react-responsive';

export default function useSliderProperties(
  defaultWidth: number,
  mediumWidth: number,
  mobileWidth: number,
) {
  const isMediumScreen = useMediaQuery({ minWidth: 861, maxWidth: 1139 });
  const isSmallScreen = useMediaQuery({ maxWidth: 860 });

  if (isSmallScreen) {
    return { itemWidth: mobileWidth, slidesToShow: 1 };
  }

  if (isMediumScreen) {
    return { itemWidth: mediumWidth, slidesToShow: 2 };
  }

  return { itemWidth: defaultWidth, slidesToShow: 3 };
}
