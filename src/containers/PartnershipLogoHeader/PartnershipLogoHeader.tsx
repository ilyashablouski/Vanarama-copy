import { useEffect, useState } from 'react';
import PartnershipLogo from '../../components/Partnerships/PartnershipLogo';
import { getPartnerProperties } from '../../utils/partnerProperties';

const PartnershipLogoHeader = () => {
  const [partnershipLogo, setPartnershipLogo] = useState(null);
  const [partnershipTitle, setPartnershipTitle] = useState(null);

  useEffect(() => {
    const partnership = getPartnerProperties();
    if (partnership) {
      setPartnershipLogo(partnership.logo?.file?.url);
      setPartnershipTitle(partnership.logo?.title);
    }
  }, []);

  if (!partnershipLogo) {
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
};

export default PartnershipLogoHeader;
