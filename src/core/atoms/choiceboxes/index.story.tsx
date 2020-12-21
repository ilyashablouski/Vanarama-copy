import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import React, { useRef } from 'react';
import Choiceboxes from '.';
import { atomicDir } from '../../../helpers/atomicDirUtils';
import Button from '../button';

storiesOf(`${atomicDir(base)}|Choiceboxes`, module).add('Default', () => {
  const choices = [
    { label: 'Personal', value: 'PHC', active: true },
    { label: 'Business', value: 'BHC', active: false },
  ];
  return <Choiceboxes choices={choices} onSubmit={() => {}} />;
});

storiesOf(`${atomicDir(base)}|Choiceboxes`, module).add('Numbers', () => {
  const choices = [
    { label: '13', value: '13', active: true },
    { label: '23', value: '23', active: false },
    { label: '45', value: '45', active: false },
    { label: '47', value: '47', active: false },
    { label: '25763', value: '25763', active: false },
  ];
  return (
    <Choiceboxes className="-cols-4" choices={choices} onSubmit={() => {}} />
  );
});

storiesOf(`${atomicDir(base)}|Choiceboxes`, module).add(
  'Numbers disabled',
  () => {
    const choices = [
      { label: '13', value: '13', active: true },
      { label: '23', value: '23', active: false },
      { label: '45', value: '45', active: false },
      { label: '47', value: '47', active: false },
      { label: '25763', value: '25763', active: false },
    ];
    return (
      <Choiceboxes
        disabled
        className="-cols-4"
        choices={choices}
        onSubmit={() => {}}
      />
    );
  },
);

storiesOf(`${atomicDir(base)}|Choiceboxes`, module).add('Multiselect', () => {
  const choices = [
    { label: '13', value: '13', active: true },
    { label: '23', value: '23', active: false },
    { label: '45', value: '45', active: false },
    { label: '47', value: '47', active: false },
    { label: '25763', value: '25763', active: false },
  ];
  return (
    <Choiceboxes
      className="-cols-4"
      choices={choices}
      multiSelect
      onSubmit={() => {}}
    />
  );
});

storiesOf(`${atomicDir(base)}|Choiceboxes`, module).add(
  'Multiselect with parent clear button',
  () => {
    const ref = useRef() as any;
    const choices = [
      { label: '13', value: '13', active: false },
      { label: '23', value: '23', active: false },
      { label: '45', value: '45', active: false },
      { label: '47', value: '47', active: false },
      { label: '25763', value: '25763', active: false },
    ];
    return (
      <>
        <Button onClick={() => ref.current?.updateState()} label="clear" />
        <Choiceboxes
          choices={choices}
          multiSelect
          onSubmit={() => {}}
          ref={ref}
          clearMultiSelectTitle="Clear"
        />
      </>
    );
  },
);
