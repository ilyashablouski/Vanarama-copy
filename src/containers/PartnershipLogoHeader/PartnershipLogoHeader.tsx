import { memo, useEffect, useState } from 'react';
import { getPartnerProperties } from '../../utils/partnerProperties';
import PartnershipLogo from '../../components/Partnerships/PartnershipLogo';

const PartnershipLogoHeader = memo(() => {
  const [partnershipLogo, setPartnershipLogo] = useState<string | undefined>();
  const [shouldRenderLogo, setShouldRenderLogo] = useState<boolean | null>();
  const [partnershipTitle, setPartnershipTitle] = useState<
    string | undefined
  >();

  useEffect(() => {
    const partnership = getPartnerProperties();

    if (partnership) {
      setPartnershipLogo(partnership.logo?.file?.url);
      setShouldRenderLogo(partnership.showPartnerLogo);
      setPartnershipTitle(partnership.logo?.title);
    }
  }, []);

  if (!partnershipLogo || !shouldRenderLogo) {
    return null;
  }

  return (
    <div className="partnership-top-header">
      <PartnershipLogo
        logo={partnershipLogo || ''}
        imageAlt={partnershipTitle || ''}
      />
    </div>
  );
});

export default PartnershipLogoHeader;
