import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';

import { IHeroProps } from './interface';

const Hero: React.FC<IHeroProps> = ({
  children,
  flagText = 'Over 100,000 Vehicles Leased',
}) => {
  return (
    <section className="hero">
      <div className="container">
        <Grid lg="6" md="2" sm="2">
          <Column sm="row" md="1" lg="4">
            <div className="hero--flag -mb-500">
              <Heading size="small" color="white">
                {flagText}
              </Heading>
            </div>
            {children}
          </Column>
          <Column className="-inset" sm="row" md="1" lg="2">
            <div className="hero--search">...</div>
          </Column>
        </Grid>
      </div>
      <svg
        id="hero--curve"
        className="hero--curve"
        data-name="curve"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 170.2"
      >
        <path
          className="hero--curve-background"
          d="M0,65.16v107H1920V113.35s-271.62,32.89-625.91,42.9C925.77,179.08,394.27,183,0,65.16Z"
          transform="translate(0 -2)"
        />
        <path
          className="hero--curve-foreground"
          d="M0,2V64.75c394.27,117.82,925.77,113.92,1294.09,91.08C874,167.71,337.57,147.42,0,2Z"
          transform="translate(0 -1)"
        />
      </svg>
      <svg
        id="hero--curve-m"
        className="hero--curve-m"
        data-name="curve"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 375 65.05"
      >
        <path
          style={{ fill: '#f3f5f7' }}
          className="hero--curve-foreground"
          d="M0,1.81v35c122.83,16.41,249.92,25.7,375,30V47.6C246.33,38.57,119.07,24,0,1.81Z"
          transform="translate(0 -1)"
        />
        <path
          style={{ fill: '#44596a' }}
          className="hero--curve-background"
          d="M0,66.86H375c-125.08-4.32-252.17-13.61-375-30Z"
          transform="translate(0 -1.81)"
        />
      </svg>
    </section>
  );
};

export default Hero;
