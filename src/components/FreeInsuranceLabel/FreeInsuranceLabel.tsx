import dynamic from 'next/dynamic';
import CheckmarkSharpIcon from 'core/assets/icons/CheckmarkSharp';

const Text = dynamic(() => import('core/atoms/text'));

const FreeInsuranceLabel = () => {
  return (
    <div className="yellow-tag -black">
      <Text tag="span">1 Year’s FREE Car Insurance</Text>
      <CheckmarkSharpIcon />
    </div>
  );
};

export default FreeInsuranceLabel;
