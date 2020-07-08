import React from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return <Text color="danger">{message}</Text>;
}
