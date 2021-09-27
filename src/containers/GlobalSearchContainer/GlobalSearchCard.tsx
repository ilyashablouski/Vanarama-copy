import Router from 'next/router';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import FreeInsuranceCardLabelIcon from 'core/assets/icons/FreeInsuranceCardLabelIcon';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import { productDerivatives_productDerivatives_derivatives as ISuggestion } from '../../../generated/productDerivatives';
import Skeleton from '../../components/Skeleton';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { FuelTypeEnum } from '../../../entities/global';

const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const Flame = dynamic(() => import('core/assets/icons/Flame'), {
  ssr: false,
});

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  data: ISuggestion;
  imgUrl: string;
}

const GlobalSearchCard = ({ data, imgUrl }: IProps) => {
  const isSpecialOffer = useMemo(() => data.onOffer, [data.onOffer]);
  const isCar = useMemo(() => data.vehicleType === VehicleTypeEnum.CAR, [
    data.vehicleType,
  ]);
  const isElectric = useMemo(() => data.fuelType === FuelTypeEnum.ELECTRIC, [
    data.fuelType,
  ]);
  const pounds = useMemo(() => Math.trunc(data.rental as number), [
    data.rental,
  ]);
  const pence = useMemo(
    () => (data.rental as number).toFixed(2).split('.')[1],
    [data.rental],
  );
  return (
    <div className="card-mini">
      {isSpecialOffer && (
        <span className="hot-offer">
          <Icon icon={<Flame />} className="flame" />
          HOT OFFER
        </span>
      )}
      <div className="img-crop">
        <img src={imgUrl} alt="img" />
      </div>
      <div className="copy">
        {isElectric && (
          <span className="extras-gs">
            <FreeHomeCharger />
            FREE HOME CHARGER
          </span>
        )}
        {isSpecialOffer && !(!isCar || isElectric) && (
          <>
            <span className="extras-gs">
              {' '}
              <FreeInsuranceCardLabelIcon />
              FREE INSURANCE
            </span>
          </>
        )}

        <div className="model">{`${data.manufacturerName} ${data.modelName}`}</div>

        <div className="variant">{data.derivativeName}</div>
        <div className="cost">
          £<span className="pounds">{pounds}</span>.{pence}
          <span className="vat">Per Month Inc. VAT</span>
        </div>
        <Button
          round
          color="teal"
          size="xsmall"
          className="arrow-cta"
          label={<span className="arrow-cta" />}
          onClick={() => Router.push(`/${data.url}` || '')}
        />
      </div>
    </div>
  );
};

export default GlobalSearchCard;
