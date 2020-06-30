import React from 'react';
import GoldrushForm from '../../components/GoldrushForm';
import { GoldrushFormContainerProps } from './interfaces';

const GoldrushFormContainer: React.FC<GoldrushFormContainerProps> = ({
  heading,
  isPostcodeVisible,
  onCompleted,
}) => {
  return (
    <GoldrushForm
      heading={heading}
      isPostcodeVisible={isPostcodeVisible}
      onSubmit={() => onCompleted?.()}
    />
  );
};

export default GoldrushFormContainer;
