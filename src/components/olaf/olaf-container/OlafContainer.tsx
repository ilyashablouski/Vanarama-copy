import Router from 'next/router';
import ProgressIndicator from '@vanarama/uibook/src/components/molecules/progress-indicator';
import Heading from '@vanarama/uibook/src/components/atoms/heading';
import StructuredList from '@vanarama/uibook/src/components/organisms/structured-list';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/src/components/molecules/card';

import { Grid, Column } from '../../grid';

interface IProgressContainerProps {
  activeStep: number;
  olafAsideData?: object[];
}

const fakeData = [
  { label: 'Initial Rental', value: '£815.70 (inc VAT)' },
  { label: 'Contract Length', value: '60 months' },
  { label: 'Annual Mileage', value: '6000 miles' },
  { label: '£500 Damage Cover', value: 'Included' },
  { label: 'Maintanence', value: 'No' },
  { label: 'Fuel', value: 'Petrol' },
  { label: 'Transmission', value: 'Manual' },
  { label: 'Color', value: 'Solid - Polar White' },
  { label: 'Trim', value: 'Cloth - Black' },
];

const steps = [
  { label: 'About You', route: '/about' },
  { label: 'Address History', route: '/address' },
  { label: 'Employment History', route: '/employment' },
  { label: 'Expenses', route: '/expense' },
  { label: 'Details', route: '/details' },
  { label: 'Summary', route: '/summary' },
];

const OlafContainer: React.FC<IProgressContainerProps> = ({
  activeStep,
  children,
}) => {
  return (
    <>
      <section>
        <div className="container">
          <ProgressIndicator
            steps={steps}
            activeStep={activeStep}
            onRoute={route => Router.push(route)}
          />
        </div>
      </section>
      <section style={{ padding: '4rem 0' }} className="section">
        <div className="container">
          <Grid columnsLg="6" columns="2" columnsSm="2">
            <Column span="2" spanSm="2" spanLg="1-3">
              {children}
            </Column>
            <Column span="2" spanSm="2" spanLg="4-6">
              <Card
                className="olaf-aside"
                flag={{
                  text: 'In Stock - 14-21 Days Delivery',
                  accentText: 'Hot Deal',
                  accentIcon: '',
                }}
              >
                <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/HondaHRV0319_7_nmblcf.jpg" />
                <CardContent>
                  <hgroup>
                    <Heading tag="a" color="black" size="large">
                      Hyundai Tucson Estate{' '}
                    </Heading>
                    <Heading tag="h5" color="darker" size="xsmall">
                      1.0 IG-T 100 Tekna 5dr Xtronic [Leather]{' '}
                    </Heading>
                    {/* >>> rating here <<< */}
                  </hgroup>
                  <StructuredList
                    priceTag={{
                      price: 269.99,
                      info: 'Per Month Exc. VAT',
                    }}
                    list={fakeData}
                    heading="
      59 month contact (inc VAT). Paid by Direct Debit. First due ≈ 10 days after delivery."
                    headingSize="xsmall"
                  />
                </CardContent>
              </Card>
            </Column>
          </Grid>
        </div>
      </section>
    </>
  );
};

export default OlafContainer;
