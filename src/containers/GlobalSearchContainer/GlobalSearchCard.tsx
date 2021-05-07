import Price from 'core/atoms/price';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles as ISuggestion } from '../../../generated/fullTextSearchVehicleList';
import Skeleton from '../../components/Skeleton';

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
  return (
    <div className="card-mini">
      {data.onOffer && <Icon icon={<Flame />} className="flame" />}
      <img src={imgUrl} alt="img" />
      <div className="copy">
        <div className="model">{`${data.manufacturerName} ${data.modelName}`}</div>

        <div className="variant">{data.derivativeName}</div>
        <div className="cost -flex-default">
          <Price price={data.rental} />
          &nbsp;
          <span className="vat"> EX VAT</span>
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
