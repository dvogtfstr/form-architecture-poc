import * as React from 'react';
import { Container } from 'typedi';

import Input from 'components/Input';
import useField from 'hooks/useField';

import { FIRST_NAME_FIELD } from './controller';

const controller = Container.get(FIRST_NAME_FIELD.token);

const FirstNameField = () => {
  const { meta, value, setValue } = useField(controller);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Input
      name={meta.name}
      label="First name"
      onChange={handleChange}
      value={value}
      error={meta.error?.message}
    />
  );
};

export default FirstNameField;
