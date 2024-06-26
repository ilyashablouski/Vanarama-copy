import React, { FC } from 'react';
import cx from 'classnames';

import useScript from '../../../hooks/useScript';
import { ITrustpilotProps } from './interfaces';

const Trustpilot: FC<ITrustpilotProps> = ({
  className,
  src,
  dataTestId,
  templateId = '53aa8912dec7e10d38f59f36',
  height = '140px',
  dataStyleHeight = '240px',
}) => {
  const [loaded, error] = useScript(
    '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js',
  );

  // Create a reference to the <div> element which will represent the TrustBox
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (loaded && window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, [loaded]);

  return loaded && !error ? (
    <div className={cx('trustpilot', className)}>
      <div
        ref={ref}
        className="trustpilot-widget"
        data-testid={dataTestId}
        data-locale="en-GB"
        data-template-id={templateId}
        data-businessunit-id="594a982f0000ff0005a50d80"
        data-style-height={dataStyleHeight}
        data-style-width="100%"
        data-theme="light"
        data-stars="4,5"
        data-review-languages="en"
        data-font-family="Nunito Sans"
        style={{
          position: 'relative',
          height,
          width: '100%',
          borderStyle: 'none',
          display: 'block',
          overflow: 'hidden',
        }}
      >
        <a
          href={src || 'https://uk.trustpilot.com/review/www.vanarama.com'}
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
    </div>
  ) : null;
};

export default React.memo(Trustpilot);
