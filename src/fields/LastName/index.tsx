import * as React from 'react';
import { Container } from 'typedi';

import Input from 'components/Input';
import useField from 'hooks/useField';

import ConditionsController from 'controllers/ConditionsController';
import ConditionalSection from 'components/ConditionalSection';
import useFieldValue from 'hooks/useFieldValue';
import { FIRST_NAME_FIELD } from 'fields/FirstName/controller';

import { LAST_NAME_FIELD } from './controller';

const FirstNameFieldController = Container.get(FIRST_NAME_FIELD.token);
const controller = Container.get(LAST_NAME_FIELD.token);

const LastNameField = () => {
  const { meta, value, setValue } = useField(controller);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Input
      name={meta.name}
      label="Last name"
      onChange={handleChange}
      value={value}
      error={meta.error?.message}
    />
  );
};

const LastNameCondition: React.FC = ({ children }) => {
  const firstName = useFieldValue(FirstNameFieldController);
  return (
    <ConditionalSection
      isVisible={ConditionsController.canShowLastName(firstName)}
    >
      {children}
    </ConditionalSection>
  );
};

export default {
  Field: LastNameField,
  Condition: LastNameCondition,
};
