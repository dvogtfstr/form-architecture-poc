import * as React from 'react';
import { Container } from 'typedi';

import Input from 'components/Input';
import useField from 'hooks/useField';

import { ADDITIONAL_INFO_FIELD } from './controller';
import ConditionalSection from 'components/ConditionalSection';
import useFieldValue from 'hooks/useFieldValue';
import { EXTRAS_FIELD } from 'fields/Extras/controller';
import ConditionsController from 'controllers/ConditionsController';

const controller = Container.get(ADDITIONAL_INFO_FIELD.token);
const ExtrasFieldController = Container.get(EXTRAS_FIELD.token);

const AdditionalInfoField = () => {
  const { meta, value, setValue } = useField(controller);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <hr />
      <p>Any special comments on extras?</p>
      <Input
        name={meta.name}
        label="Additional info"
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

const AdditionalInfoCondition: React.FC = ({ children }) => {
  // useFieldValue subscribes to given field
  const extras = useFieldValue(ExtrasFieldController);
  return (
    <ConditionalSection
      isVisible={ConditionsController.canShowAdditionaInfo(extras)}
    >
      <>{children}</>
    </ConditionalSection>
  );
};

export default {
  Field: AdditionalInfoField,
  Condition: AdditionalInfoCondition,
};
