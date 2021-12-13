import ToggleV2 from 'core/atoms/toggleV2';
import cx from 'classnames';
import { ReactNode } from 'react';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { Nullable } from '../../types/common';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import { ProductCardData_productCarousel } from '../../../generated/ProductCardData';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../../generated/VehicleListUrl';
import ProductCarousel from '../../components/ProductCarousel';
import { useMobileViewport } from '../../hooks/useMediaQuery';

interface ICardsSectionProps {
  derivatives: Nullable<GetDerivatives_derivatives[]>;
  productCard: Nullable<(ProductCardData_productCarousel | null)[]>;
  vehicleList: IVehicleList;
  children: ReactNode;
  isPersonal: boolean;
  setIsPersonal: (value: boolean) => void;
  position?: number;
}

const CardsSection = ({
  derivatives,
  productCard,
  vehicleList,
  children,
  isPersonal,
  setIsPersonal,
  position = 0,
}: ICardsSectionProps) => {
  const isMobile = useMobileViewport();

  return (
    <section className="row:bg-lighter -p-relative">
      <div className="toggle-wrapper">
        <ToggleV2
          leftLabel="Personal"
          checked={isPersonal}
          leftValue={LeaseTypeEnum.PERSONAL}
          rightValue={LeaseTypeEnum.BUSINESS}
          rightLabel="Business"
          leftId={`r1_${position}`}
          rightId={`r2_${position}`}
          leftDataTestId="personal"
          rightDataTestId="business"
          onChange={value => setIsPersonal(value === LeaseTypeEnum.PERSONAL)}
        />
      </div>

      <ProductCarousel
        className={cx({ '-mt-400': isMobile })}
        leaseType={isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS}
        data={{
          derivatives: derivatives || null,
          productCard: productCard || null,
          vehicleList,
        }}
        countItems={productCard?.length || 6}
        dataTestIdBtn="van-view-offer"
        dataUiTestIdMask="ui-electric_leasing-van"
      />
      {children}
    </section>
  );
};

export default CardsSection;
