import * as React from 'react';
import { Container } from 'typedi';

import Input from 'components/Input';
import useField from 'hooks/useField';

import { ADDRESS_FIELD } from './controller';
import ConditionalSection from 'components/ConditionalSection';
import ConditionsController from 'controllers/ConditionsController';

const controller = Container.get(ADDRESS_FIELD.token);

const AddressField = () => {
  const { meta, value, setValue } = useField(controller);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Input
        name={meta.name}
        label="Address"
        onChange={handleChange}
        value={value}
        error={meta.error?.message}
      />
    </>
  );
};

const AddressCondition: React.FC = ({ children }) => {
  return (
    <ConditionalSection isVisible={ConditionsController.canShowAddress()}>
      {children}
    </ConditionalSection>
  );
};

export default {
  Field: AddressField,
  Condition: AddressCondition,
};
