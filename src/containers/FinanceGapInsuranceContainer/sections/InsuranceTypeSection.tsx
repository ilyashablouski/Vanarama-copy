/* eslint-disable @typescript-eslint/camelcase */
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Router from 'next/router';
import {
  GenericPageQuery_genericPage_sections_featured1_link,
  GenericPageQuery_genericPage_sections_featured2_link,
} from '../../../../generated/GenericPageQuery';

interface IProps {
  heading: string | null;
  description?: string | null;
  body?: string | null;
  link1?: GenericPageQuery_genericPage_sections_featured1_link | null;
  link2?: GenericPageQuery_genericPage_sections_featured2_link | null;
  showModal?: () => void;
}

const goToTop = () => window.scrollTo(0, 0);

const InsuranceTypeSection = ({
  heading,
  description,
  body,
  link1,
  link2,
  showModal,
}: IProps) => (
  <div className="row:lead-text">
    <Heading size="xlarge" color="black">
      {heading}
    </Heading>
    {(description || body) && (
      <Text size="lead" color="darker" tag="p">
        {description || body || ''}
      </Text>
    )}
    {link1 && link2 && (
      <div className="button-group">
        <Button
          size="regular"
          color="teal"
          fill="solid"
          label={link1?.text}
          onClick={goToTop}
        />
        <Button
          size="regular"
          color="teal"
          fill="outline"
          label={link2?.text}
          onClick={showModal}
        />
      </div>
    )}
  </div>
);

export default InsuranceTypeSection;
