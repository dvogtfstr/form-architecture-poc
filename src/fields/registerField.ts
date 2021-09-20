import { Container, Token } from 'typedi';

import { Field } from 'fields/common';
import FormValuesController from 'controllers/FormValuesController';

import { AllFieldsNames } from './registry';
import { FieldMeta } from './common/Field';

const FormValuesCtrl = Container.get<FormValuesController>(
  FormValuesController,
);

type ControllerConstructor<TFieldController> = new (
  meta: FieldMeta,
  defaultValue: any,
) => TFieldController;

interface Options<TName extends string> {
  name: TName;
  defaultValue: any;
  step: number;
}

function registerField<
  TName extends string,
  TFieldController extends Field<any>
>(
  Controller: ControllerConstructor<TFieldController>,
  options: Options<TName>,
): {
  name: TName;
  token: Token<TFieldController>;
} {
  const { defaultValue, name, step } = options;

  // Set default meta
  const formFieldMeta = FormValuesCtrl.getValueByName(name as AllFieldsNames);
  const meta: FieldMeta = {
    name,
    step,
    ...formFieldMeta,
  };

  // Set container
  const token = new Token<TFieldController>(name);
  Container.set(
    token,
    new Controller(meta, formFieldMeta?.value || defaultValue),
  );
  const controller = Container.get(token);

  // Init field if dose not exist
  if (!formFieldMeta) {
    FormValuesCtrl.save({
      [name]: { value: defaultValue, ...controller.meta },
    });
  }

  // Subscribe to the field
  controller.subscribe((fieldMeta) =>
    FormValuesCtrl.save({ [name]: fieldMeta }),
  );

  return { name, token };
}

export default registerField;
