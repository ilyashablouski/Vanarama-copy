import React, { FC } from 'react';
import { CardIcons } from 'core/molecules/cards';
import { TIcon } from 'core/molecules/cards/CardIcons';
import Heading from 'core/atoms/heading';

interface IProps {
  vehicleHighlights: TIcon[];
  dataUiTestId: string;
}

const VehicleHighlights: FC<IProps> = ({ dataUiTestId, vehicleHighlights }) => {
  return vehicleHighlights?.length ? (
    <section className="pdp--feature-grid">
      <Heading tag="h2" color="black" size="lead">
        Vehicle Highlights
      </Heading>
      <CardIcons
        icons={vehicleHighlights || []}
        dataUiTestId={dataUiTestId}
        className="pdp--vehicle-highlights"
        featuredProduct
        isPdpPage
      />
    </section>
  ) : (
    <></>
  );
};

export default VehicleHighlights;
