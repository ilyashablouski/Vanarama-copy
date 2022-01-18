import { memo, useEffect, useState } from 'react';

import { getPartnerProperties } from '../../utils/partnerProperties';
import { Partner_partner_logo_file as IPartnerLogoFile } from '../../../generated/Partner';

import PartnershipLogo from '../../components/Partnerships/PartnershipLogo';
import { Nullish } from '../../types/common';

const PartnershipLogoHeader = memo(() => {
  const [shouldRenderLogo, setShouldRenderLogo] = useState<boolean | null>();
  const [partnershipTitle, setPartnershipTitle] = useState<Nullish<string>>();
  const [partnershipLogo, setPartnershipLogo] = useState<
    Nullish<IPartnerLogoFile>
  >();

  useEffect(() => {
    const partnership = getPartnerProperties();

    if (partnership) {
      setPartnershipLogo(partnership.logo?.file);
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
