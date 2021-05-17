import { useMemo } from 'react';
import Checkbox from 'core/atoms/checkbox';
import Button from 'core/atoms/button';
import dynamic from 'next/dynamic';
import { condtionItems } from './config';
import Skeleton from '../../components/Skeleton';
import { useMobileViewport } from '../../hooks/useMediaQuery';

const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});

const Text = dynamic(() => import('core/atoms/text'));

const IconList = dynamic(() => import('core/organisms/icon-list'), {
  loading: () => <Skeleton count={3} />,
});
// @ts-ignore
const IconListItem = dynamic(() =>
  import('core/organisms/icon-list').then(mod => mod.IconListItem),
);

interface IProps {
  setIsModalVisible: (value: boolean) => void;
  isAgreeInsuranceRules: boolean;
  setIsAgreeInsuranceRules: (value: boolean) => void;
  onContinueWithInsurance: () => void;
  onContinueWithoutInsurance: () => void;
}

const InsuranceModal = ({
  setIsModalVisible,
  isAgreeInsuranceRules,
  setIsAgreeInsuranceRules,
  onContinueWithInsurance,
  onContinueWithoutInsurance,
}: IProps) => {
  const isMobile = useMobileViewport();
  const textSize = useMemo(() => (isMobile ? 'small' : 'regular'), [isMobile]);
  return (
    <Modal
      show
      containerClassName="modal-container-large"
      onRequestClose={() => setIsModalVisible(false)}
      title="To be eligible for Vanarama's free insurance, you must confirm the following:"
    >
      <IconList className="insuranceConditions">
        {condtionItems.map((el, indx) => (
          <IconListItem iconColor="orange" key={indx.toString()}>
            <Text tag="span" color="dark" size={textSize}>
              {el}
            </Text>
          </IconListItem>
        ))}
      </IconList>
      <Text tag="p" color="dark" className="-mv-400" size={textSize}>
        The free insurance policy is based on you being the main driver. You can
        add 1 named driver to the policy as long as they also meet all of the
        criteria above. If your Insurance needs differ please contact our
        Insurance team.
      </Text>
      <Checkbox
        id="terms_and_conditions"
        className="-mv-300"
        checked={isAgreeInsuranceRules}
        onChange={() => setIsAgreeInsuranceRules(!isAgreeInsuranceRules)}
        name="termsAndConditions"
        dataTestId="termsAndConditions"
        label={[
          <Text tag="span" color="dark" size={textSize}>
            Yes. I want 1 year&#39;s free insurance. I confirm that I am
            eligible based on the criteria (and am able to provide supporting
            information to confirm this) and I have read the&nbsp;
          </Text>,
          <a
            key="a"
            className="link -teal"
            href="https://vanarama-insurance.s3.amazonaws.com/Vanarama%20Insurance/1%20Year%27s%20Free%20Insurance%20-%20Terms%20%26%20Conditions.pdf"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: isMobile ? '14px' : '16px' }}
          >
            terms & conditions
          </a>,
        ]}
      />
      <div className="-mt-400">
        <Button
          label="Continue With Insurance"
          color="teal"
          onClick={onContinueWithInsurance}
          disabled={!isAgreeInsuranceRules}
          className={isMobile ? '-mr-500 -mb-400' : '-mr-500'}
        />
        <Button
          label="Continue Without Insurance"
          color="teal"
          onClick={onContinueWithoutInsurance}
          fill="outline"
        />
      </div>
    </Modal>
  );
};

export default InsuranceModal;
