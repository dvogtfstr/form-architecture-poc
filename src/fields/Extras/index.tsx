import * as React from 'react';
import { Container } from 'typedi';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import Input from 'components/Input';
import ConditionalSection from 'components/ConditionalSection';
import useField from 'hooks/useField';

import { EXTRAS_FIELD, Extra } from './controller';
import useFieldValue from 'hooks/useFieldValue';
import { PIZZA_KIND_FIELD } from 'fields/PizzaKind/controller';
import ConditionsController from 'controllers/ConditionsController';

const PizzaKindFieldController = Container.get(PIZZA_KIND_FIELD.token);
const controller = Container.get(EXTRAS_FIELD.token);

type Fields = {
  [EXTRAS_FIELD.name]: Extra[];
};

const ExtrasField = () => {
  const pizzaKind = useFieldValue(PizzaKindFieldController);
  const { meta, value, setValue } = useField(controller, [pizzaKind.value]);

  // react-hook-form handles only interface bahaviour. It handles no business logic.
  const { register, control } = useForm<Fields>({
    defaultValues: { [EXTRAS_FIELD.name]: value },
  });
  const { fields, append, remove } = useFieldArray({
    name: EXTRAS_FIELD.name,
    control,
  });
  const values = useWatch({ name: EXTRAS_FIELD.name, control });

  React.useEffect(() => {
    setValue(values);
  }, [values]);

  const handleAdd = () => {
    append({ name: '', amount: 0 });
  };

  const handleRemove = (index: number) => () => {
    remove(index);
  };

  return (
    <>
      <h3>Add some extras!</h3>
      {fields.map((field, index) => {
        // It's not pretty, but it doesn't matter because it can be replaced with any other form or validation library
        const nameError = meta.error?.details?.find(({ path }) => {
          return path?.[0] === index && path?.[1] === 'name';
        });
        const amountError = meta.error?.details?.find(({ path }) => {
          return path?.[0] === index && path?.[1] === 'amount';
        });
        return (
          <div key={field.id} className="Box">
            <div className="Row">
              <div>
                <Input
                  {...register(`${meta.name}.${index}.name`)}
                  label="Name"
                />
                <ConditionalSection isVisible={!!nameError}>
                  <p className="Field__error">{nameError?.message}</p>
                </ConditionalSection>
              </div>
              <div>
                <Input
                  {...register(`${meta.name}.${index}.amount`)}
                  label="Amount"
                />
                <ConditionalSection isVisible={!!amountError}>
                  <p className="Field__error">{amountError?.message}</p>
                </ConditionalSection>
              </div>
            </div>
            <button type="button" onClick={handleRemove(index)}>
              Remove
            </button>
          </div>
        );
      })}
      <button type="button" onClick={handleAdd}>
        Add extra
      </button>
    </>
  );
};

const ExtrasFieldCondition: React.FC = ({ children }) => {
  return (
    <ConditionalSection isVisible={ConditionsController.canShowExtras()}>
      {children}
    </ConditionalSection>
  );
};

export default {
  Field: ExtrasField,
  Condition: ExtrasFieldCondition,
};
