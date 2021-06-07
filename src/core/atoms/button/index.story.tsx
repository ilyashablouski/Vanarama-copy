import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React from 'react';
import Button from '.';
import StarSharp from '../../assets/icons/StarSharp';
import { atomicDir } from '../../../helpers/atomicDirUtils';

const ButtonContainer: React.FC = ({ children }) => (
  <div style={{ display: 'grid', gap: '0.75rem' }}>{children}</div>
);

storiesOf(`${atomicDir(base)}/Button`, module)
  .add('Icon', () => (
    <ButtonContainer>
      <Button
        color="teal"
        icon={<StarSharp />}
        iconColor="white"
        iconPosition="before"
        label="Before"
      />
      <Button
        color="teal"
        icon={<StarSharp />}
        iconColor="white"
        iconPosition="after"
        label="After"
      />
    </ButtonContainer>
  ))
  .add('Size', () => (
    <ButtonContainer>
      <Button color="teal" label="Extra small" size="xsmall" />
      <Button color="teal" label="Small" size="small" />
      <Button color="teal" label="Regular" />
      <Button color="teal" label="Large" size="large" />
      <Button color="teal" label="Extra large" size="xlarge" />
    </ButtonContainer>
  ))
  .add('Fill', () => (
    <ButtonContainer>
      <Button color="teal" label="Solid" fill="solid" />
      <Button color="teal" label="Outline" fill="outline" />
      <Button color="teal" label="Clear" fill="clear" />
    </ButtonContainer>
  ))
  .add('Round', () => (
    <ButtonContainer>
      <Button
        color="teal"
        round
        icon={<StarSharp />}
        iconColor="white"
        iconPosition="after"
      />
    </ButtonContainer>
  ))
  .add('Disabled', () => (
    <ButtonContainer>
      <Button color="teal" label="Disabled Button" disabled />
    </ButtonContainer>
  ))
  .add('Color', () => (
    <ButtonContainer>
      <Button color="orange" label="Orange" />
      <Button color="teal" label="Teal" />
      <Button color="sky" label="Sky" />
      <Button color="success" label="Success" />
      <Button color="warning" label="Warning" />
      <Button color="danger" label="Danger" />
      <Button color="darker" label="Darker" />
      <Button color="dark" label="Dark" />
      <Button color="medium" label="Medium" />
      <Button color="light" label="Light" />
      <Button color="lighter" label="Lighter" />
    </ButtonContainer>
  ));
