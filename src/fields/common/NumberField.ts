import Joi from 'joi';

import Field from './Field';

const schema = Joi.number().required();

export class NumberField extends Field<number> {
  protected validateCommonRules(value: number) {
    const validated = schema.validate(value);
    return {
      isValid: !validated.error,
      error: validated.error,
      value: validated.value,
    };
  }
}
