import ShieldFreeInsurance from 'core/assets/icons/ShieldFreeInsurance';
import LifeEventInsurance from 'core/assets/icons/LifeEventInsurance';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import RouterLink from '../RouterLink/RouterLink';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

const FreeInsuranceCards = () => {
  return (
    <div className="two-col">
      <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
        <div className="option-icon-left -white">
          <ShieldFreeInsurance />
          <div className="copy">
            <p>
              Lease This Car Online & Get&nbsp;
              <span>1 Year&apos;s FREE Insurance</span>
            </p>

            <span className="-mt-100">Worth Avg £538</span>
            <RouterLink
              link={{
                href: '/car-leasing/free-car-insurance',
                label: 'Find Out More',
              }}
            />
          </div>
        </div>

        <div className="option-icon-left -white">
          <LifeEventInsurance />
          <div className="copy --xsmall">
            <p>
              This Vehicle Includes Free Redundancy &amp; Life Event Cover For
              The Duration Of Your Lease
            </p>
            <span>
              So you can return it anytime, no charge, should the worst happen.
            </span>

            <RouterLink
              link={{
                href: '/redundancy-and-life-event-cover.html',
                label: 'Find Out More',
              }}
            />
          </div>
        </div>
      </LazyLoadComponent>
    </div>
  );
};

export default FreeInsuranceCards;
