import Joi from 'joi';

import Field from './Field';

const schema = Joi.string().required();

export class StringField extends Field<string> {
  protected validateCommonRules(value: string) {
    const validated = schema.validate(value);
    return {
      isValid: !validated.error,
      error: validated.error,
      value: validated.value,
    };
  }
}
