import * as React from 'react';
import { Container } from 'typedi';

import Input from 'components/Input';
import useField from 'hooks/useField';

import { PHONE_NUMBER_FIELD } from './controller';

const controller = Container.get(PHONE_NUMBER_FIELD.token);

const PhoneNumberField = () => {
  const { meta, value, setValue } = useField(controller);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <Input
      name={meta.name}
      label="Phone Number"
      onChange={handleChange}
      value={String(value)}
      error={meta.error?.message}
      type="number"
    />
  );
};

export default PhoneNumberField;
